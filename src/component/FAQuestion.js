import React, { useState, useEffect } from "react";
import "../style/faq.css";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { question: "What is EMI?", answer: "EMI (Equated Monthly Installment) is a fixed amount paid by a borrower to a lender every month until the loan is fully repaid." },
    { question: "How is EMI calculated?", answer: "EMI is calculated based on the loan amount, interest rate, and tenure using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1]." },
    { question: "What factors affect my EMI amount?", answer: "The EMI amount depends on loan principal, interest rate, and tenure. A higher interest rate or longer tenure increases the total payable amount." },
    { question: "Can I prepay my loan?", answer: "Yes, most banks allow prepayment, but some charge a penalty. Check with your lender for details." },
    { question: "Does my credit score affect my EMI?", answer: "Yes, a higher credit score can help you get a lower interest rate, reducing your EMI burden." }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".faq-item").forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 50) {
          item.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="faq-container">
      <h2 className="faq-heading">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`} onClick={() => toggleFAQ(index)}>
            <div className="faq-question">
              {faq.question}
              <span className={`faq-icon ${openIndex === index ? 'rotate' : ''}`}>➕</span>
            </div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
