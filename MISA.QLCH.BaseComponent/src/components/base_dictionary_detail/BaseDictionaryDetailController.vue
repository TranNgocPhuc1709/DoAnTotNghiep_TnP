<script lang="ts">
import Log from '@library-src/utilities/Log';
import Convert from '@library-src/utilities/commons/Convert';
import Function from '@library-src/utilities/commons/Function';
import { EditMode } from '@library-src/utilities/enums/EditMode';
import DictionaryDetailViewModel from '@library-src/models/qlch_base/dictionary_detail_view_model/DictionaryDetailViewModel';
import ToolBarItemsView from '@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView';
import BaseInput from '@library-src/models/qlch_control/base_input/BaseInput';
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import DropDownMenu from '@library-src/models/qlch_control/qlch_drop_down_menu/DropDownMenu';
import DropDownMenuChild from '@library-src/models/qlch_control/qlch_drop_down_menu/children/DropDownMenuChild';
import { Ref, ref } from 'vue';
import { PropType } from 'vue';
import FormLibrary from '@library-src/utilities/commons/FormLibrary';
import PopupLibrary from '@library-src/utilities/commons/PopupLibrary';
import BaseController from '@src/components/base/BaseController.vue';

export default {
    extends: BaseController,

    props: {
        masterData: {
            type: Object as PropType<Record<string, any>>,
            require: true
        }
    },

    /**
     * tnphuc - 19.09.2023 
     */
    data() {
        const me = this;
        const toolBarItems = me.buildToolBarItems();
        const titleForm = me.getTitleForm();
        const propView: Ref<DictionaryDetailViewModel> = ref(new DictionaryDetailViewModel({
            toolBarItems: toolBarItems,
            title: titleForm
        }));
        const bindingControl: Record<string, BaseInput> = me.buildBindingControl();
        return {
            propView,
            bindingControl
        };
    },

    methods: {
        /**
         * Khai báo các nút chức năng trên form
         * tnphuc - 19.09.2023 
         */
        buildToolBarItems(): Array<ToolBarItemsView> {
            return Array(
                new ToolBarItemsView({
                    name: "btnSave",
                    control: new Button({
                        fieldText: "Lưu",
                        classIconLeft: "i-save",
                        classType: "primary"
                    })
                }),
                new ToolBarItemsView({
                    name: "btnSaveAdd",
                    control: new Button({
                        fieldText: "Lưu và thêm mới",
                        classIconLeft: "i-add",
                        classType: "secondary"
                    })
                }),
                new ToolBarItemsView({
                    name: "btnCancel",
                    control: new Button({
                        fieldText: "Hủy bỏ",
                        classIconLeft: "i-cancel",
                        classType: "tertiary"
                    })
                })
            );
        },

        /**
         * Khai báo danh sách control binding trên form
         * tnphuc - 19.09.2023 
         */
        buildBindingControl(): Record<string, BaseInput> {
            return {}
        },

        /**
         * Khai báo tiêu đề cho form
         * tnphuc - 19.09.2023 
         */
        getTitleForm() {
            return "BaseDictionaryDetailForm";
        },

        /**
         * Sự kiện khi người dùng click trên tool Bar item
         * @param item 
         * tnphuc - 19.09.2023 
         */
        onSelectAction(item: ToolBarItemsView) {
            try {
                if (!item || !item.control) {
                    return;
                }
                const me = this;
                const button = item.name;
                switch (button) {
                    case "btnSave":
                        me.btnSaveClick(item.control);
                        break;
                    case "btnSaveAdd":
                        me.btnSaveNewClick(item.control);
                        break;
                    case "btnCancel":
                        me.btnCancelClick();
                        break;
                    default:
                        break;
                }
            } catch (error) {
                Log.ErrorLog(error as Error)
            }
        },

        /**
         * Thực hiện click vào nút close form 
         * tnphuc - 19.09.2023 
         */
        onCloseForm() {
            try {
                const me = this;
                me.closeForm();
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện click button Lưu
         * tnphuc - 19.09.2023 
         */
        async btnSaveClick(control: Button | DropDownMenu | DropDownMenuChild) {
            const me = this;
            me.loadMaskInFormSave(control, true);
            try {
                if (me.masterData?.editMode == EditMode.View) {
                    return;
                }

                if (!me.validateDataBeforeSave()) {
                    return;
                }

                await Function.getTimeOut(1000, '');
                me.preDataBeforeSave();
                me.submitChanges();
            } catch (error) {
                Log.ErrorLog(error as Error)
            } finally {
                me.loadMaskInFormSave(control, false);
            }
        },

        /**
         * Validate dữ liệu trước khi save
         * tnphuc - 19.09.2023 
         */
        validateDataBeforeSave() {
            const me = this;
            if (!FormLibrary.validFormByBindingControl(me.bindingControl)) {
                return false;
            }

            return me.validateDataBeforeSaveCustom();
        },

        /**
         * Sự kiện click vào button lưu và thêm mới
         * tnphuc - 19.09.2023 
         */
        async btnSaveNewClick(control: Button | DropDownMenu | DropDownMenuChild) {
            const me = this;
            me.loadMaskInFormSave(control, true);
            try {
                if (me.masterData?.editMode == EditMode.View) {
                    return;
                }
                await Function.getTimeOut(1000, '');
            } catch (error) {
                Log.ErrorLog(error as Error)
            } finally {
                me.loadMaskInFormSave(control, false);
            }
        },

        /**
         * Sự kiện click vào button hủy bỏ
         * tnphuc - 19.09.2023 
         */
        async btnCancelClick() {
            const me = this;
            try {
                me.closeForm();
            } catch (error) {
                Log.ErrorLog(error as Error)
            }
        },

        /**
         * Thực hiện validate thêm nếu cần
         * tnphuc - 19.09.2023 
         */
        validateDataBeforeSaveCustom() {
            return true;
        },

        /**
         * function custom Data trước khi save
         * tnphuc - 19.09.2023 
         */
        preDataBeforeSave() { },

        /**
         * Cần làm gì trước khi save thì viết vào hàm này
         * tnphuc - 19.09.2023 
         */
        confirmBeforeSave() { },

        /** 
         * Thực hiện lấy thông tin nhập liệu trên form đẩy lên server để cất
         * tnphuc - 19.09.2023 
        */
        submitChanges() {
            const me = this;
            me.confirmBeforeSave();
            me.saveData();
        },

        /**
         * Hàm save đối tượng
         * tnphuc - 19.09.2023 
         */
        saveData() {
            const me = this;
            me.closeForm();
        },

        /**
         * Hàm read loading toàn bộ from khi người dùng bắt đầu thực hiện chức năng
         * @param control button đang thao tác
         * @param enable true ? đang save : đã save xong
         * tnphuc - 19.09.2023 
         */
        loadMaskInFormSave(control: Button | DropDownMenu | DropDownMenuChild, enable: boolean) {
            const me = this;
            me.setLoadingButtonClicking(control, enable);
            me.setReadOnlyToolbarButton(enable);
            me.setRedOnlyAllControlInForm(enable);
        },

        /**
         * Bật loading button
         * @param control 
         * @param enable 
         * tnphuc - 19.09.2023 
         */
        setLoadingButtonClicking(control: Button | DropDownMenu | DropDownMenuChild, enable: boolean) {
            if (control) {
                control.isLoadingData = enable;
            }
        },

        /**
         * Set Readonly tất cả button khác khi save
         * tnphuc - 19.09.2023 
         */
        setReadOnlyToolbarButton(enable: boolean) {
            const me = this;
            if (me.propView && me.propView.toolBarItems && me.propView.toolBarItems.length > 0) {
                const toolbarButton = me.propView.toolBarItems;
                toolbarButton.forEach(button => {
                    if (button.control) {
                        button.control.readOnly = enable;
                    }
                });
            }
        },

        /**
         * Set RedOnly tất cả button 
         * @param enable 
         * tnphuc - 19.09.2023 
         */
        setRedOnlyAllControlInForm(enable: boolean) {
            const me = this;
            if (me.bindingControl) {
                const arrayItemId = Convert.recordToArrayKey(me.bindingControl);
                if (arrayItemId && arrayItemId.length > 0) {
                    arrayItemId.forEach(itemId => {
                        me.bindingControl[itemId].readOnly = enable;
                    })
                }
            }
        },

        /**
         * Thực hiện đóng form
         * tnphuc - 19.09.2023 
         */
        closeForm() {
            const me = this;
            me.beforeCloseForm();
            if (me.idRoot) {
                PopupLibrary.closePopup(me.idRoot);
            }
            me.afterCloseForm();
        },

        /**
         * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master, override ở component detail và nội dung hàm sẽ viết ở tầng khởi tạo component
         * tnphuc - 19.09.2023 
         */
        afterCloseForm() { },

        /**
         * Trước khi đóng form còn muốn làm gì thì override lại function này
         * tnphuc - 19.09.2023 
         */
        beforeCloseForm() { },


    }
}
</script>