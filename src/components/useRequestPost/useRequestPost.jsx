import { useState } from 'react'

// Custom hook - добавление заметок
export const useRequestPost = (setNotes) => {
  const [noteValue, setNoteValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  // Обработка изменений вводимых данных
  const handleInputChange = (event) => {
    setNoteValue(event.target.value)
    setErrorMessage('')
  }

  // Добавление новой задачи (общая)
  const templateForAddingNote = () => {
    if (!noteValue) {
      setErrorMessage('Невозможно добавить пустую задачу')
      setTimeout(() => {
        setErrorMessage('')
      }, 2500)
      return
    }

    fetch('http://localhost:3000/notes', {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        title: noteValue.charAt(0).toUpperCase() + noteValue.slice(1),
        completed: false,
      }),
    })
      .then((rowResponse) => rowResponse.json())
      .then((newNote) => {
        setNotes((prevNotes) => [...prevNotes, newNote])
      })

      .finally(() => {
        setNoteValue('')
      })
  }

  // Обработка отправки формы
  const handleAddNote = (event) => {
    event.preventDefault()
    templateForAddingNote()
  }

  // Добавление новой задачи
  const addNewNote = () => {
    templateForAddingNote()
  }

  return {
    addNewNote,
    noteValue,
    handleInputChange,
    handleAddNote,
    errorMessage,
  }
}
