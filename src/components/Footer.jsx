import { Link } from "react-router-dom"
import { Coffee, Camera, Globe, Send, MapPin, Phone, Mail } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-espresso text-cream/80 py-16 px-6 sm:px-12 mt-32 border-t border-latte/10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16">
                <div>
                    <Link to="/" className="flex items-center space-x-2 mb-6">
                        <Coffee className="w-8 h-8 text-latte" />
                        <span className="font-serif text-2xl font-bold text-white tracking-tight">BrewHouse<span className="text-latte">.</span></span>
                    </Link>
                    <p className="text-sm leading-relaxed mb-8 max-w-xs">
                        Crafting the perfect cup since 2010. Our passion for quality, sustainability, and community is poured into every brew we serve.
                    </p>
                    <div className="flex space-x-4">
                        <SocialIcon icon={<Camera />} />
                        <SocialIcon icon={<Send />} />
                        <SocialIcon icon={<Globe />} />
                    </div>
                </div>

                <div>
                    <h4 className="font-serif text-xl font-semibold text-white mb-6">Quick Links</h4>
                    <ul className="space-y-4">
                        <li><FooterLink to="/">Home</FooterLink></li>
                        <li><FooterLink to="/menu">Our Menu</FooterLink></li>
                        <li><FooterLink to="/reserve">Book a Table</FooterLink></li>
                        <li><FooterLink to="/services">Our Services</FooterLink></li>
                        <li><FooterLink to="/about">Our Story</FooterLink></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-serif text-xl font-semibold text-white mb-6">Contact Us</h4>
                    <ul className="space-y-4">
                       <ContactDetail icon={<MapPin className="w-5 h-5"/>} text="123 Coffee Lane, Brew City" />
                       <ContactDetail icon={<Phone className="w-5 h-5"/>} text="+1 (555) 789-1024" />
                       <ContactDetail icon={<Mail className="w-5 h-5"/>} text="hello@brewhouse.cafe" />
                    </ul>
                </div>

                <div>
                    <h4 className="font-serif text-xl font-semibold text-white mb-6">Opening Hours</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex justify-between"><span>Mon - Fri</span> <span className="text-white">7:00 AM - 8:00 PM</span></li>
                        <li className="flex justify-between"><span>Saturday</span> <span className="text-white">8:00 AM - 9:00 PM</span></li>
                        <li className="flex justify-between"><span>Sunday</span> <span className="text-white">9:00 AM - 6:00 PM</span></li>
                    </ul>
                </div>
            </div>
            
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-cream/10 text-center text-[10px] tracking-widest uppercase text-cream/40 flex flex-col md:flex-row justify-between items-center gap-4">
                <span>&copy; {new Date().getFullYear()} BrewHouse Café. All rights reserved.</span>
                <span className="font-bold tracking-[0.2em] text-latte italic">Designed and developed by Ck chaitanya<span className="text-white">.</span></span>
            </div>
        </footer>
    )
}

const SocialIcon = ({ icon }) => (
    <a href="#" className="p-2 bg-cream/5 rounded-full hover:bg-latte/20 hover:text-latte transition-all duration-300">
        {icon}
    </a>
)

const FooterLink = ({ to, children }) => (
    <Link to={to} className="text-sm hover:text-latte transition-colors duration-300 flex items-center group">
        <span className="w-0 group-hover:w-4 transition-all duration-300 overflow-hidden text-latte mr-0 group-hover:mr-2">→</span>
        {children}
    </Link>
)

const ContactDetail = ({ icon, text }) => (
    <li className="flex items-start space-x-3 text-sm">
        <span className="text-latte">{icon}</span>
        <span>{text}</span>
    </li>
)

export default Footer
