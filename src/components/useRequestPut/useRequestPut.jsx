import { useState } from 'react'

export const useRequestPut = (setIsUpdating) => {
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
      headers: { 'Content-type': 'applications/json; charset=utf-8' },
      body: JSON.stringify({
        title: editTaskValue,
        completed: false,
      }),
    })
      .then((rowResponse) => rowResponse.json())
      .finally(() => {
        setIdTaskModified(null)
        setEditTaskValue('')
        setIsUpdating(false)
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





// export const useRequestPut = (setIsUpdating) => {
//   const [idTaskModified, setIdTaskModified] = useState(null);
//   const [editTaskValue, setEditTaskValue] = useState('');
//
//   const editTask = (id, title) => {
//     setIdTaskModified(id);
//     setEditTaskValue(title);
//   };
//
//   const handleEditChange = (event) => {
//     setEditTaskValue(event.target.value);
//   };
//
//   const handleEditTask = async (event) => {
//     event.preventDefault();
//
//     try {
//       const response = await fetch(`http://localhost:3000/notes/${idTaskModified}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json; charset=utf-8' },
//         body: JSON.stringify({
//           title: editTaskValue,
//           completed: false,
//         }),
//       });
//
//       if (!response.ok) {
//         throw new Error('Ошибка при редактировании задачи');
//       }
//
//       await response.json();
//     } catch (error) {
//       console.error(error);
//       // Здесь можно добавить обработку ошибок, например, установить состояние ошибки
//     } finally {
//       setIdTaskModified(null);
//       setEditTaskValue('');
//       setIsUpdating(true); // Убедитесь, что состояние обновления установлено в true
//     }
//   };
//
//   return {
//     editTask,
//     idTaskModified,
//     setIdTaskModified,
//     handleEditChange,
//     editTaskValue,
//     handleEditTask,
//   };
// };
