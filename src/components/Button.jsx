export default function Button({ isLoading, onClick, children, color = "black", size = "", className = "" }) {
    const colorClasses = {
        black: 'bg-[var(--gray1)]',
        red: 'red',
    }

    const sizeClasses = {
        // sm: 'px-2 py-1 text-sm',
        // md: 'px-4 py-2 text-base',
        lg: 'lg',
    }

    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center btn font-br-sonoma-bold ${
                colorClasses[color] || colorClasses.black
            } ${sizeClasses[size]} ${
                isLoading ? 'loading cursor-not-allowed' : ''
            } ${className}`}
            disabled={isLoading}
        >
            {isLoading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ) : null}
            {children}
        </button>
    )
}
