import React, {Component} from 'react'
import PropTypes from 'prop-types'

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
    return <p className='errors'>{this.state.errors}</p>
  }

  createSelectOptions () {
    const characters = this.props.characters.map(character => <option value={character.name}>{character.name}</option>)
    return [<option>Please select a character</option>, ...characters]
  }

  render () {
    return (
      <div>
        <div className='select__container'>
          <select
            value={this.props.value}
            className='select'
            onChange={event => this.props.handleChange(event)}>
            {this.createSelectOptions()}
          </select>
        </div>
      </div>
    )
  }
}

export default SelectForm

SelectForm.propTypes = { 
  characters: PropTypes.array.isRequired, 
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

