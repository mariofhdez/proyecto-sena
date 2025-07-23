import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function CompLayout() {
    const navigate = useNavigate();
    let userName = "Usuario";
    let userRole = null;
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decoded = jwtDecode(token);
            userName = decoded.name || decoded.email || "Usuario";
            userRole = decoded.role || null;
        } catch {
            userName = "Usuario";
            userRole = null;
        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <>
            <nav className="navbar text-bg-secondary styles-navbar">
                <div className="container-fluid justify-content-between">
                    <div className="d-flex flex-row">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row gap-4">
                            <li className="nav-item">
                                <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active fs-4' : 'nav-link fs-4'}>Inicio</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/employees" className={({ isActive }) => isActive ? 'nav-link active fs-4' : 'nav-link fs-4'}>Empleados</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/news" className={({ isActive }) => isActive ? 'nav-link active fs-4' : 'nav-link fs-4'}>Novedades</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/settlements" className={({ isActive }) => isActive ? 'nav-link active fs-4' : 'nav-link fs-4'}>Liquidaciones</NavLink>
                            </li>
                            {userRole === "ADMIN" && (
                                <li className="nav-item">
                                    <NavLink to="/config" className={({ isActive }) => isActive ? 'nav-link active fs-4' : 'nav-link fs-4'}>Configuración</NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="navbar-nav d-flex flex-row gap-5 align-items-center">
                        <span className="navbar-text fs-4 text-capitalize"><i className="fa fa-user me-2"></i>{userName}</span>
                        <button className="btn btn-outline-dark fs-4" onClick={handleLogout}>Cerrar sesión</button>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    )
}