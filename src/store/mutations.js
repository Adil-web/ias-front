
export const loginSuccessMutation = (state, user) => {
    sessionStorage.setItem('user-token',user.token);
    console.log("userMuata")
    console.log(user)
    console.log(user)
    console.log("userMuata")
    state.user = user;
    state.isAuthenticated=true;
};


export const logoutMutation = (state) => {
    sessionStorage.removeItem('user-token');
    state.user = null;
    state.isAuthenticated=false;
};










