export default class DocumentLibrary {

    /**
     * Set lại title trên document window
     * @param title Title cần set
     */
    public static setTitleDocument(title: string) {
        if (!title) {
            document.title = 'MISA eShop';
            return ;
        }
        document.title = title;
        return;
    }
}