import axios from 'axios'

const baseUrl = './characters.json'

export const loadCharacters = () => { 
  return axios.get(baseUrl)
    .then((response) => response.data.characters)
}