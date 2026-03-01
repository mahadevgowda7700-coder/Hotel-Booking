import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';

const About = () => {
    return (
        <div className="py-28 px-4 md:px-16 lg:px-24 xl:px-32 bg-[#fbffff]">
            <div className="max-w-6xl mx-auto">
                <Title title="Our Story" subTitle="Tracing our heritage of hospitality and excellence through the decades." align="center" />

                <div className="flex flex-col md:flex-row items-center gap-12 mt-16">
                    <div className="flex-1">
                        <img
                            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1000"
                            alt="Luxury Hotel"
                            className="rounded-2xl shadow-2xl h-[400px] w-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                    <div className="flex-1 space-y-6">
                        <h2 className="font-playfair text-4xl text-gray-800 leading-tight">
                            Crafting Unforgettable <span className="text-primary italic">Experiences</span> Since 1995
                        </h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            What started as a small family-owned boutique hotel in the heart of London has grown into a global beacon of luxury and refined service. At QuickStay, we believe that travel isn't just about the destination, but about the moments of peace and premium comfort you find along the way.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Our commitment to excellence is reflected in every detail—from the thread count of our linens to the curation of our local experiences.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-6">
                            <div>
                                <p className="text-3xl font-bold text-primary">28+</p>
                                <p className="text-gray-500 font-medium">Global Cities</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-primary">1M+</p>
                                <p className="text-gray-500 font-medium">Happy Guests</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-28">
                    <Title title="Our Mission" subTitle="To redefine the standards of luxury travel and personalized hospitality." align="center" />
                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                                <img src={assets.badgeIcon} className="h-6" alt="" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Authentic Luxury</h3>
                            <p className="text-gray-500 leading-relaxed">We source the most unique and high-end accommodations that tell a story of their locale.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center mb-6">
                                <img src={assets.heartIcon} className="h-6" alt="" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Service First</h3>
                            <p className="text-gray-500 leading-relaxed">Our concierge team is available 24/7 to ensure your stay exceeds every expectation.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-6">
                                <img src={assets.homeIcon} className="h-6" alt="" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Sustainability</h3>
                            <p className="text-gray-500 leading-relaxed">We are committed to reducing our footprint while preserving the grandeur of our properties.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
