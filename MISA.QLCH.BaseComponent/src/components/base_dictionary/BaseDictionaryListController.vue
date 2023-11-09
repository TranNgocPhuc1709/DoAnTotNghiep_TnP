<script lang="ts">
import Log from '@library-src/utilities/Log';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Grid from '@library-src/models/qlch_control/qlch_grid/Grid';
import { Ref, ref } from 'vue';
import DictionaryListViewModel from '@library-src/models/qlch_base/dictionary_list_view_model/DictionaryListViewModel';
import BaseController from '@src/components/base/BaseController.vue';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import ToolBarItemsView from '@library-src/models/qlch_base/tool_bar_items_view/ToolBarItemsView';
import { EditMode } from '@library-src/utilities/enums/EditMode';
import Button from '@library-src/models/qlch_control/qlch_button/Button';
import DropDownMenu from '@library-src/models/qlch_control/qlch_drop_down_menu/DropDownMenu';
import DropDownMenuChild from '@library-src/models/qlch_control/qlch_drop_down_menu/children/DropDownMenuChild';
import Function from "@library-src/utilities/commons/Function";

export default {
    extends: BaseController,
    data() {
        const me = this;
        const columnMaster = me.buildGridMasterColumn();
        const toolBarItems = me.buildToolBarItems();
        const primaryKeyMaster = me.getPrimaryKeyMaster();
        const viewControl: Ref<DictionaryListViewModel> = ref(new DictionaryListViewModel({
            gridMaster: new Grid({
                columns: columnMaster,
                primaryKey: primaryKeyMaster,
            }),
            toolBarItems: toolBarItems
        }))
        return {
            viewControl
        };
    },

    /**
     * tnphuc - 19.09.2023 
     */
    created() {
        const me = this;
        try {
            me.beginLoadMasterData(new ParamPaging());
        } catch (error) {
            Log.ErrorLog(error as Error)
        }
    },
    methods: {

        /**
         * Build GridMaster Column
         * tnphuc - 19.09.2023 
         */
        buildGridMasterColumn(): Array<Column> {
            return [];
        },

        /**
         * Build Item cho Toolbar
         * tnphuc - 19.09.2023 
         */
        buildToolBarItems(): Array<ToolBarItemsView> {
            const toolBarItems: Array<ToolBarItemsView> = Array(new ToolBarItemsView({
                name: "btnAdd",
                control: new Button({
                    fieldText: "Thêm mới",
                    classIconLeft: "i-add-white",
                    styleButton: "border-radius: 0",
                    value: EditMode.Add
                })
            }),
                new ToolBarItemsView({
                    name: "btnDuplicate",
                    control: new Button({
                        fieldText: "Nhân bản",
                        classIconLeft: "i-duplicate-white",
                        styleButton: "border-radius: 0",
                        value: EditMode.Duplicate,
                        readOnly: true
                    })
                }),
                new ToolBarItemsView({
                    name: "btnEdit",
                    control: new Button({
                        fieldText: "Sửa",
                        classIconLeft: "i-pencil-white",
                        styleButton: "border-radius: 0",
                        value: EditMode.Edit,
                        readOnly: true
                    })
                }), new ToolBarItemsView({
                    name: "btnDelete",
                    control: new Button({
                        fieldText: "Xóa",
                        classIconLeft: "i-recycle-white",
                        styleButton: "border-radius: 0",
                        value: EditMode.Delete,
                        readOnly: true
                    })
                }),
                new ToolBarItemsView({
                    name: "btnReload",
                    control: new Button({
                        fieldText: "Nạp",
                        classIconLeft: "i-reload-white",
                        styleButton: "border-radius: 0",
                        value: EditMode.Reload,
                        readOnly: true
                    })
                })
            );

            return toolBarItems;

        },
        /**
         * Load dữ liệu cho grid Master
         * @param param
         * tnphuc - 19.09.2023 
         */
        async beginLoadMasterData(param: ParamPaging) {
            const me = this;
            if (me.viewControl.gridMaster && param) {
                me.viewControl.gridMaster.isLoadingData = true;
                me.resetListSelectedRecordMaster();
                me.displayToolbarLoadingData(true);
                await Function.getTimeOut(3000, "");
                me.viewControl.gridMaster.data = me.loadMasterData(param);
                me.viewControl.gridMaster.isLoadingData = false;
                me.displayToolbarLoadingData(false);
            }
        },

        /**
         * Load dữ liệu master lên grid
         * @param param 
         * tnphuc - 19.09.2023 
         */
        loadMasterData(param: ParamPaging) {
            Log.InfoLog("Dev: Override lại function loadMasterData with param: " + JSON.stringify(param));
            return [];
        },

        /**
         * Load dữ liệu danh mục - nếu có
         * tnphuc - 19.09.2023 
         */
        loadDictionaryData() {
            Log.InfoLog("Dev: Override lại function loadDictionaryData");
        },

        /**
         * Set Khoá chính cho grid master
         * tnphuc - 19.09.2023 
         */
        getPrimaryKeyMaster() {
            Log.InfoLog("Dev: Override lại function getPrimaryKeyMaster");
        },

        /**
         * Load dữ liệu cho Grid Master
         * @param param Paging
         * tnphuc - 19.09.2023 
         */
        onLoadMaster(param: ParamPaging) {
            try {
                const me = this;
                if (me.viewControl.gridMaster) {
                    me.viewControl.gridMaster.pagingParam = param;
                }
                me.beginLoadMasterData(param);
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện thay đổi control dữ liệu đang tích chọn trên grid master
         * @param listSelectedRecord 
         * tnphuc - 19.09.2023 
         */
        onChangeSelectedRecordMaster(listSelectedRecord: Array<Record<string, any>>) {
            try {
                const me = this;
                if (me.viewControl.gridMaster) {
                    me.viewControl.gridMaster.listSelectedRecord = listSelectedRecord;
                    me.displayToolbarSelectedRecord(listSelectedRecord);
                }
            } catch (error) {
                Log.ErrorLog(error as Error)
            }
        },

        /**
         * Sự kiện khi người dùng click trên tool Bar item
         * @param control 
         * tnphuc - 19.09.2023 
         */
        onSelectAction(control: Button | DropDownMenu | DropDownMenuChild) {
            try {
                const me = this;
                if (!control) {
                    return;
                }

                const editMode = control.value;
                switch (editMode) {
                    case EditMode.View:
                        me.viewFormDetail();
                        break;
                    case EditMode.Add:
                        me.addNew();
                        break;
                    case EditMode.Edit:
                        me.editItem();
                        break;
                    case EditMode.Delete:
                        me.delItem();
                        break;
                    case EditMode.Duplicate:
                        me.cloneItem();
                        break;
                    case EditMode.Reload:
                        me.refresh();
                        break;
                    default:
                        break;
                }
            } catch (error) {
                Log.ErrorLog(error as Error)
            }
        },

        /**
         * Lấy record đầu tiên đang selected trên grid master
         * tnphuc - 19.09.2023 
         */
        getFirstSelectedRecordMaster() {
            const me = this;
            const allRecord = me.getAllSelectedRecordMaster();
            if (allRecord) {
                return allRecord[0];

            } else {
                return undefined;
            }
        },

        /**
         * Lấy tất cả record đang select trên grid Master
         * tnphuc - 19.09.2023 
         */
        getAllSelectedRecordMaster() {
            const me = this;
            if (!(me.viewControl && me.viewControl.gridMaster)) {
                return undefined;
            }
            return me.viewControl.gridMaster.listSelectedRecord;
        },

        /**
         * Thực hiện show form detail
         * tnphuc - 19.09.2023 
         */
        viewFormDetail() {
            const me = this;
            const record = me.getFirstSelectedRecordMaster();
            if (record) {
                me.showFromDetail(record, EditMode.View);
            }
        },

        /**
         * Khi nhấn button thêm trên tool bar thì thực hiện chức năng này
         * tnphuc - 19.09.2023 
         */
        addNew() {
            const me = this;
            const newRecord = me.addNewTemplateRecord();
            me.showFromDetail(newRecord, EditMode.Add);
        },

        /**
         * Thực hiện hàm này khi nhấn vào button edit trên thanh toolbar
         * tnphuc - 19.09.2023 
         */
        editItem() {
            const me = this;
            const record = me.getFirstSelectedRecordMaster();
            if (record) {
                me.showFromDetail(record, EditMode.Edit);
            }
        },

        /**
         * Thực hiện hàm này khi nhấn vào button delete trên thanh toolbar
         * tnphuc - 19.09.2023 
         */
        delItem() {
            const me = this;
            const allRecord = me.getAllSelectedRecordMaster();
            if (allRecord) {
                Log.InfoLog("delItem record: " + JSON.stringify(allRecord));
            }
        },

        /**
         * Thực hiện hàm này khi nhấn vào button nhân bản trên thanh toolbar
         * tnphuc - 19.09.2023 
         */
        cloneItem() {
            const me = this;
            const record = me.getFirstSelectedRecordMaster();
            if (record) {
                me.showFromDetail(record, EditMode.Duplicate);
            }
        },

        /**
         * Thực hiện hàm này khi nhấn vào button nạp trên thanh toolbar
         * tnphuc - 19.09.2023 
         */
        refresh() {
            const me = this;
            let paramPaging = new ParamPaging();
            if (me.viewControl.gridMaster && me.viewControl.gridMaster.pagingParam) {
                paramPaging = me.viewControl.gridMaster.pagingParam;
            }
            me.beginLoadMasterData(paramPaging);
        },

        /**
         * Khai báo import component detail
         * tnphuc - 19.09.2023 
         */
        async createComponent() {
            return (await import(`@src/components/base_dictionary_detail/BaseDictionaryDetailView.vue`)).default;
        },



        /**
         * Ẩn hiện toolbar, contextmenu
         * @param listSelectedRecord 
         * tnphuc - 19.09.2023 
         */
        displayToolbarSelectedRecord(listSelectedRecord: Array<Record<string, any>>) {
            const me = this;
            const toolBarItems = me.viewControl.toolBarItems;

            const bEnable = listSelectedRecord.length > 0;
            if (toolBarItems && toolBarItems.length > 0) {
                toolBarItems.forEach(item => {
                    if (item && item.control) {
                        switch (item.name) {
                            case "btnDuplicate":
                            case "btnEdit":
                            case "btnDelete":
                                item.control.readOnly = !bEnable;
                                break;
                            case "btnReload":
                            case "btnAdd":
                                break;
                            default:
                                me.customDisplayToolbarSelectedRecord(item, bEnable);
                                break;
                        }
                    }

                });
            }
        },

        /**
         * Ẩn hiện toolbar, contextmenu
         * @param control 
         * tnphuc - 19.09.2023 
         */
        customDisplayToolbarSelectedRecord(item: ToolBarItemsView, bEnable: boolean) {
            if (item.control) {
                item.control.readOnly = !bEnable;
            }
        },

        /**
         * Ẩn hiện control khi loadingData
         * @param isLoadingData 
         * tnphuc - 19.09.2023 
         */
        displayToolbarLoadingData(isLoadingData: boolean) {
            const me = this;
            const toolBarItems = me.viewControl.toolBarItems;
            if (toolBarItems && toolBarItems.length > 0) {
                toolBarItems.forEach(item => {
                    if (item && item.control) {

                        switch (item.name) {
                            case "btnReload":
                            case "btnAdd":
                                item.control.readOnly = isLoadingData;
                                break;
                            case "btnDuplicate":
                            case "btnEdit":
                            case "btnDelete":
                                if (me.viewControl.gridMaster) {
                                    me.displayToolbarSelectedRecord(me.viewControl.gridMaster.listSelectedRecord);
                                }
                                break;

                                break;
                            default:
                                me.customDisplayToolbarLoadingData(item, isLoadingData);
                                break;
                        }

                    }
                });
            }
        },

        /**
         * Ẩn hiện toolbar, contextmenu
         * @param control 
         * tnphuc - 19.09.2023 
         */
        customDisplayToolbarLoadingData(item: ToolBarItemsView, bEnable: boolean) {
            if (item.control) {
                item.control.readOnly = !bEnable;
            }
        },

        /**
         * Reset lại list selected Record trên Grid Master
         * tnphuc - 19.09.2023 
         */
        resetListSelectedRecordMaster() {
            const me = this;
            if (me.viewControl.gridMaster && me.viewControl.gridMaster.listSelectedRecord.length > 0) {
                me.viewControl.gridMaster.listSelectedRecord = [];
            }
        },

        /**
         * Tạo 1 record mới
         * tnphuc - 19.09.2023 
         */
        addNewTemplateRecord() {
            const me = this;
            const record = me.getTemplateRecord();
            if (me.viewControl.gridMaster && me.viewControl.gridMaster.data) {
                me.viewControl.gridMaster.data.unshift(record);
                return me.viewControl.gridMaster.data[0];
            }
            return {};
        },

        /**
         * Tạo dòng mặc định
         * tnphuc - 19.09.2023 
         */
        getTemplateRecord() {
            return {};
        }


    }
}
</script>