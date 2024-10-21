import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'

import Cookies from "js-cookie"

import { useAuth } from '../../../context/AuthContext'
import { calculateAge } from "../../../hooks/useCalculateAge"

import PlansService from '../../../core/plans/infrastructure/http/PlansService'
import PlansPrice from '../components/plansPrice'

const imageMappings = {
  "Plan en Casa": "./IcHomeLight.svg",
  "Plan en Casa y Clínica": "./IcHospitalLight.svg",
  "Plan en Casa + Bienestar": "./IcHomeLight.svg",
  "Plan en Casa + Chequeo ": "./IcHomeLight.svg",
  "Plan en Casa + Fitness": "./IcHomeLight.svg",
}

const plansService = new PlansService()

export default function Plans() {
  let navigate = useNavigate()
  const { user, logout } = useAuth()

  const [selectedOption, setSelectedOption] = useState('')
  const [plans, setPlans] = useState([])
  const [loadingId, setLoadingId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPlans, setShowPlans] = useState(false)
  const [priceParaMi, setPriceParaMi] = useState({})
  
  useEffect(() => {
    document.body.style.overflow = ''
    const choosePlan = async () => {
      setLoading(true)
      try {
        const res = await plansService.getPlans()
        const precioOriginalParaMi = {}
        const userAge = calculateAge(user.birthDay)
        const filteredPlans = res.list.filter((plan) => plan.age >= userAge)

        filteredPlans.forEach((plan) => {
          precioOriginalParaMi[plan.name] = plan.price
          if (selectedOption === 'para-alguien-mas') {
            plan.price *= 0.95
          }
        })

        setPriceParaMi(precioOriginalParaMi)
        setPlans(filteredPlans)
        setShowPlans(true)
      } catch (error) {
        console.error('Error fetching plans:', error)
      } finally {
        setTimeout(() => {
          setLoading(false)
        }, 3000)
      }
    }

    if (selectedOption === 'para-mi' || selectedOption === 'para-alguien-mas') {
      choosePlan(selectedOption)
    }
  }, [selectedOption, user])

  const handleSummary = (selectedPlan, index) => {
    setLoadingId(index)
    setTimeout(() => {
      Cookies.set('plansNombre', selectedPlan.name)
      Cookies.set('plansPrice', selectedPlan.price)
      navigate('/summary')
      setLoadingId(null)
    }, 2000)
  }

  return (
    <div className="plan">
      <div className='container'>
        <div className='content'>
          <button type='button' onClick={() => logout()} className='inline-flex items-center hide-for-mobile hover:underline decoration-[var(--blueberry600)]'>
            <div className="border-2 border-[var(--blueberry600)] rounded-full w-[20px] min-w-[20px] h-[20px] grid place-content-center text-[8px] text-[var(--blueberry600)]">
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>

            <div className='text-[var(--blueberry600)] text-lg font-bold ml-[8px]'>Volver</div>
          </button>

          <div className="content__info">
            <div className='w-full max-w-[544px] ml-auto mr-auto'>
              <h2 className="font-bold text-[40px] tracking-[-.6px] leading-[48px]">{user.name} ¿Para quién deseas cotizar?</h2>
              <h3 className='text-[16px] tracking-[.1px] leading-7 text-[var(--neutrals7)] mt-[8px]'>Selecciona la opción que se ajuste más a tus necesidades.</h3>
            </div>
          </div>

          <div className="planInfo mt-[32px]">
            <div className='check__label'>
              <input type='radio' id='pay1' name='price' value='para-mi' checked={selectedOption === 'para-mi'} onChange={(e) => setSelectedOption(e.target.value)} hidden />
              
              <label htmlFor='pay1' className='check__label--info'>
                <div className="check__label--box">
                  <img src="./check.svg" className='i select-none' alt="Check Box" />
                </div>

                <img src="./IcProtectionLight.svg" className='select-none' alt="" />

                <div className='text-xl font-black tracking-[-.2px] text-[var(--neutrals7)] mt-[8px]'>Para mí</div>
                <div className='text-[12px] leading-5 tracking-[.2px] mt-[8px]'>Cotiza tu seguro de salud y agrega familiares si así lo deseas.</div>
              </label>
            </div>

            <div className='check__label'>
              <input type='radio' id='pay2' name='price' value='para-alguien-mas' checked={selectedOption === 'para-alguien-mas'} onChange={(e) => setSelectedOption(e.target.value)} hidden />
              
              <label htmlFor='pay2' className='check__label--info'>
                <div className="check__label--box">
                  <img src="./check.svg" className='i select-none' alt="Check Box" />
                </div>

                <img src="./IcAddUserLight.svg" className='select-none' alt="" />

                <div className='text-xl font-black tracking-[-.2px] text-[var(--neutrals7)] mt-[8px]'>Para alguien más</div>
                <div className='text-[12px] leading-5 tracking-[.2px] mt-[8px]'>Realiza una cotización para uno de tus familiares o cualquier persona.</div>
              </label>
            </div>
          </div>

          <PlansPrice showPlans={showPlans} plans={plans} selectedOption={selectedOption} loadingId={loadingId} loading={loading} priceParaMi={priceParaMi} imageMappings={imageMappings} handleSummary={handleSummary} />
        </div>
      </div>
    </div>
  )
}
