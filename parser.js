const YAML = require('yaml')
const fs = require('fs')

class Parser{
    constructor(fileAddress) {
        this.fileAddress = fileAddress
    }

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