# 📱 Preview das Telas

## 🔐 TELA DE LOGIN

```
┌──────────────────────────────────────┐
│                                      │
│         [Ícone de Relógio] 🕐        │
│                                      │
│     Controlador de Rotina           │
│   Organize sua vida, um dia         │
│        de cada vez                  │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  📧  E-mail                    │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  🔒  Senha              👁      │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │         ENTRAR                 │ │
│  └────────────────────────────────┘ │
│                                      │
│      Esqueceu sua senha?            │
│                                      │
│  Não tem uma conta? Cadastre-se    │
│                                      │
└──────────────────────────────────────┘
```

### Elementos:
- ✅ Ícone grande centralizado (roxo)
- ✅ Título do app
- ✅ Subtítulo motivacional
- ✅ Campo de e-mail com ícone
- ✅ Campo de senha com toggle
- ✅ Botão de entrar (roxo)
- ✅ Link "Esqueceu senha"
- ✅ Link "Cadastre-se"

---

## 🏠 TELA PRINCIPAL (HOME)

```
┌──────────────────────────────────────┐
│  Olá!                          🚪   │
│  usuario@email.com                  │
│                                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐│
│  │  ✅     │ │  📋     │ │  📝     ││
│  │   0     │ │   0     │ │   0     ││
│  │Concluí- │ │Penden-  │ │ Total   ││
│  │ das     │ │tes      │ │         ││
│  └─────────┘ └─────────┘ └─────────┘│
│                                      │
│  Minhas Rotinas                      │
│  0 rotinas cadastradas               │
│                                      │
│  ┌────────────────────────────────┐ │
│  │      [Ícone Grande] 📅          │ │
│  │                                 │ │
│  │   Nenhuma rotina ainda         │ │
│  │                                 │ │
│  │  Comece adicionando sua        │ │
│  │  primeira rotina diária!       │ │
│  └────────────────────────────────┘ │
│                                      │
│                                      │
│                               ┌───┐ │
│                               │ + │ │
│                               └───┘ │
└──────────────────────────────────────┘
```

### Seções:

#### 1. Cabeçalho:
- Saudação "Olá!"
- E-mail do usuário
- Botão de logout

#### 2. Estatísticas (3 cards):
- Card verde: Rotinas concluídas
- Card roxo: Rotinas pendentes
- Card azul: Total de rotinas

#### 3. Lista de Rotinas:
- Título "Minhas Rotinas"
- Contador de rotinas
- Lista (vazia inicialmente)
- Mensagem quando vazio

#### 4. Botão Flutuante:
- Botão + no canto inferior direito
- Cor roxa com sombra
- Abre modal para adicionar

---

## 📝 TELA COM ROTINAS

```
┌──────────────────────────────────────┐
│  Olá!                          🚪   │
│  usuario@email.com                  │
│                                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐│
│  │  ✅     │ │  📋     │ │  📝     ││
│  │   1     │ │   2     │ │   3     ││
│  │Concluí- │ │Penden-  │ │ Total   ││
│  │das     │ │tes      │ │         ││
│  └─────────┘ └─────────┘ └─────────┘│
│                                      │
│  Minhas Rotinas                      │
│  3 rotinas cadastradas               │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ ✅ Fazer exercícios        🗑 │ │
│  │    30 minutos de caminhada    │ │
│  │    💚 Saúde    ☀️ Manhã      │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ ☐ Estudar React Native     🗑 │ │
│  │    Capítulo 5 - Navegação     │ │
│  │    💛 Estudo   🌙 Noite       │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ ☐ Revisar e-mails          🗑 │ │
│  │    Responder prioritários     │ │
│  │    🔵 Trabalho ☀️ Manhã      │ │
│  └────────────────────────────────┘ │
│                               ┌───┐ │
│                               │ + │ │
│                               └───┘ │
└──────────────────────────────────────┘
```

### Card de Rotina:

```
┌────────────────────────────────────┐
│ [✅] Título da Rotina         [🗑] │
│      Descrição da rotina...        │
│      [💚 Categoria] [☀️ Período]  │
└────────────────────────────────────┘
```

- ✅ Checkbox para marcar concluída
- Título em negrito
- Descrição em cinza
- Tags coloridas (categoria + período)
- Botão de excluir no canto direito

---

## ➕ MODAL DE ADICIONAR ROTINA

```
┌──────────────────────────────────────┐
│  Nova Rotina                    ✕   │
├──────────────────────────────────────┤
│                                      │
│  Título *                            │
│  ┌────────────────────────────────┐ │
│  │ Ex: Fazer exercícios           │ │
│  └────────────────────────────────┘ │
│                                      │
│  Descrição (opcional)                │
│  ┌────────────────────────────────┐ │
│  │ Adicione mais detalhes...      │ │
│  │                                 │ │
│  └────────────────────────────────┘ │
│                                      │
│  Categoria                           │
│  ┌──────────┐ ┌──────────┐          │
│  │ 🔵 Trabal│ │ 💚 Saúde │          │
│  └──────────┘ └──────────┘          │
│  ┌──────────┐ ┌──────────┐          │
│  │ 💜 Pessoa│ │ 💛 Estudo│          │
│  └──────────┘ └──────────┘          │
│                                      │
│  Período                             │
│  ┌──────────┐ ┌──────────┐          │
│  │ ☀️ Manhã │ │ ☁️ Tarde │          │
│  └──────────┘ └──────────┘          │
│  ┌──────────┐ ┌──────────┐          │
│  │ 🌙 Noite │ │ ⏰ Dia to│          │
│  └──────────┘ └──────────┘          │
│                                      │
├──────────────────────────────────────┤
│  ┌──────────┐    ┌──────────┐       │
│  │ Cancelar │    │  Salvar  │       │
│  └──────────┘    └──────────┘       │
└──────────────────────────────────────┘
```

### Elementos do Modal:

1. **Cabeçalho:**
   - Título "Nova Rotina"
   - Botão de fechar (X)

2. **Formulário:**
   - Campo título (obrigatório)
   - Campo descrição (opcional)
   - Seletor de categoria (4 opções)
   - Seletor de período (4 opções)

3. **Rodapé:**
   - Botão "Cancelar" (cinza)
   - Botão "Salvar" (roxo)

---

## 🎨 CORES E ÍCONES

### Categorias:
```
🔵 Trabalho   - Azul (#0984E3)   - Ícone: work
💚 Saúde      - Verde (#00B894)  - Ícone: favorite
💜 Pessoal    - Roxo (#6C5CE7)   - Ícone: person
💛 Estudo     - Amarelo (#FDCB6E)- Ícone: school
```

### Períodos:
```
☀️ Manhã      - Ícone: wb-sunny
☁️ Tarde      - Ícone: wb-cloudy
🌙 Noite      - Ícone: nights-stay
⏰ Dia todo   - Ícone: schedule
```

### Estados:
```
✅ Concluída   - Verde (#00B894)
☐ Pendente    - Cinza (#B2BEC3)
```

---

## 📐 LAYOUT E ESPAÇAMENTO

### Padrões de Design:

```
Padding:
- Telas: 20px
- Cards: 16px
- Inputs: 16px

Border Radius:
- Cards: 16px
- Botões: 12px
- Inputs: 12px
- Tags: 12px

Sombras:
- Cards: elevation 2
- Botões: elevation 4
- FAB: elevation 8

Fontes:
- Título: 28px (bold)
- Subtítulo: 16px
- Corpo: 16px
- Card título: 16px (semibold)
- Tags: 12px (semibold)
```

---

## 🎯 FLUXO DE NAVEGAÇÃO

```
[Tela de Login]
      │
      │ (após login)
      ↓
[Tela Principal]
      │
      ├─→ Clica em "+" → [Modal de Adicionar]
      │                        │
      │                        │ (salva)
      │                        ↓
      │                  [Tela Principal]
      │
      ├─→ Clica em checkbox → Marca/Desmarca rotina
      │
      ├─→ Clica em 🗑 → Confirma → Remove rotina
      │
      └─→ Clica em 🚪 → [Tela de Login]
```

---

## 📱 RESPONSIVIDADE

### Mobile (padrão):
- Layout vertical
- Cards empilhados
- FAB no canto inferior direito
- Modal ocupa 90% da tela

### Tablet/Web:
- Mesma estrutura
- Elementos maiores
- Melhor uso do espaço horizontal

---

## ✨ ANIMAÇÕES E INTERAÇÕES

### Feedback Visual:
- ✅ Botões: Efeito de pressão
- ✅ Checkbox: Animação ao marcar/desmarcar
- ✅ Modal: Slide de baixo para cima
- ✅ Lista: Scroll suave
- ✅ FAB: Sombra maior ao pressionar

### Estados:
- ✅ Hover (web)
- ✅ Pressed
- ✅ Disabled
- ✅ Loading

---

**Design moderno, intuitivo e profissional! 🎨✨**
