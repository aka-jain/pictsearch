import React, { Component, Fragment } from 'react';
import '../../styles/users.scss'

class Loader extends Component{

	render(){
		return(
			<div className="row">
				<div className="col-xs-12 col-sm-4">
					<div className="loader-wrapper">
						<div className="inner-card"></div>
					</div>
				</div>
				<div className="col-xs-12 col-sm-4">
					<div className="loader-wrapper">
					<div className="inner-card"></div>
					</div>
				</div>
				<div className="col-xs-12 col-sm-4">
					<div className="loader-wrapper">
					<div className="inner-card"></div>
					</div>
				</div>
			</div>
		)
	}
}

export default Loader;
