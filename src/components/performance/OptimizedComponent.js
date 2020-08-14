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

    componentDidMount() {
        setTimeout(() => {
            if (this.loading){
                toast.error(
                    <div>
                        Error loading data, try reloading the page
                    </div>
                )
            }
        }, 30000)
    }


    /**
     * @param nextProps new props that the component receives
     * @param nextState new state that the component receives
     * @returns {boolean} true if another render with new props / state should occur, false otherwise
     */
    shouldComponentUpdate(nextProps, nextState) {
        // if (!isEqual(nextProps, this.props)){
        //     return true;
        // }
        // return (!isEqual(nextState, this.state) || !isEqual(nextProps, this.props))
        return true;
    }

    /**
     *
     * @returns {boolean} true if you can make initial async calls, false otherwise
     */
    canCallOptimally = () => {
        return this.upd === 1;
    }

    render() {
        this.upd++;
        this.upd %= 4;
        return null;
    }
}

export default OptimizedComponent;