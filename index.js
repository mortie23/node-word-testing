const fs = require("fs");
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const htmlDocx = require("html-docx-js");
const scandirectory = require("./scandirectory");

/**
 * Function to get the page text (everything except for the front matter)
 * @param {string} filename name of the markdown file (with the .md extension)
 * @param {string} callback 
 */
const getDocument = (file) => {
  // Read one of the doc HTML files
  let fileContents = fs.readFileSync(file.fullpath, 'utf8');
  return new JSDOM(fileContents);
}

/**
 * Exported function for use when requiring this module
 * @param {string} filename name of html file (without extension)
 * @return {docx buffer} to be written to file
 */
const createDocxFromDom = (dom) => {
  const docx = htmlDocx.asBlob(dom.serialize());
  return docx
}

/**
 * Function to scan the directory with HTML and create the 
 * @param {string} filetype <single|multi>
 */
const main = (filetype) => {
  // get all the files in the html directory
  const htmlfiles = scandirectory.getFiles('html', null, null);
  // create dom for building all pages
  const dom = new JSDOM('<div id="all"></div>');
  htmlfiles.forEach((file) => {
    if (path.extname(file.filename) == '.html') {
      const pageDom = getDocument(file);
      // For single files for page
      if (filetype == 'single') {
        const pageDocumentDom = new JSDOM(pageDom.window.document.querySelector('.Document').innerHTML);
        fs.writeFileSync(path.basename(file.filename) + '.docx', createDocxFromDom(pageDocumentDom));
      }
      dom.window.document.getElementById('all').append(pageDom.window.document.querySelector('.Document'));
    }
  })
  // write out the concatenated file
  fs.writeFileSync('pages.docx', createDocxFromDom(dom));
}
main('multi');