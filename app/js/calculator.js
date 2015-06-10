/** @jsx React.DOM */
var mountNode = document.getElementById('calculator');

var Calculator = React.createClass({
    getInitialState: function() {
        return {
            runningTotal: '',
            currentInput: '0',
            params: [],
            total: ''
        }
    },

    onChange: function(e) {
        // cast to number
        var val = parseFloat(e.target.value);
        if(isNaN(val)) {
            val = 0;
        }

        this.setState({
            currentInput: val
        });
    },

    add: function() {
        var input = document.getElementsByClassName('calculator__input')[0];
        var val = parseFloat(input.value);
        if(isNaN(val)) {
            val = 0;
        }

        // just save it, don't need to update anything
        this.state.params = this.state.params.concat([val]);

        this.setState({
            runningTotal: this.state.params.join(' + ') + ' + ',
            currentInput: ''
        });

        input.focus();
        input.value = '';
    },

    calculate: function() {
        var val = parseFloat(document.getElementsByClassName('calculator__input')[0].value);
        if(isNaN(val)) {
            val = 0;
        }

        this.state.params.push(val);

        var total = 0;
        this.state.params.forEach(function(num) {
            total += num;
        });

        // total += val;

        this.setState({
            total: total
        });

    },

    clear: function() {
        var input = document.getElementsByClassName('calculator__input')[0];
        input.value = 0;
        input.focus();

        this.setState({
            params: [],
            total: 0,
            runningTotal: '',
            currentInput: '0'
        });

    },

    render: function() {
        return (
            <div>
                <span className="calculator__runningTotal">{this.state.runningTotal}{this.state.currentInput}</span>
                <span className="calculator__output">{this.state.total}</span>
                <input type="number" onChange={this.onChange} className="calculator__input" placeholder="0" />
                <button onClick={this.add}>+</button>
                <button onClick={this.calculate}>=</button>
                <a onClick={this.clear} className="button">Clear</a>
            </div>
        );
    }
});

React.render(<Calculator />, mountNode);