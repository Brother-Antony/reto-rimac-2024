export default function LoginLayout({ children }) {
    return (
        <section className='login'>
            <div className="container">
                <div className='login__left select-none hide-for-mobile'><img src="./portada-login.png" alt="portada rimac" /></div>

                <div className="login__right">
                    <div className='login__right--mobil'>
                        <div>
                            <div className="tag-promo">Seguro Salud Flexible</div>

                            <div className='info'>
                                <h1 className='font-br-sonoma-bold text-[32px] leading-[40px] text-[var(--gray1)]'>Creado para ti y tu familia</h1>
                                <h2 className='font-br-sonoma-medium text-sm tracking-[.2px] mt-[8px] hide-for-mobile'>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.</h2>
                            </div>
                        </div>

                        <div className='hide-for-desktop login__right--mobil--img'><img src="./portada-login.png" alt="" /></div>
                    </div>

                    <div className='w-full h-[1px] bg-[var(--gray30)] mt-6 hide-for-desktop'></div>

                    {children}
                </div>
            </div>
            
            <img src="./blur-asset.png" className='absolute right-0 top-0 select-none hide-for-mobile' />
            <img src="./blur-asset1.png" className='absolute right-0 top-0 select-none hide-for-desktop' />
            <img src="./blur-asset-left.png" className='absolute left-0 bottom-0 select-none hide-for-mobile' />
            <img src="./blur-asset-left2.png" className='absolute left-0 bottom-0 select-none hide-for-desktop' />
        </section>
    )
}
