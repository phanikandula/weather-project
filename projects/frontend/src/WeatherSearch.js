import React from "react";
import Client from "./Client";

class WeatherSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
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
                results: [],
            });
        } else {
            this.setState({
                results: [],
            });

            Client.search(value, results => {
                this.setState({
                    results: results.hello
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
                        Name:
          <input type="text" value={this.state.searchValue} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <div>
                    {results}
                </div>
            </div>
        );
    }
}

export default WeatherSearch;
