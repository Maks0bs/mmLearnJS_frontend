import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

/*
 * Important for custom toasts
 */
toast.configure();

/**
 * Allows to display toast in left bottom corner.
 * Uses redux state, which makes it more flexible.
 * There should only be one ToastRoot per app.
 * @component
 */
class ToastRoot extends Component {
    render() {
        return (
            <div>
                <ToastContainer
                    autoClose={4000}
                    position="bottom-left"
                />
            </div>
        );
    }
}

export default ToastRoot;
