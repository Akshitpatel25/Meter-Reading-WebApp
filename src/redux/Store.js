import { configureStore } from "@reduxjs/toolkit";
import useruploadData from "./Slices/Userdata"
export const store = configureStore({
    reducer : useruploadData
})