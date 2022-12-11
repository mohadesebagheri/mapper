const XMLParser = require('xml2json');
class XmlConverter {

    constructor(jsonConverter) {
        this.jsonConverter = jsonConverter;
    }

    convert2json(apiResult) {
        const jsonResult = XMLParser.toJson(apiResult);
        return JSON.parse(jsonResult)
    }

    map(apiResult) {
        const jsonResult = this.convert2json(apiResult);
        const mappedResult = this.jsonConverter.map(Object.values(jsonResult))
        return mappedResult
    }

}

module.exports = XmlConverter;