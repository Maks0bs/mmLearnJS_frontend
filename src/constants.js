let reactAppApiUrl;
if (process.NODE_ENV === 'production'){
	reactAppApiUrl = 'https://mmlearnjs-backend.herokuapp.com'
}
else{
	reactAppApiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080'
}

export let REACT_APP_API_URL = reactAppApiUrl