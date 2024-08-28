// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from "react";
// import { ValoAgents } from "./input_elements/valo_characters";
// import { ValoKDA } from "./input_elements/valo_kda";
// import { ValoScore } from "./input_elements/valo_score";
// import { AreaChartStepValo } from "../UserCharts/AreaChartStepValo";
// import "../../../assets/css/reservation.css";
// import { ValoScoreOtherTeam } from "./input_elements/valo_score_other_team";
// import { Button } from "../../ui/button";
// import toast, {
//   Renderable,
//   Toast,
//   Toaster,
//   ValueFunction,
// } from "react-hot-toast";

// const ValoCard: React.FC = () => {
//   const [userId, setUserId] = React.useState<string>("");
//   const [agent, setAgent] = useState<{ name: string; class: string } | null>(
//     null
//   );
//   const [kda, setKda] = useState<string>("");
//   const [score, setScore] = useState<string>("");
//   const [otherTeamScore, setOtherTeamScore] = useState<string>("");

//   const notify_ok = (text: Renderable | ValueFunction<Renderable, Toast>) =>
//     toast.success(text);
//   const notify_err = (text: Renderable | ValueFunction<Renderable, Toast>) =>
//     toast.error(text);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const email = localStorage.getItem("email");
//       try {
//         const response = await fetch(
//           "http://esport/src/php/Member/getUserData.php",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ email }),
//           }
//         );

//         const text = await response.text();

//         let data;
//         try {
//           data = JSON.parse(text);
//         } catch (e) {
//           throw new Error("Réponse non-JSON du serveur: " + text);
//         }

//         if (data.success) {
//           setUserId(data.id);
//         } else {
//           throw new Error(data.message || "Erreur inconnue");
//         }
//       } catch (error: any) {
//         console.error("Erreur détaillée:", error);
//         console.error(
//           error.message ||
//             "Erreur lors de la récupération des données utilisateur"
//         );
//       }
//     };

//     fetchUserData();
//   }, []);

//   const submitValorantStats = async () => {
//     if (!userId || !agent) return;

//     try {
//       const response = await fetch(
//         "http://esport/src/php/Member/GamesForms/insert_valorant_stats.php",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             user_id: userId,
//             agent_name: agent.name,
//             agent_class: agent.class, // Ajoutez la classe de l'agent
//             kda: kda,
//             score: score,
//             otherTeamScore: otherTeamScore,
//           }),
//         }
//       );

//       const data = await response.json();
//       if (data.success) {
//         notify_ok("Données enregistrées avec succès.");
//       } else {
//         console.error("Erreur : ", data.message);
//         notify_err("Erreur lors de l'enregistrement des données.");
//       }
//     } catch (error) {
//       notify_err("Erreur le service est indisponible.");
//     }
//   };

//   return (
//     <div className="valoCard">
//       <AreaChartStepValo />
//       <form
//         className="ValoInputs flex flex-wrap justify-between w-[90%]"
//         onSubmit={(e) => {
//           e.preventDefault();
//           submitValorantStats();
//         }}
//       >
//         <div className="flex flex-col gap-3">
//           <ValoAgents onAgentChange={setAgent} />
//           <ValoKDA value={kda} onChange={setKda} />
//         </div>
//         <div className="flex flex-col gap-3">
//           <ValoScore value={score} onChange={setScore} />
//           <ValoScoreOtherTeam
//             value={otherTeamScore}
//             onChange={setOtherTeamScore}
//           />
//         </div>
//         <Button>Sauvegarder</Button>
//       </form>
//       <Toaster position="bottom-right" />
//     </div>
//   );
// };

// export default ValoCard;


/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { ValoAgents } from "./input_elements/valo_characters";
import { ValoKDA } from "./input_elements/valo_kda";
import { ValoScore } from "./input_elements/valo_score";
import { AreaChartStepValo } from "../UserCharts/AreaChartStepValo";
import "../../../assets/css/reservation.css";
import { ValoScoreOtherTeam } from "./input_elements/valo_score_other_team";
import { Button } from "../../ui/button";
import toast, {
  Renderable,
  Toast,
  Toaster,
  ValueFunction,
} from "react-hot-toast";

const ValoCard: React.FC = () => {
  const [userId, setUserId] = React.useState<string>("");
  const [agent, setAgent] = useState<{ name: string; class: string } | null>(
    null
  );
  const [kda, setKda] = useState<string>("");
  const [score, setScore] = useState<string>("");
  const [otherTeamScore, setOtherTeamScore] = useState<string>("");

  const notify_ok = (text: Renderable | ValueFunction<Renderable, Toast>) =>
    toast.success(text);
  const notify_err = (text: Renderable | ValueFunction<Renderable, Toast>) =>
    toast.error(text);

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

  const submitValorantStats = async () => {
    if (!userId || !agent) return;

    try {
      const response = await fetch(
        "http://esport/src/php/Member/GamesForms/insert_valorant_stats.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            agent_name: agent.name,
            agent_class: agent.class, // Ajoutez la classe de l'agent
            kda: kda,
            score: score,
            otherTeamScore: otherTeamScore,
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
    <div className="valoCard">
      <AreaChartStepValo />
      <form
        className="ValoInputs flex flex-wrap justify-between w-[90%]"
        onSubmit={(e) => {
          e.preventDefault();
          submitValorantStats();
        }}
      >
        <div className="flex flex-col gap-3">
          <ValoAgents onAgentChange={setAgent} />
          <ValoKDA value={kda} onChange={setKda} />
        </div>
        <div className="flex flex-col gap-3">
          <ValoScore value={score} onChange={setScore} />
          <ValoScoreOtherTeam
            value={otherTeamScore}
            onChange={setOtherTeamScore}
          />
        </div>
        <Button className="SubmitBtn">Sauvegarder</Button>
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default ValoCard;
