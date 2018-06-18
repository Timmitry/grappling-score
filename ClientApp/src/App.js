import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Fighters from './components/fighters/Fighters';
import Fighter from './components/fighters/Fighter';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route exact={true} path='/fighters' component={Fighters} />
    <Route exact={true} path='/fighters/:number' component={Fighter} />
  </Layout>
);
