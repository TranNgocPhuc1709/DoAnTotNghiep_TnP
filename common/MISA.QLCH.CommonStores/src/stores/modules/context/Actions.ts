import { Commit } from 'vuex';
const actions = {
    updateUser({ commit }: { commit: Commit }, newUsername: string) {
        commit('setUsername', newUsername);
    },
};
export default actions