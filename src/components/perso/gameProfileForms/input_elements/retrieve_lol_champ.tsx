import { useEffect, useState } from "react";

interface Champion {
  id: string;
  name: string;
  tags: string[];
}

const useFetchChampions = (): { champions: Champion[]; error: string | null } => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://esport/src/php/ajax/getLolChamp.php") // URL de ton script PHP
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des champions.");
        }
        return response.json();
      })
      .then((data) => {
        const championsArray = Object.values(data.data) as Champion[];
        setChampions(championsArray);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return { champions, error };
};

const ChampionsAPI = () => {
  const { champions, error } = useFetchChampions();

  if (error) {
    return <pre>{JSON.stringify({ error }, null, 2)}</pre>;
  }

  return <pre>{JSON.stringify(champions, null, 2)}</pre>;
};

export default ChampionsAPI;
