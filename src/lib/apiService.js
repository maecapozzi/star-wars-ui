import axios from 'axios'

const charactersUrl = './characters.json'

export const loadCharacters = () => {
  return axios.get(charactersUrl)
    .then(response => response.data.characters)
}

export const getUrls = url => {
  return axios.get(url)
    .then(response => response.data)
}

export const makeMultipleServerRequests = promises => {
  return axios.all(promises)
    .then(axios.spread((...responses) => responses))
}

export const setPromisesArray = (array) => { 
  return array.reduce((promiseArray, url) => {
    promiseArray.push(axios.get(url))
    return promiseArray
  }, [])
}
