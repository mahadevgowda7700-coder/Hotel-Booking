import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const Experience = () => {
    const experiences = [
        {
            title: "Fine Dining",
            description: "Savor world-class cuisine prepared by Michelin-starred chefs in an elegant atmosphere.",
            image: assets.exclusiveOfferCardImg1,
            category: "Culinary"
        },
        {
            title: "Spa & Wellness",
            description: "Rejuvenate your mind and body with our bespoke spa treatments and holistic therapies.",
            image: assets.roomImg2,
            category: "Relaxation"
        },
        {
            title: "Adventure Tours",
            description: "Explore the local hidden gems with guided private tours curated specifically for you.",
            image: assets.exclusiveOfferCardImg2,
            category: "Adventure"
        }
    ];

    return (
        <div className="py-28 px-4 md:px-16 lg:px-24 xl:px-32 bg-[#fbffff]">
            <div className="max-w-7xl mx-auto">
                <Title title="Luxury Experiences" subTitle="Beyond just a stay, we offer curated moments that define the art of living well." align="center" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
                    {experiences.map((exp, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100">
                            <div className="h-[300px] overflow-hidden">
                                <img
                                    src={exp.image}
                                    alt={exp.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <div className="p-8">
                                <span className="text-primary font-bold text-xs uppercase tracking-widest">{exp.category}</span>
                                <h3 className="text-2xl font-playfair text-gray-800 mt-2 mb-4 group-hover:text-primary transition-colors">{exp.title}</h3>
                                <p className="text-gray-500 leading-relaxed mb-6">
                                    {exp.description}
                                </p>
                                <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                                    LEARN MORE
                                    <img src={assets.arrowIcon} alt="" className="h-3" />
                                </button>
                            </div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full shadow-sm">
                                <p className="text-[10px] font-bold text-gray-800">PREMIUM</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dynamic section */}
                <div className="mt-32 flex flex-col lg:flex-row items-center gap-16 bg-[#001F3F] text-white p-12 md:p-20 rounded-[40px] overflow-hidden relative">
                    <div className="flex-1 z-10">
                        <h2 className="text-4xl md:text-5xl font-playfair leading-tight mb-6">Unrivaled <span className="italic text-primary">Service</span>, Unforgettable Memories</h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-lg">Our dedicated concierge team is at your side to craft every detail of your journey, ensuring that your stay is nothing short of extraordinary.</p>
                        <button className="bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-lg">Enquire Now</button>
                    </div>
                    <div className="flex-1 relative z-10 w-full">
                        <img
                            src={assets.roomImg3}
                            className="rounded-2xl shadow-2xl w-full h-[400px] object-cover border-4 border-white/10"
                            alt="Resort"
                        />
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl"></div>
                </div>
            </div>
        </div>
    );
};

export default Experience;
