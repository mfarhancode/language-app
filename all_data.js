// // // // // let words = [];
// // // // // let sentences = [];
// // // // // let combinedData = [];

// // // // // let currentPage = 1;
// // // // // let itemsPerPage = 15;

// // // // // document.addEventListener('DOMContentLoaded', () => {
// // // // //   loadData();
// // // // // });

// // // // // async function loadData() {
// // // // //   try {
// // // // //     const [wordsRes, sentencesRes] = await Promise.all([
// // // // //       fetch('/data/words.json'),
// // // // //       fetch('/data/sentences.json')
// // // // //     ]);
// // // // //     console.log('wordsRes status:', wordsRes.status);
// // // // //     console.log('sentencesRes status:', sentencesRes.status);

// // // // //     const wordsData = await wordsRes.json();
// // // // //     const sentencesData = await sentencesRes.json();

// // // // //     console.log('wordsData:', wordsData);
// // // // //     console.log('sentencesData:', sentencesData);

// // // // //     words = wordsData;
// // // // //     sentences = sentencesData;

// // // // //     // rest same...
// // // // //     combinedData = words.map(wordItem => {
// // // // //       const sentItem = sentences.find(s => s.word === wordItem.word) || {};
// // // // //       return {
// // // // //         word: wordItem.word,
// // // // //         translation: wordItem.translation,
// // // // //         sentence: sentItem.sentence || '',
// // // // //         sentence_translation: sentItem.sentence_translation || ''
// // // // //       };
// // // // //     });

// // // // //     filterData();
// // // // //     render();

// // // // //   } catch (err) {
// // // // //     console.error(err);
// // // // //     alert('Failed to load data');
// // // // //   }
// // // // // }

// // // // // function render() {
// // // // //   const panel = document.getElementById('data-panel');
// // // // //   panel.innerHTML = '';

// // // // //   renderControls(panel);
// // // // //   renderTable(panel);
// // // // //   renderPagination(panel);
// // // // // }

// // // // // function renderControls(panel) {
// // // // //   const controlsHTML = `
// // // // //     <div class="data-controls">
// // // // //       <input type="text" id="search-box" placeholder="Search..." aria-label="Search data" />
// // // // //       <label for="entries-per-page" style="margin-left:1rem; font-weight:600;">Entries per page:</label>
// // // // //       <select id="entries-per-page" aria-label="Entries per page selector" style="margin-right:1rem; padding:0.3rem;">
// // // // //         <option value="5">5</option>
// // // // //         <option value="10">10</option>
// // // // //         <option value="15" selected>15</option>
// // // // //         <option value="25">25</option>
// // // // //         <option value="50">50</option>
// // // // //         <option value="all">All</option>
// // // // //       </select>
// // // // //       <button id="delete-btn" class="action-btn">🗑️ Delete Selected</button>
// // // // //       <button id="export-json-btn" class="action-btn export-btn">📤 Export Selected JSON</button>
// // // // //       <button id="export-csv-btn" class="action-btn export-btn">📄 Export Selected CSV</button>
// // // // //       <label><input type="checkbox" id="select-all" /> Select All</label>
// // // // //     </div>
// // // // //   `;
// // // // //   panel.insertAdjacentHTML('beforeend', controlsHTML);

// // // // //   // Event listeners
// // // // //   const searchBox = document.getElementById('search-box');
// // // // //   searchBox.addEventListener('input', onSearch);

// // // // //   const entriesSelect = document.getElementById('entries-per-page');
// // // // //   entriesSelect.addEventListener('change', onEntriesChange);

// // // // //   document.getElementById('select-all').addEventListener('change', onSelectAll);

// // // // //   document.getElementById('delete-btn').addEventListener('click', onDelete);

// // // // //   document.getElementById('export-json-btn').addEventListener('click', () => exportSelected('json'));
// // // // //   document.getElementById('export-csv-btn').addEventListener('click', () => exportSelected('csv'));
// // // // // }

// // // // // let filteredData = [];
// // // // // let searchQuery = '';

// // // // // function onSearch(e) {
// // // // //   searchQuery = e.target.value.trim().toLowerCase();
// // // // //   filterData();
// // // // //   currentPage = 1;
// // // // //   renderTable(document.getElementById('data-panel'));
// // // // //   renderPagination(document.getElementById('data-panel'));
// // // // // }

// // // // // function onEntriesChange(e) {
// // // // //   const val = e.target.value;
// // // // //   if (val === 'all') {
// // // // //     itemsPerPage = Infinity;
// // // // //   } else {
// // // // //     itemsPerPage = parseInt(val, 10);
// // // // //     if (isNaN(itemsPerPage) || itemsPerPage <= 0) itemsPerPage = 15;
// // // // //   }
// // // // //   currentPage = 1;
// // // // //   renderTable(document.getElementById('data-panel'));
// // // // //   renderPagination(document.getElementById('data-panel'));
// // // // // }

// // // // // function onSelectAll(e) {
// // // // //   const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]');
// // // // //   checkboxes.forEach(cb => cb.checked = e.target.checked);
// // // // // }

// // // // // function onDelete() {
// // // // //   const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
// // // // //   if (checkboxes.length === 0) return alert('No entries selected');
// // // // //   if (!confirm(`Delete ${checkboxes.length} selected entries? This will remove them from all related files.`)) return;

// // // // //   // Delete selected entries by word from words and sentences
// // // // //   const wordsToDelete = new Set();
// // // // //   checkboxes.forEach(cb => {
// // // // //     const index = parseInt(cb.dataset.index, 10);
// // // // //     wordsToDelete.add(filteredData[index].word);
// // // // //   });

// // // // //   // Remove from words
// // // // //   words = words.filter(w => !wordsToDelete.has(w.word));
// // // // //   // Remove from sentences
// // // // //   sentences = sentences.filter(s => !wordsToDelete.has(s.word));

// // // // //   saveAll();

// // // // //   filterData();
// // // // //   currentPage = 1;
// // // // //   renderTable(document.getElementById('data-panel'));
// // // // //   renderPagination(document.getElementById('data-panel'));
// // // // // }

// // // // // function exportSelected(format) {
// // // // //   const selected = getSelectedItems();
// // // // //   if (selected.length === 0) return alert('No entries selected');

// // // // //   let dataToExport = selected.map(item => ({
// // // // //     word: item.word,
// // // // //     translation: item.translation,
// // // // //     sentence: item.sentence,
// // // // //     sentence_translation: item.sentence_translation
// // // // //   }));

// // // // //   if (format === 'json') {
// // // // //     downloadFile(JSON.stringify(dataToExport, null, 2), `${format}_export.json`, 'application/json');
// // // // //   } else if (format === 'csv') {
// // // // //     const keys = ['word', 'translation', 'sentence', 'sentence_translation'];
// // // // //     const csv = [keys.join(',')].concat(dataToExport.map(row =>
// // // // //       keys.map(k => `"${(row[k]||'').toString().replace(/"/g, '""')}"`).join(',')
// // // // //     )).join('\n');
// // // // //     downloadFile(csv, `${format}_export.csv`, 'text/csv');
// // // // //   }
// // // // // }

// // // // // function getSelectedItems() {
// // // // //   const checkboxes = document.querySelectorAll('tbody input[type="checkbox"]:checked');
// // // // //   const selected = [];
// // // // //   checkboxes.forEach(cb => {
// // // // //     const index = parseInt(cb.dataset.index, 10);
// // // // //     selected.push(filteredData[index]);
// // // // //   });
// // // // //   return selected;
// // // // // }

// // // // // function downloadFile(data, filename, type) {
// // // // //   const blob = new Blob([data], { type });
// // // // //   const url = URL.createObjectURL(blob);
// // // // //   const a = document.createElement('a');
// // // // //   a.href = url;
// // // // //   a.download = filename;
// // // // //   a.click();
// // // // //   URL.revokeObjectURL(url);
// // // // // }

// // // // // function filterData() {
// // // // //   if (!searchQuery) {
// // // // //     filteredData = [...combinedData];
// // // // //   } else {
// // // // //     filteredData = combinedData.filter(item =>
// // // // //       item.word.toLowerCase().includes(searchQuery) ||
// // // // //       item.translation.toLowerCase().includes(searchQuery) ||
// // // // //       item.sentence.toLowerCase().includes(searchQuery) ||
// // // // //       item.sentence_translation.toLowerCase().includes(searchQuery)
// // // // //     );
// // // // //   }
// // // // // }

// // // // // // Initially, filteredData = combinedData
// // // // // filterData();

// // // // // function renderTable(panel) {
// // // // //   // Remove existing table if any
// // // // //   panel.querySelector('table')?.remove();
// // // // //   panel.querySelector('p.no-data')?.remove();

// // // // //   if (filteredData.length === 0) {
// // // // //     panel.insertAdjacentHTML('beforeend', `<p class="no-data">No data found.</p>`);
// // // // //     return;
// // // // //   }

// // // // //   const start = (currentPage - 1) * itemsPerPage;
// // // // //   const end = itemsPerPage === Infinity ? filteredData.length : start + itemsPerPage;
// // // // //   const pageData = filteredData.slice(start, end);

// // // // //   let tableHTML = `<table><thead><tr>
// // // // //     <th><input type="checkbox" id="header-select-all" /></th>
// // // // //     <th>Word</th>
// // // // //     <th>Translation</th>
// // // // //     <th>English Sentence</th>
// // // // //     <th>Sentence Translation</th>
// // // // //   </tr></thead><tbody>`;

// // // // //   pageData.forEach((item, i) => {
// // // // //     const actualIndex = start + i;
// // // // //     tableHTML += `<tr>
// // // // //       <td><input type="checkbox" data-index="${actualIndex}" /></td>
// // // // //       <td contenteditable="true" data-key="word" data-index="${actualIndex}">${escapeHtml(item.word)}</td>
// // // // //       <td contenteditable="true" data-key="translation" data-index="${actualIndex}">${escapeHtml(item.translation)}</td>
// // // // //       <td contenteditable="true" data-key="sentence" data-index="${actualIndex}">${escapeHtml(item.sentence)}</td>
// // // // //       <td contenteditable="true" data-key="sentence_translation" data-index="${actualIndex}">${escapeHtml(item.sentence_translation)}</td>
// // // // //     </tr>`;
// // // // //   });

// // // // //   tableHTML += '</tbody></table>';
// // // // //   panel.insertAdjacentHTML('beforeend', tableHTML);

// // // // //   // Select all checkbox event
// // // // //   document.getElementById('header-select-all').addEventListener('change', (e) => {
// // // // //     const checked = e.target.checked;
// // // // //     const checkboxes = panel.querySelectorAll('tbody input[type="checkbox"]');
// // // // //     checkboxes.forEach(cb => cb.checked = checked);
// // // // //   });

// // // // //   // Add blur event for editing
// // // // //   panel.querySelectorAll('td[contenteditable]').forEach(cell => {
// // // // //     cell.addEventListener('blur', (e) => {
// // // // //       const key = cell.dataset.key;
// // // // //       const index = parseInt(cell.dataset.index, 10);
// // // // //       const newValue = cell.textContent.trim();

// // // // //       // Update combinedData
// // // // //       filteredData[index][key] = newValue;

// // // // //       // Update in combinedData array as well (important)
// // // // //       const combinedIndex = combinedData.findIndex(d => d.word === filteredData[index].word);
// // // // //       if (combinedIndex !== -1) combinedData[combinedIndex][key] = newValue;

// // // // //       // Update in words or sentences depending on key
// // // // //       if (key === 'word' || key === 'translation') {
// // // // //         // Update words.json
// // // // //         const wordIndex = words.findIndex(w => w.word === filteredData[index].word);
// // // // //         if (wordIndex !== -1) {
// // // // //           words[wordIndex][key] = newValue;
// // // // //         }
// // // // //       } else if (key === 'sentence' || key === 'sentence_translation') {
// // // // //         // Update sentences.json
// // // // //         const sentenceIndex = sentences.findIndex(s => s.word === filteredData[index].word);
// // // // //         if (sentenceIndex !== -1) {
// // // // //           sentences[sentenceIndex][key] = newValue;
// // // // //         } else {
// // // // //           // If sentence not exist yet, add new entry for this word
// // // // //           sentences.push({
// // // // //             word: filteredData[index].word,
// // // // //             sentence: key === 'sentence' ? newValue : '',
// // // // //             sentence_translation: key === 'sentence_translation' ? newValue : ''
// // // // //           });
// // // // //         }
// // // // //       }

// // // // //       saveAll();
// // // // //     });
// // // // //   });
// // // // // }

// // // // // function renderPagination(panel) {
// // // // //   panel.querySelector('.pagination')?.remove();

// // // // //   if (itemsPerPage === Infinity || filteredData.length <= itemsPerPage) return;

// // // // //   const pageCount = Math.ceil(filteredData.length / itemsPerPage);
// // // // //   let paginationHTML = `<div class="pagination">`;
// // // // //   for (let i = 1; i <= pageCount; i++) {
// // // // //     paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
// // // // //   }
// // // // //   paginationHTML += `</div>`;

// // // // //   panel.insertAdjacentHTML('beforeend', paginationHTML);

// // // // //   panel.querySelectorAll('.page-btn').forEach(btn => {
// // // // //     btn.addEventListener('click', () => {
// // // // //       currentPage = parseInt(btn.dataset.page, 10);
// // // // //       renderTable(panel);
// // // // //       renderPagination(panel);
// // // // //     });
// // // // //   });
// // // // // }

// // // // // async function saveAll() {
// // // // //   // Save words.json
// // // // //   await saveFile('words.json', words);
// // // // //   // Save sentences.json
// // // // //   await saveFile('sentences.json', sentences);

// // // // //   // After saving, update combinedData and filteredData for consistency
// // // // //   combinedData = words.map(wordItem => {
// // // // //     const sentItem = sentences.find(s => s.word === wordItem.word) || {};
// // // // //     return {
// // // // //       word: wordItem.word,
// // // // //       translation: wordItem.translation,
// // // // //       sentence: sentItem.sentence || '',
// // // // //       sentence_translation: sentItem.sentence_translation || ''
// // // // //     };
// // // // //   });

// // // // //   filterData();
// // // // // }

// // // // // async function saveFile(filename, data) {
// // // // //   try {
// // // // //     const res = await fetch(`/save/${filename}`, {
// // // // //       method: 'POST',
// // // // //       headers: { 'Content-Type': 'application/json' },
// // // // //       body: JSON.stringify(data)
// // // // //     });
// // // // //     if (!res.ok) throw new Error(`Failed to save ${filename}`);
// // // // //   } catch (err) {
// // // // //     alert(`Failed to save ${filename}`);
// // // // //     console.error(err);
// // // // //   }
// // // // // }

// // // // // function escapeHtml(text) {
// // // // //   if (!text) return '';
// // // // //   return text
// // // // //     .replace(/&/g, "&amp;")
// // // // //     .replace(/</g, "&lt;")
// // // // //     .replace(/>/g, "&gt;")
// // // // //     .replace(/"/g, "&quot;")
// // // // //     .replace(/'/g, "&#039;");
// // // // // }


// // // // let words = [];
// // // // let sentences = [];
// // // // let combinedData = [];
// // // // let filteredData = [];
// // // // let currentPage = 1;
// // // // let itemsPerPage = 15;

// // // // document.addEventListener('DOMContentLoaded', () => {
// // // //   loadData();
// // // //   setupControls();
// // // // });

// // // // async function loadData() {
// // // //   try {
// // // //     const [wordsRes, sentencesRes] = await Promise.all([
// // // //       fetch('/data/words.json'),
// // // //       fetch('/data/sentences.json')
// // // //     ]);
// // // //     words = await wordsRes.json();
// // // //     sentences = await sentencesRes.json();

// // // //     combinedData = words.map(w => {
// // // //       const s = sentences.find(sent => sent.word === w.word) || {};
// // // //       return {
// // // //         word: w.word,
// // // //         translation: w.translation,
// // // //         sentence_en: s.sentence_en || '',
// // // //         sentence_id: s.sentence_id || ''
// // // //       };
// // // //     });

// // // //     filteredData = [...combinedData];
// // // //     render();
// // // //   } catch (err) {
// // // //     console.error(err);
// // // //     alert('Failed to load data');
// // // //   }
// // // // }

// // // // function setupControls() {
// // // //   const searchInput = document.getElementById('search-input');
// // // //   const entriesSelect = document.getElementById('entries-per-page');
// // // //   const selectAllCheckbox = document.getElementById('select-all');
// // // //   const deleteBtn = document.getElementById('delete-btn');
// // // //   const exportJsonBtn = document.getElementById('export-json-btn');
// // // //   const exportCsvBtn = document.getElementById('export-csv-btn');
// // // //   const tableContainer = document.getElementById('table-container');

// // // //   searchInput.addEventListener('input', () => {
// // // //     const q = searchInput.value.trim().toLowerCase();
// // // //     filteredData = combinedData.filter(item =>
// // // //       Object.values(item).some(val =>
// // // //         String(val).toLowerCase().includes(q)
// // // //       )
// // // //     );
// // // //     currentPage = 1;
// // // //     render();
// // // //   });

// // // //   entriesSelect.addEventListener('change', () => {
// // // //     const val = entriesSelect.value;
// // // //     itemsPerPage = val === 'all' ? Infinity : parseInt(val, 10);
// // // //     currentPage = 1;
// // // //     render();
// // // //   });

// // // //   selectAllCheckbox.addEventListener('change', () => {
// // // //     const checkboxes = tableContainer.querySelectorAll('tbody input[type="checkbox"]');
// // // //     checkboxes.forEach(cb => (cb.checked = selectAllCheckbox.checked));
// // // //   });

// // // //   deleteBtn.addEventListener('click', () => {
// // // //     const checkboxes = tableContainer.querySelectorAll('tbody input[type="checkbox"]:checked');
// // // //     if (checkboxes.length === 0) return alert('No entries selected');
// // // //     if (!confirm('Delete selected entries? This will remove words and related sentences from all files.')) return;

// // // //     const wordsToDelete = Array.from(checkboxes).map(cb => cb.dataset.word);
// // // //     // Remove from combinedData
// // // //     combinedData = combinedData.filter(item => !wordsToDelete.includes(item.word));
// // // //     filteredData = [...combinedData];

// // // //     // Also remove from words and sentences arrays
// // // //     words = words.filter(w => !wordsToDelete.includes(w.word));
// // // //     sentences = sentences.filter(s => !wordsToDelete.includes(s.word));

// // // //     // Save updated words and sentences back
// // // //     saveFile('words.json', words);
// // // //     saveFile('sentences.json', sentences);

// // // //     currentPage = 1;
// // // //     render();
// // // //   });

// // // //   exportJsonBtn.addEventListener('click', () => {
// // // //     const selectedItems = getSelectedItems();
// // // //     if (selectedItems.length === 0) return alert('No entries selected');
// // // //     downloadFile(selectedItems, 'json');
// // // //   });

// // // //   exportCsvBtn.addEventListener('click', () => {
// // // //     const selectedItems = getSelectedItems();
// // // //     if (selectedItems.length === 0) return alert('No entries selected');
// // // //     downloadFile(selectedItems, 'csv');
// // // //   });
// // // // }

// // // // function render() {
// // // //   const tableContainer = document.getElementById('table-container');
// // // //   tableContainer.innerHTML = '';

// // // //   if (filteredData.length === 0) {
// // // //     tableContainer.innerHTML = '<p>No data found.</p>';
// // // //     return;
// // // //   }

// // // //   const start = (currentPage - 1) * itemsPerPage;
// // // //   const end = itemsPerPage === Infinity ? filteredData.length : start + itemsPerPage;
// // // //   const pageData = filteredData.slice(start, end);

// // // //   // Build table
// // // //   let html = `<table><thead><tr>
// // // //     <th><input type="checkbox" id="select-all-top" /></th>
// // // //     <th>Word</th><th>Translation</th><th>English Sentence</th><th>Sentence Translation</th>
// // // //     </tr></thead><tbody>`;

// // // //   pageData.forEach((item, i) => {
// // // //     const index = start + i;
// // // //     html += `<tr>
// // // //       <td><input type="checkbox" data-word="${item.word}" /></td>
// // // //       <td contenteditable="true" data-key="word" data-index="${index}">${item.word}</td>
// // // //       <td contenteditable="true" data-key="translation" data-index="${index}">${item.translation}</td>
// // // //       <td contenteditable="true" data-key="sentence_en" data-index="${index}">${item.sentence_en}</td>
// // // //       <td contenteditable="true" data-key="sentence_id" data-index="${index}">${item.sentence_id}</td>
// // // //     </tr>`;
// // // //   });
// // // //   html += '</tbody></table>';

// // // //   tableContainer.innerHTML = html;

// // // //   // Add event listeners for edits
// // // //   tableContainer.querySelectorAll('td[contenteditable]').forEach(td => {
// // // //     td.addEventListener('blur', (e) => {
// // // //       const key = e.target.dataset.key;
// // // //       const idx = parseInt(e.target.dataset.index, 10);
// // // //       const newVal = e.target.textContent.trim();

// // // //       // Update combinedData
// // // //       filteredData[idx][key] = newVal;

// // // //       // Sync update to words or sentences arrays
// // // //       const word = filteredData[idx].word;
// // // //       if (key === 'word') {
// // // //         // Update word key itself in all arrays
// // // //         // Find index in words and sentences
// // // //         const wIndex = words.findIndex(w => w.word === word);
// // // //         if (wIndex !== -1) words[wIndex].word = newVal;

// // // //         const sIndex = sentences.findIndex(s => s.word === word);
// // // //         if (sIndex !== -1) sentences[sIndex].word = newVal;
// // // //       } else if (key === 'translation') {
// // // //         const wIndex = words.findIndex(w => w.word === word);
// // // //         if (wIndex !== -1) words[wIndex].translation = newVal;
// // // //       } else if (key === 'sentence_en') {
// // // //         const sIndex = sentences.findIndex(s => s.word === word);
// // // //         if (sIndex !== -1) sentences[sIndex].sentence_en = newVal;
// // // //       } else if (key === 'sentence_id') {
// // // //         const sIndex = sentences.findIndex(s => s.word === word);
// // // //         if (sIndex !== -1) sentences[sIndex].sentence_id = newVal;
// // // //       }

// // // //       // Save files after update
// // // //       saveFile('words.json', words);
// // // //       saveFile('sentences.json', sentences);
// // // //     });
// // // //   });

// // // //   // Select all top checkbox control
// // // //   const selectAllTop = document.getElementById('select-all-top');
// // // //   selectAllTop.addEventListener('change', (e) => {
// // // //     const checked = e.target.checked;
// // // //     tableContainer.querySelectorAll('tbody input[type="checkbox"]').forEach(cb => cb.checked = checked);
// // // //   });

// // // //   renderPagination();
// // // // }

// // // // function renderPagination() {
// // // //   const paginationContainer = document.getElementById('pagination');
// // // //   paginationContainer.innerHTML = '';

// // // //   if (itemsPerPage === Infinity || filteredData.length <= itemsPerPage) return;

// // // //   const pageCount = Math.ceil(filteredData.length / itemsPerPage);
// // // //   for (let i = 1; i <= pageCount; i++) {
// // // //     const btn = document.createElement('button');
// // // //     btn.textContent = i;
// // // //     btn.className = i === currentPage ? 'active' : '';
// // // //     btn.addEventListener('click', () => {
// // // //       currentPage = i;
// // // //       render();
// // // //     });
// // // //     paginationContainer.appendChild(btn);
// // // //   }
// // // // }

// // // // function getSelectedItems() {
// // // //   const tableContainer = document.getElementById('table-container');
// // // //   const checkedBoxes = tableContainer.querySelectorAll('tbody input[type="checkbox"]:checked');
// // // //   const wordsSelected = Array.from(checkedBoxes).map(cb => cb.dataset.word);
// // // //   return combinedData.filter(item => wordsSelected.includes(item.word));
// // // // }

// // // // async function saveFile(file, data) {
// // // //   try {
// // // //     await fetch(`/save/${file}`, {
// // // //       method: 'POST',
// // // //       headers: { 'Content-Type': 'application/json' },
// // // //       body: JSON.stringify(data),
// // // //     });
// // // //   } catch (err) {
// // // //     console.error('Save failed:', err);
// // // //     alert('Failed to save data.');
// // // //   }
// // // // }

// // // // function downloadFile(data, format) {
// // // //   const filename = `all_data_export.${format}`;
// // // //   let blob;
// // // //   if (format === 'json') {
// // // //     blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
// // // //   } else if (format === 'csv') {
// // // //     const keys = ['word', 'translation', 'sentence_en', 'sentence_id'];
// // // //     const csvRows = [keys.join(',')];
// // // //     for (const row of data) {
// // // //       csvRows.push(keys.map(k => `"${(row[k] || '').replace(/"/g, '""')}"`).join(','));
// // // //     }
// // // //     blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
// // // //   }
// // // //   const url = URL.createObjectURL(blob);
// // // //   const a = document.createElement('a');
// // // //   a.href = url;
// // // //   a.download = filename;
// // // //   a.click();
// // // //   URL.revokeObjectURL(url);
// // // // }


// // // const WORDS_FILE = 'words.json';
// // // const SENTENCES_FILE = 'sentences.json';

// // // let wordsData = [];
// // // let sentencesData = [];
// // // let combinedData = [];

// // // let filteredData = [];
// // // let currentPage = 1;
// // // let itemsPerPage = 15;

// // // const currentFile = 'all_data'; // fake name for UI; saving handled specially

// // // document.addEventListener('DOMContentLoaded', () => {
// // //   loadAllData();
// // // });

// // // async function loadAllData() {
// // //   try {
// // //     const [wordsRes, sentencesRes] = await Promise.all([
// // //       fetch(`/data/${WORDS_FILE}`),
// // //       fetch(`/data/${SENTENCES_FILE}`)
// // //     ]);
// // //     if (!wordsRes.ok) throw new Error(`Failed to load ${WORDS_FILE}`);
// // //     if (!sentencesRes.ok) throw new Error(`Failed to load ${SENTENCES_FILE}`);

// // //     wordsData = await wordsRes.json();
// // //     sentencesData = await sentencesRes.json();

// // //     // Merge sentences with words data by matching 'word'
// // //     combinedData = sentencesData.map(s => {
// // //       const w = wordsData.find(wordObj => wordObj.word === s.word) || { translation: '' };
// // //       return {
// // //         word: s.word,
// // //         translation: w.translation,
// // //         sentence_en: s.sentence_en,
// // //         sentence_id: s.sentence_id
// // //       };
// // //     });

// // //     filteredData = [...combinedData];

// // //     const panel = document.getElementById('data-panel');
// // //     panel.innerHTML = '';

// // //     renderControls(panel);
// // //     renderTable(panel);
// // //     renderPagination(panel);

// // //   } catch (err) {
// // //     console.error(err);
// // //     alert('Failed to load data files');
// // //   }
// // // }

// // // function renderControls(panel) {
// // //   const controlsHTML = `
// // //     <div class="data-controls">
// // //       <input type="text" class="data-search" placeholder="Search..." aria-label="Search data" />
// // //       <label for="entries-per-page" style="margin-left: 1rem; font-weight: 600;">Entries per page:</label>
// // //       <select id="entries-per-page" aria-label="Entries per page selector" style="margin-right: 1rem; padding: 0.3rem;">
// // //         <option value="5">5</option>
// // //         <option value="10">10</option>
// // //         <option value="15" selected>15</option>
// // //         <option value="25">25</option>
// // //         <option value="50">50</option>
// // //         <option value="all">All</option>
// // //       </select>
// // //       <button class="action-btn" id="delete-btn">🗑️ Delete Selected</button>
// // //       <button class="action-btn export-btn" id="export-json-btn">📤 Export Selected JSON</button>
// // //       <button class="action-btn export-btn" id="export-csv-btn">📄 Export Selected CSV</button>
// // //       <label><input type="checkbox" id="select-all" /> Select All</label>
// // //     </div>
// // //   `;
// // //   panel.insertAdjacentHTML('beforeend', controlsHTML);

// // //   // Search input
// // //   const searchBox = panel.querySelector('.data-search');
// // //   searchBox.addEventListener('input', e => {
// // //     const q = e.target.value.toLowerCase();
// // //     filteredData = combinedData.filter(item =>
// // //       Object.values(item).some(val => String(val).toLowerCase().includes(q))
// // //     );
// // //     currentPage = 1;
// // //     renderTable(panel);
// // //     renderPagination(panel);
// // //   });

// // //   // Entries per page
// // //   const entriesSelect = panel.querySelector('#entries-per-page');
// // //   entriesSelect.value = itemsPerPage === Infinity ? 'all' : String(itemsPerPage);
// // //   entriesSelect.addEventListener('change', e => {
// // //     const val = e.target.value;
// // //     if (val === 'all') {
// // //       itemsPerPage = Infinity;
// // //     } else {
// // //       itemsPerPage = parseInt(val, 10);
// // //       if (isNaN(itemsPerPage) || itemsPerPage <= 0) itemsPerPage = 15;
// // //     }
// // //     currentPage = 1;
// // //     renderTable(panel);
// // //     renderPagination(panel);
// // //   });

// // //   // Select all checkbox
// // //   panel.querySelector('#select-all').addEventListener('change', e => {
// // //     const checked = e.target.checked;
// // //     panel.querySelectorAll('tbody input[type="checkbox"]').forEach(cb => (cb.checked = checked));
// // //   });

// // //   // Delete selected button
// // //   panel.querySelector('#delete-btn').addEventListener('click', () => {
// // //     const checkboxes = panel.querySelectorAll('tbody input[type="checkbox"]:checked');
// // //     if (checkboxes.length === 0) return alert('No entries selected');
// // //     if (!confirm('Delete selected entries?')) return;

// // //     // Collect indexes in descending order so splicing doesn't affect indices of earlier elements
// // //     const indexes = Array.from(checkboxes)
// // //       .map(cb => parseInt(cb.dataset.index, 10))
// // //       .sort((a, b) => b - a);

// // //     indexes.forEach(i => {
// // //       const entry = filteredData[i];
// // //       if (!entry) return;

// // //       // Delete from combinedData
// // //       const combinedIndex = combinedData.findIndex(d => d.word === entry.word);
// // //       if (combinedIndex !== -1) combinedData.splice(combinedIndex, 1);

// // //       // Delete from wordsData and sentencesData
// // //       // Remove word from words.json (also affects related files)
// // //       const wordIndex = wordsData.findIndex(w => w.word === entry.word);
// // //       if (wordIndex !== -1) wordsData.splice(wordIndex, 1);

// // //       // Remove sentence from sentences.json
// // //       const sentenceIndex = sentencesData.findIndex(s => s.word === entry.word);
// // //       if (sentenceIndex !== -1) sentencesData.splice(sentenceIndex, 1);
// // //     });

// // //     filteredData = [...combinedData];
// // //     currentPage = 1;

// // //     // Save updated words.json and sentences.json
// // //     saveFile(WORDS_FILE, wordsData);
// // //     saveFile(SENTENCES_FILE, sentencesData);

// // //     renderTable(panel);
// // //     renderPagination(panel);
// // //   });

// // //   // Export selected JSON
// // //   panel.querySelector('#export-json-btn').addEventListener('click', () => {
// // //     const selected = getSelectedItems(panel);
// // //     if (selected.length === 0) return alert('No entries selected');
// // //     downloadFile(selected, 'json');
// // //   });

// // //   // Export selected CSV
// // //   panel.querySelector('#export-csv-btn').addEventListener('click', () => {
// // //     const selected = getSelectedItems(panel);
// // //     if (selected.length === 0) return alert('No entries selected');
// // //     downloadFile(selected, 'csv');
// // //   });
// // // }

// // // function renderTable(panel) {
// // //   const start = (currentPage - 1) * itemsPerPage;
// // //   const end = itemsPerPage === Infinity ? filteredData.length : start + itemsPerPage;
// // //   const pageData = filteredData.slice(start, end);

// // //   panel.querySelector('table')?.remove();
// // //   if (pageData.length === 0) {
// // //     panel.insertAdjacentHTML('beforeend', `<p>No data found.</p>`);
// // //     return;
// // //   }

// // //   // Table columns fixed for word + translation + sentences
// // //   const tableHTML = `
// // //     <table>
// // //       <thead>
// // //         <tr>
// // //           <th><input type="checkbox" id="header-select-all" /></th>
// // //           <th>Word</th>
// // //           <th>Translation</th>
// // //           <th>English Sentence</th>
// // //           <th>Sentence Translation</th>
// // //         </tr>
// // //       </thead>
// // //       <tbody>
// // //         ${pageData
// // //           .map((item, i) => {
// // //             const idx = start + i;
// // //             return `
// // //               <tr>
// // //                 <td><input type="checkbox" data-index="${idx}" /></td>
// // //                 <td contenteditable="true" data-key="word" data-index="${idx}">${escapeHtml(item.word)}</td>
// // //                 <td contenteditable="true" data-key="translation" data-index="${idx}">${escapeHtml(item.translation)}</td>
// // //                 <td contenteditable="true" data-key="sentence_en" data-index="${idx}">${escapeHtml(item.sentence_en)}</td>
// // //                 <td contenteditable="true" data-key="sentence_id" data-index="${idx}">${escapeHtml(item.sentence_id)}</td>
// // //               </tr>
// // //             `;
// // //           })
// // //           .join('')}
// // //       </tbody>
// // //     </table>
// // //   `;

// // //   panel.insertAdjacentHTML('beforeend', tableHTML);

// // //   // Header select all checkbox logic
// // //   const headerSelectAll = panel.querySelector('#header-select-all');
// // //   headerSelectAll.checked = pageData.every((_, i) => {
// // //     const cb = panel.querySelector(`tbody input[type="checkbox"][data-index="${start + i}"]`);
// // //     return cb?.checked;
// // //   });
// // //   headerSelectAll.addEventListener('change', e => {
// // //     const checked = e.target.checked;
// // //     panel.querySelectorAll('tbody input[type="checkbox"]').forEach(cb => (cb.checked = checked));
// // //   });

// // //   // Add contenteditable blur event listeners
// // //   panel.querySelectorAll('td[contenteditable]').forEach(cell => {
// // //     cell.addEventListener('blur', () => {
// // //       const key = cell.dataset.key;
// // //       const index = parseInt(cell.dataset.index, 10);
// // //       const newValue = cell.textContent.trim();

// // //       const oldEntry = combinedData[index];
// // //       if (!oldEntry) return;

// // //       // Update combinedData
// // //       combinedData[index][key] = newValue;

// // //       // Now propagate changes to wordsData or sentencesData
// // //       if (key === 'word') {
// // //         // If word changed, update in wordsData and sentencesData
// // //         const oldWord = oldEntry.word;
// // //         const newWord = newValue;

// // //         // Check if newWord already exists in wordsData - disallow duplicate words
// // //         if (wordsData.some(w => w.word === newWord && newWord !== oldWord)) {
// // //           alert('This word already exists. Reverting change.');
// // //           cell.textContent = oldWord;
// // //           combinedData[index][key] = oldWord;
// // //           return;
// // //         }

// // //         // Update wordsData
// // //         const wordIndex = wordsData.findIndex(w => w.word === oldWord);
// // //         if (wordIndex !== -1) wordsData[wordIndex].word = newWord;

// // //         // Update sentencesData
// // //         const sentenceIndex = sentencesData.findIndex(s => s.word === oldWord);
// // //         if (sentenceIndex !== -1) sentencesData[sentenceIndex].word = newWord;

// // //         // Update combinedData index key to new word (for reference)
// // //         combinedData[index].word = newWord;

// // //       } else if (key === 'translation') {
// // //         // Update translation in wordsData
// // //         const wordIndex = wordsData.findIndex(w => w.word === combinedData[index].word);
// // //         if (wordIndex !== -1) wordsData[wordIndex].translation = newValue;
// // //       } else if (key === 'sentence_en') {
// // //         // Update sentence_en in sentencesData
// // //         const sentenceIndex = sentencesData.findIndex(s => s.word === combinedData[index].word);
// // //         if (sentenceIndex !== -1) sentencesData[sentenceIndex].sentence_en = newValue;
// // //       } else if (key === 'sentence_id') {
// // //         // Update sentence_id in sentencesData
// // //         const sentenceIndex = sentencesData.findIndex(s => s.word === combinedData[index].word);
// // //         if (sentenceIndex !== -1) sentencesData[sentenceIndex].sentence_id = newValue;
// // //       }

// // //       // Save updates to both files
// // //       saveFile(WORDS_FILE, wordsData);
// // //       saveFile(SENTENCES_FILE, sentencesData);
// // //     });
// // //   });
// // // }

// // // function renderPagination(panel) {
// // //   panel.querySelector('.pagination')?.remove();

// // //   if (itemsPerPage === Infinity || filteredData.length <= itemsPerPage) return;

// // //   const pageCount = Math.ceil(filteredData.length / itemsPerPage);
// // //   let paginationHTML = `<div class="pagination">`;
// // //   for (let i = 1; i <= pageCount; i++) {
// // //     paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
// // //   }
// // //   paginationHTML += `</div>`;

// // //   panel.insertAdjacentHTML('beforeend', paginationHTML);

// // //   panel.querySelectorAll('.page-btn').forEach(btn => {
// // //     btn.addEventListener('click', () => {
// // //       currentPage = parseInt(btn.dataset.page, 10);
// // //       renderTable(panel);
// // //       renderPagination(panel);
// // //     });
// // //   });
// // // }

// // // function getSelectedItems(panel) {
// // //   const checkboxes = panel.querySelectorAll('tbody input[type="checkbox"]:checked');
// // //   return Array.from(checkboxes).map(cb => filteredData[parseInt(cb.dataset.index, 10)]);
// // // }

// // // async function saveFile(file, data) {
// // //   try {
// // //     const res = await fetch(`/save/${file}`, {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify(data)
// // //     });
// // //     if (!res.ok) throw new Error(`Failed to save ${file}`);
// // //   } catch (err) {
// // //     alert(`Failed to save ${file}`);
// // //     console.error(err);
// // //   }
// // // }

// // // function downloadFile(data, format) {
// // //   const filename = `all_data_export.${format}`;
// // //   let blob;
// // //   if (format === 'json') {
// // //     blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
// // //   } else if (format === 'csv') {
// // //     const keys = ['word', 'translation', 'sentence_en', 'sentence_id'];
// // //     const csv =
// // //       [keys.join(',')]
// // //         .concat(
// // //           data.map(row =>
// // //             keys.map(k => `"${(row[k] || '').replace(/"/g, '""')}"`).join(',')
// // //           )
// // //         )
// // //         .join('\n');
// // //     blob = new Blob([csv], { type: 'text/csv' });
// // //   }
// // //   const url = URL.createObjectURL(blob);
// // //   const a = document.createElement('a');
// // //   a.href = url;
// // //   a.download = filename;
// // //   a.click();
// // //   URL.revokeObjectURL(url);
// // // }

// // // function escapeHtml(text) {
// // //   if (!text) return '';
// // //   return text
// // //     .replace(/&/g, "&amp;")
// // //     .replace(/</g, "&lt;")
// // //     .replace(/>/g, "&gt;")
// // //     .replace(/"/g, "&quot;")
// // //     .replace(/'/g, "&#039;");
// // // }


// // let currentPage = 1;
// // let entriesPerPage = 10;
// // let currentData = [];

// // document.addEventListener("DOMContentLoaded", async () => {
// //   const entriesSelect = document.getElementById("entriesPerPage");
// //   entriesSelect.addEventListener("change", () => {
// //     entriesPerPage = parseInt(entriesSelect.value);
// //     currentPage = 1;
// //     renderTable();
// //     renderPagination();
// //   });

// //   await loadAndMergeData();
// // });

// // async function loadAndMergeData() {
// //   try {
// //     const sentencesRes = await fetch("data/sentences.json");
// //     console.log("sentencesRes status:", sentencesRes.status);
// //     const sentencesData = await sentencesRes.json();
// //     console.log("sentencesData:", sentencesData);

// //     currentData = sentencesData.map(item => ({
// //       word: item.word,
// //       translation: "", // Will be updated below
// //       sentence_en: item.sentence_en,
// //       sentence_id: item.sentence_id
// //     }));

// //     const wordsRes = await fetch("data/words.json");
// //     console.log("wordsRes status:", wordsRes.status);
// //     const wordsData = await wordsRes.json();
// //     console.log("wordsData:", wordsData);

// //     // Update translations from words.json
// //     currentData.forEach(item => {
// //       const match = wordsData.find(w => w.word === item.word);
// //       if (match) item.translation = match.translation;
// //     });

// //     renderTable();
// //     renderPagination();
// //   } catch (err) {
// //     alert("Failed to load data");
// //     console.error(err);
// //   }
// // }

// // function renderTable() {
// //   const tablePanel = document.getElementById("data-panel");
// //   const start = (currentPage - 1) * entriesPerPage;
// //   const end = start + entriesPerPage;
// //   const dataToShow = currentData.slice(start, end);

// //   if (dataToShow.length === 0) {
// //     tablePanel.innerHTML = "<p>No data found.</p>";
// //     return;
// //   }

// //   const table = document.createElement("table");
// //   table.innerHTML = `
// //     <thead>
// //       <tr>
// //         <th>Word</th>
// //         <th>Translation</th>
// //         <th>English Sentence</th>
// //         <th>Indonesian Sentence</th>
// //         <th>Action</th>
// //       </tr>
// //     </thead>
// //     <tbody>
// //       ${dataToShow.map((item, index) => `
// //         <tr data-index="${start + index}">
// //           <td class="word">${item.word}</td>
// //           <td class="translation">${item.translation}</td>
// //           <td class="sentence_en">${item.sentence_en}</td>
// //           <td class="sentence_id">${item.sentence_id}</td>
// //           <td><button class="edit-btn">✏️ Edit</button></td>
// //         </tr>
// //       `).join("")}
// //     </tbody>
// //   `;
// //   tablePanel.innerHTML = "";
// //   tablePanel.appendChild(table);

// //   document.querySelectorAll(".edit-btn").forEach(btn => {
// //     btn.addEventListener("click", handleEdit);
// //   });
// // }

// // function renderPagination() {
// //   const totalPages = Math.ceil(currentData.length / entriesPerPage);
// //   const paginationDiv = document.getElementById("pagination");
// //   paginationDiv.innerHTML = "";

// //   for (let i = 1; i <= totalPages; i++) {
// //     const btn = document.createElement("button");
// //     btn.textContent = i;
// //     if (i === currentPage) btn.classList.add("active");
// //     btn.addEventListener("click", () => {
// //       currentPage = i;
// //       renderTable();
// //       renderPagination();
// //     });
// //     paginationDiv.appendChild(btn);
// //   }
// // }

// // function handleEdit(event) {
// //   const row = event.target.closest("tr");
// //   const index = parseInt(row.dataset.index);
// //   const item = currentData[index];

// //   // Replace cells with input fields
// //   row.innerHTML = `
// //     <td><input type="text" value="${item.word}" class="edit-word"></td>
// //     <td><input type="text" value="${item.translation}" class="edit-translation"></td>
// //     <td><input type="text" value="${item.sentence_en}" class="edit-sentence-en"></td>
// //     <td><input type="text" value="${item.sentence_id}" class="edit-sentence-id"></td>
// //     <td><button class="save-btn">💾 Save</button></td>
// //   `;

// //   row.querySelector(".save-btn").addEventListener("click", () => handleSave(index, row));
// // }

// // function handleSave(index, row) {
// //   const word = row.querySelector(".edit-word").value.trim();
// //   const translation = row.querySelector(".edit-translation").value.trim();
// //   const sentence_en = row.querySelector(".edit-sentence-en").value.trim();
// //   const sentence_id = row.querySelector(".edit-sentence-id").value.trim();

// //   currentData[index] = { word, translation, sentence_en, sentence_id };

// //   // TODO: Send updated data to backend (Flask endpoint)
// //   // Example: send `/update_sentence` POST request

// //   renderTable(); // Re-render updated row
// // }

// let sentencesData = [];
// let wordsData = [];
// let currentPage = 1;
// let entriesPerPage = 10;
// let editingMode = false;

// async function loadData(file) {
//   const res = await fetch(`data/${file}`);
//   if (!res.ok) return [];
//   return await res.json();
// }

// async function saveData(file, content) {
//   await fetch(`data/${file}`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(content, null, 2)
//   });
// }

// function renderTable() {
//   const start = (currentPage - 1) * entriesPerPage;
//   const end = start + entriesPerPage;
//   const paginatedData = sentencesData.slice(start, end);

//   let html = `<table><thead><tr>
//     <th><input type="checkbox" id="select-all"></th>
//     <th>Word</th>
//     <th>Translation</th>
//     <th>Example (EN)</th>
//     <th>Example (ID)</th>
//   </tr></thead><tbody>`;

//   if (paginatedData.length === 0) {
//     html += `<tr><td colspan="5">No data found.</td></tr>`;
//   } else {
//     for (let item of paginatedData) {
//       html += `<tr data-word="${item.word}">
//         <td><input type="checkbox" class="row-checkbox"></td>
//         <td contenteditable="${editingMode}">${item.word}</td>
//         <td contenteditable="${editingMode}">${getTranslation(item.word)}</td>
//         <td contenteditable="${editingMode}">${item.sentence_en}</td>
//         <td contenteditable="${editingMode}">${item.sentence_id}</td>
//       </tr>`;
//     }
//   }

//   html += `</tbody></table>`;
//   document.getElementById("data-panel").innerHTML = html;

//   document.getElementById("select-all").addEventListener("change", e => {
//     document.querySelectorAll(".row-checkbox").forEach(cb => {
//       cb.checked = e.target.checked;
//     });
//   });

//   renderPagination();
// }

// function getTranslation(word) {
//   const match = wordsData.find(w => w.word === word);
//   return match ? match.translation : "";
// }

// function renderPagination() {
//   const pageCount = Math.ceil(sentencesData.length / entriesPerPage);
//   let html = "";

//   for (let i = 1; i <= pageCount; i++) {
//     html += `<button class="page-btn" ${i === currentPage ? "disabled" : ""}>${i}</button>`;
//   }

//   document.getElementById("pagination").innerHTML = html;

//   document.querySelectorAll(".page-btn").forEach(btn => {
//     btn.addEventListener("click", () => {
//       currentPage = parseInt(btn.textContent);
//       renderTable();
//     });
//   });
// }

// function getSelectedWords() {
//   const rows = document.querySelectorAll("tbody tr");
//   const selected = [];

//   rows.forEach(row => {
//     const checkbox = row.querySelector(".row-checkbox");
//     if (checkbox && checkbox.checked) {
//       const word = row.querySelector("td:nth-child(2)").textContent.trim();
//       selected.push(word);
//     }
//   });

//   return selected;
// }

// function exportSelectedJSON() {
//   const selected = getSelectedWords();
//   const data = sentencesData.filter(item => selected.includes(item.word));
//   const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
//   const a = document.createElement("a");
//   a.href = URL.createObjectURL(blob);
//   a.download = "selected_data.json";
//   a.click();
// }

// function exportSelectedCSV() {
//   const selected = getSelectedWords();
//   const rows = [["Word", "Translation", "English Sentence", "Indonesian Sentence"]];

//   for (let item of sentencesData) {
//     if (selected.includes(item.word)) {
//       rows.push([item.word, getTranslation(item.word), item.sentence_en, item.sentence_id]);
//     }
//   }

//   const csvContent = rows.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
//   const blob = new Blob([csvContent], { type: "text/csv" });
//   const a = document.createElement("a");
//   a.href = URL.createObjectURL(blob);
//   a.download = "selected_data.csv";
//   a.click();
// }

// async function deleteSelected() {
//   const selected = getSelectedWords();
//   if (selected.length === 0) return;

//   sentencesData = sentencesData.filter(item => !selected.includes(item.word));
//   wordsData = wordsData.filter(item => !selected.includes(item.word));

//   await saveData("sentences.json", sentencesData);
//   await saveData("words.json", wordsData);

//   renderTable();
// }

// async function saveEditedData() {
//   const rows = document.querySelectorAll("tbody tr");

//   for (let row of rows) {
//     const word = row.querySelector("td:nth-child(2)").textContent.trim();
//     const translation = row.querySelector("td:nth-child(3)").textContent.trim();
//     const sentence_en = row.querySelector("td:nth-child(4)").textContent.trim();
//     const sentence_id = row.querySelector("td:nth-child(5)").textContent.trim();

//     const sentenceItem = sentencesData.find(item => item.word === word);
//     if (sentenceItem) {
//       sentenceItem.sentence_en = sentence_en;
//       sentenceItem.sentence_id = sentence_id;
//     }

//     const wordItem = wordsData.find(item => item.word === word);
//     if (wordItem) {
//       wordItem.translation = translation;
//     } else {
//       wordsData.push({ word, translation });
//     }
//   }

//   await saveData("sentences.json", sentencesData);
//   await saveData("words.json", wordsData);
//   alert("Changes saved.");
// }

// document.getElementById("entriesPerPage").addEventListener("change", e => {
//   entriesPerPage = parseInt(e.target.value);
//   currentPage = 1;
//   renderTable();
// });

// document.getElementById("delete-selected").addEventListener("click", deleteSelected);
// document.getElementById("export-json").addEventListener("click", exportSelectedJSON);
// document.getElementById("export-csv").addEventListener("click", exportSelectedCSV);

// document.addEventListener("keydown", e => {
//   if (e.ctrlKey && e.key === "e") {
//     editingMode = !editingMode;
//     renderTable();
//     alert(editingMode ? "Editing enabled" : "Editing disabled");
//   }
// });

// window.addEventListener("DOMContentLoaded", async () => {
//   wordsData = await loadData("words.json");
//   sentencesData = await loadData("sentences.json");
//   renderTable();
// });

// document.getElementById("toggle-edit").addEventListener("click", () => {
//   editingMode = !editingMode;
//   renderTable();
//   document.getElementById("save-changes").style.display = editingMode ? "inline-block" : "none";
// });

// document.getElementById("save-changes").addEventListener("click", async () => {
//   await saveEditedData();
//   editingMode = false;
//   renderTable();
//   document.getElementById("save-changes").style.display = "none";
// });
