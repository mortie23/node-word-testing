const fs = require("fs");
const path = require('path');

/**
 * Function to find all the resource files in their sub directories
 * @param {string} dirPath highest level directory to recurse through
 * @param {string} parentDir string of first level parent directory
 * @param {array} arrayOfFiles the array of files that will be returned
 *  each array element is an object of form {fullpath: , parentdir: , filename: }
 */
const getFiles = (dirPath, parentDir, arrayOfFiles) => {
  files = fs.readdirSync(dirPath)
  var arrayOfFiles = arrayOfFiles || []
  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getFiles(dirPath + "/" + file, file, arrayOfFiles)
    } else {
      arrayOfFiles.push({ "fullpath": path.join(__dirname, dirPath, "/", file), "parentdir": parentDir, "filename": file })
    }
  })
  return arrayOfFiles
}

module.exports.getFiles = getFiles;