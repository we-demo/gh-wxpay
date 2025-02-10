let js2xmlparser = require('js2xmlparser')

// 老项目xml2json在新环境中无法跑起来 更换依赖
// let xml2json = require('xml2json')
let { XMLBuilder, XMLParser } = require('fast-xml-parser')

// https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v5/3.Options.md
let xmlParser = new XMLParser()

exports.toJs = toJs
exports.toXml = toXml

function toJs (xml) {
  let obj = xmlParser.parse(xml)
  return obj.xml
}

function toXml (root, obj, options) {
  return js2xmlparser.parse(root, obj, options)
}
