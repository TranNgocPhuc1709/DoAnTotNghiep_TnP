import IContextModel from "./IContextModel";

export default class ContextModel {
    /**
     *
     */
    constructor(context?: IContextModel) {
        if (context) {
            const me = this;
            me.token = context.token;
        }
    }

    /**
     * Giá trị token
     */
    token?: string
}