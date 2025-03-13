let js2xmlparser = require('js2xmlparser')

// 老项目xml2json在新环境中无法跑起来 更换依赖
// let xml2json = require('xml2json')
let { XMLBuilder, XMLParser } = require('fast-xml-parser')

// https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md
let xmlParser = new XMLParser({
  // 修复fxp默认解析数字 导致transaction_id错误变为科学计数法表示
  // 无法通过签名校验 包括mch_id/time_end字段
  parseTagValue: false,
})

exports.toJs = toJs
exports.toXml = toXml

function toJs (xml) {
  let obj = xmlParser.parse(xml)
  return obj.xml
}

function toXml (root, obj, options) {
  return js2xmlparser.parse(root, obj, options)
}
