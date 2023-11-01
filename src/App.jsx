import { useState, useEffect } from "react";

import AddPerson from './components/AddPerson'
import ListPersons from './components/ListPersons'
import FilterForm from './components/FilterForm'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState(persons)
  const [searchTerm, setSearchTerm] = useState("");

  const personDB = 'http://localhost:3001/persons'

  useEffect(() => {
    console.log("Fetch persons")
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons)
      })
  }, [])

  useEffect(() => {
    setFilteredPersons(persons)
  }, [persons])

  const filterPersons = (substring) => {
    const filtered = persons.filter((person) => person.name.toLowerCase().includes(substring.toLowerCase()))
    setFilteredPersons(filtered)
  }

  const addPerson = (person) => {
    if (!persons.find((personInList) => personInList.name.toLowerCase() === person.name.toLowerCase())) {
      personService
        .create(person)
        .then(returnedPerson => {
          console.log(returnedPerson)
          const newPersons = persons.concat(returnedPerson)
          setPersons(newPersons)
          setFilteredPersons(newPersons)
        })
    }

    else {
      alert(`${person.name} is already added in the phone book`)
    }
  }

  const removePerson = (person) => {
    console.log(`Removing person ${person.name}`)
    const personToRemove = persons.find((personInList) => personInList.id === person.id)
    personService
      .remove(personToRemove.id)
      .then((response) => {
        const newPersons = persons.filter(person => person.id !== personToRemove.id)
        setPersons(newPersons)
        setFilteredPersons(newPersons)
      })
      .catch(error => {
        alert(`Person ${person.name} was already deleted from server`)
        setPersons(persons.filter(person => person.id !== personToRemove.id))
      })

  }

  const updateSearchTerm = (string) => {
    setSearchTerm(string)
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm filterPersons={filterPersons} searchTerm = {searchTerm} updateSearchTerm = {updateSearchTerm}/>
      <AddPerson persons = {persons} addPerson = {addPerson}/>
      <ListPersons filteredPersons = {filteredPersons} removePerson = {removePerson}/>
    </div>
  );
};

export default App;
