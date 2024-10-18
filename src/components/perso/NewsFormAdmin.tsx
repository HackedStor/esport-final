import React, { useState, ChangeEvent, FormEvent } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import InputDate from "./InputDate";
import Button from "./Button";
import toast, {
  Renderable,
  Toast,
  Toaster,
  ValueFunction,
} from "react-hot-toast";

import "../../assets/css/reservation.css";

type FormDataState = {
  title: string;
  description: string;
  link: string;
  date: string;
  image: File | null;
};
 
const AddNewsForm: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    image: null,
    title: "",
    description: "",
    link: "",
    date: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const target = e.target as HTMLInputElement; // Cast e.target en HTMLInputElement
      const files = target.files;
      if (files && files.length > 0) {
        setFormData({
          ...formData,
          [name]: files[0], // Stocker le premier fichier
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("link", formData.link);
    form.append("date", formData.date);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      const response = await fetch("http://www.lycee-ferry-versailles.fr:5173/src/php/Member/addNews.php", {
        method: "POST",
        body: form,
      });
      console.log(form);

      const result = await response.json();
      if (result.success) {
        notify_ok("L'actualité à bien été ajouté !");
        setFormData({
          image: null,
          title: "",
          description: "",
          link: "",
          date: "",
        });
      } else {
        notify_err(
          "Nous sommes désolé il y a eu une erreur :" + result.message
        );
        console.log("Erreur : " + result.message);
      }
    } catch (error) {
      notify_err("Nous sommes désolé il y a eu une erreur :" + error);
      console.error("Erreur :", error);
      console.log("Erreur lors de l'ajout de l'actualité.");
    }
  };
  const notify_ok = (text: Renderable | ValueFunction<Renderable, Toast>) =>
    toast.success(text);
  const notify_err = (text: Renderable | ValueFunction<Renderable, Toast>) =>
    toast.error(text);
  return (
    <div className="news-form-section">
      <form
        onSubmit={handleSubmit}
        className="news-form form_container w-1/3 h-min"
        encType="multipart/form-data"
      >
        <div className="form_control">
          <Input
            htmlFor="image"
            labelValue="Image"
            InputName="image"
            InputId="image"
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
        <Button type="submit" classValue="submit" text="Ajouter l'actualité" />
      </form>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default AddNewsForm;
