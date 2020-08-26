import React from 'react';
import { isEqual } from "lodash";
import OptimizedComponent from "./OptimizedComponent";


/**
 * The same as {@link OptimizedComponent}, but also has the properties of {@link React.PureComponent}
 * @component
 */
class OptimizedPureComponent extends OptimizedComponent {
    shouldComponentUpdate(nextProps, nextState) {
        /*
            Make the component pure
         */
        if (!isEqual(nextProps, this.props)){
            return true;
        }
        return (!isEqual(nextState, this.state) || !isEqual(nextProps, this.props))
    }
}

export default OptimizedPureComponent;