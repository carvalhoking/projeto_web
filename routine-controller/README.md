# Controlador de Rotina - Expo App

Aplicativo mobile desenvolvido com React Native e Expo para gerenciamento de rotinas diárias.

## 📱 Funcionalidades

- **Tela de Login**: Autenticação simples com email e senha
- **Tela Inicial**: Dashboard com estatísticas e acesso rápido às funcionalidades
- **Adicionar Rotina**: Crie novas rotinas com título, descrição e horário
- **Lista de Rotinas**: Visualize todas as suas rotinas cadastradas
- **Persistência de Dados**: Dados salvos localmente usando AsyncStorage

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado
- Expo CLI instalado globalmente (ou usar npx)
- Expo Go app instalado no seu dispositivo móvel (iOS ou Android)

### Instalação

1. Navegue até a pasta do projeto:
```bash
cd routine-controller
```

2. Instale as dependências (já instaladas):
```bash
npm install
```

3. Inicie o servidor Expo:
```bash
npm start
```

Ou use os comandos específicos:
```bash
npm run android  # Para Android
npm run ios      # Para iOS (requer macOS)
npm run web      # Para web
```

## 📂 Estrutura do Projeto

```
routine-controller/
├── screens/
│   ├── LoginScreen.js          # Tela de login
│   ├── HomeScreen.js           # Tela inicial/dashboard
│   ├── AddRoutineScreen.js     # Tela para adicionar rotina
│   └── RoutineListScreen.js    # Tela de lista de rotinas
├── utils/
│   └── auth.js                 # Funções de autenticação e gerenciamento de rotinas
├── App.js                      # Componente principal com navegação
└── package.json                # Dependências do projeto
```

## 🔐 Login

O sistema de login é simplificado para demonstração. Qualquer email e senha válidos permitirão o acesso. Em produção, isso deveria ser conectado a uma API de autenticação real.

## 📝 Uso

1. **Login**: Digite qualquer email e senha para fazer login
2. **Adicionar Rotina**: Toque em "Nova Rotina" na tela inicial
3. **Ver Rotinas**: Toque em "Minhas Rotinas" para ver todas as rotinas cadastradas
4. **Excluir Rotina**: Toque no ícone de lixeira ao lado de uma rotina para excluí-la

## 🛠️ Tecnologias Utilizadas

- React Native
- Expo
- React Navigation
- AsyncStorage
- React Hooks

## 📄 Licença

Este projeto é de código aberto e está disponível para uso pessoal e educacional.
