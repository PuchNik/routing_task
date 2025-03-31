import { useState } from 'react'

export const SearchNote = (notes) => {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchNote = (event) => {
    setSearchValue(event.target.value)
  }

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return {
    searchValue,
    handleSearchNote,
    filteredNotes,
  }
}
