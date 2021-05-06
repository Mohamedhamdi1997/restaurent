import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const Start = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './start')
);

const ListeInf = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './listInfo')
);

const ListeLivre = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './listLivre')
);
const ListeMode = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './listMode')
);
const ListeAuto = React.lazy(() =>
  import(/* webpackChunkName: "start" */ './listAuto')
);

const Gogo = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/start`} />
      <Route
        path={`${match.url}/start`}
        render={props => <Start {...props} />}  
      />
       
      <Route
        path={`${match.url}/products/1`}
        render={props => <ListeInf {...props} />}
      />
      <Route
        path={`${match.url}/products/2`}
        render={props => <ListeLivre {...props} />}
      /> 
      <Route
        path={`${match.url}/products/3`}
        render={props => <ListeMode {...props} />}
      /> 
      <Route
        path={`${match.url}/products/4`}
        render={props => <ListeAuto {...props} />}
      /> 
       
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Gogo;
