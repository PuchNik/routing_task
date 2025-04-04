// Custom hook - сортировка заметок
export const UseSortNotes = (notes, setNotes) => {
  // Создание нового массива заметок и его сортировка по заголовк
  const sortedNotes = () => {
    const sortedTasks = [...notes].sort((a, b) =>
      a.title.localeCompare(b.title)
    )
    setNotes(sortedTasks)
  }

  return {
    sortedNotes,
  }
}
