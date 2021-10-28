import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Blogs, Login, Register, Authors, Notfound, DetailBlog, CreateBlogs, CreateAuthors } from './pages';
import Navbar from './components/Navbar';
import { ProtectedRoute, LoginProtected } from './protected/routes';
import { auth } from './api/controller';
import Logout from './pages/Logout';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path={'/'} component={Home} exact />
          <Route path={'/blogs'} component={Blogs} />
          <ProtectedRoute path={'/create-blogs'} component={CreateBlogs} isAuth={auth()} />
          <ProtectedRoute path={'/create-authors'} component={CreateAuthors} isAuth={auth()} />
          <Route path={'/blog/:id'} component={DetailBlog} />

          {/* Protected Route */}
          <Route path={'/authors'} component={Authors} />
          <LoginProtected path={'/login'} component={Login} isAuth={auth()} />
          <LoginProtected path={'/register'} component={Register} isAuth={auth()} />
          <ProtectedRoute path={'/logout'} component={Logout} isAuth={auth()} />
          <Route path={'*'} component={Notfound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
