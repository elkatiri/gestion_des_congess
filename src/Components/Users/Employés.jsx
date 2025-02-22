import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Employes.css";
import Logout from "../Logout/Logout";

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

const Employes = ({ employeId }) => {
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [managerId, setManagerId] = useState(1);
  const dispatch = useDispatch();

  const conges = useSelector((state) => state.DemandeReducer);
  const demandesEmploye = conges.filter(
    (conge) => conge.employeId === employeId
  );

  const handleAjouter = () => {
    if (!dateDebut || !dateFin) return;

    const nouvelleDemande = {
      id: Date.now(),
      employeId,
      managerId,
      dateDebut,
      dateFin,
      statut: "En attente",
    };

    dispatch({
      type: "AJOUTER_CONGE",
      payload: nouvelleDemande,
    });

    setDateDebut("");
    setDateFin("");
  };

  return (
    <>
      <div className="welcome">
        <h2>WELCOME 👋</h2>
        <Logout />
      </div>
      <div className="employe-container">
        <h3>Nouvelle Demande de Congé ✔</h3>
        <div className="choisir">
          <label>Choisir un admin responsable :</label>
          <select
            onChange={(e) => setManagerId(Number(e.target.value))}
            value={managerId}
            className="admin-select"
          >
            <option value={1}>responsable 1</option>
            <option value={2}>responsable 2</option>
            <option value={3}>responsable 3</option>
            <option value={4}>responsable 4</option>
          </select>
        </div>

        <div className="date-inputs">
          <input
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            className="date-input"
          />
          <input
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
            className="date-input"
          />
        </div>

        <button onClick={handleAjouter} className="add-button">
          Ajouter Congé
        </button>

        <div className="demandes-list">
          <h3>Demandes de Congé</h3>
          <table>
            <thead>
              <tr>
                <th>Admin Responsable</th>
                <th>Date Début</th>
                <th>Date Fin</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {demandesEmploye.length > 0 ? (
                demandesEmploye.map((demande) => (
                  <tr key={demande.id}>
                    <td>Admin {demande.managerId}</td>
                    <td>{demande.dateDebut}</td>
                    <td>{demande.dateFin}</td>
                    <td style={{ color: getColor(demande.statut) }}>
                      {demande.statut}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Aucune demande de congé</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Employes;
