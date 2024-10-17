import React from 'react'
import { useForm } from 'react-hook-form'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Modal from './Modal'
import { useAuth } from '../contexts/AuthProvider'

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()
  const { createUser } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  const onSubmit = (data) => {
    const email = data.email
    const password = data.password
    createUser(email, password)
      .then((result) => {
        const user = result.user
        alert('Account creation successfull done!')
        document.getElementById('mymodal').close()

        navigate(from, { replace: true })
      })
      .catch((error) => {
        const errorCode = error.errorCode
        const errorMessage = error.message
      })
  }

  return (
    <div className='max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20'>
      <div className='modal-action flex flex-col justify-center mt-0'>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='card-body'
          method='dialog'
        >
          <h3 className='font-blod text-lg'>Create A Account!</h3>
          {/* email */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Email</span>
            </label>
            <input
              type='email'
              placeholder='email'
              className='input input-bordered'
              required
              {...register('email')}
            />
          </div>
          {/* password */}
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='password'
              className='input input-bordered'
              required
              {...register('password')}
            />
            <label className='label mt-1'>
              <a href='#' className='label-text-alt link link-hover'>
                Forgot password?
              </a>
            </label>
          </div>
          {/*error */}

          {/*Login button */}
          <div className='form-control mt-6'>
            <input className='btn bg-green' type='submit' value='Signup' />
          </div>
          <p className='text-center text-gray-500 my-2'>
            Have an account?
            <button
              onClick={() => document.getElementById('mymodal').showModal()}
              className='underline text-red ml-1'
            >
              Login
            </button>
          </p>
          <Link
            to='/'
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
          >
            ✕
          </Link>
        </form>

        {/* social sign in */}
        <div className='text-center space-x-3 mb-5'>
          <button className='btn btn-circle hover:bg-green hover:text-white'>
            <FaGoogle />
          </button>
          <button className='btn btn-circle hover:bg-green hover:text-white'>
            <FaFacebookF />
          </button>
          <button className='btn btn-circle hover:bg-green hover:text-white'>
            <FaGithub />
          </button>
        </div>
      </div>
      <Modal />
    </div>
  )
}

export default Signup
