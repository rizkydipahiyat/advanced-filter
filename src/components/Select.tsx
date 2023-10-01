
type SelectOption = {
  label: string
  value: string
}

const Select = ({ options, label, name, defaultValue = '', onChange }: { options: SelectOption[]; label: string; name: string; defaultValue?: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => {
  return (
    <div className="md:px-10">
      <select
        onChange={onChange}
        name={name}
        defaultValue={defaultValue}
      >
        <option value="" disabled>{label}</option>
        {options.map((option, key) => (
          <option value={option.value} key={key}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default Select