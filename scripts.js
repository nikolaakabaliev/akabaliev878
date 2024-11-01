const calendarElement = document.getElementById('calendar');
const monthYearElement = document.getElementById('month-year');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');
const modal = document.getElementById('modal');
const modalDateElement = document.getElementById('modal-date');
const modalEventElement = document.getElementById('modal-event');
const closeButton = document.querySelector('.close');

let currentMonth = 10; // 0 for January, 11 for December
let currentYear = 2024;

// Predefined events
const events = {
    '2024-11-20': ' "Хищниците на върха" – турнир за напреднали, който ще тества сила, издръжливост и техника',
    '2024-12-05': 'Уъркшоп „Калистеника за начинаещи“ – безплатен семинар за всички, които искат да научат основите на този мощен тренировъчен метод',
    '2025-01-15': 'Специален зимен лагер за интензивна подготовка – комбинирани тренировки и семинари на открито в планината',
};

function renderCalendar(month, year) {
    calendarElement.innerHTML = '';
    monthYearElement.textContent = `${getMonthName(month)} ${year}`;

    // Add day names at the top
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        calendarElement.innerHTML += `<div class="day-name">${day}</div>`;
    });
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 0; i < firstDay; i++) {
        calendarElement.innerHTML += '<div class="day"></div>'; // Empty days
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        calendarElement.innerHTML += `
            <div class="day" data-date="${dateString}">
                <strong>${day}</strong>
            </div>
        `;
    }

    // Add event listeners to day cells
    document.querySelectorAll('.day[data-date]').forEach(dayElement => {
        dayElement.addEventListener('click', (e) => {
            const date = e.target.getAttribute('data-date');
            const dayNumber = date.split('-')[2]; // Get the day number
            const monthName = getMonthName(parseInt(date.split('-')[1]) - 1); // Get the month name
            const yearNumber = date.split('-')[0]; // Get the year

            modalDateElement.textContent = `${dayNumber} ${monthName}, ${yearNumber}`; // Format date

            // Show event if exists
            if (events[date]) {
                modalEventElement.textContent = events[date];
            } else {
                modalEventElement.textContent = 'No events for this day.';
            }

            modal.style.display = ''; // Show modal 
        });
    });
}

function getMonthName(month) {
    const monthNames = [
        'Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни',
        'Юли', 'Август', 'Септември', 'Oктомври', 'Ноември', 'Декември'
    ];
    return monthNames[month];
}

prevMonthButton.addEventListener('click', () => {
    if (currentMonth === 0) {
        currentMonth = 11;
        currentYear -= 1;
    } else {
        currentMonth--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextMonthButton.addEventListener('click', () => {
    if (currentMonth === 11) {
        currentMonth = 0;
        currentYear += 1;
    } else {
        currentMonth++;
    }
    renderCalendar(currentMonth, currentYear);
});

// Close modal
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Click outside modal to close
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

// Initial render
renderCalendar(currentMonth, currentYear);
