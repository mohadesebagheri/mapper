const XMLParser = require('xml2json');
class XmlConverter {

    constructor(jsonConverter) {
        this.jsonConverter = jsonConverter;
    }

    convert2json(apiResult) {
        const jsonResult = XMLParser.toJson(apiResult);
        return this.parseNested(jsonResult)
    }

    parseNested(str) {
        try {
            return JSON.parse(str, (_, val) => {
                if (typeof val === 'string')
                    return this.parseNested(val)
                return val
            })
        } catch (exc) {
            return str
        }
    }

    map(apiResult) {
        const jsonResult = this.convert2json(apiResult);
        const mappedResult = this.jsonConverter.map(Object.values(jsonResult))
        return mappedResult
    }

}

module.exports = XmlConverter;