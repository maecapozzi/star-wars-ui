import React from 'react'
import axios from 'axios'
import SearchResults from './SearchResults'

class SelectForm extends React.Component {
  constructor (props) {
    super(props)

    this.url = 'https://swapi.co/api/'

    this.state = {
      characters: props.characters,
      selectedCharacter: '',
      characterUrl: '',
      errors: '',
      value: ''
    }

    this.createSelectOptions = this.createSelectOptions.bind(this)
    this.getFilmUrls = this.getFilmUrls.bind(this)
    this.setFilmData = this.setFilmData.bind(this)
    this.formatDate = this.formatDate.bind(this)
    this.displayErrors = this.displayErrors.bind(this)
  }

  handleChange (event) {
    this.setState({ errors: '', value: event.target.value })
    let selectedCharacter = event.target.value
    this.props.characters.map(character => {
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
        const errorMessage = "The request has failed."
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
          return filmArray;
        }, [])
        this.setState({ films })
      })
    )
  }

  displayErrors () {
    return <p className="errors">{this.state.errors}</p>
  }

  formatDate (date) {
    const newDate = new Date(date)
    const dateLast = newDate.toISOString().substring(0, 10)
    const format = { month : 'long', day : 'numeric', year: 'numeric', weekday: 'long' };
    return new Date(dateLast).toLocaleDateString('en-US', format);
  }

  createSelectOptions () {
    let items = []
    const characters = this.props.characters.map(character => <option value={character.name}>{character.name}</option>)
    return [<option>Please select a character</option>, ...characters]
  }

  render () {
    if (this.state.errors) {
      return (
        <div>
          <p>{this.state.errors}</p>
          <div className="select__container">
            <select
              value={this.state.value}
              className="select"
              onChange={event => this.handleChange(event)}>
              {this.createSelectOptions()}
            </select>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="select__container">
            <select
              value={this.state.value}
              className="select"
              onChange={event => this.handleChange(event)}>
              {this.createSelectOptions()}

            </select>
          </div>
          <SearchResults
            selectedCharacter={this.state.selectedCharacter}
            films={this.state.films}
          />
        </div>
      )
    }
  }
}

export default SelectForm