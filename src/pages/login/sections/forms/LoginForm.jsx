import Button from '../../../../components/Button'
import Checkbox from '../../../../components/Checkbox'
import Inputs from '../../../../components/Inputs'

export default function LoginForm({ loading, formData, errors, authError, documentMaxLength, onInputChange, onSubmit, handleShowModal, isDisabled }) {
    return (
        <form onSubmit={onSubmit} className="mt-6">
            <h2 className='font-br-sonoma-medium text-sm tracking-[.2px] mb-6 hide-for-desktop'>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.</h2>

            <Inputs
                elementType="select"
                label="Nro. de documento"
                type="text"
                htmlFor="document"
                name="documentNumber"
                placeholder=' '
                value={formData.documentNumber}
                onChange={onInputChange}
                error={errors.document}
                maxLength={documentMaxLength}
                onInput={(e) => { e.target.value = e.target.value.replace(/[^\d]/g, '') }}
                options={['DNI', 'RUC']}
                nameSelect="documentType"
                valueSelect={formData.documentType}
                onChangeSelect={onInputChange}
                className="w-full"
                disabled={isDisabled}
            />

            <Inputs
                label="Celular"
                htmlFor="cel"
                type="number"
                name="phoneNumber"
                placeholder=' '
                value={formData.phoneNumber}
                onChange={onInputChange}
                error={errors.phoneNumber}
                className="mt-4"
                disabled={isDisabled}
            />

            {authError && <div className="text-[var(--red5)] text-[14px] leading-4 mt-4">{authError}</div>}

            <div className='mt-6'>
                <Checkbox 
                    label='Acepto la Política de Privacidad'
                    name='acceptPrivacyPolicy'
                    checked={formData.acceptPrivacyPolicy}
                    onChange={onInputChange}
                    error={errors.acceptPrivacyPolicy}
                    disabled={isDisabled}
                />

                <Checkbox 
                    label='Acepto la Política Comunicaciones Comerciales'
                    name='acceptCommercialCommunications'
                    checked={formData.acceptCommercialCommunications}
                    onChange={onInputChange}
                    error={errors.acceptCommercialCommunications}
                    disabled={isDisabled}
                    className='mt-4'
                />

                <button type='button' onClick={handleShowModal} className='mt-[12px] underline text-[12px] leading-[20px] tracking-[.1px] text-[var(--gray1)] font-br-sonoma-bold active:text-[var(--neutrals6)] cursor-pointer inline-block'>Aplican Términos y Condiciones.</button>

                <div className='block-btn'>
                    <Button isLoading={loading} onClick={onSubmit} color='black' size='lg'>
                        {loading ? 'Cotizando...' : 'Cotiza aqui'}
                    </Button>
                </div>
            </div>
        </form>
    )
}
