import React from 'react'
import PropTypes from 'prop-types'

import SearchResult from './SearchResult'

export const SearchResults = props => {
  if (!props.films) {
    return null
  } else {
    return (
      <div className='search-results'>
        {props.films.map(film => 
          <SearchResult key={film.episode_id} {...film} />
        )}
      </div>
    )
  }
}

SearchResults.propTypes = { 
  films: PropTypes.array.isRequired
}
