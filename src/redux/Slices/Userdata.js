import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: null,
}

export const Userdata = createSlice({
    name: "Userdata",
    initialState,
    reducers : {
        uploadData: (state, action) => {
            const data = {
                userobject: action.payload
            }
            state.value[data]
        },

        deleteData : (state) => {
            state.value = null
        }
    }
})

export const {uploadData, deleteData} = Userdata.actions

export default Userdata.reducer