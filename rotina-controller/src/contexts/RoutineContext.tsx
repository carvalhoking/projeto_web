import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Routine, DayOfWeek, RoutineCategory } from '../types';
import { colors } from '../theme/colors';

interface RoutineContextData {
  routines: Routine[];
  isLoading: boolean;
  addRoutine: (routine: Omit<Routine, 'id' | 'createdAt' | 'isCompleted'>) => Promise<void>;
  updateRoutine: (id: string, routine: Partial<Routine>) => Promise<void>;
  deleteRoutine: (id: string) => Promise<void>;
  toggleComplete: (id: string) => Promise<void>;
  getRoutinesForDay: (day: DayOfWeek) => Routine[];
  getTodayRoutines: () => Routine[];
  getCompletedCount: () => number;
}

const RoutineContext = createContext<RoutineContextData>({} as RoutineContextData);

interface RoutineProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = '@rotina-controller:routines';

export const RoutineProvider: React.FC<RoutineProviderProps> = ({ children }) => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRoutines();
  }, []);

  const loadRoutines = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Reset completed status daily
        const today = new Date().toDateString();
        const lastReset = await AsyncStorage.getItem('@rotina-controller:lastReset');
        
        if (lastReset !== today) {
          const resetRoutines = parsed.map((r: Routine) => ({ ...r, isCompleted: false }));
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(resetRoutines));
          await AsyncStorage.setItem('@rotina-controller:lastReset', today);
          setRoutines(resetRoutines);
        } else {
          setRoutines(parsed);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar rotinas:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveRoutines = async (newRoutines: Routine[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newRoutines));
      setRoutines(newRoutines);
    } catch (error) {
      console.error('Erro ao salvar rotinas:', error);
    }
  };

  const addRoutine = async (routineData: Omit<Routine, 'id' | 'createdAt' | 'isCompleted'>) => {
    const newRoutine: Routine = {
      ...routineData,
      id: Date.now().toString(),
      createdAt: new Date(),
      isCompleted: false,
      color: colors.categories[routineData.category] || colors.primary,
    };
    await saveRoutines([...routines, newRoutine]);
  };

  const updateRoutine = async (id: string, updates: Partial<Routine>) => {
    const updatedRoutines = routines.map(routine =>
      routine.id === id ? { ...routine, ...updates } : routine
    );
    await saveRoutines(updatedRoutines);
  };

  const deleteRoutine = async (id: string) => {
    const filteredRoutines = routines.filter(routine => routine.id !== id);
    await saveRoutines(filteredRoutines);
  };

  const toggleComplete = async (id: string) => {
    const updatedRoutines = routines.map(routine =>
      routine.id === id ? { ...routine, isCompleted: !routine.isCompleted } : routine
    );
    await saveRoutines(updatedRoutines);
  };

  const getRoutinesForDay = (day: DayOfWeek) => {
    return routines.filter(routine => routine.days.includes(day));
  };

  const getTodayRoutines = () => {
    const days: DayOfWeek[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const today = days[new Date().getDay()];
    return getRoutinesForDay(today).sort((a, b) => a.time.localeCompare(b.time));
  };

  const getCompletedCount = () => {
    const todayRoutines = getTodayRoutines();
    return todayRoutines.filter(r => r.isCompleted).length;
  };

  return (
    <RoutineContext.Provider
      value={{
        routines,
        isLoading,
        addRoutine,
        updateRoutine,
        deleteRoutine,
        toggleComplete,
        getRoutinesForDay,
        getTodayRoutines,
        getCompletedCount,
      }}
    >
      {children}
    </RoutineContext.Provider>
  );
};

export const useRoutines = () => {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutines deve ser usado dentro de um RoutineProvider');
  }
  return context;
};
