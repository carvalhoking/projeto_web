# 📱 Funcionalidades Detalhadas

## 🔐 Tela de Login

### Recursos:
- ✅ Validação de e-mail (precisa conter @)
- ✅ Validação de senha (mínimo 6 caracteres)
- ✅ Mostrar/ocultar senha
- ✅ Design moderno com ícones
- ✅ Mensagens de erro amigáveis

### Como usar:
1. Digite um e-mail válido (ex: usuario@email.com)
2. Digite uma senha com pelo menos 6 caracteres
3. Clique em "Entrar"

**Nota:** O sistema aceita qualquer e-mail/senha válidos (não há backend real)

---

## 🏠 Tela Principal (Home)

### Componentes:

#### 1. Cabeçalho
- Saudação personalizada
- E-mail do usuário
- Botão de logout

#### 2. Cards de Estatísticas (3 cards)
- **Concluídas**: Quantas rotinas você completou
- **Pendentes**: Quantas rotinas ainda faltam
- **Total**: Total de rotinas cadastradas

#### 3. Lista de Rotinas
Cada rotina mostra:
- Checkbox para marcar como concluída
- Título da rotina
- Descrição (se houver)
- Categoria com cor (Trabalho, Saúde, Pessoal, Estudo)
- Período (Manhã, Tarde, Noite, Dia todo)
- Botão de excluir

#### 4. Botão Flutuante (+)
- Localizado no canto inferior direito
- Abre o modal para adicionar nova rotina

---

## ➕ Adicionar Nova Rotina

### Modal com formulário completo:

#### Campos:

1. **Título*** (obrigatório)
   - Máximo 50 caracteres
   - Exemplo: "Fazer exercícios"

2. **Descrição** (opcional)
   - Máximo 200 caracteres
   - Exemplo: "30 minutos de caminhada"

3. **Categoria** (obrigatório)
   - 🔵 **Trabalho**: Para tarefas profissionais
   - 💚 **Saúde**: Para atividades de saúde e bem-estar
   - 💜 **Pessoal**: Para tarefas pessoais
   - 💛 **Estudo**: Para atividades de aprendizado

4. **Período** (obrigatório)
   - ☀️ **Manhã**: 6h às 12h
   - ☁️ **Tarde**: 12h às 18h
   - 🌙 **Noite**: 18h às 24h
   - ⏰ **Dia todo**: Qualquer horário

### Ações:
- **Cancelar**: Fecha o modal sem salvar
- **Salvar**: Adiciona a rotina à lista

---

## ✅ Marcar Rotina como Concluída

### Como funciona:
1. Clique no checkbox ao lado da rotina
2. A rotina fica com aparência "riscada"
3. O contador de "Concluídas" aumenta
4. O contador de "Pendentes" diminui

### Para desmarcar:
- Clique novamente no checkbox
- A rotina volta ao estado normal

---

## 🗑️ Excluir Rotina

### Como funciona:
1. Clique no ícone de lixeira (🗑️) na rotina
2. Aparece um alerta de confirmação
3. Confirme para excluir permanentemente
4. A rotina é removida da lista

**Atenção:** Esta ação não pode ser desfeita!

---

## 🎨 Categorias e Cores

### Trabalho (Azul - #0984E3)
- Reuniões
- Tarefas profissionais
- Projetos
- E-mails importantes

### Saúde (Verde - #00B894)
- Exercícios físicos
- Alimentação saudável
- Meditação
- Consultas médicas

### Pessoal (Roxo - #6C5CE7)
- Hobbies
- Tempo com família
- Lazer
- Tarefas domésticas

### Estudo (Amarelo - #FDCB6E)
- Cursos
- Leitura
- Idiomas
- Aprendizado

---

## 🎯 Dicas de Uso

### Para melhor organização:

1. **Seja específico**: Em vez de "Estudar", use "Estudar JavaScript - 1 hora"
2. **Use descrições**: Adicione detalhes importantes nas descrições
3. **Categorize corretamente**: Facilita visualizar o que fazer
4. **Defina períodos**: Ajuda a distribuir tarefas ao longo do dia
5. **Marque como concluído**: Acompanhe seu progresso diariamente

### Exemplos de boas rotinas:

```
✅ Título: "Meditar 10 minutos"
   Categoria: Saúde
   Período: Manhã
   Descrição: "Meditação guiada com app Calm"

✅ Título: "Revisar e-mails"
   Categoria: Trabalho
   Período: Manhã
   Descrição: "Responder e-mails prioritários"

✅ Título: "Estudar React Native"
   Categoria: Estudo
   Período: Noite
   Descrição: "Capítulo 5 - Navegação"

✅ Título: "Tempo com família"
   Categoria: Pessoal
   Período: Tarde
   Descrição: "Almoço de domingo"
```

---

## 🚀 Recursos Futuros (Planejados)

- [ ] Persistência de dados (salvar offline)
- [ ] Notificações de lembrete
- [ ] Tema escuro
- [ ] Gráficos de progresso semanal/mensal
- [ ] Repetir rotinas (diária, semanal)
- [ ] Prioridades (alta, média, baixa)
- [ ] Filtros por categoria/período
- [ ] Busca de rotinas
- [ ] Exportar/Importar dados
- [ ] Sincronização na nuvem

---

## 💡 Solução de Problemas

### O app não inicia?
```bash
# Limpe o cache do Metro
npx expo start -c
```

### Erro de dependências?
```bash
# Reinstale as dependências
rm -rf node_modules
npm install
```

### App não atualiza no celular?
1. Feche o app completamente
2. Reabra o app Expo Go
3. Escaneie o QR Code novamente

### Erro de porta ocupada?
```bash
# Use uma porta diferente
npx expo start --port 8082
```

---

**Aproveite todas as funcionalidades do app! 🎉**
