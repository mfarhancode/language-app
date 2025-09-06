// // data.js - Dynamic management of JSON data files for language app

// const DATA_FILES = [
//   'words.json',
//   'known_words.json',
//   'saved_words.json',
//   'weak_words.json',
//   'sentences.json',
//   'known_sentences.json',
//   'saved_sentences.json',
//   'stats.json',
// ];

// const TAB_ID_MAP = {
//   'words.json': 'tab-words',
//   'known_words.json': 'tab-known_words',
//   'saved_words.json': 'tab-saved_words',
//   'weak_words.json': 'tab-weak_words',
//   'sentences.json': 'tab-sentences',
//   'known_sentences.json': 'tab-known_sentences',
//   'saved_sentences.json': 'tab-saved_sentences',
//   'stats.json': 'tab-stats',
// };

// const ITEMS_PER_PAGE = 15;

// let currentFile = 'words.json';
// let currentData = [];
// let filteredData = [];
// let currentPage = 1;

// document.addEventListener('DOMContentLoaded', () => {
//   setupTabs();
//   loadAndRender(currentFile);
// });

// // Setup tab button click handlers & keyboard nav
// function setupTabs() {
//   const tabButtons = document.querySelectorAll('nav.tabs button');
//   tabButtons.forEach(button => {
//     button.addEventListener('click', () => {
//       if (button.getAttribute('aria-selected') === 'true') return;
//       switchTab(button.id);
//     });
//     button.addEventListener('keydown', e => {
//       const index = Array.from(tabButtons).indexOf(button);
//       if (e.key === 'ArrowRight') {
//         e.preventDefault();
//         const nextIndex = (index + 1) % tabButtons.length;
//         tabButtons[nextIndex].focus();
//       } else if (e.key === 'ArrowLeft') {
//         e.preventDefault();
//         const prevIndex = (index - 1 + tabButtons.length) % tabButtons.length;
//         tabButtons[prevIndex].focus();
//       }
//     });
//   });
// }

// function switchTab(tabBtnId) {
//   // Update ARIA and show/hide tab panels
//   const tabButtons = document.querySelectorAll('nav.tabs button');
//   tabButtons.forEach(btn => {
//     const selected = (btn.id === tabBtnId);
//     btn.setAttribute('aria-selected', selected ? 'true' : 'false');
//     btn.tabIndex = selected ? 0 : -1;
//   });

//   const panels = document.querySelectorAll('.tab-panel');
//   panels.forEach(panel => {
//     panel.hidden = true;
//   });

//   const targetPanelId = tabBtnId.replace('tab-btn-', 'tab-');
//   const targetPanel = document.getElementById(targetPanelId);
//   targetPanel.hidden = false;

//   // Load & render the data for selected tab
//   currentFile = Object.entries(TAB_ID_MAP).find(([file, id]) => id === targetPanelId)[0];
//   currentPage = 1;
//   loadAndRender(currentFile);
// }

// // Load JSON data from /data folder
// async function loadData(file) {
//   try {
//     const res = await fetch(`data/${file}`);
//     if (!res.ok) throw new Error(`Failed to load ${file}`);
//     return await res.json();
//   } catch (e) {
//     alert(`Error loading data file: ${file}`);
//     return null;
//   }
// }

// // Save JSON data via backend POST
// async function saveData(file, content) {
//   try {
//     const res = await fetch('http://127.0.0.1:5000/save', {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({ file, content }),
//     });
//     const json = await res.json();
//     if (json.status === 'success') return true;
//     else throw new Error(json.message || 'Save failed');
//   } catch (e) {
//     alert(`Error saving data file: ${file}\n${e.message}`);
//     return false;
//   }
// }

// // Render the full tab content: controls + table + pagination
// async function loadAndRender(file) {
//   const panel = document.getElementById(TAB_ID_MAP[file]);
//   panel.innerHTML = '<p>Loading...</p>';
//   const data = await loadData(file);
//   if (!data) {
//     panel.innerHTML = `<p class="no-data">Failed to load ${file}</p>`;
//     return;
//   }
//   currentData = Array.isArray(data) ? data : [data];
//   filteredData = [...currentData];
//   currentPage = 1;

//   renderControls(panel, file);
//   renderTable(panel, file);
//   renderPagination(panel);
// }

// // Render search box, buttons, select all checkbox
// function renderControls(panel, file) {
//   const isStats = (file === 'stats.json');

//   let controlsHTML = `
//     <div class="data-controls">
//       ${isStats ? '' : '<input type="text" class="data-search" placeholder="Search..." aria-label="Search data" />'}
//       ${isStats ? '' : `
//       <button class="action-btn" id="delete-btn">Delete Selected</button>
//       <button class="action-btn export-btn" id="export-json-btn">Export Selected JSON</button>
//       <button class="action-btn export-btn" id="export-csv-btn">Export Selected CSV</button>
//       <label><input type="checkbox" id="select-all" /> Select All</label>
//       `}
//     </div>
//   `;
//   panel.innerHTML = controlsHTML + panel.innerHTML;

//   if (!isStats) {
//     const searchInput = panel.querySelector('.data-search');
//     searchInput.addEventListener('input', onSearchInput);

//     const deleteBtn = panel.querySelector('#delete-btn');
//     deleteBtn.addEventListener('click', onDeleteSelected);

//     const exportJsonBtn = panel.querySelector('#export-json-btn');
//     exportJsonBtn.addEventListener('click', () => exportSelected('json'));

//     const exportCsvBtn = panel.querySelector('#export-csv-btn');
//     exportCsvBtn.addEventListener('click', () => exportSelected('csv'));

//     const selectAllCheckbox = panel.querySelector('#select-all');
//     selectAllCheckbox.addEventListener('change', onSelectAll);
//   }
// }

// // Search filtering (text match in word or sentence fields)
// function onSearchInput(e) {
//   const query = e.target.value.trim().toLowerCase();
//   if (!query) {
//     filteredData = [...currentData];
//   } else {
//     filteredData = currentData.filter(item => {
//       return Object.values(item).some(val =>
//         typeof val === 'string' && val.toLowerCase().includes(query)
//       );
//     });
//   }
//   currentPage = 1;
//   renderTable(document.getElementById(TAB_ID_MAP[currentFile]), currentFile);
//   renderPagination(document.getElementById(TAB_ID_MAP[currentFile]));
// }

// // Render table with pagination & editable cells
// function renderTable(panel, file) {
//   if (filteredData.length === 0) {
//     panel.querySelector('.tab-panel > .no-data, table')?.remove();
//     if (!panel.querySelector('.no-data')) {
//       const noDataMsg = document.createElement('p');
//       noDataMsg.className = 'no-data';
//       noDataMsg.textContent = 'No data to display.';
//       panel.appendChild(noDataMsg);
//     }
//     return;
//   } else {
//     panel.querySelector('.no-data')?.remove();
//   }

//   // Determine columns based on first item's keys (sorted for consistent order)
//   const keys = Object.keys(filteredData[0]).sort();

//   // Add a "Select" checkbox column first
//   let tableHTML = `<table><thead><tr><th class="select-col"><input type="checkbox" id="select-all-rows" aria-label="Select all rows" /></th>`;
//   for (const key of keys) {
//     tableHTML += `<th>${escapeHtml(key)}</th>`;
//   }
//   tableHTML += `<th>Actions</th></tr></thead><tbody>`;

//   // Calculate pagination slice
//   const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
//   const endIdx = Math.min(startIdx + ITEMS_PER_PAGE, filteredData.length);
//   const pageData = filteredData.slice(startIdx, endIdx);

//   for (let i = 0; i < pageData.length; i++) {
//     const item = pageData[i];
//     const globalIdx = startIdx + i;

//     tableHTML += `<tr data-index="${globalIdx}">`;
//     tableHTML += `<td class="select-col"><input type="checkbox" class="row-checkbox" aria-label="Select row ${globalIdx + 1}"/></td>`;

//     for (const key of keys) {
//       const val = item[key];
//       tableHTML += `<td class="editable-cell" data-key="${escapeHtml(key)}">${escapeHtml(val)}</td>`;
//     }

//     tableHTML += `<td><button class="action-btn delete-btn row-delete-btn" aria-label="Delete row ${globalIdx + 1}">Delete</button></td>`;
//     tableHTML += `</tr>`;
//   }

//   tableHTML += `</tbody></table>`;

//   // Replace or append table
//   let oldTable = panel.querySelector('table');
//   if (oldTable) oldTable.remove();
//   panel.insertAdjacentHTML('beforeend', tableHTML);

//   // Setup event listeners for row checkboxes and delete buttons
//   panel.querySelectorAll('.row-delete-btn').forEach(btn => {
//     btn.addEventListener('click', onDeleteSingle);
//   });

//   panel.querySelectorAll('.editable-cell').forEach(td => {
//     td.addEventListener('click', onEditableCellClick);
//   });

//   // Select all rows checkbox
//   const selectAllRowsCheckbox = panel.querySelector('#select-all-rows');
//   selectAllRowsCheckbox.checked = false;
//   selectAllRowsCheckbox.addEventListener('change', onSelectAllRows);
// }

// // Escape HTML to prevent XSS
// function escapeHtml(text) {
//   if (typeof text !== 'string') return text;
//   return text.replace(/[&<>"']/g, function (m) {
//     return {
//       '&': '&amp;',
//       '<': '&lt;',
//       '>': '&gt;',
//       '"': '&quot;',
//       "'": '&#39;'
//     }[m];
//   });
// }

// // Handle Select All rows checkbox toggle
// function onSelectAllRows(e) {
//   const checked = e.target.checked;
//   const panel = document.getElementById(TAB_ID_MAP[currentFile]);
//   panel.querySelectorAll('.row-checkbox').forEach(cb => cb.checked = checked);

//   // Update main Select All checkbox
//   const mainSelectAll = panel.querySelector('#select-all');
//   if (mainSelectAll) mainSelectAll.checked = checked;
// }

// // Handle Select All (master) checkbox toggle in controls
// function onSelectAll(e) {
//   const checked = e.target.checked;
//   const panel = document.getElementById(TAB_ID_MAP[currentFile]);
//   panel.querySelectorAll('.row-checkbox').forEach(cb => cb.checked = checked);

//   // Also update "Select All rows" checkbox in table header
//   const selectAllRows = panel.querySelector('#select-all-rows');
//   if (selectAllRows) selectAllRows.checked = checked;
// }

// // Delete single row button clicked
// async function onDeleteSingle(e) {
//   const row = e.target.closest('tr');
//   if (!row) return;
//   const idx = Number(row.dataset.index);
//   if (isNaN(idx)) return;

//   if (!confirm('Delete this entry?')) return;

//   currentData.splice(idx, 1);
//   filteredData = filteredData.filter((_, i) => i !== idx);
//   await saveData(currentFile, currentData);
//   renderTable(document.getElementById(TAB_ID_MAP[currentFile]), currentFile);
//   renderPagination(document.getElementById(TAB_ID_MAP[currentFile]));
// }

// // Delete selected rows button clicked
// async function onDeleteSelected() {
//   const panel = document.getElementById(TAB_ID_MAP[currentFile]);
//   const checkboxes = panel.querySelectorAll('.row-checkbox:checked');
//   if (checkboxes.length === 0) {
//     alert('No rows selected.');
//     return;
//   }
//   if (!confirm(`Delete ${checkboxes.length} selected entries?`)) return;

//   // Collect indexes to delete
//   const indexes = Array.from(checkboxes).map(cb => {
//     return Number(cb.closest('tr').dataset.index);
//   });

//   // Sort descending to remove from array safely
//   indexes.sort((a, b) => b - a);

//   for (const idx of indexes) {
//     currentData.splice(idx, 1);
//   }

//   filteredData = filteredData.filter(item => currentData.includes(item));
//   await saveData(currentFile, currentData);
//   renderTable(panel, currentFile);
//   renderPagination(panel);
// }

// // Export selected rows JSON/CSV
// function exportSelected(format) {
//   const panel = document.getElementById(TAB_ID_MAP[currentFile]);
//   const checkboxes = panel.querySelectorAll('.row-checkbox:checked');
//   if (checkboxes.length === 0) {
//     alert('No rows selected.');
//     return;
//   }

//   const indexes = Array.from(checkboxes).map(cb => Number(cb.closest('tr').dataset.index));
//   const exportData = indexes.map(i => currentData[i]);

//   if (format === 'json') {
//     const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
//     downloadBlob(blob, `${currentFile.replace('.json', '')}_export.json`);
//   } else if (format === 'csv') {
//     const csv = jsonToCsv(exportData);
//     const blob = new Blob([csv], { type: 'text/csv' });
//     downloadBlob(blob, `${currentFile.replace('.json', '')}_export.csv`);
//   }
// }

// // Helper: Download blob as file
// function downloadBlob(blob, filename) {
//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = filename;
//   a.click();
//   URL.revokeObjectURL(url);
// }

// // Convert array of objects to CSV string
// function jsonToCsv(data) {
//   if (data.length === 0) return '';

//   const keys = Object.keys(data[0]);
//   const header = keys.join(',');
//   const rows = data.map(item => {
//     return keys.map(k => `"${(item[k] ?? '').toString().replace(/"/g, '""')}"`).join(',');
//   });

//   return [header, ...rows].join('\n');
// }

// // Editable cell clicked: convert to input for inline editing
// function onEditableCellClick(e) {
//   const td = e.target;
//   if (td.querySelector('input')) return; // Already editing

//   const oldValue = td.textContent;
//   const key = td.dataset.key;

//   const input = document.createElement('input');
//   input.type = 'text';
//   input.value = oldValue;
//   input.className = 'editable-input';

//   td.textContent = '';
//   td.appendChild(input);
//   input.focus();

//   input.addEventListener('blur', () => finishEdit(td, input, key, oldValue));
//   input.addEventListener('keydown', evt => {
//     if (evt.key === 'Enter') {
//       evt.preventDefault();
//       input.blur();
//     }
//     if (evt.key === 'Escape') {
//       evt.preventDefault();
//       td.textContent = oldValue;
//     }
//   });
// }

// // Finish editing cell: save changes to currentData and update backend
// async function finishEdit(td, input, key, oldValue) {
//   const newValue = input.value.trim();
//   td.textContent = newValue;

//   if (newValue === oldValue) return; // no change

//   // Find index of item in currentData from row's data-index attribute
//   const tr = td.closest('tr');
//   const idx = Number(tr.dataset.index);
//   if (isNaN(idx)) return;

//   // Update currentData
//   currentData[idx][key] = newValue;

//   // Also update filteredData (in case of search)
//   const filteredIdx = filteredData.findIndex(item => item === currentData[idx]);
//   if (filteredIdx >= 0) {
//     filteredData[filteredIdx][key] = newValue;
//   }

//   // Save updated data
//   await saveData(currentFile, currentData);
// }

// // Pagination buttons and rendering
// function renderPagination(panel) {
//   // Remove old pagination
//   panel.querySelector('.pagination')?.remove();

//   if (filteredData.length <= ITEMS_PER_PAGE) return;

//   const pageCount = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
//   const pagination = document.createElement('div');
//   pagination.className = 'pagination';

//   const prevBtn = document.createElement('button');
//   prevBtn.textContent = '◀';
//   prevBtn.disabled = (currentPage === 1);
//   prevBtn.addEventListener('click', () => {
//     if (currentPage > 1) {
//       currentPage--;
//       renderTable(panel, currentFile);
//       renderPagination(panel);
//     }
//   });
//   pagination.appendChild(prevBtn);

//   // Show up to 7 page buttons max (current + 3 each side)
//   const startPage = Math.max(1, currentPage - 3);
//   const endPage = Math.min(pageCount, currentPage + 3);

//   for (let p = startPage; p <= endPage; p++) {
//     const btn = document.createElement('button');
//     btn.textContent = p;
//     btn.disabled = (p === currentPage);
//     if (p === currentPage) btn.style.fontWeight = '700';
//     btn.addEventListener('click', () => {
//       currentPage = p;
//       renderTable(panel, currentFile);
//       renderPagination(panel);
//     });
//     pagination.appendChild(btn);
//   }

//   const nextBtn = document.createElement('button');
//   nextBtn.textContent = '▶';
//   nextBtn.disabled = (currentPage === pageCount);
//   nextBtn.addEventListener('click', () => {
//     if (currentPage < pageCount) {
//       currentPage++;
//       renderTable(panel, currentFile);
//       renderPagination(panel);
//     }
//   });
//   pagination.appendChild(nextBtn);

//   panel.appendChild(pagination);
// }

// ==============================

const DATA_FILES = [
  'words.json',
  'known_words.json',
  'saved_words.json',
  'weak_words.json',
  'sentences.json',
  'known_sentences.json',
  'saved_sentences.json',
  'stats.json'
];

let currentData = [];
let filteredData = [];
let currentFile = '';
let currentPage = 1;
let itemsPerPage = 15;

document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab-button');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      const file = btn.dataset.file;
      currentFile = file;
      currentPage = 1;
      loadFile(file);
      tabs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Load first tab by default
  if (tabs.length > 0) {
    tabs[0].click();
  }
});

async function loadFile(file) {
  try {
    const res = await fetch(`/data/${file}`);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    const data = await res.json();
    currentData = Array.isArray(data) ? data : (file === 'stats.json' ? [data] : []);
    filteredData = [...currentData];

    const panel = document.getElementById('data-panel');
    panel.innerHTML = '';
    renderControls(panel, file);
    renderTable(panel, file);
    renderPagination(panel);
  } catch (err) {
    console.error(err);
    alert(`Could not load ${file}`);
  }
}

function renderControls(panel, file) {
  const isStats = file === 'stats.json';

  let controlsHTML = `
    <div class="data-controls">
      <input type="text" class="data-search" placeholder="Search..." aria-label="Search data" />
      ${!isStats ? `
      <label for="entries-per-page" style="margin-left: 1rem; font-weight: 600;">Entries per page:</label>
      <select id="entries-per-page" aria-label="Entries per page selector" style="margin-right: 1rem; padding: 0.3rem;">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15" selected>15</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="all">All</option>
      </select>
      <button class="action-btn" id="delete-btn">Delete Selected</button>
      <button class="action-btn export-btn" id="export-json-btn">Export Selected JSON</button>
      <button class="action-btn export-btn" id="export-csv-btn">Export Selected CSV</button>
      <label><input type="checkbox" id="select-all" /> Select All</label>
      ` : ''}
    </div>
  `;
  panel.insertAdjacentHTML('beforeend', controlsHTML);

  const searchBox = panel.querySelector('.data-search');
  searchBox.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    filteredData = currentData.filter(item => {
      return Object.values(item).some(val => String(val).toLowerCase().includes(query));
    });
    currentPage = 1;
    renderTable(panel, currentFile);
    renderPagination(panel);
  });

  if (!isStats) {
    const entriesSelect = panel.querySelector('#entries-per-page');
    entriesSelect.value = itemsPerPage === Infinity ? 'all' : String(itemsPerPage);
    entriesSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'all') {
        itemsPerPage = Infinity;
      } else {
        itemsPerPage = parseInt(val, 10);
        if (isNaN(itemsPerPage) || itemsPerPage <= 0) itemsPerPage = 15;
      }
      currentPage = 1;
      renderTable(panel, currentFile);
      renderPagination(panel);
    });

    panel.querySelector('#select-all').addEventListener('change', (e) => {
      const checkboxes = panel.querySelectorAll('tbody input[type="checkbox"]');
      checkboxes.forEach(cb => cb.checked = e.target.checked);
    });

    panel.querySelector('#delete-btn').addEventListener('click', () => {
      const checkboxes = panel.querySelectorAll('tbody input[type="checkbox"]:checked');
      const indexes = Array.from(checkboxes).map(cb => parseInt(cb.dataset.index, 10));
      if (indexes.length === 0) return alert('No entries selected');
      if (!confirm('Delete selected entries?')) return;
      indexes.sort((a, b) => b - a).forEach(i => currentData.splice(i, 1));
      filteredData = [...currentData];
      saveFile(currentFile, currentData);
      renderTable(panel, currentFile);
      renderPagination(panel);
    });

    panel.querySelector('#export-json-btn').addEventListener('click', () => {
      const selected = getSelectedItems(panel);
      if (selected.length === 0) return alert('No entries selected');
      downloadFile(selected, 'json');
    });

    panel.querySelector('#export-csv-btn').addEventListener('click', () => {
      const selected = getSelectedItems(panel);
      if (selected.length === 0) return alert('No entries selected');
      downloadFile(selected, 'csv');
    });
  }
}

function renderTable(panel, file) {
  const start = (currentPage - 1) * itemsPerPage;
  const end = itemsPerPage === Infinity ? filteredData.length : start + itemsPerPage;
  const pageData = filteredData.slice(start, end);

  if (pageData.length === 0) {
    panel.querySelector('table')?.remove();
    panel.insertAdjacentHTML('beforeend', `<p>No data found.</p>`);
    return;
  }

  const keys = Object.keys(pageData[0]);
  let tableHTML = `<table><thead><tr><th></th>`;
  keys.forEach(k => tableHTML += `<th>${k}</th>`);
  tableHTML += `</tr></thead><tbody>`;
  pageData.forEach((item, i) => {
    const actualIndex = start + i;
    tableHTML += `<tr><td><input type="checkbox" data-index="${actualIndex}"></td>`;
    keys.forEach(k => {
      tableHTML += `<td contenteditable="true" data-key="${k}" data-index="${actualIndex}">${item[k]}</td>`;
    });
    tableHTML += `</tr>`;
  });
  tableHTML += `</tbody></table>`;

  panel.querySelector('table')?.remove();
  panel.insertAdjacentHTML('beforeend', tableHTML);

  panel.querySelectorAll('td[contenteditable]').forEach(cell => {
    cell.addEventListener('blur', () => {
      const key = cell.dataset.key;
      const index = parseInt(cell.dataset.index, 10);
      currentData[index][key] = cell.textContent.trim();
      saveFile(currentFile, currentData);
    });
  });
}

function renderPagination(panel) {
  panel.querySelector('.pagination')?.remove();

  if (itemsPerPage === Infinity || filteredData.length <= itemsPerPage) return;

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  let paginationHTML = `<div class="pagination">`;
  for (let i = 1; i <= pageCount; i++) {
    paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
  }
  paginationHTML += `</div>`;

  panel.insertAdjacentHTML('beforeend', paginationHTML);

  panel.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentPage = parseInt(btn.dataset.page, 10);
      renderTable(panel, currentFile);
      renderPagination(panel);
    });
  });
}

function getSelectedItems(panel) {
  const checkboxes = panel.querySelectorAll('tbody input[type="checkbox"]:checked');
  return Array.from(checkboxes).map(cb => currentData[parseInt(cb.dataset.index, 10)]);
}

async function saveFile(file, data) {
  try {
    await fetch(`/save/${file}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (err) {
    alert('Failed to save data.');
    console.error(err);
  }
}

function downloadFile(data, format) {
  const filename = `${currentFile.replace('.json', '')}_export.${format}`;
  let blob;
  if (format === 'json') {
    blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  } else if (format === 'csv') {
    const keys = Object.keys(data[0]);
    const csv = [keys.join(',')].concat(data.map(row => keys.map(k => `"${row[k] || ''}"`).join(','))).join('\n');
    blob = new Blob([csv], { type: 'text/csv' });
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}


document.getElementById('all-data-btn').addEventListener('click', () => {
  window.location.href = 'all_data.html';
});
