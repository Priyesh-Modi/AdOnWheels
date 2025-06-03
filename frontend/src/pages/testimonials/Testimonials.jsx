import React from "react";
import "./Testimonials.css";
import Footer from "../../footer";

const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container text-center py-5">
        <b>
          <h2>What Our Clients Say</h2>
          <p>Hear from our satisfied clients:</p>
        </b>
        <div className="row mt-4">
          <div className="col-md-4">
            <div className="testimonial-box">
              <p>
                "AdOnWheels transformed our local business with their innovative
                vehicle advertising. We saw a 30% increase in foot traffic!"
              </p>
              <h5>John Doe, Business Owner</h5>
            </div>
          </div>
          <div className="col-md-4">
            <div className="testimonial-box">
              <p>
                "Their creative development team nailed our branding. We’ve
                never seen engagement this high on our campaigns."
              </p>
              <h5>Jane Smith, Marketing</h5>
            </div>
          </div>
          <div className="col-md-4">
            <div className="testimonial-box">
              <p>
                "We love how data-driven their approach is. Their campaigns
                consistently outperform our expectations."
              </p>
              <h5>Mark Johnson, CEO</h5>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </section>
  );
};

export default Testimonials;
