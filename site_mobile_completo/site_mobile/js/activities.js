// Módulo de Atividades e Matérias
const ActivitiesModule = {
    subjects: {
        biologia: {
            name: 'Biologia',
            color: '#4CAF50',
            icon: '🧬',
            topics: [
                'Células e Tecidos',
                'Genética',
                'Evolução',
                'Ecologia',
                'Anatomia Humana'
            ],
            activities: [
                {
                    id: 1,
                    title: 'Estudar Mitose e Meiose',
                    description: 'Revisar os processos de divisão celular',
                    completed: false,
                    dueDate: '2024-08-20',
                    priority: 'high'
                },
                {
                    id: 2,
                    title: 'Fazer exercícios de Genética',
                    description: 'Resolver problemas de herança genética',
                    completed: true,
                    dueDate: '2024-08-15',
                    priority: 'medium'
                }
            ]
        },
        quimica: {
            name: 'Química',
            color: '#FF9800',
            icon: '⚗️',
            topics: [
                'Química Orgânica',
                'Química Inorgânica',
                'Físico-Química',
                'Estequiometria',
                'Termoquímica'
            ],
            activities: [
                {
                    id: 3,
                    title: 'Balanceamento de Equações',
                    description: 'Praticar balanceamento químico',
                    completed: false,
                    dueDate: '2024-08-22',
                    priority: 'medium'
                }
            ]
        },
        fisica: {
            name: 'Física',
            color: '#2196F3',
            icon: '⚡',
            topics: [
                'Mecânica',
                'Termodinâmica',
                'Eletromagnetismo',
                'Óptica',
                'Física Moderna'
            ],
            activities: [
                {
                    id: 4,
                    title: 'Resolver problemas de Cinemática',
                    description: 'Exercícios de movimento uniforme',
                    completed: false,
                    dueDate: '2024-08-25',
                    priority: 'high'
                }
            ]
        },
        matematica: {
            name: 'Matemática',
            color: '#9C27B0',
            icon: '📐',
            topics: [
                'Álgebra',
                'Geometria',
                'Trigonometria',
                'Cálculo',
                'Estatística'
            ],
            activities: [
                {
                    id: 5,
                    title: 'Prova de Funções',
                    description: 'Estudar para a prova de funções quadráticas',
                    completed: false,
                    dueDate: '2024-08-18',
                    priority: 'high'
                }
            ]
        },
        geografia: {
            name: 'Geografia',
            color: '#795548',
            icon: '🌍',
            topics: [
                'Geografia Física',
                'Geografia Humana',
                'Cartografia',
                'Geopolítica',
                'Meio Ambiente'
            ],
            activities: [
                {
                    id: 6,
                    title: 'Estudar Relevo Brasileiro',
                    description: 'Revisar formações geológicas do Brasil',
                    completed: false,
                    dueDate: '2024-08-30',
                    priority: 'low'
                }
            ]
        },
        historia: {
            name: 'História',
            color: '#607D8B',
            icon: '📚',
            topics: [
                'História do Brasil',
                'História Geral',
                'Idade Média',
                'Idade Moderna',
                'Idade Contemporânea'
            ],
            activities: [
                {
                    id: 7,
                    title: 'Pesquisar sobre a República Velha',
                    description: 'Fazer resumo sobre o período republicano',
                    completed: false,
                    dueDate: '2024-08-28',
                    priority: 'medium'
                }
            ]
        }
    },
    
    // Obter todas as atividades
    getAllActivities() {
        let allActivities = [];
        Object.keys(this.subjects).forEach(subjectKey => {
            const subject = this.subjects[subjectKey];
            subject.activities.forEach(activity => {
                allActivities.push({
                    ...activity,
                    subject: subjectKey,
                    subjectName: subject.name,
                    subjectColor: subject.color
                });
            });
        });
        return allActivities.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    },
    
    // Obter atividades pendentes
    getPendingActivities() {
        return this.getAllActivities().filter(activity => !activity.completed);
    },
    
    // Obter atividades por prioridade
    getActivitiesByPriority(priority) {
        return this.getAllActivities().filter(activity => activity.priority === priority);
    },
    
    // Marcar atividade como concluída
    completeActivity(activityId) {
        Object.keys(this.subjects).forEach(subjectKey => {
            const subject = this.subjects[subjectKey];
            const activity = subject.activities.find(a => a.id === activityId);
            if (activity) {
                activity.completed = true;
                this.saveToLocalStorage();
                showToast('Atividade concluída!', 'success');
            }
        });
    },
    
    // Adicionar nova atividade
    addActivity(subjectKey, title, description, dueDate, priority = 'medium') {
        if (!this.subjects[subjectKey]) return false;
        
        const newActivity = {
            id: Date.now(),
            title: title,
            description: description,
            completed: false,
            dueDate: dueDate,
            priority: priority
        };
        
        this.subjects[subjectKey].activities.push(newActivity);
        this.saveToLocalStorage();
        return true;
    },
    
    // Salvar no localStorage
    saveToLocalStorage() {
        localStorage.setItem('subjects', JSON.stringify(this.subjects));
    },
    
    // Carregar do localStorage
    loadFromLocalStorage() {
        const saved = localStorage.getItem('subjects');
        if (saved) {
            this.subjects = { ...this.subjects, ...JSON.parse(saved) };
        }
    },
    
    // Gerar estatísticas
    getStatistics() {
        const allActivities = this.getAllActivities();
        const completed = allActivities.filter(a => a.completed).length;
        const pending = allActivities.length - completed;
        const overdue = allActivities.filter(a => 
            !a.completed && new Date(a.dueDate) < new Date()
        ).length;
        
        return {
            total: allActivities.length,
            completed: completed,
            pending: pending,
            overdue: overdue,
            completionRate: allActivities.length > 0 ? Math.round((completed / allActivities.length) * 100) : 0
        };
    }
};

// Função para abrir detalhes de uma matéria
function openSubject(subjectKey) {
    const subject = ActivitiesModule.subjects[subjectKey];
    if (!subject) {
        showToast('Matéria não encontrada', 'error');
        return;
    }
    
    // Criar modal com detalhes da matéria
    const modal = createSubjectModal(subject, subjectKey);
    document.body.appendChild(modal);
}

// Criar modal de detalhes da matéria
function createSubjectModal(subject, subjectKey) {
    const modal = document.createElement('div');
    modal.className = 'subject-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        padding: 20px;
        overflow-y: auto;
    `;
    
    const activitiesHtml = subject.activities.map(activity => {
        const priorityColors = {
            high: '#f44336',
            medium: '#FF9800',
            low: '#4CAF50'
        };
        
        const priorityLabels = {
            high: 'Alta',
            medium: 'Média',
            low: 'Baixa'
        };
        
        const isOverdue = !activity.completed && new Date(activity.dueDate) < new Date();
        
        return `
            <div class="activity-item" style="
                background-color: ${activity.completed ? '#4CAF50' : isOverdue ? '#f44336' : 'var(--color-gray)'};
                color: ${activity.completed || isOverdue ? 'white' : 'var(--color-black)'};
                border-radius: 10px;
                padding: 15px;
                margin-bottom: 10px;
                position: relative;
            ">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
                    <h4 style="margin: 0; ${activity.completed ? 'text-decoration: line-through;' : ''}">${activity.title}</h4>
                    <span style="
                        background-color: ${priorityColors[activity.priority]};
                        color: white;
                        padding: 2px 8px;
                        border-radius: 10px;
                        font-size: 10px;
                        font-weight: 600;
                    ">${priorityLabels[activity.priority]}</span>
                </div>
                <p style="margin: 0 0 10px 0; font-size: 14px; opacity: 0.8;">${activity.description}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <small>Prazo: ${new Date(activity.dueDate).toLocaleDateString('pt-BR')}</small>
                    ${!activity.completed ? `
                        <button onclick="completeActivity(${activity.id})" style="
                            background-color: #4CAF50;
                            color: white;
                            border: none;
                            padding: 5px 10px;
                            border-radius: 15px;
                            font-size: 12px;
                            cursor: pointer;
                        ">Concluir</button>
                    ` : '<span style="font-weight: 600;">✓ Concluída</span>'}
                </div>
            </div>
        `;
    }).join('');
    
    modal.innerHTML = `
        <div style="
            background-color: var(--color-black);
            border-radius: 20px;
            padding: 30px;
            width: 100%;
            max-width: 500px;
            max-height: 80vh;
            overflow-y: auto;
            border: 2px solid ${subject.color};
        ">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <span style="font-size: 30px; margin-right: 15px;">${subject.icon}</span>
                <h2 style="color: var(--color-white); margin: 0; flex: 1;">${subject.name}</h2>
                <button onclick="closeSubjectModal()" style="
                    background: none;
                    border: none;
                    color: var(--color-white);
                    font-size: 24px;
                    cursor: pointer;
                    padding: 5px;
                ">×</button>
            </div>
            
            <div style="margin-bottom: 20px;">
                <h3 style="color: var(--color-white); margin-bottom: 10px;">Tópicos</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${subject.topics.map(topic => `
                        <span style="
                            background-color: ${subject.color};
                            color: white;
                            padding: 5px 12px;
                            border-radius: 15px;
                            font-size: 12px;
                            font-weight: 500;
                        ">${topic}</span>
                    `).join('')}
                </div>
            </div>
            
            <div>
                <h3 style="color: var(--color-white); margin-bottom: 15px;">Atividades</h3>
                ${activitiesHtml || '<p style="color: var(--color-gray); text-align: center; font-style: italic;">Nenhuma atividade cadastrada</p>'}
            </div>
            
            <button onclick="addNewActivity('${subjectKey}')" style="
                width: 100%;
                background-color: ${subject.color};
                color: white;
                border: none;
                padding: 15px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 20px;
            ">+ Adicionar Atividade</button>
        </div>
    `;
    
    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeSubjectModal();
        }
    });
    
    return modal;
}

// Fechar modal da matéria
function closeSubjectModal() {
    const modal = document.querySelector('.subject-modal');
    if (modal) {
        modal.remove();
    }
}

// Concluir atividade
function completeActivity(activityId) {
    ActivitiesModule.completeActivity(activityId);
    
    // Atualizar o modal
    const modal = document.querySelector('.subject-modal');
    if (modal) {
        modal.remove();
        // Reabrir o modal atualizado seria necessário aqui
        // Por simplicidade, apenas fechamos o modal
    }
}

// Adicionar nova atividade
function addNewActivity(subjectKey) {
    const subject = ActivitiesModule.subjects[subjectKey];
    
    // Criar modal de adição
    const modal = document.createElement('div');
    modal.className = 'add-activity-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1001;
        padding: 20px;
    `;
    
    modal.innerHTML = `
        <div style="
            background-color: var(--color-black);
            border-radius: 20px;
            padding: 30px;
            width: 100%;
            max-width: 400px;
            border: 2px solid ${subject.color};
        ">
            <h3 style="color: var(--color-white); text-align: center; margin-bottom: 20px;">
                Nova Atividade - ${subject.name}
            </h3>
            <form id="addActivityForm">
                <input type="text" 
                       class="input-field" 
                       placeholder="Título da atividade" 
                       id="activityTitle" 
                       required>
                <textarea 
                    class="input-field" 
                    placeholder="Descrição" 
                    id="activityDescription" 
                    rows="3" 
                    style="resize: vertical; min-height: 80px;"
                    required></textarea>
                <input type="date" 
                       class="input-field" 
                       id="activityDueDate" 
                       required>
                <select class="input-field" id="activityPriority">
                    <option value="low">Prioridade Baixa</option>
                    <option value="medium" selected>Prioridade Média</option>
                    <option value="high">Prioridade Alta</option>
                </select>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button type="button" 
                            onclick="closeAddActivityModal()" 
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
                                background-color: ${subject.color};
                                color: white;
                                border: none;
                                padding: 15px;
                                border-radius: 25px;
                                font-weight: 600;
                                cursor: pointer;
                            ">
                        Adicionar
                    </button>
                </div>
            </form>
        </div>
    `;
    
    // Adicionar event listener para o formulário
    modal.querySelector('#addActivityForm').addEventListener('submit', (e) => {
        e.preventDefault();
        saveNewActivity(subjectKey);
    });
    
    document.body.appendChild(modal);
    
    // Focar no primeiro campo
    setTimeout(() => {
        modal.querySelector('#activityTitle').focus();
    }, 100);
}

// Salvar nova atividade
function saveNewActivity(subjectKey) {
    const title = document.getElementById('activityTitle').value.trim();
    const description = document.getElementById('activityDescription').value.trim();
    const dueDate = document.getElementById('activityDueDate').value;
    const priority = document.getElementById('activityPriority').value;
    
    if (!title || !description || !dueDate) {
        showToast('Preencha todos os campos', 'error');
        return;
    }
    
    const success = ActivitiesModule.addActivity(subjectKey, title, description, dueDate, priority);
    
    if (success) {
        showToast('Atividade adicionada com sucesso!', 'success');
        closeAddActivityModal();
        closeSubjectModal();
    } else {
        showToast('Erro ao adicionar atividade', 'error');
    }
}

// Fechar modal de adicionar atividade
function closeAddActivityModal() {
    const modal = document.querySelector('.add-activity-modal');
    if (modal) {
        modal.remove();
    }
}

// Carregar dados ao inicializar
document.addEventListener('DOMContentLoaded', function() {
    ActivitiesModule.loadFromLocalStorage();
});
