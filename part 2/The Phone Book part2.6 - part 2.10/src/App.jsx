import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleAddButton = (event) => {
    event.preventDefault()
    if(persons.some((person)=>person.name === newName)){
      alert(`${newName} is already in the phonebook`)
      return
    }
    setPersons(persons.concat(
      {name: newName}
    ))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(event) =>{setNewName(event.target.value)}} />
        </div>
        <div>
          <button onClick={handleAddButton} type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=>{
        return (
          <div key={person.name}>
            <p>
              {person.name}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default App