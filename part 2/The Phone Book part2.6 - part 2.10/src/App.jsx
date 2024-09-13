import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const personsFiltered = filter != ''
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())) 
  : persons;

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
      {name: newName, number: newNumber, id: persons.length + 1}
    ))
    setNewNumber('')
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div><p>filter shown with <input  value={filter} onChange={(event) => {setFilter(event.target.value)}} /></p></div>
      <h2>add a new</h2>
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
      {personsFiltered.length > 0 
        ? personsFiltered.map((person) => (
            <div key={person.id}>
              <p>{person.name} {person.number}</p>
            </div>
          ))
        : <p>No persons with that name found</p>
      }
    </div>
  )
}

export default App