// AddNewsForm.jsx
import React, { useState } from "react";
import Input from "../../../Input";
import TextArea from "../../../Textarea";
import InputDate from "../../../InputDate";
import Button from "../../../Button";

import "../../../../css/reservation.css";
function AddNewsForm() {
    const [formData, setFormData] = useState({
        image: "",
        title: "",
        description: "",
        link: "",
        date: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://esport/src/php/Member/addNews.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (result.success) {
                alert('Actualité ajoutée avec succès !');
                setFormData({
                    image: "",
                    title: "",
                    description: "",
                    link: "",
                    date: ""
                });
            } else {
                alert('Erreur : ' + result.message);
            }
        } catch (error) {
            console.error('Erreur :', error);
            alert('Erreur lors de l\'ajout de l\'actualité.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="news-form form_container w-1/3 h-min" encType="multipart/form-data">
            <div className="form_control">
                <Input
                    htmlFor="image"
                    labelValue="Image"
                    InputName="image"
                    InputId="image"
                    value={formData.image}
                    onChange={handleChange}
                    type="file"
                    accept="image/*"
                />
                <Input
                    htmlFor="title"
                    labelValue="Titre"
                    InputName="title"
                    InputId="title"
                    value={formData.title}
                    onChange={handleChange}
                    type="text"
                />
            </div>
            <TextArea
                htmlFor="description"
                labelValue="Description"
                TextAreaName="description"
                TextAreaId="description"
                value={formData.description}
                onChange={handleChange}
            />
            <div className="form_control">
                <Input
                    htmlFor="link"
                    labelValue="Lien"
                    InputName="link"
                    InputId="link"
                    value={formData.link}
                    onChange={handleChange}
                    type="text"
                />
                <InputDate
                    htmlFor="date"
                    labelValue="Date"
                    InputName="date"
                    InputId="date"
                    value={formData.date}
                    onChange={handleChange}
                />
            </div>
            <Button
                type="submit"
                classValue="submit"
                text="Ajouter l'actualité"
            />
        </form>
    );
}

export default AddNewsForm;
