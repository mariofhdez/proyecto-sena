import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CompEditEmployee() {
    const [identification, setIdentification] = useState('');
    const [firstName, setFirstName] = useState('');
    const [otherNames, setOtherNames] = useState('');
    const [firstSurname, setFirstSurname] = useState('');
    const [otherSurnames, setOtherSurnames] = useState('');
    const [salary, setSalary] = useState('');
    const [transportAllowance, setTransportAllowance] = useState(false);
    const [position, setPosition] = useState('');

    const navigate = useNavigate();

    const { id } = useParams();

    const handleUpdate = async (e) => {
        e.preventDefault();
        await axios.patch(`http://localhost:3005/api/employee/${id}`, 
            {
                // identification: identification,
                firstSurname: firstSurname,
                secondSurname: otherSurnames,
                firstName: firstName,
                otherNames: otherNames,
                salary: parseFloat(salary),
                transportAllowance: transportAllowance,
                position: position,
            }
        );
        navigate('/employees');
    }

    useEffect(() => {
        getEmployeeById();
    },[]);

    const getEmployeeById = async () => {
        const response = await axios.get(`http://localhost:3005/api/employee/${id}`);
        const data = await response.data;
        setIdentification(data.identification);
        setFirstName(data.firstName);
        setOtherNames(data.otherNames);
        setFirstSurname(data.firstSurname);
        setOtherSurnames(data.secondSurname);
        setSalary(data.salary);
        setTransportAllowance(data.transportAllowance);
        setPosition(data.position);
    }

    return (
        <div className="container-fluid w-75 text-bg-light mt-8">
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center fs-2">Editar empleado</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="mb-3 px-4">
                            <label htmlFor="identification" className="form-label fs-4">Identificación</label>
                            <input
                                type="text"
                                className="form-control fs-4"
                                id="identification"
                                value={identification}
                                onChange={e => setIdentification(e.target.value)}
                                disabled
                            />
                        </div>
                        <div className="d-flex flex-row gap-4">
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="firstName" className="form-label fs-4">Primer nombre</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="firstName"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="otherNames" className="form-label fs-4">Otros nombres</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="otherNames"
                                    value={otherNames}
                                    onChange={e => setOtherNames(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="d-flex flex-row gap-4">
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="firstSurname" className="form-label fs-4">Primer apellido</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="firstSurname"
                                    value={firstSurname}
                                    onChange={e => setFirstSurname(e.target.value)}
                                />
                            </div>

                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="otherSurnames" className="form-label fs-4">Otros apellidos</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="otherSurnames"
                                    value={otherSurnames}
                                    onChange={e => setOtherSurnames(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="d-flex flex-row gap-4">
                            <div className="px-4 mb-3 w-50">
                                <label htmlFor="salary" className="form-label fs-4">Salario</label>
                                <input
                                    type="number"
                                    className="form-control fs-4"
                                    id="salary"
                                    value={salary}
                                    onChange={e => setSalary(e.target.value)}
                                    step="0.01"
                                />
                            </div>
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="position" className="form-label fs-4">Cargo</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="position"
                                    value={position}
                                    onChange={e => setPosition(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center gap-4 mb-3">
                            <input
                                type="checkbox"
                                name="transportAllowance"
                                id="transportAllowance"
                                checked={transportAllowance}
                                onChange={e => {
                                    if(e.target.checked) {
                                        setTransportAllowance(true);
                                    } else {
                                        setTransportAllowance(false);
                                    }
                                }}
                            />
                            <label htmlFor="transportAllowance" className="form-label fs-4">Auxilio de Transporte</label>
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