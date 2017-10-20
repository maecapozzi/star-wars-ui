import React from 'react'
import SearchResult from './SearchResult'

const SearchResults = props => {
  if (!props.films) {
    return null
  } else {
    return (
      <div className="search-results">
        {props.films.map(film => <SearchResult key={film.episode_id} title={film.title} date={film.date} />)}
      </div>
    )
  }
}

export default SearchResults