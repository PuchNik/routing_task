export const Input = ({className, type, placeholder, value, onChange}) => {
  return (
    <>
      <input
        className={className}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  )
}
