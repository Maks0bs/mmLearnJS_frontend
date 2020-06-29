import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUpdatesByDate } from "./services/actions";
import {Link} from "react-router-dom";
import { addToast } from "../../../../components/ToastRoot/services/actions";
import { showModal, hideModal} from "../../../../components/ModalRoot/services/actions";
import ChooseCourses from "./components/ChooseCourses";


class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dateFrom: '',
			dateTo: '',
			starting: 0,
			chosenCourses: [],
			showCoursesDropdown: false,
			coursesFilter: 'all'
		}
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		if (nextProps.authenticatedUser && !this.props.authenticatedUser){
			let chosenCourses = [];

			if (nextProps.authenticatedUser){
				for (let c of nextProps.authenticatedUser.subscribedCourses){
					chosenCourses.push(c.course);
				}
			}

			this.setState({
				chosenCourses
			})
		}

		return true;
	}

	handleChange = (name) => (event) => {
		this.setState({
			[name]: event.target.value
		})
	}

	componentDidMount() {
		let yesterday = new Date(), today = new Date();
		yesterday.setDate((new Date()).getDate() - 1);

		let month = '' + (yesterday.getMonth() + 1),
			day = '' + yesterday.getDate(),
			year = yesterday.getFullYear();

		if (month.length < 2)
			month = '0' + month;
		if (day.length < 2)
			day = '0' + day;

		let dateFrom = [year, month, day].join('-');

		month = '' + (today.getMonth() + 1);
		day = '' + today.getDate();
		year = today.getFullYear();

		if (month.length < 2)
			month = '0' + month;
		if (day.length < 2)
			day = '0' + day;

		let dateTo = [year, month, day].join('-');

		let chosenCourses = [];

		if (this.props.authenticatedUser){
			for (let c of this.props.authenticatedUser.subscribedCourses){
				chosenCourses.push(c.course);
			}
		}

		this.setState({
			dateFrom,
			dateTo,
			chosenCourses
		})

		this.props.getUpdates(dateFrom, dateTo, this.getCoursesFilter(), 0, 5)
			.then(() => {
				if (this.props.error){
					this.props.addToast(
						(
							<div>
								{`Problem with loading feed`}
							</div>
						),
						{
							type: 'error'
						}
					)
				} else {
					this.updateStarting();
				}
			})


	}

	updateStarting = () => {
		this.setState({
			starting: this.props.updatesData.length
		})
	}

	getCoursesFilter = () => {
		let courses = [];

		if (!this.props.authenticatedUser){
			return [];
		}

		if (this.state.coursesFilter === 'all'){
			for (let c of this.props.authenticatedUser.subscribedCourses){
				courses.push(c.course._id);
			}
		} else {
			for (let c of this.state.chosenCourses){
				courses.push(c._id);
			}
		}

		return courses;
	}

	onSubmit = (e) => {
		e.preventDefault();

		this.props.getUpdates(this.state.dateFrom, this.state.dateTo, this.getCoursesFilter(), 0, 5)
			.then(() => {
				if (this.props.error){

					this.props.addToast(
						(
							<div>
								{`Problem with loading feed`}
							</div>
						),
						{
							type: 'error'
						}
					)
				} else {
					this.updateStarting();
				}
			})
	}

	onLoadMore = (e) => {
		e.preventDefault();

		this.props.getUpdates(this.state.dateFrom, this.state.dateTo, this.getCoursesFilter(), this.state.starting, 5)
			.then(() => {
				if (this.props.error){

					this.props.addToast(
						(
							<div>
								{`Problem with loading feed`}
							</div>
						),
						{
							type: 'error'
						}
					)
				} else {
					this.updateStarting();
				}
			})
	}

	onShowChooseCourses = (e) => {
		e.preventDefault();
		if (!this.props.authenticatedUser){
			return;
		}
		this.props.showModal(
			<ChooseCourses
				courses={this.state.chosenCourses}
				allCourses={this.props.authenticatedUser.subscribedCourses}
				onSave={(courses) => {
					this.setState({
						chosenCourses: courses
					})
					return this.props.hideModal();
				}}
				onClose={this.props.hideModal}
			/>
		)
	}


	render() {
		let { dateFrom, dateTo, coursesFilter } = this.state;
		let lastDateFrom = '', lastDateTo = '', updatesData = [];
		if (this.props.updatesData){
			let year = this.props.lastDateFrom.substring(0, 4),
				month = this.props.lastDateFrom.substring(5, 7),
				day = this.props.lastDateFrom.substring(8, 10);
			lastDateFrom = [day, month, year].join('.');

			year = this.props.lastDateTo.substring(0, 4);
			month = this.props.lastDateTo.substring(5, 7);
			day = this.props.lastDateTo.substring(8, 10);

			lastDateTo = [day, month, year].join('.');

			updatesData = this.props.updatesData;
		}

		console.log('st', this.state);
		console.log('pr', this.props);



		return (
			<div className={"container mt-2 mb-5"}>
				<h1>Feed</h1>
				<form onSubmit={this.onSubmit}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<strong className="mr-3">Filter news by date:</strong>
						<div
							className={"mr-1"}
							style={{

							}}
						>
							From
						</div>
						<div>
							<input
								className={"form-control"}
								type="date"
								style={{
									display: 'inline-block'
								}}
								value={dateFrom}
								onChange={this.handleChange("dateFrom")}
								min={"2000-01-01"}
								max={"2100-01-01"}
							/>
						</div>
						<div className="mx-1">
							to
						</div>
						<div>

							<input
								className={"form-control"}
								style={{
									display: 'inline-block'
								}}
								value={dateTo}
								onChange={this.handleChange("dateTo")}
								type="date"
								min={"2000-01-01"}
								max={"2100-01-01"}
							/>
						</div>
						<button
							className="btn btn-outline ml-3 p-1"
							type="submit"
						>
							update
						</button>
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<strong className="mr-3">Display news from courses:</strong>
						<select
							name="coursesFilter"
							value={coursesFilter}
							onChange={this.handleChange("coursesFilter")}
						>
							<option value="all">all</option>
							<option value="choose">choose</option>
						</select>
						{(coursesFilter === 'choose') && (
							<a
								className="ml-3"
								href="#void"
								onClick={this.onShowChooseCourses}
							>
								Choose courses
							</a>
						)}
					</div>

				</form>

				<hr />
				{updatesData.map((update, i) => {
					let time = new Date(update.data.created);
					let timeStr =
						`on ${time.toLocaleDateString()} at ${time.toLocaleTimeString().substring(0, 5)}`;
					switch(update.data.kind){
						case 'UpdateNewInfo': {
							return (
								<div key={i}>
									<h4>
										Course { }
										<Link to={`/classroom/course/${update.course.id}`}>
											{update.data.oldName}
										</Link> { }
										now has new main info:
									</h4>
									<p>New name: {update.data.newName}</p>
									<p>New info about the course: {update.data.newAbout}</p>
									<i>{timeStr}</i>
									<hr />
								</div>
							)
						}
						case 'UpdateNewEntries': {
							return (
								<div key={i}>
									<h4>
										New entries have been added to course { }
											<Link to={`/classroom/course/${update.course.id}`}>
											{update.course.name}
										</Link> { }
									</h4>
									<ul>
										{update.data.newEntries.map((entry, j) => {
											return (
												<li key={j}>
													<p>{`New ${entry.type} "${entry.name}"`}</p>
												</li>
											)
										})}
									</ul>
									<i>{timeStr}</i>
									<hr />
								</div>
							)
						}
						case 'UpdateDeletedEntries': {
							return (
								<div key={i}>
									<h4>
										Entries have been removed from course { }
										<Link to={`/classroom/course/${update.course.id}`}>
											{update.course.name}
										</Link> { }
									</h4>
									<ul>
										{update.data.deletedEntries.map((entry, j) => {
											return (
												<li key={j}>
													<p>{`Removed ${entry.type} "${entry.name}"`}</p>
												</li>
											)
										})}
									</ul>
									<i>{timeStr}</i>
									<hr />
								</div>
							)
						}
						default: {
							return (
								<div key={i}>
									{update.data.kind}
									<hr />
								</div>
							)
						}
					}
				})}
				{(() => {
					if (this.props.noMoreUpdates){
						return (
							<div
								style={{
									display: 'flex',
									justifyContent: 'center'
								}}
							>
								No more news
							</div>
						)
					} else {
						return (
							<div
								style={{
									display: 'flex',
									justifyContent: 'center'
								}}
							>
								<button
									className="btn btn-outline p-2"
									type="button"
									onClick={this.onLoadMore}
								>
									load more
								</button>
							</div>
						)
					}
				})()}
			</div>
		)
	}
}

let mapStateToProps = (state) => {
	return {
		authenticatedUser: state.services.authenticatedUser,
		...state.views.classroom.dashboard
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		getUpdates: (from, to, courses, starting, cnt) => dispatch(getUpdatesByDate(from, to, courses, starting, cnt)),
		addToast: (component, options) => dispatch(addToast(component, options)),
		hideModal: () => dispatch(hideModal()),
		showModal: (component) => dispatch(showModal(component))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard)