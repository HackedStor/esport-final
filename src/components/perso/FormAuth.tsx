/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/login.css";
import Input from "./Input";
import Button from "./Button";
import toast, {
     Renderable,
     Toast,
     Toaster,
     ValueFunction,
} from "react-hot-toast";

const FormAuth: React.FC = () => {
     const navigate = useNavigate();

     const handleSubmit = async (e: FormEvent, url: string) => {
          e.preventDefault();

          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          const entries = Object.fromEntries(formData.entries());

          const formDataObject = url.includes("register")
               ? {
                    Email: entries.Email as string,
                    Pseudo: entries.Pseudo as string,
                    Password: entries.Password as string,
                    Classe: entries.Classe as string,
                 }
               : {
                    Email: entries.Email as string,
                    Password: entries.Password as string,
                 };

          try {
               const response = await fetch(url, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataObject),
               });

               if (!response.ok) {
                    throw new Error(
                         `Erreur HTTP ! statut : ${response.status}`
                    );
               }

               let result;
               try {
                    result = await response.json();
               } catch (jsonError) {
                    console.error("Invalid JSON response:", jsonError);
                    notify_err("Le serveur a renvoyé une réponse invalide.");
                    return;
               }

               if (url.includes("register")) {
                    if (result.success) notify_ok(result.success);
                    else if (result.error) notify_err(result.error);
                    else notify_neutral(result.message);
               } else {
                    if (result.success) {
                         localStorage.setItem("email", result.email);
                         localStorage.setItem("is_admin", result.is_admin);
                         notify_ok(result.message);
                         navigate(result.redirectUrl);
                    } else {
                         notify_err(result.message);
                    }
               }
          } catch (error) {
               console.error("Une erreur s'est produite :", error);
               notify_err(
                    "Une erreur s'est produite lors de l'envoi du formulaire."
               );
          }
     };

     const notify_ok = (text: Renderable | ValueFunction<Renderable, Toast>) =>
          toast.success(text);
     const notify_err = (text: Renderable | ValueFunction<Renderable, Toast>) =>
          toast.error(text);
     const notify_neutral = (
          text: Renderable | ValueFunction<Renderable, Toast>
     ) => toast(text);

     return (
          <div className="AuthSection">
               <div className="cus_container">
                    <form
                         className="form_container"
                         method="post"
                         onSubmit={(e) =>
                              handleSubmit(e, "/php/Auth/register.php")
                         }
                    >
                         <h1 className="text-4xl my-5 register-button">
                              Inscription
                         </h1>
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
                         <div className="form_control">
                              <Input
                                   htmlFor="Password"
                                   labelValue="Mot de passe"
                                   InputName="Password"
                                   InputId="Password"
                                   type="password"
                              />
                              <Input
                                   htmlFor="Classe"
                                   labelValue="Classe"
                                   InputName="Classe"
                                   InputId="Classe"
                                   type="text"
                              />
                         </div>
                         <Button
                              type="submit"
                              classValue="submit"
                              text="S'inscrire"
                         />
                    </form>
               </div>
               <div className="cus_container">
                    <form
                         className="form_container"
                         method="post"
                         onSubmit={(e) =>
                              handleSubmit(e, "/php/Auth/login.php")
                         }
                    >
                         <h1 className="text-4xl my-5 login-button">
                              Connexion
                         </h1>
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
