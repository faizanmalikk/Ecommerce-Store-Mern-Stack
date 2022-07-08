import { configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import { productsApi } from '../services/productsApi';
import { AuthenticationApi } from '../services/userApi';

const store = configureStore({
    reducer : {
        [productsApi.reducerPath]  : productsApi.reducer,
        [AuthenticationApi.reducerPath]  : AuthenticationApi.reducer,
      
    
    },
    middleware : (getDefaultMiddleware)=> getDefaultMiddleware().concat(productsApi.middleware)
    .concat(AuthenticationApi.middleware)
})

export default store;