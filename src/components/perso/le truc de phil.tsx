import React, { useState } from "react";

const FormComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>(""); // Stocke l'option sélectionnée

  // Gère le changement d'option
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  // Fonction pour afficher le formulaire et le texte selon l'option sélectionnée
  const renderFormForOption = (option: string) => {
    switch (option) {
      case "Option 1":
        return (
          <div>
            <form>
              <label htmlFor="input1">Entrée pour Option 1 :</label>
              <input id="input1" type="text" placeholder="Entrez un texte pour Option 1" />
            </form>
            <textarea rows={4} placeholder="Commentaires pour Option 1" />
          </div>
        );
      case "Option 2":
        return (
          <div>
            <form>
              <label htmlFor="input2">Entrée spécifique pour Option 2 :</label>
              <input id="input2" type="number" placeholder="Entrez un nombre pour Option 2" />
            </form>
            <textarea rows={4} placeholder="Commentaires détaillés pour Option 2" />
          </div>
        );
      case "Option 3":
        return (
          <div>
            <form>
              <label htmlFor="input3">Choix pour Option 3 :</label>
              <select id="input3">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </form>
            <textarea rows={4} placeholder="Commentaires pour Option 3" />
          </div>
        );
      case "Option 4":
        return (
          <div>
            <form>
              <label htmlFor="input4">Entrée texte pour Option 4 :</label>
              <input id="input4" type="text" placeholder="Texte pour Option 4" />
            </form>
            <textarea rows={4} placeholder="Commentaires pour Option 4" />
          </div>
        );
      case "Option 5":
        return (
          <div>
            <form>
              <label htmlFor="input5">Entrée spécifique pour Option 5 :</label>
              <input id="input5" type="email" placeholder="Email pour Option 5" />
            </form>
            <textarea rows={4} placeholder="Commentaires pour Option 5" />
          </div>
        );
      case "Option 6":
        return (
          <div>
            <form>
              <label htmlFor="input6">Entrée numérique pour Option 6 :</label>
              <input id="input6" type="number" placeholder="Numéro pour Option 6" />
            </form>
            <textarea rows={4} placeholder="Commentaires pour Option 6" />
          </div>
        );
      case "Option 7":
        return (
          <div>
            <form>
              <label htmlFor="input7">Texte libre pour Option 7 :</label>
              <textarea id="input7" rows={2} placeholder="Texte libre pour Option 7"></textarea>
            </form>
            <textarea rows={4} placeholder="Commentaires généraux pour Option 7" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <label htmlFor="select">Choisissez une option :</label>
      <select id="select" value={selectedOption} onChange={handleSelectChange}>
        <option value="">-- Sélectionnez une option --</option>
        <option value="Option 1">Option 1</option>
        <option value="Option 2">Option 2</option>
        <option value="Option 3">Option 3</option>
        <option value="Option 4">Option 4</option>
        <option value="Option 5">Option 5</option>
        <option value="Option 6">Option 6</option>
        <option value="Option 7">Option 7</option>
      </select>

      {/* Affichage dynamique du formulaire spécifique */}
      {selectedOption && renderFormForOption(selectedOption)}
    </div>
  );
};

export default FormComponent;
