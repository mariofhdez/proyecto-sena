import api, { CONCEPTS_PATH } from "../../utils/apiConfig";
import { useEffect, useState } from "react";

export default function CompShowConcepts() {
    const [ concepts, setConcepts ] = useState([]);

    useEffect(() => {
        getConcepts();
    }, []);

    const getConcepts = async () => {
        const response = await api.get(CONCEPTS_PATH);
        const data = await response.data;
        setConcepts(data);
    }

    return (
        <div className="container-fluid w-75 text-bg-light mt-6">
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center">Listado de conceptos</h3>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">Id</th>
                                <th className="text-center">Código</th>
                                <th className="text-center">Nombre</th>
                                <th className="text-center">Tipo de concepto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {concepts.map((c) => (
                                <tr 
                                    key={c.id}
                                    className="text-center"
                                >
                                    <td>{c.id}</td>
                                    <td>{c.code}</td>
                                    <td>{c.name}</td>
                                    <td>{c.type}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}