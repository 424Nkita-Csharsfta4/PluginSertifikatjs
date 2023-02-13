function generateXmlSignature(documentData) {
    // Create a new XML document
    let xmlDoc = document.implementation.createDocument(null, "Signature", null);

    // Add elements to the document
    let documentElement = xmlDoc.createElement("Document");
    documentElement.appendChild(xmlDoc.createTextNode(documentData));

    let dateElement = xmlDoc.createElement("Date");
    dateElement.appendChild(xmlDoc.createTextNode(new Date().toString()));

    xmlDoc.documentElement.appendChild(documentElement);
    xmlDoc.documentElement.appendChild(dateElement);

    // Convert the XML document to a string
    let xmlString = new XMLSerializer().serializeToString(xmlDoc);

    return xmlString;
}
