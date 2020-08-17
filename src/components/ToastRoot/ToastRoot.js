import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

/**
 * Important for custom toasts
 */
toast.configure();

/**
 * Allows to display toasts, implemented with redux, makes it more flexible
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
