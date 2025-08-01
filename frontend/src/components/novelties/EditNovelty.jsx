import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { NOVELTIES_PATH, EMPLOYEES_PATH, CONCEPTS_PATH } from "../../utils/apiConfig";

export default function CompEditNovelty() {
    const [date, setDate] = useState('');
    const [employee, setEmployee] = useState('');
    const [concept, setConcept] = useState('');
    const [quantity, setQuantity] = useState('');
    const [value, setValue] = useState('');
    const [factor, setFactor] = useState('');
    const [concepts, setConcepts] = useState([]);
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();

    const { id } = useParams();

    const handleUpdate = async (e) => {
        e.preventDefault();
        await api.patch(`${NOVELTIES_PATH}/${id}`, 
            {
                date: date,
            employeeId: parseInt(employee),
            conceptId: parseInt(concept),
            quantity: parseFloat(quantity),
            value: parseFloat(value)
            }
        );
        navigate('/novelties');
    }

    useEffect(() => {
        getNewById();
        getEmployees();
        getConcepts();
    },[]);

    const getNewById = async () => {
        const response = await api.get(`${NOVELTIES_PATH}/${id}`);
        const data = await response.data;
        setDate(fromTimestampToDate(data.date));
        setEmployee(data.employeeId);
        setConcept(data.conceptId);
        setQuantity(data.quantity ? data.quantity : '');
        setFactor(data.concept.factor ? data.concept.factor : '');
        setValue(data.value);

        const selectedConcept = concepts.find(concept => concept.id === parseInt(data.conceptId));

            if (data.concept.calculationType === 'FACTORIAL' || data.concept.calculationType === 'LINEAL') {
                document.getElementById('factor-quantity').classList.remove('d-none');
                document.getElementById('factor-quantity').classList.add('d-flex');
                document.getElementById('value').disabled = true;
                setFactor(selectedConcept.factor);
            } else {
                document.getElementById('factor-quantity').classList.remove('d-flex');
                document.getElementById('factor-quantity').classList.add('d-none');
                document.getElementById('value').disabled = false;
                setFactor('');
            }

    }

    function fromTimestampToDate(timestamp) {
        const date = new Date(timestamp);
        const newDate = date.toISOString().split('T')[0];
        return newDate;
    }

    const getEmployees = async () => {
        const response = await api.get(`${EMPLOYEES_PATH}`);
        const data = await response.data;
        setEmployees(data);
    }

    const getConcepts = async () => {
        const response = await api.get(`${CONCEPTS_PATH}`);
        const data = await response.data;
        setConcepts(data);
    }

    const handleChangeEmployee = (e) => {
        const selectedEmployeeId = e.target.value;
        setEmployee(selectedEmployeeId);
    }

    const handleChangeConcept = (e) => {
        const selectedConceptId = e.target.value;
        setConcept(selectedConceptId);

        // Find the selected concept object from the concepts array
        const selectedConcept = concepts.find(concept => concept.id === parseInt(selectedConceptId));

        // Check if concept was found before accessing properties
        if (selectedConcept) {
            if (selectedConcept.calculationType === 'FACTORIAL' || selectedConcept.calculationType === 'LINEAL') {
                document.getElementById('factor-quantity').classList.remove('d-none');
                document.getElementById('factor-quantity').classList.add('d-flex');
                document.getElementById('value').disabled = true;
                setFactor(selectedConcept.factor);
            } else {
                document.getElementById('factor-quantity').classList.remove('d-flex');
                document.getElementById('factor-quantity').classList.add('d-none');
                document.getElementById('value').disabled = false;
                setFactor('');
            }
        }
    }

    const handleChangeQuantity = async (e) => {
        const selectedQuantity = e.target.value;
        setQuantity(selectedQuantity);

        if (selectedQuantity !== '') {
            await api.post(`${NOVELTIES_PATH}/preload`, {
                employeeId: parseInt(employee),
                conceptId: parseInt(concept),
                quantity: parseFloat(selectedQuantity)
            }).then(res => {
                setValue(res.data.value);
            });
        } else {
            setValue('');
        }
    }

    return (
        <div className="container-fluid w-50 text-bg-light mt-8">
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center fs-2">Editar novedad</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="d-flex flex-row gap-4">
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="date" className="form-label fs-4">Fecha</label>
                                <input
                                    type="date"
                                    className="form-control fs-4"
                                    id="date"
                                    value={date}
                                    onChange={e => setDate(e.target.value)}
                                />
                            </div>

                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="employee" className="form-label fs-4">Empleado</label>
                                <select
                                    type="text"
                                    className="form-control fs-4"
                                    id="employee"
                                    value={employee}
                                    onChange={handleChangeEmployee}
                                >
                                    <option value="">Seleccione un empleado</option>
                                    {employees.map((employee) => (
                                        <option key={employee.id} value={employee.id}>{employee.firstName} {employee.otherNames} {employee.firstSurname} {employee.otherSurnames}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="d-flex flex-row gap-4">
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="concept" className="form-label fs-4">Concepto</label>
                                <select
                                    type="text"
                                    className="form-control fs-4"
                                    id="concept"
                                    value={concept}
                                    onChange={handleChangeConcept}>
                                    <option value="">Seleccione un concepto</option>
                                    {concepts.map((concept) => (
                                        <option key={concept.id} value={concept.id}>{concept.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="value" className="form-label fs-4">Valor</label>
                                <input
                                    type="number"
                                    className="form-control fs-4"
                                    id="value"
                                    value={value}
                                    onChange={e => setValue(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className="d-none flex-row gap-4" id="factor-quantity">
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="factor" className="form-label fs-4">Factor</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="factor"
                                    value={factor}
                                    onChange={e => setFactor(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="quantity" className="form-label fs-4">Cantidad</label>
                                <input
                                    type="number"
                                    className="form-control fs-4"
                                    id="quantity"
                                    value={quantity}
                                    onChange={handleChangeQuantity}
                                />
                            </div>

                        </div>

                        <div className="d-flex justify-content-center mb-3">
                            <button className="btn btn-success fs-4" type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}