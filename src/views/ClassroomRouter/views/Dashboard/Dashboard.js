import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUpdatesByDate } from "./services/actions";
import {Link} from "react-router-dom";


class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dateFrom: '',
			dateTo: '',
			starting: 0
		}
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

		this.setState({
			dateFrom,
			dateTo
		})

		this.props.getUpdates(dateFrom, dateTo, 0, 10)
			.then(() => {
				if (this.props.error){
				}
			})


	}

	onSubmit = (e) => {
		e.preventDefault();

		this.props.getUpdates(this.state.dateFrom, this.state.dateTo, 0, 10)
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
				}
			})
	}

	onLoadMore = (e) => {
		e.preventDefault();

		//TODO change getUpdates to appendUpdates
		this.props.getUpdates(this.state.dateFrom, this.state.dateTo, this.state.starting, 10)
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
				}
			})
	}


	render() {
		let { dateFrom, dateTo } = this.state;
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

		console.log(updatesData);



		return (
			<div className={"container"}>
				<h1>Feed</h1>
				<form onSubmit={this.onSubmit}>
					<div
						className={"row"}
						style={{
							display: 'flex',
							alignItems: 'center'
						}}
					>
						<div
							className={"mr-3"}
							style={{

							}}
						>
							<strong>Filter news by date:</strong>
						</div>
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

				</form>
				<hr />
				<h3>
					Displaying news from {lastDateFrom} to {lastDateTo}
				</h3>
				<hr />
				{updatesData.map((update, i) => {
					switch(update.data.kind){
						case 'UpdateNewInfo': {
							return (
								<div key={i}>
									<h5>
										Course "
										<Link to={`/classroom/course/${update.course.id}`}>
											{update.course.name}
										</Link>"
										has changed main info:
									</h5>
									<p>New name: update.newName</p>
									<p>New info about the course: update.newAbout</p>
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
		getUpdates: (from, to, starting, cnt) => dispatch(getUpdatesByDate(from, to, starting, cnt))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard)