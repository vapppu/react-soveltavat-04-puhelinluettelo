import { useState } from "react";
import AddPerson from './components/AddPerson'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  // const [newName, setNewName] = useState("");
  // const [newNumber, setNewNumber] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons)

  // const clearInputFields = () => {
  //   setNewName("")
  //   setNewNumber("")
  //   setSearchTerm("")
  // }

  // const addPerson = (event) => {
  //   event.preventDefault();
  //   const newPerson = { name: newName, number: newNumber };
  //   if (!persons.find((person) => person.name === newPerson.name)) {
  //     const newPersons = persons.concat(newPerson)
  //     setPersons(newPersons)
  //     setFilteredPersons(newPersons)
  //     clearInputFields();
  //     console.log(`${newName} added to book`)
  //   }
  //   else {
  //     alert(`${newName} is already added in the phone book`)
  //   }
  //   clearInputFields();
  // };

  // const handleNameChange = (event) => {
  //   setNewName(event.target.value);
  // };

  // const handleNumberChange = (event) => {
  //   setNewNumber(event.target.value);
  // }

  const handleSearchChange = (event) => {
    console.log(persons)
    console.log(filteredPersons)
    setSearchTerm(event.target.value)
    console.log(event.target.value)
    const filtered = persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredPersons(filtered)
  }


  const updatePersons = (person) => {
    if (!persons.find((personInList) => personInList.name.toLowerCase() === person.name.toLowerCase())) {
      const newPersons = persons.concat(person)
      setPersons(newPersons)
      setFilteredPersons(newPersons)
      setSearchTerm("")
      console.log(`${person.name} added to book`)
    }

    else {
      alert(`${person.name} is already added in the phone book`)
    }
  }


  return (
    <div>
      <h1>Phonebook</h1>
      <div>Filter shown with: <input onChange={handleSearchChange} value={searchTerm}/></div>

      <AddPerson persons = {persons} updatePersons = {(person) => updatePersons(person)}/>

      <h2>Numbers</h2>
      <ul style={{ listStyle: "none" }}>
        {filteredPersons.map((person) => (
          <li key={person.name}>{person.name}: {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
