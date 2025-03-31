import {Link, useParams} from "react-router-dom"
import styles from "./TaskItemPage.module.css"
import {Btn, useRequestGet, useRequestDelete, useRequestPut} from '../../components/index.js'

export const TaskItemPage = () => {
    const {noteId} = useParams();
    const {notes, setNotes} = useRequestGet()
    const {deleteTask} = useRequestDelete()
    const {
        idTaskModified,
        editTask,
        handleEditChange,
        handleEditTask,
        editTaskValue,
        setIdTaskModified,
    } = useRequestPut(setNotes)

    const note = notes.find(n => String(n.id) === noteId);

    if (!note) {
        return <>Заметка не найдена</>;
    }

    return (
        <div className={styles['task-item-wrapper']}>
            <div className={styles['task-item-container']}>
                <Link to={'/'} className={styles['arrow-back']}>
                    <img src="/src/assets/icon/back-arrow.png" alt="Back arrow"/>
                </Link>
                <div className={styles['task-item-title']}>
                    {idTaskModified === note.id ? (
                        <form
                            className={styles['edit-form']}
                            onSubmit={handleEditTask}
                        >
                            <input
                                className={styles['edit-input']}
                                type="text"
                                value={editTaskValue}
                                onBlur={() => setIdTaskModified(null)}
                                onChange={handleEditChange}
                            />
                        </form>
                    ) : (
                        <span className={styles['task-title']}>{note.title}</span>
                    )}
                </div>
            </div>
            <div className={styles['buttons-container']}>
                <Btn
                    className={styles['edit-button']}
                    onClick={() => editTask(note.id, note.title)}
                >
                    Редактировать
                </Btn>
                <Btn
                    className={styles['delete-button']}
                    onClick={() => deleteTask(note.id)}
                >
                    Удалить
                </Btn>
            </div>
            <div>
                <div className={styles['description-container']}>Описание заметки</div>
                <textarea
                    className={styles['description-item']}
                    placeholder="Опишите Вашу заметку более подробно"
                    // value={note.description}
                />
            </div>
        </div>
    );
}
