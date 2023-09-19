import { EditMode } from "@library-src/utilities/enums/EditMode";
import IBaseModel from "./IBaseModel";

export default class BaseModel {
    /**
     *
     */
    constructor(model?: IBaseModel) {
        const me = this;
        if (model) {
            me.editMode = model.editMode ?? EditMode.View;
        }
    }
    editMode: EditMode = EditMode.View;
}