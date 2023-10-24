import { useState } from "react";

import AddPerson from './components/AddPerson'
import ListPersons from './components/ListPersons'
import FilterForm from './components/FilterForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [filteredPersons, setFilteredPersons] = useState(persons)

  const showPersons = (substring) => {
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
      <FilterForm filterPersons={(substring) => showPersons(substring)}/>
      <AddPerson persons = {persons} updatePersons = {(person) => updatePersons(person)}/>
      <ListPersons filteredPersons = {filteredPersons} />
    </div>
  );
};

export default App;
