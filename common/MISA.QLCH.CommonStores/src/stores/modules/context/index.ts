import { Module } from 'vuex';
import ContextModel from "@store-src/models/context/ContextModel";
import RootState from '@store-src/stores/state/RootState';
import State from './State';
import Mutations from './Mutations';
import Actions from './Actions';
import Getters from './Getters';


const contextModule: Module<ContextModel, RootState> = {
  namespaced: true,
  state: State,
  mutations: Mutations,
  actions: Actions,
  getters: Getters,
};

export default contextModule;
  