import { sendRequest } from '../services/apiService';
import api from '../services/apiConstants';
var parseString = require('xml2js').parseString;

export const getSearchResult = (userName, loaded = false, pageNo = 1) => {
	return (dispatch) => {
    let parameters = {};
    parameters.url = `?method=${api.users.SEARCH}&api_key=${api.users.KEY}&text=${userName}&per_page=12&page=${pageNo}`;
    parameters.method = 'get';

    if(!loaded)
		dispatch({
			type: 'RESET_USERS'
		});

	dispatch({
		type: 'LOADER',
		data: false
	})
    sendRequest(parameters)
      .then((response) => {
      	let data = {};
      	// var json = parser.toJson(response.data);
      	// console.log(json);

      	parseString(response.data, function (err, result) {
			data = result;
		});
		console.log(data)

      	dispatch({
			type: 'LOADER',
          	data: true	
		})

      	if(data.rsp && data.rsp.photos && data.rsp.photos[0].$.pages != '0'){
      		dispatch({
						type: 'SET_USERS',
						pagination: data.rsp.photos[0].$,
						data: data.rsp.photos[0].photo
					})
      		dispatch({
						type: 'SET_PAGE',
						page: data.rsp.photos[0].$.page
					})
      	}
      	else{
      		dispatch({
						type: 'SET_ERROR_USERS',
						data: true
					})
      	}
       	
      })
      .catch((error) => {
      	let data = {};
      	// var json = parser.toJson(response.data);
      	// console.log(json);

      	parseString(error.response, function (err, result) {
			data = result;
		});

      	dispatch({
			type: 'RESET_USERS'
		})

		if(data && data.data)
      	{
      		dispatch({
				type: 'ERROR_USERS',
				data: data.data.message
			})
      	}
      	else{
      		alert('Something went wrong!')
      	}
       });
  };
}
