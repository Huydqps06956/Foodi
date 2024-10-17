import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards'
import { FaFilter } from 'react-icons/fa'
import { getMenu } from '../../api/menuService'

const Menu = () => {
  const [menu, setMenu] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortOption, setSortOption] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)

  // Loading data
  useEffect(() => {
    getMenu().then((data) => {
      setMenu(data)
      setFilteredItems(data)
    })
  }, [])

  // Filtering data based on category
  const filterItems = (category) => {
    const filtered =
      category === 'all'
        ? menu
        : menu.filter((item) => item.category === category)

    setFilteredItems(filtered)
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  // Show all data function
  const showAll = () => {
    setFilteredItems(menu)
    setSelectedCategory('all')
    setCurrentPage(1)
  }

  // Sorting based on A-Z, Z-A, Low-High pricing
  const handleSortChange = (option) => {
    setSortOption(option)
    let sortedItems = [...filteredItems]

    switch (option) {
      case 'A-Z':
        sortedItems.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'Z-A':
        sortedItems.sort((a, b) => b.name.localeCompare(a.name))
        break
      case 'low-to-high':
        sortedItems.sort((a, b) => a.price - b.price)
        break
      case 'high-to-low':
        sortedItems.sort((a, b) => b.price - a.price)
        break
      default:
        break
    }

    setFilteredItems(sortedItems)
    setCurrentPage(1)
  }

  //pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div>
      {/** Menu banner */}
      <div className='max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%'>
        <div className='py-48  flex flex-col justify-center items-center gap-8'>
          {/** Texts */}
          <div className='text-center space-y-7 px-4'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>
              Dive into Delights Of Delectable
              <span className='text-green'> Food</span>
            </h2>
            <p className='text-xl text-[#4a4a4a]'>
              Where Each Plate Weaves a Story of Culinary Mastery and Passionate
              Craftsmanship
            </p>
            <button className='btn bg-green px-8 py-3 font-semibold text-white rounded-full'>
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/** Menu shop section */}
      <div className='section-container'>
        {/** Filtering and sorting */}
        <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>
          {/** All category buttons */}
          <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap'>
            <button
              onClick={showAll}
              className={selectedCategory === 'all' ? 'active' : ''}
            >
              All
            </button>
            <button
              className={selectedCategory === 'salad' ? 'active' : ''}
              onClick={() => filterItems('salad')}
            >
              Salad
            </button>
            <button
              className={selectedCategory === 'pizza' ? 'active' : ''}
              onClick={() => filterItems('pizza')}
            >
              Pizza
            </button>
            <button
              className={selectedCategory === 'soup' ? 'active' : ''}
              onClick={() => filterItems('soup')}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems('dessert')}
              className={selectedCategory === 'dessert' ? 'active' : ''}
            >
              Desserts
            </button>
            <button
              className={selectedCategory === 'drinks' ? 'active' : ''}
              onClick={() => filterItems('drinks')}
            >
              Drinks
            </button>
          </div>

          {/** Sorting based filtering */}
          <div className='flex justify-end mb-4 rounded-sm'>
            <div className='bg-black p-2'>
              <FaFilter className='h-4 w-4 text-white' />
            </div>

            <select
              name='sort'
              id='sort'
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className='bg-black text-white px-2 py-1 rounded-sm'
            >
              <option value='default'>Default</option>
              <option value='A-Z'>A-Z</option>
              <option value='Z-A'>Z-A</option>
              <option value='low-to-high'>Low to High</option>
              <option value='high-to-low'>High to Low</option>
            </select>
          </div>
        </div>

        {/** Products card */}
        <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4'>
          {currentItems.map((item, index) => (
            <Cards item={item} key={`_${index}_${item._id}`} />
          ))}
        </div>
      </div>

      {/**Pagination section */}
      <div className='flex justify-center my-8'>
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage)
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1 ? 'bg-green text-white' : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Menu
