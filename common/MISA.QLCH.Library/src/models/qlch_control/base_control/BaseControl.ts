import Guid from "@library-src/utilities/types/Guid";
import IBaseControl from "./IBaseControl";

export default class BaseControl {

    /**
     * Create Constructor
     */
    constructor(nameControl: string, input?: IBaseControl) {
        const me = this;
        if (input?.fieldText) {
            me.fieldText = input?.fieldText;
        }

        if (input?.readOnly) {
            me.readOnly = true;
        } else {
            me.readOnly = false
        }

        if (nameControl) {
            me.nameControl = nameControl;
        }

        me.id = me.nameControl + "-" + Guid.NewGuid();

        if (input?.bindingIndex) {
            me.bindingIndex = input?.bindingIndex;
        }

    };

    nameControl?: string = "qlch-control";

    /**
     * Display field name information
     */
    fieldText?: string = "";

    /**
     * Read only Status
     */
    readOnly?: boolean = false;

    /**
     * ID Control. This information is automatically generated
     */
    id: string='qlch-control';

    /**
     * Attribute used to customize the Root Class outside of control
     */
    classParent?: string = "";

    /**
     * Is the control in a loading state?
     */
    isLoadingData?: boolean = false;

    /**
     * Thông tin trường dùng để binding Data lên form
     */
    bindingIndex?: string = "";

    /**
     * The flag determines whether the control has passed the validator or not?
     */
    isValidateSuccess?: boolean = true;

    /**
     * Thuộc tính thể hiện người dùng đã thực hiện active control hay chưa? TH người dùng mở form lần đầu đã show cảnh báo valid là ko hợp lý
     */
    isActive?: boolean = false

}