import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const employee = JSON.parse(localStorage.getItem('employee'))
const employer = JSON.parse(localStorage.getItem('employer'))

const initialState = {
    employee: employee ? employee : null,
    employer: employer ? employer : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

//REGISTER USER
export const registerEmployer = createAsyncThunk('employer/register', async(userData, thunkAPI) => {
    try {
        return await authService.registerEmployer(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const loginEmployer = createAsyncThunk('employer/login', async(userData, thunkAPI) => {
    try {
        return await authService.loginEmployer(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const updateEmployer = createAsyncThunk('employer/update', async(userData, thunkAPI) => {
    try {
        return await authService.updateEmployer(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const registerEmployee = createAsyncThunk('employee/register', async(userData, thunkAPI) => {
    try {
        return await authService.registerEmployee(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const loginEmployee = createAsyncThunk('employee/login', async(userData, thunkAPI) => {
    try {
        return await authService.loginEmployee(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk("logout", async() => {
    return await authService.logout()
})

export const sendforgotPasswordLink = createAsyncThunk('employer/send-forgotpass-link', async(userData, thunkAPI) => {
    try {
        return await authService.sendforgotPasswordLink(userData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
                            || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(registerEmployer.pending, (state) => {
            state.isLoading = true
        })
        .addCase(registerEmployer.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.employer = action.payload
            state.employee = null
        })
        .addCase(registerEmployer.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.employer = null
        })
        .addCase(loginEmployer.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginEmployer.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.employer = action.payload
            state.employee = null
        })
        .addCase(loginEmployer.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.employer = null
        })
        .addCase(registerEmployee.pending, (state) => {
            state.isLoading = true
        })
        .addCase(registerEmployee.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.employee = action.payload
            state.employer = null
        })
        .addCase(registerEmployee.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.employee = null
        })
        .addCase(loginEmployee.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginEmployee.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.employee = action.payload
            state.employer = null
        })
        .addCase(loginEmployee.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.employee = null
        })
        .addCase(updateEmployer.pending, (state) => {
            state.isLoading = true
        })
        .addCase(updateEmployer.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.employer = action.payload
            state.employee = null
        })
        .addCase(updateEmployer.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.employer = null
            state.employee = null
        })
        .addCase(sendforgotPasswordLink.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.message = action.payload
            state.employer = null
            state.employee = null
        })
        .addCase(logout.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.employer = null
            state.employee = null
        })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer