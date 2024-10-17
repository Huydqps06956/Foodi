import React, { useMemo } from 'react'
import { useAuth } from '../contexts/AuthProvider'
import { useQuery } from '@tanstack/react-query'

const useCart = () => {
  const { user } = useAuth()
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['cart', user?.email],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:6001/cart?email=${user?.email}`
      )
      return response.json()
    }
  })

  // Memoize the total quantity calculation
  const totalQuantity = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  return { cart, refetch, totalQuantity }
}

export default useCart
