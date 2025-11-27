# 📅 Rotina Controller

Um aplicativo moderno de controle de rotinas desenvolvido com Expo e React Native. Organize sua vida diária, defina metas e acompanhe seu progresso com uma interface elegante e intuitiva.

## ✨ Funcionalidades

- 🔐 **Autenticação** - Sistema de login e registro de usuários
- 📝 **Gerenciamento de Rotinas** - Adicione, edite e remova rotinas
- 📆 **Visualização por Dia** - Veja suas rotinas organizadas por dia da semana
- ✅ **Controle de Progresso** - Marque rotinas como concluídas
- 🏆 **Conquistas** - Sistema de gamificação para manter a motivação
- 🌙 **Tema Escuro** - Interface moderna com tema escuro sofisticado
- 📊 **Estatísticas** - Acompanhe seu desempenho diário

## 🛠️ Tecnologias

- **Expo** - Framework para React Native
- **React Navigation** - Navegação entre telas
- **TypeScript** - Tipagem estática
- **AsyncStorage** - Persistência de dados local
- **Expo SecureStore** - Armazenamento seguro de credenciais
- **Linear Gradient** - Gradientes visuais
- **Vector Icons** - Ícones Ionicons

## 📁 Estrutura do Projeto

```
rotina-controller/
├── App.tsx                 # Componente principal
├── src/
│   ├── contexts/           # Contextos React
│   │   ├── AuthContext.tsx     # Autenticação
│   │   └── RoutineContext.tsx  # Gerenciamento de rotinas
│   ├── navigation/         # Configuração de navegação
│   │   └── AppNavigator.tsx
│   ├── screens/            # Telas do app
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── AddRoutineScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── theme/              # Tema e cores
│   │   └── colors.ts
│   └── types/              # Tipos TypeScript
│       └── index.ts
└── package.json
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (v18+)
- npm ou yarn
- Expo CLI
- Expo Go app (para testar no dispositivo)

### Instalação

```bash
# Clone o repositório ou navegue até a pasta
cd rotina-controller

# Instale as dependências
npm install

# Inicie o projeto
npm start
```

### Executando no dispositivo

1. Instale o app **Expo Go** no seu celular
2. Execute `npm start` no terminal
3. Escaneie o QR Code com o app Expo Go

### Executando no emulador

```bash
# Android
npm run android

# iOS (apenas macOS)
npm run ios

# Web
npm run web
```

## 📱 Telas

### Tela de Login
- Campo de email e senha
- Opção de mostrar/ocultar senha
- Link para criar conta
- Botões de login social

### Tela de Registro
- Campos: nome, email, senha e confirmação
- Validação de requisitos de senha
- Link para voltar ao login

### Tela Principal (Home)
- Saudação personalizada
- Calendário semanal
- Card de progresso diário
- Lista de rotinas do dia
- Estatísticas rápidas

### Tela de Adicionar Rotina
- Campo de título e descrição
- Seleção de horário
- Seleção de dias da semana
- Categorias com cores personalizadas

### Tela de Perfil
- Informações do usuário
- Estatísticas gerais
- Conquistas desbloqueadas
- Configurações do app

## 🎨 Categorias de Rotinas

| Categoria | Cor | Ícone |
|-----------|-----|-------|
| Exercício | Rosa | 💪 |
| Trabalho | Roxo | 💼 |
| Estudo | Azul | 📚 |
| Saúde | Verde | ❤️ |
| Lazer | Amarelo | 🎮 |
| Alimentação | Laranja | 🍽️ |
| Sono | Lavanda | 🌙 |
| Outros | Cinza | ⋯ |

## 🔧 Configurações

O app salva automaticamente:
- Dados do usuário (SecureStore)
- Rotinas criadas (AsyncStorage)
- Estado de conclusão diário

## 📄 Licença

Este projeto foi criado para fins educacionais.

---

Desenvolvido com ❤️ usando React Native e Expo
