import React, { Component, Fragment } from 'react';
import * as homeActions from '../actions/homeAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Loader from '../component/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import '../styles/search.scss'
import '../styles/users.scss'

class HomeContainer extends Component {

    constructor(props) {
        super(props);
        this.renderEle = this.renderEle.bind(this);
        this.handleScroll = this.handleScroll.bind(this);

        this.state = {
            userName: '',
            imgUrl: ''
        }
    }

    // handle infinte scroll
    handleScroll(e) {
        let currScrollPos = document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
        // if(currScrollPos == )
        let d = document.documentElement;
        let offset = d.scrollTop + window.innerHeight;
        let height = d.offsetHeight;

        if (offset === height) {
            let inputValue = this.input.value;
            let pagination = {};
            let length = this.props.usersReducer.length - 1;
            let pageNo = 1;
            let total = 1;

            if (length > 0) {
                pagination = this.props.usersReducer[length].pagination;
                pageNo = parseInt(pagination.page);
                total = parseInt(pagination.total);

                if ((pageNo + 1) * 10 < total && (this.props.loaderReducer.loader)) {

                    this.props.getSearchResult(inputValue, true, pageNo + 1);
                }
            }
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    openImageModal(url) {
        this.setState({
            showModal: true,
            imgUrl: url
        })
    }

    toggleModal(url) {
        if (this.state.showModal == true) {
            this.setState({
                showModal: false,
                imgUrl: ''
            })
        } else {
            this.setState({
                showModal: true,
                imgUrl: url
            })
        }
    }

    renderEle(ele, index) {
        let url = `https://farm${ele.$.farm}.staticflickr.com/${ele.$.server}/${ele.$.id}_${ele.$.secret}.jpg`
        return (
            <div key={index} className="col-xs-12 col-sm-4 ">
			<div className="img-wrapper" onClick={() => this.openImageModal(url)}>
				<img src={url} alt="" />
			</div>
			</div>
        )
    }

    searchPictures(e) {
        let inputValue = this.input.value;
        const newState = { ...this.state };
        newState.userName = inputValue;
        this.setState({ ...newState });
        this.props.getSearchResult(inputValue);
    }

    render() {
        return (
            <Fragment>
				{
					this.state.showModal ? 
					<div className="img-modal">
					<div className="close" onClick={() => this.toggleModal()}>
						<img src="../images/close.png" alt=""/>
						<div>Close</div>
					</div>
						<img classname="image-field" src={this.state.imgUrl} alt=""/>
					</div>:
					null
				}
				<div className="search-users">
					<input type="text" 
						   placeholder="Enter user name" 
						   ref={(input) => this.input = input
					}/>	
					<div className="search-icon">
						<img src="../images/search.png" alt="" onClick={(e) =>this.searchPictures(e)} />
					</div>
				</div>
				{
					(this.props.usersReducer.users && this.props.usersReducer.users.rsp.photos && this.props.usersReducer.users.rsp.photos[0].$.pages == '0') ? 
					<div> No Result found </div>
				:
				<div>
				{
					(this.props.usersReducer &&  this.props.usersReducer.length > 0) ? 
					<div>
						<div className="row">{this.props.usersReducer.map(this.renderEle)}</div>
						<div>
							
							{
								this.props.loaderReducer.loader == false ? 
								<Loader></Loader>:
								null
							}

						</div>
					</div>
					:
					<div>
					{
						
						this.props.usersReducer && this.props.usersReducer.length !=0 && this.props.usersReducer.isError? 
						<Fragment> Try to search something else.</Fragment>:
						<Fragment>
						{
							this.props.loaderReducer.loader == false ? 
							<Loader></Loader>:
							null
						}
						</Fragment>
					}
					</div>

				}
				</div>
			}
			</Fragment>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        homeReducer: state.homeReducer,
        usersReducer: state.usersReducer,
        loaderReducer: state.loaderReducer
    };
};

const actions = {
    ...homeActions
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);