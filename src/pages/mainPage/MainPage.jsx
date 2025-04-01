import {useState} from 'react'
import {Link} from "react-router-dom"
import styles from './MainPage.module.css'
import {trimTheLine} from "../../helpers/index.js"

import {
    SortNotes,
    SearchNote,
    useRequestGet,
    useRequestPost,
    Btn,
} from '../../components/index.js'


export const MainPage = () => {

    const [isUpdating, setIsUpdating] = useState(false)

    // Request GET
    const {isLoading, notes, setNotes} = useRequestGet({isUpdating, setIsUpdating})

    // Request Post
    const {
        addNewTask,
        taskValue,
        handleInputChange,
        handleAddTask,
        errorMessage
    } = useRequestPost(setIsUpdating, setNotes)

    // SearchNote
    const {searchValue, handleSearchNote, filteredNotes} = SearchNote(notes)

    // SortNotes
    const {sortedNotes} = SortNotes(notes, setNotes)

    return (
        <div className={styles['app-container']}>
            {isLoading ? (
                <p className={styles['loading-text']}>
                    Пожалуйста, подождите, идет загрузка данных...
                </p>
            ) : (
                <div className={styles['content-container']}>
                    <div className={styles['filter-container']}>
                        <input
                            className={styles['search-input']}
                            type="text"
                            placeholder="Поиск задачи..."
                            value={searchValue}
                            onChange={handleSearchNote}
                        />
                        <h1 className={styles['title']}>Список заметок</h1>
                        <Btn className={styles['sort-button']} onClick={sortedNotes}>
                            Фильтр А-Я
                        </Btn>
                    </div>
                    <div className={styles['task-input-container']}>
                        <form className={styles['task-form']} onSubmit={handleAddTask}>
                            <input
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
                            {filteredNotes.map(({id, title}) => (
                                <Link to={`/notes/${id}`} key={id} className={styles['task-item']}>
                                    <li>
                                        <div className={styles['task-content']}>
                                            <span className={styles['task-title']}>{trimTheLine(title, 60)}</span>
                                        </div>
                                    </li>
                                </Link>
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