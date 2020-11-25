# node-word-testing

Creating a MS Word docx file using Node.js from a folder of HTML.

## Requirement

Wrap the actual content of your site in a `div` with class `Document`.
This is too avoid the Word doc containing all the header and footer garbage.
This will get that div from each page and write it all to a Word docx.

```html
<div class='Document'>
  <h1>Header</h1>
  <p>
    Content text is here.
  </p>
<div>
```