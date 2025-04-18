import { Provider } from 'react-redux';
import store, { persistor } from '@/store';
import { ThemeProvider } from './context/ThemeProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import type { JSX } from 'react';
import NotFound from './pages/404';
import Login from './pages/login';
import Home from './pages/home';

// 鉴权组件
const AuthRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('authToken') || true;
  return token ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route
                path="/home"
                element={
                  <AuthRoute>
                    <Home />
                  </AuthRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}
