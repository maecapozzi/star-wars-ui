import { getUrls, makeMultipleServerRequests, setPromisesArray } from './apiService'

export const formatDate = date => {
  const newDate = new Date(date).toISOString().substring(0, 10)
  const format = { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' }
  return new Date(newDate).toLocaleDateString('en-US', format)
}

export const setFilms = responses => { 
  const films = responses.reduce((filmArray, response) => {
    const { episode_id, title, created } = response.data
    filmArray.push({ episode_id, title, date: formatDate(created) })
    return filmArray
  }, [])

  return films
}