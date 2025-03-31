import {useNavigate} from "react-router-dom";

export const useRequestDelete = () => {
    const navigateToMainPage = useNavigate()

    const deleteTask = (id) => {
        fetch(`http://localhost:3000/notes/${id}`, {
            method: 'DELETE'
        })
            .then((rowResponse) => rowResponse.json())
            .finally(() => {
                navigateToMainPage('/')
            })
    }
    return {
        deleteTask
    }
}
