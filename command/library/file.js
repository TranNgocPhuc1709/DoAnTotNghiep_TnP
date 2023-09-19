function create(folderPath, fileName, content) {
  const fs = require('fs');
  const path = require('path');
  const filePath = path.join(folderPath, fileName);
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(`Error creating file "${fileName}":`, err);
    } else {
      console.log(`File "${fileName}" in "${folderPath}" created successfully.`);
    }
  });
}

module.exports = {
  create
};