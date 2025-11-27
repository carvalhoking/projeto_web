export const colors = {
  // Cores principais - Tema escuro sofisticado
  primary: '#6C63FF',
  primaryLight: '#8B85FF',
  primaryDark: '#5046E5',
  
  // Secundárias
  secondary: '#FF6B9D',
  secondaryLight: '#FF8EB5',
  secondaryDark: '#E5527F',
  
  // Cores de fundo
  background: '#0F0E17',
  backgroundLight: '#1A1925',
  backgroundCard: '#232136',
  
  // Texto
  text: '#FFFFFE',
  textSecondary: '#A7A9BE',
  textMuted: '#6B6B7B',
  
  // Estados
  success: '#2CB67D',
  warning: '#FFC857',
  error: '#FF6B6B',
  info: '#7B8CDE',
  
  // Categorias
  categories: {
    exercício: '#FF6B9D',
    trabalho: '#6C63FF',
    estudo: '#7B8CDE',
    saúde: '#2CB67D',
    lazer: '#FFC857',
    alimentação: '#FF8A5B',
    sono: '#9D8CFF',
    outros: '#A7A9BE',
  },
  
  // Gradientes
  gradients: {
    primary: ['#6C63FF', '#8B85FF'] as const,
    secondary: ['#FF6B9D', '#FF8EB5'] as const,
    dark: ['#0F0E17', '#1A1925'] as const,
    card: ['#232136', '#2D2B42'] as const,
    sunrise: ['#FF6B9D', '#FFC857'] as const,
    ocean: ['#6C63FF', '#2CB67D'] as const,
  },
  
  // Borda
  border: '#3D3B54',
  borderLight: '#4A4862',
};

export const categoryIcons: Record<string, string> = {
  exercício: 'fitness-outline',
  trabalho: 'briefcase-outline',
  estudo: 'book-outline',
  saúde: 'heart-outline',
  lazer: 'game-controller-outline',
  alimentação: 'restaurant-outline',
  sono: 'moon-outline',
  outros: 'ellipsis-horizontal-outline',
};
