
export const loginSuccessMutation = (state, user) => {
    sessionStorage.setItem('user-token',user.accessToken);
    state.user = user;
    state.isAuthenticated=true;
};









