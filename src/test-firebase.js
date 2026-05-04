import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase/config";

async function testFetch() {
    console.log("Testing Firestore fetch...");
    try {
        const q = query(collection(db, "menu"), limit(1));
        const snap = await getDocs(q);
        console.log("Fetch successful! Found " + snap.size + " items.");
        snap.forEach(doc => {
            console.log("Sample ID:", doc.id, "Data:", doc.data());
        });
    } catch (err) {
        console.error("Fetch failed:", err);
    }
}

testFetch();
