const JsonConverter = require('./jsonConverter')
const XmlConverter = require('./xmlConverter')

/**
 * this class combine both decorator and factory method.
 *
 */
class ConverterFactory {
    /**
     * @property {Function} create creates the desired converter based on provided format
     * @param {string} type
     * @param {Object} template it is map that mapper our db fields to response keys
     * @returns {Object | Error}
     */
    create(type,template) {
        switch(type) {
            case 'XML':
                const jsonConverter =  new JsonConverter(template)
                return new XmlConverter(jsonConverter);
            case 'JSON':
                return new JsonConverter(template);
            default:
                return new Error('format not supported');
        }
    }
}

module.exports = ConverterFactory;