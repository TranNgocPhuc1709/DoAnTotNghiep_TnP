/**
 * Khởi tạo thư mục
 * @param {*} folderPath 
 * @returns 
 */
function create(folderPath) {
  try {
    const fs = require('fs');
    fs.mkdirSync(folderPath);
    console.log(`Folder '${folderPath}' created successfully.`);
    return true;
  } catch (error) {
    console.error(`Error creating folder: ${error.message}`);
    return false
  }
}

/**
 * Giải nén thư mục
 * @param {*} archivePath : Đường dẫn file 7z
 * @param {*} targetPath : Đường dẫn đích  cần giải nén
 */
function decompressor(archivePath, targetPath) {
  const { exec } = require('child_process');

  const command = `7z x "${archivePath}" -o"${targetPath}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error('Error during decompression:', error);
    } else {
      console.log('Decompression successful.');
    }
  });


}

module.exports = {
  create,
  decompressor
};