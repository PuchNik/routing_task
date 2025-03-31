import './App.css'
import {Route, Routes} from "react-router-dom"
import {MainPage, TaskItemPage} from "./pages/index.js"
function App() {

  return (
      <Routes>
          <Route path={'/'} element={<MainPage/>}/>
          <Route path={'/notes/:noteId'} element={<TaskItemPage/>}/>
      </Routes>
  )
}

export default App