import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

toast.configure();
class ToastRoot extends Component {
    render() {
        return (
            <div>
                <ToastContainer
                    autoClose={7000}
                    position="bottom-left"
                />
            </div>
        );
    }
}

export default ToastRoot;
