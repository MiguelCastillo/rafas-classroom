// Dynamic Styles Injection for EduTools Pro
(function() {
    const styles = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            overflow: hidden;
            position: relative;
        }

        /* Header */
        .header {
            background: rgba(255, 255, 255, 0.95);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            position: relative;
            z-index: 100;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: #667eea;
        }

        .widget-menu {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .widget-btn {
            padding: 0.6rem 1.2rem;
            background: white;
            border: 2px solid #667eea;
            border-radius: 25px;
            color: #667eea;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .widget-btn:hover {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
        }

        .widget-btn.active {
            background: #667eea;
            color: white;
        }

        /* Main Screen Area */
        .screen-area {
            height: calc(100vh - 120px);
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            padding: 1rem;
            overflow-y: auto;
        }

        /* Widget Cards */
        .widget {
            background: white;
            border-radius: 15px;
            padding: 1.5rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            position: relative;
            display: flex;
            flex-direction: column;
            min-height: 250px;
        }

        .widget.large {
            grid-column: span 2;
        }

        .widget.full {
            grid-column: 1 / -1;
            min-height: 400px;
        }

        .widget-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 0.75rem;
            border-bottom: 2px solid #f0f0f0;
        }

        .widget-title {
            font-size: 1.2rem;
            font-weight: 700;
            color: #2d3748;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .widget-close {
            background: #f56565;
            color: white;
            border: none;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            cursor: pointer;
            font-size: 1.2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }

        .widget-close:hover {
            background: #e53e3e;
            transform: scale(1.1);
        }

        .widget-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        /* Timer Widget */
        .timer-display {
            font-size: 4rem;
            font-weight: 700;
            color: #667eea;
            margin-bottom: 1rem;
        }

        .timer-controls {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            justify-content: center;
        }

        .timer-btn {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }

        .timer-btn.start {
            background: #48bb78;
            color: white;
        }

        .timer-btn.pause {
            background: #ed8936;
            color: white;
        }

        .timer-btn.reset {
            background: #e53e3e;
            color: white;
        }

        .timer-btn:hover {
            transform: scale(1.05);
        }

        .timer-input {
            padding: 0.5rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            width: 80px;
            text-align: center;
            font-size: 1rem;
        }

        /* Clock Widget */
        .clock-display {
            font-size: 4rem;
            font-weight: 700;
            color: #764ba2;
        }

        .date-display {
            font-size: 1.2rem;
            color: #718096;
            margin-top: 0.5rem;
        }

        /* Random Name Picker */
        .name-display {
            font-size: 3rem;
            font-weight: 700;
            color: #667eea;
            margin: 2rem 0;
            min-height: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .name-input {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 1rem;
        }

        /* Text Area Widget */
        .text-area {
            width: 100%;
            flex: 1;
            padding: 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
            resize: none;
            font-family: inherit;
        }

        /* Traffic Light Widget */
        .traffic-light {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            align-items: center;
        }

        .light {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 3px solid #2d3748;
            cursor: pointer;
            transition: all 0.3s;
            opacity: 0.3;
        }

        .light.active {
            opacity: 1;
            box-shadow: 0 0 30px currentColor;
        }

        .light.red {
            background: #fc8181;
            color: #fc8181;
        }

        .light.yellow {
            background: #fbd38d;
            color: #fbd38d;
        }

        .light.green {
            background: #68d391;
            color: #68d391;
        }

        /* Dice Widget */
        .dice-display {
            font-size: 6rem;
            margin: 2rem 0;
        }

        /* Work Symbols */
        .work-symbols {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            width: 100%;
        }

        .work-symbol {
            padding: 1.5rem;
            border: 3px solid #e2e8f0;
            border-radius: 12px;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 3rem;
        }

        .work-symbol:hover {
            border-color: #667eea;
            transform: scale(1.05);
        }

        .work-symbol.active {
            border-color: #667eea;
            background: #eef2ff;
        }

        .work-label {
            font-size: 0.9rem;
            margin-top: 0.5rem;
            color: #4a5568;
            font-weight: 600;
        }

        /* Drawing Canvas */
        #drawingCanvas {
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            cursor: crosshair;
            background: white;
        }

        .drawing-controls {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
            flex-wrap: wrap;
        }

        .color-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 3px solid #e2e8f0;
            cursor: pointer;
            transition: all 0.2s;
        }

        .color-btn:hover, .color-btn.active {
            transform: scale(1.2);
            border-color: #2d3748;
        }

        /* Resource Viewer Widget */
        .resource-bar {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }

        .resource-input {
            flex: 1;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 0.9rem;
        }

        .resource-btn {
            padding: 0.75rem 1.5rem;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }

        .resource-btn:hover {
            background: #5a67d8;
        }

        .content-viewer {
            width: 100%;
            height: 400px;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            background: white;
        }

        /* Expanded View */
        .view-expanded {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            z-index: 2000 !important;
            background: white !important;
            padding: 0 !important;
            border-radius: 0 !important;
            margin: 0 !important;
            grid-column: unset !important;
        }

        .view-expanded .widget-content {
            height: 100% !important;
        }

        .view-expanded .content-viewer {
            height: calc(100vh - 120px) !important;
            border-radius: 0 !important;
        }

        .view-expanded .edu-resources-container {
            display: flex !important;
            flex-direction: column !important;
        }

        .view-expanded .edu-categories {
            display: none !important;
        }

        .view-expanded .edu-links {
            display: none !important;
        }

        .view-expanded .edu-warning {
            display: none !important;
        }

        .view-expanded .edu-links-container {
            height: 100% !important;
        }

        .view-expanded .widget-header {
            background: #2d3748;
            color: white;
            padding: 1rem 2rem;
            margin: 0;
            border-bottom: none;
        }

        .view-expanded .widget-title {
            color: white;
        }

        .view-expanded .widget-close {
            background: #e53e3e;
        }

        .collapse-view {
            background: #f59e0b;
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0.5rem 1rem;
            cursor: pointer;
            font-weight: 600;
            margin-left: 1rem;
        }

        .collapse-view:hover {
            background: #d97706;
        }

        /* Educational Links */
        .edu-resources-container {
            display: flex;
            gap: 1rem;
            width: 100%;
            height: 100%;
        }

        .edu-categories {
            width: 200px;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            overflow-y: auto;
        }

        .edu-category-btn {
            padding: 0.75rem 1rem;
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s;
            font-weight: 600;
            color: #4a5568;
        }

        .edu-category-btn:hover {
            border-color: #667eea;
            background: #f7fafc;
        }

        .edu-category-btn.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }

        .edu-links-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .edu-links {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 0.5rem;
            width: 100%;
        }

        .edu-link-btn {
            padding: 1rem;
            background: #eef2ff;
            border: 2px solid #667eea;
            border-radius: 8px;
            cursor: pointer;
            text-align: center;
            transition: all 0.2s;
        }

        .edu-link-btn:hover {
            background: #667eea;
            color: white;
            transform: translateY(-2px);
        }

        .edu-link-icon {
            font-size: 2rem;
            margin-bottom: 0.5rem;
        }

        .edu-link-name {
            font-size: 0.8rem;
            font-weight: 600;
        }

        /* Educational Resource Warning */
        .edu-warning {
            background: #eef2ff;
            border: 2px solid #667eea;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            text-align: center;
            color: #4a5568;
            font-size: 0.9rem;
        }

        .edu-warning strong {
            color: #667eea;
            display: block;
            margin-bottom: 0.5rem;
        }

        /* Footer */
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.9);
            padding: 0.5rem 1rem;
            text-align: center;
            font-size: 0.85rem;
            color: #4a5568;
            z-index: 99;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 0.5rem;
        }

        .visitor-counter {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-weight: 600;
            font-size: 0.8rem;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
        }

        #visitorCount {
            font-weight: 700;
            min-width: 30px;
            text-align: center;
        }

        .footer-divider {
            color: #cbd5e0;
            margin: 0 0.25rem;
        }

        /* Analytics Widget */
        .analytics-chart {
            width: 100%;
            height: 200px;
            display: flex;
            align-items: flex-end;
            justify-content: space-around;
            gap: 0.5rem;
            padding: 1rem 0;
            border-bottom: 2px solid #e2e8f0;
            margin-bottom: 1rem;
        }

        .chart-bar-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            max-width: 60px;
        }

        .chart-bar {
            width: 100%;
            background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
            border-radius: 6px 6px 0 0;
            min-height: 4px;
            transition: height 0.5s ease-out;
            position: relative;
        }

        .chart-bar:hover {
            filter: brightness(1.1);
        }

        .chart-bar-value {
            position: absolute;
            top: -24px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 0.75rem;
            font-weight: 700;
            color: #667eea;
            background: white;
            padding: 2px 6px;
            border-radius: 4px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .chart-day {
            font-size: 0.75rem;
            color: #718096;
            margin-top: 0.5rem;
            font-weight: 600;
        }

        .analytics-stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            width: 100%;
        }

        .stat-card {
            background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
            padding: 1rem;
            border-radius: 10px;
            text-align: center;
            border: 2px solid #e2e8f0;
        }

        .stat-value {
            font-size: 1.75rem;
            font-weight: 700;
            color: #667eea;
        }

        .stat-label {
            font-size: 0.8rem;
            color: #718096;
            margin-top: 0.25rem;
            font-weight: 600;
        }

        .analytics-note {
            font-size: 0.75rem;
            color: #a0aec0;
            text-align: center;
            margin-top: 1rem;
            font-style: italic;
        }

        /* Screen Reader Only */
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        @media (max-width: 768px) {
            .screen-area {
                grid-template-columns: 1fr;
            }

            .widget.large, .widget.full {
                grid-column: 1;
            }

            .widget-menu {
                justify-content: center;
            }

            .header {
                flex-direction: column;
                gap: 1rem;
            }
        }
    `;

    // Inject styles into document
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
})();
