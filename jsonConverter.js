const Converter = require('./converter')
/**
 * JSON converter. It is derived from base converter.
 *
 */
class JsonConverter extends Converter{
    /**
     *
     * @param {Object} template it is map that mapper our db fields to response keys
     */
    constructor(template) {
        super(template);
    }

    /**
     * @property {Function} map it maps api result fields to desired output by iterating over api result and calling its parent conversion function
     * @param {*} apiResult
     * @returns {Array}
     */
    map(apiResult){
        let input = apiResult
        if(!Array.isArray(apiResult)) {
            input = [apiResult]
        }
        return input.map(item => super.convert(item))
    }



}

module.exports = JsonConverter