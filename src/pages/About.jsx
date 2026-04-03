import { motion } from "framer-motion"
import { ArrowRight, Coffee, Heart, Leaf } from "lucide-react"

const About = () => {
    return (
        <div className="space-y-32 pb-32">
            {/* Mission Hero */}
            <section className="px-6 sm:px-12 max-w-7xl mx-auto pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-latte font-bold tracking-widest text-xs uppercase mb-6 block">Our Story</span>
                        <h1 className="text-6xl font-serif font-bold text-espresso leading-tight mb-8">Crafting Moments,<br/><span className="text-latte italic underline decoration-latte/30 underline-offset-8">One Cup at a Time.</span></h1>
                        <p className="text-charcoal/60 text-lg leading-relaxed mb-8">
                            Founded in 2010, BrewHouse started with a simple belief: coffee is more than just a drink—it's a medium for connection. We've spent over a decade sourcing the finest beans and perfecting our craft to provide a sanctuary for coffee lovers.
                        </p>
                        <p className="text-charcoal/60 text-lg leading-relaxed mb-12">
                            Every roast is a labor of love, every pour is an act of art. We invite you to experience the passion that goes into every drop.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-latte/10">
                            <StatItem label="Years of Passion" value="14+" />
                            <StatItem label="Direct Trade Partners" value="20+" />
                        </div>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="rounded-[4rem] overflow-hidden shadow-2xl border-2 border-white transform rotate-3 hover:rotate-0 transition-transform duration-700">
                            <img src="/about-cafe.jpg" alt="Our Cafe Interior" className="w-full h-full object-cover aspect-[4/5]" />
                        </div>
                        <div className="absolute -top-10 -right-10 bg-latte p-10 rounded-full text-white shadow-2xl hidden md:block">
                            <Coffee className="w-12 h-12" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-white py-32 px-6 sm:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso mb-6">Our Core Values</h2>
                        <p className="text-charcoal/40 max-w-xl mx-auto uppercase tracking-widest text-xs font-bold font-serif whitespace-nowrap">The pillars of our craft.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        <ValueItem icon={<Leaf className="w-10 h-10" />} title="Sustainability" desc="We believe in protecting the planet one cup at a time. All our packaging is 100% compostable." />
                        <ValueItem icon={<Heart className="w-10 h-10" />} title="Community" desc="Our cafe is a hub for thinkers, dreamers, and neighbors. Everyone is welcome at our table." />
                        <ValueItem icon={<Coffee className="w-10 h-10" />} title="Quality" desc="No compromises. From the bean to the brew, we maintain the highest standards of specialty coffee." />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-6 sm:px-12 max-w-7xl mx-auto">
                 <div className="bg-espresso rounded-[3rem] p-16 md:p-32 text-center text-cream relative overflow-hidden group">
                     <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-latte/10 rounded-full blur-[100px] transition-transform duration-700 group-hover:scale-150"></div>
                     <div className="relative z-10">
                        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 italic">Meet us in person</h2>
                        <p className="text-cream/60 text-lg mb-12 max-w-md mx-auto leading-relaxed">Experience our sanctuary of brew. Our baristas are ready to craft your perfect drink.</p>
                        <a 
                            href="https://www.google.com/maps" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="px-10 py-5 bg-latte text-white rounded-full font-bold shadow-2xl transition-all hover:bg-white hover:text-espresso hover:scale-105 active:scale-95 inline-flex items-center mx-auto space-x-3"
                        >
                            <span>Get Directions</span>
                            <ArrowRight className="w-5 h-5" />
                        </a>
                     </div>
                 </div>
            </section>
        </div>
    )
}

const StatItem = ({ label, value }) => (
    <div className="space-y-1">
        <div className="text-4xl font-serif font-bold text-espresso">{value}</div>
        <div className="text-xs uppercase font-extrabold tracking-tighter text-latte">{label}</div>
    </div>
)

const ValueItem = ({ icon, title, desc }) => (
    <div className="text-center group">
        <div className="w-20 h-20 bg-cream rounded-3xl flex items-center justify-center mx-auto mb-8 border border-latte/10 text-latte transition-transform group-hover:rotate-12 duration-500">
            {icon}
        </div>
        <h3 className="text-2xl font-serif font-bold text-espresso mb-4">{title}</h3>
        <p className="text-charcoal/50 leading-relaxed text-sm italic">{desc}</p>
    </div>
)

export default About
