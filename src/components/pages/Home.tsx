import "../../assets/css/Home.css";
import { GameList } from "../perso/gameList";
import MobilePopup from "../perso/mobilePopup";

function Home() {
  return (
    <>
      <MobilePopup />


      <div className="hero">
          <div className="hero-card">
            <h1 className="title-1 font-bold">
              Découvrez l'esport au lycée Jules Ferry
            </h1>
            <p>
              Le club d'esport du lycée Jules Ferry est une initiative visant à
              promouvoir l'esport au sein de notre établissement. Ici, vous pouvez
              vous inscrire pour noter vos statistiques, suivre votre évolution et
              réserver vos sessions de jeu. 
            </p>
          </div>
      </div>


      <section className="whyesport">
        <header className="whyesportHeader">
          <h2 className="title-3 font-bold">Pourquoi l'esport au lycée ?</h2>
        </header>
        <div className="whyEsportSection">
          <h1 className="whyEsportTitle">
            Développement de compétences spécifiques
          </h1>
          <div className="whyEsportSectionText">
            <p>
              L'esport demande plus que de simples réflexes rapides. Les joueurs
              doivent faire preuve de{" "}
              <span style={{ fontWeight: "bold" }}>concentration</span> intense
              sur des périodes prolongées. Chaque partie exige une attention
              constante pour analyser les mouvements de l'adversaire, adapter sa
              stratégie en temps réel, et réagir rapidement. Cela aide à
              améliorer des compétences cognitives précieuses, telles que la
              réactivité, la gestion de l'information visuelle et la prise de
              décision sous pression.
            </p>
            <p>
              De plus, le travail en équipe est crucial. Dans les jeux d'équipe
              (comme Valorant ou League of Legends), la{" "}
              <span style={{ fontWeight: "bold" }}>communication</span> entre
              les joueurs est primordiale. Chaque joueur a un rôle spécifique et
              doit être capable de transmettre des informations pertinentes à
              ses coéquipiers pour atteindre un objectif commun, ce qui renforce
              des compétences sociales et collaboratives essentielles pour la
              vie professionnelle.
            </p>
          </div>
        </div>
        <div className="whyEsportSectionRows">
          <div className="whyEsportSection">
            <h1 className="whyEsportTitle">
              Apprentissage de la gestion de la défaite
            </h1>
            <div className="whyEsportSectionText">
              <p>
                Dans les compétitions esportives, comme dans tout sport
                traditionnel, il y a des gagnants et des perdants. Contrairement
                à certaines activités où l'on peut "respawn" (revenir à la vie)
                sans grande conséquence, la défaite dans un tournoi d'esport a
                un poids significatif.{" "}
                <span style={{ fontWeight: "bold" }}>
                  Apprendre à gérer cette pression et à accepter la défaite
                </span>{" "}
                est une leçon importante pour les jeunes, car elle leur apprend
                la résilience et l'importance de tirer des leçons de leurs
                erreurs pour s'améliorer. C'est une compétence de vie
                essentielle, souvent négligée dans d'autres environnements
                éducatifs.
              </p>
            </div>
          </div>
          <div className="whyEsportSection">
            <h1 className="whyEsportTitle">
              Initiation aux technologies numériques
            </h1>
            <div className="whyEsportSectionText">
              <p>
                L'esport est, par essence, lié à des environnements
                technologiques complexes : logiciels de jeu, plateformes de
                streaming, matériel informatique de pointe, etc. En participant
                à des compétitions, les élèves se familiarisent avec ces outils,
                ce qui les prépare indirectement à des métiers du numérique. Que
                ce soit pour analyser les performances via des outils
                statistiques, configurer un streaming sur Twitch ou gérer les
                réseaux sociaux de l'équipe, les compétences acquises sont
                directement applicables à des secteurs en forte croissance,
                comme l'informatique, le marketing digital, ou l'analyse de
                données.
              </p>
            </div>
          </div>
        </div>
        <div className="whyEsportSectionRows">
          <div className="whyEsportSection">
            <h1 className="whyEsportTitle">
              Évolution des opportunités professionnelles
            </h1>
            <div className="whyEsportSectionText">
              <p>
                L'industrie de l'esport génère aujourd'hui des{" "}
                <span style={{ fontWeight: "bold" }}>milliards de dollars</span>
                , avec des opportunités variées allant de joueurs professionnels
                à analystes, en passant par commentateurs, streamers,
                développeurs ou managers d'équipe. L'introduction de l'esport au
                lycée donne aux étudiants une longueur d'avance sur ces
                opportunités, tout en leur offrant des compétences
                transférables. De plus, certaines universités offrent désormais
                des bourses esport aux étudiants talentueux, permettant à ces
                jeunes de combiner études et passion.
              </p>
            </div>
          </div>
          <div className="whyEsportSection"> 
            <h1 className="whyEsportTitle">
              Encourager un environnement inclusif et diversifié
            </h1>
            <div className="whyEsportSectionText">
              <p>
                Enfin, l'esport permet souvent d'effacer certaines barrières qui
                existent dans les sports traditionnels :{" "}
                <span style={{ fontWeight: "bold" }}>
                  barrières physiques, culturelles ou sociales
                </span>
                . Les élèves qui ne se retrouvent pas dans les sports classiques
                peuvent s'exprimer et briller dans l'esport. Il s'agit d'une
                opportunité pour des jeunes issus de différents horizons de
                participer à une activité compétitive et de créer des liens en
                dehors des critères physiques habituels.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="games">
        <header className="gamesHeader">
          <h2 className="title-4 font-bold">Jeux Disponibles</h2>
          <p>
            Nous offrons une variété de jeux pour répondre aux goûts de tous nos
            élèves. Découvrez les jeux disponibles pour nos sessions d'esport et
            commencez à vous entraîner dès aujourd'hui.
          </p>
        </header>
        <GameList />
      </section>

      <footer className="footer">
        <p>
          © 2025 Esport au Lycée Jules Ferry. Tous droits réservés. |
          <a href="/privacy"> Politique de confidentialité</a>
        </p>
      </footer>
    </>
  );
}

export default Home;
