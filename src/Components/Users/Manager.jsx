import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "./Manager.css";
import Logout from "../Logout/Logout";
import exportToCSV from "../CSVExport/CSVExport";

const getColor = (statut) => {
  switch (statut) {
    case "Approuvé":
      return "green";
    case "Refusé":
      return "red";
    case "Reporté":
      return "orange";
    default:
      return "black";
  }
};

export default function Manager() {
  const conges = useSelector((state) => state.DemandeReducer);
  const dispatch = useDispatch();

  const [selectedMonth, setSelectedMonth] = useState("");
  const [adminActif, setAdminActif] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("");

  const modifierStatut = (id, statut) => {
    dispatch({ type: "MODIFIER_STATUT_CONGE", payload: { id, statut } });
  };

  const filterCongesByMonth = (month) => {
    if (month === "") return conges;
    return conges.filter((conge) => {
      const congeDate = new Date(conge.dateDebut);
      return congeDate.getMonth() === month;
    });
  };

  const filterCongesByStatus = (conges) => {
    if (!selectedStatus) return conges;
    return conges.filter((conge) => conge.statut === selectedStatus);
  };

  const months = [
    { value: 0, label: "Janvier" },
    { value: 1, label: "Février" },
    { value: 2, label: "Mars" },
    { value: 3, label: "Avril" },
    { value: 4, label: "Mai" },
    { value: 5, label: "Juin" },
    { value: 6, label: "Juillet" },
    { value: 7, label: "Août" },
    { value: 8, label: "Septembre" },
    { value: 9, label: "Octobre" },
    { value: 10, label: "Novembre" },
    { value: 11, label: "Décembre" },
  ];

  const filteredConges = filterCongesByStatus(
    filterCongesByMonth(selectedMonth)
  );

  const handleExport = () => {
    exportToCSV(filteredConges, "demandes_conges.csv");
  };

  return (
    <div className="manager-container">
      <div className="header-manager">
        <h2>Suivi des Congés 📅</h2>
        <Logout />
      </div>

      <div className="choisir">
        <label>Choisir l'admin :</label>
        <select
          onChange={(e) => setAdminActif(Number(e.target.value))}
          value={adminActif}
          className="admin-select"
        >
          <option value={1}>responsable 1</option>
          <option value={2}>responsable 2</option>
          <option value={3}>responsable 3</option>
          <option value={4}>responsable 4</option>
        </select>
      </div>

      <div className="choisir">
        <label>Sélectionner le mois :</label>
        <select
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          value={selectedMonth}
          className="admin-select"
        >
          <option value="">Tous les mois</option>
          {months.map((month) => (
            <option key={month.value} value={month.value}>
              {month.label}
            </option>
          ))}
        </select>
      </div>

      <div className="choisir">
        <label>Filtrer par statut :</label>
        <select
          onChange={(e) => setSelectedStatus(e.target.value)}
          value={selectedStatus}
          className="admin-select"
        >
          <option value="">Tous les statuts</option>
          <option value="En attente">En attente</option>
          <option value="Approuvé">Approuvé</option>
          <option value="Refusé">Refusé</option>
          <option value="Reporté">Reporté</option>
        </select>
      </div>

      <button onClick={handleExport}>Exporter en CSV</button>

      <table>
        <thead>
          <tr>
            <th>Employé</th>
            <th>Date début</th>
            <th>Date fin</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredConges.map((conge) => (
            <tr key={conge.id || Math.random()}>
              <td>{conge.employeId}</td>
              <td>{conge.dateDebut}</td>
              <td>{conge.dateFin}</td>
              <td style={{ color: getColor(conge.statut) }}>{conge.statut}</td>
              <td className="actions">
                {conge.managerId === adminActif ? (
                  <>
                    <button
                      onClick={() => modifierStatut(conge.id, "Approuvé")}
                    >
                      Accepter
                    </button>
                    <button onClick={() => modifierStatut(conge.id, "Refusé")}>
                      Refuser
                    </button>
                    <button onClick={() => modifierStatut(conge.id, "Reporté")}>
                      Reporter
                    </button>
                  </>
                ) : (
                  <span>Vous ne pouvez pas modifier cette demande</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
