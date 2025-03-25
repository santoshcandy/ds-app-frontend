import "../style/style.css";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gold from "../image/gold.jpg";
import house from "../image/house.jpg";
import instent from "../image/instent.jpg";
import low from "../image/low.jpg";
import quick from "../image/quick.jpg";
import mortage from "../image/OIP.jpg";
import personal from "../image/personal.jpg";

const Body = () => {
  const navigate = useNavigate();
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.dataset.index, 10);
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const loans = [
    { title: "Instant Loan", img: instent },
    { title: "Personal Loan", img: personal },
    { title: "Mortage Loan", img: mortage },
    { title: "Low Interest", img: low },
    { title: "Instant Processing", img: instent },
    { title: "Gold Loan", img: gold },
    { title: "House Loan", img: house },
  ];

  return (
    <main className="mt-3">
      {/* Hero Section */}
      <section className="hero-section text-center text-white">
        <div className="overlay">
          <h1 className="animate__animated animate__fadeInDown">Get Your Loan Instantly</h1>
          <p className="animate__animated animate__fadeInUp">
            Fast approval, low interest rates, and quick processing.
          </p>
        </div>
        <div className="text-center my-4">
        <button className="btn btn-primary btn-lg px-4" onClick={() => navigate("/apply")}>Apply Now</button>
      </div>
      </section>

      {/* Loan Types Section */}
      <section className="container my-5">
        <h2 className="text-center mb-4">Our Loan Services</h2>
        <div className="row justify-content-center">
          {loans.map((loan, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el)}
              data-index={index}
              className={`col-md-4 col-sm-6 mb-4 d-flex justify-content-center loan-card-container ${
                visibleIndexes.includes(index) ? "slide-in" : ""
              }`}
            >
              <div className="card loan-card shadow-sm">
                <img src={loan.img} className="card-img-top" alt={loan.title} />
                <div className="card-body text-center">
                  <h5 className="card-title">{loan.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Apply Now Button */}
     
    </main>
  );
};

export default Body;
