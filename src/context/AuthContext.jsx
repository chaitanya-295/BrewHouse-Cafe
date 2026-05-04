import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  async function signup(email, password, name) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user profile in Firestore
    try {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        role: "user",
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("Firestore Error during signup:", error);
      import("sonner").then(({ toast }) => toast.error("Account created, but failed to save profile: " + error.message));
    }
    
    return user;
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    console.log("AuthContext: Initializing listener...");
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("AuthContext: State changed, user:", user?.uid);
      if (user) {
        try {
          // Check for admin role in firestore
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCurrentUser({ ...user, ...userData });
            setIsAdmin(userData.role === "admin");
          } else {
            setCurrentUser(user);
            setIsAdmin(false);
          }
        } catch (err) {
          console.error("AuthContext Error fetching user data:", err);
          setCurrentUser(user); // Fallback to basic auth user
          setIsAdmin(false);
        } finally {
          setLoading(false);
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
        setLoading(false);
      }
    }, (error) => {
      console.error("AuthContext Listener Error:", error);
      setLoading(false);
    });

    // Forced timeout fallback for blank screen issues
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("AuthContext: Initialization timed out, forcing load...");
        setLoading(false);
      }
    }, 30000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const value = {
    currentUser,
    isAdmin,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
