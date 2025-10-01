
let words = [];

function addWord() {
  const input = document.getElementById("wordInput");
  const word = input.value.trim().toUpperCase();
  if (word) {
    words.push(word);
    input.value = "";
    updateWordList();
  }
}

function updateWordList() {
  const list = document.getElementById("wordList");
  list.innerHTML = "Words: " + words.join(", ");
}

function generateCrossword() {
  const gridSize = 15;
  const grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(" "));
  const placedWords = [];

  words.forEach(word => {
    const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
    const reverse = Math.random() < 0.5;
    const w = reverse ? word.split("").reverse().join("") : word;

    let row, col;
    if (direction === "horizontal") {
      row = Math.floor(Math.random() * gridSize);
      col = Math.floor(Math.random() * (gridSize - w.length));
    } else {
      row = Math.floor(Math.random() * (gridSize - w.length));
      col = Math.floor(Math.random() * gridSize);
    }

    if (canPlaceWord(grid, w, row, col, direction)) {
      placeWord(grid, w, row, col, direction);
      placedWords.push(word);
    }
  });

  // Fill empty cells
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (grid[i][j] === " ") {
        grid[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      }
    }
  }

  renderGrid(grid);
  renderWordBank(placedWords);
}

function canPlaceWord(grid, word, row, col, direction) {
  for (let i = 0; i < word.length; i++) {
    const r = direction === "horizontal" ? row : row + i;
    const c = direction === "horizontal" ? col + i : col;
    if (grid[r][c] !== " " && grid[r][c] !== word[i]) {
      return false;
    }
  }
  return true;
}

function placeWord(grid, word, row, col, direction) {
  for (let i = 0; i < word.length; i++) {
    const r = direction === "horizontal" ? row : row + i;
    const c = direction === "horizontal" ? col + i : col;
    grid[r][c] = word[i];
  }
}

function renderGrid(grid) {
  const container = document.getElementById("gridContainer");
  container.innerHTML = "";
  grid.forEach(row => {
    row.forEach(cell => {
      const div = document.createElement("div");
      div.className = "grid-cell";
      div.textContent = cell;
      container.appendChild(div);
    });
  });
}

function renderWordBank(words) {
  const bank = document.getElementById("wordBank");
  bank.innerHTML = "<h3>Word Bank:</h3><ol>" + words.map(w => `<li>${w}</li>`).join("") + "</ol>";
}
