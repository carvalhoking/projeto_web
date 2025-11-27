import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from 'react';

export type FocusArea = 'Bem-estar' | 'Profissional' | 'Pessoal' | 'Saúde';

export interface Routine {
  id: string;
  title: string;
  description: string;
  time: string; // HH:mm
  focusArea: FocusArea;
  completed: boolean;
}

interface AddRoutinePayload extends Omit<Routine, 'id' | 'completed'> {}

interface RoutineContextValue {
  routines: Routine[];
  stats: {
    total: number;
    completed: number;
    pending: number;
  };
  upcoming: Routine[];
  toggleRoutine: (id: string) => void;
  addRoutine: (payload: AddRoutinePayload) => void;
}

const RoutineContext = createContext<RoutineContextValue | undefined>(undefined);

const initialRoutines: Routine[] = [
  {
    id: 'routine-1',
    title: 'Revisão do dia',
    description: 'Planejar prioridades e revisar compromissos da manhã.',
    time: '07:30',
    focusArea: 'Pessoal',
    completed: false,
  },
  {
    id: 'routine-2',
    title: 'Bloco de foco profissional',
    description: 'Trabalhar no projeto principal sem interrupções.',
    time: '10:00',
    focusArea: 'Profissional',
    completed: false,
  },
  {
    id: 'routine-3',
    title: 'Treino funcional',
    description: 'Sessão rápida de 30 minutos para movimentar o corpo.',
    time: '18:30',
    focusArea: 'Saúde',
    completed: true,
  },
];

const generateId = () => `routine-${Math.random().toString(36).slice(2, 9)}`;

const isValidTime = (value: string) => /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value);

export const RoutineProvider = ({ children }: { children: ReactNode }) => {
  const [routines, setRoutines] = useState<Routine[]>(initialRoutines);

  const toggleRoutine = useCallback((id: string) => {
    setRoutines((prev) =>
      prev.map((routine) =>
        routine.id === id ? { ...routine, completed: !routine.completed } : routine
      )
    );
  }, []);

  const addRoutine = useCallback((payload: AddRoutinePayload) => {
    if (!payload.title.trim()) {
      throw new Error('Nome da atividade é obrigatório.');
    }

    if (!isValidTime(payload.time)) {
      throw new Error('Hora inválida. Use o formato HH:MM.');
    }

    setRoutines((prev) =>
      [...prev, { ...payload, id: generateId(), completed: false }].sort((a, b) =>
        a.time.localeCompare(b.time)
      )
    );
  }, []);

  const stats = useMemo(() => {
    const total = routines.length;
    const completed = routines.filter((routine) => routine.completed).length;
    const pending = total - completed;

    return {
      total,
      completed,
      pending,
    };
  }, [routines]);

  const upcoming = useMemo(() => routines.filter((routine) => !routine.completed), [routines]);

  const value = useMemo(
    () => ({ routines, stats, upcoming, toggleRoutine, addRoutine }),
    [routines, stats, upcoming, toggleRoutine, addRoutine]
  );

  return <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>;
};

export const useRoutine = () => {
  const context = useContext(RoutineContext);

  if (!context) {
    throw new Error('useRoutine deve ser usado dentro de RoutineProvider.');
  }

  return context;
};
