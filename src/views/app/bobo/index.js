import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Eleves = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './eleves')
);

const Formulaire = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './formulaire')
);
const Page = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './page')
);

const Bobo = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/eleves`} />
      <Route
        path={`${match.url}/eleves`}
        render={props => <Eleves {...props} />}  
      />
       <Route
        path={`${match.url}/edit/1`}
        render={props => <Formulaire {...props} />}
      />

       <Route
        path={`${match.url}/edit/2`}
        render={props => <Page {...props} />}
      /> 
      
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Bobo;
