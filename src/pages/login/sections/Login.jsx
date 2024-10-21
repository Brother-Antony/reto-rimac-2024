import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'

import { useAuth } from '../../../context/AuthContext'
import { Modal } from '../../../components/Modal'

import UserService from '../../../core/user/infrastructure/http/UserService'
import validationUtils, { errorMessage } from '../../../utils/validationUtils'
import useEscapeKey from '../../../hooks/useEscapeKey'
import Header from "../../../layouts/Header"
import Footer from '../../../layouts/Footer'
import LoginForm from './forms/LoginForm'
import LoginLayout from '../../../layouts/LoginLayout'

const userService = new UserService()

export default function Login() {
  let navigate = useNavigate()
  const nodeRef = useRef(null)
  
  const { register, handleSubmit } = useForm()
  const { signin, isAuthenticated, error: authError, clearErrorUser } = useAuth()

  const [formData, setFormData] = useState({
    documentType: 'DNI',
    documentNumber: '',
    phoneNumber: '',
    acceptPrivacyPolicy: false,
    acceptCommercialCommunications: false,
  })
  
  const { formErrors, setFormErrors, validationFunction } = validationUtils(formData)

  const [isDisabled, setIsDisabled] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [documentMaxLength, setDocumentMaxLength] = useState(8)

  useEffect(() => {
    document.body.style.overflow = ''
    if (isAuthenticated) navigate('/plans')
    const checkLogin = async () => {
      try {
        const res = await userService.login()
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    checkLogin()
  }, [isAuthenticated])

  useEscapeKey(() => {
    handleBodyOverflow(false)
    setShowModal(false)
  })

  const handleBodyOverflow = (isHidden) => document.body.style.overflow = isHidden ? "hidden" : ""

  const handleShowModal = () => {
    setShowModal(true)
    handleBodyOverflow(true)
  }

  const handleCloseModal = () => {
    handleBodyOverflow(false)
    setShowModal(false)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const newFormData = { ...formData, [name]: type === 'checkbox' ? checked : value }
    const newErrors = { ...formErrors }

    newErrors[name] = ''

    if (name === 'documentType') {
      newFormData.documentNumber = ''
      setDocumentMaxLength(newFormData.documentType === 'DNI' ? 8 : 11)
    } else if (name === 'documentNumber') {
      if ((formData.documentType === 'DNI' && value.length === 8) || (formData.documentType === 'RUC' && value.length === 11)) {
        newErrors.document = ''
      } else {
        newErrors.document = errorMessage.document
      }
    } else if (name === 'phoneNumber') {
      if (value.length < 1) {
        newErrors.phoneNumber = errorMessage.phoneNumber
      }
    }
    
    setFormData(newFormData)
    setFormErrors(newErrors)

    if (authError) {
      clearErrorUser()
    }
  }

  const onSubmit = handleSubmit((e) => {
    // e.preventDefault()
    setLoading(true)
    setIsDisabled(true)
    setTimeout(() => {
      setLoading(false)
      setIsDisabled(false)
      if (validationFunction()) {
        signin(formData)
      }
    }, 2000)
  })

  return (
    <>
      <div className='header-login'>
        <Header/>
      </div>

      <LoginLayout>
        <LoginForm
          loading={loading}
          handleShowModal={handleShowModal}
          errors={formErrors}
          authError={authError}
          documentMaxLength={documentMaxLength}
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={onSubmit}
          isDisabled={isDisabled}
        />
      </LoginLayout>

      <CSSTransition
        nodeRef={nodeRef}
        in={showModal}
        timeout={300}
        classNames="message"
        unmountOnExit
      >
        <Modal ref={nodeRef} show={showModal} onClose={handleCloseModal}>
          <Modal.Header onClose={handleCloseModal} closeButton>
            <Modal.Title>Aplican Términos y Condiciones</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-[16px] tracking-[.1px] leading-7 text-[var(--neutrals7)]">Encontrarás información importante sobre tus derechos y obligaciones al utilizar nuestros servicios. Cubren aspectos clave como la privacidad, la seguridad y la conducta esperada. Te recomendamos encarecidamente familiarizarte con estos términos para estar bien informado.</div>
            <br />
            <div className="text-[16px] tracking-[.1px] leading-7 text-[var(--neutrals7)]">Si tienes preguntas o inquietudes sobre los 'Términos y Condiciones', no dudes en ponerte en contacto con nuestro equipo de soporte. Estamos aquí para ayudarte y garantizar que tu experiencia sea transparente y segura.</div>
          </Modal.Body>
        </Modal>
      </CSSTransition>

      <Footer/>
    </>
  )
}
