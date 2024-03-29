import { createSlice } from "@reduxjs/toolkit";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem("userAuthState");
        return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (err) {
        return undefined;
    }
};

const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem("userAuthState", serializedState);
    } catch (err) {
        // Handle errors
    }
};

const userLoginAuthSlice = createSlice({
    name: 'user-auth',
    initialState: loadState() || {
        isLoggedIn: false,
    },
    reducers: {
        loginSuccess: (state) => {
            state.isLoggedIn = true;
            saveState(state);
        },
        logout: (state) => {
            state.isLoggedIn = false;
            saveState(state);
        }
    }
});

export const { loginSuccess, logout } = userLoginAuthSlice.actions;
export default userLoginAuthSlice.reducer;