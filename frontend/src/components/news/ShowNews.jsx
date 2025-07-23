import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function CompShowNews() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        getNews();
    }, []);

    const getNews = async () => {
        const response = await axios.get("http://localhost:3005/api/settlement-news");
        const data = await response.data;
        setNews(data);
    }

    const deleteNew = async (id) => {
        await axios.delete(`http://localhost:3005/api/settlement-news/${id}`);
        getNews();
    }
    
    return (
        <div className="container-fluid w-75 text-bg-light mt-6">
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center">Listado de novedades</h3>
                    <NavLink to="/news/create" className="btn btn-primary mb-3 float-end"><i className="fa-solid fa-plus"></i> Crear novedad</NavLink>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">Id</th>
                                <th className="text-center">Empleado</th>
                                <th className="text-center">Identificación</th>
                                <th className="text-center">Concepto</th>
                                <th className="text-center">Valor</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {news.map((n) => (
                                <tr 
                                    key={n.id}
                                    className="text-center"
                                >
                                    <td>{n.id}</td>
                                    <td>{n.employee.firstName} {n.employee.firstSurname}</td>
                                    <td>{n.employee.identification}</td>
                                    <td>{n.concept.name}</td>
                                    <td>{n.value}</td>
                                    <td className="d-flex gap-2 justify-content-center">
                                        <NavLink to={`/news/edit/${n.id}`} className="btn btn-secondary"><i className="fa-solid fa-pen-to-square"></i></NavLink>
                                        <button className="btn btn-danger" onClick={() => deleteNew(n.id)}><i className="fa-solid fa-trash-can"></i></button>
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