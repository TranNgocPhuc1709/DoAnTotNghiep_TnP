import Vuex, { StoreOptions } from 'vuex';
import contextModule from '@store-src/stores/modules/context';
import RootState from '@store-src/stores/state/RootState';

const store: StoreOptions<RootState> = {
  state: {},
  modules: {
    context: contextModule,
  }
};

export default new Vuex.Store(store);
