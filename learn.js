// // // startLearn();
// // let allWords = [];
// // let knownWords = [];
// // let savedWords = [];
// // let freshWords = [];
// // let currentIndex = 0;

// // // Load JSON helper
// // async function loadData(file) {
// //   const res = await fetch(`data/${file}`);
// //   if (!res.ok) return [];
// //   return await res.json();
// // }

// // // Save JSON helper
// // async function saveData(file, content) {
// //   const res = await fetch('http://127.0.0.1:5000/save', {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify({ file, content }),
// //   });
// //   const data = await res.json();
// //   return data.status === 'success';
// // }

// // function showWordCard(wordObj) {
// //   const container = document.getElementById('quiz-container');
// //   container.innerHTML = `
// //     <div>
// //       <h2>Word: <strong>${wordObj.word}</strong></h2>
// //       <p><strong>Translation:</strong> ${wordObj.translation}</p>
// //       <p><em>Example (EN): ${wordObj.example_en || 'No example sentence available.'}</em></p>
// //       <p><em>Example (ID): ${wordObj.example_id || 'No translation available.'}</em></p>
// //       <input type="text" id="answer" placeholder="Enter translation..." autocomplete="off" autofocus />

// //       <br /><br />
// //       <div class="btn-group">
// //         <button id="checkBtn">✅ Check</button>
// //         <button id="saveBtn">⭐ Save</button>
// //       </div>
// //       <div id="feedback"></div>
// //     </div>
// //   `;

// //   document.getElementById('checkBtn').addEventListener('click', checkAnswer);
// //   document.getElementById('saveBtn').addEventListener('click', saveCurrentWord);

// //   document.getElementById('answer').addEventListener('keydown', e => {
// //     if (e.key === 'Enter') {
// //       e.preventDefault();
// //       checkAnswer();
// //     }
// //   });
// // }

// // async function checkAnswer() {
// //   const input = document.getElementById('answer').value.trim().toLowerCase();
// //   const correct = allWords[currentIndex].translation.toLowerCase();
// //   const feedback = document.getElementById('feedback');

// //   if (!input) {
// //     feedback.textContent = "❗ Please enter your answer.";
// //     feedback.style.color = 'orange';
// //     return;
// //   }

// //   if (input === correct) {
// //     feedback.textContent = "✅ Correct!";
// //     feedback.style.color = 'lime';

// //     // if (!knownWords.some(w => w.word.toLowerCase() === allWords[currentIndex].word.toLowerCase())) {
// //     //   knownWords.push(allWords[currentIndex]);
// //     //   await saveData('known_words.json', knownWords);
// //     // }
// // if (!knownWords.some(w => w.word.toLowerCase() === allWords[currentIndex].word.toLowerCase())) {
// //   const learnedWord = allWords[currentIndex];
// //   knownWords.push(learnedWord);
// //   await saveData('known_words.json', knownWords);

// //   freshWords = await loadData('fresh_words.json');
// //   if (!freshWords.some(w => w.word.toLowerCase() === learnedWord.word.toLowerCase())) {
// //     freshWords.push(learnedWord);
// //     await saveData('fresh_words.json', freshWords);
// //   }
// // }
// //     currentIndex++;
// //     if (currentIndex < allWords.length) {
// //       setTimeout(() => showWordCard(allWords[currentIndex]), 800);
// //     } else {
// //       document.getElementById('quiz-container').innerHTML = `<p>🎉 No new words to learn!</p>`;
// //     }
// //   } else {
// //     feedback.textContent = "❌ Incorrect. Try again.";
// //     feedback.style.color = 'red';
// //   }
// // }

// // async function saveCurrentWord() {
// //   const currentWord = allWords[currentIndex];
// //   savedWords = await loadData('saved_words.json');

// //   if (savedWords.some(w => w.word.toLowerCase() === currentWord.word.toLowerCase())) {
// //     alert('Word already saved.');
// //     return;
// //   }

// //   savedWords.push(currentWord);
// //   const saved = await saveData('saved_words.json', savedWords);
// //   if (saved) alert(`Saved "${currentWord.word}" for focused practice.`);
// //   else alert('Failed to save.');
// // }

// // async function startLearn() {
// //   const words = await loadData('words.json');
// //   const sentences = await loadData('sentences.json');
// //   knownWords = await loadData('known_words.json');
// //   freshWords = await loadData('fresh_words.json');

// //   const sentenceMap = {};
// //   for (const s of sentences) {
// //     sentenceMap[s.word.toLowerCase()] = {
// //       en: s.sentence_en,
// //       id: s.sentence_id
// //     };
// //   }

// //   allWords = words
// //     .filter(w => !knownWords.some(k => k.word.toLowerCase() === w.word.toLowerCase()))
// //     .map(w => ({
// //       ...w,
// //       example_en: sentenceMap[w.word.toLowerCase()]?.en || "",
// //       example_id: sentenceMap[w.word.toLowerCase()]?.id || ""
// //     }));

// //   // Save fresh practice words
// //   const newFresh = [];
// //   for (const word of allWords) {
// //     if (!freshWords.some(w => w.word.toLowerCase() === word.word.toLowerCase())) {
// //       freshWords.push(word);
// //       newFresh.push(word);
// //     }
// //   }
// //   if (newFresh.length > 0) await saveData('fresh_words.json', freshWords);

// //   if (allWords.length === 0) {
// //     document.getElementById('quiz-container').innerHTML = '<p>🎉 No new words to learn!</p>';
// //     return;
// //   }

// //   currentIndex = 0;
// //   showWordCard(allWords[currentIndex]);
// // }

// // startLearn();

// let allWords = [];
// let knownWords = [];
// let savedWords = [];
// let freshWords = [];
// let currentIndex = 0;
// let learnedToday = 0;


// // Load JSON helper
// async function loadData(file) {
//   try {
//     const res = await fetch(`data/${file}`);
//     if (!res.ok) return [];
//     return await res.json();
//   } catch {
//     return [];
//   }
// }

// // Save JSON helper
// async function saveData(file, content) {
//   try {
//     const res = await fetch('http://127.0.0.1:5000/save', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ file, content }),
//     });
//     const data = await res.json();
//     return data.status === 'success';
//   } catch {
//     return false;
//   }
// }

// function showWordCard(wordObj) {
//   const container = document.getElementById('quiz-container');
//   container.innerHTML = `
//     <div>
//       <h2>Word: <strong>${wordObj.word}</strong></h2>
//       <p><strong>Translation:</strong> ${wordObj.translation}</p>
//       <p><em>Example (EN): ${wordObj.example_en || 'No example sentence available.'}</em></p>
//       <p><em>Example (ID): ${wordObj.example_id || 'No translation available.'}</em></p>
//       <input type="text" id="answer" placeholder="Enter translation..." autocomplete="off" autofocus />

//       <br /><br />
//       <div class="btn-group">
//         <button id="checkBtn">✅ Check</button>
//         <button id="saveBtn">⭐ Save</button>
//       </div>
//       <div id="feedback"></div>
//     </div>
//   `;

//   document.getElementById('checkBtn').addEventListener('click', checkAnswer);
//   document.getElementById('saveBtn').addEventListener('click', saveCurrentWord);

//   document.getElementById('answer').addEventListener('keydown', e => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       checkAnswer();
//     }
//   });

//   document.getElementById('feedback').textContent = '';
//   document.getElementById('answer').focus();
// }

// async function checkAnswer() {
//   const inputEl = document.getElementById('answer');
//   const input = inputEl.value.trim().toLowerCase();
//   const correct = allWords[currentIndex].translation.toLowerCase();
//   const feedback = document.getElementById('feedback');

//   if (!input) {
//     feedback.textContent = "❗ Please enter your answer.";
//     feedback.style.color = 'orange';
//     return;
//   }

//   if (input === correct) {
//     feedback.textContent = "✅ Correct!";
//     feedback.style.color = 'lime';

//     // Add to knownWords if not present
//     if (!knownWords.some(w => w.word.toLowerCase() === allWords[currentIndex].word.toLowerCase())) {
//       const learnedWord = allWords[currentIndex];
//       knownWords.push(learnedWord);
//       await saveData('known_words.json', knownWords);

//       // Load freshWords fresh to avoid stale data
//       freshWords = await loadData('fresh_words.json');
//       if (!freshWords.some(w => w.word.toLowerCase() === learnedWord.word.toLowerCase())) {
//         freshWords.push(learnedWord);
//         await saveData('fresh_words.json', freshWords);
//       }
//     }

//     currentIndex++;
//     if (currentIndex < allWords.length) {
//       setTimeout(() => showWordCard(allWords[currentIndex]), 800);
//     } else {
//       container.innerHTML = `<p>🎉 No new words to learn!</p>`;
//     }
//   } else {
//     feedback.textContent = "❌ Incorrect. Try again.";
//     feedback.style.color = 'red';
//   }
// }

// async function saveCurrentWord() {
//   const currentWord = allWords[currentIndex];
//   savedWords = await loadData('saved_words.json');

//   if (savedWords.some(w => w.word.toLowerCase() === currentWord.word.toLowerCase())) {
//     alert('Word already saved.');
//     return;
//   }

//   savedWords.push(currentWord);
//   const saved = await saveData('saved_words.json', savedWords);
//   if (saved) alert(`Saved "${currentWord.word}" for focused practice.`);
//   else alert('Failed to save.');
// }

// async function startLearn() {
//   const words = await loadData('words.json');
//   const sentences = await loadData('sentences.json');
//   knownWords = await loadData('known_words.json');
//   freshWords = await loadData('fresh_words.json');

//   const sentenceMap = {};
//   for (const s of sentences) {
//     sentenceMap[s.word.toLowerCase()] = {
//       en: s.sentence_en,
//       id: s.sentence_id
//     };
//   }

//   allWords = words
//     .filter(w => !knownWords.some(k => k.word.toLowerCase() === w.word.toLowerCase()))
//     .map(w => ({
//       ...w,
//       example_en: sentenceMap[w.word.toLowerCase()]?.en || "",
//       example_id: sentenceMap[w.word.toLowerCase()]?.id || ""
//     }));

//   if (allWords.length === 0) {
//     document.getElementById('quiz-container').innerHTML = '<p>🎉 No new words to learn!</p>';
//     return;
//   }

//   currentIndex = 0;
//   showWordCard(allWords[currentIndex]);
// }

// startLearn();
let allWords = [];
let knownWords = [];
let savedWords = [];
let freshWords = [];
let currentIndex = 0;
let learnedToday = 0;
let dailyStats = { learned_today: 0 };

// Load JSON helper
async function loadData(file) {
  try {
    const res = await fetch(`data/${file}`);
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

// Save JSON helper
async function saveData(file, content) {
  try {
    const res = await fetch('http://127.0.0.1:5000/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ file, content }),
    });
    const data = await res.json();
    return data.status === 'success';
  } catch {
    return false;
  }
}

// Load daily stats
async function loadDailyStats() {
  const stats = await loadData('daily_stats.json');
  if (stats && typeof stats.learned_today === 'number') {
    dailyStats = stats;
    learnedToday = stats.learned_today;
  }
}

// Save daily stats
async function saveDailyStats() {
  dailyStats.learned_today = learnedToday;
  await saveData('daily_stats.json', dailyStats);
}

function showWordCard(wordObj) {
  const container = document.getElementById('quiz-container');
  container.innerHTML = `
    <div>
      <h2>Word: <strong>${wordObj.word}</strong></h2>
      <p><strong>Translation:</strong> ${wordObj.translation}</p>
      <p><em>Example (EN): ${wordObj.example_en || 'No example sentence available.'}</em></p>
      <p><em>Example (ID): ${wordObj.example_id || 'No translation available.'}</em></p>
      <input type="text" id="answer" placeholder="Enter translation..." autocomplete="off" autofocus />
      <br /><br />
      <div class="btn-group">
        <button type="button" id="checkBtn">✅ Check</button>
        <button type="button" id="saveBtn">⭐ Save</button>
      </div>
      <div id="feedback"></div>
      <p id="learnedCount" style="margin-top: 10px;">📘 Words learned today: ${learnedToday}</p>
      <button id="resetCountBtn">🔄 Reset Count</button>
    </div>
  `;

  document.getElementById('checkBtn').addEventListener('click', checkAnswer);
  document.getElementById('saveBtn').addEventListener('click', saveCurrentWord);

  document.getElementById('resetCountBtn').addEventListener('click', () => {
    (async () => {
      learnedToday = 0;
      await saveDailyStats();
      document.getElementById('learnedCount').textContent = `📘 Words learned today: ${learnedToday}`;
    })();
  });

  document.getElementById('answer').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      checkAnswer();
    }
  });

  document.getElementById('feedback').textContent = '';
  document.getElementById('answer').focus();
}

async function checkAnswer() {
  const inputEl = document.getElementById('answer');
  const input = inputEl.value.trim().toLowerCase();
  const correct = allWords[currentIndex].translation.toLowerCase();
  const feedback = document.getElementById('feedback');

  if (!input) {
    feedback.textContent = "❗ Please enter your answer.";
    feedback.style.color = 'orange';
    return;
  }

  if (input === correct) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = 'lime';

    // Increment today's learned counter and save
    learnedToday++;
    await saveDailyStats();
    const countEl = document.getElementById('learnedCount');
    if (countEl) countEl.textContent = `📘 Words learned today: ${learnedToday}`;

    // Add to knownWords if not present
    if (!knownWords.some(w => w.word.toLowerCase() === allWords[currentIndex].word.toLowerCase())) {
      const learnedWord = allWords[currentIndex];
      knownWords.push(learnedWord);
      await saveData('known_words.json', knownWords);

      // Load freshWords fresh to avoid stale data
      freshWords = await loadData('fresh_words.json');
      if (!freshWords.some(w => w.word.toLowerCase() === learnedWord.word.toLowerCase())) {
        freshWords.push(learnedWord);
        await saveData('fresh_words.json', freshWords);
      }
    }

    currentIndex++;
    if (currentIndex < allWords.length) {
      setTimeout(() => showWordCard(allWords[currentIndex]), 800);
    } else {
      document.getElementById('quiz-container').innerHTML = `<p>🎉 No new words to learn!</p>`;
    }
  } else {
    feedback.textContent = "❌ Incorrect. Try again.";
    feedback.style.color = 'red';
  }
}

async function saveCurrentWord() {
  const currentWord = allWords[currentIndex];
  savedWords = await loadData('saved_words.json');

  if (savedWords.some(w => w.word.toLowerCase() === currentWord.word.toLowerCase())) {
    alert('Word already saved.');
    return;
  }

  savedWords.push(currentWord);
  const saved = await saveData('saved_words.json', savedWords);
  if (saved) alert(`Saved "${currentWord.word}" for focused practice.`);
  else alert('Failed to save.');
}

async function startLearn() {
  await loadDailyStats();

  const words = await loadData('words.json');
  const sentences = await loadData('sentences.json');
  knownWords = await loadData('known_words.json');
  freshWords = await loadData('fresh_words.json');

  const sentenceMap = {};
  for (const s of sentences) {
    sentenceMap[s.word.toLowerCase()] = {
      en: s.sentence_en,
      id: s.sentence_id
    };
  }

  allWords = words
    .filter(w => !knownWords.some(k => k.word.toLowerCase() === w.word.toLowerCase()))
    .map(w => ({
      ...w,
      example_en: sentenceMap[w.word.toLowerCase()]?.en || "",
      example_id: sentenceMap[w.word.toLowerCase()]?.id || ""
    }));

  if (allWords.length === 0) {
    document.getElementById('quiz-container').innerHTML = '<p>🎉 No new words to learn!</p>';
    return;
  }

  currentIndex = 0;
  showWordCard(allWords[currentIndex]);
}

startLearn();
