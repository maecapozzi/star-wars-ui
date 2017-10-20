import React from 'react'
import axios from 'axios'
import SelectForm from './SelectForm'

class App extends React.Component {
  constructor () {
    super()

    this.url = './characters.json'
    this.state = {
      characters: []
    }
  }

  componentWillMount () {
    axios.get(this.url)
    .then((response) => {
      const characters = response.data.characters.reduce((characterArray, character) => {
        const { name, url } = character
        characterArray.push({ name, url })
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
    return (
      <div className="app">
        <h1>Star Wars Character Search</h1>
        <p>{this.state.errors}</p>
        <SelectForm characters={this.state.characters} />
      </div>
    )
  }
}

export default App;
