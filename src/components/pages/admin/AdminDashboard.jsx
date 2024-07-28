import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../css/Dashboard.css';

function AdminDashboard() {
    const [pseudo, setPseudo] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const email = localStorage.getItem('email');
            try {
                const response = await fetch('http://esport/src/php/Member/getUserData.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email }) // Assurez-vous que les cookies de session sont envoyés
                });
                
                const text = await response.text();
                
                let data;
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    throw new Error('Réponse non-JSON du serveur: ' + text);
                }
                
                if (data.success) {
                    setPseudo(data.pseudo);
                } else {
                    throw new Error(data.message || 'Erreur inconnue');
                }
            } catch (error) {
                console.error('Erreur détaillée:', error);
                console.error(error.message || 'Erreur lors de la récupération des données utilisateur');
            }
        };

        fetchUserData();
    }, []);

    return (
            <div className="dashboard">
                <aside className="sidebar">
                    <nav>
                        <ul className='mt-6'>
                            <li><Link to="/dashboard">Tableau de bord</Link></li>
                            <li><Link to="/admin/dashboard/actualites">Actualitées</Link></li>
                            <li><Link to="/dashboard/settings">Paramètres</Link></li>
                            <li><Link to="/logout">Déconnexion</Link></li>
                        </ul>
                    </nav>
                </aside>
                <main className="dashboard-content">
                    <h1 className='mt-5 text-5xl font-extrabold'>Bonjour Admin {pseudo || 'Utilisateur'} !</h1>
                </main>
            </div>
    );
}

export default AdminDashboard;
