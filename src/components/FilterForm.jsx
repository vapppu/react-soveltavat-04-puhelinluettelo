import { useState, useEffect } from 'react'

const FilterForm = ({filterPersons }) => {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {setSearchTerm("")}, [])

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
        filterPersons(event.target.value)
      }

      
    return (
        <div>Filter shown with: <input onChange={handleSearchChange} value={searchTerm}/></div>
        )
}

export default FilterForm