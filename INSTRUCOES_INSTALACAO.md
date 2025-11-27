# 📦 Instruções de Instalação - Controlador de Rotina

## 📥 Como Instalar o Projeto

### 1. Extrair o arquivo ZIP

Extraia o arquivo `routine-controller.zip` em uma pasta de sua preferência.

### 2. Instalar as dependências

Abra o terminal na pasta do projeto e execute:

```bash
cd routine-controller
npm install
```

Isso instalará todas as dependências necessárias:
- Expo
- React Navigation
- AsyncStorage
- React Native Screens
- E outras dependências

### 3. Executar o projeto

Após a instalação, execute um dos comandos abaixo:

```bash
# Para iniciar o servidor Expo
npm start

# Para Android
npm run android

# Para iOS (requer macOS)
npm run ios

# Para Web
npm run web
```

### 4. Usar o aplicativo

- **No dispositivo móvel**: Instale o app "Expo Go" e escaneie o QR code que aparecerá no terminal
- **No navegador**: Pressione `w` quando o servidor iniciar ou acesse a URL exibida
- **No emulador**: O app abrirá automaticamente se você tiver um emulador configurado

## 📋 Pré-requisitos

- Node.js instalado (versão 14 ou superior)
- npm ou yarn instalado
- Para Android: Android Studio e emulador configurado (opcional)
- Para iOS: Xcode e simulador (apenas no macOS)

## 🔐 Login

O sistema de login é simplificado para demonstração. Você pode usar qualquer email e senha para fazer login.

## 📱 Funcionalidades

- ✅ Tela de Login
- ✅ Dashboard com estatísticas
- ✅ Adicionar novas rotinas
- ✅ Visualizar lista de rotinas
- ✅ Excluir rotinas
- ✅ Persistência de dados local

## 🆘 Problemas Comuns

### Erro ao instalar dependências
```bash
# Limpe o cache do npm e tente novamente
npm cache clean --force
npm install
```

### Erro ao executar
```bash
# Certifique-se de estar na pasta correta
cd routine-controller

# Verifique se o Node.js está instalado
node --version

# Verifique se o Expo CLI está funcionando
npx expo --version
```

## 📞 Suporte

Se encontrar problemas, verifique:
1. Versão do Node.js (deve ser 14+)
2. Se todas as dependências foram instaladas corretamente
3. Se o Expo Go está instalado no dispositivo (para teste no celular)

---

**Projeto criado com Expo e React Native**
