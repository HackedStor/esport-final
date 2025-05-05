import '../../assets/css/Privacy.css';

export default function Privacy() {
    return (
        <div className="privacy-container">
            <h1>Politique de Confidentialité</h1>
            <h3>Dernière mise a jour le 5 mai 2025</h3>
            <p>
                Bienvenue sur le site du club e-sport !
                La protection de vos données personnelles est importante pour nous (parce qu'on n'a pas envie d'aller en prison, déjà).
            </p>
            <hr className='separator' />
            <h3>1. Données collectées</h3>
            <p>
                Lors de votre inscription, nous collectons les informations suivantes :
            </p>
            <ul>
                <li>Addresse e-mail</li>
                <li>Nom d'utilisateur</li>
                <li>Mot de passe (illisible même pour nous)</li>
                <li>Classe</li>
            </ul>
            <p>
                Et c'est tout ! Pas de numéro de carte bleue, pas de numéro de sécurité sociale, pas de photo de votre chien.
            </p>
            <hr className='separator' />
            <h3>2. Utilisation des données</h3>
            <p>
                Nous utilisons vos données pour :
            </p>
            <ul>
                <li>Gérer votre compte et votre acces au site</li>
                <li>Afficher vos statistiques de jeu/performances</li>
                <li>Gérer les réservations de séances</li>
                <li>Permettre à l'administrateur (le prof) de valider votre présence</li>
            </ul>
            <p>
                On ne vend rien, on ne donne rien, on ne vous suit pas en douce.
            </p>
            <hr className='separator' />
            <h3>3. Sécurité des données</h3>
            <p>
                Vos mots de passe sont hashés (cryptés de manière irréversible).
                L'accès aux données est limité aux personnes autorisées (aka le prof et le site lui-même).

                Malgré nos efforts, Internet n'est pas magique : en cas de problème de sécurité majeur, on vous préviendra.
            </p>
            <hr className='separator' />
            <h3>4. Vos droits</h3>
            <p>
                Conformément à la loi "Informatique et Libertés" et au RGPD :
            </p>
            <ul>
                <li>Vous pouvez demander l'accès, la correction ou la suppression de vos données.</li>
                <li>Vous pouvez aussi râler si vous pensez qu'on abuse (on préfère éviter, hein).</li>
            </ul>
            <p>
                Pour toute demande, contactez le professeur responsable du club (Gautier Roux).
                Il ne mord pas, promis !
            </p>
        </div>
    );
}