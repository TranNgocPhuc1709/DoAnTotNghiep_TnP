export default interface IBaseControl {

    /**
     * Display field name information
     */
    fieldText ?:string;

    /**
     * Read only Status
     */
    readOnly ?: boolean;

    
    /**
     * Thông tin trường dùng để binding Data lên form
     */
    bindingIndex?: string;
}