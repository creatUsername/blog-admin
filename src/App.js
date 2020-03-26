import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import routes from './routerMap'
import MyLayout from './layout/admin'
import Cookies from 'js-cookie'

const App = () => {
  return (
    <Router>
      <MyLayout>
        <Switch>
          {
            routes.map(route => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  exact={route.exact}
                  render={routeProps => (
                    !route.auth
                      ?
                      (<route.component {...routeProps} />)
                      :
                      (Cookies.get('blog-admin-token') ? <route.component {...routeProps} /> : <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />)
                  )}
                />
              )
            })
          }
          <Redirect from="/*" to="/404" />
        </Switch>
      </MyLayout>
    </Router>
  )
}

export default App