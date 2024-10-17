import React, { Children } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { useLocation, Navigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()
  if (loading) {
    return <LoadingSpinner />
  }

  if (user) {
    return children
  }
  return <Navigate to='/signup' state={{ from: location }} replace></Navigate>
}

export default PrivateRouter
