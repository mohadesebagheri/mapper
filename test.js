const axios = require('axios')
const assert = require('assert')
const Parser = require('./parser')
const JsonConverter = require('./jsonConverter')

describe('Testing - simple mapping', function() {
    let fileAddress, api, data, parser, result, jConverter;
    before(async function () {
        fileAddress = './university.yml'
        api = 'http://universities.hipolabs.com/search?country=United+Kingdom'
        data = await axios.get(api)
        parser = new Parser(fileAddress)
        result = parser.parse()
        jConverter = new JsonConverter(result)
    })
    it('1. University', function() {
        const mappedData = jConverter.map(data.data[0])
        const expectedResult = [
            {
                code: 'GB',
                name: 'Futureworks',
                province: null,
                country: 'United Kingdom',
                homepage: [ 'https://futureworks.ac.uk/' ],
                domains: [ 'futureworks.ac.uk' ]
            }
        ]
        assert.deepStrictEqual(mappedData,expectedResult)
    });
});