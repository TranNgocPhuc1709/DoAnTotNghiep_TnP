import IDemoControl from "./IDemoControl";

export default class DemoControl {
    /**
     * Constructor
     */
    constructor(input ?: IDemoControl) {
        const me = this;
        if (input && input?.title) {
            me.title = input.title;
        }
    }

    title?:string

}