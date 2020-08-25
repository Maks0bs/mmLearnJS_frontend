import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import store from './store'
import rookout from 'rookout';

rookout.start({
	token: 'a8651ca79fa23c430f06c51c9e837bda56d9841f1c94b9dcdbb71988599a4cfb',
	labels: {
		env: 'dev'
	}
})

ReactDOM.render(
  	<React.StrictMode>
		<Provider store={store}>
    		<App />
    	</Provider>
  	</React.StrictMode>,
  	document.getElementById('root')
);
