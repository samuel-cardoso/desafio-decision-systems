import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateUser from './(pages)/CreateUser';
// import EditUser from './(pages)/EditUser';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/usuario/criar" />} />
        <Route path="/usuario/criar" element={<CreateUser />} />
        {/* <Route path="/usuario/:id" element={<EditUser />} /> */}
        <Route path="*" element={<div>Página não encontrada</div>} />
      </Routes>
    </BrowserRouter>
  );
}
