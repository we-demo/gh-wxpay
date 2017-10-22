let js2xmlparser = require('js2xmlparser')
let xml2json = require('xml2json')

exports.toJs = toJs
exports.toXml = toXml

/**
 * xml to js object
 * @param {String} xml *Xml-String
 * @param {Object} options
 *   var options = {
        object: false,
        reversible: false,
        coerce: false,
        sanitize: true,
        trim: true,
        arrayNotation: false
        alternateTextNode: false
    };
 * @see https://github.com/buglabs/node-xml2json
 */
function toJs (xml, options) {
  let json = xml2json.toJson(xml)
  let obj = JSON.parse(json)
  return obj
}

/**
 * xml to js object
 * @param {String} root *Root-Tag, eg. `xml`
 * @param {String} xml *Xml-String
 * @param {Object} options
 *   aliasString
     attributeString
     cdataInvalidChars
     cdataKeys
     declaration
     dtd
     format
     typeHandlers
     valueString
     wrapHandlers
 * @see https://github.com/michaelkourlas/node-js2xmlparser
 * @see http://www.kourlas.com/node-js2xmlparser/docs/3.0.0/interfaces/ioptions.html
 */
function toXml (root, xml, options) {
  return js2xmlparser.parse(root, xml, options)
}
