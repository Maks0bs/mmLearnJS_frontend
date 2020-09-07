import React, {Component} from 'react';


/**
 * This component allows you to make only one async call at a time to prevent
 * rerenders (and as a consequence duplicate requests to server). This problem is mainly caused by
 * redux changing props, when redux state gets updated. Mainly due to shallow comparison: the data,
 * received from an API call stays the same, but reducers update the store with a deep copy of it.
 * If async is implemented through componentDidMount, it
 * doesn't dynamically change the state (e. g. login time ran out, course info updated).
 * This component should be mainly implemented in routers, that are connected to redux store
 * and get rendered on every page update.
 *
 * @property {number} upd - this is the most important variable, that counts the amount of renders
 * of the component and doesn't allow additional (useless) calls
 * @property {boolean} loading - also optimizes the component: there is no point to make another
 * api async call, if the same has been called moments ago
 * @property {function(): boolean} canCallOptimally if returns true, another additional
 * call is allowed
 * @property {function(): void} startLoading sets {@link loading} to true
 * @property {function(): void} stopLoading sets {@link loading} to false
 *
 * @memberOf components.common
 * @component
 */
class OptimizedComponent extends Component {
    upd = 0
    loading = false

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        /*
         * If we are still loading smth for 30+ seconds, notify user about that,
         * an error might have occurred and a page reload might fix it
         */
        setTimeout(() => {
            if (this.loading || this.state.loading){
                console.log('Error loading data, try reloading the page');
            }
        }, 30000)
    }
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    canCallOptimally = () => {
        return this.upd === 1 && !this.state.loading;
    }

    startLoading = () => {
        this.loading = true;
        /*
            There is an option to use this.state.loading as well
         */
    }

    stopLoading = () => {
        this.loading = false;
        /*
            There is an option to use this.state.loading as well
         */
    }

    render() {
        this.upd++;
        this.upd %= 4;
        return null;
    }
}

export default OptimizedComponent;