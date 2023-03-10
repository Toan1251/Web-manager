import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NavigationBar from './components/NavigationBar/NavigationBar';
import ImportProject from './pages/ImportProject'
import DependenciesResult from './pages/DependenciesResult';
import SubDependencies from './pages/SubDependencies';
import CrawlSite from './pages/CrawlSite';
import CrawlResult from './pages/CrawlResult'
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <NavigationBar />
      <main>
        <Switch>
          <Route exact path="/import/result/:id">
            <DependenciesResult />
          </Route>
          <Route exact path='/import/dependency'>
            <SubDependencies />
          </Route>
          <Route exact path="/import">
            <ImportProject />
          </Route>
          <Route path='/crawl/result/:id'>
            <CrawlResult />
          </Route>
          <Route path="/crawl">
            <CrawlSite />
          </Route>
          <Route path='/'>
            <HomePage />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
