import { Routes } from 'react-router';
import { Route } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { Registration } from './components/Registration';
import { Login } from './components/Login';
import { Account } from './components/Account';
import { PeopleList } from './components/PeopleList';
import { NotFound } from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Registration />} />
      <Route path='/login' element={<Login />} />
      <Route path='/account' element={<Account />} />
      <Route path='/people' element={<PeopleList />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
}

export default App;
