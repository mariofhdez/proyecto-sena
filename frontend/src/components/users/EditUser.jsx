import api, { USERS_PATH } from "../../utils/apiConfig";
import { useNavigate, useParams, useLocation, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CompEditUser() {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    }


    const { id } = useParams();
    const location = useLocation();
    const editMode = location.pathname.includes('/edit/');
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState('');
    const [role, setRole] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();
        await api.patch(`${USERS_PATH}/${id}`, {
            email: email,
            name: name,
            password: password
        });
        navigate(`/config/users`);
    }

    const toggleUser = async (id, isActive) => {
        const body = { isActive: !isActive }
        const response = await api.patch(`${USERS_PATH}/status/${id}`, body, config);
        const data = await response.data;
        setIsActive(data.isActive);
    }

    const handleDelete = async () => {
        await api.delete(`${USERS_PATH}/${id}`, config)
    }

    useEffect(() => {
        getUserById(id);
    }, []);

    const getUserById = async (id) => {
        const response = await api.get(`${USERS_PATH}/${id}`, config);
        const data = await response.data;
        setEmail(data.email);
        setName(data.name);
        setRole(data.role);
        setIsActive(data.isActive);
    }

    return (
        <div className="container-fluid w-75 text-bg-light mt-8">
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center fs-2">Usuario</h3>
                    <div className={!editMode ? "d-flex justify-content-end gap-3" : "d-none"}>
                        <button onClick={toggleUser} className="btn btn-primary mb-3 float-end">{`${isActive ? 'Desactivar' : 'Activar'} usuario`}</button>
                        <NavLink onClick={handleDelete} to={`edit/${id}`} className="btn btn-danger mb-3 float-end">Eliminar empleado</NavLink>
                    </div>
                    <form onSubmit={handleUpdate}>
                        <div className="d-flex flex-row gap-4">
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="email" className="form-label fs-4">Email</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    disabled={!editMode}
                                />
                            </div>
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="name" className="form-label fs-4">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    disabled={!editMode}
                                />
                            </div>

                        </div>
                        <div className="d-flex flex-row gap-4">
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="status" className="form-label fs-4">Estado</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="status"
                                    value={isActive ? 'Activo' : 'Inactivo'}
                                    onChange={e => setIsActive(e.target.value)}
                                    disabled={!editMode}

                                />
                            </div>
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="role" className="form-label fs-4">Perfil de usuario</label>
                                <select
                                    type="text"
                                    className="form-control fs-4"
                                    value={role}
                                    onChange={e => setRole(e.target.value)}
                                    disabled={true}

                                >
                                    <option value="">Seleccione un rol</option>
                                    <option value="ADMIN">Administrador</option>
                                    <option value="USER">Usuario</option>
                                </select>
                            </div>

                        </div>

                        <div className={editMode === true ? "d-flex justify-content-center mb-3" : "d-none"}>
                            <button className={"btn btn-primary fs-4"} type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}