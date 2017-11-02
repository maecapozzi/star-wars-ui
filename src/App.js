import React, { Component } from 'react'
import axios from 'axios'

import SelectForm from './components/selects/SelectForm'
import { SearchResults } from './components/results'

class App extends Component {
  constructor () {
    super()

    this.url = './characters.json'
    this.state = {
      characters: [],
      selectedCharacter: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.getFilmUrls = this.getFilmUrls.bind(this)
    this.setFilmData = this.setFilmData.bind(this)
    this.formatDate = this.formatDate.bind(this)
  }

  handleChange (event) {
    let selectedCharacter = event.target.value

    this.setState({ 
      errors: '', 
      value: event.target.value 
    })

    this.state.characters.map(character => {
      if (character.name === selectedCharacter) {
        this.getFilmUrls(character.url)
      }
    })
  }

  getFilmUrls (filmUrl) {
    axios.get(filmUrl)
    .then((response) => {
      if (response.data.name === this.state.value) {
        const films = response.data.films
        this.setFilmData(films)
      } else {
        const errorMessage = "Could not find this character's films."
        this.setState({ errors: errorMessage })
      }
    }).catch(error => {
      if (error.response.status === 404) {
        const errorMessage = 'The request has failed.'
        this.setState({ errors: errorMessage })
      }
    })
  }

  setFilmData (filmUrls) {
    const promises = filmUrls.reduce((promiseArray, filmUrl) => {
      promiseArray.push(axios.get(filmUrl))
      return promiseArray
    }, [])

    axios.all(promises)
      .then(axios.spread((...responses) => {
        const films = responses.reduce((filmArray, response) => {
          const { episode_id, title, created } = response.data
          filmArray.push({ episode_id, title, date: this.formatDate(created) })
          return filmArray
        }, [])
        this.setState({ films })
      })
    )
  }

  formatDate (date) {
    const newDate = new Date(date).toISOString().substring(0, 10)
    const format = { month: 'long', day: 'numeric', year: 'numeric', weekday: 'long' }
    return new Date(newDate).toLocaleDateString('en-US', format)
  }

  componentWillMount () {
    axios.get(this.url)
    .then((response) => {
      const characters = response.data.characters.reduce((characterArray, character) => {
        const { id, name, url } = character
        characterArray.push({ id, name, url })
        return characterArray
      }, [])
      this.setState({ characters })
    })
    .catch((error) => {
      const errorMessage = "I couldn't get the characters. Please refresh the page."
      this.setState({ errors: errorMessage })
    })
  }

  render () {
    if (this.state.errors) {
      return (
        <div className='app'>
          <h1>Star Wars Character Search</h1>
          <p>{this.state.errors}</p>
          <SelectForm characters={this.state.characters} handleChange={this.handleChange} />
        </div>
      )
    } else {
      return (
        <div className='app'>
          <h1>Star Wars Character Search</h1>
          <p>{this.state.errors}</p>
          <SelectForm characters={this.state.characters} handleChange={this.handleChange} />
          <SearchResults
            films={this.state.films}
          />
        </div>
      )
    }
  }
}

export default App