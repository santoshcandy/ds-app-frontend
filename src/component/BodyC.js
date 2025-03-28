import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../style/body.css";
import gold from "../image/gold.jpg";
import house from "../image/house.jpg";
import instent from "../image/instent.jpg";
import low from "../image/low.jpg";
import mortgage from "../image/OIP.jpg";
import personal from "../image/personal.jpg";

const loanServices = [
  { img: instent, title: "Instant Loan", description: "Get quick cash within minutes with minimal documentation and hassle-free approval." },
  { img: personal, title: "Personal Loan", description: "Flexible loan for education, weddings, travel, or home renovation at great rates." },
  { img: mortgage, title: "Mortgage Loan", description: "Secure a high loan amount by mortgaging your property with low interest rates." },
  { img: low, title: "Low Interest Loan", description: "Save more with our lowest interest rates while fulfilling your financial needs." },
  { img: gold, title: "Gold Loan", description: "Pledge your gold and get instant funds at attractive interest rates." },
  { img: house, title: "Home Loan", description: "Turn your dream home into reality with easy and affordable loan plans." },
];

const BodyC = () => {
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    const revealElements = document.querySelectorAll(".loan-card");

    const revealOnScroll = () => {
      revealElements.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 50) {
          el.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return (
    <div className="loan-container">
      <div className="loan-header">
        <div className="loan-text">
          <h2>Get a Loan Easily</h2>
          <p>Get hassle-free loans with quick approvals and low interest rates, tailored to your needs.</p>
        </div>

        {/* Apply Now Button with Navigation */}
        <button className="apply-btn" onClick={() => navigate("/apply")}>
          Apply Now
        </button>
      </div>

      <div className="loan-services">
        {loanServices.map((loan, index) => (
          <div className="loan-card" key={index}>
            <img src={loan.img} alt={loan.title} />
            <h3>{loan.title}</h3>
            <p>{loan.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodyC;
