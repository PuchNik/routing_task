export const SortNotes = (notes, setNotes) => {
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
