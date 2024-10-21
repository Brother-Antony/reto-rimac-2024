export default function Checkbox({ 
    name, 
    checked, 
    onChange, 
    error, 
    label,
    className = "",
    disabled,
    ...props 
}) {
    return (
        <label className={`check__label ${className} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}>
            <input
                type='checkbox'
                name={name}
                checked={checked}
                onChange={onChange}
                hidden
                disabled={disabled}
                {...props}
            />
            
            <div className="check__label--box">
                <img src="./check.svg" className='i' alt="Check Box" />
            </div>

            <div className='paragraph font-br-sonoma-regular text-[12px] leading-[20px] tracking-[.1px] text-[#0A051E]'>{label}</div>
        </label>
    )
}
