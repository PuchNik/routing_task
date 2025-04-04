import './App.css'
import { Route, Routes } from 'react-router-dom'
import { MainPage, TaskItemPage } from './pages/index.js'
import { NotFound } from './components/index.js'
import { useState } from 'react'


function App() {
  // Состояние для хранения заметок
  const [notes, setNotes] = useState([])

  return (
    <Routes>
      <Route
        path={'/'}
        element={<MainPage notes={notes} setNotes={setNotes} />}
      />
      <Route
        path={'/notes/:noteId'}
        element={<TaskItemPage notes={notes} setNotes={setNotes} />}
      />
      <Route path={'*'} element={<NotFound />} />
    </Routes>
  )
}

export default App

