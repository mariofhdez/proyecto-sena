import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { fromTimestampToDate } from "../../utils/formatDate";
import api, { EMPLOYEES_PATH, PERIODS_PATH } from "../../utils/apiConfig";

export default function CompOpenPeriod() {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [period, setPeriod] = useState('');
    const [settlementStatus, setSettlementStatus] = useState('');
    const [earnings, setEarnings] = useState('');
    const [deductions, setDeductions] = useState('');
    const [total, setTotal] = useState('');
    const [employees, setEmployees] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    let selectedEmployees = [];

    useEffect(() => {
        getPeriodById();
        getEmployees();
    }, []);

    const getPeriodById = async () => {
        const response = await api.get(`${PERIODS_PATH}/${id}`);
        const data = await response.data;
        setStartDate(fromTimestampToDate(data.startDate));
        setEndDate(fromTimestampToDate(data.endDate));
        setPaymentDate('');
        setPeriod(data.period);
        setSettlementStatus(data.status);
        setQuantity(setValue(data.employeesQuantity));
        setEarnings(setValue(data.earningsTotal));
        setDeductions(setValue(data.deductionsTotal));
        setTotal(setValue(data.totalValue));
    }
    const setValue = (value) => {
        if (value === null) {
            return '0';
        } else {
            return value;
        }
    }

    const getEmployees = async () => {
        const response = await api.get(`${EMPLOYEES_PATH}`);
        const data = await response.data;
        setEmployees(data);
    }

    const handleCreatePayrolls = async (e) => {
        e.preventDefault();
        console.log(selectedEmployees);
        const response = await api.post(`${PERIODS_PATH}/${id}/open`, {
            employees: selectedEmployees
        });
        navigate(`/settlements/${response.data.id}`);
    }

    const handleSelectedEmployee = (e) => {
        if(e.target.checked) {
            selectedEmployees.push(parseInt(e.target.id));
        } else {
            selectedEmployees = selectedEmployees.filter(employee => employee !== parseInt(e.target.id));
        }
    }

    const handleSelectAll = (e) => {
        const checkboxes = document.querySelectorAll('.form-check-input');
        checkboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
        });
        selectedEmployees = employees.map(employee => employee.id);
    }

    return (
        <div className="container-fluid w-50 text-bg-light mt-8" style={{minWidth: '550px'}}>
            <div className="row">
                <div className="col-12 mb-3">
                    <h3 className="mt-3 p-4 mb-3 text-center fs-2">Período de Liquidación</h3>
                    <div className="d-flex flex-column gap-4">
                        <div className="d-flex flex-row justify-content-between gap-4">
                            <div className="mb-3 flex-fill" style={{minWidth: '200px', maxWidth: '300px'}}>
                                <label htmlFor="period" className="form-label fs-4">Período</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="period"
                                    value={period}
                                    onChange={e => setPeriod(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{minWidth: '200px', maxWidth: '300px'}}>
                                <label htmlFor="status" className="form-label fs-4">Estado</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="status"
                                    value={settlementStatus}
                                    onChange={e => setSettlementStatus(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{minWidth: '200px', maxWidth: '300px'}}>
                                <label htmlFor="quantity" className="form-label fs-4">Cantidad de empleados</label>
                                <input
                                    type="number"
                                    className="form-control fs-4"
                                    id="quantity"
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                    disabled
                                />
                            </div>

                        </div>

                        <div className="d-flex flex-row justify-content-between gap-4">
                            <div className="mb-3 flex-fill" style={{minWidth: '200px', maxWidth: '300px'}}>
                                <label htmlFor="startDate" className="form-label fs-4">Fecha de inicio</label>
                                <input
                                    type="date"
                                    className="form-control fs-4"
                                    id="startDate"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{minWidth: '200px', maxWidth: '300px'}}>
                                <label htmlFor="date" className="form-label fs-4">Fecha de fin</label>
                                <input
                                    type="date"
                                    className="form-control fs-4"
                                    id="endDate"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{minWidth: '200px', maxWidth: '300px'}}>
                                <label htmlFor="paymentDate" className="form-label fs-4">Fecha de pago</label>
                                <input
                                    type="date"
                                    className="form-control fs-4"
                                    id="paymentDate"
                                    value={paymentDate}
                                    onChange={e => setPaymentDate(e.target.value)}
                                    disabled
                                />
                            </div>
                        </div>


                        <div className="d-flex flex-row justify-content-between gap-4">
                            <div className="mb-3 flex-fill" style={{minWidth: '200px', maxWidth: '300px'}}>
                                <label htmlFor="earnings" className="form-label fs-4">Devengados</label>
                                <input
                                    type="number"
                                    className="form-control fs-4"
                                    id="earnings"
                                    value={earnings}
                                    onChange={e => setEarnings(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{minWidth: '200px', maxWidth: '300px'}}>
                                <label htmlFor="deductions" className="form-label fs-4">Deducciones</label>
                                <input
                                    type="number"
                                    className="form-control fs-4"
                                    id="deductions"
                                    value={deductions}
                                    onChange={e => setDeductions(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{minWidth: '200px', maxWidth: '300px'}}>
                                <label htmlFor="total" className="form-label fs-4">Total</label>
                                <input
                                    type="number"
                                    className="form-control fs-4"
                                    id="total"
                                    value={total}
                                    onChange={e => setTotal(e.target.value)}
                                    disabled
                                />
                            </div>


                        </div>

                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center">Agregar Empleados a la Liquidación</h3>
                    <NavLink to={`/settlements/${id}`} onClick={handleCreatePayrolls} className={ settlementStatus === 'DRAFT' ? "btn btn-success fs-5 mb-3 float-end" : "btn btn-success fs-5 mb-3 float-end disabled"}><i className="fa-solid fa-plus"></i> Crear nómina</NavLink>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center"><input type="checkbox" className="form-check-input" onChange={handleSelectAll}/></th>
                                <th className="text-center fs-4">Nombre</th>
                                <th className="text-center fs-4">Identificación</th>
                                <th className="text-center fs-4">Cargo</th>
                                <th className="text-center fs-4">Salario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr 
                                key={employee.id}
                                className="text-center fs-5">
                                    <td>
                                        <input type="checkbox" id={employee.id} className="form-check-input" onChange={handleSelectedEmployee} />
                                    </td>
                                    <td>{employee.firstName} {employee.firstSurname}</td>
                                    <td>{employee.identification}</td>
                                    <td>{employee.position}</td>
                                    <td>{employee.salary}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}