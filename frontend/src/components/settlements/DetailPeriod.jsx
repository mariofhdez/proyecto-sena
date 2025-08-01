import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { fromTimestampToDate } from "../../utils/formatDate";
import axios from "axios";
import { BASE_URL, PERIODS_PATH, SETTLEMENTS_PATH } from "../../utils/apiConfig";

const URI = `${BASE_URL}${PERIODS_PATH}`

export default function CompDetailPeriod() {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [quantity, setQuantity] = useState('');
    const [period, setPeriod] = useState('');
    const [settlementStatus, setSettlementStatus] = useState('');
    const [earnings, setEarnings] = useState('');
    const [deductions, setDeductions] = useState('');
    const [total, setTotal] = useState('');
    const [payrolls, setPayrolls] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getPeriodById();
        getPayrolls();
    }, []);

    const getPeriodById = async () => {
        const response = await axios.get(`${URI}/${id}`);
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

    const getPayrolls = async () => {
        const response = await axios.get(`${BASE_URL}${SETTLEMENTS_PATH}?periodId=${id}`);
        const data = await response.data;
        setPayrolls(data);
    }

    const setValue = (value) => {
        if (value === null) {
            return '0';
        } else {
            return value;
        }
    }


    const handleSettlePayrolls = async () => {
        const response = await axios.post(`${URI}/${id}/settle`, {
            // employees: payrolls.map(payroll => payroll.employee.id)
        });
        navigate(`/settlements/${response.data.id}`);
        window.location.reload();
    }

    const handleClosePayrolls = async () => {
        const response = await axios.post(`${URI}/${id}/close`, {
            // employees: payrolls.map(payroll => payroll.employee.id)
        });
        navigate(`/settlements/${response.data.id}`);
    }

    return (
        <div className="container-fluid w-50 text-bg-light mt-8">
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
                    <h3 className="mt-3 p-4 mb-3 text-center">Listado de liquidaciones de nómina</h3>
                    <div className="d-flex justify-content-end gap-3">
                    <NavLink to={`/settlements/open/${id}`} className={settlementStatus === 'DRAFT' ? "btn btn-info mb-3 float-end fs-5" : "d-none" } ><i className="fa-solid fa-plus"></i> Agregar empleados</NavLink>
                    <NavLink to={`/settlements/${id}`} className={settlementStatus === 'OPEN' ? "btn btn-success mb-3 float-end fs-5" : "btn btn-success mb-3 float-end fs-5 disabled"} onClick={handleSettlePayrolls}><i className="fa-solid fa-plus"></i> Liquidar nóminas</NavLink>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">Consecutivo</th>
                                <th className="text-center">Nombre</th>
                                <th className="text-center">Identificación</th>
                                <th className="text-center">Devengado</th>
                                <th className="text-center">Deducciones</th>
                                <th className="text-center">Valor a pagar</th>
                                <th className="text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payrolls.length > 0 ? (
                            payrolls.map((payroll) => (
                                <tr key={payroll.id} className="text-center">
                                    <td>{payroll.id}</td>
                                    <td>{payroll.employee.firstName} {payroll.employee.firstSurname}</td>
                                    <td>{payroll.employee.identification}</td>
                                    <td>{payroll.earningsValue}</td>
                                    <td>{payroll.deductionsValue}</td>
                                    <td>{payroll.totalValue}</td>
                                    <td className="d-flex justify-content-center gap-2">
                                        <NavLink to={`/payrolls/${payroll.id}`} className="btn btn-secondary"><i className="fa-solid fa-eye"></i></NavLink>
                                        {/* <NavLink to={`/settlements/edit/${payroll.id}`} className="btn btn-primary"><i className="fa-solid fa-pencil"></i></NavLink> */}
                                        {/* <button className="btn btn-danger"><i className="fa-solid fa-trash"></i></button> */}
                                    </td>
                                </tr>
                            ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">Aún no hay nóminas liquidadas</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}