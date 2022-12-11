const axios = require('axios')
const assert = require('assert')
const Parser = require('./parser')
const ConverterFactory = require('./converterFactory')
const {getJsonFormatKeyword, getXMLFormatKeyword} = require('./constants')

describe('Testing - simple mapping', function () {
    let fileAddress, api, data, parser, result, jConverter;
    before(async function () {
        fileAddress = './university.yml'
        api = 'http://universities.hipolabs.com/search?country=United+Kingdom'
        data = await axios.get(api)
        parser = new Parser(fileAddress)
        result = parser.parse()
        jConverter = new ConverterFactory().create(getJsonFormatKeyword(), result)
    })
    it('1. University', function () {
        const mappedData = jConverter.map(data.data[0])
        const expectedResult = [{
            code: 'GB',
            name: 'Futureworks',
            province: null,
            country: 'United Kingdom',
            homepage: ['https://futureworks.ac.uk/'],
            domains: ['futureworks.ac.uk']
        }]
        assert.deepStrictEqual(mappedData, expectedResult)
    });
});

describe('Testing - map nested object fields', function () {
    let data, jConverter, map, parser, fileAddress;
    before(async function () {
        fileAddress = './profile.yml'
        parser = new Parser(fileAddress)
        map = parser.parse()
        data = {
            active: true,
            balance: '$1,273.07',
            person: {
                age: 32,
                phone: '+1 (955) 541-2541',
                country: "some country",
                address: '740 Debevoise Avenue, Silkworth, Oregon, 2792'
            },
            friends: [{
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
        jConverter = new ConverterFactory().create(getJsonFormatKeyword(), map)
    })
    it('2. Profile', function () {
        const mappedData = jConverter.map(data)
        const expectation = [{
            isActive: true,
            currentFriends: data.friends,
            information: '740 Debevoise Avenue, Silkworth, Oregon, 2792'
        }]
        assert.deepStrictEqual(expectation, mappedData);
    });
});

describe('Testing - simple mapping - XML', function () {
    let data, xmlConverter, map, parser, fileAddress;
    before(async function () {
        fileAddress = './cd.yml'
        parser = new Parser(fileAddress)
        map = parser.parse()
        data = `
        <CD>
            <TITLE>Empire Burlesque</TITLE>
            <ARTIST>Bob Dylan</ARTIST>
            <COUNTRY>USA</COUNTRY>
            <COMPANY>Columbia</COMPANY>
            <PRICE>10.90</PRICE>
            <YEAR>1985</YEAR>
        </CD>`
        xmlConverter = new ConverterFactory().create(getXMLFormatKeyword(),map)
    })
    it('1. CD catalog', function () {
        const mappedData = xmlConverter.map(data)
        const expectation = [{
            name: 'Empire Burlesque',
            singer: 'Bob Dylan',
            country: 'USA',
            amount: 10.90
        }]
        assert.deepStrictEqual(expectation, mappedData);
    });
});

describe('Testing - nested mapping - XML', function () {
    let data, xmlConverter, map, parser, fileAddress;
    before(function () {
        fileAddress = './profile.yml'
        parser = new Parser(fileAddress)
        map = parser.parse()
        data = `
        <root>
           <active>true</active>
           <balance>$1,273.07</balance>
           <friends>
              <friend>
                 <id>0</id>
                 <name>Courtney Medina</name>
              </friend>
              <friend>
                 <id>1</id>
                 <name>Hodges Avery</name>
              </friend>
              <friend>
                 <id>2</id>
                 <name>Blanchard Hyde</name>
              </friend>
           </friends>
           <person>
              <address>740 Debevoise Avenue, Silkworth, Oregon, 2792</address>
              <age>32</age>
              <country>some country</country>
              <phone>+1 (955) 541-2541</phone>
           </person>
        </root>`
        xmlConverter = new ConverterFactory().create(getXMLFormatKeyword(), map)
    })
    it('1. profile - XML', function () {
        const mappedData = xmlConverter.map(data)
        const expectation = [{
            isActive: true,
            currentFriends: {
                friend: [{
                    id: 0,
                    name: "Courtney Medina"
                }, {
                    id: 1,
                    name: "Hodges Avery"
                }, {
                    id: 2,
                    name: "Blanchard Hyde"
                }]
            },
            information: '740 Debevoise Avenue, Silkworth, Oregon, 2792'
        }]
        assert.deepStrictEqual(expectation, mappedData);
    });
});