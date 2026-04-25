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
