/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { LolChampions } from "./input_elements/lol_characters";
import { LolKDA } from "./input_elements/lol_kda";
import { LolScore } from "./input_elements/lol_score";
import { LolScoreOtherTeam } from "./input_elements/lol_score_other_team";
import { AreaChartStepLol } from "../UserCharts/AreaChartStepLol";
import "../../../assets/css/reservation.css";
import { Button } from "../../ui/button";

const LolCard: React.FC = () => {
  const [userId, setUserId] = React.useState<string>("");
  const [champion, setChampion] = useState<{
    name: string;
    role: string;
  } | null>(null);

  const [kda, setKda] = useState<string>("");
  const [score, setScore] = useState<string>("");
  const [otherTeamScore, setOtherTeamScore] = useState<string>("");

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

  const submitLolStats = async () => {
    if (!userId || !champion) return;

    try {
      const response = await fetch(
        "http://esport/src/php/Member/GamesForms/insert_lol_stats.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            agent_name: champion.name,
            agent_class: champion.role,
            kda: kda,
            score: score,
            otherTeamScore: otherTeamScore,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        console.log("Données enregistrées avec succès.");
      } else {
        console.error("Erreur : ", data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données:", error);
    }
  };

  return (
    <div className="LolCard">
      <AreaChartStepLol />
      <form
        className="ValoInputs flex flex-wrap justify-between w-[90%]"
        onSubmit={(e) => {
          e.preventDefault();
          submitLolStats();
        }}
      >
        <div className="flex flex-col gap-3">
          <LolChampions onChampionChange={setChampion} />
          <LolKDA value={kda} onChange={setKda} />
        </div>
        <div className="flex flex-col gap-3">
          <LolScore value={score} onChange={setScore} />
          <LolScoreOtherTeam
            value={otherTeamScore}
            onChange={setOtherTeamScore}
          />
        </div>

        <Button className="SubmitBtn">Sauvegarder</Button>
      </form>
    </div>
  );
};

export default LolCard;
