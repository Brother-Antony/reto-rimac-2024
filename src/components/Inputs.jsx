import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import ErrorMessage from "./ErrorMessage"

export default function Inputs({
    elementType,
    variant,
    type,
    isPassword = false,
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    touched,
    htmlFor,
    className,
    placeholder = "",
    maxLength = null,
    onInput = () => {},
    options = [],
    nameSelect,
    valueSelect,
    onChangeSelect,
    disabled = false,
    ...props
}) {
    const renderInput = () => {
        return (
            <>
                <div className={`input__login ${className} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}>
                    <input
                        type={type}
                        id={htmlFor}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        maxLength={maxLength}
                        onInput={onInput}
                        disabled={disabled}
                        {...props}
                    />

                    <label htmlFor={htmlFor} className="before">
                        <div className="paragraph font-br-sonoma-regular select-none">{label}</div>
                    </label>
                </div>
                {error && <ErrorMessage message={error} />}
            </>
        )
    }

    const renderSelect = () => {
        return (
            <>
                <div className="inputSelect">
                    <div className={`inputSelect--select ${disabled ? 'disabled' : ''}`}>
                        <select id={nameSelect} name={nameSelect} value={valueSelect} onChange={onChangeSelect} disabled={disabled}>
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <FontAwesomeIcon icon={faAngleDown} className='i' />
                    </div>

                    <div className={`input__login ${className} ${disabled ? 'disabled' : ''} ${error ? 'error' : ''}`}>
                        <input
                            type={type}
                            id={htmlFor}
                            name={name}
                            placeholder={placeholder}
                            value={value}
                            onChange={onChange}
                            maxLength={maxLength}
                            onInput={onInput}
                            disabled={disabled}
                            {...props}
                        />

                        <label htmlFor={htmlFor} className="before">
                            <div className="paragraph font-br-sonoma-regular select-none">{label}</div>
                        </label>
                    </div>
                </div>
                {error && <ErrorMessage message={error} />}
            </>
        )
    }

    return <>{elementType === 'select' ? renderSelect() : renderInput()}</>
}
