import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import Lottie from "lottie-react";
import testimonyAnimation from '../assets/lotties/testimony.json';


const UserReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/reviews")
      .then((res) => res.json())
      .then((data) =>
        setReviews(
          data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) 
        )
      )
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex gap-5 items-center justify-center mb-5">
            <h2 className="text-4xl font-bold mb-10 text-blue-500">
         What Our Guests Say
        </h2>
        <Lottie style={{width:'150px'}} animationData={ testimonyAnimation} loop={true}></Lottie>

        </div>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          className="max-w-7xl mx-auto rounded-xl "
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="bg-cyan-50 shadow-xl p-8 flex flex-col items-center space-y-4">
                <img
                  src={review.photo}
                  alt={review.username}
                  className="w-20 h-20 rounded-full object-cover shadow-md"
                />
                <h3 className="text-xl font-semibold text-gray-700">
                  {review.username}
                </h3>
                <Rating
                  initialRating={review.rating}
                  readonly
                  fullSymbol={<FaStar className="text-yellow-400 text-xl" />}
                  emptySymbol={<FaRegStar className="text-gray-300 text-xl" />}
                />
                <p className="text-gray-600 max-w-xl italic">
                  “{review.comment}”
                </p>
                <span className="text-sm text-gray-400">
                  {new Date(review.timestamp).toLocaleDateString()}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default UserReviews;
