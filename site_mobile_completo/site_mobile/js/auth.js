// Módulo de Autenticação
const AuthModule = {
    // Simular banco de dados de usuários no localStorage
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    
    // Salvar usuários no localStorage
    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    },
    
    // Validar email
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Validar senha
    validatePassword(password) {
        return password.length >= 6;
    },
    
    // Registrar novo usuário
    register(name, email, password) {
        // Validações
        if (!name.trim()) {
            throw new Error('Nome é obrigatório');
        }
        
        if (!this.validateEmail(email)) {
            throw new Error('Email inválido');
        }
        
        if (!this.validatePassword(password)) {
            throw new Error('Senha deve ter pelo menos 6 caracteres');
        }
        
        // Verificar se email já existe
        if (this.users.find(user => user.email === email)) {
            throw new Error('Email já cadastrado');
        }
        
        // Criar novo usuário
        const newUser = {
            id: Date.now(),
            name: name.trim(),
            email: email.toLowerCase(),
            password: password, // Em produção, seria hash
            createdAt: new Date().toISOString()
        };
        
        this.users.push(newUser);
        this.saveUsers();
        
        return newUser;
    },
    
    // Fazer login
    login(email, password) {
        if (!this.validateEmail(email)) {
            throw new Error('Email inválido');
        }
        
        if (!password) {
            throw new Error('Senha é obrigatória');
        }
        
        const user = this.users.find(user => 
            user.email === email.toLowerCase() && user.password === password
        );
        
        if (!user) {
            throw new Error('Email ou senha incorretos');
        }
        
        return user;
    },
    
    // Salvar sessão do usuário
    saveSession(user) {
        const sessionUser = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        localStorage.setItem('currentUser', JSON.stringify(sessionUser));
        AppState.user = sessionUser;
        AppState.isLoggedIn = true;
    },
    
    // Limpar sessão
    clearSession() {
        localStorage.removeItem('currentUser');
        AppState.user = null;
        AppState.isLoggedIn = false;
    }
};

// Função para lidar com o login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        // Mostrar loading
        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Entrando...';
        submitBtn.disabled = true;
        
        // Simular delay de rede
        setTimeout(() => {
            try {
                const user = AuthModule.login(email, password);
                AuthModule.saveSession(user);
                
                // Mostrar mensagem de sucesso
                showToast('Login realizado com sucesso!', 'success');
                
                // Redirecionar para dashboard
                setTimeout(() => {
                    showScreen('dashboard');
                }, 1000);
                
            } catch (error) {
                showToast(error.message, 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }, 1000);
        
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Função para lidar com o cadastro
function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    try {
        // Mostrar loading
        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Cadastrando...';
        submitBtn.disabled = true;
        
        // Simular delay de rede
        setTimeout(() => {
            try {
                const user = AuthModule.register(name, email, password);
                AuthModule.saveSession(user);
                
                // Mostrar mensagem de sucesso
                showToast('Cadastro realizado com sucesso!', 'success');
                
                // Redirecionar para dashboard
                setTimeout(() => {
                    showScreen('dashboard');
                }, 1000);
                
            } catch (error) {
                showToast(error.message, 'error');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }, 1000);
        
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// Função para mostrar notificações toast
function showToast(message, type = 'info') {
    // Remover toast anterior se existir
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Criar novo toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Estilos do toast
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideDown 0.3s ease-out;
    `;
    
    // Adicionar animação CSS
    if (!document.querySelector('#toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-20px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Remover toast após 3 segundos
    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Função para logout
function logout() {
    AuthModule.clearSession();
    showToast('Logout realizado com sucesso!', 'success');
    setTimeout(() => {
        showScreen('login');
    }, 1000);
}
