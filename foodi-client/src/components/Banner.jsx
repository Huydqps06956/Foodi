import React from 'react'

const Banner = () => {
  return (
    <div className='section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
      <div className='py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8'>
        {/** images */}
        <div className='md:w-1/2'>
          <img src='/images/home/banner.png' alt='' />
          <div className='flex flex-col md:flex-row gap-4 justify-around -mt-14 items-center'>
            <div className='flex bg-white rounded-2xl py-2 px-3 gap-3 shadow-md w-64'>
              <img
                className='rounded-2xl'
                src='/images/home/b-food1.png'
                alt=''
              />
              <div className='space-y-1'>
                <h5 className='font-medium -mb-1'>Spicy noodles</h5>
                <div className='rating rating-sm'>
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-500'
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-500'
                    defaultChecked
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-500'
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-500'
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-500'
                  />
                </div>
                <div className='text-red'>$18.00</div>
              </div>
            </div>
            <div className='sm:flex hidden bg-white rounded-2xl py-2 px-3 gap-3 shadow-md w-64'>
              <img
                className='rounded-2xl'
                src='/images/home/b-food1.png'
                alt=''
              />
              <div className='space-y-1'>
                <h5 className='font-medium -mb-1'>Spicy noodles</h5>
                <div className='rating rating-sm'>
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-500'
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-500'
                    defaultChecked
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-500'
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-500'
                  />
                  <input
                    type='radio'
                    name='rating-2'
                    className='mask mask-star-2 bg-yellow-500'
                  />
                </div>
                <div className='text-red'>$18.00</div>
              </div>
            </div>
          </div>
        </div>
        {/** texts */}

        <div className='md:w-1/2 space-y-7 px-4'>
          <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
            Dive into Delights Of Delectable
            <span className='text-green'> Food</span>
          </h2>
          <p className='text-xl text-[#4a4a4a] md:w-4/5 mx-auto'>
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <button className='btn bg-green px-8 py-3 font-semibold text-white rounded-full'>
            Order Nows
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
