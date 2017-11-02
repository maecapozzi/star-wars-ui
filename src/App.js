import React, { Component } from 'react'
import axios from 'axios'

import SelectForm from './components/selects/SelectForm'
import { SearchResults } from './components/results'
import { loadCharacters, getUrls, makeMultipleServerRequests, setPromisesArray } from './lib/apiService'
import { setCharacters } from './lib/selectHelper'
import { formatDate, setFilms } from './lib/filmsHelper'

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
    getUrls(filmUrl)
      .then(response => {
        if (response.name === this.state.value) {
          const promises = setPromisesArray(response.films)
          makeMultipleServerRequests(promises)
            .then(responses => this.setState({ films: setFilms(responses) }))
        } else {
          const errorMessage = "Could not find this character's films."
          this.setState({ errors: errorMessage })
        }
      })
      .catch(error => {
      if (error.response.status === 404) {
        const errorMessage = 'The request has failed.'

        this.setState({ errors: errorMessage })
      }
    })
  }

  componentDidMount () {
    loadCharacters()
      .then(data => this.setState({ characters: setCharacters(data) }))
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
