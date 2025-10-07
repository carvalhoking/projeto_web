// Módulo do Calendário
const CalendarModule = {
    currentDate: new Date(),
    selectedDate: new Date(),
    events: [
        {
            id: 1,
            date: '2024-08-15',
            time: '12:00',
            title: 'Estudar Biologia',
            type: 'study'
        },
        {
            id: 2,
            date: '2024-08-15',
            time: '15:00',
            title: 'Prova Matemática',
            type: 'exam'
        },
        {
            id: 3,
            date: '2024-08-20',
            time: '14:00',
            title: 'Aula de Química',
            type: 'class'
        },
        {
            id: 4,
            date: '2024-08-25',
            time: '10:00',
            title: 'Entrega de Trabalho',
            type: 'assignment'
        }
    ],
    
    // Obter nome do mês
    getMonthName(date) {
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];
        return months[date.getMonth()];
    },
    
    // Obter primeiro dia do mês
    getFirstDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1);
    },
    
    // Obter último dia do mês
    getLastDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },
    
    // Obter número de dias no mês
    getDaysInMonth(date) {
        return this.getLastDayOfMonth(date).getDate();
    },
    
    // Obter dia da semana do primeiro dia do mês (0 = domingo)
    getFirstDayWeekday(date) {
        return this.getFirstDayOfMonth(date).getDay();
    },
    
    // Formatar data para string YYYY-MM-DD
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },
    
    // Verificar se é o dia atual
    isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() &&
               date.getMonth() === today.getMonth() &&
               date.getFullYear() === today.getFullYear();
    },
    
    // Verificar se é o dia selecionado
    isSelectedDay(date) {
        return date.getDate() === this.selectedDate.getDate() &&
               date.getMonth() === this.selectedDate.getMonth() &&
               date.getFullYear() === this.selectedDate.getFullYear();
    },
    
    // Obter eventos de uma data específica
    getEventsForDate(date) {
        const dateStr = this.formatDate(date);
        return this.events.filter(event => event.date === dateStr);
    },
    
    // Verificar se uma data tem eventos
    hasEvents(date) {
        return this.getEventsForDate(date).length > 0;
    },
    
    // Gerar grid do calendário
    generateCalendarGrid() {
        const daysInMonth = this.getDaysInMonth(this.currentDate);
        const firstDayWeekday = this.getFirstDayWeekday(this.currentDate);
        
        let html = `
            <div class="calendar-grid" style="
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 5px;
                margin-bottom: 20px;
            ">
        `;
        
        // Cabeçalho dos dias da semana
        const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        dayNames.forEach(day => {
            html += `
                <div style="
                    text-align: center;
                    font-size: 12px;
                    font-weight: 600;
                    color: var(--color-gray);
                    padding: 10px 5px;
                ">${day}</div>
            `;
        });
        
        // Células vazias para os dias antes do primeiro dia do mês
        for (let i = 0; i < firstDayWeekday; i++) {
            html += '<div></div>';
        }
        
        // Dias do mês
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
            const isToday = this.isToday(date);
            const isSelected = this.isSelectedDay(date);
            const hasEvents = this.hasEvents(date);
            
            let dayClass = 'calendar-day';
            let dayStyle = `
                text-align: center;
                padding: 10px 5px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 14px;
                font-weight: 500;
                position: relative;
            `;
            
            if (isToday) {
                dayStyle += `
                    background-color: var(--color-pink);
                    color: var(--color-white);
                `;
            } else if (isSelected) {
                dayStyle += `
                    background-color: rgba(255, 0, 73, 0.3);
                    color: var(--color-white);
                `;
            } else {
                dayStyle += `
                    color: var(--color-white);
                `;
            }
            
            if (hasEvents) {
                dayStyle += `
                    border: 2px solid var(--color-pink);
                `;
            }
            
            html += `
                <div class="${dayClass}" 
                     style="${dayStyle}"
                     onclick="selectDate(${day})"
                     onmouseover="this.style.backgroundColor='rgba(255, 0, 73, 0.2)'"
                     onmouseout="this.style.backgroundColor='${isToday ? 'var(--color-pink)' : isSelected ? 'rgba(255, 0, 73, 0.3)' : 'transparent'}'">
                    ${day}
                    ${hasEvents ? '<div style="position: absolute; bottom: 2px; left: 50%; transform: translateX(-50%); width: 4px; height: 4px; background-color: var(--color-pink); border-radius: 50%;"></div>' : ''}
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    },
    
    // Gerar lista de eventos
    generateEventsList() {
        const events = this.getEventsForDate(this.selectedDate);
        
        if (events.length === 0) {
            return `
                <div class="no-events" style="
                    text-align: center;
                    color: var(--color-gray);
                    padding: 20px;
                    font-style: italic;
                ">
                    Nenhum evento para este dia
                </div>
            `;
        }
        
        let html = '';
        events.forEach(event => {
            const typeColors = {
                study: '#4CAF50',
                exam: '#f44336',
                class: '#2196F3',
                assignment: '#FF9800'
            };
            
            const typeColor = typeColors[event.type] || '#666';
            
            html += `
                <div class="event-item card" style="
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    border-left: 4px solid ${typeColor};
                ">
                    <div style="
                        background-color: ${typeColor};
                        color: white;
                        padding: 5px 10px;
                        border-radius: 10px;
                        font-size: 12px;
                        font-weight: 600;
                        margin-right: 15px;
                        min-width: 50px;
                        text-align: center;
                    ">
                        ${event.time}
                    </div>
                    <div style="flex: 1;">
                        <strong>${event.title}</strong>
                    </div>
                </div>
            `;
        });
        
        return html;
    }
};

// Função para inicializar o calendário
function initCalendar() {
    updateCalendarDisplay();
}

// Função para atualizar a exibição do calendário
function updateCalendarDisplay() {
    const monthElement = document.getElementById('currentMonth');
    const gridElement = document.getElementById('calendarGrid');
    const eventsElement = document.querySelector('.events-list');
    
    if (monthElement) {
        monthElement.textContent = `${CalendarModule.getMonthName(CalendarModule.currentDate)} ${CalendarModule.currentDate.getFullYear()}`;
    }
    
    if (gridElement) {
        gridElement.innerHTML = CalendarModule.generateCalendarGrid();
    }
    
    if (eventsElement) {
        const eventsTitle = eventsElement.querySelector('h4');
        const selectedDateStr = CalendarModule.selectedDate.toLocaleDateString('pt-BR');
        if (eventsTitle) {
            eventsTitle.textContent = `Eventos - ${selectedDateStr}`;
        }
        
        // Remover eventos antigos e adicionar novos
        const existingEvents = eventsElement.querySelectorAll('.event-item, .no-events');
        existingEvents.forEach(event => event.remove());
        
        eventsElement.innerHTML += CalendarModule.generateEventsList();
    }
}

// Função para navegar para o mês anterior
function previousMonth() {
    CalendarModule.currentDate.setMonth(CalendarModule.currentDate.getMonth() - 1);
    updateCalendarDisplay();
}

// Função para navegar para o próximo mês
function nextMonth() {
    CalendarModule.currentDate.setMonth(CalendarModule.currentDate.getMonth() + 1);
    updateCalendarDisplay();
}

// Função para selecionar uma data
function selectDate(day) {
    CalendarModule.selectedDate = new Date(
        CalendarModule.currentDate.getFullYear(),
        CalendarModule.currentDate.getMonth(),
        day
    );
    updateCalendarDisplay();
}

// Função para adicionar novo evento (para futuras implementações)
function addEvent(date, time, title, type = 'study') {
    const newEvent = {
        id: Date.now(),
        date: CalendarModule.formatDate(date),
        time: time,
        title: title,
        type: type
    };
    
    CalendarModule.events.push(newEvent);
    updateCalendarDisplay();
    
    // Salvar no localStorage
    localStorage.setItem('calendarEvents', JSON.stringify(CalendarModule.events));
}

// Carregar eventos do localStorage na inicialização
document.addEventListener('DOMContentLoaded', function() {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
        CalendarModule.events = JSON.parse(savedEvents);
    }
});
