import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CompCreatePeriod() {

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2010 + 1 }, (_, i) => currentYear - i);
    const months = [
        { value: "01", label: "Enero" },
        { value: "02", label: "Febrero" },
        { value: "03", label: "Marzo" },
        { value: "04", label: "Abril" },
        { value: "05", label: "Mayo" },
        { value: "06", label: "Junio" },
        { value: "07", label: "Julio" },
        { value: "08", label: "Agosto" },
        { value: "09", label: "Septiembre" },
        { value: "10", label: "Octubre" },
        { value: "11", label: "Noviembre" },
        { value: "12", label: "Diciembre" },
      ];


    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:3005/api/period/",{
            startDate: startDate,
            endDate: endDate,
        });
        navigate(`/settlements/open/${response.data.id}`);
    }

    const handleChangeMonth = (e) => {
        setMonth(e.target.value);
        setDaysInMonth(year, e.target.value);
    }

    const setDaysInMonth = (year, month) => { 
        setStartDate(year && month ? `${year}-${month}-01` : "");
        if(month === "02") {
            setEndDate(year && month ? `${year}-${month}-28` : "");
        } else {
            setEndDate(year && month ? `${year}-${month}-30` : "");
        }
    }

    return (
        <div className="container-fluid w-50 text-bg-light mt-8">
            <div className="row">
                <div className="col-12">
                    <h3 className="mt-3 p-4 mb-3 text-center fs-2">Crear período</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex flex-row gap-4">
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="year" className="form-label fs-4">Año</label>
                                <select
                                    type="text"
                                    className="form-control fs-4"
                                    id="year"
                                    value={year}
                                    onChange={e => setYear(e.target.value)}>
                                        <option value="">Seleccione un año</option>
                                        {years.map((year) => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                            </div>
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="month" className="form-label fs-4">Mes</label>
                                <select
                                    type="text"
                                    className="form-control fs-4"
                                    id="month"
                                    value={month}
                                    onChange={handleChangeMonth}>
                                        <option value="">Seleccione un mes</option>
                                        {months.map((month) => (
                                            <option key={month.value} value={month.value}>{month.label}</option>
                                        ))}
                                    </select>
                            </div>
                            
                        </div>

                        <div className="d-flex flex-row gap-4">
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="startDate" className="form-label fs-4">Fecha de inicio</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="startDate"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="mb-3 px-4 w-50">
                                <label htmlFor="date" className="form-label fs-4">Fecha de fin</label>
                                <input
                                    type="text"
                                    className="form-control fs-4"
                                    id="endDate"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    disabled
                                />
                            </div>
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