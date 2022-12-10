const Converter = require('./converter')

class JsonConverter extends Converter{
    constructor(template) {
        super(template);
    }

    map(apiResult){
        let input = apiResult
        if(!Array.isArray(apiResult)) {
            input = [apiResult]
        }
        return input.map(item => super.convert(item))
    }



}

module.exports = JsonConverter