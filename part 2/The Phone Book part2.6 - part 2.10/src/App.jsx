import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleAddButton = (event) => {
    event.preventDefault()
    if(persons.some((person)=>person.name === newName)){
      alert(`name ${newName} is already in the phonebook`)
      return
    }
    if(persons.some((person) => person.number === newNumber)){
      alert(`number ${newNumber} is already in the phonebook`)
      return
    }
    if(newName === '' || newNumber === ''){
      alert('dont add void inputs')
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
          number: <input value={newNumber} onChange={(event) => {setNewNumber(event.target.value)}} />
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
              {person.name} {person.number}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default App