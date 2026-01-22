import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { PrivateRoute } from './components/PrivateRoute';
import { Users } from './pages/Users';
import { Header } from './components/Header';
import { NotFound } from './pages/NotFound';
import { Footer } from './components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className="app-background">
        <Header />

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

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div >
    </BrowserRouter>
  );
}

export default App;
