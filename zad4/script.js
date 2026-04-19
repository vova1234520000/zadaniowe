// 1. Zmiana motywu (Green / Red)
const themeToggleBtn = document.getElementById('theme-toggle');
const bodyElement = document.body;

themeToggleBtn.addEventListener('click', () => {
    // Sprawdzamy obecną klasę i podmieniamy na drugą
    if (bodyElement.classList.contains('theme-green')) {
        bodyElement.classList.remove('theme-green');
        bodyElement.classList.add('theme-red');
    } else {
        bodyElement.classList.remove('theme-red');
        bodyElement.classList.add('theme-green');
    }
});

// 2. Ukrywanie i pokazywanie sekcji (np. "Projekty")
const sectionToggleBtn = document.getElementById('section-toggle');
const projektySection = document.getElementById('projekty');

sectionToggleBtn.addEventListener('click', () => {
    // Metoda toggle automatycznie dodaje klasę, jeśli jej nie ma, i usuwa, jeśli jest
    projektySection.classList.toggle('hidden');
});
