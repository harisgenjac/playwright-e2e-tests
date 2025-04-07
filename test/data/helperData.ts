const generateUniqueEmail = (prefix) => {
    return `${prefix}+${Date.now()}@test.com`
}
const registrationData = {
    firstName: 'Alex',
    lastName: 'Dale',
    dateOfBirth: '2000-02-02',
    street: 'West St',
    postalCode: '500',
    city: 'London',
    state: 'England',
    country: 'DE',
    phone: '123456789',
    email:generateUniqueEmail('test'),
    password: 'Tastatura1!123'
}
const billingData = {
    street: 'East St',
    city: 'Madrid',
    state: 'Madrid',
    country: 'Spain',
    postalCode: '25000',
}
const paymentData = {
    cardNumber: '0000-0000-0000-0000',
        expDate: '10/2028',
        cvv: '123',
        holderName: 'Alex'
}
export { registrationData, billingData, paymentData };