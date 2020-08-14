import React, {Component} from 'react';
import { isEqual } from "lodash";
import OptimizedComponent from "./OptimizedComponent";


/**
 * This component's behaviour is very similar to React PureComponent, but it also doesn't permit making
 * initial async calls more than once (this problem is caused due to redux)
 */
class OptimizedPureComponent extends OptimizedComponent {
    shouldComponentUpdate(nextProps, nextState) {
        if (!isEqual(nextProps, this.props)){
            return true;
        }
        return (!isEqual(nextState, this.state) || !isEqual(nextProps, this.props))
    }
}

export default OptimizedPureComponent;