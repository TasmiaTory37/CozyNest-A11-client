import React from 'react';
import Banner from '../components/Banner';
import Map from '../components/Map';
import ComfortFeatures from '../components/ComfortFeatures';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <section className="mt-16 px-4 max-w-7xl mx-auto">
                <h2 className="text-3xl text-blue-500 font-bold mb-2 text-center">Our Location</h2>
                <p className="text-center text-gray-600 mb-6">We’re right where you want to be - at the heart of the city!</p>
                <Map />
            </section>
            <ComfortFeatures></ComfortFeatures>
           
         
            
        </div>
    );
};

export default Home;