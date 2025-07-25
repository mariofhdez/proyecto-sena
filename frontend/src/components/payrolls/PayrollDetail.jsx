import api, {BASE_URL, SETTLEMENTS_PATH } from "../../utils/apiConfig";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { fromTimestampToDate } from "../../utils/formatDate";

const URI = `${BASE_URL}${SETTLEMENTS_PATH}`

export default function CompPayrollDetail() {
    const [settlement, setSettlement] = useState();

    const [ startDate, setStartDate ] = useState('');
    const [ endDate, setEndDate ] = useState('');
    const [ status, setStatus ] = useState('');
    const [ earningsValue, setEarningsValue] = useState('');
    const [ deductionsValue, setDeductionsValue ] = useState('');
    const [ totalValue, setTotalValue ] = useState('');
    const [ details, setDetails ] = useState([]);
    const [ employee, setEmployee ] = useState({});
    const [ period, setPeriod ] = useState({})
    
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getSettlement(id);
    }, [])

    const getSettlement = async () => {
        const response = await api.get(`${URI}/${id}`);
        const data = await response.data;

        setStartDate(fromTimestampToDate(data.startDate));
        setEndDate(fromTimestampToDate(data.endDate));
        setStatus(data.status);
        setEarningsValue(data.earningsValue);
        setDeductionsValue(data.deductionsValue);
        setTotalValue(data.totalValue);
        setDetails(data.details);
        setEmployee(data.employee);
        setPeriod(data.period)
    }

    return (
        <div className="container-fluid text-bg-light mt-8" style={{ maxWidth: '900px' }}>
            <div className="row">
                <div className="col-12 mb-3">
                    <h3 className="mt-3 p-4 mb-3 text-center fs-2">Período</h3>
                    <div className="d-flex flex-column gap-4">
                        {/* Fila 1 */}
                        <div className="d-flex flex-row justify-content-between gap-4">
                            <div className="mb-3 flex-fill" style={{ minWidth: '200px', maxWidth: '300px' }}>
                                <label htmlFor="period" className="form-label fs-4">Período</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="period"
                                    value={period.period}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{ minWidth: '200px', maxWidth: '300px' }}>
                                <label htmlFor="status" className="form-label fs-4">Estado</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="status"
                                    value={status}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{ minWidth: '200px', maxWidth: '300px' }}>
                                <label htmlFor="id" className="form-label fs-4">Consecutivo</label>
                                <input
                                    type="number"
                                    className="form-control fs-4"
                                    id="id"
                                    value={id}
                                    disabled
                                />
                            </div>
                        </div>
                        {/* Fila 2 */}
                        <div className="d-flex flex-row justify-content-between gap-4">
                            <div className="mb-3 flex-fill" style={{ minWidth: '200px', maxWidth: '300px' }}>
                                <label htmlFor="startDate" className="form-label fs-4">Fecha de inicio</label>
                                <input
                                    type="date"
                                    className="form-control fs-4"
                                    id="startDate"
                                    value={startDate}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{ minWidth: '200px', maxWidth: '300px' }}>
                                <label htmlFor="endDate" className="form-label fs-4">Fecha de fin</label>
                                <input
                                    type="date"
                                    className="form-control fs-4"
                                    id="endDate"
                                    value={endDate}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{ minWidth: '200px', maxWidth: '300px' }}>
                                <label htmlFor="paymentDate" className="form-label fs-4">Fecha de pago</label>
                                <input
                                    type="date"
                                    className="form-control fs-4"
                                    id="paymentDate"
                                    value={null}
                                    disabled
                                />
                            </div>
                        </div>
                        {/* Fila 3 */}
                        <div className="d-flex flex-row justify-content-between gap-4">
                            <div className="mb-3 flex-fill" style={{ minWidth: '200px', maxWidth: '300px' }}>
                                <label htmlFor="earnings" className="form-label fs-4">Devengados</label>
                                <input
                                    type="number"
                                    className="form-control fs-4"
                                    id="earnings"
                                    value={earningsValue}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{ minWidth: '200px', maxWidth: '300px' }}>
                                <label htmlFor="deductions" className="form-label fs-4">Deducciones</label>
                                <input
                                    type="number"
                                    className="form-control fs-4"
                                    id="deductions"
                                    value={deductionsValue}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{ minWidth: '200px', maxWidth: '300px' }}>
                                <label htmlFor="total" className="form-label fs-4">Total</label>
                                <input
                                    type="number"
                                    className="form-control fs-4"
                                    id="total"
                                    value={totalValue}
                                    disabled
                                />
                            </div>
                        </div>
                        {/* Fila 4 */}
                        <div className="d-flex flex-row justify-content-between gap-4">
                            <div className="mb-3 flex-fill" style={{ minWidth: '200px', maxWidth: '300px' }}>
                                <label htmlFor="identification" className="form-label fs-4">Identificación</label>
                                <input
                                    type="number"
                                    className="form-control fs-4"
                                    id="identification"
                                    value={employee.identification}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{ minWidth: '200px', maxWidth: '300px' }}>
                                <label htmlFor="name" className="form-label fs-4">Nombre</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="name"
                                    value={`${employee.firstName} ${employee.firstSurname}`}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 flex-fill" style={{ minWidth: '200px', maxWidth: '300px' }}>
                                <label htmlFor="position" className="form-label fs-4">Cargo</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="position"
                                    value={employee.position}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
            <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center">Detalle de la liquidación</h3>
                    {/* <NavLink to="/novelties/create" className="btn btn-primary mb-3 float-end"><i className="fa-solid fa-plus"></i> Crear novedad</NavLink> */}
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">Id</th>
                                <th className="text-center">Fecha</th>
                                <th className="text-center">Concepto</th>
                                <th className="text-center">Tipo</th>
                                <th className="text-center">Cantidad</th>
                                <th className="text-center">Valor</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((d) => (
                                <tr 
                                    key={d.id}
                                    className="text-center"
                                >
                                    <td>{d.id}</td>
                                    <td>{fromTimestampToDate(d.date)}</td>
                                    <td>{d.concept.name}</td>
                                    <td>{d.concept.type}</td>
                                    <td>{d.quantity === null ? '': d.quantity}</td>
                                    <td>{d.concept.type === 'DEDUCCION' ? `- ${d.value}` : d.value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}