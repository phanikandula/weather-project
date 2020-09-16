//Code from https://github.com/fullstackreact/food-lookup-demo/blob/master/client/src/Client.js
//Seems like useful snippet that we can convert to a small package instead of copying into different repos.
//That's for post MVP.
function search(query, cb) {
    return fetch(`/weather/${query}`, {
      accept: "application/json"
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(cb);
  }
  
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
  
  function parseJSON(response) {
    return response.json();
  }
  
  const Client = { search };
  export default Client;
  