<script lang="ts">
import { EditMode } from '@library-src/utilities/enums/EditMode';
import PopupLibrary from '@library-src/utilities/commons/PopupLibrary';
export default {
    props: {
        /**
         * id root của component trên Dom
         */
        idRoot: {
            type: String,
            require: true
        }
    },

    methods: {

        /**
         * Xử lý event show window khi nhấn vào các button thêm, sửa, nhân bản...
         * @param record 
         * @param editMode 
         * tnduc - 19.09.2023 
         */
        async showFromDetail(record: Record<string, any>, editMode: EditMode) {
            const me = this;
            const component = await me.createComponent();
            if (component) {
                PopupLibrary.createPopup(component, me.createPropsDetail(record, editMode));
            };
        },

        /**
         * Create component popup
         * tnduc - 19.09.2023 
         */
        createComponent() {
            return null;
        },

        /**
         * Tạo prop cho popup detail
         * @param editMode 
         * tnduc - 19.09.2023 
         */
        createPropsDetail(record: Record<string, any>, editMode: EditMode) {
            record['editMode'] = editMode;
            return {
                masterData: record
            }
        },

    }
}
</script>