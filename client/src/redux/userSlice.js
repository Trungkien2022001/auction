import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        username:null,
        isAdmin: 0,
        phone: null,
        email:null,
        address: null,
        token:null,
        name:'Guest'
    },
    reducers:{
        login:(state, action)=>{
            state.id = action.payload.id
            state.username = action.payload.username
            state.isAdmin = action.payload.isAdmin
            state.token = action.payload.token
            state.name = action.payload.name
            state.phone = action.payload.phone
            state.email = action.payload.email
            state.adress = action.payload.adress
        },
        logout:(state, action)=>{
            state.id = null
            state.username = null
            state.isAdmin = 0
            state.token = null
            state.name ='Guest'
            state.phone =null
            state.email =null
            state.address =null
        }
    } 
})