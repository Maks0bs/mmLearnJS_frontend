import React, {Component} from 'react';
import { connect } from 'react-redux'
import { deleteUser } from "../../../services/actions";
import { Redirect } from 'react-router-dom'
import { addToast } from '../../../../../../../components/ToastRoot/services/actions'
import {logout} from "../../../../../../../services/main/actions";

class DeleteUser extends Component {
    constructor() {
        super();

        this.state = {
            redirectToHome: false
        }
    }



    handleLeave = () => {
        this.props.onClose && this.props.onClose();
    }

    componentWillUnmount(){
        this.handleLeave();
    }


    onDelete = (e) => {
        e.preventDefault();
        this.props.deleteUser(this.props.userId)
            .then(() => {
                if (this.props.error) throw {
                    message: 'Problem with deleting user'
                }

                this.props.logout();
            })
            .then(() => {
                if (this.props.error) throw {
                    message: 'Problem with logging out'
                }

                this.setState({
                    redirectToHome: true
                })

                return this.props.addToast(
                    (
                        <div>
                            User deleted successfully
                        </div>
                    ),
                    {
                        type: 'info'
                    }
                )
            })
            .catch(err => {
                this.displayError(err.message);
            })
    }

    displayError = (text) => {
        return this.props.addToast(
            (
                <div>
                    {this.props.error || text.message}
                </div>
            ),
            {
                type: 'error'
            }
        )
    }

    render() {
        if (this.state.redirectToHome){
            this.handleLeave();
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div className="mt-4">
                <h1>Are you sure you want to delete this user?</h1>
                <button
                    className="btn btn-outline"
                    onClick={this.handleLeave}
                    type="button"
                >
                    Cancel
                </button>
                <button
                    className="btn btn-outline btn-danger ml-3"
                    type="button"
                    onClick={this.onDelete}
                >
                    Delete
                </button>
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        ...state.views.classroom.user
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (userId) => dispatch(deleteUser(userId)),
        addToast: (component, options) => dispatch(addToast(component, options)),
        logout: () => dispatch(logout())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeleteUser);