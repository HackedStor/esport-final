import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const response = await fetch("http://www.lycee-ferry-versailles.fr:5173/src/php/Auth/logout.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur HTTP ! statut: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          localStorage.removeItem("email");
          localStorage.removeItem("is_admin");
          navigate("/");
        } else {
          console.error("La déconnexion a échoué :", result.message);
        }
      } catch (error) {
        console.error("Une erreur s'est produite :", error);
      }
    };

    performLogout();
  }, [navigate]);

  return <div>Déconnexion en cours...</div>;
};

export default Logout;
