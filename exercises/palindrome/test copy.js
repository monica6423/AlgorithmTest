// Import the functions to test
const { parse, stringify } = require('./index'); 

describe('Date Parsing and Stringifying Functions', () => {
    describe('parse function', () => {
        it('should parse "now-1y/y" correctly', () => {
            const input = 'now-1y/y';
            const expectedDate = new Date('2023-01-01T00:00:00.000Z');
            expect(parse(input).toISOString()).toEqual(expectedDate.toISOString());
        });

        it('should parse "now/y" correctly', () => {
            const input = 'now/y';
            const expectedDate = new Date('2024-01-01T00:00:00.000Z');
            expect(parse(input).toISOString()).toEqual(expectedDate.toISOString());
        });

        it('should parse "now-1d" correctly', () => {
            const input = 'now-1d';
            const expectedDate = new Date('2024-06-12T13:20:17.486Z');
            expect(parse(input).toISOString()).toEqual(expectedDate.toISOString());
        });

        it('should parse "now+1d" correctly', () => {
            const input = 'now+1d';
            const expectedDate = new Date('2020-05-02T00:00:00.000Z');
            expect(parse(input).toISOString()).toEqual(expectedDate.toISOString());
        });

        it('should parse "now-4d-4h" correctly', () => {
            const input = 'now-4d-4h';
            const expectedDate = new Date('2020-04-26T20:00:00.000Z');
            expect(parse(input).toISOString()).toEqual(expectedDate.toISOString());
        });

        it('should throw error for invalid date string', () => {
            const input = 'invalid-date-string';
            expect(() => parse(input)).toThrowError("Invalid date string: Must start with 'now'.");
        });
    });

    describe('stringify function', () => {
        it('should stringify a date object to "now-1y/y"', () => {
            const inputDate = new Date('2019-01-01T00:00:00.000Z');
            const expectedString = 'now-1y/y';
            expect(stringify(inputDate)).toEqual(expectedString);
        });

        it('should stringify a date object to "now/y"', () => {
            const inputDate = new Date('2020-01-01T00:00:00.000Z');
            const expectedString = 'now/y';
            expect(stringify(inputDate)).toEqual(expectedString);
        });

        it('should stringify a date object to "now-1d"', () => {
            const inputDate = new Date('2020-04-30T00:00:00.000Z');
            const expectedString = 'now-1d';
            expect(stringify(inputDate)).toEqual(expectedString);
        });

        it('should stringify a date object to "now+1d"', () => {
            const inputDate = new Date('2020-05-02T00:00:00.000Z');
            const expectedString = 'now+1d';
            expect(stringify(inputDate)).toEqual(expectedString);
        });

        it('should stringify a date object to "now-4d-4h"', () => {
            const inputDate = new Date('2020-04-26T20:00:00.000Z');
            const expectedString = 'now-4d-4h';
            expect(stringify(inputDate)).toEqual(expectedString);
        });
    });
});
