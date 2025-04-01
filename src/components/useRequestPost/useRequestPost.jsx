import {useState} from 'react'

export const useRequestPost = (setIsUpdating, setNotes) => {
    const [taskValue, setTaskValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = (event) => {
        setTaskValue(event.target.value)
        setErrorMessage('')
    };

    const templateForAddingTask = () => {
        if (!taskValue) {
            setErrorMessage('Невозможно добавить пустую задачу')
            setTimeout(() => {
                setErrorMessage('')
            }, 2500)
            return
        }

        fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: {'Content-type': 'application/json; charset=utf-8'},
            body: JSON.stringify({
                title: taskValue.charAt(0).toUpperCase() + taskValue.slice(1),
                completed: false,
                description: ''
            }),
        })
            .then((rowResponse) => rowResponse.json())
            .then((newTask) => {
                // Обновите состояние заметок, добавив новую задачу
                setNotes((prevNotes) => [...prevNotes, newTask]);
            })
            .finally(() => {
                setTaskValue('')
                setIsUpdating(false)
            });
    };

    const handleAddTask = (event) => {
        event.preventDefault()
        templateForAddingTask()
    };

    const addNewTask = () => {
        templateForAddingTask()
    };

    return {
        addNewTask,
        taskValue,
        handleInputChange,
        handleAddTask,
        errorMessage,
    };
};
