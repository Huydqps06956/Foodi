import React, { useCallback, useMemo, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { deleteCartItemApi, updateCartItemApi } from '../../api/cartService'
import { useAuth } from '../../contexts/AuthProvider'
import useCart from '../../hooks/useCart'

const CartPage = () => {
  const { user } = useAuth()
  const { cart, refetch } = useCart()

  //calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity
  }
  //calculate total price
  const cartSubTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + calculatePrice(item)
    }, 0)
  }, [cart, calculatePrice])

  const orderTotal = cartSubTotal

  //handle delete item
  const handleDelete = useCallback(
    (item) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteCartItemApi(item)
            .then((res) => {
              if (res) {
                refetch()
                Swal.fire('Deleted!', 'Your item has been deleted.', 'success')
              }
            })
            .catch((error) => {
              console.error(error)
            })
        }
      })
    },
    [refetch]
  )

  //handle decrease function
  const handleDecrease = useCallback(
    (item) => {
      if (item.quantity > 1) {
        updateCartItemApi({ ...item, quantity: item.quantity - 1 }).then(() => {
          refetch()
        })
      } else {
        alert("Item quantity can't be zero")
      }
    },
    [refetch]
  )
  //handle increase function
  const handleIncrease = useCallback(
    (item) => {
      updateCartItemApi({ ...item, quantity: item.quantity + 1 }).then(() => {
        refetch()
      })
    },
    [refetch]
  )
  return (
    <div className='section-container'>
      {/* banner */}
      <div className='bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
        <div className='py-36 flex flex-col justify-center items-center gap-8'>
          {/** texts */}

          <div className=' space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
              Items Addted to The
              <span className='text-green'> Food</span>
            </h2>
          </div>
        </div>
      </div>
      {/* table */}

      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead className='bg-green text-white rounded-sm'>
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* cart item */}
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className='flex items-center gap-3'>
                    <div className='avatar'>
                      <div className='mask mask-squircle h-12 w-12'>
                        <img src={item.image} alt='' />
                      </div>
                    </div>
                  </div>
                </td>
                <td className='font-medium'>{item.name}</td>
                <td>
                  <button
                    className='btn btn-xs px-2'
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </button>
                  <input
                    className='w-10 mx-2 text-center overflow-hidden appearance-none'
                    type='number'
                    value={item.quantity}
                    onChange={() => console.log(item.quantity)}
                  />
                  <button
                    className='btn btn-xs px-2'
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                </td>
                <td>{calculatePrice(item).toFixed(2)}</td>
                <th>
                  <button
                    className='btn btn-ghost text-red btn-xs'
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*customer details */}
      <div className='my-12 flex flex-col md:flex-row justify-between items-start'>
        {user && (
          <div className='md:w-1/2 space-y-3'>
            <h3 className='font-medium'>Customer Details</h3>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
            <p>User_id: {user.uid}</p>
          </div>
        )}
        <div className='md:w-1/2 space-y-3'>
          <h3 className='font-medium'>Shopping Details</h3>
          <p>Total Items: {cart.length}</p>
          <p>Total Price ${orderTotal.toFixed(2)}</p>
          <button className='btn bg-green text-white'>Procceed Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default CartPage
