import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser : null,
        loading : false,
        error : null
    },
    reducers: {
        resetUserState: (state) => {
            state.loading = false;
            state.error = null;  
        },
        SignUpStart:  (state) => {
            state.loading = true;
            state.error = false;  
        },
        SignUpSuccess:  (state, action) => {
            state.loading = false;
            state.error = false;
        },
        SignUpFail:  (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        SignInStart:  (state) => {
            state.loading = true;
            state.error = false;  
        },
        SignInSuccess:  (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = false;
        },
        SignInFail:  (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const { SignUpStart, SignUpSuccess, SignUpFail, SignInStart, SignInSuccess, SignInFail, resetUserState } = userSlice.actions;

export default userSlice.reducer    