import ICategoryItem from "./ICategoryItem";
import Guid from '@library-src/utilities/types/Guid';
export default class CategoryItem {
    /**
     *
     */
    constructor(categoryItem?: ICategoryItem) {
        const me = this;
        if (categoryItem) {
            me.CodeGroupCategory = categoryItem.CodeGroupCategory;
            me.NameGroupCategory = categoryItem.NameGroupCategory;
            me.DescribeCategory = categoryItem.DescribeCategory;
            me.StatusCategory = categoryItem.StatusCategory;
        }
        me.CategoryItemId = Guid.NewGuid();
    }
    /**
     * các giá trị của bảng
     */
    CodeGroupCategory?: string;
    NameGroupCategory?: string;
    DescribeCategory?: string;
    StatusCategory?: string;
    CategoryItemId?: string;

}