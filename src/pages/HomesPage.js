import React from 'react'
import Navbar from '../component/HeaderH'
import Footer from '../component/Footer'
import EMICalculator from '../component/EmiCalculater'
import FAQSection from '../component/FAQuestion'
import BodyC from '../component/BodyC'

const HomesPage = () => {
  return (
    <div>
      <Navbar/>
      <BodyC/>
      <EMICalculator/>
      <FAQSection/>
      <Footer/>
    </div>
  )
}

export default HomesPage
