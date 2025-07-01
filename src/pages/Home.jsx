import React, { useEffect } from 'react';
import Banner from '../components/Banner';
import Map from '../components/Map';
import ComfortFeatures from '../components/ComfortFeatures';
import FAQ from '../components/FAQ';
import UserReview from '../components/UserReviews';
import FeaturedRooms from '../components/FeaturedRooms';
import SpecialOfferModal from '../components/SpecialOfferModal';


const Home = () => {
    useEffect(() => {
             document.title = "CozyNest | Home"; 
           }, []);
    return (
        <div>
            <SpecialOfferModal></SpecialOfferModal>
            <Banner></Banner>
            <section className="mt-16 max-w-7xl mx-auto">
                <h2 className="text-3xl text-blue-500 font-bold mb-2 text-center">Our Location</h2>
                <p className="text-center ">We’re right where you want to be - at the heart of the city!</p>
                <Map />
            </section>
            <FeaturedRooms></FeaturedRooms>
            <UserReview></UserReview>
            <ComfortFeatures></ComfortFeatures>
            <FAQ></FAQ>
           
         
            
        </div>
    );
};

export default Home;