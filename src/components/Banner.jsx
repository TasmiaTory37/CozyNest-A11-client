import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-flip';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import s1 from '../assets/roomslide1.jpg';
import s2 from '../assets/roomslide2.jpg';
import s3 from '../assets/roomslide3.jpg';

import { EffectFlip, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router';

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto h-[65vh] rounded-lg overflow-hidden shadow-lg">
      <Swiper
        effect={'flip'}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="w-full h-full"
      >
        <SwiperSlide className="relative h-full">
          <img src={s1} alt="Discover Your Perfect Getaway" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-4 text-center">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Discover Your Perfect Getaway</h1>
            <p className='text-white font-medium sm:font-semibold text-base sm:text-lg'>
              "From cozy suites to luxury rooms, enjoy comfort, elegance, and top-notch service at unbeatable prices."
            </p>
            <Link to='/rooms' className="bg-blue-500 text-white hover:bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold ">
              View Rooms
            </Link>
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative h-full">
          <img src={s2} alt="Unwind in Style & Serenity" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-4 text-center">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Unwind in Style & Serenity</h1>
            <p className='text-white font-medium sm:font-semibold text-base sm:text-lg'>
              Relax in beautifully designed rooms, perfect for a peaceful escape or a luxurious business trip.
            </p>
            <Link to='/rooms' className=" bg-blue-500 text-white hover:bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold ">
              Explore Rooms
            </Link>
          </div>
        </SwiperSlide>

        <SwiperSlide className="relative h-full">
          <img src={s3} alt="Luxury Meets Affordability" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/30 flex flex-col items-center justify-center space-y-4 sm:space-y-6 px-4 text-center">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">Luxury Meets Affordability</h1>
            <p className='text-white font-medium sm:font-semibold text-base sm:text-lg'>
              Enjoy premium amenities and top-rated service without breaking the bank—your ideal stay awaits.
            </p>
            <Link to='/rooms' className="bg-blue-500 text-white hover:bg-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold ">
              Check Availability
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
