// Дата события
const eventDate = new Date('2026-07-28T17:00:00').getTime();

// Обновление счетчика времени
function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    } else {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Обновляем счетчик каждую секунду
setInterval(updateCountdown, 1000);
updateCountdown();

// Функции опроса
function voteSure() {
    const message = document.getElementById('pollMessage');
    message.textContent = '✓ Сіздің келуіңізге өте ризамыз! Той өте керемет болады!';
    message.classList.add('show');
    localStorage.setItem('invitation-response', 'yes');
}

function voteNo() {
    const message = document.getElementById('pollMessage');
    message.textContent = '✗ Өкіністеп орая, сіз келе алмайтындан туралы хабарлағансыз. Істеміз болғанда сіз үшін де ойнаймыз!';
    message.classList.add('show');
    localStorage.setItem('invitation-response', 'no');
}

// Создание календаря
function generateCalendar(month, year) {
    const monthNames = [
        'Қантар', 'Ақпан', 'Наурыз', 'Сәуір',
        'Мамыр', 'Маусым', 'Шілде', 'Тамыз',
        'Қыркүйек', 'Қазан', 'Қарашы', 'Желтоқсан'
    ];

    document.getElementById('currentMonth').textContent = monthNames[month] + ' ' + year;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const calendarBody = document.getElementById('calendarBody');
    calendarBody.innerHTML = '';

    let date = 1;
    let nextDate = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                cell.textContent = daysInPrevMonth - firstDay + j + 1;
                cell.classList.add('empty');
            } else if (date > daysInMonth) {
                cell.textContent = nextDate;
                cell.classList.add('empty');
                nextDate++;
            } else {
                cell.textContent = date;

                const today = new Date();
                if (
                    date === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear()
                ) {
                    cell.classList.add('today');
                }

                if (date === 28 && month === 6 && year === 2026) {
                    cell.classList.add('event-day');
                }

                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const now = new Date();
if (now > new Date('2026-07-28')) {
    currentMonth = 6;
    currentYear = 2026;
}

function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    generateCalendar(currentMonth, currentYear);
}

generateCalendar(currentMonth, currentYear);

window.addEventListener('load', function () {
    const savedResponse = localStorage.getItem('invitation-response');
    if (savedResponse === 'yes') {
        voteSure();
    } else if (savedResponse === 'no') {
        voteNo();
    }
});