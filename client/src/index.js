import React from 'react';
import ReactDOM from 'react-dom';
import {App} from "./app";
import 'bootstrap/dist/css/bootstrap.css';
import jQuery from 'jquery';

window.$ = window.jQuery = jQuery;

window.url = (endpoint = '/') =>
{
	let _url = window.location;
	return (process.env.NODE_ENV === 'production' ? _url.host : 'localhost:9000') + endpoint;
}

window.get = (endpoint = '/', success = () => {}) =>
{
	let _url = url(endpoint);
	return $.ajax({
		url: _url,
		success
	});
}

ReactDOM.render(<App />, document.getElementById("app"));
