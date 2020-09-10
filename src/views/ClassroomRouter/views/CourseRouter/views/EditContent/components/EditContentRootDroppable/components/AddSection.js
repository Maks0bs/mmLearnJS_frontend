import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom'
import { addSection } from '../services/actions'
import { connect } from 'react-redux'


// make controlled components

class AddSection extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            description: ''
        }

    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        })
    }

    handleLeave = () => {
        this.props.onClose && this.props.onClose();
    }

    onSubmit = (event) => {
        event.preventDefault();
        let { name, description } = this.state;
        this.props.addSection({
        	name, 
        	description
        })
        this.handleLeave();
    }

    componentWillUnmount(){
        this.handleLeave();
    }


    render() {
        let { name, description } = this.state;
        return (
        	<div className="container">
	            <form>
	                <div className="form-group">
	                    <label className="text-muted">Name</label>
	                    <input
	                        onChange={this.handleChange("name")}
	                        type="text"
	                        className="form-control"
	                        value={name}
	                    />
	                </div>

	                <div className="form-group">
	                    <label className="text-muted">Desctiption</label>
	                    <input
	                        onChange={this.handleChange("description")}
	                        type="text"
	                        className="form-control"
	                        value={description}
	                    />
	                </div>
	  

	                <button 
	                    className="btn btn-outline btn-raised"
	                    onClick={this.handleLeave}
                        type="button"
	                >
	                    Cancel
	                </button>
	                <button 
	                    className="btn btn-outline btn-raised btn-success ml-3"
	                    onClick={this.onSubmit}
	                >
	                    Add
	                </button>
	            </form>
	        </div>
        );
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addSection: (section) => dispatch(addSection(section))
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.course.editContent
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AddSection));
