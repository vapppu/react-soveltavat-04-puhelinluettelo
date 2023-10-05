import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '1234'}]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    if (!persons.find((person) => person.name === newPerson.name)) {
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewNumber("")

      console.log(`${newName} added to book`)
    }
    else {
      console.log(`${newName} is already added in the phone book and therefore not added again`)
    }
    console.log("Setting new name to empty")
    setNewName("")
    setNewNumber("")
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
        {persons.map((person) => (
          <li key={person.name}>{person.name}: {person.number}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
