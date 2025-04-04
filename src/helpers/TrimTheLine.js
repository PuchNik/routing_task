// Обрезка строки до заданной длины с добавлением многоточия
export const trimTheLine = (title, maxLength) => {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '...'
  }
  return title
}
