<template src="./DemoGrid.html"></template>
<style lang="scss" scoped src="./DemoGrid.scss"></style>
<script lang="ts">
import EGrid from '@src/components/qlch_grid/EGrid.vue';
import Grid from '@library-src/models/qlch_control/qlch_grid/Grid';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
import Common from "@library-src/utilities/commons/Function";
import { Ref, ref } from 'vue';
import Log from '@library-src/utilities/Log';

export default {
    components: {
        EGrid
    },

    /**
     * Thiết lập giá trị ban đầu
     */
    setup() {
        const columnDefault: Array<Column> = Array(
            new Column({
                fieldText: "Mã nhân viên",
                width: 250,
                dataIndex: "EmployeeCode",
                isFilter: true
            }),
            new Column({
                fieldText: "Sinh nhật",
                dataIndex: "BirthDay",
                isFilter: true,
                width: 250
            }),

            new Column({
                fieldText: "Địa chỉ",
                minWidth: 350,
                flex: 1,
                dataIndex: "Address",
                isFilter: true
            }),

            new Column({
                fieldText: "Lương",
                width: 350,
                dataIndex: "Amount",
                isFilter: true
            }),

        );

        const dataGrid: Array<Record<string, any>> = new Array(
            {
                "EmployeeCode": "Tran Duc 1",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 2",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 3",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 4",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 5",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 6",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 7",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 8",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 9",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 10",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 1",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 2",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 3",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 4",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 5",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 6",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 7",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 8",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 9",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 10",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 1",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 2",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 3",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 4",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 5",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 6",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 7",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 8",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 9",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 10",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 1",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 2",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 3",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 4",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 5",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 6",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 7",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 8",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 9",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },
            {
                "EmployeeCode": "Tran Duc 10",
                "BirthDay": "29/12/1994",
                "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                "Amount": "2000000"
            },


        )
        const tblDefault: Ref<Grid> = ref(new Grid({
            columns: columnDefault,
            data: dataGrid,
            primaryKey: "EmployeeCode"

        }));
        return {
            tblDefault
        }
    },

    methods: {
        async onLoadData(parameter: any) {
            const me = this;
            me.tblDefault.isLoadingData = true;
            me.tblDefault.data = new Array(
                {
                    "EmployeeCode": "Tran Duc 123",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 2",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 3",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 4",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 5",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 6",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 7",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 8",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 9",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 10",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 1",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 2",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 3",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 4",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 5",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 6",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 7",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 8",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 9",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 10",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 1",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 2",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 3",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 4",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 5",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 6",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 7",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 8",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 9",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 10",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 1",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 2",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 3",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 4",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 5",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 6",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 7",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 8",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 9",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },
                {
                    "EmployeeCode": "Tran Duc 10",
                    "BirthDay": "29/12/1994",
                    "Address": "SmartCity, Tây Mỗ, Nam Từ Liêm, Hà Nội",
                    "Amount": "2000000"
                },


            );
            await Common.getTimeOut(3000, "");
            me.tblDefault.isLoadingData = false;
            Log.InfoLog(parameter);

        }
    }
}
</script>