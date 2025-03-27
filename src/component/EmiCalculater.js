import "../style/emicaclulater.css";
import React, { useState, useEffect } from "react";
import { Slider, Typography } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(10);
  const [years, setYears] = useState(1);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, years]);

  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 100 / 12;
    const n = years * 12;

    if (r > 0) {
      const emiAmount = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(emiAmount.toFixed(0));
      setTotalPayment((emiAmount * n).toFixed(0));
      setTotalInterest((emiAmount * n - P).toFixed(0));
    } else {
      setEmi((P / n).toFixed(0));
      setTotalPayment(P.toFixed(0));
      setTotalInterest("0");
    }
  };

  const chartData = [
    { name: "Total Interest", value: parseFloat(totalInterest), color: "#007bff" },
    { name: "Total Amount Payable", value: parseFloat(totalPayment), color: "#FFA500" },
  ];

  // Scroll Animation Effect
  useEffect(() => {
    const handleScrollAnimation = () => {
      document.querySelectorAll(".emi-container, .emi-left, .emi-right").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
          el.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation();

    return () => window.removeEventListener("scroll", handleScrollAnimation);
  }, []);

  return (
    <div className="emi-container">
      {/* Left Side: Sliders */}
      <div className="emi-left">
        <div className="slider-container">
          <Typography className="slider-title">If you take a loan of</Typography>
          <Typography className="slider-value">₹{loanAmount.toLocaleString()}</Typography>
          <Slider
            value={loanAmount}
            onChange={(e, newValue) => setLoanAmount(newValue)}
            min={10000}
            max={400000}
            step={1000}
          />
        </div>

        <div className="slider-container">
          <Typography className="slider-title">For a duration of</Typography>
          <Typography className="slider-value">{years} Years</Typography>
          <Slider
            value={years}
            onChange={(e, newValue) => setYears(newValue)}
            min={1}
            max={6}
            step={1}
          />
        </div>

        <div className="slider-container">
          <Typography className="slider-title">At an interest rate of</Typography>
          <Typography className="slider-value">{interestRate} % p.a.</Typography>
          <Slider
            value={interestRate}
            onChange={(e, newValue) => setInterestRate(newValue)}
            min={2}
            max={25}
            step={0.5}
          />
        </div>
      </div>

      {/* Right Side: EMI Details & Chart */}
      <div className="emi-right">
        <div className="emi-card">
          <div className="chart-container">
            <PieChart width={250} height={250}>
              <Pie data={chartData} dataKey="value" cx="50%" cy="50%" outerRadius={90} label={false}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <Typography className="emi-text">Your Monthly EMI is</Typography>
          <Typography className="emi-amount">₹{emi.toLocaleString()}</Typography>

          <div className="emi-summary">
  <div className="emi-box interest-box">
    <p>Total Interest</p>
    <p>₹{totalInterest.toLocaleString()}</p>
  </div>
  <div className="emi-box payable-box">
    <p>Total Amount Payable</p>
    <p>₹{totalPayment.toLocaleString()}</p>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default EMICalculator;
