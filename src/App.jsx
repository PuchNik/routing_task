import './App.css'
import {Route, Routes} from "react-router-dom"
import {MainPage, TaskItemPage} from "./pages/index.js"
import {NotFound} from "./components/index.js";

function App() {

    return (
        <Routes>
            <Route path={'/'} element={<MainPage/>}/>
            <Route path={'/notes/:noteId'} element={<TaskItemPage/>}/>
            <Route path={'*'} element={<NotFound/>}/>
        </Routes>
    )
}

export default App