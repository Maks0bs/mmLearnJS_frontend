import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUpdatesByDate, cleanup, updateStartingIndex,
	updateFilter
} from "./services/actions";
import {DEFAULT_ON_LOAD_AMOUNT, getDateHtmlFormattedString} from "./services/helpers";
import { addToast } from "../../../../components/ToastRoot/services/actions";
import { showModal, hideModal} from "../../../../components/ModalRoot/services/actions";
import ChooseDashboardFilterCourses from "./components/ChooseDashboardFilterCourses";
import DashboardNewsFilter from "./components/DashboardFilter";
import DashboardNews from "./components/DashboardNews";
import {Link} from "react-router-dom";
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
		let lastMonth = new Date(), today = new Date();
		lastMonth.setDate(lastMonth.getDate() - 30);

		let curDateFrom = getDateHtmlFormattedString(lastMonth);
		let curDateTo = getDateHtmlFormattedString(today);

		let chosenCourses = [];
		if (Array.isArray(subscribedCourses)){
			// extract ids from subscribed courses
			console.log('sc', subscribedCourses);
			chosenCourses = subscribedCourses.map(c => c && c.course && c.course._id)
		}
		// pre-populate data
		this.props.updateFilter({curDateFrom, curDateTo, chosenCourses})
		this.setState({loadingNew: true});
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
					if (Array.isArray(this.props.updatesData)){
						this.props.updateStartingIndex(this.props.updatesData.length);
					}
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
		let { updatesData, noMoreUpdates, authenticatedUser } = this.props;
		if (!authenticatedUser){
			return (
				<h1 className="container my-4">
					Please <Link to={"/signin"}>sign in</Link> to
					access the dashboard
				</h1>
			)
		}
		return (
			<div className="container my-4">
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
					loadingNew={this.state.loadingNew}
				/>
			</div>
		)
	}
}
let mapStateToProps = (state) => ({
	...state.services,
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