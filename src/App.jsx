import styles from './App.module.css' // Предполагается, что стили находятся в App.module.css
import { useState } from 'react'

import {
  SortNotes,
  SearchNote,
  useRequestDelete,
  useRequestGet,
  useRequestPost,
  useRequestPut,
  Btn,
  Input,
} from './components/index.js'

function App() {
  const [isUpdating, setIsUpdating] = useState(false)

  const { isLoading, notes, setNotes } = useRequestGet({
    isUpdating,
    setIsUpdating,
  })

  const { addNewTask, taskValue, handleInputChange, handleAddTask, errorMessage } =
      useRequestPost(setIsUpdating)

  const {
    editTask,
    idTaskModified,
    setIdTaskModified,
    handleEditChange,
    editTaskValue,
    handleEditTask,
  } = useRequestPut(setIsUpdating)

  const { deleteTask } = useRequestDelete(setIsUpdating)
  const { searchValue, handleSearchNote, filteredNotes } = SearchNote(notes)
  const { sortedNotes } = SortNotes(notes, setNotes)

  return (
      <div className={styles['app-container']}>
        {isLoading ? (
            <p className={styles['loading-text']}>
              Пожалуйста, подождите, идет загрузка данных...
            </p>
        ) : (
            <div className={styles['content-container']}>
              <div className={styles['filter-container']}>
                <Input
                    className={styles['search-input']}
                    type="text"
                    placeholder="Поиск задачи..."
                    value={searchValue}
                    onChange={handleSearchNote}
                />
                <h1 className={styles['title']}>Список пользователей</h1>
                <Btn className={styles['sort-button']} onClick={sortedNotes}>
                  Фильтр А-Я
                </Btn>
              </div>
              <div className={styles['task-input-container']}>
                <form className={styles['task-form']} onSubmit={handleAddTask}>
                  <Input
                      className={styles['task-input']}
                      type="text"
                      placeholder="Записать задачу..."
                      value={taskValue}
                      onChange={handleInputChange}
                  />
                </form>
                <Btn
                    className={styles['add-button']}
                    onClick={addNewTask}
                    type={'submit'}
                >
                  Добавить
                </Btn>
              </div>
              {errorMessage && <p className={styles['error-text']}>{errorMessage}</p>}
              {notes.length ? (
                  <ol className={styles['task-list']}>
                    {filteredNotes.map(({ id, title }) => (
                        <li key={id} className={styles['task-item']}>
                          <div className={styles['task-content']}>
                            {idTaskModified === id ? (
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
                                <span className={styles['task-title']}>{title}</span>
                            )}
                            <div className={styles['buttons-container']}>
                              <Btn
                                  className={styles['edit-button']}
                                  onClick={() => editTask(id, title)}
                              >
                                Редактировать
                              </Btn>
                              <Btn
                                  className={styles['delete-button']}
                                  onClick={() => deleteTask(id)}
                              >
                                Удалить
                              </Btn>
                            </div>
                          </div>
                        </li>
                    ))}
                  </ol>
              ) : (
                  <p className={styles['empty-list-text']}>Добавьте Ваши новые задачи</p>
              )}
            </div>
        )}
      </div>
  )
}

export default App