import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Stepper from "../components/Stepper"
import Header from "./Header"
import Cookies from "js-cookie"

export default function MainLayout() {
    const location = useLocation()
    const navigate = useNavigate()
    const { logout } = useAuth()

    const currentStep = location.pathname === "/plans" ? 1 : 2

    const handleBackClick = () => {
        if (currentStep === 1) {
            logout()
        } else if (currentStep === 2) {
            navigate('/plans')
            Cookies.remove('plansNombre')
            Cookies.remove('plansPrice')
        }
    }

    return (
        <>
            <Header />
            <Stepper currentStep={currentStep} onBackClick={handleBackClick} />
            <Outlet />
        </>
    )
}
