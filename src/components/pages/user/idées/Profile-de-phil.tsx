/* eslint-disable @typescript-eslint/no-explicit-any */
import { slide as Menu } from "react-burger-menu";
import "../../../assets/css/Dashboard.css";
import FormComponent from "../../perso/le truc de phil";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
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
      <main>
        <FormComponent />
      </main>
    </div>
  );
};

export default Dashboard;
