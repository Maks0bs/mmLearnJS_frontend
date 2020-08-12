import React, {Component} from 'react';
import { isEqual } from "lodash";


/**
 * This component's behaviour is very similar to React PureComponent, but it also doesn't permit making
 * initial async calls more than once (this problem is caused due to redux)
 */
class OptimizedComponent extends Component {
    upd = 0

    /**
     * @param nextProps new props that the component receives
     * @param nextState new state that the component receives
     * @returns {boolean} true if another render with new props / state should occur, false otherwise
     */
    shouldComponentUpdate(nextProps, nextState) {
        if (!isEqual(nextProps, this.props)){
            return true;
        }
        return (!isEqual(nextState, this.state) || !isEqual(nextProps, this.props))
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