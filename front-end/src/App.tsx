import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateUser from './(pages)/create-user';
import EditUser from './(pages)/edit-user';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/usuario/criar" />} />
        <Route path="/usuario/criar" element={<CreateUser />} />
        <Route path="/usuario/:id" element={<EditUser />} />
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}
