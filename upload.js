// // ... previous unchanged code ...
// function parseCSV(text) {
//   const lines = text.trim().split('\n');
//   const words = [];
//   const sentences = [];
//   for (const line of lines) {
//     const [word, translation, sentence_en, sentence_id] = line.split(',').map(s => s.trim());
//     if (word && translation) {
//       words.push({ word, translation });
//       if (sentence_en && sentence_id) {
//         sentences.push({ word, sentence_en, sentence_id });
//       }
//     }
//   }
//   return { words, sentences };
// }

// function parsePasted(text) {
//   const lines = text.trim().split('\n');
//   const words = [];
//   const sentences = [];
//   for (const line of lines) {
//     const [word, translation, sentence_en, sentence_id] = line.split(':').map(s => s.trim());
//     if (word && translation) {
//       words.push({ word, translation });
//       if (sentence_en && sentence_id) {
//         sentences.push({ word, sentence_en, sentence_id });
//       }
//     }
//   }
//   return { words, sentences };
// }

// // Load helper (file name can be words.json or sentences.json)
// async function loadData(file) {
//   const response = await fetch(`data/${file}`);
//   if (!response.ok) return [];
//   return await response.json();
// }

// // Save helper
// async function saveData(file, content) {
//   const res = await fetch('http://127.0.0.1:5000/save', {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify({ file, content }),
//   });
//   const data = await res.json();
//   return data.status === 'success';
// }

// // Handle file upload
// uploadBtn.addEventListener('click', () => {
//   const file = fileInput.files[0];
//   if (!file) {
//     showMessage('Please select a file.', true);
//     return;
//   }

//   const reader = new FileReader();
//   reader.onload = async (e) => {
//     let parsed;
//     if (file.name.endsWith('.csv')) {
//       parsed = parseCSV(e.target.result);
//     } else {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });
//       const sheet = workbook.Sheets[workbook.SheetNames[0]];
//       const rows = XLSX.utils.sheet_to_json(sheet, {
//         header: ['word', 'translation', 'sentence_en', 'sentence_id'],
//         defval: ""
//       });

//       const words = [], sentences = [];
//       for (const row of rows) {
//         if (row.word && row.translation) {
//           words.push({ word: row.word, translation: row.translation });
//           if (row.sentence_en && row.sentence_id) {
//             sentences.push({ word: row.word, sentence_en: row.sentence_en, sentence_id: row.sentence_id });
//           }
//         }
//       }
//       parsed = { words, sentences };
//     }

//     const existingWords = await loadData('words.json');
//     const existingSentences = await loadData('sentences.json');

//     const newWords = [...existingWords];
//     for (const w of parsed.words) {
//       if (!existingWords.some(e => e.word.toLowerCase() === w.word.toLowerCase())) {
//         newWords.push(w);
//       }
//     }

//     const newSentences = [...existingSentences];
//     for (const s of parsed.sentences) {
//       if (!existingSentences.some(e =>
//         e.word.toLowerCase() === s.word.toLowerCase() &&
//         e.sentence_en.toLowerCase() === s.sentence_en.toLowerCase())) {
//         newSentences.push(s);
//       }
//     }

//     const savedWords = await saveData('words.json', newWords);
//     const savedSentences = await saveData('sentences.json', newSentences);

//     if (savedWords && savedSentences) {
//       showMessage(`Added ${parsed.words.length} words and ${parsed.sentences.length} sentences.`);
//       fileInput.value = '';
//     } else {
//       showMessage('Failed to save data.', true);
//     }
//   };

//   if (file.name.endsWith('.csv')) {
//     reader.readAsText(file);
//   } else {
//     reader.readAsArrayBuffer(file);
//   }
// });

// // Handle paste button
// pasteBtn.addEventListener('click', async () => {
//   const text = pasteInput.value;
//   if (!text.trim()) {
//     showMessage('Please paste some words.', true);
//     return;
//   }

//   const parsed = parsePasted(text);
//   if (parsed.words.length === 0) {
//     showMessage('No valid entries.', true);
//     return;
//   }

//   const existingWords = await loadData('words.json');
//   const existingSentences = await loadData('sentences.json');

//   const newWords = [...existingWords];
//   for (const w of parsed.words) {
//     if (!existingWords.some(e => e.word.toLowerCase() === w.word.toLowerCase())) {
//       newWords.push(w);
//     }
//   }

//   const newSentences = [...existingSentences];
//   for (const s of parsed.sentences) {
//     if (!existingSentences.some(e =>
//       e.word.toLowerCase() === s.word.toLowerCase() &&
//       e.sentence_en.toLowerCase() === s.sentence_en.toLowerCase())) {
//       newSentences.push(s);
//     }
//   }

//   const savedWords = await saveData('words.json', newWords);
//   const savedSentences = await saveData('sentences.json', newSentences);

//   if (savedWords && savedSentences) {
//     showMessage(`Added ${parsed.words.length} words and ${parsed.sentences.length} sentences.`);
//     pasteInput.value = '';
//   } else {
//     showMessage('Failed to save data.', true);
//   }
// });

const fileInput = document.getElementById('fileInput');
const uploadBtn = document.getElementById('uploadBtn');
const pasteInput = document.getElementById('pasteInput');
const pasteBtn = document.getElementById('pasteBtn');
const messageDiv = document.getElementById('message');

function showMessage(msg, isError = false) {
  messageDiv.textContent = msg;
  messageDiv.style.color = isError ? 'tomato' : 'lightgreen';
}

// Parse CSV text, normalize word and sentences to lowercase
function parseCSV(text) {
  const lines = text.trim().split('\n');
  const words = [];
  const sentences = [];
  for (const line of lines) {
    const [wordRaw, translationRaw, sentence_enRaw, sentence_idRaw] = line.split(',').map(s => s.trim());
    if (wordRaw && translationRaw) {
      const word = wordRaw.toLowerCase();
      const translation = translationRaw;
      words.push({ word, translation });
      if (sentence_enRaw && sentence_idRaw) {
        sentences.push({ 
          word, 
          sentence_en: sentence_enRaw.toLowerCase(), 
          sentence_id: sentence_idRaw.toLowerCase() 
        });
      }
    }
  }
  return { words, sentences };
}

// Parse pasted text (colon-separated), normalize word and sentences to lowercase
function parsePasted(text) {
  const lines = text.trim().split('\n');
  const words = [];
  const sentences = [];
  for (const line of lines) {
    const [wordRaw, translationRaw, sentence_enRaw, sentence_idRaw] = line.split(':').map(s => s.trim());
    if (wordRaw && translationRaw) {
      const word = wordRaw.toLowerCase();
      const translation = translationRaw;
      words.push({ word, translation });
      if (sentence_enRaw && sentence_idRaw) {
        sentences.push({ 
          word, 
          sentence_en: sentence_enRaw.toLowerCase(), 
          sentence_id: sentence_idRaw.toLowerCase() 
        });
      }
    }
  }
  return { words, sentences };
}

// Load JSON helper (file name can be words.json or sentences.json)
async function loadData(file) {
  try {
    const response = await fetch(`data/${file}`);
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
}

// Save JSON helper (assumes your backend endpoint)
async function saveData(file, content) {
  try {
    const res = await fetch('http://127.0.0.1:5000/save', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ file, content }),
    });
    const data = await res.json();
    return data.status === 'success';
  } catch {
    return false;
  }
}

// Handle file upload
uploadBtn.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (!file) {
    showMessage('Please select a file to upload.', true);
    return;
  }

  const reader = new FileReader();
  reader.onload = async (e) => {
    let parsed;
    if (file.name.endsWith('.csv')) {
      parsed = parseCSV(e.target.result);
    } else {
      // For Excel files
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, {
        header: ['word', 'translation', 'sentence_en', 'sentence_id'],
        defval: ""
      });

      const words = [], sentences = [];
      for (const row of rows) {
        if (row.word && row.translation) {
          words.push({ word: row.word.toLowerCase(), translation: row.translation });
          if (row.sentence_en && row.sentence_id) {
            sentences.push({
              word: row.word.toLowerCase(),
              sentence_en: row.sentence_en.toLowerCase(),
              sentence_id: row.sentence_id.toLowerCase()
            });
          }
        }
      }
      parsed = { words, sentences };
    }

    const existingWords = await loadData('words.json');
    const existingSentences = await loadData('sentences.json');

    // Merge new words without duplicates (case insensitive)
    const newWords = [...existingWords];
    for (const w of parsed.words) {
      if (!existingWords.some(e => e.word.toLowerCase() === w.word)) {
        newWords.push(w);
      }
    }

    // Merge new sentences without duplicates (case insensitive)
    const newSentences = [...existingSentences];
    for (const s of parsed.sentences) {
      if (!existingSentences.some(e =>
        e.word.toLowerCase() === s.word &&
        e.sentence_en.toLowerCase() === s.sentence_en
      )) {
        newSentences.push(s);
      }
    }

    const savedWords = await saveData('words.json', newWords);
    const savedSentences = await saveData('sentences.json', newSentences);

    if (savedWords && savedSentences) {
      showMessage(`Successfully added ${parsed.words.length} words and ${parsed.sentences.length} sentences.`);
      fileInput.value = '';
    } else {
      showMessage('Failed to save data. Please try again.', true);
    }
  };

  if (file.name.endsWith('.csv')) {
    reader.readAsText(file);
  } else {
    reader.readAsArrayBuffer(file);
  }
});

// Handle paste button
pasteBtn.addEventListener('click', async () => {
  const text = pasteInput.value;
  if (!text.trim()) {
    showMessage('Please paste some words.', true);
    return;
  }

  const parsed = parsePasted(text);
  if (parsed.words.length === 0) {
    showMessage('No valid entries found.', true);
    return;
  }

  const existingWords = await loadData('words.json');
  const existingSentences = await loadData('sentences.json');

  // Merge new words
  const newWords = [...existingWords];
  for (const w of parsed.words) {
    if (!existingWords.some(e => e.word.toLowerCase() === w.word)) {
      newWords.push(w);
    }
  }

  // Merge new sentences
  const newSentences = [...existingSentences];
  for (const s of parsed.sentences) {
    if (!existingSentences.some(e =>
      e.word.toLowerCase() === s.word &&
      e.sentence_en.toLowerCase() === s.sentence_en
    )) {
      newSentences.push(s);
    }
  }

  const savedWords = await saveData('words.json', newWords);
  const savedSentences = await saveData('sentences.json', newSentences);

  if (savedWords && savedSentences) {
    showMessage(`Successfully added ${parsed.words.length} words and ${parsed.sentences.length} sentences.`);
    pasteInput.value = '';
  } else {
    showMessage('Failed to save data. Please try again.', true);
  }
});
