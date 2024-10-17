import axiosClient from './axiosClient'

//get all menu item
export const getMenu = async () => {
  try {
    const res = await axiosClient.get('/menu')
    return res.data
  } catch (error) {
    console.error('Error fetching menu:', error)
    throw error
  }
}
