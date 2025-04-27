let currentUser = null;

function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    if (!username || !password) {
        alert("Введите имя и пароль.");
        return;
    }

    // Сохраняем данные пользователя
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (!users[username]) {
        users[username] = { password: password, entries: [] };
    } else if (users[username].password !== password) {
        alert("Неверный пароль!");
        return;
    }

    localStorage.setItem('users', JSON.stringify(users));
    currentUser = username;
    showDiary();
}

function showDiary() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('diaryScreen').style.display = 'block';
    loadEntries();
}

function loadEntries() {
    const users = JSON.parse(localStorage.getItem('users'));
    const userData = users[currentUser];
    const entriesDiv = document.getElementById('entries');
    entriesDiv.innerHTML = '';

    userData.entries.forEach((entry, index) => {
        const div = document.createElement('div');
        div.className = 'entry';
        div.innerHTML = `
            <p>${entry}</p>
            <button onclick="deleteEntry(${index})">Удалить</button>
        `;
        entriesDiv.appendChild(div);
    });
}

function addEntry() {
    const newEntry = document.getElementById('newEntry').value.trim();
    if (!newEntry) return;

    const users = JSON.parse(localStorage.getItem('users'));
    users[currentUser].entries.push(newEntry);
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('newEntry').value = '';
    loadEntries();
}

function deleteEntry(index) {
    const users = JSON.parse(localStorage.getItem('users'));
    users[currentUser].entries.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    loadEntries();
}

function logout() {
    currentUser = null;
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('diaryScreen').style.display = 'none';
}
