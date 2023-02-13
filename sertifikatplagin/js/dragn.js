const select = document.getElementById("signature-select");
const outputContainer = document.getElementById("output");

select.addEventListener("change", function () {
  const selectedOption = select.options[select.selectedIndex].value;
  outputContainer.textContent = `Selected signature: ${selectedOption}`;
});

const input = document.getElementById("file-input");
input.addEventListener("change", function () {
  const file = input.files[0];
  // Измените файл или обработайте его данные
  const modifiedFile = modifyFile(file);
  const url = URL.createObjectURL(modifiedFile);
  const link = document.createElement("a");
  link.href = url;
  link.download = "modified_file.txt";
  link.click();
});

function modifyFile(file) {
  input.addEventListener("change", function () {
    const file = input.files[0];
    const modifiedFile = modifyFile(file);

    const url = URL.createObjectURL(modifiedFile);
    downloadLink.href = url;
    downloadLink.download = modifiedFile.name;
    downloadLink.style.display = "inline-block";
  });
  return file;
}

function downloadFile(file) {
  const a = document.createElement("a");
  const blob = new Blob([file], { type: "octet/stream" });
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = "modified-file.xml";
  a.click();
  window.URL.revokeObjectURL(url);
}


input.addEventListener("change", function () {
  const file = input.files[0];
  const modifiedFile = modifyFile(file);
  downloadFile(modifiedFile);
});
// Parse an XML string into a Document object
function parseXML(xmlString) {
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, "text/xml");
}

// Convert a Document object back into an XML string
function serializeXML(xmlDoc) {
  const serializer = new XMLSerializer();
  return serializer.serializeToString(xmlDoc);
}

function parseXML(xmlString) {
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(xmlString, "text/xml");
  return xmlDoc;
}

const xmlString = '<?xml version="1.0" encoding="UTF-8"?><root><element attribute="value">Text Content</element></root>';
const xmlDoc = parseXML(xmlString);
console.log(xmlDoc);

const rootElement = xmlDoc.documentElement;

// Modify the XML document
const newElement = xmlDoc.createElement("newElement");
newElement.textContent = "This is a new element";
rootElement.appendChild(newElement);

// Serialize the modified XML document back into a string
const modifiedXmlString = serializeXML(xmlDoc);

// Add a button for downloading the modified XML file
const downloadButton = document.createElement("button");
downloadButton.textContent = "Download Modified XML";
downloadButton.addEventListener("click", function () {
  const blob = new Blob([modifiedXmlString], { type: "text/xml" });
  const link = document.createElement("a");
  link.download = "modified.xml";
  link.href = URL.createObjectURL(blob);
  link.click();
});

document.body.appendChild(downloadButton);

const addSignatureButton = document.createElement("button");
addSignatureButton.textContent = "Add Signature to XML";
addSignatureButton.id = "addSignatureButton";
document.body.appendChild(addSignatureButton);

addSignatureButton.addEventListener("click", function () {
  const selectedOption = select.options[select.selectedIndex].value;
  let xmlString = xmlString + `<signature type="electronic">${selectedOption}</signature>`;
  xmlOutput.textContent = xmlString;
  downloadButton.style.display = "inline-block";
});


downloadButton.addEventListener("click", function () {
  const file = new Blob([xmlString], { type: "text/xml" });
  const fileUrl = URL.createObjectURL(file);
  downloadButton.setAttribute("href", fileUrl);
  downloadButton.setAttribute("download", "xml-file.xml");
});