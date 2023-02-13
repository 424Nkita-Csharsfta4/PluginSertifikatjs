let fileInput = document.querySelector("#file-input");
let output = document.querySelector("#output");

fileInput.addEventListener("change", function () {
  let file = fileInput.files[0];
  let reader = new FileReader();

  reader.addEventListener("load", function () {
    let documentData = reader.result;
    let xmlSignature = generateXmlSignature(documentData);
    output.innerHTML = xmlSignature;
  });

  reader.readAsText(file);
});

function generateXmlSignature(documentData) {
  // Parse the document data into a XML document
  let parser = new DOMParser();
  let xmlDoc = parser.parseFromString(documentData, "text/xml");

  // Get the root element of the XML document
  let root = xmlDoc.documentElement;

  // Add the signature element to the root of the XML document
  let signature = xmlDoc.createElement("Signature");
  root.appendChild(signature);

  // Add the signed info element to the signature element
  let signedInfo = xmlDoc.createElement("SignedInfo");
  signature.appendChild(signedInfo);

  // Add the canonicalization method element to the signed info element
  let canonicalizationMethod = xmlDoc.createElement("CanonicalizationMethod");
  canonicalizationMethod.setAttribute("Algorithm", "http://www.w3.org/TR/2001/REC-xml-c14n-20010315");
  signedInfo.appendChild(canonicalizationMethod);

  // Add the signature method element to the signed info element
  let signatureMethod = xmlDoc.createElement("SignatureMethod");
  signatureMethod.setAttribute("Algorithm", "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256");
  signedInfo.appendChild(signatureMethod);

  // Add the reference element to the signed info element
  let reference = xmlDoc.createElement("Reference");
  reference.setAttribute("URI", "");
  signedInfo.appendChild(reference);

  // Add the transforms element to the reference element
  let transforms = xmlDoc.createElement("Transforms");
  reference.appendChild(transforms);

  // Add the transform element to the transforms element
  let transform = xmlDoc.createElement("Transform");
  transform.setAttribute("Algorithm", "http://www.w3.org/2000/09/xmldsig#enveloped-signature");
  transforms.appendChild(transform);

  // Add the digest method element to the reference element
  let digestMethod = xmlDoc.createElement("DigestMethod");
  digestMethod.setAttribute("Algorithm", "http://www.w3.org/2001/04/xmlenc#sha256");
  reference.appendChild(digestMethod);

  // Add the digest value element to the reference element
  let digestValue = xmlDoc.createElement("DigestValue");
  reference.appendChild(digestValue);

  // Calculate the digest value
  let hash = new sha256();
  let canonicalizedXml = hash.getHash(xmlDoc.documentElement.outerHTML, "TEXT");
  digestValue.textContent = canonicalizedXml;

  // Add the signature value element to the signature element
  let signatureValue = xmlDoc.createElement("SignatureValue");
  signature.appendChild(signatureValue);

  signer.getSignature();

  // Append the signature value to the XML document
  xmlDoc.documentElement.appendChild(signatureValue);

  // Return the signed XML document as a string
  return xmlDoc.toString();
}
// Listen for when the file input changes
document.getElementById("file-input").addEventListener("change", function () {
  // Get the file from the input
  let file = this.files[0];

  // Read the contents of the file as text
  let reader = new FileReader();
  reader.readAsText(file);

  // When the file has finished loading, update the output area with its contents
  reader.onload = function () {
    document.getElementById("output").innerHTML = reader.result;
  };
});
