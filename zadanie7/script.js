// 4. Pobieranie danych z JSON (Zadanie 6)
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

// Знаходимо елементи на сторінці
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Функція для отримання даних з localStorage
function getTasks() {
    const tasks = localStorage.getItem('myTasks');
    // Якщо дані є, перетворюємо з рядка в масив, якщо ні - повертаємо порожній масив
    return tasks ? JSON.parse(tasks) : [];
}

// Функція для збереження даних у localStorage
function saveTasks(tasks) {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
}

// Функція для відображення завдань на екрані
function renderTasks() {
    taskList.innerHTML = ''; // Очищаємо список перед оновленням
    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;

        // Кнопка видалення для кожного елемента
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Видалити';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.onclick = () => {
            deleteTask(index);
        };

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Функція додавання нового завдання
addTaskBtn.addEventListener('click', () => {
    const newTask = taskInput.value.trim();
    if (newTask !== '') {
        const tasks = getTasks();
        tasks.push(newTask); // Додаємо в масив
        saveTasks(tasks);    // Зберігаємо
        taskInput.value = '';// Очищаємо поле
        renderTasks();       // Оновлюємо інтерфейс
    }
});

// Функція видалення завдання
function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1); // Видаляємо 1 елемент за індексом
    saveTasks(tasks);       // Зберігаємо оновлений масив
    renderTasks();          // Оновлюємо інтерфейс
}

// Запускаємо відображення при завантаженні сторінки
document.addEventListener('DOMContentLoaded', renderTasks);
