import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home, Blogs, Login, Register, Authors, Notfound, DetailBlog, CreateBlogs, CreateAuthors } from './pages';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path={'/'} component={Home} exact />
          <Route path={'/blogs'} component={Blogs} />
          <Route path={'/create-blogs'} component={CreateBlogs} />
          <Route path={'/create-authors'} component={CreateAuthors} />
          <Route path={'/blog/:id'} component={DetailBlog} />

          {/* Protected Route */}
          <Route path={'/authors'} component={Authors} />
          <Route path={'/login'} component={Login} />
          <Route path={'/register'} component={Register} />
          <Route path={'*'} component={Notfound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
