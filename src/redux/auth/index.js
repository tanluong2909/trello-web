import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {

    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserAccess: ( state, action ) => {
            state.user = action.payload.user
        },
        boardData: ( state, action ) => {
            state.board = action.payload.board
            console.log(action.payload)
        },
        addColumn: ( state, action ) => {
            state.board = action.payload.board
            console.log(action.payload)
        }
    }
})

export const { setUserAccess, boardData, addColumn } = authSlice.actions
export default authSlice.reducer