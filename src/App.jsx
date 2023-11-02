import { useState, useEffect } from "react";

import AddPerson from "./components/AddPerson";
import ListPersons from "./components/ListPersons";
import FilterForm from "./components/FilterForm";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [searchTerm, setSearchTerm] = useState("");

  const personDB = "http://localhost:3001/persons";

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  useEffect(() => {
    setFilteredPersons(persons);
    setSearchTerm("")
  }, [persons]);

  const filterPersons = (substring) => {
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(substring.toLowerCase())
    );
    setFilteredPersons(filtered);
  };

  const addPerson = (person) => {
    const personInBook = persons.find(
      (personInList) =>
        personInList.name.toLowerCase() === person.name.toLowerCase()
    );

    if (!personInBook) {
      personService.create(person).then((returnedPerson) => {
        const newPersons = persons.concat(returnedPerson);
        setPersons(newPersons);
      });
    } else if (personInBook.number === person.number) {
      alert(`${personInBook.name} is already added in the phone book`);
    } else if (
      window.confirm(
        `Person ${person.name} is already added in the phone book. Replace old number with new one?`
      )
    ) {
      personService.update(personInBook.id, person).then((response) => {
        const newPersons = persons.map((person) =>
          person.id !== response.id ? person : response
        );
        setPersons(newPersons);
      });
    }
  };

  const removePerson = (person) => {
    console.log(`Button clicked to remove person ${person.name}`);
    const personToRemove = persons.find(
      (personInList) => personInList.id === person.id
    );
    if (
      personToRemove &&
      window.confirm(`Do you really want to delete ${personToRemove.name}?`)
    ) {
      personService
        .remove(personToRemove.id)
        .then((response) => {
          const newPersons = persons.filter(
            (person) => person.id !== personToRemove.id
          );
          setPersons(newPersons);
        })
        .catch((error) => {
          alert(`Person ${person.name} was already deleted from server`);
          setPersons(
            persons.filter((person) => person.id !== personToRemove.id)
          );
        });
    }
  };

  const updateSearchTerm = (string) => {
    setSearchTerm(string);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <FilterForm
        filterPersons={filterPersons}
        searchTerm={searchTerm}
        updateSearchTerm={updateSearchTerm}
      />
      <AddPerson addPerson={addPerson} />
      <ListPersons
        filteredPersons={filteredPersons}
        removePerson={removePerson}
      />
    </div>
  );
};

export default App;
