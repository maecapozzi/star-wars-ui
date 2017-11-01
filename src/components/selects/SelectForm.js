import React, {Component} from 'react'
import axios from 'axios'
import { SearchResults } from '../results'

class SelectForm extends Component {
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
    this.displayErrors = this.displayErrors.bind(this)
  }

  displayErrors () {
    return <p className="errors">{this.state.errors}</p>
  }

  createSelectOptions () {
    let items = []
    const characters = this.props.characters.map(character => <option value={character.name}>{character.name}</option>)
    return [<option>Please select a character</option>, ...characters]
  }

  render () {
    return (
      <div>
        <p>{this.state.errors}</p>
        <div className="select__container">
          <select
            value={this.props.value}
            className="select"
            onChange={event => this.props.handleChange(event)}>
            {this.createSelectOptions()}
          </select>
        </div>
      </div>
    )
  }
}

export default SelectForm