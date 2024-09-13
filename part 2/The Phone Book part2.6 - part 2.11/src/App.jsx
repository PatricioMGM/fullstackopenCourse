import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

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
    personService.getAll().then((persons) => setPersons(persons))
  }, [])

  const [persons, setPersons] = useState([])
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

    const personObjetc = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    personService.create(personObjetc).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson))
      setNewNumber('')
      setNewName('')
    })
    
    
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