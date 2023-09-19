function convertFile(originalText) {
    if (originalText) {
        try {
            let modifiedText = originalText.replace(/[-_]([a-z])/g, (_, letter) => letter.toUpperCase());
            modifiedText = modifiedText.charAt(0).toUpperCase() + modifiedText.slice(1);
            modifiedText = modifiedText.replace("Qlch", "E");
            return modifiedText;
        } catch (error) {
            console.error("Convert FileName fail: " + error);
            return originalText;
        }
    };
    return originalText;
}




module.exports = {
    convertFile
};

