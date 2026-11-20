
import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  // GET all toys
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data))
      .catch((error) => console.error(error));
  }, []);

  function handleClick() {
    setShowForm((previous) => !previous);
  }

  // Add a new toy to state
  function handleAddToy(newToy) {
    setToys((previous) => [...previous, newToy]);
  }

  // Remove a deleted toy from state
  function handleDeleteToy(id) {
    setToys((previous) =>
      previous.filter((toy) => toy.id !== id)
    );
  }

  // Update a toy without changing its position
  function handleUpdateToy(updatedToy) {
    setToys((previous) =>
      previous.map((toy) =>
        toy.id === updatedToy.id ? updatedToy : toy
      )
    );
  }

  return (
    <>
      <Header />

      {showForm ? (
        <ToyForm onAddToy={handleAddToy} />
      ) : null}

      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>

      <ToyContainer
        toys={toys}
        onDeleteToy={handleDeleteToy}
        onUpdateToy={handleUpdateToy}
      />
    </>
  );
}

export default App;
