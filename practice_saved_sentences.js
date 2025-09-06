// // let sentences = [];
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

// // function showSentenceCard(sentenceObj) {
// //   const container = document.getElementById('practice-container');

// //   container.innerHTML = `
// //     <div class="card">
// //       <p><strong>Translate this sentence:</strong></p>
// //       <h3>${sentenceObj.sentence_en}</h3>
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
// //         <button onclick="toggleTranslation()">👁️ Show Translation</button>
// //         <button onclick="location.href='practice.html'">⬅ Back</button>
// //       </div>

// //       <div id="feedback" style="margin-top: 10px;"></div>
// //       <div id="sentence-translation" style="display: none; margin-top: 10px;">
// //         <strong>Translation:</strong> ${sentenceObj.sentence_id}
// //       </div>
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
// //   const correct = sentences[currentIndex].sentence_id.toLowerCase();
// //   const feedback = document.getElementById('feedback');

// //   if (!input) {
// //     feedback.textContent = "Please enter your answer.";
// //     feedback.style.color = 'red';
// //     return;
// //   }

// //   if (input === correct) {
// //     feedback.textContent = "✅ Correct!";
// //     feedback.style.color = 'green';
// //     setTimeout(nextSentence, 1000);
// //   } else {
// //     feedback.textContent = "❌ Incorrect. Try again.";
// //     feedback.style.color = 'red';
// //   }
// // }

// // function toggleTranslation() {
// //   const box = document.getElementById('sentence-translation');
// //   box.style.display = box.style.display === 'none' ? 'block' : 'none';
// // }

// // function nextSentence() {
// //   currentIndex++;
// //   if (currentIndex < sentences.length) {
// //     showSentenceCard(sentences[currentIndex]);
// //   } else {
// //     document.getElementById('practice-container').innerHTML = "<p>🎉 Practice Complete!</p>";
// //   }
// // }

// // async function startPractice() {
// //   sentences = await loadData('saved_sentences.json');
// //   if (!sentences.length) {
// //     document.getElementById('practice-container').innerHTML = "<p>No saved sentences to practice.</p>";
// //     return;
// //   }

// //   shuffleArray(sentences);
// //   currentIndex = 0;
// //   showSentenceCard(sentences[currentIndex]);
// // }

// // startPractice();

// let sentences = [];
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

// function capitalizeFirstChar(str) {
//   if (!str) return '';
//   // Ensure ends with single period (.)
//   let cleanStr = str.trim();
//   if (!cleanStr.endsWith('.')) cleanStr += '.';
//   return cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
// }

// function showSentenceCard(sentenceObj) {
//   const container = document.getElementById('practice-container');

//   container.innerHTML = `
//     <div>
//       <p><strong>Translate this sentence:</strong></p>
//       <h3>${capitalizeFirstChar(sentenceObj.sentence_en)}</h3>
//       <input
//         type="text"
//         id="answer"
//         placeholder="Type Bahasa translation..."
//         autocomplete="off"
//         autocorrect="off"
//         autocapitalize="off"
//         spellcheck="false"
//         autofocus
//       />
//       <div class="btn-group">
//         <button id="checkBtn" type="button">✅ Check</button>
//         <button id="toggleBtn" type="button">👁️ Show Translation</button>
//       </div>

//       <div id="feedback"></div>
//       <div id="sentence-translation"><strong>Translation:</strong> ${capitalizeFirstChar(sentenceObj.sentence_id)}</div>
//     </div>
//   `;

//   document.getElementById('checkBtn').addEventListener('click', checkAnswer);
//   document.getElementById('toggleBtn').addEventListener('click', toggleTranslation);

//   const input = document.getElementById('answer');
//   input.setAttribute("name", "input_" + Math.random().toString(36).substring(2));
//   input.focus();

//   input.addEventListener('keydown', function (e) {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       checkAnswer();
//     }
//   });

//   // Initially hide translation
//   document.getElementById('sentence-translation').style.display = 'none';
// }

// function checkAnswer() {
//   const input = document.getElementById('answer').value.trim().toLowerCase();
//   const correct = sentences[currentIndex].sentence_id.toLowerCase();
//   const feedback = document.getElementById('feedback');

//   if (!input) {
//     feedback.textContent = "Please enter your answer.";
//     feedback.style.color = 'red';
//     return;
//   }

//   if (input === correct) {
//     feedback.textContent = "✅ Correct!";
//     feedback.style.color = 'lime';
//     setTimeout(nextSentence, 1000);
//   } else {
//     feedback.textContent = "❌ Incorrect. Try again.";
//     feedback.style.color = 'red';
//   }
// }

// function toggleTranslation() {
//   const box = document.getElementById('sentence-translation');
//   box.style.display = box.style.display === 'none' ? 'block' : 'none';
// }

// function nextSentence() {
//   currentIndex++;
//   if (currentIndex < sentences.length) {
//     showSentenceCard(sentences[currentIndex]);
//   } else {
//     document.getElementById('practice-container').innerHTML = "<p>🎉 Practice Complete!</p>";
//   }
// }

// async function startPractice() {
//   sentences = await loadData('saved_sentences.json');
//   if (!sentences.length) {
//     document.getElementById('practice-container').innerHTML = "<p>No saved sentences to practice.</p>";
//     return;
//   }

//   shuffleArray(sentences);
//   currentIndex = 0;
//   showSentenceCard(sentences[currentIndex]);
// }

// startPractice();


let sentences = [];
let currentIndex = 0;

async function loadData(file) {
  const res = await fetch(`data/${file}`);
  if (!res.ok) return [];
  return await res.json();
}

async function saveData(file, content) {
  const res = await fetch("http://127.0.0.1:5000/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ file, content }),
  });

  if (!res.ok) {
    console.error("Failed to save data to", file);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function capitalizeFirstChar(str) {
  if (!str) return "";
  let cleanStr = str.trim();
  if (!cleanStr.endsWith(".")) cleanStr += ".";
  return cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
}

function showSentenceCard(sentenceObj) {
  const container = document.getElementById("practice-container");

  container.innerHTML = `
    <div>
      <p><strong>Translate this sentence:</strong></p>
      <h3>${capitalizeFirstChar(sentenceObj.sentence_en)}</h3>
      <input
        type="text"
        id="answer"
        placeholder="Type Bahasa translation..."
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        autofocus
      />
      <div class="btn-group">
        <button id="checkBtn" type="button">✅ Check</button>
        <button id="toggleBtn" type="button">👁️ Show Translation</button>
        <button id="deleteBtn" type="button" style="background:#e53935;">🗑️ Delete Sentence</button>
      </div>

      <div id="feedback"></div>
      <div id="sentence-translation"><strong>Translation:</strong> ${capitalizeFirstChar(sentenceObj.sentence_id)}</div>
    </div>
  `;

  document.getElementById("checkBtn").addEventListener("click", checkAnswer);
  document.getElementById("toggleBtn").addEventListener("click", toggleTranslation);
  document.getElementById("deleteBtn").addEventListener("click", deleteSentence);

  const input = document.getElementById("answer");
  input.focus();
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      checkAnswer();
    }
  });

  document.getElementById("sentence-translation").style.display = "none";
}

function checkAnswer() {
  const input = document.getElementById("answer").value.trim().toLowerCase();
  const correct = sentences[currentIndex].sentence_id.toLowerCase();
  const feedback = document.getElementById("feedback");

  if (!input) {
    feedback.textContent = "Please enter your answer.";
    feedback.style.color = "red";
    return;
  }

  if (input === correct) {
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "lime";
    setTimeout(nextSentence, 1000);
  } else {
    feedback.textContent = "❌ Incorrect. Try again.";
    feedback.style.color = "red";
  }
}

function toggleTranslation() {
  const box = document.getElementById("sentence-translation");
  box.style.display = box.style.display === "none" ? "block" : "none";
}

async function deleteSentence() {
  const sentenceToDelete = sentences[currentIndex];
  const updatedSentences = sentences.filter((s, idx) => idx !== currentIndex);
  await saveData("saved_sentences.json", updatedSentences);
  sentences = updatedSentences;
  if (currentIndex >= sentences.length) {
    document.getElementById("practice-container").innerHTML = "<p>🎉 Practice Complete!</p>";
  } else {
    showSentenceCard(sentences[currentIndex]);
  }
}

function nextSentence() {
  currentIndex++;
  if (currentIndex < sentences.length) {
    showSentenceCard(sentences[currentIndex]);
  } else {
    document.getElementById("practice-container").innerHTML = "<p>🎉 Practice Complete!</p>";
  }
}

async function startPractice() {
  sentences = await loadData("saved_sentences.json");
  if (!sentences.length) {
    document.getElementById("practice-container").innerHTML = "<p>No saved sentences to practice.</p>";
    return;
  }

  shuffleArray(sentences);
  currentIndex = 0;
  showSentenceCard(sentences[currentIndex]);
}

startPractice();
