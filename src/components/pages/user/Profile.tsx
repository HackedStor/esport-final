/* eslint-disable @typescript-eslint/no-explicit-any */
import { slide as Menu } from "react-burger-menu";
import "../../../assets/css/Dashboard.css";
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

const Dashboard: React.FC = () => {
  return (
    <>
      <Menu width={280}>
        <a id="home" className="menu-item" href="/dashboard">
          Tableau de bord
        </a>
        <a id="about" className="menu-item" href="/dashboard/profile">
          Profil
        </a>
        <a id="about" className="menu-item" href="/logout">
          Déconnexion
        </a>
      </Menu>
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
                <CardContent className="space-y-2">trucs a mettre</CardContent>
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
                <CardContent className="space-y-2">trucs a mettre</CardContent>
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
                <CardContent className="space-y-2">trucs a mettre</CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="fc">
              <Card className="profile-card">
                <CardHeader>
                  <CardTitle>FC24</CardTitle>
                  <CardDescription>Changez votre profil FC24</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">trucs a mettre</CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
