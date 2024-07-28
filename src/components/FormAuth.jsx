import React, { useState }from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/reservation.css";
import Input from './Input';
import Button from './Button';
import Notification from './Notification';

function FormAuth() {
    const [notification, setNotification] = useState('');
    const navigate = useNavigate();

    const handleSubmitRegister = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());
    
        try {
            const response = await fetch('http://esport/src/php/Auth/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject),
            });
    
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }
    
            const result = await response.json();
            setNotification(result.message || result.error || result.success);
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
            setNotification("Une erreur s'est produite lors de l'envoi du formulaire.");
        }
    };  
    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formDataObject = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://esport/src/php/Auth/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject),
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP ! statut : ${response.status}`);
            }

            const result = await response.json();
            
            if (result.success) {
                localStorage.setItem('email', result.email);
                localStorage.setItem('is_admin', result.is_admin)
                setNotification(result.message);
                // Redirection vers le dashboard ou admin_dashboard
                navigate(result.redirectUrl);
            } else {
                setNotification(result.message);
            }
        } catch (error) {
            console.error("Une erreur s'est produite :", error);
            setNotification("Une erreur s'est produite lors de l'envoi du formulaire.");
        }
    };    
    return (
        <div className='AuthSection'>
            <div className="cus_container">
                <form className="form_container" method="post" onSubmit={handleSubmitRegister}>
                    <h1 className='text-4xl my-5'>Inscription</h1>
                    <div className="form_control">
                        <Input
                            htmlFor="Email"
                            labelValue="Email"
                            InputName="Email"
                            InputId="Email"
                            type="email"
                        />
                        <Input
                            htmlFor="Pseudo"
                            labelValue="Pseudo"
                            InputName="Pseudo"
                            InputId="Pseudo"
                            type="text"
                        />
                    </div>
                        <Input
                            htmlFor="Password"
                            labelValue="Mot de passe"
                            InputName="Password"
                            InputId="Password"
                            type="password"
                        />
                    <Button 
                        type="submit"
                        classValue="submit"
                        text="S'inscrire"
                    />
                </form>
            </div>
            <div className="cus_container">
                <form className="form_container" method="post" onSubmit={handleSubmitLogin}>
                    <h1 className='text-4xl my-5'>Connexion</h1>
                        <Input
                            htmlFor="Email"
                            labelValue="Email"
                            InputName="Email"
                            InputId="Email"
                            type="email"
                        />
                        <Input
                            htmlFor="Password"
                            labelValue="Mot de passe"
                            InputName="Password"
                            InputId="Password"
                            type="password"
                        />
                    <Button 
                        type="submit"
                        classValue="submit"
                        text="Se connecter"
                    />
                </form>
            </div>
            {notification && <Notification message={notification} onClose={() => setNotification('')} />}
        </div>
    );
}

export default FormAuth;
