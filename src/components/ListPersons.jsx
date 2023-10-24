const ListPersons = ({filteredPersons}) => {
    return (
        <>
        <h2>Numbers</h2>
        <ul style={{ listStyle: "none"}}>
        {filteredPersons.map((person) => (
          <li key={person.name}>{person.name}: {person.number}</li>
        ))}
      </ul>
      </>
    )
}

export default ListPersons;