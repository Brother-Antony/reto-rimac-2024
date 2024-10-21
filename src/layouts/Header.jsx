import { useRef, useState } from "react"
import { CSSTransition } from "react-transition-group"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone } from "@fortawesome/free-solid-svg-icons"

import { Modal } from "../components/Modal"
import useEscapeKey from "../hooks/useEscapeKey"

const Header = () => {
    const [showModal, setShowModal] = useState(false)
    const nodeRef = useRef(null)

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

    return (
        <>
            <div className="header">
                <nav className="container">
                    <div className="header__logo">
                        <img src="/logo.svg" width="73" className="select-none" alt="logo rimac" />
                    </div>

                    <div className="header__right">
                        <button type="button" onClick={handleShowModal} className="text-xs tracking-[.2px] font-br-sonoma-medium text-[var(--gray1)] hover:underline active:text-[var(--neutrals6)] hide-for-mobile">¡Compra por este medio!</button>

                        <a href="tel:+0114116001" className="flex items-center gap-x-2 text-[16px] leading-5 hover:underline active:text-[var(--neutrals6)]">
                            <FontAwesomeIcon icon={faPhone} className="text-[15px]" />
                            <div className="font-br-sonoma-bold tracking-[.4px]">(01) 411 6001</div>
                        </a>
                    </div>
                </nav>
            </div>

            <CSSTransition
                nodeRef={nodeRef}
                in={showModal}
                timeout={300}
                classNames="message"
                unmountOnExit
            >
                <Modal ref={nodeRef} show={showModal} onClose={handleCloseModal}>
                    <Modal.Header onClose={handleCloseModal} closeButton>
                        <Modal.Title>Compra por este medio</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="text-[16px] tracking-[.1px] leading-7 text-[var(--neutrals7)]">Esta opción te permite comprar de manera segura y conveniente en línea. Descubre las ventajas y comienza tu experiencia de compra en nuestra plataforma.</div>
                    </Modal.Body>
                </Modal>
            </CSSTransition>
        </>
    )
}

export default Header