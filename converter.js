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
        return key in item ? item[key]
            : Object.values(item).reduce((acc, val) => {
                if (acc !== undefined) return acc;
                if (typeof val === 'object' && !Array.isArray(val) && val !== null) return this.getValue(val, key);
            }, undefined);
    }

}

module.exports = Converter;