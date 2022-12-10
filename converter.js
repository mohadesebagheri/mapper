class Converter{
    constructor(template) {
        this.template = template;
    }

    convert(source){
        const item = {}
        for (const [key, value] of Object.entries(this.template)) {
            const srcValue = this.getValue(source,value)
            item[key] = srcValue
        }
        return item
    }

    getValue(item, key){
        return item[key]
    }
}

module.exports = Converter;