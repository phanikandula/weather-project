import React from "react";
import Client from "./Client";
const defaultResults={current: 'NA', high: 'NA', low: 'NA'}
class WeatherSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: defaultResults,
            searchValue: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ searchValue: event.target.value });
    }

    //https://reactjs.org/docs/forms.html#controlled-components
    handleSubmit = e => {
        const value = this.state.searchValue;
        
        if (value === "") {
            this.setState({
                results: defaultResults,
            });
        } else {
            this.setState({
                results: defaultResults,
            });

            Client.search(value, result => {
                this.setState({
                    results: result
                });
            });
        }
        e.preventDefault();
    };

    render() {
        const { results } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Zip:
          <input type="text" value={this.state.searchValue} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <div>
                    Current: {results.current}, 
                    High: {results.high},
                    Low: {results.low}
                </div>
            </div>
        );
    }
}

export default WeatherSearch;
