// ==========================================
// ZADANIE 4 i 5 - Manipulacja DOM i Motyw
// ==========================================
const themeBtn = document.getElementById('theme-toggle-btn');
const projectsBtn = document.getElementById('projects-toggle-btn');
const projectsSection = document.getElementById('projects-section');

// Zmiana motywu (Green / Red)
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        // Sprawdzamy aktualny kolor tła body
        if (document.body.style.backgroundColor === 'red') {
            document.body.style.backgroundColor = 'green';
        } else {
            document.body.style.backgroundColor = 'red';
        }
    });
}

// Ukrywanie / Pokazywanie sekcji projekty
if (projectsBtn && projectsSection) {
    projectsBtn.addEventListener('click', () => {
        if (projectsSection.style.display === 'none') {
            projectsSection.style.display = 'block';
            projectsBtn.textContent = 'Ukryj sekcję "Projekty"';
        } else {
            projectsSection.style.display = 'none';
            projectsBtn.textContent = 'Pokaż sekcję "Projekty"';
        }
    });
}

// ==========================================
// ZADANIE 6 - JSON Data
// ==========================================
const projektyList = document.getElementById('projekty-list');
if (projektyList) {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            data.projekty.forEach(p => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${p.nazwa}</strong>: ${p.opis}`;
                projektyList.appendChild(li);
            });
        });
}

// ==========================================
// ZADANIE 7 - Local Storage
// ==========================================
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function getTasks() {
    return JSON.parse(localStorage.getItem('myTasks') || '[]');
}

function renderTasks() {
    if (!taskList) return;
    taskList.innerHTML = '';
    getTasks().forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;
        const btn = document.createElement('button');
        btn.textContent = 'Usuń';
        btn.onclick = () => {
            const t = getTasks();
            t.splice(index, 1);
            localStorage.setItem('myTasks', JSON.stringify(t));
            renderTasks();
        };
        li.appendChild(btn);
        taskList.appendChild(li);
    });
}

if (addTaskBtn) {
    addTaskBtn.addEventListener('click', () => {
        const t = getTasks();
        t.push(taskInput.value);
        localStorage.setItem('myTasks', JSON.stringify(t));
        taskInput.value = '';
        renderTasks();
    });
}
document.addEventListener('DOMContentLoaded', renderTasks);

// ==========================================
// ZADANIE 8 - Backend (MockAPI)
// ==========================================
const backendForm = document.getElementById('backendForm');
const backendURL = 'https://6a006cb02b7ab349603052fa.mockapi.io/users'; 

if (backendForm) {
    backendForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value
        };
        fetch(backendURL, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(() => {
            document.getElementById('formStatus').style.display = 'block';
            backendForm.reset();
        });
    });
}
