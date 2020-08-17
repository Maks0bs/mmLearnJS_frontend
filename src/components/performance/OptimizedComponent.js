import React, {Component} from 'react';
import { toast } from 'react-toastify'


/**
 * This component allows you to make only one async call at a time to prevent
 * rerenders (and as a consequence duplicate requests to server). This problem is mainly caused by
 * redux changing props. If async is implemented through componentDidMount, it
 * doesn't dynamically change the state (e. g. login time ran out, course info updated).
 * This component updates data, every time the router brings the user to the OptimizedComponent
 */
class OptimizedComponent extends Component {
    upd = 0
    loading = false

    constructor() {
        super();
        /**
            There was an option to put "loading" into global redux state (state.services)
            However, I think it's better to do it this way, as each component has their OWN
            loading indicator, this will allow more flexibility in async calls
            Furthermore, redux global state would cause a lot of unnecessary rerenders
         */
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        /**
         * If we are still loading smth for 30+ seconds, notify user about that,
         * an error might have occurred and a page reload might fix it
         */
        setTimeout(() => {
            if (this.loading || this.state.loading){
                toast.error(
                    <div>
                        Error loading data, try reloading the page
                    </div>
                )
            }
        }, 30000)
    }
    shouldComponentUpdate(nextProps, nextState) {
        /**
         * Always update
         */
        return true;
    }

    /**
     *
     * @returns {boolean} true if you can make initial async calls, false otherwise
     */
    canCallOptimally = () => {
        return this.upd === 1 && !this.state.loading;
    }

    /**
     * Notify component that some, most likely async, loading has started
     */
    startLoading = () => {
        this.loading = true;
        // this.setState({
        //     loading: true
        // })
    }

    /**
     * Notify component that some, most likely async, loading has been terminated
     */
    stopLoading = () => {
        this.loading = false;
        // this.setState({
        //     loading: false
        // })
    }

    render() {
        this.upd++;
        this.upd %= 4;
        return null;
    }
}

export default OptimizedComponent;