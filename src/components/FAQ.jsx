import React from 'react';

const FAQ = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-blue-500 mb-8">Frequently Asked Questions</h2>

    

        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">What time is check-in/check-out?</div>
          <div className="collapse-content text-sm">
            Check-in is from 2:00 PM and check-out is until 11:00 AM.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">Is parking available?</div>
          <div className="collapse-content text-sm">
            Yes, we offer free on-site parking for all guests.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">Are pets allowed?</div>
          <div className="collapse-content text-sm">
            Yes, we are a pet-friendly hotel. Please inform us in advance.
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-100 border border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title font-semibold">How do I modify or cancel a booking?</div>
          <div className="collapse-content text-sm">
            You can manage your bookings through your account dashboard or contact our support team.
          </div>
        </div>
      </div>
    
  );
};

export default FAQ;
