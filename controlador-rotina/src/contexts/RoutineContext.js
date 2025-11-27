import React, { createContext, useState, useContext } from 'react';

const RoutineContext = createContext({});

export const RoutineProvider = ({ children }) => {
  const [routines, setRoutines] = useState([]);

  const addRoutine = (routine) => {
    const newRoutine = {
      id: Date.now().toString(),
      ...routine,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setRoutines([...routines, newRoutine]);
  };

  const updateRoutine = (id, updates) => {
    setRoutines(routines.map(routine => 
      routine.id === id ? { ...routine, ...updates } : routine
    ));
  };

  const deleteRoutine = (id) => {
    setRoutines(routines.filter(routine => routine.id !== id));
  };

  const toggleRoutine = (id) => {
    setRoutines(routines.map(routine => 
      routine.id === id ? { ...routine, completed: !routine.completed } : routine
    ));
  };

  return (
    <RoutineContext.Provider value={{ 
      routines, 
      addRoutine, 
      updateRoutine, 
      deleteRoutine, 
      toggleRoutine 
    }}>
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutines = () => useContext(RoutineContext);
