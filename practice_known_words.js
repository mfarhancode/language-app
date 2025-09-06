// // // let knownWords = [];
// // // let currentIndex = 0;

// // // async function loadData(file) {
// // //   const res = await fetch(`data/${file}`);
// // //   if (!res.ok) return [];
// // //   return await res.json();
// // // }

// // // function shuffleArray(array) {
// // //   for (let i = array.length - 1; i > 0; i--) {
// // //     const j = Math.floor(Math.random() * (i + 1));
// // //     [array[i], array[j]] = [array[j], array[i]];
// // //   }
// // // }

// // // function showWordCard(wordObj) {
// // //   const container = document.getElementById('practice-container');
// // //   container.innerHTML = `
// // //     <div class="card">
// // //       <p><strong>Translate this word:</strong></p>
// // //       <h2>${wordObj.word}</h2>
// // //       <input type="text" id="answer" placeholder="Type Bahasa translation..." />
// // //       <div style="margin-top: 10px;">
// // //         <button onclick="checkAnswer()">✅ Check</button>
// // //         <button onclick="toggleWordTranslation()">👁️ Show Word Translation</button>
// // //         <button onclick="location.href='practice.html'">⬅ Back</button>
// // //       </div>
// // //       <div id="feedback" style="margin-top: 10px;"></div>
// // //       <div id="word-translation" style="margin-top: 5px; display: none;"></div>
// // //     </div>
// // //   `;

// // //   const input = document.getElementById('answer');
// // //   input.focus();
// // //   input.addEventListener('keydown', function (e) {
// // //     if (e.key === 'Enter') {
// // //       checkAnswer();
// // //     }
// // //   });
// // // }

// // // function checkAnswer() {
// // //   const input = document.getElementById('answer').value.trim().toLowerCase();
// // //   const correct = knownWords[currentIndex].translation.toLowerCase();
// // //   const feedback = document.getElementById('feedback');

// // //   if (!input) {
// // //     feedback.textContent = "Please enter your answer.";
// // //     feedback.style.color = 'red';
// // //     return;
// // //   }

// // //   if (input === correct) {
// // //     feedback.textContent = "✅ Correct!";
// // //     feedback.style.color = 'green';

// // //     setTimeout(() => {
// // //       nextWord();
// // //     }, 1000); // 1 second delay before moving to next word
// // //   } else {
// // //     feedback.textContent = "❌ Incorrect. Try again.";
// // //     feedback.style.color = 'red';
// // //   }
// // // }

// // // function toggleWordTranslation() {
// // //   const box = document.getElementById('word-translation');
// // //   const word = knownWords[currentIndex].translation;

// // //   if (box.style.display === 'none') {
// // //     box.style.display = 'block';
// // //     box.innerHTML = `<strong>Translation:</strong> ${word}`;
// // //   } else {
// // //     box.style.display = 'none';
// // //   }
// // // }

// // // function nextWord() {
// // //   currentIndex++;
// // //   if (currentIndex < knownWords.length) {
// // //     showWordCard(knownWords[currentIndex]);
// // //   } else {
// // //     document.getElementById('practice-container').innerHTML = "<p>🎉 Practice Complete!</p>";
// // //   }
// // // }

// // // async function startPractice() {
// // //   knownWords = await loadData('known_words.json');
// // //   if (!knownWords.length) {
// // //     document.getElementById('practice-container').innerHTML = "<p>No known words to practice.</p>";
// // //     return;
// // //   }

// // //   shuffleArray(knownWords);
// // //   currentIndex = 0;
// // //   showWordCard(knownWords[currentIndex]);
// // // }

// // // startPractice();

// // let knownWords = [];
// // let currentIndex = 0;

// // async function loadData(file) {
// //   const res = await fetch(`data/${file}`);
// //   if (!res.ok) return [];
// //   return await res.json();
// // }

// // function shuffleArray(array) {
// //   for (let i = array.length - 1; i > 0; i--) {
// //     const j = Math.floor(Math.random() * (i + 1));
// //     [array[i], array[j]] = [array[j], array[i]];
// //   }
// // }

// // function showWordCard(wordObj) {
// //   const container = document.getElementById('practice-container');
// //   container.innerHTML = `
// //     <div class="card">
// //       <p><strong>Translate this word:</strong></p>
// //       <h2>${wordObj.word}</h2>
// //       <input
// //         type="text"
// //         id="answer"
// //         placeholder="Type Bahasa translation..."
// //         readonly
// //         onfocus="this.removeAttribute('readonly')"
// //         autocomplete="off"
// //         autocorrect="off"
// //         autocapitalize="off"
// //         spellcheck="false"
// //       />
// //       <div style="margin-top: 10px;">
// //         <button onclick="checkAnswer()">✅ Check</button>
// //         <button onclick="toggleWordTranslation()">👁️ Show Word Translation</button>
// //         <button onclick="location.href='practice.html'">⬅ Back</button>
// //       </div>
// //       <div id="feedback" style="margin-top: 10px;"></div>
// //       <div id="word-translation" style="margin-top: 5px; display: none;"></div>
// //     </div>
// //   `;

// //   const input = document.getElementById('answer');

// //   // Give input random name to defeat Chrome's memory
// //   const randomName = "input_" + Math.random().toString(36).substring(2);
// //   input.setAttribute("name", randomName);

// //   input.focus();
// //   input.addEventListener('keydown', function (e) {
// //     if (e.key === 'Enter') {
// //       checkAnswer();
// //     }
// //   });
// // }

// // function checkAnswer() {
// //   const input = document.getElementById('answer').value.trim().toLowerCase();
// //   const correct = knownWords[currentIndex].translation.toLowerCase();
// //   const feedback = document.getElementById('feedback');

// //   if (!input) {
// //     feedback.textContent = "Please enter your answer.";
// //     feedback.style.color = 'red';
// //     return;
// //   }

// //   if (input === correct) {
// //     feedback.textContent = "✅ Correct!";
// //     feedback.style.color = 'green';

// //     setTimeout(() => {
// //       nextWord();
// //     }, 1000);
// //   } else {
// //     feedback.textContent = "❌ Incorrect. Try again.";
// //     feedback.style.color = 'red';
// //   }
// // }

// // function toggleWordTranslation() {
// //   const box = document.getElementById('word-translation');
// //   const word = knownWords[currentIndex].translation;

// //   if (box.style.display === 'none') {
// //     box.style.display = 'block';
// //     box.innerHTML = `<strong>Translation:</strong> ${word}`;
// //   } else {
// //     box.style.display = 'none';
// //   }
// // }

// // function nextWord() {
// //   currentIndex++;
// //   if (currentIndex < knownWords.length) {
// //     showWordCard(knownWords[currentIndex]);
// //   } else {
// //     document.getElementById('practice-container').innerHTML = "<p>🎉 Practice Complete!</p>";
// //   }
// // }

// // async function startPractice() {
// //   knownWords = await loadData('known_words.json');
// //   if (!knownWords.length) {
// //     document.getElementById('practice-container').innerHTML = "<p>No known words to practice.</p>";
// //     return;
// //   }

// //   shuffleArray(knownWords);
// //   currentIndex = 0;
// //   showWordCard(knownWords[currentIndex]);
// // }

// // startPractice();


// let knownWords = [];
// let currentIndex = 0;

// async function loadData(file) {
//   const res = await fetch(`data/${file}`);
//   if (!res.ok) return [];
//   return await res.json();
// }

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

// function capitalizeFirstChar(text) {
//   if (!text) return '';
//   return text.charAt(0).toUpperCase() + text.slice(1);
// }

// function ensurePeriod(text) {
//   text = text.trim();
//   if (!text.endsWith('.')) {
//     text += '.';
//   }
//   return text;
// }

// function formatTranslation(text) {
//   return ensurePeriod(capitalizeFirstChar(text));
// }

// function showWordCard(wordObj) {
//   const container = document.getElementById('practice-container');
//   container.innerHTML = `
//     <div class="card">
//       <p><strong>Translate this word:</strong></p>
//       <h2>${capitalizeFirstChar(wordObj.word)}</h2>
//       <input
//         type="text"
//         id="answer"
//         placeholder="Type Bahasa translation..."
//         readonly
//         onfocus="this.removeAttribute('readonly')"
//         autocomplete="off"
//         autocorrect="off"
//         autocapitalize="off"
//         spellcheck="false"
//       />
//       <div class="button-group">
//         <button onclick="checkAnswer()">✅ Check</button>
//         <button onclick="toggleWordTranslation()">👁️ Show Word Translation</button>
//         <button onclick="location.href='practice.html'">⬅ Back</button>
//       </div>
//       <div id="feedback"></div>
//       <div id="word-translation" style="display: none;"></div>
//     </div>
//   `;

//   const input = document.getElementById('answer');

//   // Random name to prevent Chrome autofill memory
//   const randomName = "input_" + Math.random().toString(36).substring(2);
//   input.setAttribute("name", randomName);

//   input.focus();
//   input.addEventListener('keydown', function (e) {
//     if (e.key === 'Enter') {
//       checkAnswer();
//     }
//   });
// }

// function checkAnswer() {
//   const input = document.getElementById('answer').value.trim().toLowerCase();
//   const correct = knownWords[currentIndex].translation.toLowerCase();
//   const feedback = document.getElementById('feedback');

//   if (!input) {
//     feedback.textContent = "Please enter your answer.";
//     feedback.style.color = 'red';
//     return;
//   }

//   if (input === correct) {
//     feedback.textContent = "✅ Correct!";
//     feedback.style.color = 'green';

//     setTimeout(() => {
//       nextWord();
//     }, 1000);
//   } else {
//     feedback.textContent = "❌ Incorrect. Try again.";
//     feedback.style.color = 'red';
//   }
// }

// function toggleWordTranslation() {
//   const box = document.getElementById('word-translation');
//   let translation = knownWords[currentIndex].translation;
//   translation = formatTranslation(translation);

//   if (box.style.display === 'none') {
//     box.style.display = 'block';
//     box.innerHTML = `<strong>Translation:</strong> ${translation}`;
//   } else {
//     box.style.display = 'none';
//   }
// }

// function nextWord() {
//   currentIndex++;
//   if (currentIndex < knownWords.length) {
//     showWordCard(knownWords[currentIndex]);
//   } else {
//     document.getElementById('practice-container').innerHTML = "<p>🎉 Practice Complete!</p>";
//   }
// }

// async function startPractice() {
//   knownWords = await loadData('known_words.json');
//   if (!knownWords.length) {
//     document.getElementById('practice-container').innerHTML = "<p>No known words to practice.</p>";
//     return;
//   }

//   shuffleArray(knownWords);
//   currentIndex = 0;
//   showWordCard(knownWords[currentIndex]);
// }

// startPractice();


let knownWords = [];
let currentIndex = 0;

async function loadData(file) {
  const res = await fetch(`data/${file}`);
  if (!res.ok) return [];
  return await res.json();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function saveWord() {
  const word = knownWords[currentIndex];
  // Load current saved words
  let saved = await loadData('saved_words.json');
  // Prevent duplicates by word property
  if (!saved.some(w => w.word.toLowerCase() === word.word.toLowerCase())) {
    saved.push(word);
    const success = await saveData('saved_words.json', saved);
    const feedback = document.getElementById('feedback');
    if (success) {
      feedback.textContent = "⭐ Word saved!";
      feedback.style.color = 'deepskyblue';
    } else {
      feedback.textContent = "⚠️ Failed to save word.";
      feedback.style.color = 'orange';
    }
  } else {
    const feedback = document.getElementById('feedback');
    feedback.textContent = "⭐ Word already saved.";
    feedback.style.color = 'gray';
  }
}

async function saveData(file, content) {
  const res = await fetch('http://127.0.0.1:5000/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file, content }),
  });
  const data = await res.json();
  return data.status === 'success';
}



function showWordCard(wordObj) {
  const container = document.getElementById('practice-container');
  container.innerHTML = `
    <div>
      <p><strong>Translate this word:</strong></p>
      <h2>${capitalize(wordObj.word)}</h2>
      <input
        type="text"
        id="answer"
        placeholder="Type Bahasa translation..."
        readonly
        onfocus="this.removeAttribute('readonly')"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
      />
      <div class="btn-row">
        <button onclick="checkAnswer()">✅ Check</button>
        <button onclick="saveWord()">⭐ Save</button>
        <button onclick="toggleWordTranslation()">👁️ Show Translation</button>
      </div>
      <div id="feedback"></div>
      <div id="word-translation"></div>
    </div>
  `;

  const input = document.getElementById('answer');

  // Give input random name to defeat Chrome's autocomplete memory
  const randomName = "input_" + Math.random().toString(36).substring(2);
  input.setAttribute("name", randomName);

  input.focus();

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  });

  // Clear feedback & translation on new card show
  document.getElementById('feedback').textContent = '';
  document.getElementById('word-translation').style.display = 'none';
  document.getElementById('word-translation').textContent = '';
}

function checkAnswer() {
  const input = document.getElementById('answer').value.trim().toLowerCase();
  const correct = knownWords[currentIndex].translation.toLowerCase();
  const feedback = document.getElementById('feedback');

  if (!input) {
    feedback.textContent = "Please enter your answer.";
    feedback.style.color = 'red';
    return;
  }

  if (input === correct) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = 'limegreen';

    setTimeout(() => {
      nextWord();
    }, 1000);
  } else {
    feedback.textContent = "❌ Incorrect. Try again.";
    feedback.style.color = 'red';
  }
}

function toggleWordTranslation() {
  const box = document.getElementById('word-translation');
  const word = knownWords[currentIndex].translation;

  if (box.style.display === 'none' || box.style.display === '') {
    box.style.display = 'block';
    box.textContent = `Translation: ${word.charAt(0).toUpperCase() + word.slice(1)}`;
  } else {
    box.style.display = 'none';
    box.textContent = '';
  }
}

function nextWord() {
  currentIndex++;
  if (currentIndex < knownWords.length) {
    showWordCard(knownWords[currentIndex]);
  } else {
    const container = document.getElementById('practice-container');
    container.innerHTML = "<p>🎉 Practice Complete!</p>";
  }
}

async function startPractice() {
  knownWords = await loadData('known_words.json');
  if (!knownWords.length) {
    document.getElementById('practice-container').innerHTML = "<p>No known words to practice.</p>";
    return;
  }

  shuffleArray(knownWords);
  currentIndex = 0;
  showWordCard(knownWords[currentIndex]);
}

startPractice();
