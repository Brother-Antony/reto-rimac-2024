import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../context/AuthContext'
import Cookies from "js-cookie"

export default function Summary() {
    let navigate = useNavigate()
    const { user } = useAuth()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        document.body.style.overflow = ''
        if (!Cookies.get('plansNombre') || !Cookies.get('plansPrice')) {
            navigate('/plans')
        } else {
            setTimeout(() => {
                setLoading(false)
            }, 3000)
        }
    }, [navigate])

    const handleLogoutSummary = () => {
        navigate('/plans')
        Cookies.remove('plansNombre')
        Cookies.remove('plansPrice')
    }

    return (
        <div className="summary">
            <div className='container'>
                <div className='content'>
                    <Link to="/plans" onClick={handleLogoutSummary} className='inline-flex items-center hide-for-mobile hover:underline decoration-[var(--blueberry600)]'>
                        <div className="border-2 border-[var(--blueberry600)] rounded-full w-[20px] min-w-[20px] h-[20px] grid place-content-center text-[8px] text-[var(--blueberry600)]">
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </div>

                        <div className='text-[var(--blueberry600)] text-lg font-bold ml-[8px]'>Volver</div>
                    </Link>

                    <div className="content__info">
                        <h2 className="font-bold text-[40px] tracking-[-.6px] leading-[48px]">Resumen del seguro</h2>
                    </div>

                    <div className="content__block py-[24px] px-[32px] shadow-[0_1px_24px_0_rgba(174,172,243,.251)] rounded-[24px]">
                        {loading ? (
                            <div className="animate-pulse">
                                <div className='h-[12px] bg-[var(--neutrals4)] rounded w-[160px]'></div>
                                <div className='h-[28px] bg-[var(--neutrals4)] rounded w-[220px] mt-[8px]'></div>

                                <div className="w-full h-[1px] bg-[var(--neutrals4)] my-[16px]"></div>

                                <div className='h-[20px] bg-[var(--neutrals4)] rounded w-[160px] mt-[8px]'></div>
                                <div className='h-[12px] bg-[var(--neutrals4)] rounded w-[100px] mt-[4px]'></div>
                                <div className='h-[12px] bg-[var(--neutrals4)] rounded w-[120px] mt-[4px]'></div>

                                <div className='h-[20px] bg-[var(--neutrals4)] rounded w-[100px] mt-[16px]'></div>
                                <div className='h-[12px] bg-[var(--neutrals4)] rounded w-[80px] mt-[4px]'></div>
                                <div className='h-[12px] bg-[var(--neutrals4)] rounded w-[160px] mt-[4px]'></div>
                            </div>
                        ) : (
                            <>
                                <div className='uppercase text-[var(--neutrals7)] text-[10px] leading-[16px] tracking-[.8px] font-black'>Precios calculados para:</div>
                                <div className='flex items-center gap-[12px] mt-[8px]'>
                                    <img src="./IcUsers.svg" alt="" />
                                    <div className='text-xl font-black tracking-[-.2px] text-[var(--neutrals7)]'>{user.name} {user.lastName}</div>
                                </div>

                                <div className="w-full h-[1px] bg-[var(--neutrals4)] my-[16px]"></div>

                                <div className='text-base font-black tracking-[.2px] text-[var(--neutrals7)] mt-[8px]'>Responsable de pago</div>
                                <div className='text-[14px] leading-6 tracking-[.1px] mt-[4px] text-[var(--neutrals7)]'>{user.documentType}: {user.documentNumber}</div>
                                <div className='text-[14px] leading-6 tracking-[.1px] mt-[4px] text-[var(--neutrals7)]'>Celular: {user.phoneNumber}</div>

                                <div className='text-base font-black tracking-[.2px] text-[var(--neutrals7)] mt-[16px]'>Plan elegido</div>
                                <div className='text-[14px] leading-6 tracking-[.1px] mt-[4px] text-[var(--neutrals7)]'>{Cookies.get('plansNombre')}</div>
                                <div className='text-[14px] leading-6 tracking-[.1px] mt-[4px] text-[var(--neutrals7)]'>Costo del Plan: ${Cookies.get('plansPrice')} al mes</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
