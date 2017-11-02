import React from 'react'
import PropTypes from 'prop-types'

const SearchResult = ({title, date}) => (
  <div>
    <p className='search-results__p'>
      <span>The film </span>
      <span className='search-results__film'>{title} </span>
      <span>was released on </span>
      <span>{date}</span>
    </p>
  </div>
)

export default SearchResult

SearchResult.propTypes = { 
  title: PropTypes.string.isRequired, 
  date: PropTypes.string.isRequired
}
