/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import TitleInscription from "../../perso/TitleInscription";
import FormReservation from "../../perso/FormReservation";
import { slide as Menu } from "react-burger-menu";
import useDevToolsProtection from "../../../Hooks/devToolsBlocker";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import ValoCard from "../../perso/gameProfileForms/valo";
import LolCard from "../../perso/gameProfileForms/lol";
import MkCard from "../../perso/gameProfileForms/mk";
import FcCard from "../../perso/gameProfileForms/fc";
import TmCard from "../../perso/gameProfileForms/tm";
import SmashCard from "../../perso/gameProfileForms/smash";

import "../../../assets/css/Dashboard.css";
import "../../../assets/css/reservation.css";

const Dashboard: React.FC = () => {
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

  return (
    <div className="dashboard">
      <Menu width={280}>
        <a id="home" className="menu-item" href="/dashboard">
          Tableau de bord
        </a>
        <a id="about" className="menu-item" href="/logout">
          Déconnexion
        </a>
      </Menu>
      <main className="dashboard-content">
        <h1 className="text-4xl">Bonjour {pseudo || "Utilisateur"} !</h1>

        <div className="container">
          <div className="cus_container_res">
            <TitleInscription />
            <FormReservation />
          </div>
        </div>
        <div className="tabs-container">
          <main>
            <Tabs defaultValue="account" className="tabs">
              <TabsList className="grid w-full grid-cols-2 tablist">
                <TabsTrigger value="lol">League of Legends</TabsTrigger>
                <TabsTrigger value="valo">Valorant</TabsTrigger>
                <TabsTrigger value="tm">Trackmania</TabsTrigger>
                <TabsTrigger value="mk">Mario Kart</TabsTrigger>
                <TabsTrigger value="smash">Super Smash Bros</TabsTrigger>
                <TabsTrigger value="fc">FC24</TabsTrigger>
              </TabsList>
              <TabsContent value="lol">
                <Card className="profile-card">
                  <CardHeader>
                    <CardTitle>League of Legends</CardTitle>
                    <CardDescription>
                      Changez votre profil League of Legend
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <LolCard />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="valo">
                <Card className="profile-card">
                  <CardHeader>
                    <CardTitle>Valorant</CardTitle>
                    <CardDescription>
                      Changez votre profil Valorant
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ValoCard />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tm">
                <Card className="profile-card">
                  <CardHeader>
                    <CardTitle>Trackmania</CardTitle>
                    <CardDescription>
                      Changez votre profil Trackmania
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <TmCard />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="mk">
                <Card className="profile-card">
                  <CardHeader>
                    <CardTitle>Mario Kart</CardTitle>
                    <CardDescription>
                      Changez votre profil Mario Kart
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <MkCard />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="smash">
                <Card className="profile-card">
                  <CardHeader>
                    <CardTitle>Super Smash Bros</CardTitle>
                    <CardDescription>
                      Changez votre profil Super Smash Bros
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <SmashCard />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="fc">
                <Card className="profile-card">
                  <CardHeader>
                    <CardTitle>FC24</CardTitle>
                    <CardDescription>Changez votre profil FC24</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <FcCard />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
