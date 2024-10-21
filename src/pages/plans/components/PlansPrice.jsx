import Button from "../../../components/Button"

export default function PlansPrice({ showPlans, plans, selectedOption, loadingId, loading, priceParaMi, imageMappings, handleSummary }) {
    return (
        <>
            {showPlans && loading ? (
                <div className="animate-pulse planPrice">
                    {plans.map((_, index) => (
                        <div key={index} className="min-w-[288px] w-[288px] pt-[68px] pb-[51px] px-[32px] shadow-[0_1px_24px_0_rgba(174,172,243,.251)] rounded-[24px] bg-[var(--neutrals4)] h-[600px] opacity-50"></div>
                    ))}
                </div>
            ) : (
                showPlans && (
                    <div className={`planPrice transition-opacity ${loading ? 'opacity-0' : 'opacity-100 duration-500'}`}>
                        {plans.map((plan, index) => (
                            <div key={index} className={`w-[288px] min-w-[288px] pt-[68px] pb-[51px] px-[32px] shadow-[0_1px_24px_0_rgba(174,172,243,.251)] rounded-[24px] flex flex-col relative transition-all opacity-100 ${loading ? 'opacity-0' : 'opacity-100 duration-500'}`}>
                                {["Plan en Casa y Clínica"].includes(plan.name) && (
                                    <div className='recommended absolute top-10 text-xs text-[var(--neutrals7)] bg-[var(--aqual4)] py-0.5 px-2 rounded-md font-black tracking-[.4px]'>Plan recomendado</div>
                                )}
                                <div className='flex items-start justify-between'>
                                    <div>
                                        <div className='text-2xl font-black tracking-[-.2px] text-[var(--neutrals7)]'>{plan.name}</div>
                                        <div className="mt-[24px] uppercase text-xs text-[var(--neutrals6)] tracking-[.6px] font-black">Costo del plan</div>
                                        {selectedOption === 'para-alguien-mas' ? (
                                        <div className='text-sm text-[var(--neutrals6)] tracking-[-.2px] mt-1 line-through'>{`$${priceParaMi[plan.name]} antes`}</div>
                                        ) : null}
                                        <div className="mt-1 text-xl font-black tracking-[-.2px] text-[var(--neutrals7)]">{`$${plan.price} al mes`}</div>
                                    </div>

                                    <img src={imageMappings[plan.name]} alt={plan.name} />
                                </div>

                                <div className="w-full h-[1px] bg-[var(--neutrals4)] my-[24px]"></div>

                                <ul className='mb-[40px] flex flex-col gap-[24px]'>
                                    {plan.description.map((desc, index) => (
                                        <li key={index} className='list-disc ml-[18px] text-[16px] leading-7 tracking-[.1px] text-[var(--neutrals7)]'>{desc}</li>
                                    ))}
                                </ul>

                                <Button 
                                    isLoading={loadingId === index} 
                                    onClick={() => handleSummary(plan, index)}
                                    color='red' 
                                    size='md' 
                                    className='mt-auto w-full font-bold'
                                >
                                    {loadingId === index ? 'Cargando...' : 'Seleccionar Plan'}
                                </Button>
                            </div>
                        ))}
                    </div>
                )
            )}
        </>
    )
}
