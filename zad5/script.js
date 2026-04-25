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

// 3. Formularz i walidacja (Zadanie 5)
const form = document.getElementById('kontakt-form');
const formMessages = document.getElementById('form-messages');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Zatrzymuje przeładowanie strony
        
        let errors = [];
        const imie = document.getElementById('imie').value.trim();
        const nazwisko = document.getElementById('nazwisko').value.trim();
        const email = document.getElementById('email').value.trim();
        const wiadomosc = document.getElementById('wiadomosc').value.trim();

        // Wyrażenie regularne sprawdzające obecność cyfr
        const hasNumbers = /\d/;

        // Walidacja
        if (!imie || hasNumbers.test(imie)) {
            errors.push("Imię jest wymagane i nie może zawierać cyfr.");
        }
        if (!nazwisko || hasNumbers.test(nazwisko)) {
            errors.push("Nazwisko jest wymagane i nie może zawierać cyfr.");
        }
        if (!email || !email.includes('@')) {
            errors.push("Podaj poprawny adres e-mail (musi zawierać @).");
        }
        if (!wiadomosc) {
            errors.push("Wiadomość nie może być pusta.");
        }

        // Wyświetlanie błędów lub sukcesu
        if (errors.length > 0) {
            formMessages.innerHTML = errors.join('<br>');
            formMessages.className = 'form-messages error-text';
        } else {
            formMessages.innerHTML = "Wiadomość została wysłana pomyślnie!";
            formMessages.className = 'form-messages success-text';
            form.reset(); // Czyszczenie formularza po wysłaniu
        }
    });
}
