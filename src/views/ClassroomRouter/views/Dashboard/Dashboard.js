import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUpdatesByDate, cleanup, updateStartingIndex,
	updateFilter
} from "./services/actions";
import {DEFAULT_ON_LOAD_AMOUNT, getDateHtmlFormattedString} from "./services/helpers";
import { addToast } from "../../../../components/ToastRoot/services/actions";
import { showModal, hideModal} from "../../../../components/ModalRoot/services/actions";
import ChooseDashboardFilterCourses from "./components/ChooseDashboardFilterCourses";
import BigLoadingCentered from "../../../../components/reusables/BigLoadingCentered";
import DashboardNewsFilter from "./components/DashboardFilter";
import DashboardNews from "./components/DashboardNews";
import {Link} from "react-router-dom";
import BigLoadingAbsolute from "../../../../components/reusables/BigLoadingAbsolute";
/**
 * This component is a dashboard with the news about
 * courses to which the user is subscribed
 * @memberOf components.views.classroom
 * @component
 */
class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = { loadingNew: false, loadingMore: false}
	}

	initData = (subscribedCourses) => {
		let yesterday = new Date(), today = new Date();
		yesterday.setDate(yesterday.getDate() - 1);

		let curDateFrom = getDateHtmlFormattedString(yesterday);
		let curDateTo = getDateHtmlFormattedString(today);

		let chosenCourses = [];
		if (Array.isArray(subscribedCourses)){
			// extract ids from subscribed courses
			chosenCourses = subscribedCourses.map(c => c.course._id)
		}
		// pre-populate data
		this.props.updateFilter({curDateFrom, curDateTo, chosenCourses})
		this.onSubmit(
			curDateFrom, curDateTo, chosenCourses,
			0, DEFAULT_ON_LOAD_AMOUNT
		)
	}

	componentDidMount() {
		let { authenticatedUser: user } = this.props;
		if (user){
			this.initData(user.subscribedCourses);
		}
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		if (!this.props.authenticatedUser && nextProps.authenticatedUser) {
			this.initData(nextProps.authenticatedUser.subscribedCourses);
		}
		return true;
	}

	componentWillUnmount() {
		this.props.cleanup();
	}

	onSubmit = (dateFrom, dateTo, chosenCourses, starting, amount) => {
		this.props.getUpdates(dateFrom, dateTo, chosenCourses, starting, amount)
			.then(() => {
				this.setState({loadingMore: false, loadingNew: false})
				if (this.props.error){
					this.props.addToast(
						(<div>{`Problem with loading feed`}</div>),
						{type: 'error'}
					)
				} else {
					// updates data is a guaranteed array at this point
					this.props.updateStartingIndex(this.props.updatesData.length);
				}
			})
	}

	onLoadMore = () => {
		this.setState({loadingMore: true});
		this.onSubmit(
			this.props.lastDateFrom, this.props.lastDateTo,
			this.props.chosenCourses, this.props.startingIndex, DEFAULT_ON_LOAD_AMOUNT
		)
	}
	onLoadWithNewFilter = () => {
		this.setState({loadingNew: true});
		this.onSubmit(
			this.props.curDateFrom, this.props.curDateTo,
			this.props.chosenCourses, 0, DEFAULT_ON_LOAD_AMOUNT
		)
	}

	onShowChooseCourses = () => {
		if (!this.props.authenticatedUser) return;
		this.props.showModal(
			<ChooseDashboardFilterCourses
				curChosenCourses={this.props.chosenCourses}
				allCourses={this.props.authenticatedUser.subscribedCourses}
				onSave={(courses) => {
					this.props.updateFilter({chosenCourses: courses})
					return this.props.hideModal();
				}}
				onClose={this.props.hideModal}
			/>
		)
	}

	render() {
		if (!this.props.authenticatedUser){
			return (
				<h1 className="container my-4">
					Please <Link to={"/signin"}>sign in</Link> to
					access the dashboard
				</h1>
			)
		}
		let { updatesData, noMoreUpdates } = this.props;
		if (!updatesData){return (<BigLoadingCentered />)}
		return (
			<div className="container my-4">
				{this.state.loadingNew && (<BigLoadingAbsolute/>)}
				<h1>Feed</h1>
				<DashboardNewsFilter
					onShowChooseCourses={this.onShowChooseCourses}
					onSubmit={this.onLoadWithNewFilter}
				/>
				<hr />
				<DashboardNews
					onLoadMore={this.onLoadMore}
					updatesData={updatesData}
					noMoreUpdates={noMoreUpdates}
					loadingMore={this.state.loadingMore}
				/>
			</div>
		)
	}
}
let mapStateToProps = (state) => ({
	authenticatedUser: state.services.authenticatedUser,
	...state.views.classroom.dashboard
})
let mapDispatchToProps = (dispatch) => ({
	getUpdates: (from, to, courses, starting, amount) =>
		dispatch(getUpdatesByDate(from, to, courses, starting, amount)),
	addToast: (component, options) => dispatch(addToast(component, options)),
	hideModal: () => dispatch(hideModal()),
	showModal: (component) => dispatch(showModal(component)),
	cleanup: () => dispatch(cleanup()),
	updateStartingIndex: (index) => dispatch(updateStartingIndex(index)),
	updateFilter: (data) => dispatch(updateFilter(data))
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard)