import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContextWrapper } from "./context/GlobalContext";
import { PublicLayout } from './layout/PublicLayout';
import { UserLayout } from './layout/UserLayout';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { NoPage } from './pages/NoPage';
import { List } from './pages/List';
import { Dashboard } from './pages/dashboard/Dashboard';
import { AdminTotal } from './pages/total/AdminTotal';
import { AdminNewTotal } from './pages/total/AdminNewTotal';
import { AdminEditTotal } from './pages/total/AdminEditTotal';
import { Users } from './pages/users/Users';

function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={PublicLayout}>
            <Route index path='/' element={<Home />}></Route>
            <Route path='/list' element={<List />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/login' element={<Login />}></Route>
          </Route>
          <Route Component={UserLayout}>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/total' element={<AdminTotal />}></Route>
          <Route path='/total/new' element={<AdminNewTotal />}></Route>
          <Route path='/total/:total/edit' element={<AdminEditTotal />}></Route>
          <Route path='/users' element={<Users />}></Route>
          </Route>
          <Route Component={PublicLayout}>
            <Route path='*' element={<NoPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  );
}

export default App;