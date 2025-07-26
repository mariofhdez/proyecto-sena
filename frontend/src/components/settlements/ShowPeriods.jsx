import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { fromTimestampToDate } from "../../utils/formatDate";
import api, { PERIODS_PATH } from "../../utils/apiConfig";

export default function CompShowPeriods() {
    const [periods, setPeriods] = useState([]);

    useEffect(() => {
        getPeriods();
    }, []);

    const getPeriods = async () => {
        const response = await api.get(PERIODS_PATH);
        const data = await response.data;
        setPeriods(data);
    }

    const deletePeriod = async (id) => {
        await api.delete(`${PERIODS_PATH}/${id}`);
        getPeriods();
    }

    return (
        <div className="container-fluid w-75 text-bg-light mt-6">
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center fs-2">Listado de períodos</h3>
                    <NavLink to="/settlements/create" className="btn btn-success mb-3 float-end fs-5"><i className="fa-solid fa-plus"></i> Nuevo período</NavLink>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center fs-4">Período</th>
                                <th className="text-center fs-4">Estado</th>
                                <th className="text-center fs-4">Cantidad de empleados</th>
                                <th className="text-center fs-4">Devengados</th>
                                <th className="text-center fs-4">Deducciones</th>
                                <th className="text-center fs-4">Total</th>
                                <th className="text-center fs-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {periods.map((period) => (
                                <tr key={period.id} className="text-center fs-5">
                                    <td>{fromTimestampToDate(period.startDate)} - {fromTimestampToDate(period.endDate)}</td>
                                    <td>{period.status}</td>
                                    <td>{period.employeesQuantity}</td>
                                    <td>{period.earningsTotal}</td>
                                    <td>{period.deductionsTotal}</td>
                                    <td>{period.totalValue}</td>
                                    <td className="d-flex gap-2 justify-content-center">
                                        <NavLink to={`/settlements/${period.id}`} className="btn btn-info"><i className="fa-duotone fa-solid fa-eye"></i></NavLink>
                                        <NavLink to={`/settlements/open/${period.id}`} className={period.status === 'DRAFT' ? "btn btn-success" : "btn btn-success disabled" }><i className="fa-duotone fa-solid fa-pen-to-square"></i></NavLink>
                                        <button className={period.status === 'DRAFT' ?"btn btn-danger":"btn btn-danger disabled"} onClick={() => deletePeriod(period.id)}><i className="fa-solid fa-trash-can"></i></button>
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