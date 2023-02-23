import { configureStore } from "@reduxjs/toolkit";
import mainColorReducer from './main-color'

const store = configureStore({reducer: {mainColor: mainColorReducer}})

export default store