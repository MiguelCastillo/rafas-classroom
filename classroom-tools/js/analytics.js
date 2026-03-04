// EduTools Pro - Analytics Module

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════
    // LOCAL VISITOR TRACKING
    // ═══════════════════════════════════════════════════════════════
    
    function getDateKey(date) {
        return date.toISOString().split('T')[0];
    }

    function getVisitorData() {
        const stored = localStorage.getItem('edutools_visitor_data');
        return stored ? JSON.parse(stored) : {};
    }

    function saveVisitorData(data) {
        localStorage.setItem('edutools_visitor_data', JSON.stringify(data));
    }

    function trackVisit() {
        const today = getDateKey(new Date());
        const data = getVisitorData();
        
        if (!data[today]) {
            data[today] = 0;
        }
        data[today]++;
        
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const cutoffKey = getDateKey(thirtyDaysAgo);
        
        Object.keys(data).forEach(key => {
            if (key < cutoffKey) {
                delete data[key];
            }
        });
        
        saveVisitorData(data);
    }

    function getLast7DaysData() {
        const data = getVisitorData();
        const days = [];
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const key = getDateKey(date);
            const dayName = dayNames[date.getDay()];
            
            days.push({
                date: key,
                dayName: dayName,
                visits: data[key] || 0,
                isToday: i === 0
            });
        }
        
        return days;
    }

    // ═══════════════════════════════════════════════════════════════
    // PUBLIC VISITOR COUNTER
    // ═══════════════════════════════════════════════════════════════
    
    async function updatePublicVisitorCount() {
        const counterElement = document.getElementById('visitorCount');
        const namespace = 'rafas-classroom-edutools';
        const key = 'visitors-v2';
        
        // One count per device/browser (localStorage = same across tabs)
        const alreadyCounted = localStorage.getItem('edutools_device_counted');
        
        try {
            let count;
            let response;
            
            if (alreadyCounted) {
                response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}`);
            } else {
                response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
            }
            
            if (response.ok) {
                const data = await response.json();
                count = data.count || 0;
                
                if (!alreadyCounted) {
                    localStorage.setItem('edutools_device_counted', 'true');
                }
                
                localStorage.setItem('edutools_last_count', count.toString());
                
                animateCounter(counterElement, count);
            } else {
                const lastCount = localStorage.getItem('edutools_last_count');
                if (lastCount) {
                    animateCounter(counterElement, parseInt(lastCount));
                } else {
                    counterElement.textContent = '—';
                }
            }
        } catch (error) {
            console.log('[EduTools Pro] Counter service unavailable:', error);
            const lastCount = localStorage.getItem('edutools_last_count');
            if (lastCount) {
                counterElement.textContent = parseInt(lastCount).toLocaleString();
            } else {
                counterElement.textContent = '—';
            }
        }
    }

    function animateCounter(element, target) {
        const duration = 1000;
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeProgress = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(start + (target - start) * easeProgress);
            
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString();
            }
        }
        
        requestAnimationFrame(update);
    }

    // ═══════════════════════════════════════════════════════════════
    // ANALYTICS WIDGET
    // ═══════════════════════════════════════════════════════════════
    
    async function renderAnalyticsChart(widgetId) {
        const chartContainer = document.getElementById('chart-' + widgetId);
        const statsContainer = document.getElementById('stats-' + widgetId);
        const noteContainer = document.getElementById('analytics-note-' + widgetId);
        const days = getLast7DaysData();
        
        let publicTotal = '...';
        try {
            const namespace = 'rafas-classroom-edutools';
            const key = 'visitors-v2';
            const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}`);
            if (response.ok) {
                const data = await response.json();
                publicTotal = (data.count || 0).toLocaleString();
            }
        } catch (e) {
            publicTotal = '—';
        }
        
        const maxVisits = Math.max(...days.map(d => d.visits), 1);
        const maxHeight = 160;
        
        const localTotal = days.reduce((sum, d) => sum + d.visits, 0);
        const avgVisits = (localTotal / 7).toFixed(1);
        const todayVisits = days[days.length - 1].visits;
        
        let chartHTML = '';
        days.forEach(day => {
            const barHeight = Math.max((day.visits / maxVisits) * maxHeight, 4);
            const barColor = day.isToday ? 'background: linear-gradient(180deg, #48bb78 0%, #38a169 100%);' : '';
            
            chartHTML += `
                <div class="chart-bar-container">
                    <div class="chart-bar" style="height: ${barHeight}px; ${barColor}">
                        <span class="chart-bar-value">${day.visits}</span>
                    </div>
                    <span class="chart-day">${day.isToday ? 'Today' : day.dayName}</span>
                </div>
            `;
        });
        chartContainer.innerHTML = chartHTML;
        
        statsContainer.innerHTML = `
            <div class="stat-card" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-color: #667eea;">
                <div class="stat-value" style="color: white; font-size: 2rem;">${publicTotal}</div>
                <div class="stat-label" style="color: rgba(255,255,255,0.9);">Total Visitors 🌍</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${todayVisits}</div>
                <div class="stat-label">Your Visits Today</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${localTotal}</div>
                <div class="stat-label">Your Last 7 Days</div>
            </div>
        `;
        
        noteContainer.innerHTML = '🌍 <strong>Total Visitors</strong> = everyone who visited • 📊 <strong>Chart</strong> = your personal visits';
    }

    // ═══════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════
    
    // Track this visit
    trackVisit();

    // Update public counter when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updatePublicVisitorCount);
    } else {
        updatePublicVisitorCount();
    }

    // Export to global scope
    window.eduTools = window.eduTools || {};
    Object.assign(window.eduTools, {
        renderAnalyticsChart
    });

})();
