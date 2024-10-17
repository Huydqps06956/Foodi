import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpecialDishes from './SpecialDishes'
import Testimonials from './Testimonials'
import OurService from './OurService'

const Home = () => {
  return (
    <div>
      <Banner />
      <Categories />
      <SpecialDishes />
      <Testimonials />
      <OurService />
    </div>
  )
}

export default Home
