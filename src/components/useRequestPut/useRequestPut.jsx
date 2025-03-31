import {useState} from "react";

export const useRequestPut = (setNotes) => {
  const [idTaskModified, setIdTaskModified] = useState(null)
  const [editTaskValue, setEditTaskValue] = useState('')

  const editTask = (id, title) => {
    setIdTaskModified(id)
    setEditTaskValue(title)
  }

  const handleEditChange = (event) => {
    setEditTaskValue(event.target.value)
  }

  const handleEditTask = (event) => {
    event.preventDefault()

    fetch(`http://localhost:3000/notes/${idTaskModified}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        title: editTaskValue,
        completed: false,
      }),
    })
        .then((rowResponse) => rowResponse.json())
        .then((updatedNote) => {
          setNotes((prevNotes) =>
              prevNotes.map((note) =>
                  note.id === updatedNote.id ? updatedNote : note
              )
          );
        })
        .finally(() => {
          setIdTaskModified(null)
          setEditTaskValue('')
        })
  }

  return {
    editTask,
    idTaskModified,
    setIdTaskModified,
    handleEditChange,
    editTaskValue,
    handleEditTask,
  }
}
