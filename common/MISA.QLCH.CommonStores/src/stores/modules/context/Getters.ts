const getters = {
    getUsername(state: ContextModel) {
        return state.token;
    },
};

export default getters;