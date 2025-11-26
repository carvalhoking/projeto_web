// ============================================
// MEU SALDO - Sistema de Gestão Financeira
// ============================================

// Inicializar ícones Lucide
lucide.createIcons();

// ============================================
// DADOS E ESTADO
// ============================================
let transactions = JSON.parse(localStorage.getItem('financeTransactions')) || [];
let budgets = JSON.parse(localStorage.getItem('financeBudgets')) || [];
let currentType = 'income';
let editingId = null;
let charts = {
  line: null,
  pie: null,
  bar: null
};
let currentFilter = 'all';
let dateFilter = { start: null, end: null };

// Categorias (com suporte a personalização)
let categories = JSON.parse(localStorage.getItem('financeCategories')) || {
  income: ['Salário', 'Freelance', 'Investimentos', 'Vendas', 'Outros'],
  expense: ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Compras', 'Contas', 'Outros']
};

// Configurações
let settings = JSON.parse(localStorage.getItem('financeSettings')) || {
  currency: 'BRL'
};

// Sempre usar tema escuro
settings.theme = 'dark';

// ============================================
// INICIALIZAÇÃO
// ============================================
function init() {
  // Sempre aplicar tema escuro
  applyTheme('dark');
  setupDate();
  setupCategories();
  loadTransactions();
  setupForm();
  setupBudgetForm();
  setupCategoryForms();
  renderCategories();
  renderBudgets();
  updateAllCharts();
  generateInsights();
}

// ============================================
// SISTEMA DE ABAS
// ============================================
const tabNames = {
  'transactions': 'Transações',
  'analytics': 'Análises',
  'budgets': 'Metas & Orçamentos',
  'reports': 'Relatórios',
  'categories': 'Categorias'
};

function showTab(tabName) {
  // Esconder todas as abas
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.classList.remove('active');
  });
  
  // Remover active de todos os botões
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  
  document.querySelectorAll('.mobile-menu-item').forEach(btn => {
    btn.classList.remove('active');
  });
  
  // Mostrar aba selecionada
  const tabContent = document.getElementById(`tab-${tabName}`);
  if (tabContent) {
    tabContent.classList.add('active');
  }
  
  // Ativar botão correspondente (desktop)
  document.querySelectorAll('.tab-btn').forEach(btn => {
    const btnTab = btn.getAttribute('data-tab');
    if (btnTab === tabName) {
      btn.classList.add('active');
    }
  });
  
  // Ativar item do menu mobile
  document.querySelectorAll('.mobile-menu-item').forEach(btn => {
    const btnTab = btn.getAttribute('data-tab');
    if (btnTab === tabName) {
      btn.classList.add('active');
    }
  });
  
  // Atualizar indicador de aba atual
  const currentTabNameEl = document.getElementById('currentTabName');
  if (currentTabNameEl && tabNames[tabName]) {
    currentTabNameEl.textContent = tabNames[tabName];
    // Animação de fade
    currentTabNameEl.style.opacity = '0';
    setTimeout(() => {
      currentTabNameEl.style.transition = 'opacity 0.3s ease';
      currentTabNameEl.style.opacity = '1';
    }, 50);
  }
  
  // Atualizar gráficos se for aba de análises
  if (tabName === 'analytics') {
    setTimeout(() => {
      updateAllCharts();
    }, 100);
  }
  
  lucide.createIcons();
}

// ============================================
// MENU MOBILE
// ============================================
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  const overlay = document.getElementById('mobileMenuOverlay');
  const toggle = document.getElementById('menuToggle');
  
  if (menu && overlay && toggle) {
    const isActive = menu.classList.contains('active');
    
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    toggle.classList.toggle('active');
    
    // Prevenir scroll do body quando menu está aberto
    if (!isActive) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    // Inicializar ícones após abrir o menu
    setTimeout(() => {
      lucide.createIcons();
    }, 100);
  }
}

// Fechar menu ao redimensionar para desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('mobileMenuOverlay');
    const toggle = document.getElementById('menuToggle');
    
    if (menu && overlay && toggle) {
      menu.classList.remove('active');
      overlay.classList.remove('active');
      toggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// ============================================
// CONFIGURAÇÕES E TEMA
// ============================================
// Função removida - sempre usa tema escuro

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light');
  } else {
    document.body.classList.remove('light');
  }
  
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
    lucide.createIcons();
  }
}

function showSettings() {
  document.getElementById('settingsModal').classList.add('active');
  document.getElementById('currencySelect').value = settings.currency;
  lucide.createIcons();
}

function closeSettings() {
  document.getElementById('settingsModal').classList.remove('active');
}

function changeCurrency(currency) {
  settings.currency = currency;
  localStorage.setItem('financeSettings', JSON.stringify(settings));
  
  // Atualizar todos os valores exibidos
  updateStats();
  renderTransactions(currentFilter);
  renderBudgets();
  generateInsights();
  
  // Atualizar gráficos se estiver na aba de análises
  const analyticsTab = document.getElementById('tab-analytics');
  if (analyticsTab && analyticsTab.classList.contains('active')) {
    setTimeout(() => {
      updateAllCharts();
    }, 100);
  }
  
  // Garantir que o select está com o valor correto
  const currencySelect = document.getElementById('currencySelect');
  if (currencySelect) {
    currencySelect.value = currency;
  }
}

function clearAllData() {
  if (confirm('Tem certeza que deseja apagar TODOS os dados? Esta ação não pode ser desfeita.')) {
    localStorage.removeItem('financeTransactions');
    localStorage.removeItem('financeBudgets');
    transactions = [];
    budgets = [];
    loadTransactions();
    renderBudgets();
    alert('Todos os dados foram apagados.');
  }
}

// ============================================
// CATEGORIAS
// ============================================
function setupCategories() {
  updateCategories();
}

function updateCategories() {
  const categorySelect = document.getElementById('category');
  if (!categorySelect) return;
  
  categorySelect.innerHTML = '<option value="">Selecione...</option>';
  categories[currentType].forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function renderCategories() {
  renderCategoryList('incomeCategoriesList', 'income');
  renderCategoryList('expenseCategoriesList', 'expense');
  
  // Atualizar select de categoria de orçamento
  const budgetCategorySelect = document.getElementById('budgetCategory');
  if (budgetCategorySelect) {
    budgetCategorySelect.innerHTML = '<option value="">Todas as categorias</option>';
    [...categories.income, ...categories.expense].forEach(cat => {
      const option = document.createElement('option');
      option.value = cat;
      option.textContent = cat;
      budgetCategorySelect.appendChild(option);
    });
  }
}

function renderCategoryList(containerId, type) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (categories[type].length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.9rem;">Nenhuma categoria cadastrada</p>';
    return;
  }
  
  container.innerHTML = categories[type].map(cat => `
    <div class="category-item">
      <span>${cat}</span>
      <button class="delete-category" onclick="deleteCategory('${type}', '${cat}')" title="Excluir">
        <i data-lucide="x" width="14" height="14"></i>
      </button>
    </div>
  `).join('');
  
  lucide.createIcons();
}

function setupCategoryForms() {
  const incomeForm = document.getElementById('addIncomeCategoryForm');
  const expenseForm = document.getElementById('addExpenseCategoryForm');
  
  if (incomeForm) {
    incomeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const category = document.getElementById('newIncomeCategory').value.trim();
      if (category && !categories.income.includes(category)) {
        categories.income.push(category);
        saveCategories();
        renderCategories();
        updateCategories();
        document.getElementById('newIncomeCategory').value = '';
      }
    });
  }
  
  if (expenseForm) {
    expenseForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const category = document.getElementById('newExpenseCategory').value.trim();
      if (category && !categories.expense.includes(category)) {
        categories.expense.push(category);
        saveCategories();
        renderCategories();
        updateCategories();
        document.getElementById('newExpenseCategory').value = '';
      }
    });
  }
}

function deleteCategory(type, category) {
  if (confirm(`Tem certeza que deseja excluir a categoria "${category}"?`)) {
    categories[type] = categories[type].filter(c => c !== category);
    saveCategories();
    renderCategories();
    updateCategories();
  }
}

function saveCategories() {
  localStorage.setItem('financeCategories', JSON.stringify(categories));
}

// ============================================
// FORMULÁRIOS
// ============================================
function setupDate() {
  const dateInput = document.getElementById('date');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }
  
  const budgetStartDate = document.getElementById('budgetStartDate');
  const budgetEndDate = document.getElementById('budgetEndDate');
  if (budgetStartDate) {
    budgetStartDate.value = new Date().toISOString().split('T')[0];
  }
  if (budgetEndDate) {
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    budgetEndDate.value = endDate.toISOString().split('T')[0];
  }
}

function setTransactionType(type) {
  currentType = type;
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.classList.remove('active', 'income', 'expense');
  });
  const buttons = document.querySelectorAll('.type-btn');
  if (type === 'income') {
    buttons[0].classList.add('active', 'income');
  } else {
    buttons[1].classList.add('active', 'expense');
  }
  updateCategories();
  document.getElementById('category').value = '';
}

function setupForm() {
  const form = document.getElementById('transactionForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      saveTransaction();
    });
  }
}

function saveTransaction() {
  const formData = {
    id: editingId || Date.now().toString(),
    type: currentType,
    description: document.getElementById('description').value.trim(),
    amount: parseFloat(document.getElementById('amount').value),
    category: document.getElementById('category').value,
    date: document.getElementById('date').value,
    paymentMethod: document.getElementById('paymentMethod').value,
    notes: document.getElementById('notes').value.trim(),
    createdAt: editingId ? transactions.find(t => t.id === editingId).createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  if (editingId) {
    const index = transactions.findIndex(t => t.id === editingId);
    transactions[index] = formData;
    editingId = null;
  } else {
    transactions.push(formData);
  }

  localStorage.setItem('financeTransactions', JSON.stringify(transactions));
  loadTransactions();
  resetForm();
  updateAllCharts();
  generateInsights();
}

function resetForm() {
  const form = document.getElementById('transactionForm');
  if (form) {
    form.reset();
  }
  setupDate();
  editingId = null;
  currentType = 'income';
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.classList.remove('active', 'income', 'expense');
  });
  const buttons = document.querySelectorAll('.type-btn');
  if (buttons[0]) {
    buttons[0].classList.add('active', 'income');
  }
  updateCategories();
  const categorySelect = document.getElementById('category');
  if (categorySelect) {
    categorySelect.value = '';
  }
  
  const submitBtn = document.querySelector('#transactionForm button[type="submit"]');
  if (submitBtn) {
    submitBtn.innerHTML = '<i data-lucide="save" width="18" height="18"></i> Salvar Transação';
    lucide.createIcons();
  }
}

// ============================================
// CARREGAMENTO E RENDERIZAÇÃO
// ============================================
function loadTransactions() {
  updateStats();
  renderTransactions(currentFilter);
  updateAllCharts();
  updateFooterCounters();
}

function updateFooterCounters() {
  const transactionCountEl = document.getElementById('footerTransactionCount');
  const budgetCountEl = document.getElementById('footerBudgetCount');

  if (transactionCountEl) {
    transactionCountEl.textContent = `${transactions.length} ${transactions.length === 1 ? 'transação' : 'transações'}`;
  }

  if (budgetCountEl) {
    budgetCountEl.textContent = `${budgets.length} ${budgets.length === 1 ? 'meta' : 'metas'}`;
  }
}

function updateStats() {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  // Totais
  const totalIncomeEl = document.getElementById('totalIncome');
  const totalExpenseEl = document.getElementById('totalExpense');
  const balanceEl = document.getElementById('balance');
  
  if (totalIncomeEl) totalIncomeEl.textContent = formatCurrency(income);
  if (totalExpenseEl) totalExpenseEl.textContent = formatCurrency(expense);
  if (balanceEl) {
    balanceEl.textContent = formatCurrency(Math.abs(balance));
    balanceEl.className = 'stat-value ' + (balance >= 0 ? 'positive' : 'negative');
  }
  
  // Este mês
  const now = new Date();
  const thisMonthIncome = transactions
    .filter(t => {
      const date = new Date(t.date);
      return t.type === 'income' && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    })
    .reduce((sum, t) => sum + t.amount, 0);
    
  const thisMonthExpense = transactions
    .filter(t => {
      const date = new Date(t.date);
      return t.type === 'expense' && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    })
    .reduce((sum, t) => sum + t.amount, 0);
  
  const incomeChangeEl = document.getElementById('incomeChange');
  const expenseChangeEl = document.getElementById('expenseChange');
  const balanceStatusEl = document.getElementById('balanceStatus');
  
  if (incomeChangeEl) incomeChangeEl.textContent = `Este mês: ${formatCurrency(thisMonthIncome)}`;
  if (expenseChangeEl) expenseChangeEl.textContent = `Este mês: ${formatCurrency(thisMonthExpense)}`;
  if (balanceStatusEl) {
    const monthBalance = thisMonthIncome - thisMonthExpense;
    balanceStatusEl.textContent = monthBalance >= 0 ? 'Saldo positivo este mês' : 'Saldo negativo este mês';
  }
  
  // Média mensal (últimos 3 meses)
  const monthlyAverageEl = document.getElementById('monthlyAverage');
  if (monthlyAverageEl) {
    const last3Months = [];
    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthIncome = transactions
        .filter(t => {
          const tDate = new Date(t.date);
          return t.type === 'income' && tDate.getMonth() === date.getMonth() && tDate.getFullYear() === date.getFullYear();
        })
        .reduce((sum, t) => sum + t.amount, 0);
      last3Months.push(monthIncome);
    }
    const average = last3Months.reduce((a, b) => a + b, 0) / 3;
    monthlyAverageEl.textContent = formatCurrency(average);
  }
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: settings.currency || 'BRL'
  }).format(value || 0);
}

function renderTransactions(filter = 'all') {
  const listEl = document.getElementById('transactionsList');
  if (!listEl) return;
  
  currentFilter = filter;
  let filtered = [...transactions];

  // Aplicar filtro de tipo
  if (filter === 'income') {
    filtered = filtered.filter(t => t.type === 'income');
  } else if (filter === 'expense') {
    filtered = filtered.filter(t => t.type === 'expense');
  } else if (filter === 'month') {
    const now = new Date();
    filtered = filtered.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    });
  } else if (filter === 'week') {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    filtered = filtered.filter(t => {
      const date = new Date(t.date);
      return date >= weekAgo;
    });
  }
  
  // Aplicar filtro de data
  if (dateFilter.start) {
    filtered = filtered.filter(t => new Date(t.date) >= new Date(dateFilter.start));
  }
  if (dateFilter.end) {
    filtered = filtered.filter(t => new Date(t.date) <= new Date(dateFilter.end));
  }

  filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state">
        <i data-lucide="receipt" width="64" height="64"></i>
        <p>Nenhuma transação encontrada.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  listEl.innerHTML = filtered.map(transaction => `
    <div class="transaction-item">
      <div class="transaction-info">
        <div class="transaction-title">${transaction.description}</div>
        <div class="transaction-details">
          <span class="category-badge">${transaction.category}</span>
          <span><i data-lucide="calendar" width="14" height="14"></i> ${formatDate(transaction.date)}</span>
          <span><i data-lucide="credit-card" width="14" height="14"></i> ${formatPaymentMethod(transaction.paymentMethod)}</span>
        </div>
        ${transaction.notes ? `<div style="margin-top: 8px; color: var(--text-muted); font-size: 0.85rem;">${transaction.notes}</div>` : ''}
      </div>
      <div style="display: flex; align-items: center;">
        <div class="transaction-amount ${transaction.type}">
          ${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}
        </div>
        <div class="transaction-actions">
          <button class="btn btn-success btn-icon" onclick="editTransaction('${transaction.id}')" title="Editar">
            <i data-lucide="edit" width="18" height="18"></i>
          </button>
          <button class="btn btn-danger btn-icon" onclick="deleteTransaction('${transaction.id}')" title="Excluir">
            <i data-lucide="trash-2" width="18" height="18"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

function formatPaymentMethod(method) {
  const methods = {
    'dinheiro': 'Dinheiro',
    'cartao_debito': 'Cartão Débito',
    'cartao_credito': 'Cartão Crédito',
    'pix': 'PIX',
    'transferencia': 'Transferência',
    'outro': 'Outro'
  };
  return methods[method] || method;
}

// ============================================
// FILTROS
// ============================================
function filterTransactions(filter) {
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  if (event && event.target) {
    event.target.classList.add('active');
  }
  renderTransactions(filter);
}

function applyDateFilter() {
  const startDate = document.getElementById('filterStartDate').value;
  const endDate = document.getElementById('filterEndDate').value;
  
  dateFilter.start = startDate || null;
  dateFilter.end = endDate || null;
  
  renderTransactions(currentFilter);
}

function clearDateFilter() {
  document.getElementById('filterStartDate').value = '';
  document.getElementById('filterEndDate').value = '';
  dateFilter.start = null;
  dateFilter.end = null;
  renderTransactions(currentFilter);
}

// ============================================
// EDIÇÃO E EXCLUSÃO
// ============================================
function editTransaction(id) {
  const transaction = transactions.find(t => t.id === id);
  if (!transaction) return;

  editingId = id;
  currentType = transaction.type;

  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.classList.remove('active', 'income', 'expense');
  });
  
  const buttons = document.querySelectorAll('.type-btn');
  if (transaction.type === 'income') {
    buttons[0].classList.add('active', 'income');
  } else {
    buttons[1].classList.add('active', 'expense');
  }

  document.getElementById('description').value = transaction.description;
  document.getElementById('amount').value = transaction.amount;
  document.getElementById('date').value = transaction.date;
  document.getElementById('paymentMethod').value = transaction.paymentMethod;
  document.getElementById('notes').value = transaction.notes || '';

  updateCategories();
  setTimeout(() => {
    document.getElementById('category').value = transaction.category;
  }, 100);

  const submitBtn = document.querySelector('#transactionForm button[type="submit"]');
  if (submitBtn) {
    submitBtn.innerHTML = '<i data-lucide="save" width="18" height="18"></i> Atualizar Transação';
    lucide.createIcons();
  }

  // Scroll e mostrar aba de transações
  showTab('transactions');
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.includes('Transações')) {
      btn.classList.add('active');
    }
  });
  
  setTimeout(() => {
    document.querySelector('.section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function deleteTransaction(id) {
  if (confirm('Tem certeza que deseja excluir esta transação?')) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('financeTransactions', JSON.stringify(transactions));
    loadTransactions();
    generateInsights();
  }
}

// ============================================
// GRÁFICOS
// ============================================
function updateAllCharts() {
  updateLineChart();
  updatePieChart();
  updateBarChart();
}

function updateLineChart() {
  const ctx = document.getElementById('lineChart');
  if (!ctx) return;
  
  const computedStyle = getComputedStyle(document.documentElement);
  const textColor = computedStyle.getPropertyValue('--text').trim();
  const mutedColor = computedStyle.getPropertyValue('--text-muted').trim();
  const lineColor = computedStyle.getPropertyValue('--line').trim();
  
  const last30Days = [];
  const incomeData = [];
  const expenseData = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    last30Days.push(date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));

    const dayIncome = transactions
      .filter(t => t.type === 'income' && t.date === dateStr)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const dayExpense = transactions
      .filter(t => t.type === 'expense' && t.date === dateStr)
      .reduce((sum, t) => sum + t.amount, 0);

    incomeData.push(dayIncome);
    expenseData.push(dayExpense);
  }

  if (charts.line) {
    charts.line.destroy();
  }

  charts.line = new Chart(ctx, {
    type: 'line',
    data: {
      labels: last30Days,
      datasets: [
        {
          label: 'Receitas',
          data: incomeData,
          borderColor: '#9333ea',
          backgroundColor: 'rgba(147, 51, 234, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 2
        },
        {
          label: 'Despesas',
          data: expenseData,
          borderColor: '#ffffff',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          tension: 0.4,
          fill: true,
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: textColor }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: mutedColor,
            callback: function(value) {
              return 'R$ ' + value.toFixed(2);
            }
          },
          grid: { color: lineColor }
        },
        x: {
          ticks: { color: mutedColor },
          grid: { color: lineColor }
        }
      }
    }
  });
}

function updatePieChart() {
  const ctx = document.getElementById('pieChart');
  if (!ctx) return;
  
  const computedStyle = getComputedStyle(document.documentElement);
  const textColor = computedStyle.getPropertyValue('--text').trim();
  
  const categoryData = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
    });

  const labels = Object.keys(categoryData);
  const data = Object.values(categoryData);
  
  const colors = generateColors(labels.length);

  if (charts.pie) {
    charts.pie.destroy();
  }

  if (labels.length === 0) {
    return;
  }

  charts.pie = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderColor: '#000000',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: textColor }
        }
      }
    }
  });
}

function updateBarChart() {
  const ctx = document.getElementById('barChart');
  if (!ctx) return;
  
  const computedStyle = getComputedStyle(document.documentElement);
  const textColor = computedStyle.getPropertyValue('--text').trim();
  const mutedColor = computedStyle.getPropertyValue('--text-muted').trim();
  const lineColor = computedStyle.getPropertyValue('--line').trim();
  
  const last6Months = [];
  const incomeData = [];
  const expenseData = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthName = date.toLocaleDateString('pt-BR', { month: 'short' });
    last6Months.push(monthName);

    const monthIncome = transactions
      .filter(t => {
        const tDate = new Date(t.date);
        return t.type === 'income' && tDate.getMonth() === date.getMonth() && tDate.getFullYear() === date.getFullYear();
      })
      .reduce((sum, t) => sum + t.amount, 0);
    
    const monthExpense = transactions
      .filter(t => {
        const tDate = new Date(t.date);
        return t.type === 'expense' && tDate.getMonth() === date.getMonth() && tDate.getFullYear() === date.getFullYear();
      })
      .reduce((sum, t) => sum + t.amount, 0);

    incomeData.push(monthIncome);
    expenseData.push(monthExpense);
  }

  if (charts.bar) {
    charts.bar.destroy();
  }

  charts.bar = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: last6Months,
      datasets: [
        {
          label: 'Receitas',
          data: incomeData,
          backgroundColor: 'rgba(147, 51, 234, 0.8)',
          borderColor: '#9333ea',
          borderWidth: 1
        },
        {
          label: 'Despesas',
          data: expenseData,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderColor: '#ffffff',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: textColor }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: mutedColor,
            callback: function(value) {
              return 'R$ ' + value.toFixed(2);
            }
          },
          grid: { color: lineColor }
        },
        x: {
          ticks: { color: mutedColor },
          grid: { color: lineColor }
        }
      }
    }
  });
}

function generateColors(count) {
  const baseColors = [
    'rgba(147, 51, 234, 0.8)',
    'rgba(255, 255, 255, 0.8)',
    'rgba(147, 51, 234, 0.6)',
    'rgba(255, 255, 255, 0.6)',
    'rgba(147, 51, 234, 0.4)',
    'rgba(255, 255, 255, 0.4)'
  ];
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(baseColors[i % baseColors.length]);
  }
  return colors;
}

// ============================================
// INSIGHTS E ANÁLISES
// ============================================
function generateInsights() {
  const container = document.getElementById('insightsContainer');
  if (!container) return;
  
  const insights = [];
  
  // Maior categoria de gasto
  const categoryTotals = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
  
  if (Object.keys(categoryTotals).length > 0) {
    const topCategory = Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])[0];
    insights.push({
      icon: 'trending-up',
      title: 'Maior Categoria de Gasto',
      description: `${topCategory[0]}: ${formatCurrency(topCategory[1])}`
    });
  }
  
  // Média diária
  const today = new Date();
  const thisMonthExpenses = transactions
    .filter(t => {
      const date = new Date(t.date);
      return t.type === 'expense' && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
    })
    .reduce((sum, t) => sum + t.amount, 0);
  
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const dailyAverage = thisMonthExpenses / daysInMonth;
  
  insights.push({
    icon: 'calendar',
    title: 'Média Diária de Gastos',
    description: `Este mês: ${formatCurrency(dailyAverage)} por dia`
  });
  
  // Tendência
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const lastMonthExpenses = transactions
    .filter(t => {
      const date = new Date(t.date);
      return t.type === 'expense' && date.getMonth() === lastMonth.getMonth() && date.getFullYear() === lastMonth.getFullYear();
    })
    .reduce((sum, t) => sum + t.amount, 0);
  
  if (lastMonthExpenses > 0) {
    const change = ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses * 100).toFixed(1);
    insights.push({
      icon: change >= 0 ? 'arrow-up' : 'arrow-down',
      title: 'Tendência Mensal',
      description: `${change >= 0 ? '+' : ''}${change}% em relação ao mês anterior`
    });
  }
  
  // Total de transações
  insights.push({
    icon: 'receipt',
    title: 'Total de Transações',
    description: `${transactions.length} transações cadastradas`
  });
  
  if (insights.length === 0) {
    container.innerHTML = '<div class="empty-state"><p>Adicione transações para ver insights</p></div>';
    return;
  }
  
  container.innerHTML = insights.map(insight => `
    <div class="insight-card">
      <div class="insight-icon">
        <i data-lucide="${insight.icon}" width="20" height="20"></i>
      </div>
      <div class="insight-content">
        <h4>${insight.title}</h4>
        <p>${insight.description}</p>
      </div>
    </div>
  `).join('');
  
  lucide.createIcons();
}

// ============================================
// METAS E ORÇAMENTOS
// ============================================
function setupBudgetForm() {
  const form = document.getElementById('budgetForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      saveBudget();
    });
  }
}

function saveBudget() {
  const budgetData = {
    id: Date.now().toString(),
    name: document.getElementById('budgetName').value.trim(),
    amount: parseFloat(document.getElementById('budgetAmount').value),
    category: document.getElementById('budgetCategory').value || null,
    startDate: document.getElementById('budgetStartDate').value,
    endDate: document.getElementById('budgetEndDate').value,
    createdAt: new Date().toISOString()
  };
  
  budgets.push(budgetData);
  localStorage.setItem('financeBudgets', JSON.stringify(budgets));
  renderBudgets();
  document.getElementById('budgetForm').reset();
  setupDate();
}

function renderBudgets() {
  const container = document.getElementById('budgetsList');
  if (!container) return;
  
  if (budgets.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i data-lucide="target" width="64" height="64"></i>
        <p>Nenhuma meta cadastrada.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }
  
  container.innerHTML = budgets.map(budget => {
    const start = new Date(budget.startDate);
    const end = new Date(budget.endDate);
    const now = new Date();
    
    // Calcular gastos no período
    const spent = transactions
      .filter(t => {
        const tDate = new Date(t.date);
        return t.type === 'expense' && 
               tDate >= start && 
               tDate <= end &&
               (!budget.category || t.category === budget.category);
      })
      .reduce((sum, t) => sum + t.amount, 0);
    
    const percentage = Math.min((spent / budget.amount) * 100, 100);
    const remaining = Math.max(budget.amount - spent, 0);
    
    return `
      <div class="budget-card">
        <div class="budget-header">
          <div>
            <div class="budget-name">${budget.name}</div>
            <div class="budget-period">
              ${formatDate(budget.startDate)} - ${formatDate(budget.endDate)}
              ${budget.category ? ` • ${budget.category}` : ''}
            </div>
          </div>
          <button class="btn btn-danger btn-icon" onclick="deleteBudget('${budget.id}')">
            <i data-lucide="trash-2" width="16" height="16"></i>
          </button>
        </div>
        <div class="budget-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${percentage}%"></div>
          </div>
          <div class="budget-stats">
            <span>Gasto: ${formatCurrency(spent)}</span>
            <span>Restante: ${formatCurrency(remaining)}</span>
            <span>Meta: ${formatCurrency(budget.amount)}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  lucide.createIcons();
  updateFooterCounters();
}

function deleteBudget(id) {
  if (confirm('Tem certeza que deseja excluir esta meta?')) {
    budgets = budgets.filter(b => b.id !== id);
    localStorage.setItem('financeBudgets', JSON.stringify(budgets));
    renderBudgets();
  }
}

// ============================================
// RELATÓRIOS
// ============================================
function generateReport(type) {
  const container = document.getElementById('reportContent');
  if (!container) return;
  
  let reportHTML = '<div class="report-content">';
  
  if (type === 'monthly') {
    const now = new Date();
    const monthTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    });
    
    const monthIncome = monthTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const monthExpense = monthTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    reportHTML += `
      <h3 style="margin-bottom: 20px; color: var(--gold); text-transform: uppercase; letter-spacing: 1px;">
        Relatório Mensal - ${now.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
        <div style="padding: 20px; background: var(--bg); border: 1px solid var(--line); border-radius: 8px;">
          <div style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 8px;">Receitas</div>
          <div style="font-size: 1.8rem; color: var(--gold); font-weight: 300;">${formatCurrency(monthIncome)}</div>
        </div>
        <div style="padding: 20px; background: var(--bg); border: 1px solid var(--line); border-radius: 8px;">
          <div style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 8px;">Despesas</div>
          <div style="font-size: 1.8rem; color: var(--text); font-weight: 300;">${formatCurrency(monthExpense)}</div>
        </div>
        <div style="padding: 20px; background: var(--bg); border: 1px solid var(--line); border-radius: 8px;">
          <div style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 8px;">Saldo</div>
          <div style="font-size: 1.8rem; color: ${monthIncome - monthExpense >= 0 ? 'var(--gold)' : 'var(--text)'}; font-weight: 300;">
            ${formatCurrency(monthIncome - monthExpense)}
          </div>
        </div>
      </div>
      <div>
        <h4 style="margin-bottom: 16px; color: var(--text);">Transações do Mês</h4>
        <div style="display: flex; flex-direction: column; gap: 12px;">
          ${monthTransactions.map(t => `
            <div style="display: flex; justify-content: space-between; padding: 16px; background: var(--bg); border: 1px solid var(--line); border-radius: 8px;">
              <div>
                <div style="font-weight: 500; margin-bottom: 4px;">${t.description}</div>
                <div style="font-size: 0.85rem; color: var(--text-muted);">${t.category} • ${formatDate(t.date)}</div>
              </div>
              <div style="font-weight: 600; color: ${t.type === 'income' ? 'var(--gold)' : 'var(--text)'};">
                ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (type === 'category') {
    const categoryData = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
      });
    
    const sortedCategories = Object.entries(categoryData)
      .sort((a, b) => b[1] - a[1]);
    
    const total = sortedCategories.reduce((sum, [, amount]) => sum + amount, 0);
    
    reportHTML += `
      <h3 style="margin-bottom: 20px; color: var(--gold); text-transform: uppercase; letter-spacing: 1px;">
        Relatório por Categoria
      </h3>
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${sortedCategories.map(([category, amount]) => {
          const percentage = (amount / total * 100).toFixed(1);
          return `
            <div style="padding: 20px; background: var(--bg); border: 1px solid var(--line); border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div style="font-weight: 600; color: var(--text);">${category}</div>
                <div style="font-size: 1.2rem; color: var(--gold); font-weight: 300;">${formatCurrency(amount)}</div>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <div style="flex: 1; height: 6px; background: var(--line); border-radius: 3px; overflow: hidden;">
                  <div style="height: 100%; width: ${percentage}%; background: var(--gold);"></div>
                </div>
                <div style="font-size: 0.85rem; color: var(--text-muted); min-width: 50px;">${percentage}%</div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  } else if (type === 'payment') {
    const paymentData = {};
    transactions.forEach(t => {
      paymentData[t.paymentMethod] = (paymentData[t.paymentMethod] || 0) + t.amount;
    });
    
    const sortedPayments = Object.entries(paymentData)
      .sort((a, b) => b[1] - a[1]);
    
    reportHTML += `
      <h3 style="margin-bottom: 20px; color: var(--gold); text-transform: uppercase; letter-spacing: 1px;">
        Relatório por Forma de Pagamento
      </h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
        ${sortedPayments.map(([method, amount]) => `
          <div style="padding: 24px; background: var(--bg); border: 1px solid var(--line); border-radius: 8px; text-align: center;">
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 12px; text-transform: uppercase;">
              ${formatPaymentMethod(method)}
            </div>
            <div style="font-size: 1.8rem; color: var(--gold); font-weight: 300;">
              ${formatCurrency(amount)}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  reportHTML += '</div>';
  container.innerHTML = reportHTML;
}


// ============================================
// INICIALIZAR
// ============================================
init();
