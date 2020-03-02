
export const loginSuccessMutation = (state, user) => {
    sessionStorage.setItem('user-token',user.accessToken);
    state.user = user;
    state.isAuthenticated=true;
};


export const logoutMutation = (state) => {
    sessionStorage.removeItem('user-token');
    state.user = null;
    state.isAuthenticated=false;
};











