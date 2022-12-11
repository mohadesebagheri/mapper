const XMLParser = require('xml2json');
/**
 * XML converter.
 * this class uses decorator pattern .
 * it converts XML to JSON and passes the converted result to JSONConverter
 */
class XmlConverter {

    /**
     *
     * @param {Object} jsonConverter
     */
    constructor(jsonConverter) {
        this.jsonConverter = jsonConverter;
    }

    /**
     * @property {Function} convert2json this function converts the XML to json
     * @param {*} apiResult
     * @returns {Object}
     */
    convert2json(apiResult) {
        const jsonResult = XMLParser.toJson(apiResult);
        return this.parseNested(jsonResult)
    }

    /**
     * @property {Function} parseNested it is a recursive function the parses nested objects
     * @param {string} str
     * @returns {Object}
     */
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

    /**
     * @property {Function} map it maps api result fields to desired output
     * @param {*} apiResult
     * @returns {*}
     */
    map(apiResult) {
        const jsonResult = this.convert2json(apiResult);
        const mappedResult = this.jsonConverter.map(Object.values(jsonResult))
        return mappedResult
    }

}

module.exports = XmlConverter;