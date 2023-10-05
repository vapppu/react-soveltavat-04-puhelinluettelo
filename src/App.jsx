import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const clearInputFields = () => {
    setNewName("")
    setNewNumber("")
  }
  const addName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (!persons.find((person) => person.name === newPerson.name)) {
      setPersons(persons.concat(newPerson))
      clearInputFields();

      console.log(`${newName} added to book`)
    }
    else {
      alert(`${newName} is already added in the phone book`)
    }
    clearInputFields();
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    console.log(event.target.value)
    const filtered = persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilteredPersons(filtered)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <div>Filter shown with: <input onChange={handleSearchChange} value={searchTerm}/></div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
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
