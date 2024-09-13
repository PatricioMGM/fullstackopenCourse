import { useState, useEffect } from 'react'
import axios from 'axios'

const FilterInput = ({filter, setFilter}) => {
  return(
    <div><p>filter shown with <input  value={filter} onChange={(event) => {setFilter(event.target.value)}} /></p></div>
  )
}

const FormToAddNewPeople = ({newName, setNewName, newNumber, setNewNumber, handleAddButton}) => {
  return(
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
  )
}

const Person = ({person}) => {
  return(
    <div>
      <p>{person.name} {person.number}</p>
    </div>
  )
}

const Numbers = ({personsFiltered}) => {
  return(
    personsFiltered.length > 0 
    ? personsFiltered.map((person) => (
        <Person person={person} key={person.id}/>
      ))
    : <p>No persons with that name found</p>
  )
}

const App = () => {

  useEffect(() =>{
    console.log('efecting');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log(persons)
      })
  }, [])

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
      <FilterInput filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <FormToAddNewPeople newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleAddButton={handleAddButton} />
      <h2>Numbers</h2>
      <Numbers personsFiltered={personsFiltered} />
    </div>
  )
}

export default App