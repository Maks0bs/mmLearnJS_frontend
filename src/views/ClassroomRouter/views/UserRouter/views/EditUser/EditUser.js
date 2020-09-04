import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from "react-router-dom";
import { updateUser, getUser, editUserData, cleanup } from '../../services/actions'
import { addToast } from '../../../../../../components/ToastRoot/services/actions'
import { showModal, hideModal } from "../../../../../../components/ModalRoot/services/actions";
import EditFields from "./components/EditUserHiddenFields"
import DeleteUser from "./components/DeleteUserDialog";
import EditUserPhoto from "./components/EditUserPhoto";
import EditUserBasicData from "./components/EditUserBasicData";
import {EDITABLE_USER_FIELDS} from "../../services/helpers";
import BigLoadingAbsolute from "../../../../../../components/reusables/BigLoadingAbsolute";

/**
 * The page which allows users to edit
 * data of their account
 * @memberOf components.views.classroom.user
 * @component
 */
class EditUser extends Component {

    constructor(props){
        super(props)
        this.state = {
            redirect: false,
            loading: false
        }
    }

    componentWillUnmount() {
        this.props.cleanup();
    }

    componentDidMount() {
        let { authenticatedUser, user } = this.props;
        let preData = {};
        for (let key of EDITABLE_USER_FIELDS){
            if (user.hasOwnProperty(key)){
                preData[key] = user[key];
            }
        }
        // Pre-populate all forms
        this.props.editUserData({...preData})
        // Only authenticated users can edit their user page
        if (!authenticatedUser || (authenticatedUser._id !== user._id) ){
            this.setState({redirect: true})
        }
    }

    onEditFields = (e) => {
        e.preventDefault();
        this.props.showModal(<EditFields onClose={this.props.hideModal}/>)
    }

    onShowDeleteUser = (e) => {
        e.preventDefault();
        this.props.showModal(
            <DeleteUser
                onClose={this.props.hideModal}
                userId={this.props.user._id}
            />
        )
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({loading: true})
        this.props.updateUser(
            {
                // The photo file gets handled in the actions itself
                ...this.props.newUserData,
                hiddenFields: this.props.newHiddenFields
            }, this.props.user._id
        )
            .then(() => {
                if (!this.props.error){
                    this.setState({redirect: true, loading: false})
                    this.props.addToast(
                        (<div>User info updated successfully</div>),
                        {type: 'success'}
                    )
                } else {
                    this.props.addToast(
                        (<div>{this.props.error}</div>),
                        {type: 'error'}
                    )
                }
            })
    }

    onCancel = (e) => {
        e.preventDefault();
        this.setState({redirect: true})
    }

    render() {
        let {  redirect } = this.state;
        let { error } = this.props;


        if (redirect){
            return (<Redirect to={`/classroom/user/${this.props.user._id}`}/>)
        }

        let isMobileWidth = (window.innerWidth <= 1000);
        return (
            <div
                className="container my-4"
                style={{width: isMobileWidth ? '85%' : '65%'}}
            >
                {this.state.loading && (<BigLoadingAbsolute />)}
                <div
                    className="alert alert-danger"
                    style={{display: error ? "" : "none"}}
                >
                    {error}
                </div>

                <EditUserPhoto />
                <hr />
                <EditUserBasicData
                    onSubmit={this.onSubmit}
                    onCancel={this.onCancel}
                    onShowEditFields={this.onEditFields}
                    onShowDeleteUser={this.onShowDeleteUser}
                />
            </div>
        )
    }
}

let mapStateToProps = (state) => ({
    ...state.views.classroom.user,
    ...state.services
})
let mapDispatchToProps = (dispatch) => ({
    updateUser: (data, id) => dispatch(updateUser(data, id)),
    editUserData: (data) => dispatch(editUserData(data)),
    getUser: (id) => dispatch(getUser(id)),
    addToast: (component, options) => dispatch(addToast(component, options)),
    showModal: (component) => dispatch(showModal(component)),
    hideModal: () => dispatch(hideModal()),
    cleanup: () => dispatch(cleanup())
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditUser)