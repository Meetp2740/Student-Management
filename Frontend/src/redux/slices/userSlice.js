import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: '',
        loading: false,
        error: null
    },
    reducers: {
        resetUserState: (state) => {
            state.loading = false;
            state.error = null;
        },
        SignUpStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        SignUpSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
        },
        SignUpFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        SignInSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        Signout: (state) => {
            state.currentUser = null;
        },
    }
})

export const { SignUpStart, SignUpSuccess, SignUpFail, SignInStart, SignInSuccess, SignInFail, resetUserState, Signout } = userSlice.actions;

export default userSlice.reducer    