import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/index.css';

import App from './component/App';
import AppTestGraphQL from './component/AppTestGraphQL';

import Amplify from 'aws-amplify';
import config from './aws-exports';

//AWS認証
Amplify.configure(config);

//レンダリング
ReactDOM.render(<AppTestGraphQL />, document.getElementById('root')
);


