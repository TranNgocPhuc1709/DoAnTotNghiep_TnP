import BaseInput from "@library-src/models/qlch_control/base_input/BaseInput";
import ElementLibrary from '@library-src/utilities/commons/ElementLibrary';
import Convert from '@library-src/utilities/commons/Convert';

export default class FormLibrary {

    /**
     * Kiểm tra control trên form đã validate thành công hết chưa? nếu chưa thì focus vào control đầu tiên
     * tnduc - 19.09.2023 
     */
    public static validFormByBindingControl(bindingControl: Record<string, BaseInput>) {
        const listControl = Convert.recordToArrayKey(bindingControl);
        let result = true;
        if (listControl && listControl.length > 0) {
            let firstControlInValid = false;
            for (let i = 0; i < listControl.length; i++) {
                const control = bindingControl[listControl[i]];
                if (!control.isValidateSuccess) {
                    result = false;
                    if (!control.isActive) {
                        control.isActive = true;
                    }
                    if (!firstControlInValid) {
                        firstControlInValid = true;
                        const domControl: HTMLElement | null = ElementLibrary.getElementById(control.id);
                        domControl?.focus();
                    }
                }
            }
        }
        return result;
    }
}