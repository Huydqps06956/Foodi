import axiosClient from './axiosClient'

//add to cart
export const addToCartApi = async (item) => {
  try {
    const res = await axiosClient.post('/cart', item)
    return res.data
  } catch (error) {
    console.error('Error with POST request:', error)
    throw error
  }
}
//delete item in cart
export const deleteCartItemApi = async (item) => {
  try {
    const res = await axiosClient.delete(`/cart/${item._id}`)
    return res.data
  } catch (error) {
    console.error('Error with Delete request:', error)
    throw error
  }
}

//update item in cart

export const updateCartItemApi = async (item) => {
  try {
    const res = await axiosClient.put(`/cart/${item._id}`, {
      quantity: item.quantity
    })
    return res.data
  } catch (error) {
    console.error('Error with Put request:', error)
    throw error
  }
}
