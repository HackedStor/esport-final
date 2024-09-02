import React, { useState, useEffect } from "react";
import "../../../assets/css/Dashboard.css";
import { DataTableDemo } from "../../perso/DataTable";
import { slide as Menu } from "react-burger-menu";
import { TableDemo } from "../../perso/NewsTable";
import useDevToolsProtection from "../../../Hooks/devToolsBlocker";

const AdminDashboard: React.FC = () => {
  useDevToolsProtection();
  const [pseudo, setPseudo] = useState<string>("");

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem("email");
      try {
        const response = await fetch(
          "http://esport/src/php/Member/getUserData.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          throw new Error("Réponse non-JSON du serveur: " + text);
        }

        if (data.success) {
          setPseudo(data.pseudo);
        } else {
          throw new Error(data.message || "Erreur inconnue");
        }
      } catch (error) {
        console.error("Erreur détaillée:", error);
        console.error(
          (error as Error).message ||
            "Erreur lors de la récupération des données utilisateur"
        );
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="dashboard">
      <Menu width={280}>
        <a id="home" className="menu-item" href="/dashboard">
          Dashboard
        </a>
        <a id="about" className="menu-item" href="/admin/dashboard/actualites">
          Actualitées
        </a>
        <a id="about" className="menu-item" href="/logout">
          Déconnexion
        </a>
      </Menu>

      <main className="dashboard-content">
        <h1 className="mt-5 text-5xl font-extrabold">
          Bonjour Admin {pseudo} !
        </h1>
        <section className="AdminTable container">
          <h2 className="title-6 font-regular sectionTitle">
            Joueurs inscrits a la prochaine session
          </h2>
          <DataTableDemo />
        </section>
        <section className="container AdminTable">
          <h2 className="title-6 font-regular sectionTitle">
            Les actualités dans la base de données
          </h2>
          <TableDemo />
        </section>
        <footer className="footer">
          <p>
            © 2024 Esport au Lycée Jules Ferry. Tous droits réservés. |
            <a href="/privacy"> Politique de confidentialité</a> |
            <a href="/terms"> Conditions d'utilisation</a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default AdminDashboard;
