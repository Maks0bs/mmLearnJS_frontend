import React, { Component } from 'react';
import { connect } from 'react-redux'
import {searchCourses, cleanup} from "./services/actions";
import { addToast } from "../../../../components/ToastRoot/services/actions";
import CourseSearchItem from "./components/CourseSearchItem";
import BigLoadingCentered from "../../../../components/reusables/BigLoadingCentered";
import SmallLoading from "../../../../components/reusables/SmallLoading";

/**
 * Search for courses with the given query (in the URI params) and
 * display the found courses
 * @memberOf components.views.classroom
 * @component
 */
class SearchCourses extends Component {
	constructor(props) {
		super(props);
		this.state = {loading: false}
	}


	componentWillUnmount() {
		this.props.cleanup();
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		if (nextProps.match.params.searchQuery !== this.props.match.params.searchQuery){
			this.startSearch(nextProps.match.params.searchQuery)
		}
		return true;
	}

	startSearch = (query) => {
		this.setState({loading: true});
		this.props.searchCourses(query)
			.then(() => {
				this.setState({loading: false})
			})
	}

	componentDidMount() {
		this.startSearch(this.props.match.params.searchQuery)
	}

	render() {
		let { courses } = this.props;
		if (!Array.isArray(courses)){
			return (<BigLoadingCentered />)
		}
		if (this.state.loading){
			return (
				<div className="container my-5">
					<SmallLoading />
				</div>
			)
		}

		return (
			<div className="container my-3">
				<h2>Search results</h2>
				<ul style={{listStyleType: 'square'}}>
					{(courses.length === 0) && (
						<h1>Nothing was found for given query</h1>
					)}
					{courses.map((course, i) => (
						<li key={i}>
							<CourseSearchItem {...course}/>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

let mapStateToProps = (state) => ({
	...state.views.classroom.searchCourses,
	...state.services
})
let mapDispatchToProps = (dispatch) => ({
	addToast: (component, options) => dispatch(addToast(component, options)),
	searchCourses: (key) => dispatch(searchCourses(key)),
	cleanup: () => dispatch(cleanup())
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchCourses)