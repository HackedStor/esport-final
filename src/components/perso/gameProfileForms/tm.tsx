/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { TmMap } from "./input_elements/tm_map";
import { TmScore } from "./input_elements/tm_score";
import "../../../assets/css/reservation.css";
import { TmTable } from "./input_elements/tmTable";
import { Button } from "../../ui/button";
import toast, {
     Renderable,
     Toast,
     Toaster,
     ValueFunction,
} from "react-hot-toast";

const TmCard: React.FC = () => {
     const [userId, setUserId] = React.useState<string>("");
     const [map, setMap] = React.useState<string>("");
     const [score, setScore] = useState<string>("");

     const notify_ok = (text: Renderable | ValueFunction<Renderable, Toast>) =>
          toast.success(text);
     const notify_err = (text: Renderable | ValueFunction<Renderable, Toast>) =>
          toast.error(text);

     useEffect(() => {
          const fetchUserData = async () => {
               const email = localStorage.getItem("email");
               try {
                    const response = await fetch(
                         "/php/Member/getUserData.php",
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
                         throw new Error(
                              "Réponse non-JSON du serveur: " + text
                         );
                    }

                    if (data.success) {
                         setUserId(data.id);
                    } else {
                         throw new Error(data.message || "Erreur inconnue");
                    }
               } catch (error: any) {
                    console.error("Erreur détaillée:", error);
                    console.error(
                         error.message ||
                              "Erreur lors de la récupération des données utilisateur"
                    );
               }
          };

          fetchUserData();
     }, []);

     const submitTmStats = async () => {
          if (!userId || !map) return;

          try {
               const response = await fetch(
                    "/php/Member/GamesForms/insert_tm_stats.php",
                    {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({
                              user_id: userId,
                              map_name: map,
                              score: score,
                         }),
                    }
               );

               const data = await response.json();
               if (data.success) {
                    setTimeout(() => window.location.reload(), 2000);
                    notify_ok("Données enregistrées avec succès.");
               } else {
                    setTimeout(() => window.location.reload(), 2000);
                    notify_err("Erreur lors de l'enregistrement des données.");
               }
          } catch (error) {
               setTimeout(() => window.location.reload(), 2000);
               notify_err("Erreur: le service est indisponible.");
          }
     };

     return (
          <div className="mkCard">
               <TmTable />
               <form
                    className="ValoInputs flex flex-wrap justify-between w-[90%]"
                    onSubmit={(e) => {
                         e.preventDefault();
                         submitTmStats();
                    }}
               >
                    <div className="flex flex-col gap-3">
                         <TmMap onChange={setMap} value={map} />
                    </div>
                    <div className="flex flex-col gap-3">
                         <TmScore value={score} onChange={setScore} />
                    </div>
                    <Button className="SubmitBtn">Sauvegarder</Button>
               </form>
               <Toaster position="bottom-right" />
          </div>
     );
};

export default TmCard;
