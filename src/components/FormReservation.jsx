import React, { useState, useEffect } from 'react';
import Input from './Input';
import SelectInputH from './SeclectInputH';
import SelectInputDate from './SelectInputDate';
import Button from './Button';
import Notification from './Notification';
import "../css/reservation.css";

const optionsDate = getNextTwoWednesdays();

function getNextTwoWednesdays() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const nextWednesday = new Date(today);
    nextWednesday.setDate(today.getDate() + ((3 - dayOfWeek + 7) % 7 || 7));
    
    const secondWednesday = new Date(nextWednesday);
    secondWednesday.setDate(nextWednesday.getDate() + 7);
    
    return [
        { value: nextWednesday.toISOString().split('T')[0], label: nextWednesday.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) },
        { value: secondWednesday.toISOString().split('T')[0], label: secondWednesday.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) }
    ];
}

function FormReservation() {
    const [horaires, setHoraires] = useState([]);
    const [selectedDate, setSelectedDate] = useState(optionsDate[0].value);
    const [notification, setNotification] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        try {
            const response = await fetch('http://esport/src/php/Reservation/reservation.php', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setNotification(result.message);
        } catch (error) {
            console.error("There was an error:", error);
            setNotification("There was an error submitting the form.");
        }
    };

    useEffect(() => {
        const fetchHoraires = async (date) => {
            try {
                const response = await fetch('http://esport/src/php/ajax/tempName.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ date: date }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setHoraires(data);
                console.log(data);
            } catch (error) {
                console.error("There was an error fetching the horaires:", error);
            }
        };

        fetchHoraires(selectedDate);
    }, [selectedDate]);

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
                <div className="form_control">
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
                </div>
                <div className="form_control">
                    <Input
                        htmlFor="jeu"
                        labelValue="Jeu"
                        InputName="jeu"
                        InputId="jeu"
                        type="text"
                    />
                    <SelectInputH
                        selectID="Horaires" 
                        selectName="Horaires" 
                        options={horaires}
                    />
                </div>
                <Button 
                    type="submit"
                    classValue="submit"
                    text="Réserver une place"
                />
            </form>
            {notification && <Notification message={notification} onClose={() => setNotification('')} />}
        </div>
    );
}

export default FormReservation;
