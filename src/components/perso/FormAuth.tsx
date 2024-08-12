import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../assets/css/login.css";
import Input from './Input';
import Button from './Button';
import toast, { Renderable, Toast, Toaster, ValueFunction } from 'react-hot-toast';


type FormData = {
  Email: string;
  Pseudo?: string;
  Password: string;
};

const FormAuth: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent, url: string) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formDataObject: FormData = Object.fromEntries(formData.entries()) as any;

    try {
      const response = await fetch(url, {
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

      if (url.includes('register')) {
        notify_ok(result.message || result.error || result.success);
      } else {
        if (result.success) {
          localStorage.setItem('email', result.email);
          localStorage.setItem('is_admin', result.is_admin);
          notify_ok(result.message);
          navigate(result.redirectUrl);
        } else {
          notify_ok(result.message);
        }
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      notify_err("Une erreur s'est produite lors de l'envoi du formulaire.");
    }
  };

  const notify_ok = (text: Renderable | ValueFunction<Renderable, Toast>) => toast.success(text)
  const notify_err = (text: Renderable | ValueFunction<Renderable, Toast>) => toast.error(text)

  return (
    <div className='AuthSection'>
      <div className="cus_container">
        <form className="form_container" method="post" onSubmit={(e) => handleSubmit(e, 'http://esport/src/php/Auth/register.php')}>
          <h1 className='text-4xl my-5 register-button'>Inscription</h1>
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
        <form className="form_container" method="post" onSubmit={(e) => handleSubmit(e, 'http://esport/src/php/Auth/login.php')}>
          <h1 className='text-4xl my-5 login-button'>Connexion</h1>
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
      <Toaster />
    </div>
  );
};

export default FormAuth;