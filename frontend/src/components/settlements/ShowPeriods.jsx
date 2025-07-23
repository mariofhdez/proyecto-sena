import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fromTimestampToDate } from "../../utils/formatDate";

export default function CompShowPeriods() {
    const [periods, setPeriods] = useState([]);

    useEffect(() => {
        getPeriods();
    }, []);

    const getPeriods = async () => {
        const response = await axios.get("http://localhost:3005/api/period");
        const data = await response.data;
        setPeriods(data);
    }

    const deletePeriod = async (id) => {
        await axios.delete(`http://localhost:3005/api/period/${id}`);
        getPeriods();
    }

    return (
        <div className="container-fluid w-75 text-bg-light mt-6">
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center">Listado de períodos</h3>
                    <NavLink to="/settlements/create" className="btn btn-primary mb-3 float-end"><i className="fa-solid fa-plus"></i> Nuevo período</NavLink>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">Período</th>
                                <th className="text-center">Estado</th>
                                <th className="text-center">Cantidad de empleados</th>
                                <th className="text-center">Devengados</th>
                                <th className="text-center">Deducciones</th>
                                <th className="text-center">Total</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {periods.map((period) => (
                                <tr key={period.id} className="text-center">
                                    <td>{fromTimestampToDate(period.startDate)} - {fromTimestampToDate(period.endDate)}</td>
                                    <td>{period.status}</td>
                                    <td>{period.employeesQuantity}</td>
                                    <td>{period.earningsTotal}</td>
                                    <td>{period.deductionsTotal}</td>
                                    <td>{period.totalValue}</td>
                                    <td className="d-flex gap-2 justify-content-center">
                                        <NavLink to={`/settlements/${period.id}`} className="btn btn-secondary"><i className="fa-duotone fa-solid fa-eye"></i></NavLink>
                                        <NavLink to={`/settlements/open/${period.id}`} className="btn btn-primary"><i className="fa-duotone fa-solid fa-pen-to-square"></i></NavLink>
                                        <button className="btn btn-danger" onClick={() => deletePeriod(period.id)}><i className="fa-solid fa-trash-can"></i></button>
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