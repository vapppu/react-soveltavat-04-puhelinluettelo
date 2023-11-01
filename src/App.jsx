import { useState, useEffect } from "react";

import AddPerson from './components/AddPerson'
import ListPersons from './components/ListPersons'
import FilterForm from './components/FilterForm'
import axios from "axios";
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

  const updateSearchTerm = (string) => {
    setSearchTerm(string)
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm filterPersons={filterPersons} searchTerm = {searchTerm} updateSearchTerm = {updateSearchTerm}/>
      <AddPerson persons = {persons} addPerson = {addPerson}/>
      <ListPersons filteredPersons = {filteredPersons} />
    </div>
  );
};

export default App;
