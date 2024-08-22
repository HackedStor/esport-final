/* eslint-disable @typescript-eslint/no-explicit-any */
import { slide as Menu } from "react-burger-menu";
import "../../../assets/css/Dashboard.css";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

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
              <Card>
                <CardHeader>
                  <CardTitle>League of Legends</CardTitle>
                  <CardDescription>
                    Changez votre profil League of Legend
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">trucs a mettre</CardContent>
                <CardFooter>
                  <Button>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="valo">
              <Card>
                <CardHeader>
                  <CardTitle>Valorant</CardTitle>
                  <CardDescription>
                    Changez votre profil Valorant
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">trucs a mettre</CardContent>
                <CardFooter>
                  <Button>Save password</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
