import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import CompLayout from "./layout"
import CompShowEmployees from "./components/employees/ShowEmployees"
import CompCreateEmployee from "./components/employees/CreateEmployee"
import CompEditEmployee from "./components/employees/EditEmployee"
import CompShowNovelties from "./components/novelties/ShowNovelties"
import CompCreateNovelty from "./components/novelties/CreateNovelty"
import CompEditNovelty from "./components/novelties/EditNovelty"
import CompShowPeriods from "./components/settlements/ShowPeriods"
import CompCreatePeriod from "./components/settlements/CreatePeriod"
import CompDetailPeriod from "./components/settlements/DetailPeriod"
import CompOpenPeriod from "./components/settlements/OpenPeriod"
import Login from "./components/auth/Login"
import CompShowConcepts from "./components/concepts/ShowConcepts"
import CompSettingsMenu from "./components/settings"
import CompShowUsers from "./components/users/ShowUsers"
import CompHomeMenu from "./components/home/index"
import CompCreateUser from "./components/users/CreateUser"

// Componente para proteger rutas privadas
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <PrivateRoute>
              <CompLayout />
            </PrivateRoute>
          }>
            <Route path="/" element={<CompHomeMenu />} />
            <Route path="/employees" element={<CompShowEmployees />} />
            <Route path="/employees/create" element={<CompCreateEmployee />} />
            <Route path="/employees/edit/:id" element={<CompEditEmployee />} />
            <Route path="/novelties" element={<CompShowNovelties />} />
            <Route path="/novelties/create" element={<CompCreateNovelty />} />
            <Route path="/novelties/edit/:id" element={<CompEditNovelty />} />
            <Route path="/settlements" element={<CompShowPeriods />} />
            <Route path="/settlements/create" element={<CompCreatePeriod />} />
            <Route path="/settlements/:id" element={<CompDetailPeriod />} />
            <Route path="/settlements/open/:id" element={<CompOpenPeriod />} />
            <Route path="/config" element={<CompSettingsMenu />} />
            <Route path="/config/concepts" element={<CompShowConcepts />} />
            <Route path="/config/users" element={<CompShowUsers />} />
            <Route path="/config/users/create" element={<CompCreateUser />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
