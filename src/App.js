import React from "react";
import api from './services/api';
import "./styles.css";
import { useEffect } from "react";
import { useState } from "react";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositories();
  }, []);

  async function getRepositories() {
    const reps = await api.get('/repositories');
    if (reps.data.length > 0) {
      setRepositories(reps.data);
    }
  }

  async function handleAddRepository() {
    const res = await api.post('/repositories', {
      url: "https://github.com/josepholiveira",
      title: `Desafio ReactJS ${Date.now()}`,
      techs: ["React", "Node.js"],
    });

    setRepositories([...repositories,res.data]);
  }

  async function handleRemoveRepository(id) {
    const del = await api.delete(`repositories/${id}`);
    if (del) {
      const repositoriesClone = [...repositories];
      const filtered = repositoriesClone.filter(reps => reps.id !== id);
      setRepositories(filtered);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repo => (
            <li key={repo.id}>
              <h3>{repo.title}</h3>
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
               </button>
            </li>
          )
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
