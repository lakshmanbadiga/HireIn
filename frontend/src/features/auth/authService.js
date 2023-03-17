import axios from "axios"

const EMPLOYER_REGISTER_URI = '/employers/register'
const EMPLOYER_LOGIN_URI = '/employers/login'
const EMPLOYER_UPDATE_URI = '/employers/update'

const EMPLOYEE_REGISTER_URI = '/employees/register'
const EMPLOYEE_LOGIN_URI = '/employees/login'

const SEND_PASS_LINK = '/forgot-pass/send-reset-pass-link'

const registerEmployer = async(userData) => {
    console.log(userData)
    const response = await axios.post(EMPLOYER_REGISTER_URI, userData)

    if (response.data) {
        localStorage.setItem('employer', JSON.stringify(response.data))
    }

    return response.data
}

const loginEmployer = async(userData) => {
    console.log(userData)
    const response = await axios.post(EMPLOYER_LOGIN_URI, userData)

    if(response.data) {
        localStorage.setItem('employer', JSON.stringify(response.data))
    }

    return response.data
}

const updateEmployer = async(userData) => {
    const response = await axios.post(EMPLOYER_UPDATE_URI, userData)
    console.log(response.data)
    return response.data
}

const registerEmployee = async(userData) => {
    console.log(userData)
    const response = await axios.post(EMPLOYEE_REGISTER_URI, userData)

    if (response.data) {
        localStorage.setItem('employee', JSON.stringify(response.data))
    }

    return response.data
}

const loginEmployee = async(userData) => {
    const response = await axios.post(EMPLOYEE_LOGIN_URI, userData)

    if(response.data) {
        localStorage.setItem('employee', JSON.stringify(response.data))
    }

    return response.data
}

const logout = async() => {
    localStorage.removeItem('employee')
    localStorage.removeItem('employer')
}

const sendforgotPasswordLink = async(userData) => {
    const response = await axios.post(SEND_PASS_LINK, userData)
    return response.data
}


const authService = {
    registerEmployer, loginEmployer, updateEmployer, registerEmployee, loginEmployee, sendforgotPasswordLink, logout
}

export default authService