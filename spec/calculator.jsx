/**
 * @jsx React.DOM
 */
var assert = require('assert');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var Calculator = require('../app/build/js/app.min');


describe('Calculator', function() {

    describe('layout', function() {

        var calc = TestUtils.renderIntoDocument(
            <Calculator />
        );

        // visuals
        it('has an equals button');
        it('has a clear button');
        it('has an input');
        it('has running total');
        it('has output');
    });

    describe('functionality', function() {
        // functionality
        it('adds two numbers correctly');
        it('adds three numbers correctly');
        it('handles one number');
        it('adds negative numbers correctly');
        it('adds negative and positive numbers');
        it('handles zero');
        it('handles text input');
    });
})
