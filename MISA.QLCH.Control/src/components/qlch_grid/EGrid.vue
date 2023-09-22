<template src="./EGrid.html" ></template>
<style lang="scss" scoped src="./EGrid.scss"></style>
<script lang="ts">
import Grid from '@library-src/models/qlch_control/qlch_grid/Grid';
import { Ref, ref } from 'vue';
import BaseControl from '../base/BaseControl.vue';
import EGrid from './EGrid';
import ETextBox from '../qlch_text_box/ETextBox.vue';
import ECheckbox from '../qlch_checkbox/ECheckbox.vue';
import Log from '@library-src/utilities/Log';
import { LooseRequired } from '@vue/shared';
import { ControlType } from '@library-src/utilities/enums/TypeControl';
import TextBox from '@library-src/models/qlch_control/qlch_text_box/TextBox';
import Checkbox from '@library-src/models/qlch_control/qlch_checkbox/Checkbox';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import FilterControl from './FilterControl';
import DropDownMenu from '@library-src/models/qlch_control/qlch_drop_down_menu/DropDownMenu';
import DropDownMenuChild from '@library-src/models/qlch_control/qlch_drop_down_menu/children/DropDownMenuChild';
import FilterModel from '@library-src/models/qlch_control/qlch_filter/FilterModel';
import { Operator } from '@library-src/utilities/enums/Filter';
import EGridFooter from './EGridFooter';
import NumberModel from '@library-src/models/qlch_control/qlch_number/NumberModel';
import ENumber from '../qlch_number/ENumber.vue';
import NumberFormat from '@library-src/models/qlch_control/number_format/NumberFormat';
import Combobox from '@library-src/models/qlch_control/qlch_combobox/Combobox';
import ECombobox from '../qlch_combobox/ECombobox.vue';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import { EditMode } from '@library-src/utilities/enums/EditMode';
import Convert from '@library-src/utilities/commons/Convert';
import ElementLibrary from '@library-src/utilities/commons/ElementLibrary';

export default {
    extends: BaseControl,
    components: {
        ETextBox,
        ECheckbox,
        ENumber,
        ECombobox
    },
    props: {
        control: {
            type: Grid,
            require: true
        }
    },

    emits: ['loadData', 'changeSelectedRecord'],

    setup(props: LooseRequired<{ readonly control?: Grid | undefined; } & { readonly control?: Grid | undefined; }>) {
        const thisData: Ref<EGrid> = ref(buildThisDataBy(props));



        const cbkCheckAll: Ref<Checkbox> = ref(new Checkbox({}));
        const cbkCheckItem: Ref<Checkbox> = ref(new Checkbox({}));
        const numPage: Ref<NumberModel> = ref(new NumberModel({
            format: new NumberFormat({
                precision: 0
            }),
            styleInput: "text-align: center",
            minValue: 1,
            maxValue: thisData.value.footer?.totalPage ? thisData.value.footer?.totalPage : 1
        }));

        const cbLimit: Ref<Combobox> = ref(new Combobox({
            data: [
                {
                    value: 15,
                    display: "15"
                },
                {
                    value: 25,
                    display: "25"
                },
                {
                    value: 50,
                    display: "50"
                },
                {
                    value: 100,
                    display: "100"
                },
            ],
            selectOnly: true,
        }));

        return {
            thisData,
            cbkCheckAll,
            cbkCheckItem,
            numPage,
            cbLimit
        };


        /**
         * 
         * @param props Tham số truyền từ ngoài parent vào
         * tnphuc - 19.09.2023 
         */
        function buildThisDataBy(props: LooseRequired<{ readonly control?: Grid | undefined; } & { readonly control?: Grid | undefined; }>) {
            let result = new EGrid();
            let totalRecord = 0;
            if (checkExistsColumnIn(props)) {
                totalRecord = props?.control?.data?.length ?? 0;
                props?.control?.columns?.forEach(column => {
                    buildFilterData(column, result);
                    buildFilterControl(column, result)
                })
                result.footer = new EGridFooter({
                    totalRecord: totalRecord
                });
            }
            return result
        };
        /**
         * 
         * @param column 
         * @param result 
         * tnphuc - 19.09.2023 
         */
        function buildFilterData(column: Column, result: EGrid) {
            if (column.dataIndex) {
                const dataIndex = column.dataIndex;
                result.filterData[dataIndex] = (new FilterModel(dataIndex));
            }
        }

        /**
         * 
         * @param column 
         * @param result 
         * tnphuc - 19.09.2023 
         */
        function buildFilterControl(column: Column, result: EGrid) {
            const styleInput = "border-radius: 0;border-right:0px;border-left:0px;border-bottom:0px;border-top:0px";
            const fieldText = "";
            switch (column.type) {
                case ControlType.TextBox:
                    const ctlTextBox = new TextBox({
                        fieldText: fieldText,
                        styleInput: styleInput
                    });

                    const ctlButton = new DropDownMenu({
                        fieldText: "∗",
                    });
                    result.filterControl[column.dataIndex ?? ""] = new FilterControl({
                        input: ctlTextBox,
                        button: ctlButton
                    });

                    break;

                default:
                    break;
            }
        };

        /**
         * 
         * @param props 
         * tnphuc - 19.09.2023 
         */
        function checkExistsColumnIn(props: LooseRequired<{ readonly control?: Grid | undefined; } & { readonly control?: Grid | undefined; }>) {
            return (props && props.control && props.control.columns && props.control.columns.length > 0);
        };
    },

    watch: {
        'control.data'(newData: Array<Record<string, any>>) {
            try {
                const me = this;
                if (me.thisData.footer) {
                    me.thisData.footer.totalRecord = newData.length;
                    me.numPage.maxLength = me.thisData.footer.totalPage;
                }
                me.thisData.isCheckAll = false;
            } catch (error) {
                Log.ErrorLog(error as Error)
            }
        }
    },

    /**
     * Khởi tạo biến kiểm tra đã khai báo Key Id của table hay chưa?
     * tnphuc - 19.09.2023 
     */
    created() {

        const me = this;
        try {
            if (!me.control) {
                return;
            }
            if (!me.control.primaryKey) {
                Log.InfoLog("Dev phải bổ sung PrimaryKey cho Data");
            }


        } catch (error) {
            Log.ErrorLog(error as Error);
        }
    },
    methods: {

        /**
         * Sự kiện check all 
         * tnphuc - 19.09.2023 
         */
        onChangeSelectAllItem(value: boolean) {
            const me = this;
            try {
                if (!me.control) {
                    return;
                }

                if (!(me.control.data && me.control.data.length > 0)) {
                    return;
                }

                if (value) {
                    me.control.data.forEach(item => {
                        me.changeRecordToListSelected(item, EditMode.Add);
                    });
                } else {
                    me.control.data.forEach(item => {
                        me.changeRecordToListSelected(item, EditMode.Delete);
                    });
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện chọn trên checkbox grid
         * @param value 
         * @param record 
         * tnphuc - 19.09.2023 
         */
        onChangeSelectItem(value: boolean, record: Record<string, any>) {
            try {
                const me = this;
                if (value) {
                    me.changeRecordToListSelected(record, EditMode.Add);
                } else {
                    me.changeRecordToListSelected(record, EditMode.Delete);
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện ấn chuột xuống tại vị trí cột để thay đổi size cột
         * @param e 
         * @param column 
         * tnphuc - 19.09.2023 
         */
        onMouseDownInColumn(e: MouseEvent, column: Column) {
            const me = this;
            try {
                if (column) {
                    column.startX = e.pageX;
                    const columnInfo = ElementLibrary.getElementById(column.id);
                    if (columnInfo) {
                        column.startWidth = columnInfo.offsetWidth;
                        if (column && column.flex) {
                            column.width = columnInfo.offsetWidth;
                            column.flex = undefined;
                        }
                    }
                }
                me.thisData.columnResize = column;
            } catch (error) {
                me.clearColumnResize();
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện nhả con chuột lên trên Grid
         * tnphuc - 19.09.2023 
         */
        onMouseUpInGrid() {
            try {
                const me = this;
                me.clearColumnResize();
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện di chuyển con chuột trên grid
         * @param e 
         * tnphuc - 19.09.2023 
         */
        onMouseMoveInGrid(e: MouseEvent) {
            const me = this;
            try {
                const column = me.thisData.columnResize;
                if (column) {
                    const width = (column.startWidth + (e.pageX - column.startX));
                    if (width >= (column.minWidth)) {
                        column.width = width;
                    }
                }
            } catch (error) {
                me.clearColumnResize();
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện nhả con chuột ở bên ngoài Grid 
         * tnphuc - 19.09.2023 
         */
        onMouseUpOutGrid() {
            const me = this;
            try {
                me.clearColumnResize();
            } catch (error) {
                Log.ErrorLog(error as Error)
            }
        },

        /**
         * Sự kiện click bút filter show ra popup filter
         * tnphuc - 19.09.2023 
         */
        onCLickBtnFilter(column: Column, button: DropDownMenu) {
            const me = this;
            try {
                if (button.children && button.children.length > 0) {
                    button.children = undefined;
                    return;
                } else if (column) {
                    me.resetAllChildrenFilter();
                    switch (column.type) {
                        case ControlType.TextBox:
                            button.children = Array(
                                new DropDownMenuChild({
                                    fieldText: "∗ : Chứa",
                                    itemCode: "LIKE",
                                    shortName: "∗",
                                    value: Operator.Like
                                }),
                                new DropDownMenuChild({
                                    fieldText: "= : Bằng",
                                    itemCode: "EQUAL",
                                    shortName: "=",
                                    value: Operator.Equal
                                }),
                                new DropDownMenuChild({
                                    fieldText: "+ : Bắt đầu bằng",
                                    itemCode: "START",
                                    shortName: "+",
                                    value: Operator.StartWith
                                }),
                                new DropDownMenuChild({
                                    fieldText: "- : Kết thúc bằng",
                                    itemCode: "END",
                                    shortName: "-",
                                    value: Operator.EndWith
                                }),
                                new DropDownMenuChild({
                                    fieldText: "! : Không chứa",
                                    itemCode: "NotLIKE",
                                    shortName: "!",
                                    value: Operator.NotLike
                                })

                            )
                            break;

                        default:
                            break;
                    }

                    me.$nextTick(() => {
                        if (!column) {
                            return;
                        }
                        me.calculatorPositionFloatLeftItemID(column.id + `-button-filter`, column.id + `-popup-filter`);
                    });


                }

            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện click ra ngoài vùng filter
         * tnphuc - 19.09.2023 
         */
        onClickOutFilter(e: Event) {
            const me = this;
            try {
                let isResetChildFilter = true;
                const idElement = (e.target as HTMLElement).id;

                /**
                 * Kiểm tra nếu click từ button filter thì không cần phải xóa hết children vì sự kiện click button đã làm điều đó r, tránh gọi event 2 lần
                 */
                if (me.control && me.control.columns && me.control.columns.length > 0) {
                    for (let i = 0; i < me.control.columns.length; i++) {
                        const column = me.control.columns[i];
                        if (idElement == column.id + `-button-filter`) {
                            isResetChildFilter = false;
                            break;
                        }
                    }
                }
                if (isResetChildFilter) {
                    me.resetAllChildrenFilter();
                }
            } catch (error) {
                Log.ErrorLog(error as Error)
            }
        },

        /**
         * Thay đổi kiểu lọc dữ liệu
         * @param column 
         * @param itemChild 
         * tnphuc - 19.09.2023 
         */
        onChangeOperatorFilter(column: Column, itemChild: DropDownMenuChild) {
            const me = this;
            try {
                if (column && column.dataIndex && itemChild) {
                    me.thisData.filterData[column.dataIndex].operator = itemChild.value;
                    const button = me.thisData.filterControl[column.dataIndex].button;
                    if (button) {
                        button.fieldText = itemChild.shortName;
                        button.children = undefined;
                    }
                }
                me.reloadData();
            } catch (error) {
                Log.ErrorLog(error as Error)
            }

        },

        /**
         * Thực hiện filter text trên column
         * tnphuc - 19.09.2023 
         */
        onBlurFilter() {
            try {
                const me = this;
                me.reloadData();
            } catch (error) {
                Log.ErrorLog(error as Error)
            }
        },

        /**
         * Thực hiện filter text trên column
         * tnphuc - 19.09.2023 
         */
        onEnterFilter() {
            try {
                const me = this;
                me.reloadData();
            } catch (error) {
                Log.ErrorLog(error as Error)
            }
        },

        /**
         * Nạp lại dữ liệu
         * tnphuc - 19.09.2023 
         */
        onReloadClick() {
            try {
                const me = this;
                me.reloadData();
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện click vào nút về trang đầu
         * tnphuc - 19.09.2023 
         */
        onBtnFirstClick() {
            try {
                const me = this;
                if (me.thisData.footer && me.thisData.footer.pageActive > 1) {
                    me.thisData.footer.pageActive = 1;
                    me.reloadData();
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện click vào nút back 1 trang
         * tnphuc - 19.09.2023 
         */
        onBtnBackClick() {
            try {
                const me = this;
                if (me.thisData.footer && me.thisData.footer.pageActive > 1) {
                    me.thisData.footer.pageActive--;
                    me.reloadData();
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện click vào nút next 1 trang
         * tnphuc - 19.09.2023 
         */
        onBtnNextClick() {
            try {
                const me = this;
                const totalPage = me.thisData.footer?.totalPage ? me.thisData.footer?.totalPage : 1
                if (me.thisData.footer && me.thisData.footer.pageActive < totalPage) {
                    me.thisData.footer.pageActive++;
                    me.reloadData();
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện click vào trang cuối
         * tnphuc - 19.09.2023 
         */
        onBtnLastClick() {
            try {
                const me = this;
                const totalPage = me.thisData.footer?.totalPage ? me.thisData.footer?.totalPage : 1
                if (me.thisData.footer && me.thisData.footer.pageActive < totalPage) {
                    me.thisData.footer.pageActive = me.thisData.footer.totalPage;
                    me.reloadData();
                }
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Sự kiện thay đổi giới hạn / trang
         * tnphuc - 19.09.2023 
         */
        onChangeLimit() {
            try {
                const me = this;
                me.reloadData();
            } catch (error) {
                Log.ErrorLog(error as Error);
            }
        },

        /**
         * Reset tất cả children về undefined
         * tnphuc - 19.09.2023 
         */
        resetAllChildrenFilter() {
            const me = this;
            if (me.control && me.control.columns && me.control.columns.length > 0) {
                me.control.columns.forEach(column => {
                    if (me.thisData.filterControl) {
                        if (column.dataIndex && me.thisData.filterControl[column.dataIndex] && me.thisData.filterControl[column.dataIndex].button) {
                            const button = me.thisData.filterControl[column.dataIndex].button;
                            if (button) {
                                button.children = undefined;
                            }
                        }
                    }
                })
            }
        },

        /**
         * Áp dụng độ rộng cột sau khi setup
         * tnphuc - 19.09.2023 
         */
        clearColumnResize() {
            const me = this;
            me.thisData.columnResize = undefined;
        },

        /**
         * Emit sự kiện reload 
         * tnphuc - 19.09.2023 
         */
        reloadData() {
            const me = this;
            if (me.validateControlBeforeHandlerEvent(me.control)) {
                let arrayFilter: Array<FilterModel> = [];
                if (me.thisData.filterData) {
                    // arrayFilter = Object.values(me.thisData.filterData);
                    arrayFilter = Convert.recordToArrayValue(me.thisData.filterData);
                }
                const paramPaging: ParamPaging = new ParamPaging({
                    filter: arrayFilter,
                    limit: me.thisData.footer?.limit,
                    page: me.thisData.footer?.pageActive,
                    start: me.thisData.footer?.start
                });
                me.$emit("loadData", paramPaging);
            }
        },

        /**
         * Thêm 1 item mới vào list selected
         * @param record 
         * tnphuc - 19.09.2023 
         */
        changeRecordToListSelected(record: Record<string, any>, editMode: EditMode) {
            const me = this;
            if (record && me.control) {
                if (editMode == EditMode.Add) {
                    me.addRecordToListSelected(record);
                }

                if (editMode == EditMode.Delete) {
                    me.removeRecordToListSelected(record);
                }

                if (me.validateControlBeforeHandlerEvent(me.control)) {
                    me.$emit("changeSelectedRecord", me.control.listSelectedRecord);
                }
            }
        },

        /**
         * Xóa 1 item trên list selected
         * @param record 
         * tnphuc - 19.09.2023 
         */
        addRecordToListSelected(record: Record<string, any>) {
            const me = this;
            if (me.control) {
                const recordExists = me.control.listSelectedRecord.find(item => item == record);
                if (!recordExists) {
                    record[`checked`] = true;
                    me.control.listSelectedRecord.push(record);
                }
            }
        },

        /**
         * Xóa 1 item trên list selected
         * @param record 
         * tnphuc - 19.09.2023 
         */
        removeRecordToListSelected(record: Record<string, any>) {
            const me = this;
            if (me.control) {
                me.control.listSelectedRecord = me.control.listSelectedRecord.filter(item => {
                    return item != record
                });
                record[`checked`] = false;
            }
        }
    }
}
</script>
