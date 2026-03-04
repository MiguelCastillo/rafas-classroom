// EduTools Pro - Content Module

(function() {
    'use strict';

    // Server configuration
    const CONTENT_SERVER = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000'
        : 'https://your-server.herokuapp.com';
    
    let useAlternateMode = true;

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

    // Resource loading functions
    function openResource(widgetId) {
        const widget = document.getElementById(widgetId);
        const input = widget.querySelector('.resource-input');
        const container = document.getElementById('viewer-' + widgetId);
        let url = input.value.trim();
        
        if (!url) {
            return;
        }
        
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            url = 'https://' + url;
        }
        
        let urlObj;
        try {
            urlObj = new URL(url);
        } catch (e) {
            alert('⚠️ Please enter a valid URL.');
            return;
        }
        
        const hostname = urlObj.hostname.toLowerCase().replace(/^www\./, '');
        
        console.log('[EduTools Pro] Loading educational resource:', hostname);
        
        if (useAlternateMode) {
            loadContentViaServer(widgetId, url, hostname);
        } else {
            loadContentInIframe(widgetId, url, hostname);
        }
    }

    async function loadContentViaServer(widgetId, url, hostname) {
        const container = document.getElementById('viewer-' + widgetId);
        
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #667eea;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">⏳</div>
                <div style="font-size: 1.2rem; font-weight: 600;">Loading content...</div>
                <div style="font-size: 0.9rem; color: #718096; margin-top: 0.5rem;">${hostname}</div>
            </div>
        `;
        
        try {
            const response = await fetch(`${CONTENT_SERVER}/api/content`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url: url })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.details || error.error || 'Request failed');
            }

            const content = await response.text();
            
            container.innerHTML = '';
            const iframe = document.createElement('iframe');
            iframe.className = 'content-viewer';
            iframe.title = 'Resource Viewer';
            iframe.style.cssText = 'width:100%;height:100%;border:2px solid #e2e8f0;border-radius:8px;';
            iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-presentation allow-popups allow-popups-to-escape-sandbox allow-downloads allow-modals');
            
            container.appendChild(iframe);
            
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(content);
            iframe.contentWindow.document.close();
            
            console.log('[EduTools Pro] Successfully loaded:', hostname);
            expandView(widgetId);
            
        } catch (error) {
            console.error('[EduTools Pro] Loading error:', error);
            
            container.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <div style="font-size: 1.2rem; font-weight: 600; color: #e53e3e; margin-bottom: 1rem;">Loading Error</div>
                    <div style="font-size: 0.9rem; color: #718096; margin-bottom: 1rem;">${error.message}</div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button onclick="window.eduTools.loadContentInIframe('${widgetId}', '${url}', '${hostname}')" class="timer-btn start">
                            Try Direct Connection
                        </button>
                        <button onclick="window.eduTools.openResource('${widgetId}')" class="timer-btn start" style="background: #667eea;">
                            Retry
                        </button>
                    </div>
                    <div style="font-size: 0.8rem; color: #a0aec0; margin-top: 1rem;">
                        💡 Tip: Check your internet connection or try a different resource
                    </div>
                </div>
            `;
        }
    }

    function loadContentInIframe(widgetId, url, hostname) {
        const container = document.getElementById('viewer-' + widgetId);
        
        container.innerHTML = '';
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.className = 'content-viewer';
        iframe.title = 'Resource Viewer';
        iframe.style.cssText = 'width:100%;height:100%;border:2px solid #e2e8f0;border-radius:8px;';
        
        iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-presentation allow-popups allow-popups-to-escape-sandbox allow-downloads allow-modals');
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        iframe.setAttribute('loading', 'lazy');
        iframe.setAttribute('allow', 'fullscreen; autoplay; clipboard-write; encrypted-media; picture-in-picture');
        
        iframe.addEventListener('load', function() {
            console.log('[EduTools Pro] Educational resource loaded:', url);
            expandView(widgetId);
        });
        
        iframe.addEventListener('error', function() {
            console.error('[EduTools Pro] Resource loading error:', url);
            container.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🚫</div>
                    <div style="font-size: 1.2rem; font-weight: 600; color: #e53e3e; margin-bottom: 1rem;">Cannot Load Resource</div>
                    <div style="font-size: 0.9rem; color: #718096; margin-bottom: 1rem;">
                        This site blocks embedding or is unavailable.
                    </div>
                    <button onclick="window.eduTools.openResource('${widgetId}')" class="timer-btn start" style="background: #667eea;">
                        Try Alternate Method
                    </button>
                </div>
            `;
        });
        
        container.appendChild(iframe);
    }

    function initResourceLinks(widgetId) {
        filterResourceCategory(widgetId, 'all');
    }

    function filterResourceCategory(widgetId, category) {
        const widget = document.getElementById(widgetId);
        const linksContainer = document.getElementById('edu-links-' + widgetId);
        const categoryBtns = widget.querySelectorAll('.edu-category-btn');
        
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');
        
        let linksHTML = '';
        
        if (category === 'all') {
            Object.keys(educationalResources).forEach(cat => {
                educationalResources[cat].forEach(resource => {
                    linksHTML += createResourceLink(widgetId, resource);
                });
            });
        } else {
            if (educationalResources[category]) {
                educationalResources[category].forEach(resource => {
                    linksHTML += createResourceLink(widgetId, resource);
                });
            }
        }
        
        linksContainer.innerHTML = linksHTML;
    }

    function createResourceLink(widgetId, resource) {
        return `
            <div class="edu-link-btn" onclick="window.eduTools.viewEduLink('${widgetId}', '${resource.url}')">
                <div class="edu-link-icon">${resource.icon}</div>
                <div class="edu-link-name">${resource.name}</div>
            </div>
        `;
    }

    function viewEduLink(widgetId, url) {
        const widget = document.getElementById(widgetId);
        const input = widget.querySelector('.resource-input');
        input.value = url;
        openResource(widgetId);
    }

    function expandView(widgetId) {
        const widget = document.getElementById(widgetId);
        const collapseBtn = widget.querySelector('.collapse-view');
        
        widget.classList.add('view-expanded');
        if (collapseBtn) {
            collapseBtn.style.display = 'inline-block';
        }
    }

    function toggleExpanded(widgetId) {
        const widget = document.getElementById(widgetId);
        const collapseBtn = widget.querySelector('.collapse-view');
        const viewer = document.getElementById('viewer-' + widgetId);
        
        widget.classList.remove('view-expanded');
        if (collapseBtn) {
            collapseBtn.style.display = 'none';
        }
        
        if (viewer) {
            viewer.innerHTML = '';
        }
    }

    function toggleConnectionMode() {
        useAlternateMode = !useAlternateMode;
        console.log('[EduTools Pro] Content delivery method:', useAlternateMode ? 'Enhanced' : 'Standard');
        const btn = document.getElementById('connectionToggleBtn');
        if (btn) {
            btn.textContent = useAlternateMode ? '🔒 Enhanced' : '🔓 Standard';
            btn.style.background = useAlternateMode ? '#48bb78' : '#ed8936';
        }
    }

    // Generate groups function
    function generateGroups(widgetId) {
        const widget = document.getElementById(widgetId);
        const input = widget.querySelector('.name-input');
        const groupSize = parseInt(document.getElementById('group-size-' + widgetId).value);
        const display = document.getElementById('groups-display-' + widgetId);
        
        const names = input.value.split('\n').filter(name => name.trim() !== '');
        
        if (names.length === 0) {
            display.innerHTML = '<p style="color: #e53e3e;">Please add student names first!</p>';
            return;
        }
        
        if (groupSize < 2) {
            display.innerHTML = '<p style="color: #e53e3e;">Group size must be at least 2!</p>';
            return;
        }
        
        const shuffled = names.sort(() => Math.random() - 0.5);
        const groups = [];
        
        for (let i = 0; i < shuffled.length; i += groupSize) {
            groups.push(shuffled.slice(i, i + groupSize));
        }
        
        let html = '<div style="display: grid; gap: 1rem;">';
        groups.forEach((group, index) => {
            html += `
                <div style="background: #eef2ff; padding: 1rem; border-radius: 8px; border: 2px solid #667eea;">
                    <strong style="color: #667eea;">Group ${index + 1}</strong>
                    <ul style="margin: 0.5rem 0 0 1.5rem;">
                        ${group.map(name => `<li>${name}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        html += '</div>';
        
        display.innerHTML = html;
    }

    // Agenda functions
    let agendaItems = {};
    
    function addAgendaItem(widgetId) {
        const input = document.getElementById('agenda-input-' + widgetId);
        const text = input.value.trim();
        
        if (!text) return;
        
        if (!agendaItems[widgetId]) {
            agendaItems[widgetId] = [];
        }
        
        agendaItems[widgetId].push({
            text: text,
            completed: false,
            id: Date.now()
        });
        
        input.value = '';
        renderAgenda(widgetId);
    }
    
    function renderAgenda(widgetId) {
        const display = document.getElementById('agenda-list-' + widgetId);
        const items = agendaItems[widgetId] || [];
        
        if (items.length === 0) {
            display.innerHTML = '<p style="color: #718096; text-align: center;">No agenda items yet</p>';
            return;
        }
        
        let html = '<div style="display: flex; flex-direction: column; gap: 0.5rem;">';
        items.forEach((item, index) => {
            html += `
                <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; background: ${item.completed ? '#f0fdf4' : '#f9fafb'}; border-radius: 8px; border: 2px solid ${item.completed ? '#10b981' : '#e2e8f0'};">
                    <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="window.eduTools.toggleAgendaItem('${widgetId}', ${index})" style="width: 20px; height: 20px; cursor: pointer;">
                    <span style="flex: 1; ${item.completed ? 'text-decoration: line-through; color: #718096;' : ''}">${item.text}</span>
                    <button onclick="window.eduTools.deleteAgendaItem('${widgetId}', ${index})" style="background: #e53e3e; color: white; border: none; padding: 0.25rem 0.5rem; border-radius: 4px; cursor: pointer;">Delete</button>
                </div>
            `;
        });
        html += '</div>';
        
        display.innerHTML = html;
    }
    
    function toggleAgendaItem(widgetId, index) {
        if (agendaItems[widgetId] && agendaItems[widgetId][index]) {
            agendaItems[widgetId][index].completed = !agendaItems[widgetId][index].completed;
            renderAgenda(widgetId);
        }
    }
    
    function deleteAgendaItem(widgetId, index) {
        if (agendaItems[widgetId]) {
            agendaItems[widgetId].splice(index, 1);
            renderAgenda(widgetId);
        }
    }

    // Export to global scope
    window.eduTools = window.eduTools || {};
    Object.assign(window.eduTools, {
        openResource,
        loadContentInIframe,
        filterResourceCategory,
        viewEduLink,
        toggleExpanded,
        toggleConnectionMode,
        generateGroups,
        addAgendaItem,
        toggleAgendaItem,
        deleteAgendaItem
    });

})();
