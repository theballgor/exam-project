export const onProfileValidate = ({firstName, lastName, additionalInfo}) => {
    const errorMessages = {
        firstNameError: '',
        lastNameError: '',
        additionalInfoError: ''
    }

    const firstNameValid = (firstName.length >= 2 && firstName.length <= 32) || firstName.length === 0
    const lastNameValid = (lastName.length >= 2 && lastName.length <= 32) || lastName.length === 0
    const additionalInfoValid = (additionalInfo.length >= 2 && additionalInfo.length <= 128) || additionalInfo.length === 0

    errorMessages.firstNameError = firstNameValid ? '' : 'First name need to be between 2 and 32 characters'
    errorMessages.lastNameError = lastNameValid ? '' : 'Last name need to be between 2 and 32 characters'
    errorMessages.additionalInfoError = additionalInfoValid ? '' : 'Additional information need to be between 2 and 128 characters'

    return errorMessages
}
