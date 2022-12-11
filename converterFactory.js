const JsonConverter = require('./jsonConverter')
const XmlConverter = require('./xmlConverter')

class ConverterFactory {
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