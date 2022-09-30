import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Login from 'views/Login/Login';
import SignUp from 'views/SignUp/SignUp';
import Home from 'views/Home/Home';
import ToDoList from 'views/ToDoList/ToDoList';
import Completed from 'views/Completed/Completed';

import Layout from 'components/common/Layout';

import {
  LOGIN,
  HOME,
  TO_DO_LIST,
  COMPLETED,
  SIGN_UP
} from 'config/routes/paths';
import { AuthContextProvider } from 'contexts/authContext';
import PublicRoute from 'components/router/PublicRoute';
import PrivateRoute from 'components/router/PrivateRoute';

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={LOGIN} element={<PublicRoute />}>
            <Route index element={<Login />}></Route>
            <Route path={SIGN_UP} element={<SignUp />}></Route>
          </Route>
          <Route path={HOME} element={<PrivateRoute />}>
            <Route path={HOME} element={<Layout />}>
              <Route index element={<Home />}></Route>
              <Route path={TO_DO_LIST} element={<ToDoList />}></Route>
              <Route path={COMPLETED} element={<Completed />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
