import { useState, useEffect } from "react";

import AddPerson from './components/AddPerson'
import ListPersons from './components/ListPersons'
import FilterForm from './components/FilterForm'
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([])
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const personDB = 'http://localhost:3001/persons'

  useEffect(() => {
    console.log("Fetch persons")
    axios
      .get(personDB)
      .then((result) => {
        console.log(result.data)
        setPersons(result.data)
      })
  }, [])

  useEffect(() => {
    setFilteredPersons(persons)
  }, [persons])

  const filterPersons = (substring) => {
    const filtered = persons.filter((person) => person.name.toLowerCase().includes(substring.toLowerCase()))
    setFilteredPersons(filtered)
  }

  const updatePersons = (person) => {
    if (!persons.find((personInList) => personInList.name.toLowerCase() === person.name.toLowerCase())) {
      const newPersons = persons.concat(person)
      setPersons(newPersons)
      setFilteredPersons(newPersons)
      console.log(`${person.name} added to book`)
    }

    else {
      alert(`${person.name} is already added in the phone book`)
    }
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm filterPersons={(substring) => filterPersons(substring)}/>
      <AddPerson persons = {persons} updatePersons = {(person) => updatePersons(person)}/>
      <ListPersons filteredPersons = {filteredPersons} />
    </div>
  );
};

export default App;
