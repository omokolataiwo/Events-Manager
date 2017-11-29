import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import routes from './route';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension(): f => f
  )
);

ReactDOM.render(
<Provider store={store}>
<Router history={browserHistory} routes={routes} />
</Provider>, document.getElementById('app'));
