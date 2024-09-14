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

const DeleteButton = ({handleDeleteButton, idPerson, person}) => {
  return(
    <button onClick={ () => handleDeleteButton(idPerson, person)}>
      delete
    </button>
  )
}

const Person = ({person, handleDeleteButton}) => {
  return(
    <div>
      {person.name} {person.number} <DeleteButton handleDeleteButton={handleDeleteButton} idPerson={person.id} person={person.name} />
    </div>
  )
}

const Numbers = ({personsFiltered, handleDeleteButton}) => {
  return(
    personsFiltered.length > 0 
    ? personsFiltered.map((person) => (
        <Person person={person} handleDeleteButton={handleDeleteButton} key={person.id}/>
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
    let personV = {};
    if (persons.some((person) => person.name === newName ? personV = person : null)) {
      if (window.confirm(`${newName} is already in the phonebook, do you want to replace the phone number?`)) {
        personService.update(personV.id, { name: newName, number: newNumber, id: personV.id })
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== personV.id ? person : updatedPerson));
            setNewName('');
            setNewNumber('');
            alert('number changed successfully')
          })
          .catch(error => {
            alert(`Failed to update ${newName}. It may have already been removed from the server.`);
          });
      }
      return;
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

  const handleDeleteButton = (idPerson, person) => {
    
    if (window.confirm(`Are you sure you want to delete this person: ${person}?`)) {
      personService
        .delete(idPerson)
        .then(response => {
          alert('Successfully deleted');
          setPersons(persons.filter(p => p.id !== idPerson));
        })
        .catch(error => {
          alert(`Failed to delete ${person}. It may have already been removed from the server.`);
        });
    }
  };
  



  return (
    <div>
      <h2>Phonebook</h2>
      <FilterInput filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <FormToAddNewPeople newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} handleAddButton={handleAddButton} />
      <h2>Numbers</h2>
      <Numbers personsFiltered={personsFiltered} handleDeleteButton={handleDeleteButton} />
    </div>
  )
}

export default App