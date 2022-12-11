const JsonConverter = require('./jsonConverter')
const XmlConverter = require('./xmlConverter')

class ConverterFactory {
    create(type,template) {
        switch(type) {
            case 'XML':
                return new XmlConverter(template);
            case 'JSON':
                return new JsonConverter(template);
            default:
                return new Error('format not supported');
        }
    }
}

module.exports = ConverterFactory;