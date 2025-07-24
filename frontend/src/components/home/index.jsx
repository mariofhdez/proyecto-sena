import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "Empleados",
    description: "Crea y gestiona los empleados registrados",
    route: "/employees",
  },
  {
    title: "Novedades",
    description: "Reporta los eventos que modifican el pago de tus empleado",
    route: "/novelties",
  },
  {
    title: "Períodos",
    description: "Cálcula el valor a pagar de tus empleados para un mes en particular",
    route: "/periods",
  },
];

export default function CompHomeMenu() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 32, width: "100%" }}>
      <h1 className="h1" style={{textAlign: "center"}}>Bienvenido</h1>
      <div style={{ display: "flex", gap: 24, marginTop: 24, justifyContent: "space-evenly" }}>
        {sections.map((section) => (
          <div
            key={section.title}
            onClick={() => navigate(section.route)}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: 12,
              padding: 24,
              width: "25%",
              minWidth: 180,
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              transition: "box-shadow 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)"}
            onMouseOut={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)"}
          >
            <h2 style={{ margin: "0 0 8px 0" }}>{section.title}</h2>
            <p style={{ margin: 0, color: "#555", fontSize: "1.6rem" }}>{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}