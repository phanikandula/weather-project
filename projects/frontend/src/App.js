import React from 'react';
import './App.css';
import WeatherSearch from './WeatherSearch';

function App() {
  return (
    <WeatherSearch/>
  );
}

export default App;

// class App extends React.Component {
//   componentDidMount() {
//     const apiUrl = '/hello/foo';
//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => console.log('This is your data', data))
//       .catch((error) => console.log('Got this error', error));
//   }
//   render() {
//     return <h1>my Component has Mounted, Check the browser 'console' </h1>;
//   }
// }
// export default App;