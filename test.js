const axios = require('axios')
const assert = require('assert')
const Parser = require('./parser')

describe('Testing', function() {
    it('1. University', async function() {
        const fileAddress = './university.yml'
        const api = 'http://universities.hipolabs.com/search?country=United+Kingdom'
        const {data} = await axios.get(api)
        const parser = new Parser(fileAddress)
        const result = parser.parse()
        assert.notEqual(data.length,0)
    });
});