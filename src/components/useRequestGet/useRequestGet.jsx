import { useEffect, useState } from 'react'

export const useRequestGet = (options = {}) => {
  const { isUpdating, setIsUpdating } = options
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    if (setIsUpdating) {
      setIsUpdating(true)
    }

    fetch('http://localhost:3000/notes')
        .then((loadedData) => loadedData.json())
        .then((taskData) => setNotes(taskData))
        .finally(() => {
          setIsLoading(false)
          if (setIsUpdating) {
            setIsUpdating(false)
          }
        })
  }, [isUpdating, setIsUpdating])

  return {
    isLoading,
    notes,
    setNotes
  }
}
