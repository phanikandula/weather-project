import React from "react";
import Client from "./Client";

//When the app starts or if zip code is invalid, this defaultResults is used.
const defaultResults={current: 'NA', high: 'NA', low: 'NA'}

//Once user types in zip code and submits the form,
//Call to the backend is executed and results are presented.
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

    //As the input is typed, update our state.
    handleChange = e => {
        this.setState({ searchValue: e.target.value });
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
            //It's time to call the backend.
            //When callback is executed, update our state.
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
