import ShiftRecordListDictionary from './ShiftRecordListDictionary';
import { Ref, ref } from 'vue';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import LocalStorageLibrary from '@library-src/utilities/window/local-storage/LocalStorageLibrary';
import ShiftRecord from '@store-src/models/shift-record/ShiftRecord';
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import DropDownMenu from '@library-src/models/qlch_control/qlch_drop_down_menu/DropDownMenu';
import DropDownMenuChild from '@library-src/models/qlch_control/qlch_drop_down_menu/children/DropDownMenuChild';
import { EditMode } from '@library-src/utilities/enums/EditMode';
import Log from '@library-src/utilities/Log';
export default (await import('vue')).defineComponent({
    extends: BaseDictionaryListController,

    components: {
        BaseDictionaryListView,
    },
    setup() {
        const thisData: Ref<ShiftRecordListDictionary> = ref(new ShiftRecordListDictionary());
        return {
            thisData,
            viewControl
        };
    },
    methods: {
        /**
        * Tạo dòng mặc định
        */
        getTemplateRecord() {
            console.log("DEV: Override Function getTemplateRecord return new model()");
            return {};
        },

        /**
        * build danh sách cột cho grid chính
        */
        buildGridMasterColumn(): Array<Column> {
            console.log("DEV: Override Function buildGridMasterColumn return list Column in Grid");
            return Array(
                new Column({
                    fieldText: "Tên ca",
                    dataIndex: "ShiftName",
                    width: 120,
                }),
                new Column({
                    fieldText: "Giờ bắt đầu",
                    dataIndex: "ShiftTimeStart",
                    width: 260
                }),
                new Column({
                    fieldText: "Giờ kết thúc",
                    dataIndex: "ShiftTimeStartEnd",
                    width: 260
                }),
                new Column({
                    fieldText: "Trạng thái",
                    dataIndex: "ShiftStatus",
                    minWidth: 260,
                    flex: 1
                })
            );
        },

        /**
        * Load dữ liệu master lên grid
        * @param param
        */
        loadMasterData(param: ParamPaging) {
            console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
            // const  newContext = new ShiftRecord ;
            if (!LocalStorageLibrary.getByKey<Array<ShiftRecord>>("ShiftRecord")) {
                return new Array<ShiftRecord>;
            }
            else {
                return LocalStorageLibrary.getByKey<Array<ShiftRecord>>("ShiftRecord");
            }
        },

        /**
        * Set PrimaryKey cho object master
        */
        getPrimaryKeyMaster() {
            console.log("DEV: Override Function getPrimaryKeyMaster return Property has Attribute is Key");
            return "Column1";
        },

        /**
        * Khai báo import component detail
        * Override lại function after close form
        */
        onSelectAction(control: Button | DropDownMenu | DropDownMenuChild) {
            try {
                const me = this;
                if (!control) {
                    return;
                }
                const editMode = control.value;
                switch (editMode) {
                    case EditMode.Edit:
                        me.editItem();
                        break;
                    default:
                        break;
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },
        editItem() {
            const me = this;
            const record = me.getFirstSelectedRecordMaster();
            if (record) {
                me.showFromDetail(record, EditMode.Edit);
            }
        },
        getFirstSelectedRecordMaster() {
            const me = this;
            const allRecord = me.getAllSelectedRecordMaster();
            if (allRecord) {
                return allRecord[0];

            } else {
                return undefined;
            }
        },
        getAllSelectedRecordMaster() {
            const me = this;
            if (!(me.viewControl && me.viewControl.gridMaster)) {
                return undefined;
            }
            return me.viewControl.gridMaster.listSelectedRecord;
        },

        async createComponent() {
            console.log("DEV: Override Function createComponent Vue component Detail");
            const frmDetail = (await import(`../shift-record-detail/ShiftRecordDetail.vue`)).default;
            return frmDetail;
        },
    }
});
