/// <reference types="vite/client" />

declare module "qlch_control/*" {
    var methods: Record<string, any>;
 }
declare module "qlch_base/*" {
    var methods: Record<string, any>;
}

//Khai báo module Vuex
declare module "vuex" {
    export * from "vuex/types/index.d.ts";
    export * from "vuex/types/helpers.d.ts";
    export * from "vuex/types/logger.d.ts";
    export * from "vuex/types/vue.d.ts";
}
