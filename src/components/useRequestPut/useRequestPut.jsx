import { useState } from 'react'

// Custom hook - обновление(редактирование) заметок
export const useRequestPut = (notes, setNotes) => {
  const [idTaskModified, setIdTaskModified] = useState(null)
  const [editTaskValue, setEditTaskValue] = useState('')
  const [editDescribe, setEditDescribe] = useState('')

  // Инициализация редактирования заметки
  const editTask = (id, title) => {
    setIdTaskModified(id)
    setEditTaskValue(title)
  }

  // Обработка изменений в заголовке заметки
  const handleEditChange = (event) => {
    const value = event.target.value

    // Преобразование первой буквы в заглавную
    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1)
    setEditTaskValue(formattedValue)
  }

  // Обработка изменений в описании заметки
  const describeTheNote = (event) => {
    setEditDescribe(event.target.value)
  }

  // Обработка сохранения редактированной заметки
  const handleEditTask = (event) => {
    event.preventDefault()

    fetch(`http://localhost:3000/notes/${idTaskModified}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        title:
          editTaskValue ||
          notes.find((note) => note.id === idTaskModified).title,
        completed: false,
        description: editDescribe,
      }),
    })
      .then((rowResponse) => rowResponse.json())
      .then((updatedNote) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note
          )
        )
      })

      .finally(() => {
        setIdTaskModified(null)
        setEditTaskValue('')
        setEditDescribe('')
      })
  }

  // обработка сохранения описания заметки
  const handleDescribeTheNote = (id) => {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        title: notes.find((note) => note.id === id).title,
        completed: false,
        description: editDescribe,
      }),
    })
      .then((rowResponse) => rowResponse.json())
      .then((updatedNote) => {
        setNotes((prevNotes) =>
          prevNotes.map((note) =>
            note.id === updatedNote.id ? updatedNote : note
          )
        )
      })

      .finally(() => {
        setIdTaskModified(null)
        setEditTaskValue('')
        setEditDescribe('')
      })
  }

  return {
    idTaskModified,
    setIdTaskModified,
    editTaskValue,
    editTask,
    handleEditChange,
    editDescribe,
    describeTheNote,
    handleEditTask,
    handleDescribeTheNote,
    setEditDescribe,
  }
}
