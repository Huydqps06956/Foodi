import React, { useEffect, useState } from 'react'
import { FaRegUser } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider'
import useCart from '../hooks/useCart'
import Modal from './Modal'
import Profile from './Profile'
import Logo from '/logo.png'

const Navbar = () => {
  const [isSticky, setSticky] = useState(false)

  const { user } = useAuth()

  const { totalQuantity } = useCart()

  // handle scroll functions
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 0) {
        setSticky(true)
      } else {
        setSticky(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = (
    <>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className='p-2'>
            <li>
              <Link to='/menu'>All</Link>
            </li>
            <li>
              <Link to='/menu'>Salad</Link>
            </li>
            <li>
              <Link to='/menu'>Pizza</Link>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className='p-2'>
            <li>
              <a>Online Order</a>
            </li>
            <li>
              <a>Table Booking</a>
            </li>
            <li>
              <a>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a>Offers</a>
      </li>
    </>
  )

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out`}
    >
      <div
        className={
          isSticky ? 'shadow-md bg-base-100 transition-all duration-300' : ''
        }
      >
        <div className='navbar xl:px-24 max-w-screen-2xl container mx-auto'>
          <div className='navbar-start'>
            <div className='dropdown'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost lg:hidden'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h8m-8 6h16'
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
              >
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Parent</a>
                  <ul className='p-2'>
                    <li>
                      <a>Submenu 1</a>
                    </li>
                    <li>
                      <a>Submenu 2</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a>Item 3</a>
                </li>
              </ul>
            </div>
            <a>
              <img src={Logo} alt='Foodi' />
            </a>
          </div>
          <div className='navbar-center hidden lg:flex'>
            <ul className='menu menu-horizontal px-1'>
              {/* nav items*/}
              {navItems}
            </ul>
          </div>
          <div className='navbar-end'>
            {/*search btn */}
            <button className='btn btn-ghost btn-circle hidden lg:flex '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </button>

            {/*cart items */}
            <Link to='/cart'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle mr-3 hidden lg:flex items-center justify-center'
              >
                <div className='indicator'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  </svg>
                  <span className='badge badge-sm indicator-item'>
                    {totalQuantity}
                  </span>
                </div>
              </div>
            </Link>

            {/*login btn */}
            {user ? (
              <Profile user={user} />
            ) : (
              <button
                onClick={() => document.getElementById('mymodal').showModal()}
                className='btn bg-green rounded-full px-6 text-white flex items-center gap-2'
              >
                <FaRegUser />
                Login
              </button>
            )}

            <Modal />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
