import { useEffect, useState } from 'react'

export const useRequestGet = ({ isUpdating, setIsUpdating }) => {
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setIsUpdating(true)

    fetch('http://localhost:3000/notes')
      .then((loadedData) => loadedData.json())
      .then((taskData) => setNotes(taskData))

      .finally(() => {
        setIsLoading(false)
      })
  }, [isUpdating])

  return {
    isLoading,
    notes,
    setNotes
  }
}
