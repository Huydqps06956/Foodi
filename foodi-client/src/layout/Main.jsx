import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import '../../src/App.css'
import Footer from '../components/Footer'
import LoadingSpinner from '../components/LoadingSpinner'
import Navbar from '../components/Navbar'
import { AuthContext, useAuth } from '../contexts/AuthProvider'

const Main = () => {
  // const { loading } = useAuth
  const { loading } = useContext(AuthContext)
  return (
    <div className='bg-prigmayBG'>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <Navbar />
          <div className='min-h-screen'>
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Main
