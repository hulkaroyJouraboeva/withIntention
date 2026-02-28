// app.js

// --- State Management ---
const STORAGE_KEY = 'intentional_reflections';

function getReflections() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveReflection(reflection) {
    const reflections = getReflections();
    reflections.push(reflection);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(reflections));
    updateDashboard();
    renderLibrary();
}

// --- Navigation & UI ---
const navButtons = document.querySelectorAll('.nav-btn[data-target]');
const views = document.querySelectorAll('.view');
const pageTitle = document.getElementById('page-title');

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active nav button
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update active view
        const targetId = btn.getAttribute('data-target');
        views.forEach(v => {
            v.classList.remove('active');
            if (v.id === targetId) {
                v.classList.add('active');
            }
        });

        // Update Title
        pageTitle.textContent = btn.textContent.trim().replace(/[^a-zA-Z\s]/g, '');

        if (targetId === 'dashboard') updateDashboard();
        if (targetId === 'library') renderLibrary();
    });
});

// --- Theme Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

themeToggle.addEventListener('click', () => {
    if (htmlEl.classList.contains('dark-theme')) {
        htmlEl.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    } else {
        htmlEl.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    }
});

// Load theme on start
if (localStorage.getItem('theme') === 'light') {
    htmlEl.classList.remove('dark-theme');
}

// --- Scroll Timer ---
let globalTimerInterval;
let timerSeconds = 15 * 60; // 15 mins
const globalTimerEl = document.getElementById('global-timer');
const startTimerBtn = document.getElementById('start-timer');

function formatTime(secs) {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
}

startTimerBtn.addEventListener('click', () => {
    if (globalTimerInterval) {
        clearInterval(globalTimerInterval);
        globalTimerInterval = null;
        startTimerBtn.textContent = 'Start 15m';
        return;
    }

    timerSeconds = 15 * 60;
    startTimerBtn.textContent = 'Stop Timer';
    globalTimerInterval = setInterval(() => {
        timerSeconds--;
        if (timerSeconds <= 0) {
            clearInterval(globalTimerInterval);
            globalTimerInterval = null;
            alert("Mindful Interruption: Time to reflect on what you're consuming.");
            startTimerBtn.textContent = 'Start 15m';
        }
        globalTimerEl.textContent = formatTime(timerSeconds);
    }, 1000);
});

// --- Form Submission ---
const form = document.getElementById('reflection-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Gather basic info
    const title = document.getElementById('media-title').value;
    const category = document.getElementById('media-category').value;
    const type = document.getElementById('media-type').value;
    const source = document.getElementById('media-source').value;
    const date = document.getElementById('media-date').value;
    const duration = parseInt(document.getElementById('media-duration').value, 10);

    // Gather insights
    const claims = document.getElementById('insight-claims').value;
    const evidence = document.getElementById('insight-evidence').value;
    const personal = document.getElementById('insight-personal').value;
    const terms = document.getElementById('insight-terms').value;

    // Gather application
    const actUseful = document.getElementById('action-useful').value;
    const actThinking = document.getElementById('action-thinking').value;
    const actConcrete = document.getElementById('action-concrete').value;
    const actWhen = document.getElementById('action-when').value;
    const actStatus = document.getElementById('action-status').value;
    const actHabit = document.getElementById('action-habit').checked;
    const actReminder = document.getElementById('action-reminder').checked;

    const newReflection = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        category, title, type, source, date, duration,
        insights: { claims, evidence, personal, terms },
        application: {
            useful: actUseful, thinking: actThinking, concrete: actConcrete,
            when: actWhen, status: actStatus, habit: actHabit, reminder: actReminder
        }
    };

    saveReflection(newReflection);

    // Reset Form & Redirect
    form.reset();
    navButtons[0].click(); // go to dashboard
});

// --- Charts & Dashboard ---
let mediaTypeChartObj = null;
let categoryChartObj = null;

function updateDashboard() {
    const reflections = getReflections();

    // Basic Stats Update
    const statSessions = document.getElementById('stat-sessions');
    const statDuration = document.getElementById('stat-duration');
    const statCategories = document.getElementById('stat-categories');
    const statAction = document.getElementById('stat-action');

    statSessions.textContent = reflections.length;

    if (reflections.length === 0) return;

    let totalDuration = 0;
    let completedActions = 0;
    const uniqueCategories = new Set();

    const mediaCounts = {};
    const categoryCounts = {};

    reflections.forEach(r => {
        totalDuration += r.duration || 0;
        if (r.application.status === 'Yes') completedActions++;
        if (r.category) uniqueCategories.add(r.category);

        mediaCounts[r.type] = (mediaCounts[r.type] || 0) + (r.duration || 0);

        const cat = r.category || 'Misc';
        categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    statDuration.textContent = totalDuration;
    statCategories.textContent = uniqueCategories.size;
    statAction.textContent = Math.round((completedActions / reflections.length) * 100) + '%';

    // Chart logic
    renderCharts(mediaCounts, categoryCounts);
}

function renderCharts(mediaCounts, categoryCounts) {
    const mediaCtx = document.getElementById('mediaTypeChart').getContext('2d');
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');

    const textColor = document.documentElement.classList.contains('dark-theme') ? '#f9fafb' : '#111827';

    Chart.defaults.color = textColor;
    Chart.defaults.font.family = 'Inter';

    if (mediaTypeChartObj) mediaTypeChartObj.destroy();
    mediaTypeChartObj = new Chart(mediaCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(mediaCounts),
            datasets: [{
                data: Object.values(mediaCounts),
                backgroundColor: ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#f97316', '#eab308']
            }]
        },
        options: { cutout: '70%', responsive: true, plugins: { legend: { position: 'right' } } }
    });

    if (categoryChartObj) categoryChartObj.destroy();
    categoryChartObj = new Chart(categoryCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(categoryCounts),
            datasets: [{
                label: 'Reflections',
                data: Object.values(categoryCounts),
                backgroundColor: '#818cf8',
                borderRadius: 4
            }]
        },
        options: { responsive: true, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
    });
}

// --- Library View ---
function renderLibrary() {
    const listEl = document.getElementById('reflections-list');
    const reflections = getReflections();

    if (reflections.length === 0) {
        listEl.innerHTML = '<p style="color:var(--text-muted); grid-column:1/-1;">No reflections yet. Add one carefully to see it here!</p>';
        return;
    }

    listEl.innerHTML = '';

    const categoriesList = ['Academic', 'Entertainment', 'Work', 'Internship', 'Misc'];
    const grouped = {};
    categoriesList.forEach(c => grouped[c] = []);

    reflections.slice().reverse().forEach(r => {
        const cat = r.category && categoriesList.includes(r.category) ? r.category : 'Misc';
        grouped[cat].push(r);
    });

    categoriesList.forEach(cat => {
        if (grouped[cat].length > 0) {
            const sectionHeader = document.createElement('h3');
            sectionHeader.textContent = cat;
            sectionHeader.style.gridColumn = '1 / -1';
            sectionHeader.style.marginTop = '16px';
            sectionHeader.style.color = 'var(--accent-primary)';
            sectionHeader.style.borderBottom = '1px solid var(--border-color)';
            sectionHeader.style.paddingBottom = '8px';
            listEl.appendChild(sectionHeader);

            grouped[cat].forEach(r => {
                const card = document.createElement('div');
                card.className = 'glass-panel reflection-card';
                card.innerHTML = `
                    <div class="meta">
                        <span>${r.date}</span>
                        <span>${r.duration} mins</span>
                    </div>
                    <h4>${r.title}</h4>
                    <div><span class="tag">${r.type}</span> <span class="tag">${r.source}</span></div>
                    <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:8px;">
                        <strong>Action:</strong> ${r.application.concrete}
                    </p>
                    ${r.insights && r.insights.terms ? `<p style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;"><strong>Terms:</strong> ${r.insights.terms}</p>` : ''}
                `;
                listEl.appendChild(card);
            });
        }
    });
}

// Search Filter
document.getElementById('library-search').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.reflection-card');

    const reflections = getReflections().slice().reverse();

    cards.forEach((card, index) => {
        const r = reflections[index];
        const textToSearch = `${r.title} ${r.type} ${r.source} ${r.insights.claims} ${r.application.concrete}`.toLowerCase();

        if (textToSearch.includes(term)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// --- Settings ---
document.getElementById('clear-btn').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear all your reflection data?")) {
        localStorage.removeItem(STORAGE_KEY);
        alert("Data cleared.");
        updateDashboard();
        renderLibrary();
    }
});

document.getElementById('export-btn').addEventListener('click', () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return alert("No data to export.");

    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `intentional_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
});

// Init
updateDashboard();
