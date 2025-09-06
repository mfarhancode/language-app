
// // // startPractice();
// // let allSentences = [];
// // let knownSentences = [];
// // let currentIndex = 0;

// // // Load JSON
// // async function loadData(file) {
// //   const res = await fetch(`data/${file}`);
// //   if (!res.ok) return [];
// //   return await res.json();
// // }

// // // Save JSON
// // async function saveData(file, content) {
// //   const res = await fetch('http://127.0.0.1:5000/save', {
// //     method: 'POST',
// //     headers: { 'Content-Type': 'application/json' },
// //     body: JSON.stringify({ file, content })
// //   });
// //   const data = await res.json();
// //   return data.status === 'success';
// // }

// // function showSentenceCard(sentenceObj) {
// //   const container = document.getElementById('sentence-container');
// //   container.innerHTML = `
// //     <div class="card">
// //       <p><strong>Translate:</strong></p>
// //       <h3>${sentenceObj.sentence_en}</h3>
// //       <input type="text" id="answer" placeholder="Type Bahasa Indonesia translation..." />
// //       <div>
// //         <button onclick="checkAnswer()">✅ Check</button>
// //         <button onclick="saveSentence()">⭐ Save</button>
// //         <button onclick="toggleTranslation()">👁️ Show Translation</button>
// //         <button onclick="location.href='index.html'">⬅ Home</button>
// //       </div>
// //       <div id="feedback"></div>
// //       <div id="translation" style="margin-top: 10px; display: none;"></div>
// //     </div>
// //   `;

// //   const input = document.getElementById('answer');
// //   input.focus();

// //   // ENTER key to check answer
// //   input.addEventListener('keydown', function (e) {
// //     if (e.key === 'Enter') {
// //       checkAnswer();
// //     }
// //   });
// //   // Clear previous feedback and translation
// // document.getElementById('feedback').textContent = '';
// // document.getElementById('translation').style.display = 'none';
// // }

// // async function checkAnswer() {
// //   const input = document.getElementById('answer').value.trim().toLowerCase();
// //   const correct = allSentences[currentIndex].sentence_id.toLowerCase();
// //   const feedback = document.getElementById('feedback');

// //   if (!input) {
// //     feedback.textContent = "Please enter your translation.";
// //     feedback.style.color = 'red';
// //     return;
// //   }

// //   if (input === correct) {
// //     feedback.textContent = "✅ Correct!";
// //     feedback.style.color = 'green';

// //     if (!knownSentences.some(s => s.sentence_en === allSentences[currentIndex].sentence_en)) {
// //       knownSentences.push(allSentences[currentIndex]);
// //       await saveData('known_sentences.json', knownSentences);
// //     }

// //     currentIndex++;
// //     if (currentIndex < allSentences.length) {
// //       setTimeout(() => showSentenceCard(allSentences[currentIndex]), 1000);
// //     } else {
// //       setTimeout(() => {
// //         document.getElementById('sentence-container').innerHTML = '<p>🎉 No new sentences to practice!</p>';
// //       }, 1000);
// //     }
// //   } else {
// //     feedback.textContent = "❌ Incorrect. Try again.";
// //     feedback.style.color = 'red';
// //   }
// // }

// // async function saveSentence() {
// //   const sentence = allSentences[currentIndex];
// //   const saved = await loadData('saved_sentences.json');
// //   if (!saved.some(s => s.sentence_en === sentence.sentence_en)) {
// //     saved.push(sentence);
// //     await saveData('saved_sentences.json', saved);
// //     document.getElementById('feedback').textContent = "⭐ Sentence saved!";
// //     document.getElementById('feedback').style.color = 'blue';
// //   }
// // }

// // function toggleTranslation() {
// //   const translationBox = document.getElementById('translation');
// //   if (translationBox.style.display === 'none') {
// //     translationBox.style.display = 'block';
// //     translationBox.innerHTML = `<strong>Translation:</strong> ${allSentences[currentIndex].sentence_id}`;
// //   } else {
// //     translationBox.style.display = 'none';
// //   }
// // }

// // async function startSentencePractice() {
// //   const all = await loadData('sentences.json');
// //   knownSentences = await loadData('known_sentences.json');

// //   allSentences = all.filter(s =>
// //     !knownSentences.some(k => k.sentence_en.toLowerCase() === s.sentence_en.toLowerCase())
// //   );

// //   if (allSentences.length === 0) {
// //     document.getElementById('sentence-container').innerHTML = '<p>🎉 No new sentences to practice!</p>';
// //     return;
// //   }

// //   currentIndex = 0;
// //   showSentenceCard(allSentences[currentIndex]);
// // }

// // startSentencePractice();

// let allSentences = [];
// let knownSentences = [];
// let currentIndex = 0;

// // Load JSON
// async function loadData(file) {
//   const res = await fetch(`data/${file}`);
//   if (!res.ok) return [];
//   return await res.json();
// }

// // Save JSON
// async function saveData(file, content) {
//   const res = await fetch('http://127.0.0.1:5000/save', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ file, content })
//   });
//   const data = await res.json();
//   return data.status === 'success';
// }

// function showSentenceCard(sentenceObj) {
//   const container = document.getElementById('sentence-container');
//   container.innerHTML = `
//     <div class="card">
//       <p><strong>Translate:</strong></p>
//       <h3>${sentenceObj.sentence_en}</h3>
//       <input
//         type="text"
//         id="answer"
//         placeholder="Type Bahasa Indonesia translation..."
//         autocomplete="off"
//         class="input-box"
//       />
//       <div class="btn-group">
//         <button class="btn" onclick="checkAnswer()">✅ Check</button>
//         <button class="btn" onclick="saveSentence()">⭐ Save</button>
//         <button class="btn" onclick="toggleTranslation()">👁️ Show Translation</button>
//       </div>
//       <div id="feedback" class="feedback"></div>
//       <div id="translation" class="translation-box" style="display: none;"></div>
//     </div>
//   `;

//   const input = document.getElementById('answer');
//   input.focus();

//   input.addEventListener('keydown', function (e) {
//     if (e.key === 'Enter') {
//       checkAnswer();
//     }
//   });

//   document.getElementById('feedback').textContent = '';
//   document.getElementById('translation').style.display = 'none';
// }

// async function checkAnswer() {
//   const input = document.getElementById('answer').value.trim().toLowerCase();
//   const correct = allSentences[currentIndex].sentence_id.toLowerCase();
//   const feedback = document.getElementById('feedback');

//   if (!input) {
//     feedback.textContent = "Please enter your translation.";
//     feedback.style.color = 'red';
//     return;
//   }

//   if (input === correct) {
//     feedback.textContent = "✅ Correct!";
//     feedback.style.color = 'green';

//     if (!knownSentences.some(s => s.sentence_en === allSentences[currentIndex].sentence_en)) {
//       knownSentences.push(allSentences[currentIndex]);
//       await saveData('known_sentences.json', knownSentences);
//     }

//     currentIndex++;
//     if (currentIndex < allSentences.length) {
//       setTimeout(() => showSentenceCard(allSentences[currentIndex]), 1000);
//     } else {
//       setTimeout(() => {
//         document.getElementById('sentence-container').innerHTML = '<p>🎉 No new sentences to practice!</p>';
//       }, 1000);
//     }
//   } else {
//     feedback.textContent = "❌ Incorrect. Try again.";
//     feedback.style.color = 'red';
//   }
// }

// async function saveSentence() {
//   const sentence = allSentences[currentIndex];
//   const saved = await loadData('saved_sentences.json');
//   if (!saved.some(s => s.sentence_en === sentence.sentence_en)) {
//     saved.push(sentence);
//     await saveData('saved_sentences.json', saved);
//     document.getElementById('feedback').textContent = "⭐ Sentence saved!";
//     document.getElementById('feedback').style.color = 'blue';
//   }
// }

// function toggleTranslation() {
//   const translationBox = document.getElementById('translation');
//   if (translationBox.style.display === 'none') {
//     translationBox.style.display = 'block';
//     translationBox.innerHTML = `<strong>Translation:</strong> ${allSentences[currentIndex].sentence_id}`;
//   } else {
//     translationBox.style.display = 'none';
//   }
// }

// async function startSentencePractice() {
//   const all = await loadData('sentences.json');
//   knownSentences = await loadData('known_sentences.json');

//   allSentences = all.filter(s =>
//     !knownSentences.some(k => k.sentence_en.toLowerCase() === s.sentence_en.toLowerCase())
//   );

//   if (allSentences.length === 0) {
//     document.getElementById('sentence-container').innerHTML = '<p>🎉 No new sentences to practice!</p>';
//     return;
//   }

//   currentIndex = 0;
//   showSentenceCard(allSentences[currentIndex]);
// }

// startSentencePractice();
