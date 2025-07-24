import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BASE_URL, USERS_PATH } from "../../utils/apiConfig";

const URI = `${BASE_URL}${USERS_PATH}`;
const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
    }
};


export default function CompShowUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get(URI, config);
        const data = await response.data;
        setUsers(data);
    }

    const toggleUser = async (id, status) => {
        try {
            const body = { isActive: !status}
            const response = await axios.patch(`${URI}/status/${id}`, body, config);
            const data = await response.data;
    
            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u.id === id ? { ...data } : u
                )
            );
        } catch (error) {
            console.error('Error actualizando usuario:', error);
        }
    }

    const deleteUser = async (id) => {
        await axios.delete(`${URI}/${id}`, config);
        getUsers();
    }

    return (
        <div className="container-fluid w-75 text-bg-light mt-6">
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center">Listado de empleados</h3>
                    <NavLink to="/config/users/create" className="btn btn-primary mb-3 float-end"><i className="fa-solid fa-plus"></i> Nuevo usuario</NavLink>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">Id</th>
                                <th className="text-center">Nombre</th>
                                <th className="text-center">Email</th>
                                <th className="text-center">Rol</th>
                                <th className="text-center">Estado</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr
                                    key={u.id}
                                    className="text-center"
                                >
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role}</td>
                                    <td>{u.isActive ? 'Activo' : 'Inactivo'}</td>
                                    <td className="d-flex gap-2 justify-content-center">
                                        <NavLink to={`${USERS_PATH}/edit/${u.id}`} className="btn btn-secondary"><i className="fa-solid fa-pen-to-square"></i></NavLink>
                                        <button className="btn btn-success" onClick={() => toggleUser(u.id, u.isActive)}><i className="fa-solid fa-toggle-off"></i></button>
                                        <button className="btn btn-danger" onClick={() => deleteUser(u.id)}><i className="fa-solid fa-trash-can"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}