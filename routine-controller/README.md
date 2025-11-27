# Controlador de Rotina

Um aplicativo mobile desenvolvido com React Native e Expo para gerenciar suas rotinas diárias.

## Funcionalidades

- ✅ Tela de login com validação de email
- ✅ Gerenciamento de rotinas (adicionar, marcar como concluída, excluir)
- ✅ Armazenamento local das rotinas
- ✅ Interface moderna e intuitiva
- ✅ Navegação entre telas

## Tecnologias Utilizadas

- React Native
- Expo
- React Navigation
- AsyncStorage

## Como Executar

### Pré-requisitos

- Node.js instalado
- Expo CLI (instalado automaticamente com o projeto)
- Expo Go app no seu dispositivo móvel (iOS ou Android)

### Instalação

1. Navegue até a pasta do projeto:
```bash
cd routine-controller
```

2. Instale as dependências (já instaladas):
```bash
npm install
```

### Executar o Projeto

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

Ou use os comandos específicos:

```bash
# Para Android
npm run android

# Para iOS
npm run ios

# Para Web
npm run web
```

Depois, escaneie o QR code com o app Expo Go no seu dispositivo.

## Estrutura do Projeto

```
routine-controller/
├── src/
│   ├── screens/
│   │   ├── LoginScreen.js      # Tela de login
│   │   └── HomeScreen.js       # Tela principal com rotinas
│   ├── navigation/
│   │   └── AppNavigator.js     # Configuração de navegação
│   └── components/             # Componentes reutilizáveis (vazio por enquanto)
├── App.js                      # Componente principal
├── app.json                    # Configuração do Expo
└── package.json                # Dependências do projeto
```

## Como Usar

1. **Login**: 
   - Digite um email válido e uma senha
   - Clique em "Entrar"
   - O login é simulado (não há validação real de credenciais)

2. **Gerenciar Rotinas**:
   - Clique em "+ Adicionar" para criar uma nova rotina
   - Toque em uma rotina para marcar como concluída/pendente
   - Mantenha pressionado uma rotina para excluí-la

3. **Logout**:
   - Clique no botão "Sair" no canto superior direito

## Notas

- As rotinas são armazenadas localmente no dispositivo usando AsyncStorage
- O login é simulado - em produção, você precisaria integrar com uma API de autenticação
- Os dados são mantidos mesmo após fechar o app

## Próximos Passos

- [ ] Integração com API de autenticação real
- [ ] Sincronização de dados na nuvem
- [ ] Notificações para lembretes de rotinas
- [ ] Categorias de rotinas
- [ ] Estatísticas e relatórios
- [ ] Modo escuro
