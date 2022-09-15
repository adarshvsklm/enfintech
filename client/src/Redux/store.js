import {configureStore} from '@reduxjs/toolkit'
import Product from './User/Product'
 
export const store =configureStore({
    reducer: {
        Product
    }
})