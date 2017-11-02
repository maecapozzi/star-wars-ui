export const setCharacters = array => {
  const characters = array.reduce((characterArray, character) => {
    const { name, url } = character
    characterArray.push({ name, url })
    return characterArray
  }, [])

  return characters
}
