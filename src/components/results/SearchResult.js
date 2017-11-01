import React from 'react'
import PropTypes from 'prop-types'

const SearchResult = props => (
  <div>
    <p className='search-results__p'>
      <span>The film </span>
      <span className='search-results__film'>{props.title} </span>
      <span>was released on </span>
      <span>{props.date}</span>
    </p>
  </div>
)

export default SearchResult

SearchResult.propTypes = { 
  title: PropTypes.string.isRequired, 
  date: PropTypes.string.isRequired
}
