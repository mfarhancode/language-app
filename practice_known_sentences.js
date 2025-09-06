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

// function showSentenceCard(sentenceObj) {
//   const container = document.getElementById('practice-container');

//   container.innerHTML = `
//     <div class="card">
//       <p><strong>Translate this sentence:</strong></p>
//       <h3>${sentenceObj.sentence_en}</h3>
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
//         <button onclick="toggleTranslation()">👁️ Show Translation</button>
//         <button onclick="location.href='practice.html'">⬅ Back</button>
//       </div>

//       <div id="feedback" style="margin-top: 10px;"></div>
//       <div id="sentence-translation" style="display: none; margin-top: 10px;">
//         <strong>Translation:</strong> ${sentenceObj.sentence_id}
//       </div>
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
//   const correct = sentences[currentIndex].sentence_id.toLowerCase();
//   const feedback = document.getElementById('feedback');

//   if (!input) {
//     feedback.textContent = "Please enter your answer.";
//     feedback.style.color = 'red';
//     return;
//   }

//   if (input === correct) {
//     feedback.textContent = "✅ Correct!";
//     feedback.style.color = 'green';
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
//   sentences = await loadData('sentences.json');
//   if (!sentences.length) {
//     document.getElementById('practice-container').innerHTML = "<p>No known sentences to practice.</p>";
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ file, content }),
  });
  return await res.json();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showSentenceCard(sentenceObj) {
  const container = document.getElementById("practice-container");
  container.innerHTML = `
    <p><strong>Translate this sentence:</strong></p>
    <h3>${sentenceObj.sentence_en}</h3>
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
    <div class="btn-group">
      <button onclick="checkAnswer()">✅ Check</button>
      <button onclick="toggleTranslation()">👁️ Show</button>
      <button onclick="saveSentence()">💾 Save</button>
    </div>
    <div id="feedback"></div>
    <div id="sentence-translation" style="display: none; margin-top: 10px;">
      <strong>Translation:</strong> ${sentenceObj.sentence_id}
    </div>
  `;

  const input = document.getElementById("answer");
  input.focus();
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") checkAnswer();
  });
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
    feedback.style.color = "green";
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

function nextSentence() {
  currentIndex++;
  if (currentIndex < sentences.length) {
    showSentenceCard(sentences[currentIndex]);
  } else {
    document.getElementById("practice-container").innerHTML = "<p>🎉 Practice Complete!</p>";
  }
}

async function saveSentence() {
  const sentence = sentences[currentIndex];
  let saved = await loadData("saved_sentences.json");

  const exists = saved.some(s => s.sentence_en === sentence.sentence_en);
  if (!exists) {
    saved.push(sentence);
    await saveData("saved_sentences.json", saved);
    document.getElementById("feedback").textContent = "💾 Sentence saved!";
    document.getElementById("feedback").style.color = "lightblue";
  } else {
    document.getElementById("feedback").textContent = "⚠️ Already saved.";
    document.getElementById("feedback").style.color = "orange";
  }
}

async function startPractice() {
  sentences = await loadData("sentences.json");
  if (!sentences.length) {
    document.getElementById("practice-container").innerHTML = "<p>No known sentences to practice.</p>";
    return;
  }

  shuffleArray(sentences);
  currentIndex = 0;
  showSentenceCard(sentences[currentIndex]);
}

startPractice();
