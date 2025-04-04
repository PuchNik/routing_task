import { useState } from 'react'

// Custom hook - поиск заметок по закоголовку
export const UseSearchNote = (notes) => {
  const [searchValue, setSearchValue] = useState('')

  // Обработка изменения значения поиска
  const handleSearchNote = (event) => {
    setSearchValue(event.target.value)
  }

  // Фильтрация заметок на основе значения поиска
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchValue.toLowerCase())
  )

  return {
    searchValue,
    handleSearchNote,
    filteredNotes,
  }
}
