// Estado global da aplicação
const AppState = {
    currentScreen: 'login',
    user: null,
    isLoggedIn: false
};

// Templates das telas
const ScreenTemplates = {
    login: `
        <div class="container login-screen">
            <div class="user-icon">
                <svg viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            </div>
            <form class="login-form" id="loginForm">
                <input type="email" class="input-field" placeholder="Email" id="loginEmail" required>
                <input type="password" class="input-field" placeholder="Senha" id="loginPassword" required>
                <button type="submit" class="btn">Entrar</button>
                <a href="#" class="link" onclick="showScreen('register')">Cadastrar-se</a>
            </form>
        </div>
    `,
    
    register: `
        <div class="container register-screen">
            <h2 class="register-title">Cadastrar</h2>
            <form class="register-form" id="registerForm">
                <input type="text" class="input-field" placeholder="Nome" id="registerName" required>
                <input type="email" class="input-field" placeholder="Email" id="registerEmail" required>
                <input type="password" class="input-field" placeholder="Senha" id="registerPassword" required>
                <button type="submit" class="btn">Cadastrar-se</button>
                <a href="#" class="link" onclick="showScreen('login')">Já tem conta? Faça login</a>
            </form>
        </div>
    `,
    
    dashboard: `
        <div class="container">
            <div class="header">
                <h1>Hoje Terça-feira</h1>
                <button class="action-btn" onclick="showScreen('settings')" style="left: 20px;">⚙️</button>
                <button class="action-btn" onclick="showNotifications()">🔔</button>
            </div>
            <div class="welcome-section">
                <h2 style="color: var(--color-white); margin-bottom: 20px;">Olá Gustavo,</h2>
                <p style="color: var(--color-gray); margin-bottom: 30px;">Explore o que separamos para você</p>
            </div>
            <div class="content-cards">
                <div class="card" onclick="showScreen('activities')">
                    <h3>Matemática</h3>
                    <p>Continuar estudos</p>
                </div>
                <div class="card" onclick="showScreen('activities')">
                    <h3>Inglês</h3>
                    <p>Praticar vocabulário</p>
                </div>
            </div>
        </div>
        <nav class="bottom-nav">
            <a class="nav-item active" onclick="showScreen('dashboard')">
                <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                Início
            </a>
            <a class="nav-item" onclick="showScreen('tasks')">
                <svg viewBox="0 0 24 24"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>
                Tarefas
            </a>
            <a class="nav-item" onclick="showScreen('calendar')">
                <svg viewBox="0 0 24 24"><path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19M5,6V5H19V6H5Z"/></svg>
                Calendário
            </a>
            <a class="nav-item" onclick="showScreen('profile')">
                <svg viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>
                Perfil
            </a>
        </nav>
    `,
    
    calendar: `
        <div class="container">
            <div class="header">
                <button class="back-btn" onclick="showScreen('dashboard')">←</button>
                <h1>Calendário</h1>
            </div>
            <div class="calendar-content">
                <div class="month-navigation" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <button onclick="previousMonth()" style="background: none; border: none; color: var(--color-white); font-size: 18px;">←</button>
                    <h3 id="currentMonth" style="color: var(--color-white);">Agosto 2024</h3>
                    <button onclick="nextMonth()" style="background: none; border: none; color: var(--color-white); font-size: 18px;">→</button>
                </div>
                <div id="calendarGrid" class="calendar-grid"></div>
                <div class="events-list" style="margin-top: 30px;">
                    <h4 style="color: var(--color-white); margin-bottom: 15px;">Eventos do dia</h4>
                    <div class="card">
                        <strong>12:00</strong> - Estudar Biologia
                    </div>
                    <div class="card">
                        <strong>15:00</strong> - Prova Matemática
                    </div>
                </div>
            </div>
        </div>
        <nav class="bottom-nav">
            <a class="nav-item" onclick="showScreen('dashboard')">
                <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                Início
            </a>
            <a class="nav-item" onclick="showScreen('tasks')">
                <svg viewBox="0 0 24 24"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>
                Tarefas
            </a>
            <a class="nav-item active" onclick="showScreen('calendar')">
                <svg viewBox="0 0 24 24"><path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19M5,6V5H19V6H5Z"/></svg>
                Calendário
            </a>
            <a class="nav-item" onclick="showScreen('profile')">
                <svg viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>
                Perfil
            </a>
        </nav>
    `,
    
    profile: `
        <div class="container">
            <div class="header">
                <button class="back-btn" onclick="showScreen('dashboard')">←</button>
                <h1>Perfil</h1>
            </div>
            <div class="profile-content" style="text-align: center; padding: 20px;">
                <div class="profile-picture" style="position: relative; margin: 0 auto 30px;">
                    <div class="user-icon" style="margin: 0 auto; cursor: pointer;" onclick="changeProfilePicture()">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                    </div>
                    <button onclick="changeProfilePicture()" style="position: absolute; bottom: 0; right: 0; background: var(--color-pink); border: none; border-radius: 50%; width: 30px; height: 30px; color: white; cursor: pointer; transition: all 0.3s ease;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">📷</button>
                </div>
                <div class="profile-info">
                    <div class="card" style="text-align: left; margin-bottom: 15px; position: relative;">
                        <strong>Nome:</strong><br>
                        <span id="profileName">Gustavo Carvalho Silva</span>
                        <button onclick="editProfile()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: var(--color-pink); cursor: pointer; font-size: 16px;">✏️</button>
                    </div>
                    <div class="card" style="text-align: left; margin-bottom: 15px; position: relative;">
                        <strong>Email:</strong><br>
                        <span id="profileEmail">gustavo@email.com</span>
                        <button onclick="editProfile()" style="position: absolute; top: 10px; right: 10px; background: none; border: none; color: var(--color-pink); cursor: pointer; font-size: 16px;">✏️</button>
                    </div>
                    <button onclick="changePassword()" style="background-color: var(--color-gray); color: var(--color-black); border: none; padding: 15px 30px; border-radius: 25px; font-size: 16px; font-weight: 600; cursor: pointer; width: 100%; margin-bottom: 15px; transition: all 0.3s ease;" onmouseover="this.style.backgroundColor='var(--color-white)'" onmouseout="this.style.backgroundColor='var(--color-gray)'">Alterar Senha</button>
                    <button class="btn" onclick="logout()">Sair</button>
                </div>
            </div>
        </div>
        <nav class="bottom-nav">
            <a class="nav-item" onclick="showScreen('dashboard')">
                <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                Início
            </a>
            <a class="nav-item" onclick="showScreen('tasks')">
                <svg viewBox="0 0 24 24"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>
                Tarefas
            </a>
            <a class="nav-item" onclick="showScreen('calendar')">
                <svg viewBox="0 0 24 24"><path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19M5,6V5H19V6H5Z"/></svg>
                Calendário
            </a>
            <a class="nav-item active" onclick="showScreen('profile')">
                <svg viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>
                Perfil
            </a>
        </nav>
    `,
    
    activities: `
        <div class="container">
            <div class="header">
                <button class="back-btn" onclick="showScreen('dashboard')">←</button>
                <h1>Matérias</h1>
            </div>
            <div class="subjects-grid">
                <div class="subject-card" onclick="openSubject('biologia')">
                    <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"/></svg>
                    <h3>Biologia</h3>
                </div>
                <div class="subject-card" onclick="openSubject('quimica')">
                    <svg viewBox="0 0 24 24"><path d="M7,2V4H9V3H15V4H17V2H7M11,6V8H13V6H11M7,10V12H9V10H7M15,10V12H17V10H15M11,14V16H13V14H11M7,18V20H9V18H7M15,18V20H17V18H15Z"/></svg>
                    <h3>Química</h3>
                </div>
                <div class="subject-card" onclick="openSubject('fisica')">
                    <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4Z"/></svg>
                    <h3>Física</h3>
                </div>
                <div class="subject-card" onclick="openSubject('matematica')">
                    <svg viewBox="0 0 24 24"><path d="M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M19,19H5V5H19V19Z"/></svg>
                    <h3>Matemática</h3>
                </div>
                <div class="subject-card" onclick="openSubject('geografia')">
                    <svg viewBox="0 0 24 24"><path d="M12,2C8.13,2 5,5.13 5,9C5,14.25 12,22 12,22S19,14.25 19,9C19,5.13 15.87,2 12,2M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5Z"/></svg>
                    <h3>Geografia</h3>
                </div>
                <div class="subject-card" onclick="openSubject('historia')">
                    <svg viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/></svg>
                    <h3>História</h3>
                </div>
            </div>
        </div>
        <nav class="bottom-nav">
            <a class="nav-item" onclick="showScreen('dashboard')">
                <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                Início
            </a>
            <a class="nav-item active" onclick="showScreen('tasks')">
                <svg viewBox="0 0 24 24"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>
                Tarefas
            </a>
            <a class="nav-item" onclick="showScreen('calendar')">
                <svg viewBox="0 0 24 24"><path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19M5,6V5H19V6H5Z"/></svg>
                Calendário
            </a>
            <a class="nav-item" onclick="showScreen('profile')">
                <svg viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>
                Perfil
            </a>
        </nav>
    `,
    
    settings: `
        <div class="container">
            <div class="header">
                <button class="back-btn" onclick="showScreen('dashboard')">←</button>
                <h1>Configuração</h1>
            </div>
            <div class="settings-content" style="padding: 20px;">
                <div class="user-info-card" style="background-color: var(--color-gray); border-radius: 15px; padding: 20px; margin-bottom: 30px; color: var(--color-black); text-align: center;">
                    <h3 id="settingsUserName">Gustavo Carvalho Silva</h3>
                    <p>Ensino Médio - 3ª Série</p>
                </div>
                <div class="settings-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                    <div class="setting-item" onclick="showScreen('dashboard')" style="background-color: var(--color-gray); border-radius: 15px; padding: 20px; text-align: center; color: var(--color-black); cursor: pointer; transition: all 0.3s ease;">
                        <svg viewBox="0 0 24 24" style="width: 30px; height: 30px; fill: var(--color-pink); margin-bottom: 10px;"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                        <p style="font-size: 12px; font-weight: 600;">Início</p>
                    </div>
                    <div class="setting-item" onclick="showScreen('activities')" style="background-color: var(--color-gray); border-radius: 15px; padding: 20px; text-align: center; color: var(--color-black); cursor: pointer; transition: all 0.3s ease;">
                        <svg viewBox="0 0 24 24" style="width: 30px; height: 30px; fill: var(--color-pink); margin-bottom: 10px;"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>
                        <p style="font-size: 12px; font-weight: 600;">Tarefas</p>
                    </div>
                    <div class="setting-item" onclick="alert('Cronômetro em desenvolvimento')" style="background-color: var(--color-gray); border-radius: 15px; padding: 20px; text-align: center; color: var(--color-black); cursor: pointer; transition: all 0.3s ease;">
                        <svg viewBox="0 0 24 24" style="width: 30px; height: 30px; fill: var(--color-pink); margin-bottom: 10px;"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z"/></svg>
                        <p style="font-size: 12px; font-weight: 600;">Cronômetro</p>
                    </div>
                    <div class="setting-item" onclick="alert('News em desenvolvimento')" style="background-color: var(--color-gray); border-radius: 15px; padding: 20px; text-align: center; color: var(--color-black); cursor: pointer; transition: all 0.3s ease;">
                        <svg viewBox="0 0 24 24" style="width: 30px; height: 30px; fill: var(--color-pink); margin-bottom: 10px;"><path d="M20,11H4V8H20M20,15H13V13H20M20,19H13V17H20M11,19H4V13H11M11,11H4V4H11"/></svg>
                        <p style="font-size: 12px; font-weight: 600;">News</p>
                    </div>
                    <div class="setting-item" onclick="showScreen('calendar')" style="background-color: var(--color-gray); border-radius: 15px; padding: 20px; text-align: center; color: var(--color-black); cursor: pointer; transition: all 0.3s ease;">
                        <svg viewBox="0 0 24 24" style="width: 30px; height: 30px; fill: var(--color-pink); margin-bottom: 10px;"><path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19M5,6V5H19V6H5Z"/></svg>
                        <p style="font-size: 12px; font-weight: 600;">Calendário</p>
                    </div>
                    <div class="setting-item" onclick="showScreen('profile')" style="background-color: var(--color-gray); border-radius: 15px; padding: 20px; text-align: center; color: var(--color-black); cursor: pointer; transition: all 0.3s ease;">
                        <svg viewBox="0 0 24 24" style="width: 30px; height: 30px; fill: var(--color-pink); margin-bottom: 10px;"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>
                        <p style="font-size: 12px; font-weight: 600;">Perfil</p>
                    </div>
                    <div class="setting-item" onclick="showScreen('settings')" style="background-color: var(--color-pink); border-radius: 15px; padding: 20px; text-align: center; color: var(--color-white); cursor: pointer; transition: all 0.3s ease;">
                        <svg viewBox="0 0 24 24" style="width: 30px; height: 30px; fill: var(--color-white); margin-bottom: 10px;"><path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/></svg>
                        <p style="font-size: 12px; font-weight: 600;">Configuração</p>
                    </div>
                    <div class="setting-item" onclick="alert('Políticas em desenvolvimento')" style="background-color: var(--color-gray); border-radius: 15px; padding: 20px; text-align: center; color: var(--color-black); cursor: pointer; transition: all 0.3s ease;">
                        <svg viewBox="0 0 24 24" style="width: 30px; height: 30px; fill: var(--color-pink); margin-bottom: 10px;"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>
                        <p style="font-size: 12px; font-weight: 600;">Políticas</p>
                    </div>
                </div>
            </div>
        </div>
        <nav class="bottom-nav">
            <a class="nav-item" onclick="showScreen('dashboard')">
                <svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                Início
            </a>
            <a class="nav-item" onclick="showScreen('activities')">
                <svg viewBox="0 0 24 24"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>
                Tarefas
            </a>
            <a class="nav-item" onclick="showScreen('calendar')">
                <svg viewBox="0 0 24 24"><path d="M19,3H18V1H16V3H8V1H6V3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V8H19V19M5,6V5H19V6H5Z"/></svg>
                Calendário
            </a>
            <a class="nav-item" onclick="showScreen('profile')">
                <svg viewBox="0 0 24 24"><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/></svg>
                Perfil
            </a>
        </nav>
    `
};

// Função principal para mostrar telas
function showScreen(screenName) {
    const app = document.getElementById('app');
    AppState.currentScreen = screenName;
    
    if (ScreenTemplates[screenName]) {
        app.innerHTML = ScreenTemplates[screenName];
        
        // Inicializar funcionalidades específicas da tela
        if (screenName === 'calendar') {
            initCalendar();
        } else if (screenName === 'profile' || screenName === 'settings') {
            // Atualizar informações do perfil
            setTimeout(() => {
                ProfileModule.updateProfileDisplay();
            }, 100);
        }
        
        // Adicionar event listeners para formulários
        if (screenName === 'login') {
            document.getElementById('loginForm').addEventListener('submit', handleLogin);
        } else if (screenName === 'register') {
            document.getElementById('registerForm').addEventListener('submit', handleRegister);
        }
    }
}

// Funções de navegação
function showNotifications() {
    alert('Notificações:\n• Estudar inglês\n• Terminar tarefa de Matemática');
}

function openSubject(subject) {
    alert(`Abrindo ${subject}...`);
}

function logout() {
    AppState.isLoggedIn = false;
    AppState.user = null;
    showScreen('login');
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se há usuário logado (simulação com localStorage)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        AppState.user = JSON.parse(savedUser);
        AppState.isLoggedIn = true;
        showScreen('dashboard');
    } else {
        showScreen('login');
    }
});
