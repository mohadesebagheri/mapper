const axios = require('axios')
const assert = require('assert')
const Parser = require('./parser')
const JsonConverter = require('./jsonConverter')
const expect = require('chai').expect

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

describe('Testing - map nested object fields', function() {
    let data, jConverter, map,parser;
    before(async function () {
        fileAddress = './profile.yml'
        parser = new Parser(fileAddress)
        map = parser.parse()
        data =   {
            active: true,
            balance: '$1,273.07',
            person:{
                age: 32,
                phone: '+1 (955) 541-2541',
                country: "some country",
                address: '740 Debevoise Avenue, Silkworth, Oregon, 2792'
            },
            friends: [
                {
                    id: 0,
                    name: 'Courtney Medina',
                },
                {
                    id: 1,
                    name: 'Hodges Avery',
                },
                {
                    id: 2,
                    name: 'Blanchard Hyde',
                },
            ],
        }
        jConverter = new JsonConverter(map)
    })
    it('2. Profile', function() {
        const mappedData = jConverter.map(data)
        const expectation =[
            {
                isActive: true,
                currentFriends: data.friends,
                information: '740 Debevoise Avenue, Silkworth, Oregon, 2792'
            }
        ]
        assert.deepStrictEqual(expectation, mappedData);
    });
});