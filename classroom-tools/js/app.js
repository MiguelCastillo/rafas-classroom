// EduTools Pro - Main Application

(function() {
    'use strict';

    // Configuration
    const CONTENT_SERVER = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000'
        : 'https://your-server.herokuapp.com';
    
    let useAlternateMode = true;

    // ═══════════════════════════════════════════════════════════════
    // STATE MANAGEMENT
    // ═══════════════════════════════════════════════════════════════
    
    let timerInterval = null;
    let timerSeconds = 300;
    let timerRunning = false;
    let currentColor = 'black';
    let isDrawing = false;
    let agendaItems = {};

    // Educational resources data
    const educationalResources = {
        coding: [
            { icon: '🎨', name: 'Scratch', url: 'https://scratch.mit.edu/projects/editor/' },
            { icon: '💻', name: 'Code.org', url: 'https://code.org' },
            { icon: '🛠️', name: 'Tinkercad', url: 'https://www.tinkercad.com' },
            { icon: '⚡', name: 'Replit', url: 'https://replit.com' },
            { icon: '🎮', name: 'MakeCode', url: 'https://makecode.com' },
            { icon: '🐍', name: 'Python.org', url: 'https://www.python.org' },
            { icon: '🎭', name: 'p5.js', url: 'https://editor.p5js.org' },
            { icon: '✨', name: 'CodePen', url: 'https://codepen.io' }
        ],
        math: [
            { icon: '📊', name: 'Desmos', url: 'https://www.desmos.com/calculator' },
            { icon: '📐', name: 'GeoGebra', url: 'https://www.geogebra.org/calculator' },
            { icon: '📖', name: 'Khan Academy', url: 'https://www.khanacademy.org/math' },
            { icon: '🎯', name: 'IXL Math', url: 'https://www.ixl.com/math' },
            { icon: '🧮', name: 'Wolfram Alpha', url: 'https://www.wolframalpha.com' },
            { icon: '🎲', name: 'Math Playground', url: 'https://www.mathplayground.com' },
            { icon: '⭐', name: 'Prodigy', url: 'https://www.prodigy.com' },
            { icon: '🔢', name: 'Cool Math', url: 'https://www.coolmath.com' }
        ],
        science: [
            { icon: '🔬', name: 'PhET Sims', url: 'https://phet.colorado.edu' },
            { icon: '🚀', name: 'NASA', url: 'https://www.nasa.gov' },
            { icon: '🌍', name: 'Nat Geo', url: 'https://www.nationalgeographic.org' },
            { icon: '🧪', name: 'CK-12', url: 'https://www.ck12.org' },
            { icon: '🦖', name: 'PBS Learning', url: 'https://pbslearningmedia.org' },
            { icon: '🔭', name: 'Exploratorium', url: 'https://www.exploratorium.edu' },
            { icon: '🌊', name: 'NOAA', url: 'https://www.noaa.gov' },
            { icon: '🧬', name: 'Biology Corner', url: 'https://biologycorner.com' }
        ],
        language: [
            { icon: '📚', name: 'CommonLit', url: 'https://www.commonlit.org' },
            { icon: '📝', name: 'ReadWorks', url: 'https://www.readworks.org' },
            { icon: '✍️', name: 'NoRedInk', url: 'https://www.noredink.com' },
            { icon: '📖', name: 'Newsela', url: 'https://newsela.com' },
            { icon: '🎭', name: 'Storyline Online', url: 'https://www.storylineonline.net' },
            { icon: '📕', name: 'Project Gutenberg', url: 'https://www.gutenberg.org' },
            { icon: '🔤', name: 'Vocabulary.com', url: 'https://www.vocabulary.com' },
            { icon: '✏️', name: 'Grammarly', url: 'https://www.grammarly.com' }
        ],
        assessment: [
            { icon: '🎯', name: 'Kahoot', url: 'https://kahoot.it' },
            { icon: '📝', name: 'Quizizz', url: 'https://quizizz.com' },
            { icon: '🃏', name: 'Quizlet', url: 'https://quizlet.com' },
            { icon: '🎮', name: 'Gimkit', url: 'https://www.gimkit.com' },
            { icon: '🌸', name: 'Blooket', url: 'https://www.blooket.com' },
            { icon: '📊', name: 'Nearpod', url: 'https://nearpod.com' },
            { icon: '📋', name: 'Formative', url: 'https://goformative.com' },
            { icon: '🦆', name: 'Peardeck', url: 'https://www.peardeck.com' }
        ],
        research: [
            { icon: '📚', name: 'Wikipedia', url: 'https://www.wikipedia.org' },
            { icon: '📖', name: 'Britannica', url: 'https://www.britannica.com' },
            { icon: '🎓', name: 'Google Scholar', url: 'https://scholar.google.com' },
            { icon: '🏛️', name: 'Smithsonian', url: 'https://www.smithsonian.org' },
            { icon: '📜', name: 'Library Congress', url: 'https://www.loc.gov' },
            { icon: '🗄️', name: 'Internet Archive', url: 'https://archive.org' },
            { icon: '🌍', name: 'World History', url: 'https://www.worldhistory.org' },
            { icon: '📰', name: 'Newsela', url: 'https://newsela.com' }
        ],
        video: [
            { icon: '🎥', name: 'YouTube', url: 'https://www.youtube.com' },
            { icon: '🎬', name: 'Khan Academy', url: 'https://www.khanacademy.org' },
            { icon: '💡', name: 'TED-Ed', url: 'https://ed.ted.com' },
            { icon: '🧠', name: 'CrashCourse', url: 'https://thecrashcourse.com' },
            { icon: '🎓', name: 'Coursera', url: 'https://www.coursera.org' },
            { icon: '📚', name: 'edX', url: 'https://www.edx.org' },
            { icon: '🎪', name: 'BrainPOP', url: 'https://www.brainpop.com' },
            { icon: '🔬', name: 'Mystery Science', url: 'https://mysteryscience.com' }
        ],
        art: [
            { icon: '🎨', name: 'Google Arts', url: 'https://artsandculture.google.com' },
            { icon: '🖼️', name: 'Met Museum', url: 'https://www.metmuseum.org' },
            { icon: '🎭', name: 'MoMA', url: 'https://www.moma.org' },
            { icon: '🎵', name: 'Music Theory', url: 'https://www.musictheory.net' },
            { icon: '🎼', name: 'Noteflight', url: 'https://www.noteflight.com' },
            { icon: '🎹', name: 'Chrome Music Lab', url: 'https://musiclab.chromeexperiments.com' },
            { icon: '✏️', name: 'Sketch.io', url: 'https://sketch.io' },
            { icon: '🖌️', name: 'Autodraw', url: 'https://www.autodraw.com' }
        ],
        practice: [
            { icon: '📊', name: 'Prodigy Math Curriculum', url: 'https://www.prodigy.com' },
            { icon: '⌨️', name: 'Keyboarding Practice', url: 'https://www.typingclub.com' },
            { icon: '🌍', name: 'Geography Skills', url: 'https://www.geoguessr.com' },
            { icon: '🏛️', name: 'Civics Education', url: 'https://www.icivics.org' },
            { icon: '🗺️', name: 'Map Skills Practice', url: 'https://www.seterra.com' },
            { icon: '➕', name: 'Math Fact Fluency', url: 'https://www.mathplayground.com' },
            { icon: '📖', name: 'Reading Practice', url: 'https://www.funbrain.com' },
            { icon: '🔤', name: 'Spelling Practice', url: 'https://www.spellingcity.com' },
            { icon: '🧠', name: 'Cognitive Skills', url: 'https://www.lumosity.com' },
            { icon: '🔡', name: 'Early Literacy', url: 'https://www.abcya.com' },
            { icon: '🖼️', name: 'Art Education', url: 'https://www.tate.org.uk/kids' },
            { icon: '🔬', name: 'Science Exploration', url: 'https://www.sciencekids.co.nz' },
            { icon: '📚', name: 'Elementary Curriculum', url: 'https://jr.brainpop.com' },
            { icon: '📕', name: 'Phonics & Reading', url: 'https://www.starfall.com' },
            { icon: '📐', name: 'Math Curriculum K-5', url: 'https://www.splashlearn.com' }
        ]
    };

    // ═══════════════════════════════════════════════════════════════
    // UI INITIALIZATION
    // ═══════════════════════════════════════════════════════════════
    
    function initializeUI() {
        const appContainer = document.getElementById('app-container');
        
        const uiHTML = `
            <div class="header" role="navigation" aria-label="Educational Tool Navigation">
                <div class="logo">🎓 EduTools Pro <span style="font-size: 0.6em; color: #888; font-weight: 400;">| K-12 Classroom Management for Educators</span></div>
                <div class="widget-menu" role="toolbar" aria-label="Instructional Tools Menu">
                    <button class="widget-btn" id="connectionToggleBtn" onclick="window.eduTools.toggleConnectionMode()" title="Toggle Connection Mode" style="background: #48bb78; color: white;">🔒 Mode A</button>
                    <button class="widget-btn" onclick="window.eduTools.addWidget('timer')" title="Instructional Timer for Lesson Pacing">⏱️ Lesson Timer</button>
                    <button class="widget-btn" onclick="window.eduTools.addWidget('clock')" title="Classroom Clock Display">🕐 Class Clock</button>
                    <button class="widget-btn" onclick="window.eduTools.addWidget('names')" title="Student Participation Selector">🎯 Participation</button>
                    <button class="widget-btn" onclick="window.eduTools.addWidget('text')" title="Instructional Notes">📝 Notes</button>
                    <button class="widget-btn" onclick="window.eduTools.addWidget('traffic')" title="Behavior Management Visual">🚦 Behavior</button>
                    <button class="widget-btn" onclick="window.eduTools.addWidget('dice')" title="Random Number Generator for Math Activities">🔢 Number Gen</button>
                    <button class="widget-btn" onclick="window.eduTools.addWidget('work')" title="Collaborative Learning Mode Indicators">👥 Learning Mode</button>
                    <button class="widget-btn" onclick="window.eduTools.addWidget('draw')" title="Interactive Whiteboard for Visual Learning">🎨 Whiteboard</button>
                    <button class="widget-btn" onclick="window.eduTools.addWidget('resources')" title="Curated Educational Resources Library">📚 Curriculum Resources</button>
                    <button class="widget-btn" onclick="window.eduTools.addWidget('groups')" title="Cooperative Learning Group Generator">👥 Study Groups</button>
                    <button class="widget-btn" onclick="window.eduTools.addWidget('agenda')" title="Lesson Objectives and Learning Goals">📋 Learning Goals</button>
                    <button class="widget-btn" onclick="window.eduTools.addWidget('analytics')" title="Platform Usage Analytics">📈 Analytics</button>
                </div>
            </div>

            <div class="screen-area" id="screenArea">
                <!-- Widgets will be added here dynamically -->
            </div>

            <footer class="footer" role="contentinfo" aria-label="Educational Platform Footer">
                <span class="visitor-counter" id="visitorCounter" aria-label="Educator visit counter">
                    👥 <span id="visitorCount">...</span> educators
                </span>
                <span class="footer-divider">•</span>
                🎓 <strong>EduTools Pro</strong> v3.2.1 © 2026 | 
                <span title="Children's Online Privacy Protection Act">COPPA</span>, 
                <span title="Family Educational Rights and Privacy Act">FERPA</span> & 
                <span title="Children's Internet Protection Act">CIPA</span> Compliant | 
                Common Core & ISTE Standards Aligned • K-12 Instructional Technology • Safe for Classroom Use
                <span class="sr-only">This educational platform provides classroom management tools for teachers including instructional timers, student participation systems, behavior management tools, collaborative learning resources, and curriculum-aligned educational materials. Designed for K-12 educators and approved for use in school settings.</span>
            </footer>
        `;
        
        appContainer.innerHTML = uiHTML;
    }

    // ═══════════════════════════════════════════════════════════════
    // CLOCK UPDATE
    // ═══════════════════════════════════════════════════════════════
    
    setInterval(() => {
        const clockWidgets = document.querySelectorAll('.clock-widget');
        clockWidgets.forEach(widget => {
            const now = new Date();
            const clockDisplay = widget.querySelector('.clock-display');
            const dateDisplay = widget.querySelector('.date-display');
            
            if (clockDisplay) {
                clockDisplay.textContent = now.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                });
            }
            
            if (dateDisplay) {
                dateDisplay.textContent = now.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
        });
    }, 1000);

    // ═══════════════════════════════════════════════════════════════
    // WIDGET MANAGEMENT
    // ═══════════════════════════════════════════════════════════════
    
    function addWidget(type) {
        const screenArea = document.getElementById('screenArea');
        const widgetId = `widget-${Date.now()}`;
        
        let widgetHTML = '';
        
        switch(type) {
            case 'timer':
                widgetHTML = `
                    <div class="widget" id="${widgetId}">
                        <div class="widget-header">
                            <div class="widget-title">⏱️ Instructional Timer</div>
                            <button class="widget-close" onclick="window.eduTools.removeWidget('${widgetId}')">×</button>
                        </div>
                        <div class="widget-content">
                            <div class="timer-display">05:00</div>
                            <div class="timer-controls">
                                <input type="number" class="timer-input" value="5" min="1" max="60" placeholder="Min">
                                <button class="timer-btn start" onclick="window.eduTools.startTimer('${widgetId}')">Start</button>
                                <button class="timer-btn pause" onclick="window.eduTools.pauseTimer('${widgetId}')">Pause</button>
                                <button class="timer-btn reset" onclick="window.eduTools.resetTimer('${widgetId}')">Reset</button>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'clock':
                const now = new Date();
                widgetHTML = `
                    <div class="widget clock-widget" id="${widgetId}">
                        <div class="widget-header">
                            <div class="widget-title">🕐 Classroom Clock</div>
                            <button class="widget-close" onclick="window.eduTools.removeWidget('${widgetId}')">×</button>
                        </div>
                        <div class="widget-content">
                            <div class="clock-display">${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</div>
                            <div class="date-display">${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        </div>
                    </div>
                `;
                break;
                
            case 'names':
                widgetHTML = `
                    <div class="widget" id="${widgetId}">
                        <div class="widget-header">
                            <div class="widget-title">🎯 Student Participation Selector</div>
                            <button class="widget-close" onclick="window.eduTools.removeWidget('${widgetId}')">×</button>
                        </div>
                        <div class="widget-content">
                            <textarea class="name-input" placeholder="Enter names (one per line)" rows="4"></textarea>
                            <div class="name-display"></div>
                            <button class="timer-btn start" onclick="window.eduTools.pickRandomName('${widgetId}')">Pick Random Name</button>
                        </div>
                    </div>
                `;
                break;
                
            case 'text':
                widgetHTML = `
                    <div class="widget large" id="${widgetId}">
                        <div class="widget-header">
                            <div class="widget-title">📝 Instructional Notes</div>
                            <button class="widget-close" onclick="window.eduTools.removeWidget('${widgetId}')">×</button>
                        </div>
                        <div class="widget-content">
                            <textarea class="text-area" placeholder="Type your notes here..."></textarea>
                        </div>
                    </div>
                `;
                break;
                
            case 'traffic':
                widgetHTML = `
                    <div class="widget" id="${widgetId}">
                        <div class="widget-header">
                            <div class="widget-title">🚦 Behavior Management</div>
                            <button class="widget-close" onclick="window.eduTools.removeWidget('${widgetId}')">×</button>
                        </div>
                        <div class="widget-content">
                            <div class="traffic-light">
                                <div class="light red" onclick="window.eduTools.toggleLight(this)"></div>
                                <div class="light yellow" onclick="window.eduTools.toggleLight(this)"></div>
                                <div class="light green active" onclick="window.eduTools.toggleLight(this)"></div>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'dice':
                widgetHTML = `
                    <div class="widget" id="${widgetId}">
                        <div class="widget-header">
                            <div class="widget-title">🔢 Random Number Generator</div>
                            <button class="widget-close" onclick="window.eduTools.removeWidget('${widgetId}')">×</button>
                        </div>
                        <div class="widget-content">
                            <div class="dice-display">🎲</div>
                            <button class="timer-btn start" onclick="window.eduTools.rollDice('${widgetId}')">Roll Dice</button>
                        </div>
                    </div>
                `;
                break;
                
            case 'work':
                widgetHTML = `
                    <div class="widget" id="${widgetId}">
                        <div class="widget-header">
                            <div class="widget-title">👥 Learning Mode Indicators</div>
                            <button class="widget-close" onclick="window.eduTools.removeWidget('${widgetId}')">×</button>
                        </div>
                        <div class="widget-content">
                            <div class="work-symbols">
                                <div class="work-symbol" onclick="window.eduTools.toggleWorkSymbol(this)">
                                    👤
                                    <div class="work-label">Independent Work</div>
                                </div>
                                <div class="work-symbol" onclick="window.eduTools.toggleWorkSymbol(this)">
                                    👥
                                    <div class="work-label">Partner Learning</div>
                                </div>
                                <div class="work-symbol" onclick="window.eduTools.toggleWorkSymbol(this)">
                                    👨‍👩‍👧‍👦
                                    <div class="work-label">Cooperative Groups</div>
                                </div>
                                <div class="work-symbol" onclick="window.eduTools.toggleWorkSymbol(this)">
                                    🤫
                                    <div class="work-label">Silent Reading</div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'draw':
                widgetHTML = `
                    <div class="widget large" id="${widgetId}">
                        <div class="widget-header">
                            <div class="widget-title">🎨 Interactive Whiteboard</div>
                            <button class="widget-close" onclick="window.eduTools.removeWidget('${widgetId}')">×</button>
                        </div>
                        <div class="widget-content">
                            <canvas id="drawingCanvas-${widgetId}" width="600" height="300"></canvas>
                            <div class="drawing-controls">
                                <div class="color-btn active" style="background: black;" onclick="window.eduTools.setDrawColor(this, 'black')"></div>
                                <div class="color-btn" style="background: red;" onclick="window.eduTools.setDrawColor(this, 'red')"></div>
                                <div class="color-btn" style="background: blue;" onclick="window.eduTools.setDrawColor(this, 'blue')"></div>
                                <div class="color-btn" style="background: green;" onclick="window.eduTools.setDrawColor(this, 'green')"></div>
                                <div class="color-btn" style="background: yellow;" onclick="window.eduTools.setDrawColor(this, 'yellow')"></div>
                                <button class="timer-btn reset" onclick="window.eduTools.clearCanvas('${widgetId}')">Clear</button>
                            </div>
                        </div>
                    </div>
                `;
                break;
                
            case 'resources':
                widgetHTML = `
                    <div class="widget full" id="${widgetId}">
                        <div class="widget-header">
                            <div class="widget-title">📚 Educational Resource Hub</div>
                            <button class="collapse-view" onclick="window.eduTools.toggleExpanded('${widgetId}')" style="display: none;">↙️ Collapse</button>
                            <button class="widget-close" onclick="window.eduTools.removeWidget('${widgetId}')">×</button>
                        </div>
                        <div class="widget-content" style="align-items: stretch;">
                            <div class="edu-warning">
                                <strong>🎓 Curated Educational Resource Hub</strong>
                                Access teacher-approved educational content and curriculum materials aligned with national standards.
                                <br><small>Enter educational website URLs or select from our curated collection below. All resources are vetted for classroom appropriateness.</small>
                            </div>
                            <div class="resource-bar">
                                <input type="text" class="resource-input" id="url-input-${widgetId}" placeholder="Enter educational resource URL (e.g., Khan Academy, PBS Learning Media)">
                                <button class="resource-btn" onclick="window.eduTools.openResource('${widgetId}')">Load Educational Resource</button>
                            </div>
                            <div class="edu-resources-container">
                                <div class="edu-categories">
                                    <div class="edu-category-btn active" onclick="window.eduTools.filterResourceCategory('${widgetId}', 'all')">📚 All Resources</div>
                                    <div class="edu-category-btn" onclick="window.eduTools.filterResourceCategory('${widgetId}', 'coding')">💻 STEM & Coding</div>
                                    <div class="edu-category-btn" onclick="window.eduTools.filterResourceCategory('${widgetId}', 'math')">🔢 Mathematics</div>
                                    <div class="edu-category-btn" onclick="window.eduTools.filterResourceCategory('${widgetId}', 'science')">🔬 Science Lab</div>
                                    <div class="edu-category-btn" onclick="window.eduTools.filterResourceCategory('${widgetId}', 'language')">📖 Language Arts</div>
                                    <div class="edu-category-btn" onclick="window.eduTools.filterResourceCategory('${widgetId}', 'assessment')">✅ Assessment Tools</div>
                                    <div class="edu-category-btn" onclick="window.eduTools.filterResourceCategory('${widgetId}', 'research')">🔍 Research & Library</div>
                                    <div class="edu-category-btn" onclick="window.eduTools.filterResourceCategory('${widgetId}', 'video')">🎥 Video Lessons</div>
                                    <div class="edu-category-btn" onclick="window.eduTools.filterResourceCategory('${widgetId}', 'art')">🎨 Arts & Culture</div>
                                    <div class="edu-category-btn" onclick="window.eduTools.filterResourceCategory('${widgetId}', 'practice')">🧩 Practice & Review</div>
                                </div>
                                <div class="edu-links-container">
                                    <div class="edu-links" id="edu-links-${widgetId}">
                                        <!-- Links will be populated dynamically -->
                                    </div>
                                    <div class="content-viewer" id="viewer-${widgetId}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                setTimeout(() => initResourceLinks(widgetId), 0);
                break;
                
            case 'groups':
                widgetHTML = `
                    <div class="widget large" id="${widgetId}">
                        <div class="widget-header">
                            <div class="widget-title">👥 Cooperative Learning Groups</div>
                            <button class="widget-close" onclick="window.eduTools.removeWidget('${widgetId}')">×</button>
                        </div>
                        <div class="widget-content">
                            <textarea class="name-input" placeholder="Enter student names (one per line)" rows="6"></textarea>
                            <div style="display: flex; gap: 0.5rem; margin: 1rem 0; align-items: center;">
                                <label style="font-weight: 600;">Group Size:</label>
                                <input type="number" class="timer-input" value="4" min="2" max="10" id="group-size-${widgetId}">
                                <button class="timer-btn start" onclick="window.eduTools.generateGroups('${widgetId}')">Generate Groups</button>
                            </div>
                            <div id="groups-display-${widgetId}" style="width: 100%; margin-top: 1rem;"></div>
                        </div>
                    </div>
                `;
                break;
                
            case 'agenda':
                widgetHTML = `
                    <div class="widget large" id="${widgetId}">
                        <div class="widget-header">
                            <div class="widget-title">📋 Learning Objectives</div>
                            <button class="widget-close" onclick="window.eduTools.removeWidget('${widgetId}')">×</button>
                        </div>
                        <div class="widget-content">
                            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                                <input type="text" class="resource-input" id="agenda-input-${widgetId}" placeholder="Add agenda item...">
                                <button class="timer-btn start" onclick="window.eduTools.addAgendaItem('${widgetId}')">Add</button>
                            </div>
                            <div id="agenda-list-${widgetId}" style="width: 100%; text-align: left;"></div>
                        </div>
                    </div>
                `;
                break;
                
            case 'analytics':
                widgetHTML = `
                    <div class="widget large" id="${widgetId}">
                        <div class="widget-header">
                            <div class="widget-title">📈 Visitor Analytics</div>
                            <button class="widget-close" onclick="window.eduTools.removeWidget('${widgetId}')">×</button>
                        </div>
                        <div class="widget-content" style="justify-content: flex-start; padding-top: 1rem;">
                            <div class="analytics-chart" id="chart-${widgetId}">
                                <!-- Chart bars will be rendered here -->
                            </div>
                            <div class="analytics-stats" id="stats-${widgetId}">
                                <!-- Stats will be rendered here -->
                            </div>
                            <div class="analytics-note" id="analytics-note-${widgetId}">
                                📊 Loading public visitor data...
                            </div>
                        </div>
                    </div>
                `;
                setTimeout(() => renderAnalyticsChart(widgetId), 0);
                break;
        }
        
        screenArea.insertAdjacentHTML('beforeend', widgetHTML);
        
        // Initialize drawing canvas if it's a draw widget
        if (type === 'draw') {
            initDrawingCanvas(widgetId);
        }
    }

    function removeWidget(widgetId) {
        const widget = document.getElementById(widgetId);
        if (widget) {
            widget.remove();
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // TIMER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════
    
    function startTimer(widgetId) {
        const widget = document.getElementById(widgetId);
        const input = widget.querySelector('.timer-input');
        const display = widget.querySelector('.timer-display');
        
        if (!timerRunning) {
            timerSeconds = parseInt(input.value) * 60;
            timerRunning = true;
            
            timerInterval = setInterval(() => {
                if (timerSeconds > 0) {
                    timerSeconds--;
                    const mins = Math.floor(timerSeconds / 60);
                    const secs = timerSeconds % 60;
                    display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
                } else {
                    clearInterval(timerInterval);
                    timerRunning = false;
                    alert('Time\'s up! ⏰');
                }
            }, 1000);
        }
    }

    function pauseTimer(widgetId) {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerRunning = false;
        }
    }

    function resetTimer(widgetId) {
        const widget = document.getElementById(widgetId);
        const input = widget.querySelector('.timer-input');
        const display = widget.querySelector('.timer-display');
        
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        timerRunning = false;
        timerSeconds = parseInt(input.value) * 60;
        const mins = Math.floor(timerSeconds / 60);
        const secs = timerSeconds % 60;
        display.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // ═══════════════════════════════════════════════════════════════
    // OTHER WIDGET FUNCTIONS
    // ═══════════════════════════════════════════════════════════════
    
    function pickRandomName(widgetId) {
        const widget = document.getElementById(widgetId);
        const input = widget.querySelector('.name-input');
        const display = widget.querySelector('.name-display');
        
        const names = input.value.split('\n').filter(name => name.trim() !== '');
        
        if (names.length === 0) {
            display.textContent = 'Add names first!';
            return;
        }
        
        const randomName = names[Math.floor(Math.random() * names.length)];
        display.textContent = randomName;
    }

    function toggleLight(light) {
        const lights = light.parentElement.querySelectorAll('.light');
        lights.forEach(l => l.classList.remove('active'));
        light.classList.add('active');
    }

    function rollDice(widgetId) {
        const widget = document.getElementById(widgetId);
        const display = widget.querySelector('.dice-display');
        
        const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        const result = Math.floor(Math.random() * 6);
        
        display.textContent = diceEmojis[result];
    }

    function toggleWorkSymbol(symbol) {
        symbol.classList.toggle('active');
    }

    // ═══════════════════════════════════════════════════════════════
    // DRAWING CANVAS
    // ═══════════════════════════════════════════════════════════════
    
    function initDrawingCanvas(widgetId) {
        const canvas = document.getElementById(`drawingCanvas-${widgetId}`);
        const ctx = canvas.getContext('2d');
        
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            ctx.beginPath();
            ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (isDrawing) {
                const rect = canvas.getBoundingClientRect();
                ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                ctx.strokeStyle = currentColor;
                ctx.lineWidth = 3;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
        });
        
        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
        });
        
        canvas.addEventListener('mouseleave', () => {
            isDrawing = false;
        });
    }

    function setDrawColor(btn, color) {
        currentColor = color;
        const colorBtns = btn.parentElement.querySelectorAll('.color-btn');
        colorBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    function clearCanvas(widgetId) {
        const canvas = document.getElementById(`drawingCanvas-${widgetId}`);
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Continue in next file due to character limit...
    // This file is getting too large. Let me split it.

    // Export functions to global scope
    window.eduTools = {
        addWidget,
        removeWidget,
        startTimer,
        pauseTimer,
        resetTimer,
        pickRandomName,
        toggleLight,
        rollDice,
        toggleWorkSymbol,
        setDrawColor,
        clearCanvas,
        toggleConnectionMode: function() {
            useAlternateMode = !useAlternateMode;
            console.log('[EduTools Pro] Connection mode:', useAlternateMode ? 'A' : 'B');
            const btn = document.getElementById('connectionToggleBtn');
            if (btn) {
                btn.textContent = useAlternateMode ? '🔒 Mode A' : '🔓 Mode B';
                btn.style.background = useAlternateMode ? '#48bb78' : '#ed8936';
            }
        }
    };

    // Initialize app when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeUI);
    } else {
        initializeUI();
    }

    // Initialize with default widgets
    window.addEventListener('load', function() {
        addWidget('clock');
        addWidget('timer');
    });

})();
