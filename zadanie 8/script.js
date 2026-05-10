// ==========================================
// 4. Pobieranie danych z JSON (Zadanie 6)
// ==========================================
const projektyList = document.getElementById('projekty-list');
const umiejetnosciList = document.getElementById('umiejetnosci-list');

// Uruchamiamy fetch tylko jeśli elementy istnieją na stronie
if (projektyList && umiejetnosciList) {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd sieci!');
            }
            return response.json();
        })
        .then(data => {
            // Generowanie projektów
            data.projekty.forEach(projekt => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${projekt.nazwa}:</strong> ${projekt.opis}`;
                projektyList.appendChild(li);
            });

            // Generowanie umiejętności
            data.umiejetnosci.forEach(umiejetnosc => {
                const li = document.createElement('li');
                li.textContent = umiejetnosc;
                umiejetnosciList.appendChild(li);
            });
        })
        .catch(error => console.error('Błąd pobierania danych JSON:', error));
}


// ==========================================
// ZADANIE 7 - Local Storage
// ==========================================
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Funkcja do pobierania danych z localStorage
function getTasks() {
    const tasks = localStorage.getItem('myTasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Funkcja do zapisywania danych w localStorage
function saveTasks(tasks) {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// Funkcja do wyświetlania zadań na ekranie
function renderTasks() {
    if (!taskList) return;
    taskList.innerHTML = ''; 
    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;

        // Przycisk usuwania dla każdego elementu
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Usuń'; // Змінено на польську
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.onclick = () => {
            deleteTask(index);
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Funkcja dodawania nowego zadania
if (addTaskBtn && taskInput) {
    addTaskBtn.addEventListener('click', () => {
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
            const tasks = getTasks();
            tasks.push(newTask); 
            saveTasks(tasks);    
            taskInput.value = '';
            renderTasks();       
        }
    });
}

// Funkcja usuwania zadania
function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1); 
    saveTasks(tasks);       
    renderTasks();          
}

// Uruchamiamy renderowanie po załadowaniu strony
document.addEventListener('DOMContentLoaded', renderTasks);


// ==========================================
// ZADANIE 8 - Obsługa Backend (MockAPI)
// ==========================================
const backendForm = document.getElementById('backendForm');
const formStatus = document.getElementById('formStatus');

// Twoj osobisty link do MockAPI
const backendURL = 'https://6a006cb02b7ab349603052fa.mockapi.io/users'; 

if (backendForm) {
    backendForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Zatrzymuje odświeżanie strony

        // Pobieramy dane z pól formularza
        const formData = {
            name: document.getElementById('userName').value,
            email: document.getElementById('userEmail').value,
            createdAt: new Date().toISOString() // Opcjonalnie: data dodania
        };

        // Wysyłanie danych metodą POST
        fetch(backendURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Błąd połączenia z serwerem');
        })
        .then(data => {
            console.log('Dane zapisane na serwerze:', data);
            
            // Pokazujemy komunikat o sukcesie
            formStatus.style.display = 'block';
            backendForm.reset(); // Czyścimy pola formularza
            
            // Ukrywamy komunikat po 4 sekundach
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 4000);
        })
        .catch(error => {
            console.error('Błąd:', error);
            alert('Wystąpił błąd podczas wysyłania danych na serwer.');
        });
    });
}
