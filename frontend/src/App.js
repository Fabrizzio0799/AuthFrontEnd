
import './App.css';
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/authContext';
import Login from './pages/Login';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import { ChakraProvider } from '@chakra-ui/react';
import Usuarios from './pages/Usuarios';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path='/' element={
            <ProtectedRoute>
              <Usuarios/>
            </ProtectedRoute>
          }/>
        </Routes>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
