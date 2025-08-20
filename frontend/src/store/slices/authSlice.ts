import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../index';

// Define a type for the slice state
export interface AuthState {
    id: string | null;
    user: string | null;
    token: string | null;
    refreshToken: string | null;
    role: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
    id: null,
    user: null,
    token: null,
    refreshToken: null,
    role: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetState: () => initialState,
        setCredentials: (state, action) => {
            // console.log("setcredentials payload",action.payload); 
            const { id, user, token, refreshToken, role } = action.payload;
            // console.log({user,id})
            state.id = id
            state.user = user
            state.token = token
            state.refreshToken = refreshToken
            state.role = role
        },
        setRefreshToken: (state, action) => {
            const { accessToken, refreshToken } = action.payload;
            state.token = accessToken;
            state.refreshToken = refreshToken;
        },
        setUser(state, action) {
            state.user = action.payload
        }
    }

})

export const { setCredentials, setRefreshToken, resetState, setUser } = authSlice.actions
export default authSlice.reducer

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentRefreshToken = (state: RootState) => state.auth.refreshToken;
export const selectCurrentRole = (state: RootState) => state.auth.role;
