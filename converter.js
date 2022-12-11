/**
 * Base converter class.
 *
 */
class Converter{
    /**
     *
     * @param {Object} template it is map that mapper our db fields to response keys
     */
    constructor(template) {
        this.template = template;
    }

    /**
     * @property {Function} convert it converts the api field to our desired field
     * @param {Object} source
     * @returns Object
     */
    convert(source){
        const item = {}
        for (const [key, value] of Object.entries(this.template)) {
            const srcValue = this.getValue(source,value)
            item[key] = srcValue
        }
        return item
    }

    /**
     * @property {Function} getValue a recursive function that finds the value of the given key in the provided item
     * @param {Object} item
     * @param {string} key
     * @returns {*}
     */
    getValue(item, key){
        return key in item ? item[key]
            : Object.values(item).reduce((acc, val) => {
                if (acc !== undefined) return acc;
                if (typeof val === 'object' && !Array.isArray(val) && val !== null) return this.getValue(val, key);
            }, undefined);
    }

}

module.exports = Converter;