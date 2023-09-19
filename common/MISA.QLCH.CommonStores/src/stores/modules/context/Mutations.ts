import ContextModel from "@store-src/models/context/ContextModel";

const mutations = {
    setUsername(state: ContextModel, newUsername: string) {
        state.token = newUsername;
    }
}

export default mutations;