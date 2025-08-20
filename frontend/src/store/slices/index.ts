import { combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist';
import authReducer from "./authSlice"
import cartReducer from "./cartSlice"

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
}

const rootReducers = combineReducers({
    auth: authReducer,
    cart: cartReducer,
})

export default persistReducer(persistConfig, rootReducers)