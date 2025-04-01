import { Link, useParams } from "react-router-dom";
import styles from "./TaskItemPage.module.css";
import { Btn, useRequestGet, useRequestDelete, useRequestPut } from '../../components/index.js';
import { useEffect } from "react"
import {trimTheLine} from "../../helpers/index.js";

export const TaskItemPage = () => {
    const { noteId } = useParams();
    const { notes, setNotes } = useRequestGet();
    const { deleteTask } = useRequestDelete();
    const {
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
    } = useRequestPut(notes, setNotes);

    const note = notes.find(n => String(n.id) === noteId);

    // Устанавливаем значение editDescribe при загрузке компонента
    useEffect(() => {
        if (note) {
            setEditDescribe(note.description);
        }
    }, [note, setEditDescribe]);

    if (!note) {
        return <div className={styles['note-not-found']}>Заметка не найдена</div>;
    }

    return (
        <div className={styles['task-item-wrapper']}>
            <div className={styles['task-item-container']}>
                <Link to={'/'} className={styles['arrow-back']}>
                    <img src="/src/assets/icon/back-arrow.png" alt="Back arrow" />
                </Link>
                <div className={styles['task-item-title']}>
                    {idTaskModified === note.id ? (
                        <form className={styles['edit-form']} onSubmit={handleEditTask}>
                            <input
                                className={styles['edit-input']}
                                type="text"
                                value={editTaskValue}
                                onChange={handleEditChange}
                                onBlur={() => setIdTaskModified(null)}
                            />
                        </form>
                    ) : (
                        <span className={styles['task-title']}>{trimTheLine(note.title, 20)}</span>
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
                    onClick={() => deleteTask(note.id, note.title, note.completed)}
                >
                    Удалить
                </Btn>
            </div>
            <div>
                <div className={styles['description-container']}>Описание заметки</div>
                <textarea
                    className={styles['description-item']}
                    placeholder="Опишите Вашу заметку более подробно"
                    value={editDescribe}
                    onChange={describeTheNote}
                    onBlur={() => handleDescribeTheNote(note.id)}
                />
            </div>
        </div>
    );
};
