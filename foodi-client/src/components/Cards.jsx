import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
import { useAuth } from '../contexts/AuthProvider'
import useCart from '../hooks/useCart'

import Swal from 'sweetalert2'
import { addToCartApi } from '../api/cartService'

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item
  const [isHeartFillted, setIsHeartFillted] = useState(false)
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { refetch } = useCart()
  const handleHeartClick = () => {
    setIsHeartFillted(!isHeartFillted)
  }
  //add to cart btn
  const handleAddToCart = (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email
      }

      addToCartApi(cartItem)
        .then((res) => {
          if (res) {
            refetch()
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Food added on the cart.',
              showConfirmButton: false,
              timer: 1500
            })
          }
        })
        .catch((error) => {
          console.log(error.response.data.message)
          const errorMessage = error.response.data.message
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500
          })
        })
    } else {
      Swal.fire({
        title: 'Please Login?',
        text: "Without an account can't able to add products",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Signup Now!!'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } })
        }
      })
    }
  }

  return (
    <div className='card shadow-xl relative mr-5 md:my-5'>
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 heartStar bg-green ${
          isHeartFillted ? 'text-rose-500' : 'text-white'
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className='h-5 w-5 cursor-pointer' />
      </div>
      <Link to={`/menu/${item.id}`}>
        <figure>
          <img
            src={item.image}
            alt={item.name}
            className='hover:scale-105 transition-all duration-200 md:h-72'
          />
        </figure>
      </Link>
      <div className='card-body'>
        <Link to={`/menu/${item.id}`}>
          <h2 className='card-title'>{item.name}</h2>
        </Link>
        <p>Description of the item</p>
        <div className='card-actions justify-between items-center mt-2'>
          <h5 className='font-semibold'>
            <span className='text-sm text-red'>$</span>
            {item.price}
          </h5>
          <button
            className='btn bg-green text-white'
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cards
