// create-file.js
// command: yarn create-template <ProjectName> <mode: views/components> <FileName> <typeBase:dictionary-detail/dictionary-list>
//Ex: yarn create-template MISA.QLCH.WebSupport views invoice-list-dictionary dictionary-list
//Ex: yarn create-template MISA.QLCH.WebSupport views invoice-detail dictionary-detail

const fs = require('fs');
const path = require('path');
const file = require('../library/file');
const folder = require('../library/folder');
const fileNameConvention = require('../library/convention-file');

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Usage: node create-template.js <file-name>');
  process.exit(1);
}
const project = args[0];
const folderMode = args[1];
const moduleName = args[2];
const baseMode = args[3];
const fileName = fileNameConvention.convertFile(moduleName);
const folderPath = path.join(__dirname, '..', '..', project, 'src', folderMode, moduleName);

try {
  const resultCreateFolder = folder.create(folderPath);

  if (resultCreateFolder) {

    const fileNameHTML = `${fileName}.html`;
    let contentHTML = `<h1>This is template ${fileName}</h1>`;
    switch (baseMode) {
      case 'dictionary-list':
        contentHTML = `<div class="height-fill width-fill">
  <base-dictionary-list-view :viewControl="viewControl" @loadMaster="onLoadMaster"
    @changeSelectedRecordMaster="onChangeSelectedRecordMaster"
    @toolbarClick="onSelectAction"></base-dictionary-list-view>
</div>
        `;
        break;
      case 'dictionary-detail':
        contentHTML = `<base-dictionary-detail-view :idRoot="idRoot" :propView="propView" :styleFrom="\`width: 500px;\`" @toolbarClick="onSelectAction" @closeFormClick="onCloseForm">
  <template v-slot:content-detail>
    <div class="qlch-input-default item-detail">
      <i>(*) Dev: Khai báo control form tại đây:</i>
    </div>
    <div class="qlch-input-default item-detail">
      <e-text-box :control="bindingControl[\`txtColumn1\`]"
        v-model="masterData[bindingControl[\`txtColumn1\`].bindingIndex]"></e-text-box>
    </div>
    <div class="qlch-input-default item-detail">
      <e-text-box :control="bindingControl[\`txtColumn2\`]"
        v-model="masterData[bindingControl[\`txtColumn2\`].bindingIndex]"></e-text-box>
    </div>
    <div class="qlch-input-default item-detail">
      <e-text-box :control="bindingControl[\`txtColumn3\`]"
        v-model="masterData[bindingControl[\`txtColumn3\`].bindingIndex]"></e-text-box>
    </div>
    <div class="qlch-input-default item-detail">
      <e-text-box :control="bindingControl[\`txtColumn4\`]"
        v-model="masterData[bindingControl[\`txtColumn4\`].bindingIndex]"></e-text-box>
    </div>
    <div class="qlch-input-default item-detail">
      <e-text-box :control="bindingControl[\`txtColumn5\`]"
        v-model="masterData[bindingControl[\`txtColumn5\`].bindingIndex]"></e-text-box>
    </div>
    <div class="qlch-input-default item-detail">
      <e-text-box :control="bindingControl[\`txtColumn6\`]"
        v-model="masterData[bindingControl[\`txtColumn6\`].bindingIndex]"></e-text-box>
    </div>
  </template>
</base-dictionary-detail-view>
        `;
        break;

      default:
        break;
    }
    file.create(folderPath, fileNameHTML, contentHTML);

    const fileNameSCSS = `${fileName}.scss`;
    let contentSCSS = '';
    switch (baseMode) {
      case 'dictionary-detail':
        contentSCSS += `.item-detail {
  margin-bottom: 8px;
}

.item-detail:first-child {
  margin-top: 24px;
}

.item-detail:last-child{
  margin-bottom: 24px;
}`;
        break;

      default:
        break;
    }
    file.create(folderPath, fileNameSCSS, contentSCSS);



    const fileNameVUE = `${fileName}.vue`;
    let contentVUE = `<template src="./${fileName}.html"></template>
<style lang="scss" scoped src="./${fileName}.scss"></style>
<script lang="ts">
import ${fileName} from './${fileName}';
import { Ref, ref } from 'vue';`;
    switch (baseMode) {
      case 'dictionary-list':
        contentVUE += `
import BaseDictionaryListView from 'qlch_base/BaseDictionaryListView';
import BaseDictionaryListController from 'qlch_base/BaseDictionaryListController';
import ParamPaging from '@library-src/models/qlch_control/qlch_grid/qlch_param_paging/ParamPaging';
import Column from '@library-src/models/qlch_control/qlch_grid/qlch_column/Column';
        `;
        break;
      case 'dictionary-detail':
        contentVUE += `
import BaseDictionaryDetailController from "qlch_base/BaseDictionaryDetailController";
import BaseDictionaryDetailView from "qlch_base/BaseDictionaryDetailView";
import TextBox from "@library-src/models/qlch_control/qlch_text_box/TextBox";
import ETextBox from "qlch_control/ETextBox";
        `;
        break;

      default:
        break;
    }
    contentVUE += `
export default{
`;
    switch (baseMode) {
      case 'dictionary-list':
        contentVUE += `
  extends: BaseDictionaryListController,

  components: {
    BaseDictionaryListView,
  },
  setup() {
    const thisData: Ref<${fileName}> = ref(new ${fileName}());
    return { thisData };
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
          fieldText: "Demo Column 1",
          dataIndex: "Column1",
          width: 120,
        }),
        new Column({
          fieldText: "Demo Column 2",
          dataIndex: "Column2",
          width: 260
        }),
        new Column({
          fieldText: "Demo Column 3",
          dataIndex: "Column3",
          width: 260
        }),
        new Column({
          fieldText: "Demo Column 4",
          dataIndex: "Column4",
          width: 260
        }),
        new Column({
          fieldText: "Demo Column 5",
          dataIndex: "Column5",
          minWidth: 260,
          flex: 1
        }),
        new Column({
          fieldText: "Demo Column 6",
          dataIndex: "Column6",
          width: 160
        })
      )
    },

    /**
     * Load dữ liệu master lên grid
     * @param param 
     */
    loadMasterData(param: ParamPaging) {
      console.log("Dev: Override function loadMasterData with param: " + JSON.stringify(param));
      return [
        {
          Column1: "Value 11",
          Column2: "Value 21",
          Column3: "Value 31",
          Column4: "Value 41",
          Column5: "Value 51",
          Column6: "Value 61"
        },
        {
          Column1: "Value 12",
          Column2: "Value 22",
          Column3: "Value 32",
          Column4: "Value 42",
          Column5: "Value 52",
          Column6: "Value 62"
        },
        {
          Column1: "Value 13",
          Column2: "Value 23",
          Column3: "Value 33",
          Column4: "Value 43",
          Column5: "Value 53",
          Column6: "Value 63"
        },
        {
          Column1: "Value 14",
          Column2: "Value 24",
          Column3: "Value 34",
          Column4: "Value 44",
          Column5: "Value 54",
          Column6: "Value 64"
        },
        {
          Column1: "Value 15",
          Column2: "Value 25",
          Column3: "Value 35",
          Column4: "Value 45",
          Column5: "Value 55",
          Column6: "Value 65"
        }
      ];
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
    async createComponent() {
      console.log("DEV: Override Function createComponent Vue component Detail");
      const frmDetail = (await import(\`Đường dẫn file Detail.vue\`)).default;
      return frmDetail;
    },
  }
    `;
        break;
      case 'dictionary-detail':
        contentVUE += `
  extends: BaseDictionaryDetailController,

  components: {
    BaseDictionaryDetailView,
    ETextBox
  },

  setup() {
    const thisData: Ref<${fileName}> = ref(new ${fileName}());
    return { thisData };
  },

  methods: {
    /**
    * Khai báo tiêu đề cho form
    */
    getTitleForm() {
      console.log("DEV: Override function getTitleForm return Title Form");
      return "Title Form Detail";
    },

    /**
    * Khởi tạo control binding trên form
    */
    buildBindingControl() {
      console.log("DEV: Override function buildBindingControl return Record Control binding in Form");
      const labelWidth = 115;
      return {
        "txtColumn1": new TextBox({
          fieldText: "Demo Column 1",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column1"
        }),
        "txtColumn2": new TextBox({
          fieldText: "Demo Column 2",
          require: true,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column2"
        }),
        "txtColumn3": new TextBox({
          fieldText: "Demo Column 3",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column3"
        }),
        "txtColumn4": new TextBox({
          fieldText: "Demo Column 4",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column4"
        }),
        "txtColumn5": new TextBox({
          fieldText: "Demo Column 5",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column5"
        }),
        "txtColumn6": new TextBox({
          fieldText: "Demo Column 6",
          require: false,
          maxLength: 255,
          labelWidth: labelWidth,
          bindingIndex: "Column6"
        }),
      }
    },

    /**
    * Sau khi đóng form xong thì xử lý thêm gì ở master thì Override function này ở master
    */
    afterCloseForm() { },
  }
    `;
        break;

      default:
        contentVUE += `
  setup() {
    const thisData: Ref<${fileName}> = ref(new ${fileName}());
    return { thisData };
  },
        `
        break;
    }
    contentVUE += `
}
</script>
`;
    file.create(folderPath, fileNameVUE, contentVUE);



    const fileNameTypescript = `${fileName}.ts`;
    let contentTypeScript = `
    export default class ${fileName} {
        /**
         * Create Constructor
         */
        constructor() {
            
        }
    }`;
    file.create(folderPath, fileNameTypescript, contentTypeScript);
  }

} catch (error) {
  console.error(`Error creating module: ${error.message} in ${error.stack}`);
}
