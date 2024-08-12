// FormReservation.tsx
import { useState, useEffect, FormEvent } from "react";
import Input from "./Input";
import SelectInputH from "./SelectInputH";
import SelectInputDate from "./SelectInputDate";
import Button from "./Button";
import "../../assets/css/reservation.css";
import toast, { Renderable, Toast, Toaster, ValueFunction } from 'react-hot-toast';


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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch(
        "http://esport/src/php/Reservation/reservation.php",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      notify_ok(result.message);
    } catch (error) {
      console.error("There was an error:", error);
      notify_err("There was an error submitting the form.");
    }
  };

  useEffect(() => {
    const fetchHoraires = async (date: string) => {
      try {
        const response = await fetch(
          "http://esport/src/php/ajax/getHoraires.php",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ date: date }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setHoraires(
          data.map((horaire: string) => ({ value: horaire, label: horaire }))
        );
        console.log(data);
      } catch (error) {
        console.error("There was an error fetching the horaires:", error);
      }
    };

    fetchHoraires(selectedDate);
  }, [selectedDate]);

  const notify_ok = (text: Renderable | ValueFunction<Renderable, Toast>) => toast.success(text)
  const notify_err = (text: Renderable | ValueFunction<Renderable, Toast>) => toast.error(text)

  return (
    <div>
      <form className="form_container" method="post" onSubmit={handleSubmit}>
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
      <Toaster />
    </div>
  );
}

export default FormReservation;
