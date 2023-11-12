import Guid from "@library-src/utilities/types/Guid";
import IDictionaryStock from "./IDictionaryStock";
export default class DictionaryStock {

    constructor(dictionaryStock?: IDictionaryStock) {
        const me = this;
        if (dictionaryStock) {
            me.CodeStore = dictionaryStock.CodeStore;
            me.NameStore = dictionaryStock.NameStore;
            me.ExplainStore = dictionaryStock.ExplainStore;
            me.StatusStore = dictionaryStock.StatusStore;
        }
        me.DictionaryStockId = Guid.NewGuid();
    }
    CodeStore?: string;
    NameStore?: string;
    ExplainStore?: string;
    StatusStore?: string;
    DictionaryStockId?: string;

}