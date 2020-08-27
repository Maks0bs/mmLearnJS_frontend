
    window.reactComponents = {};

    window.vueComponents = {};

  
      import React from "react";

      import ReactDOM from "react-dom";


      import ReactWrapper from '../node_modules/better-docs/lib/react-wrapper.js';

      window.React = React;

      window.ReactDOM = ReactDOM;

      window.ReactWrapper = ReactWrapper;

    
    import './styles/reset.css';

    import './styles/iframe.css';

  import Component0 from '../src/App.js';
reactComponents['App'] = Component0;

import Component1 from '../src/components/reusables/BigLoadingCentered.js';
reactComponents['BigLoadingCentered'] = Component1;

import Component2 from '../src/components/ModalRoot/ModalRoot.js';
reactComponents['ModalRoot'] = Component2;

import Component3 from '../src/components/reusables/navbar/NavDropdown.js';
reactComponents['NavDropdown'] = Component3;

import Component4 from '../src/components/reusables/navbar/NavItem.js';
reactComponents['NavItem'] = Component4;

import Component5 from '../src/components/reusables/navbar/NotificationItem.js';
reactComponents['NotificationItem'] = Component5;

import Component6 from '../src/components/performance/OptimizedComponent.js';
reactComponents['OptimizedComponent'] = Component6;

import Component7 from '../src/components/performance/OptimizedPureComponent.js';
reactComponents['OptimizedPureComponent'] = Component7;

import Component8 from '../src/components/performance/Reload.js';
reactComponents['Reload'] = Component8;

import Component9 from '../src/components/reusables/SmallLoading.js';
reactComponents['SmallLoading'] = Component9;

import Component10 from '../src/components/ToastRoot/ToastRoot.js';
reactComponents['ToastRoot'] = Component10;

import Component11 from '../src/components/reusables/UserPreview.js';
reactComponents['UserPreview'] = Component11;