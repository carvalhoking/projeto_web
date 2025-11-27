import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@routine_user';
const ROUTINES_KEY = '@routine_routines';

// Função para fazer login
export const login = async (email, password) => {
  // Simulação de autenticação - em produção, isso seria uma chamada à API
  if (email && password) {
    const user = {
      email,
      loggedIn: true,
      loginTime: new Date().toISOString(),
    };
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, error: 'Email e senha são obrigatórios' };
};

// Função para fazer logout
export const logout = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};

// Verificar se o usuário está logado
export const isLoggedIn = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    if (userData) {
      const user = JSON.parse(userData);
      return user.loggedIn === true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

// Obter dados do usuário
export const getUser = async () => {
  try {
    const userData = await AsyncStorage.getItem(USER_KEY);
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    return null;
  }
};

// Funções para gerenciar rotinas
export const getRoutines = async () => {
  try {
    const routinesData = await AsyncStorage.getItem(ROUTINES_KEY);
    if (routinesData) {
      return JSON.parse(routinesData);
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const saveRoutine = async (routine) => {
  try {
    const routines = await getRoutines();
    const newRoutine = {
      id: Date.now().toString(),
      ...routine,
      createdAt: new Date().toISOString(),
    };
    routines.push(newRoutine);
    await AsyncStorage.setItem(ROUTINES_KEY, JSON.stringify(routines));
    return { success: true, routine: newRoutine };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteRoutine = async (routineId) => {
  try {
    const routines = await getRoutines();
    const filteredRoutines = routines.filter((r) => r.id !== routineId);
    await AsyncStorage.setItem(ROUTINES_KEY, JSON.stringify(filteredRoutines));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
