import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { Users } from './pages/Users';
import { Header } from './components/Header';

function App() {
  return (
    <div className="app-background">
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />

          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;
