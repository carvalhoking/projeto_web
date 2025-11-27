# 📅 Controlador de Rotina

Um aplicativo moderno e intuitivo para gerenciar suas rotinas diárias, desenvolvido com React Native e Expo.

## 🎯 Funcionalidades

- ✅ **Autenticação**: Tela de login com validação de e-mail e senha
- 📝 **Gerenciamento de Rotinas**: Adicione, edite e exclua rotinas facilmente
- 🏷️ **Categorias**: Organize suas rotinas por categoria (Trabalho, Saúde, Pessoal, Estudo)
- ⏰ **Períodos**: Defina se a rotina é para manhã, tarde, noite ou dia todo
- ✔️ **Controle de Conclusão**: Marque rotinas como concluídas
- 📊 **Estatísticas**: Visualize o progresso das suas rotinas
- 🎨 **UI Moderna**: Interface bonita e responsiva

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado
- npm ou yarn
- Expo CLI (será instalado automaticamente)

### Instalação

1. Navegue até a pasta do projeto:
```bash
cd controlador-rotina
```

2. As dependências já foram instaladas, mas se necessário, execute:
```bash
npm install
```

### Executando o Aplicativo

#### No seu dispositivo físico (recomendado):

1. Instale o app Expo Go no seu celular:
   - [iOS - App Store](https://apps.apple.com/br/app/expo-go/id982107779)
   - [Android - Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Execute o projeto:
```bash
npm start
```

3. Escaneie o QR Code que aparecer no terminal com:
   - **iOS**: Câmera do iPhone
   - **Android**: App Expo Go

#### No navegador web:

```bash
npm run web
```

#### No emulador Android:

```bash
npm run android
```

#### No simulador iOS (somente macOS):

```bash
npm run ios
```

## 📱 Como Usar

### Login

1. Na tela de login, insira qualquer e-mail válido (que contenha @)
2. Digite uma senha com pelo menos 6 caracteres
3. Clique em "Entrar"

### Gerenciar Rotinas

1. Na tela principal, clique no botão **+** (flutuante no canto inferior direito)
2. Preencha:
   - **Título**: Nome da rotina (obrigatório)
   - **Descrição**: Detalhes adicionais (opcional)
   - **Categoria**: Escolha entre Trabalho, Saúde, Pessoal ou Estudo
   - **Período**: Manhã, Tarde, Noite ou Dia todo
3. Clique em "Salvar"

### Concluir Rotinas

- Clique no checkbox ao lado da rotina para marcar como concluída
- Clique novamente para desmarcar

### Excluir Rotinas

- Clique no ícone de lixeira no card da rotina
- Confirme a exclusão

### Sair

- Clique no ícone de logout no canto superior direito da tela principal

## 🛠️ Tecnologias Utilizadas

- **React Native**: Framework para desenvolvimento mobile
- **Expo**: Plataforma para desenvolvimento React Native
- **React Navigation**: Navegação entre telas
- **Context API**: Gerenciamento de estado global
- **Expo Vector Icons**: Ícones do Material Design

## 📂 Estrutura do Projeto

```
controlador-rotina/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── AddRoutineModal.js
│   │   └── RoutineItem.js
│   ├── contexts/            # Contextos React
│   │   ├── AuthContext.js
│   │   └── RoutineContext.js
│   ├── screens/             # Telas do aplicativo
│   │   ├── LoginScreen.js
│   │   └── HomeScreen.js
│   └── utils/               # Utilitários (para expansão futura)
├── assets/                  # Imagens e recursos
├── App.js                   # Componente principal
├── app.json                 # Configurações do Expo
└── package.json             # Dependências do projeto
```

## 🎨 Cores do Tema

- **Primary**: #6C5CE7 (Roxo)
- **Success**: #00B894 (Verde)
- **Info**: #0984E3 (Azul)
- **Warning**: #FDCB6E (Amarelo)
- **Danger**: #FF3B30 (Vermelho)
- **Background**: #F8F9FA (Cinza claro)
- **Text**: #2D3436 (Cinza escuro)

## 🔮 Melhorias Futuras

- [ ] Persistência de dados com AsyncStorage
- [ ] Notificações push para lembretes
- [ ] Temas claro/escuro
- [ ] Gráficos de progresso
- [ ] Compartilhamento de rotinas
- [ ] Sincronização em nuvem
- [ ] Widgets para tela inicial
- [ ] Integração com calendário

## 📄 Licença

Este projeto é livre para uso pessoal e educacional.

## 👨‍💻 Desenvolvedor

Projeto desenvolvido como exemplo de aplicativo de controle de rotina com React Native e Expo.

---

**Aproveite o app e organize suas rotinas! 🎯✨**
