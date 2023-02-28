interface InputProps {
  name: string
  onChange: any
  value: string
  label: string
  type?: string
}

export default function Input({
  name,
  onChange,
  value,
  label,
  type
}: InputProps) {
  return (
    <div className='relative'>
      <input
        className='text-md peer block w-full rounded-md bg-neutral-700 px-6 pb-2 pt-8 text-white focus:outline-none focus:ring-0'
        placeholder=' '
        type={type}
        onChange={onChange}
        value={value}
        name={name}
        id={name}
      />

      <label
        className='text-md absolute top-5 left-6 z-10 origin-[0] -translate-y-3 scale-75 transform text-zinc-400 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75'
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  )
}
