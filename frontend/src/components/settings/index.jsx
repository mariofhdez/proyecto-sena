// frontend/src/components/settings/index.jsx
import { useNavigate } from "react-router-dom";

const sections = [
  // {
  //   title: "Empresa",
  //   description: "Configuración de la empresa",
  //   route: "/config/company",
  // },
  {
    title: "Conceptos",
    description: "Gestiona los conceptos de nómina",
    route: "/config/concepts",
  },
  {
    title: "Usuarios",
    description: "Administración de usuarios",
    route: "/config/users",
  },
];

export default function CompSettingsMenu() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 32 }}>
      <h1>Configuración</h1>
      <div style={{ display: "flex", gap: 24, marginTop: 24 }}>
        {sections.map((section) => (
          <div
            key={section.title}
            onClick={() => navigate(section.route)}
            style={{
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: 12,
              padding: 24,
              minWidth: 180,
              boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
              transition: "box-shadow 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)"}
            onMouseOut={e => e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)"}
          >
            <h2 style={{ margin: "0 0 8px 0" }}>{section.title}</h2>
            <p style={{ margin: 0, color: "#555" }}>{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}