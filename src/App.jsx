import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const newPerson = { name: newName };
    if (!persons.find((person) => person.name === newPerson.name)) {
      setPersons(persons.concat(newPerson))
      setNewName("")

      console.log(`${newName} added to book`)
    }
    else {
      console.log(`${newName} is already added in the phone book and therefore not added again`)
    }
    console.log("Setting new name to empty")
    setNewName("")
  };

  const handleChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={{ listStyle: "none" }}>
        {persons.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
