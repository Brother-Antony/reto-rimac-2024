import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function Stepper({ currentStep, onBackClick }) {
    return (
        <div className='stepperHorizontal sticky top-0 z-20'>
            <div className="container">
                <div className='flex items-center hide-for-mobile'>
                    {/* Step 1 */}
                    <div className='flex items-center gap-[16px] mr-[16px]'>
                        <div className={`rounded-full w-[24px] h-[24px] text-center text-xs grid place-content-center font-bold transition-colors duration-300 ${currentStep >= 1 ? 'bg-[var(--blueberry600)] text-[var(--white)]' : 'border border-[var(--neutrals6)] text-[var(--neutrals6)]'}`}>1</div>
                        <div className={`text-base tracking-[.2px] transition-all duration-300 ${currentStep >= 1 ? 'text-[var(--neutrals7)] font-bold' : 'text-[var(--neutrals6)] opacity-75'}`}>Planes y coberturas</div>
                    </div>
                    <img src="./line-progress.svg" className='mr-[16px]' alt="" />
        
                    {/* Step 2 */}
                    <div className='flex items-center gap-[16px] mr-[16px] hide-for-mobile'>
                        <div className={`rounded-full w-[24px] h-[24px] text-center text-xs grid place-content-center font-bold transition duration-300 ${currentStep >= 2 ? 'bg-[var(--blueberry600)] text-[var(--white)]' : 'border border-[var(--neutrals6)] text-[var(--neutrals6)]'}`}>2</div>
                        <div className={`text-base tracking-[.2px] transition-all duration-300 ${currentStep >= 2 ? 'text-[var(--neutrals7)] font-bold' : 'text-[var(--neutrals6)] opacity-75'}`}>Resumen</div>
                    </div>
                </div>
        
                {/* Mobile view */}
                <div className="hide-for-desktop flex items-center w-full">
                    <button type='button' onClick={onBackClick} className="border-2 border-[var(--blueberry600)] rounded-full w-[24px] min-w-[24px] h-[24px] grid place-content-center text-[8px] text-[var(--blueberry600)]">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
        
                    <div className="flex items-center ml-[16px] w-full">
                        <div className="text-[10px] tracking-[.8px] leading-4 mr-[16px] font-black whitespace-nowrap">PASO {currentStep} DE 2</div>
                        <div className="w-full h-[6px] rounded-[20px] bg-[var(--neutrals4)]">
                            <div
                                className="bg-[var(--blueberry600)] h-[6px] transition-all duration-500 rounded-[20px]"
                                style={{ width: currentStep === 1 ? '50%' : '100%' }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}  
