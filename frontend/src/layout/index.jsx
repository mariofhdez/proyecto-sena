import { NavLink, Outlet } from "react-router-dom";

export default function CompLayout() {
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
                            <li className="nav-item">
                                <NavLink to="/config" className={({ isActive }) => isActive ? 'nav-link active fs-4' : 'nav-link fs-4'}>Configuración</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="navbar-nav d-flex flex-row gap-5">
                        {/* Editar para que en vez de usuario salga el nombre e implementar lógica de cerrar sesión */}
                        <span className="navbar-text fs-4">Usuario</span>
                        <button className="btn btn-outline-dark fs-4">Cerrar sesión</button>
                    </div>
                </div>
            </nav>
            <main>
                <Outlet />
            </main>
        </>
    )
}