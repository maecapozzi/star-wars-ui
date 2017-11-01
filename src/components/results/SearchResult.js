import React from 'react'

const SearchResult = props => {
  return (
    <div>
      <p className='search-results__p'>
        <span>The film </span>
        <span className='search-results__film'>{props.title} </span>
        <span>was released on </span>
        <span>{props.date}</span>
      </p>
    </div>
  )
}

export default SearchResult
