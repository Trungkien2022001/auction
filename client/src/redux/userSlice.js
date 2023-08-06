import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: null,
        name:null,
        username:null,
        email: null,
        phone: null,
        password_hash: null,
        token: '',
        role_id: null,
        avatar: 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg',
        birthday: null,
        address: null,
        isVerified: null,
        isBlocked: null,
        custom_config: null,
        createdAt: null,
        updatedAt: null,
        del_flag: null,
        role: {}
    },
    reducers:{
        login:(state, action)=>{
            state.id = action.payload.id
            state.name = action.payload.name
            state.username = action.payload.username
            state.email = action.payload.email
            state.phone = action.payload.phone
            state.password_hash = action.payload.password_hash
            state.token = action.payload.token
            state.role_id = action.payload.role_id
            state.avatar = action.payload.avatar
            state.birthday = action.payload.birthday
            state.address = action.payload.address
            state.is_verified = action.payload.is_verified
            state.is_blocked = action.payload.is_blocked
            state.custom_config = action.payload.custom_config
            state.createdAt = action.payload.createdAt
            state.updatedAt = action.payload.updatedAt
            state.del_flag = action.payload.del_flag
            state.role = action.payload.role
        },
        logout:(state, action)=>{
            state.id = null
            state.name = null
            state.username = null
            state.email = null
            state.phone = null
            state.password_hash = null
            state.role_id = null
            state.avatar = 'https://i.pinimg.com/564x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg'
            state.birthday = null
            state.address = null
            state.isVerified = null
            state.isBlocked = null
            state.custom_config = null
            state.createdAt = null
            state.updatedAt = null
            state.del_flag = null
            state.role = {}
        }
    } 
})