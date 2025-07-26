
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import api, { NOVELTIES_PATH } from "../../utils/apiConfig";
import { fromTimestampToDate } from "../../utils/formatDate";

export default function CompShowNovelties() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        const response = await api.get(NOVELTIES_PATH);
        const data = await response.data;
        setNews(data);
    }

    const deleteNew = async (id) => {
        await api.delete(`${NOVELTIES_PATH}/${id}`);
        getNews();
    }
    
    return (
        <div className="container-fluid w-75 text-bg-light mt-6">
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center fs-2">Listado de novedades</h3>
                    <NavLink to="/novelties/create" className="btn btn-success mb-3 float-end fs-5"><i className="fa-solid fa-plus"></i> Crear novedad</NavLink>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center fs-4">Id</th>
                                <th className="text-center fs-4">Fecha</th>
                                <th className="text-center fs-4">Empleado</th>
                                <th className="text-center fs-4">Identificación</th>
                                <th className="text-center fs-4">Concepto</th>
                                <th className="text-center fs-4">Valor</th>
                                <th className="text-center fs-4">Valor</th>
                                <th className="text-center fs-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.map((n) => (
                                <tr 
                                    key={n.id}
                                    className="text-center fs-5"
                                >
                                    <td>{n.id}</td>
                                    <td>{fromTimestampToDate(n.date)}</td>
                                    <td>{n.employee.firstName} {n.employee.firstSurname}</td>
                                    <td>{n.employee.identification}</td>
                                    <td>{n.concept.name}</td>
                                    <td>{n.status === 'APPLIED' ? 'APLICADA': 'PENDIENTE'}</td>
                                    <td>{n.value}</td>
                                    <td className="d-flex gap-2 justify-content-center">
                                        <NavLink to={`/novelties/edit/${n.id}`} className={n.status === 'APPLIED' ? "btn btn-success disabled":"btn btn-success"}><i className="fa-solid fa-pen-to-square"></i></NavLink>
                                        <button className={n.status === 'APPLIED' ? "btn btn-danger disabled":"btn btn-danger"} onClick={() => deleteNew(n.id)}><i className="fa-solid fa-trash-can"></i></button>
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