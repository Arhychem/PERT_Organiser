import React, { useContext, useState, createContext } from "react";

export const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const AppContext = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [sommets, setSommets] = useState(0);
  const [finalTasks,setFinalTasks] = useState([]);

  const data = {
    isModalOpen,
    setIsModalOpen,
    sommets,
    setSommets,
    finalTasks,
    setFinalTasks
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <GlobalContext.Provider value={data}>{children}</GlobalContext.Provider>
  );
};

export default AppContext;