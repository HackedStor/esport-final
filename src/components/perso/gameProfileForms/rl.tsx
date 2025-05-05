/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { RlModes } from "./input_elements/rl_game_type";
import { RlScore } from "./input_elements/rl_score";
import { RlScoreOtherTeam } from "./input_elements/rl_score_other_team";
import "../../../assets/css/reservation.css";
import { AreaChartStepRL } from "../UserCharts/AreaChartStepRL";
import { Button } from "../../ui/button";
import toast, {
     Renderable,
     Toast,
     Toaster,
     ValueFunction,
} from "react-hot-toast";

const RlCard: React.FC = () => {
     const [userId, setUserId] = React.useState<string>("");
     const [score, setScore] = useState<string>("");
     const [scoreOtherTeam, setScoreOtherTeam] = useState<string>("");
     const [mode, setMode] = useState<{ name: string } | null>(null);

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

     const submitRlStats = async () => {
          if (!userId) return;

          try {
               const response = await fetch(
                    "/php/Member/GamesForms/insert_mk_stats.php",
                    {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({
                              user_id: userId,
                              score: score,
                              mode: mode,
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
               <AreaChartStepRL />
               <form
                    className="ValoInputs flex flex-wrap justify-between w-[90%]"
                    onSubmit={(e) => {
                         e.preventDefault();
                         submitRlStats();
                    }}
               >
                    <div className="flex flex-col gap-3">
                         <RlModes onModeChange={setMode} />
                    </div>
                    <div className="flex flex-col gap-3">
                         <RlScore value={score} onChange={setScore} />
                         <RlScoreOtherTeam
                              value={scoreOtherTeam}
                              onChange={setScoreOtherTeam}
                         />
                    </div>
                    <Button className="SubmitBtn">Sauvegarder</Button>
               </form>
               <Toaster position="bottom-right" />
          </div>
     );
};

export default RlCard;
