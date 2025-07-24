import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_PATH, BASE_URL } from "../../utils/apiConfig";

const URI = `${BASE_URL}${AUTH_PATH}/register`;

export default function CompCreateUser() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(
            URI,
            {
                email: email,
                role: role,
                name: name,
                password: password,
            }
        );
        navigate(`/config/users`);
    }

    return (
        <div className="container-fluid w-75 text-bg-light mt-8">
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center fs-2">Crear empleado</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex flex-row gap-4">
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="email" className="form-label fs-4">Email</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
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
                                />
                            </div>

                        </div>
                        <div className="d-flex flex-row gap-4">
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="password" className="form-label fs-4">Contraseña</label>
                                <input
                                    type="password"
                                    className="form-control fs-4"
                                    id="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="role" className="form-label fs-4">Perfil de usuario</label>
                                <select 
                                    type="text"
                                    className="form-control fs-4"
                                    value={role} 
                                    onChange={e => setRole(e.target.value)}
                                >
                                    <option value="">Seleccione un rol</option>
                                    <option value="ADMIN">Administrador</option>
                                    <option value="USER">Usuario</option>
                                </select>
                            </div>

                        </div>

                        <div className="d-flex justify-content-center mb-3">
                            <button className="btn btn-primary fs-4" type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}