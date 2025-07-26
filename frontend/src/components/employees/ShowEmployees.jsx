import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api, { EMPLOYEES_PATH } from "../../utils/apiConfig";

export default function CompShowEmployees() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        getEmployees();
    }, []);

    const getEmployees = async () => {
        const response = await api.get(EMPLOYEES_PATH);
        const data = await response.data;
        setEmployees(data);
    }

    const toggleEmployee = async (id) => {
        try {
            const response = await api.post(`${EMPLOYEES_PATH}/status/${id}`);

            setEmployees((prevEmployees) => 
                prevEmployees.map((e) => e.id === id ? {...response.data }: e)
            )
        } catch (error) {
            console.error(error)
        }
    }

    const deleteEmployee = async (id) => {
        await api.delete(`${EMPLOYEES_PATH}/${id}`);
        getEmployees();
    }

    return (
        <div className="container-fluid w-75 text-bg-light mt-6">
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center fs-2">Listado de empleados</h3>
                    <NavLink to="/employees/create" className="btn btn-success mb-3 float-end fs-5"><i className="fa-solid fa-plus"></i> Nuevo empleado</NavLink>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center fs-4">Identificación</th>
                                <th className="text-center fs-4">Nombre</th>
                                <th className="text-center fs-4">Cargo</th>
                                <th className="text-center fs-4">Estado</th>
                                <th className="text-center fs-4">Salario</th>
                                <th className="text-center fs-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr 
                                    key={employee.id}
                                    className="text-center fs-5"
                                >
                                    <td>{employee.identification}</td>
                                    <td>{employee.firstName} {employee.firstSurname}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.isActive ? 'Activo' : 'Inactivo'}</td>
                                    <td>{employee.salary}</td>
                                    <td className="d-flex gap-2 justify-content-center">
                                        <NavLink to={`${EMPLOYEES_PATH}/${employee.id}`} className="btn btn-info"><i className="fa-solid fa-eye"></i></NavLink>
                                        <NavLink to={`${EMPLOYEES_PATH}/edit/${employee.id}`} className="btn btn-success"><i className="fa-solid fa-pen-to-square"></i></NavLink>
                                        <button className="btn btn-warning" onClick={() => toggleEmployee(employee.id)}><i className={`fa-solid fa-toggle-${employee.isActive ? 'on' : 'off'}`}></i></button>
                                        <button className="btn btn-danger" onClick={() => deleteEmployee(employee.id)}><i className="fa-solid fa-trash-can"></i></button>
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