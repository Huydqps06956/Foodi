import React, { useEffect, useRef, useState } from 'react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Cards from '../../components/Cards'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { getMenu } from '../../api/menuService'
const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([])

  const slider = useRef(null)

  useEffect(() => {
    getMenu().then((res) => {
      const specials = res.filter((item) => item.category === 'popular')
      setRecipes(specials)
    })
  }, [])

  //settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
    /*  nextArrow: <simpleNextArrow />,
    prevArrow: <simplePrevArrow />*/
  }
  return (
    <div className='section-container my-20 relative'>
      <div className='text-left'>
        <p className='subtitle'>Special Dishes</p>
        <h2 className='title md:w-[520px]'>Standout Dishes From Our Menu</h2>
      </div>
      {/**arrow btn */}
      <div className='md:absolute right-3 top-8 mb-10 md:mr-24'>
        <button
          onClick={() => slider?.current?.slickPrev()}
          className='btn p-2 rounded-full ml-5 text-2xl'
        >
          <FaAngleLeft className='w-8 he-8 p-1' />
        </button>
        <button
          onClick={() => slider?.current?.slickNext()}
          className='btn p-2 rounded-full ml-5 bg-green text-2xl'
        >
          <FaAngleRight className='w-8 he-8 p-1' />
        </button>
      </div>

      <Slider
        ref={slider}
        {...settings}
        className='overflow-hidden mt-10 space-x-5'
      >
        {recipes.map((item, i) => (
          <Cards key={i} item={item} />
        ))}
      </Slider>
    </div>
  )
}

export default SpecialDishes
