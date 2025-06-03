import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  return (
    <section className="how-it-works-section">
      <div className="container text-center py-5">
        <b>
          <h2>How It Works</h2>
          <p>
            Our simple 4-step process to launch your successful ad campaign:
          </p>
        </b>
        <div className="row mt-4">
          <div className="col-md-3">
            <div className="step-box">
              <h3>1. Consultation</h3>
              <p>
                We understand your brand's goals and target audience to craft a
                tailored strategy.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="step-box">
              <h3>2. Creative Development</h3>
              <p>
                Our creative team designs eye-catching ads that resonate with
                your audience.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="step-box">
              <h3>3. Launch</h3>
              <p>
                We deploy your ad campaign across selected channels and
                platforms.
              </p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="step-box">
              <h3>4. Optimization & Reporting</h3>
              <p>
                We track the performance and continuously optimize for results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
