const elements = document.querySelectorAll('[id="course"]');
elements.forEach(ele => {
    ele.style.fontWeight = 'normal';
});


document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let formData = new FormData(this);
    let formStatus = document.getElementById('form-status');
    
    fetch('https://formspree.io/f/mldrjral', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            formStatus.innerHTML = "Thanks for your submission!";
            this.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    formStatus.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    formStatus.innerHTML = "Oops! There was a problem submitting your form";
                }
            })
        }
    }).catch(error => {
        formStatus.innerHTML = "Oops! There was a problem submitting your form";
    });
});


// notes JS
document.addEventListener('DOMContentLoaded', () => {
    const notesSection = document.getElementById('notes-section');
    const notesList = document.getElementById('notes-list');
    const noteInput = document.getElementById('note-input');
    const saveButton = document.getElementById('save-note');
    const notesLink = document.querySelector('.notes-link');
    const viewNotesBtn = document.getElementById('view-notes');
    const addNoteBtn = document.getElementById('add-note');
    const noteInputArea = document.getElementById('note-input-area');
  
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
  
    function toggleNotesSection() {
      notesSection.style.display = notesSection.style.display === 'none' ? 'block' : 'none';
      if (notesSection.style.display === 'block') {
        notesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  
    function displayNotes() {
      notesList.innerHTML = '';
      notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = marked.parse(note);
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-note');
        deleteButton.addEventListener('click', () => deleteNote(index));
        
        noteElement.appendChild(deleteButton);
        notesList.appendChild(noteElement);
      });
    }
  
    function saveNote() {
      const noteText = noteInput.value.trim();
      if (noteText) {
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        displayNotes();
        noteInputArea.style.display = 'none';
        notesList.style.display = 'block';
        viewNotesBtn.textContent = 'Hide Notes';
      }
    }
  
    function deleteNote(index) {
      notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
      displayNotes();
      if (notes.length === 0) {
        notesList.style.display = 'none';
        viewNotesBtn.textContent = 'View Notes';
      }
    }
  
    notesLink.addEventListener('click', (e) => {
      e.preventDefault();
      toggleNotesSection();
    });
  
    viewNotesBtn.addEventListener('click', () => {
      if (notesList.style.display === 'none') {
        notesList.style.display = 'block';
        noteInputArea.style.display = 'none';
        displayNotes();
        viewNotesBtn.textContent = 'Hide Notes';
      } else {
        notesList.style.display = 'none';
        viewNotesBtn.textContent = 'View Notes';
      }
    });
  
    addNoteBtn.addEventListener('click', () => {
      notesList.style.display = 'none';
      noteInputArea.style.display = 'block';
      viewNotesBtn.textContent = 'View Notes';
    });
  
    saveButton.addEventListener('click', saveNote);
  
    noteInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        saveNote();
      }
    });
  
    // Initial setup
    if (notes.length > 0) {
      displayNotes();
      notesList.style.display = 'block';
      viewNotesBtn.textContent = 'Hide Notes';
    } else {
      notesList.style.display = 'none';
      viewNotesBtn.textContent = 'View Notes';
    }
  });

  // leetcode --- 


  document.addEventListener('DOMContentLoaded', () => {
    const leetcodeStats = document.getElementById('leetcode-stats');
    const username = 'l_user'; // Replace with your actual LeetCode username
  
    async function fetchLeetCodeStats() {
      try {
        const response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        const data = await response.json();
  
        if (data.status === 'success') {
          const statsHTML = `
            <div class="stat-card total-solved">
              <h3>Total Solved</h3>
              <p>${data.totalSolved}</p>
            </div>
            <div class="stat-card easy-solved">
              <h3>Easy</h3>
              <p>${data.easySolved}</p>
            </div>
            <div class="stat-card medium-solved">
              <h3>Medium</h3>
              <p>${data.mediumSolved}</p>
            </div>
            <div class="stat-card hard-solved">
              <h3>Hard</h3>
              <p>${data.hardSolved}</p>
            </div>
            <div class="stat-card acceptance-rate">
              <h3>Acceptance Rate</h3>
              <p>${data.acceptanceRate}%</p>
            </div>
            <div class="stat-card ranking">
              <h3>Ranking</h3>
              <p>${data.ranking}</p>
            </div>
          `;
          leetcodeStats.innerHTML = statsHTML;
          
          // Trigger animation after content is loaded
          setTimeout(() => {
            document.querySelectorAll('.stat-card').forEach(card => {
              card.classList.add('animate');
            });
          }, 100);
        } else {
          leetcodeStats.innerHTML = '<p>Failed to load LeetCode stats.</p>';
        }
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        leetcodeStats.innerHTML = '<p>Error loading LeetCode stats.</p>';
      }
    }
  
    fetchLeetCodeStats();
  });