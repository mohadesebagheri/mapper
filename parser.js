const YAML = require('yaml')
const fs = require('fs')

/**
 * YAML parser. client should provide a YAML file to map fields
 *
 */
class Parser{
    /**
     *
     * @param {string} fileAddress YAML file path
     */
    constructor(fileAddress) {
        this.fileAddress = fileAddress
    }

    /**
     * @property {Function} parse this function reads the provided YAML file content and convert it to an object
     * @returns Object
     */
    parse(){
        try{
            const file = fs.readFileSync(this.fileAddress, 'utf8')
            const convertedContent = YAML.parse(file)
            return convertedContent
        }catch (e) {
            console.log(e)
        }
    }
}


module.exports = Parser;