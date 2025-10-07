// Módulo do Perfil
const ProfileModule = {
    // Atualizar informações do perfil na tela
    updateProfileDisplay() {
        const user = AppState.user;
        if (!user) return;
        
        // Atualizar nome no perfil
        const profileNameElement = document.getElementById('profileName');
        if (profileNameElement) {
            profileNameElement.textContent = user.name;
        }
        
        // Atualizar email no perfil
        const profileEmailElement = document.getElementById('profileEmail');
        if (profileEmailElement) {
            profileEmailElement.textContent = user.email;
        }
        
        // Atualizar nome nas configurações
        const settingsNameElement = document.getElementById('settingsUserName');
        if (settingsNameElement) {
            settingsNameElement.textContent = user.name;
        }
        
        // Atualizar saudação no dashboard
        const welcomeSection = document.querySelector('.welcome-section h2');
        if (welcomeSection) {
            const firstName = user.name.split(' ')[0];
            welcomeSection.textContent = `Olá ${firstName},`;
        }
    },
    
    // Simular upload de foto de perfil
    changeProfilePicture() {
        // Criar input file temporário
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = function(event) {
            const file = event.target.files[0];
            if (file) {
                // Simular upload
                showToast('Foto de perfil atualizada!', 'success');
                
                // Em uma implementação real, aqui seria feito o upload
                // e a atualização da imagem na interface
                const reader = new FileReader();
                reader.onload = function(e) {
                    // Atualizar todas as imagens de perfil na interface
                    const profileImages = document.querySelectorAll('.user-icon');
                    profileImages.forEach(img => {
                        img.style.backgroundImage = `url(${e.target.result})`;
                        img.style.backgroundSize = 'cover';
                        img.style.backgroundPosition = 'center';
                        img.innerHTML = ''; // Remover o ícone SVG
                    });
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    },
    
    // Editar informações do perfil
    editProfile() {
        const user = AppState.user;
        if (!user) return;
        
        // Criar modal de edição
        const modal = this.createEditModal(user);
        document.body.appendChild(modal);
        
        // Focar no primeiro campo
        setTimeout(() => {
            modal.querySelector('input').focus();
        }, 100);
    },
    
    // Criar modal de edição
    createEditModal(user) {
        const modal = document.createElement('div');
        modal.className = 'edit-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
        `;
        
        modal.innerHTML = `
            <div style="
                background-color: var(--color-black);
                border-radius: 20px;
                padding: 30px;
                width: 100%;
                max-width: 400px;
                border: 2px solid var(--color-pink);
            ">
                <h3 style="color: var(--color-white); text-align: center; margin-bottom: 20px;">
                    Editar Perfil
                </h3>
                <form id="editProfileForm">
                    <input type="text" 
                           class="input-field" 
                           placeholder="Nome" 
                           value="${user.name}" 
                           id="editName" 
                           required>
                    <input type="email" 
                           class="input-field" 
                           placeholder="Email" 
                           value="${user.email}" 
                           id="editEmail" 
                           required>
                    <div style="display: flex; gap: 10px; margin-top: 20px;">
                        <button type="button" 
                                onclick="closeEditModal()" 
                                style="
                                    flex: 1;
                                    background-color: var(--color-gray);
                                    color: var(--color-black);
                                    border: none;
                                    padding: 15px;
                                    border-radius: 25px;
                                    font-weight: 600;
                                    cursor: pointer;
                                ">
                            Cancelar
                        </button>
                        <button type="submit" 
                                style="
                                    flex: 1;
                                    background-color: var(--color-pink);
                                    color: var(--color-white);
                                    border: none;
                                    padding: 15px;
                                    border-radius: 25px;
                                    font-weight: 600;
                                    cursor: pointer;
                                ">
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        // Adicionar event listener para o formulário
        modal.querySelector('#editProfileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProfileChanges();
        });
        
        // Fechar modal ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeEditModal();
            }
        });
        
        return modal;
    },
    
    // Salvar alterações do perfil
    saveProfileChanges() {
        const newName = document.getElementById('editName').value.trim();
        const newEmail = document.getElementById('editEmail').value.trim();
        
        // Validações
        if (!newName) {
            showToast('Nome é obrigatório', 'error');
            return;
        }
        
        if (!AuthModule.validateEmail(newEmail)) {
            showToast('Email inválido', 'error');
            return;
        }
        
        // Verificar se o email já existe (exceto o próprio usuário)
        const existingUser = AuthModule.users.find(user => 
            user.email === newEmail.toLowerCase() && user.id !== AppState.user.id
        );
        
        if (existingUser) {
            showToast('Este email já está em uso', 'error');
            return;
        }
        
        // Atualizar dados do usuário
        const userIndex = AuthModule.users.findIndex(user => user.id === AppState.user.id);
        if (userIndex !== -1) {
            AuthModule.users[userIndex].name = newName;
            AuthModule.users[userIndex].email = newEmail.toLowerCase();
            AuthModule.saveUsers();
        }
        
        // Atualizar sessão atual
        AppState.user.name = newName;
        AppState.user.email = newEmail.toLowerCase();
        localStorage.setItem('currentUser', JSON.stringify(AppState.user));
        
        // Atualizar interface
        this.updateProfileDisplay();
        
        // Fechar modal e mostrar sucesso
        this.closeEditModal();
        showToast('Perfil atualizado com sucesso!', 'success');
    },
    
    // Fechar modal de edição
    closeEditModal() {
        const modal = document.querySelector('.edit-modal');
        if (modal) {
            modal.remove();
        }
    },
    
    // Alterar senha
    changePassword() {
        const modal = this.createPasswordModal();
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.querySelector('input').focus();
        }, 100);
    },
    
    // Criar modal de alteração de senha
    createPasswordModal() {
        const modal = document.createElement('div');
        modal.className = 'password-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
        `;
        
        modal.innerHTML = `
            <div style="
                background-color: var(--color-black);
                border-radius: 20px;
                padding: 30px;
                width: 100%;
                max-width: 400px;
                border: 2px solid var(--color-pink);
            ">
                <h3 style="color: var(--color-white); text-align: center; margin-bottom: 20px;">
                    Alterar Senha
                </h3>
                <form id="changePasswordForm">
                    <input type="password" 
                           class="input-field" 
                           placeholder="Senha atual" 
                           id="currentPassword" 
                           required>
                    <input type="password" 
                           class="input-field" 
                           placeholder="Nova senha" 
                           id="newPassword" 
                           required>
                    <input type="password" 
                           class="input-field" 
                           placeholder="Confirmar nova senha" 
                           id="confirmPassword" 
                           required>
                    <div style="display: flex; gap: 10px; margin-top: 20px;">
                        <button type="button" 
                                onclick="closePasswordModal()" 
                                style="
                                    flex: 1;
                                    background-color: var(--color-gray);
                                    color: var(--color-black);
                                    border: none;
                                    padding: 15px;
                                    border-radius: 25px;
                                    font-weight: 600;
                                    cursor: pointer;
                                ">
                            Cancelar
                        </button>
                        <button type="submit" 
                                style="
                                    flex: 1;
                                    background-color: var(--color-pink);
                                    color: var(--color-white);
                                    border: none;
                                    padding: 15px;
                                    border-radius: 25px;
                                    font-weight: 600;
                                    cursor: pointer;
                                ">
                            Alterar
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        // Adicionar event listener para o formulário
        modal.querySelector('#changePasswordForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePasswordChanges();
        });
        
        // Fechar modal ao clicar fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closePasswordModal();
            }
        });
        
        return modal;
    },
    
    // Salvar alteração de senha
    savePasswordChanges() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Validações
        const user = AuthModule.users.find(u => u.id === AppState.user.id);
        if (!user || user.password !== currentPassword) {
            showToast('Senha atual incorreta', 'error');
            return;
        }
        
        if (!AuthModule.validatePassword(newPassword)) {
            showToast('Nova senha deve ter pelo menos 6 caracteres', 'error');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showToast('Confirmação de senha não confere', 'error');
            return;
        }
        
        // Atualizar senha
        const userIndex = AuthModule.users.findIndex(u => u.id === AppState.user.id);
        if (userIndex !== -1) {
            AuthModule.users[userIndex].password = newPassword;
            AuthModule.saveUsers();
        }
        
        // Fechar modal e mostrar sucesso
        this.closePasswordModal();
        showToast('Senha alterada com sucesso!', 'success');
    },
    
    // Fechar modal de senha
    closePasswordModal() {
        const modal = document.querySelector('.password-modal');
        if (modal) {
            modal.remove();
        }
    }
};

// Funções globais para serem chamadas pelos botões
function closeEditModal() {
    ProfileModule.closeEditModal();
}

function closePasswordModal() {
    ProfileModule.closePasswordModal();
}

function editProfile() {
    ProfileModule.editProfile();
}

function changePassword() {
    ProfileModule.changePassword();
}

function changeProfilePicture() {
    ProfileModule.changeProfilePicture();
}
