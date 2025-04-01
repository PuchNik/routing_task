import { useState } from "react";

export const useRequestPut = (notes, setNotes) => {
    const [idTaskModified, setIdTaskModified] = useState(null);
    const [editTaskValue, setEditTaskValue] = useState('');
    const [editDescribe, setEditDescribe] = useState('');

    const editTask = (id, title) => {
        setIdTaskModified(id);
        setEditTaskValue(title);
    };

    const handleEditChange = (event) => {
        setEditTaskValue(event.target.value);
    };

    const describeTheNote = (event) => {
        setEditDescribe(event.target.value);
    };

    const handleEditTask = (event) => {
        event.preventDefault();

        fetch(`http://localhost:3000/notes/${idTaskModified}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                title: editTaskValue || notes.find(note => note.id === idTaskModified).title, // Сохраняем текущее значение title
                completed: false,
                description: editDescribe
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
                setIdTaskModified(null);
                setEditTaskValue('');
                setEditDescribe(''); // Сброс описания
            });
    };

    const handleDescribeTheNote = (id) => {
        fetch(`http://localhost:3000/notes/${id}`, {
            method: 'PUT',
            headers: { 'Content-type': 'application/json; charset=utf-8' },
            body: JSON.stringify({
                title: notes.find(note => note.id === id).title, // Сохраняем текущее значение title
                completed: false,
                description: editDescribe
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
                setIdTaskModified(null);
                setEditTaskValue('');
                setEditDescribe(''); // Сброс описания
            });
    };

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
        setEditDescribe, // Возвращаем функцию для обновления editDescribe
    };
};
