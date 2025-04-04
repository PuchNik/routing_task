import { Link, useParams } from 'react-router-dom'
import styles from './TaskItemPage.module.css'
import { Btn, useRequestDelete, useRequestPut } from '../../components/index.js'
import { useEffect } from 'react'


export const TaskItemPage = ({ notes, setNotes }) => {
  const { noteId } = useParams()
  const { deleteNote } = useRequestDelete()
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
  } = useRequestPut(notes, setNotes)

  // Поиск заметки по ID
  const note = notes.find((n) => String(n.id) === noteId)

  // Установка описания заметки при её загрузке
  useEffect(() => {
    if (note) {
      setEditDescribe(note.description)
    }
  }, [note, setEditDescribe])

  if (!note) {
    return <div className={styles['note-not-found']}>Заметка не найдена</div>
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
            <span className={styles['task-title']}>
              {note.title}
            </span>
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
          onClick={() => deleteNote(note.id, note.title, note.completed)}
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
  )
}
