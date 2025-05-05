import { useState, useEffect, FormEvent } from "react";
import Input from "./Input";
import SelectInputH from "./SelectInputH";
import SelectInputDate from "./SelectInputDate";
import Button from "./Button";
import "../../assets/css/reservation.css";
import toast, {
     Renderable,
     Toast,
     Toaster,
     ValueFunction,
} from "react-hot-toast";

interface Option {
     value: string;
     label: string;
}

const optionsDate: Option[] = getNextTwoWednesdays();

function getNextTwoWednesdays(): Option[] {
     const today = new Date();
     const dayOfWeek = today.getDay();
     const nextWednesday = new Date(today);
     nextWednesday.setDate(today.getDate() + ((3 - dayOfWeek + 7) % 7 || 7));

     const secondWednesday = new Date(nextWednesday);
     secondWednesday.setDate(nextWednesday.getDate() + 7);

     return [
          {
               value: nextWednesday.toISOString().split("T")[0],
               label: nextWednesday.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
               }),
          },
          {
               value: secondWednesday.toISOString().split("T")[0],
               label: secondWednesday.toLocaleDateString("fr-FR", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
               }),
          },
     ];
}

function FormReservation() {
     const [horaires, setHoraires] = useState<Option[]>([]);
     const [selectedDate, setSelectedDate] = useState<string>(
          optionsDate[0].value
     );
     const [userData, setUserData] = useState<string | null>(null);

     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);

          try {
               const response = await fetch(
                    "/php/Reservation/reservation.php",
                    {
                         method: "POST",
                         body: formData,
                    }
               );
               if (!response.ok) {
                    throw new Error(
                         `Erreur HTTP ! statut : ${response.status}`
                    );
               }

               const responseText = await response.text();
               try {
                    const result = JSON.parse(responseText);
                    if (result.success == false) notify_err(result.message);
                    else notify_ok(result.message);
               } catch (jsonError) {
                    console.error(
                         "Erreur lors du parsing du JSON :",
                         jsonError
                    );
                    notify_err(
                         "La réponse du serveur n'est pas au format JSON attendu."
                    );
               }
          } catch (error) {
               console.error("Une erreur s'est produite :", error);
               notify_err(
                    "Une erreur s'est produite lors de l'envoi du formulaire."
               );
          }
     };

     useEffect(() => {
          const fetchHoraires = async (date: string) => {
               try {
                    const response = await fetch("/php/ajax/getHoraires.php", {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({ date: date }),
                    });

                    if (!response.ok) {
                         throw new Error(
                              `Erreur HTTP ! statut : ${response.status}`
                         );
                    }

                    const data = await response.json();
                    setHoraires(
                         data.map(
                              (horaire: { id: string; horaire: string }) => ({
                                   value: horaire.id,
                                   label: horaire.horaire,
                              })
                         )
                    );
                    console.log(data);
               } catch (error) {
                    console.error(
                         "Une erreur s'est produite lors de la récupération des horaires :",
                         error
                    );
               }
          };

          fetchHoraires(selectedDate);
     }, [selectedDate]);

     useEffect(() => {
          const fetchUserData = async () => {
               const email = localStorage.getItem("email");

               try {
                    const response = await fetch(
                         "/php/Member/getUserData.php",
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
                         throw new Error(
                              "Réponse non-JSON du serveur: " + text
                         );
                    }

                    if (data.success) {
                         setUserData(data.id);
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

     const notify_ok = (text: Renderable | ValueFunction<Renderable, Toast>) =>
          toast.success(text);
     const notify_err = (text: Renderable | ValueFunction<Renderable, Toast>) =>
          toast.error(text);

     return (
          <div>
               <form
                    className="form_container"
                    method="post"
                    onSubmit={handleSubmit}
               >
                    {/* Input hidden pour userId */}
                    {userData && (
                         <input type="hidden" name="userId" value={userData} />
                    )}

                    <div className="form_control">
                         <Input
                              htmlFor="nom"
                              labelValue="Nom"
                              InputName="nom"
                              InputId="nom"
                              type="text"
                         />
                         <Input
                              htmlFor="prenom"
                              labelValue="Prénom"
                              InputName="prenom"
                              InputId="prenom"
                              type="text"
                         />
                    </div>
                    <Input
                         htmlFor="classe"
                         labelValue="Classe"
                         InputName="classe"
                         InputId="classe"
                         type="text"
                    />
                    <SelectInputDate
                         selectID="date"
                         selectName="Date"
                         options={optionsDate}
                         onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <SelectInputH
                         selectID="horaire"
                         selectName="Horaire"
                         options={horaires}
                    />
                    <Button type="submit" classValue="submit" text="Réserver" />
               </form>
               <Toaster position="bottom-right" />
          </div>
     );
}

export default FormReservation;
