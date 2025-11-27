export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Routine {
  id: string;
  title: string;
  description: string;
  time: string;
  days: DayOfWeek[];
  category: RoutineCategory;
  isCompleted: boolean;
  createdAt: Date;
  color: string;
}

export type DayOfWeek = 'Dom' | 'Seg' | 'Ter' | 'Qua' | 'Qui' | 'Sex' | 'Sáb';

export type RoutineCategory = 
  | 'exercício'
  | 'trabalho'
  | 'estudo'
  | 'saúde'
  | 'lazer'
  | 'alimentação'
  | 'sono'
  | 'outros';

export interface CategoryInfo {
  name: RoutineCategory;
  icon: string;
  color: string;
}
