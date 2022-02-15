import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js'
import {
    getAuth,
    RecaptchaVerifier,
    signInWithPhoneNumber
} from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js'


const app = initializeApp({
    apiKey: '',
    appId: '',
    projectId: '',
    authDomain: '',
})

const phoneNumber = "+11111111111";
const testVerificationCode = "123456";

const run = async () => {
    const result = await signInWithPhoneNumber(getAuth(app), phoneNumber, new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
        },
        'expired-callback': () => {
        },
    }, getAuth(app)))
        .then((confirmationResult) => confirmationResult.confirm(testVerificationCode))
        .catch(console.log);
    return result.user.accessToken
}

window.addEventListener('DOMContentLoaded', async () => {
    const accessToken = await run()
    document.querySelector('#access-token-container').innerHTML = `<span>${accessToken}</span>`
})
