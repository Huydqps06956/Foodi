import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthProvider'

const Modal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const { signUpWithGmail, login } = useAuth()
  const [errorMessage, setErrorMessage] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const from = location.state?.from?.pathname || '/'

  const onSubmit = (data) => {
    const email = data.email
    const password = data.password
    login(email, password)
      .then((result) => {
        const user = result.user
        alert('Login Successfull!')
        document.getElementById('mymodal').close()
        navigate(from, { replace: true })
      })
      .catch((error) => {
        setErrorMessage('Provide a correct email and password!')
      })
  }

  //google signin
  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user
        alert('Login successfull!')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <dialog id='mymodal' className='modal modal-middle'>
      <div className='modal-box'>
        <div className='modal-action flex flex-col justify-center mt-0'>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='card-body'
            method='dialog'
          >
            <h3 className='font-blod text-lg'>Please Login!</h3>
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
            {errorMessage && <p className='text-red text-xs'>{errorMessage}</p>}

            {/*Login button */}
            <div className='form-control mt-6'>
              <input className='btn bg-green' type='submit' value='Login' />
            </div>
            <p className='text-center text-gray-500 my-2'>
              Donot have an account?
              <Link className='underline text-red ml-1' to='/signup'>
                Signup Now
              </Link>
            </p>

            {/* close btn */}
            <button
              onClick={() => document.getElementById('mymodal').close()}
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              htmlFor='mymodal'
            >
              ✕
            </button>
          </form>

          {/* social sign in */}
          <div className='text-center space-x-3 mb-5'>
            <button
              onClick={handleLogin}
              className='btn btn-circle hover:bg-green hover:text-white'
            >
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
      </div>
      <label
        className='modal-backdrop'
        htmlFor='mymodal'
        onClick={() => document.getElementById('mymodal').close()}
      >
        Close
      </label>
    </dialog>
  )
}

export default Modal
