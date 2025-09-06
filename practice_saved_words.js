// // let savedWords = [];
// // let currentIndex = 0;
// // let sentenceMap = {};

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

// //   const sentenceEntry = sentenceMap[wordObj.word];

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
// //         <button onclick="toggleWordTranslation()">👁️ Show Translation</button>
// //         ${sentenceEntry ? `<button onclick="toggleSentence()">📘 Show Example Sentence</button>` : ""}
// //         <button onclick="location.href='practice.html'">⬅ Back</button>
// //       </div>

// //       <div id="feedback" style="margin-top: 10px;"></div>
// //       <div id="word-translation" style="margin-top: 5px; display: none;"><strong>Translation:</strong> ${wordObj.translation}</div>

// //       ${sentenceEntry ? `
// //         <div id="sentence-box" style="display: none; margin-top: 10px;">
// //           <p><strong>Example:</strong></p>
// //           <p><em>${sentenceEntry.sentence_en}</em></p>
// //           <p><em>${sentenceEntry.sentence_id}</em></p>
// //         </div>` : ""}
// //     </div>
// //   `;

// //   const input = document.getElementById('answer');
// //   input.setAttribute("name", "input_" + Math.random().toString(36).substring(2));
// //   input.focus();
// //   input.addEventListener('keydown', function (e) {
// //     if (e.key === 'Enter') checkAnswer();
// //   });
// // }

// // function checkAnswer() {
// //   const input = document.getElementById('answer').value.trim().toLowerCase();
// //   const correct = savedWords[currentIndex].translation.toLowerCase();
// //   const feedback = document.getElementById('feedback');

// //   if (!input) {
// //     feedback.textContent = "Please enter your answer.";
// //     feedback.style.color = 'red';
// //     return;
// //   }

// //   if (input === correct) {
// //     feedback.textContent = "✅ Correct!";
// //     feedback.style.color = 'green';
// //     setTimeout(nextWord, 1000);
// //   } else {
// //     feedback.textContent = "❌ Incorrect. Try again.";
// //     feedback.style.color = 'red';
// //   }
// // }

// // function toggleWordTranslation() {
// //   const box = document.getElementById('word-translation');
// //   box.style.display = (box.style.display === 'none') ? 'block' : 'none';
// // }

// // function toggleSentence() {
// //   const box = document.getElementById('sentence-box');
// //   box.style.display = (box.style.display === 'none') ? 'block' : 'none';
// // }

// // function nextWord() {
// //   currentIndex++;
// //   if (currentIndex < savedWords.length) {
// //     showWordCard(savedWords[currentIndex]);
// //   } else {
// //     document.getElementById('practice-container').innerHTML = "<p>🎉 Practice Complete!</p>";
// //   }
// // }

// // async function startPractice() {
// //   [savedWords, sentenceList] = await Promise.all([
// //     loadData('saved_words.json'),
// //     loadData('sentences.json')
// //   ]);

// //   if (!savedWords.length) {
// //     document.getElementById('practice-container').innerHTML = "<p>No saved words to practice.</p>";
// //     return;
// //   }

// //   sentenceList.forEach(entry => {
// //     if (entry.word) {
// //       sentenceMap[entry.word] = entry;
// //     }
// //   });

// //   shuffleArray(savedWords);
// //   currentIndex = 0;
// //   showWordCard(savedWords[currentIndex]);
// // }

// // startPractice();
// let savedWords = [];
// let currentIndex = 0;
// let sentenceMap = {};

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

// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }

// function showWordCard(wordObj) {
//   const container = document.getElementById('practice-container');
//   const sentenceEntry = sentenceMap[wordObj.word];

//   const word = capitalize(wordObj.word);
//   const translation = capitalize(wordObj.translation);

//   container.innerHTML = `
//     <div class="card">
//       <p><strong>Translate this word:</strong></p>
//       <h2>${word}</h2>

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

//       <div style="margin-top: 10px;">
//         <button onclick="checkAnswer()">✅ Check</button>
//         <button onclick="toggleWordTranslation()">👁️ Show Translation</button>
//         ${sentenceEntry ? `<button onclick="toggleSentence()">📘 Show Example</button>` : ""}
//       </div>

//       <div id="feedback" style="margin-top: 10px;"></div>
//       <div id="word-translation" style="margin-top: 5px; display: none;"><strong>Translation:</strong> ${translation}</div>

//       ${sentenceEntry ? `
//         <div id="sentence-box" style="display: none; margin-top: 10px;">
//           <p><strong>Example:</strong></p>
//           <p><em>${capitalize(sentenceEntry.sentence_en)}.</em></p>
//           <p><em>${capitalize(sentenceEntry.sentence_id)}.</em></p>
//         </div>` : ""}
//     </div>
//   `;

//   const input = document.getElementById('answer');
//   input.setAttribute("name", "input_" + Math.random().toString(36).substring(2));
//   input.focus();
//   input.addEventListener('keydown', function (e) {
//     if (e.key === 'Enter') checkAnswer();
//   });
// }

// function checkAnswer() {
//   const input = document.getElementById('answer').value.trim().toLowerCase();
//   const correct = savedWords[currentIndex].translation.toLowerCase();
//   const feedback = document.getElementById('feedback');

//   if (!input) {
//     feedback.textContent = "Please enter your answer.";
//     feedback.style.color = 'red';
//     return;
//   }

//   if (input === correct) {
//     feedback.textContent = "✅ Correct!";
//     feedback.style.color = 'green';
//     setTimeout(nextWord, 1000);
//   } else {
//     feedback.textContent = "❌ Incorrect. Try again.";
//     feedback.style.color = 'red';
//   }
// }

// function toggleWordTranslation() {
//   const box = document.getElementById('word-translation');
//   box.style.display = box.style.display === 'none' ? 'block' : 'none';
// }

// function toggleSentence() {
//   const box = document.getElementById('sentence-box');
//   box.style.display = box.style.display === 'none' ? 'block' : 'none';
// }

// function nextWord() {
//   currentIndex++;
//   if (currentIndex < savedWords.length) {
//     showWordCard(savedWords[currentIndex]);
//   } else {
//     document.getElementById('practice-container').innerHTML = "<p>🎉 Practice Complete!</p>";
//   }
// }

// async function startPractice() {
//   [savedWords, sentenceList] = await Promise.all([
//     loadData('saved_words.json'),
//     loadData('sentences.json')
//   ]);

//   if (!savedWords.length) {
//     document.getElementById('practice-container').innerHTML = "<p>No saved words to practice.</p>";
//     return;
//   }

//   sentenceList.forEach(entry => {
//     if (entry.word) {
//       sentenceMap[entry.word] = entry;
//     }
//   });

//   shuffleArray(savedWords);
//   currentIndex = 0;
//   showWordCard(savedWords[currentIndex]);
// }

// startPractice();

// let savedWords = [];
// let currentIndex = 0;
// let sentenceMap = {};

// async function loadData(file) {
//   const res = await fetch(`data/${file}`);
//   if (!res.ok) return [];
//   return await res.json();
// }

// async function saveData(file, content) {
//   await fetch(`/save/${file}`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(content),
//   });
// }

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

// function capitalize(text) {
//   if (!text) return "";
//   let t = text.trim();
//   t = t.replace(/\.+$/, ""); // remove existing trailing periods
//   return t.charAt(0).toUpperCase() + t.slice(1) + ".";
// }

// function showWordCard(wordObj) {
//   const container = document.getElementById('practice-container');
//   const sentenceEntry = sentenceMap[wordObj.word];

//   container.innerHTML = `
//     <p><strong>Translate this word:</strong></p>
//     <h2>${capitalize(wordObj.word)}</h2>
//     <input type="text"
//            id="answer"
//            placeholder="Type Bahasa translation..."
//            readonly
//            onfocus="this.removeAttribute('readonly')"
//            autocomplete="off"
//            autocorrect="off"
//            autocapitalize="off"
//            spellcheck="false"
//     />
//     <div class="btn-group">
//       <button onclick="checkAnswer()">✅ Check</button>
//       <button onclick="toggleWordTranslation()">👁️ Show Translation</button>
//       ${sentenceEntry ? `<button onclick="toggleSentence()">📘 Show Sentence</button>` : ""}
//       <button onclick="deleteWord()">🗑️ Delete Word</button>
      
//     </div>

//     <div id="feedback"></div>
//     <div id="word-translation" style="display: none;">
//       <p><strong>Translation:</strong> ${capitalize(wordObj.translation)}</p>
//     </div>

//     ${sentenceEntry ? `
//       <div id="sentence-box" style="display: none;" class="example">
//         <p><strong>Example:</strong></p>
//         <p>${capitalize(sentenceEntry.sentence_en)}</p>
//         <p>${capitalize(sentenceEntry.sentence_id)}</p>
//       </div>` : ""}
//   `;

//   const input = document.getElementById('answer');
//   input.setAttribute("name", "input_" + Math.random().toString(36).substring(2));
//   input.focus();
//   input.addEventListener('keydown', function (e) {
//     if (e.key === 'Enter') checkAnswer();
//   });
// }

// function checkAnswer() {
//   const input = document.getElementById('answer').value.trim().toLowerCase();
//   const correct = savedWords[currentIndex].translation.toLowerCase();
//   const feedback = document.getElementById('feedback');

//   if (!input) {
//     feedback.textContent = "Please enter your answer.";
//     feedback.style.color = 'red';
//     return;
//   }

//   if (input === correct) {
//     feedback.textContent = "✅ Correct!";
//     feedback.style.color = 'lightgreen';
//     setTimeout(nextWord, 1000);
//   } else {
//     feedback.textContent = "❌ Incorrect. Try again.";
//     feedback.style.color = 'red';
//   }
// }

// function toggleWordTranslation() {
//   const box = document.getElementById('word-translation');
//   box.style.display = (box.style.display === 'none') ? 'block' : 'none';
// }

// function toggleSentence() {
//   const box = document.getElementById('sentence-box');
//   box.style.display = (box.style.display === 'none') ? 'block' : 'none';
// }

// // function deleteWord() {
// //   const wordToDelete = savedWords[currentIndex].word;
// //   savedWords = savedWords.filter(item => item.word !== wordToDelete);
// //   saveData("saved_words.json", savedWords);
// //   if (currentIndex >= savedWords.length) {
// //     document.getElementById("practice-container").innerHTML = "<p>🎉 Practice complete or word deleted!</p>";
// //   } else {
// //     showWordCard(savedWords[currentIndex]);
// //   }
// // }

// function deleteWord(wordToDelete) {
//   savedWords = savedWords.filter(w => w.word !== wordToDelete);
//   saveData('saved_words.json', savedWords).then(() => {
//     alert(`❌ Deleted "${wordToDelete}" from saved_words.json`);
//     nextWord();
//   });
// }

// async function saveData(file, content) {
//   const res = await fetch('/save', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ file: file, content: content })
//   });

//   const result = await res.json();
//   if (!res.ok || result.status !== 'success') {
//     alert("⚠️ Failed to save data.");
//   }
// }

// function nextWord() {
//   currentIndex++;
//   if (currentIndex < savedWords.length) {
//     showWordCard(savedWords[currentIndex]);
//   } else {
//     document.getElementById("practice-container").innerHTML = "<p>🎉 Practice Complete!</p>";
//   }
// }

// async function startPractice() {
//   [savedWords, sentenceList] = await Promise.all([
//     loadData("saved_words.json"),
//     loadData("sentences.json")
//   ]);

//   if (!savedWords.length) {
//     document.getElementById("practice-container").innerHTML = "<p>No saved words to practice.</p>";
//     return;
//   }

//   sentenceList.forEach(entry => {
//     if (entry.word) {
//       sentenceMap[entry.word] = entry;
//     }
//   });

//   shuffleArray(savedWords);
//   currentIndex = 0;
//   showWordCard(savedWords[currentIndex]);
// }

// startPractice();

let savedWords = [];
let currentIndex = 0;
let sentenceMap = {};

async function loadData(file) {
  const res = await fetch(`data/${file}`);
  if (!res.ok) return [];
  return await res.json();
}

async function saveData(file, content) {
  const res = await fetch('http://127.0.0.1:5000/save', {  // Note the /server prefix here
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file, content }),
  });

  const result = await res.json();
  if (!res.ok || result.status !== 'success') {
    alert('⚠️ Failed to save data.');
    return false;
  }
  return true;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function capitalize(text) {
  if (!text) return "";
  let t = text.trim();
  t = t.replace(/\.+$/, ""); // remove existing trailing periods
  return t.charAt(0).toUpperCase() + t.slice(1) + ".";
}

function showWordCard(wordObj) {
  const container = document.getElementById('practice-container');
  const sentenceEntry = sentenceMap[wordObj.word];

  container.innerHTML = `
    <p><strong>Translate this word:</strong></p>
    <h2>${capitalize(wordObj.word)}</h2>
    <input type="text"
           id="answer"
           placeholder="Type Bahasa translation..."
           readonly
           onfocus="this.removeAttribute('readonly')"
           autocomplete="off"
           autocorrect="off"
           autocapitalize="off"
           spellcheck="false"
    />
    <div class="btn-group">
      <button onclick="checkAnswer()">✅ Check</button>
      <button onclick="toggleWordTranslation()">👁️ Show Translation</button>
      ${sentenceEntry ? `<button onclick="toggleSentence()">📘 Show Sentence</button>` : ""}
      <button onclick="deleteWord()">🗑️ Delete Word</button>
    </div>

    <div id="feedback"></div>
    <div id="word-translation" style="display: none;">
      <p><strong>Translation:</strong> ${capitalize(wordObj.translation)}</p>
    </div>

    ${sentenceEntry ? `
      <div id="sentence-box" style="display: none;" class="example">
        <p><strong>Example:</strong></p>
        <p>${capitalize(sentenceEntry.sentence_en)}</p>
        <p>${capitalize(sentenceEntry.sentence_id)}</p>
      </div>` : ""}
  `;

  const input = document.getElementById('answer');
  input.setAttribute("name", "input_" + Math.random().toString(36).substring(2));
  input.focus();
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') checkAnswer();
  });
}

function checkAnswer() {
  const input = document.getElementById('answer').value.trim().toLowerCase();
  const correct = savedWords[currentIndex].translation.toLowerCase();
  const feedback = document.getElementById('feedback');

  if (!input) {
    feedback.textContent = "Please enter your answer.";
    feedback.style.color = 'red';
    return;
  }

  if (input === correct) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = 'lightgreen';
    setTimeout(nextWord, 400);
  } else {
    feedback.textContent = "❌ Incorrect. Try again.";
    feedback.style.color = 'red';
  }
}

function toggleWordTranslation() {
  const box = document.getElementById('word-translation');
  box.style.display = (box.style.display === 'none') ? 'block' : 'none';
}

function toggleSentence() {
  const box = document.getElementById('sentence-box');
  box.style.display = (box.style.display === 'none') ? 'block' : 'none';
}

async function deleteWord() {
  console.log("Delete button clicked!");
  const wordToDelete = savedWords[currentIndex].word;
  console.log("Deleting word:", wordToDelete);
  savedWords = savedWords.filter(w => w.word !== wordToDelete);

  const success = await saveData('saved_words.json', savedWords);
  console.log("Save success?", success);
  if (success) {
    alert(`❌ Deleted "${wordToDelete}" from saved_words.json`);
    if (currentIndex >= savedWords.length) {
      document.getElementById("practice-container").innerHTML = "<p>🎉 Practice Complete!</p>";
    } else {
      showWordCard(savedWords[currentIndex]);
    }
  } else {
    alert("Failed to delete word.");
  }
}


function nextWord() {
  currentIndex++;
  if (currentIndex < savedWords.length) {
    showWordCard(savedWords[currentIndex]);
  } else {
    document.getElementById("practice-container").innerHTML = "<p>🎉 Practice Complete!</p>";
  }
}

async function startPractice() {
  [savedWords, sentenceList] = await Promise.all([
    loadData("saved_words.json"),
    loadData("sentences.json")
  ]);

  if (!savedWords.length) {
    document.getElementById("practice-container").innerHTML = "<p>No saved words to practice.</p>";
    return;
  }

  sentenceList.forEach(entry => {
    if (entry.word) {
      sentenceMap[entry.word] = entry;
    }
  });

  shuffleArray(savedWords);
  currentIndex = 0;
  showWordCard(savedWords[currentIndex]);
}

startPractice();
