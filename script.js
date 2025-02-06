document.addEventListener('DOMContentLoaded', () => {
  const insertPersonButton = document.getElementById('insertPerson');
  const personPhotoInput = document.getElementById('personPhoto');
  const personNameInput = document.getElementById('personName');
  const startGameButton = document.getElementById('startGame');
  const playerListUl = document.getElementById('playerList');
  let selectedCell = null;
  let personCount = 0;
  const usedNames = new Set();
  const players = []; // Array to store player names

  const cells = document.querySelectorAll('td');
  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      if (selectedCell) {
        selectedCell.classList.remove('selected-cell');
      }
      selectedCell = cell;
      selectedCell.classList.add('selected-cell');
    });
  });

  function updatePlayerListDisplay() {
    playerListUl.innerHTML = ''; // Clear the list
    players.forEach(playerName => {
      const li = document.createElement('li');
      li.textContent = playerName;
      playerListUl.appendChild(li);
    });
  }

  insertPersonButton.addEventListener('click', () => {
    if (!selectedCell) {
      alert('Please select a cell in the grid first.');
      return;
    }

    if (selectedCell.innerHTML.trim() !== '') {
      alert('This cell is already occupied. Please select another cell.');
      return;
    }

    const photoFile = personPhotoInput.files[0];
    if (!photoFile) {
      alert('Please select a photo.');
      return;
    }

    const personName = personNameInput.value.trim();
    if (!personName) {
      alert('Please enter a person name.');
      return;
    }

    if (usedNames.has(personName)) {
      alert('This name is already used. Please choose a different name.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.src = event.target.result;
      img.classList.add('person-image');
      selectedCell.innerHTML = '';

      const personDiv = document.createElement('div');
      personDiv.classList.add('person-container');
      personDiv.dataset.personName = personName; // Store name in data attribute
      personDiv.appendChild(img);

      selectedCell.appendChild(personDiv);
      personPhotoInput.value = '';
      personNameInput.value = '';
      selectedCell.classList.remove('selected-cell');
      selectedCell = null;
      usedNames.add(personName);
      players.push(personName); // Add name to players array
      updatePlayerListDisplay(); // Update displayed list
      personCount++;
      if (personCount > 0) {
        startGameButton.style.display = 'block';
      }
    };
    reader.readAsDataURL(photoFile);
  });

  startGameButton.addEventListener('click', () => {
    alert('Game started with ' + personCount + ' players: ' + players.join(', '));
    // Here you would add the game start logic
  });
});
