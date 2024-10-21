import { useState } from 'react'

export const errorMessage = {
    document: '*El documento ingresado no es válido',
    phoneNumber: '*El celular ingresado no es válido',
    acceptPrivacyPolicy: 'Por favor, acepta la Política de Privacidad.',
    acceptCommercialCommunications: 'Por favor, acepta la Política de Comunicaciones Comerciales.',
}

export default function validationUtils(formData) {
    const [formErrors, setFormErrors] = useState({
        document: '',
        phoneNumber: '',
        acceptPrivacyPolicy: '',
        acceptCommercialCommunications: '',
    })

    const validationFunction = () => {
        let hasError = false
        const newErrors = {}

        if ((formData.documentType === 'DNI' && formData.documentNumber.length !== 8) || (formData.documentType === 'RUC' && formData.documentNumber.length !== 11)) {
            newErrors.document = errorMessage.document
            hasError = true
        }

        if (formData.phoneNumber.length < 1) {
            newErrors.phoneNumber = errorMessage.phoneNumber
            hasError = true
        }

        if (!formData.acceptPrivacyPolicy) {
            newErrors.acceptPrivacyPolicy = errorMessage.acceptPrivacyPolicy
            hasError = true
        }

        if (!formData.acceptCommercialCommunications) {
            newErrors.acceptCommercialCommunications = errorMessage.acceptCommercialCommunications
            hasError = true
        }

        setFormErrors(newErrors)
        return !hasError
    }

    return { formErrors, setFormErrors, validationFunction }
}
