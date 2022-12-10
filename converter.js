const JsonConverter = require('./jsonConverter')
const XmlConverter = require('./xmlConverter')

class ConverterFactory {
    create(type) {
        switch(type) {
            case 'XML':
                return new XmlConverter();
            case 'JSON':
                return new JsonConverter();
            default:
                return new Error('format not supported');
        }
    }
}

module.exports = ConverterFactory;