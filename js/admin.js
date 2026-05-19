// Admin Panel - Pure Vanilla JS (No HTML/CSS files)
// All HTML and CSS are generated from this file

(function() {
    'use strict';

    // Supabase Configuration
    const SUPABASE_URL = 'https://ktnxwyuukscetpoxjety.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0bnh3eXV1a3NjZXRwb3hqZXR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NTc5NjYsImV4cCI6MjA5NDAzMzk2Nn0.D2Nv_5FSwl9-4B0zTEsrLyIKOi-75Qq41TFp82nyLt0';

    // Load Argon2 library with Promise-based onload detection
    let argon2ReadyPromise = null;
    function loadArgon2Library() {
        if (argon2ReadyPromise) return argon2ReadyPromise;
        argon2ReadyPromise = new Promise((resolve, reject) => {
            if (window.argon2) { resolve(); return; }
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/argon2-browser@1.18.0/dist/argon2-bundled.min.js';
            script.onload = () => {
                let attempts = 0;
                const check = () => {
                    if (window.argon2) { resolve(); return; }
                    if (attempts++ > 100) { reject(new Error('argon2 init timeout')); return; }
                    setTimeout(check, 100);
                };
                check();
            };
            script.onerror = () => reject(new Error('Failed to load argon2 library'));
            document.head.appendChild(script);
        });
        return argon2ReadyPromise;
    }
    loadArgon2Library();

    // Generate CSS
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@600;700&display=swap');

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                background: #0a0a0a;
                color: #ffffff;
                min-height: 100vh;
            }

            /* ===== ANIMATIONS ===== */
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @keyframes slideDown {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }

            @keyframes shimmer {
                0% { background-position: -200px 0; }
                100% { background-position: calc(200px + 100%) 0; }
            }

            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            @keyframes glow {
                0%, 100% { box-shadow: 0 0 20px rgba(221, 186, 94, 0.2); }
                50% { box-shadow: 0 0 40px rgba(221, 186, 94, 0.4); }
            }

            @keyframes gradientShift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            /* ===== LOGIN PAGE ===== */
            .login-container {
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #0a0a0a;
                padding: 20px;
                position: relative;
                overflow: hidden;
            }

            .login-container::before {
                content: '';
                position: absolute;
                top: -50%;
                left: -50%;
                width: 200%;
                height: 200%;
                background:
                    radial-gradient(ellipse at 20% 50%, rgba(221, 186, 94, 0.08) 0%, transparent 50%),
                    radial-gradient(ellipse at 80% 50%, rgba(221, 186, 94, 0.05) 0%, transparent 50%),
                    radial-gradient(ellipse at 50% 0%, rgba(221, 186, 94, 0.03) 0%, transparent 30%);
                animation: gradientShift 15s ease infinite;
                background-size: 200% 200%;
                pointer-events: none;
            }

            .login-container::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background:
                    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px);
                pointer-events: none;
            }

            .login-card {
                background: linear-gradient(135deg, rgba(20, 20, 20, 0.95), rgba(10, 10, 10, 0.98));
                border: 1px solid rgba(221, 186, 94, 0.25);
                border-radius: 24px;
                padding: 50px 45px;
                width: 100%;
                max-width: 420px;
                box-shadow:
                    0 30px 60px rgba(0, 0, 0, 0.6),
                    inset 0 1px 0 rgba(221, 186, 94, 0.1);
                position: relative;
                z-index: 1;
                animation: fadeIn 0.6s ease-out;
            }

            .login-card::before {
                content: '';
                position: absolute;
                top: -1px;
                left: -1px;
                right: -1px;
                height: 3px;
                background: linear-gradient(90deg, transparent, #DDA95E, #F4E4BC, #DDA95E, transparent);
                border-radius: 24px 24px 0 0;
                background-size: 200% 100%;
                animation: shimmer 3s ease-in-out infinite;
            }

            .login-header {
                text-align: center;
                margin-bottom: 35px;
            }

            .login-logo-icon {
                width: 70px;
                height: 70px;
                margin: 0 auto 20px;
                background: linear-gradient(135deg, #DDA95E, #F4E4BC);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.8rem;
                color: #0a0a0a;
                box-shadow: 0 10px 30px rgba(221, 186, 94, 0.3);
                animation: float 3s ease-in-out infinite;
            }

            .login-header h1 {
                font-family: 'Playfair Display', serif;
                font-size: 1.8rem;
                background: linear-gradient(135deg, #DDA95E, #F4E4BC);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 8px;
                letter-spacing: 0.5px;
            }

            .login-header p {
                color: #666;
                font-size: 0.95rem;
                font-weight: 300;
            }

            .login-header p i {
                color: #DDA95E;
                margin: 0 5px;
            }

            .login-form {
                display: flex;
                flex-direction: column;
                gap: 18px;
            }

            .form-group {
                display: flex;
                flex-direction: column;
                gap: 6px;
            }

            .form-group label {
                color: #DDA95E;
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .input-wrapper {
                position: relative;
            }

            .input-wrapper i {
                position: absolute;
                left: 16px;
                top: 50%;
                transform: translateY(-50%);
                color: #555;
                font-size: 1rem;
                transition: color 0.3s ease;
                pointer-events: none;
            }

            .input-wrapper:focus-within i {
                color: #DDA95E;
            }

            .form-group input {
                width: 100%;
                padding: 14px 16px 14px 44px;
                background: rgba(10, 10, 10, 0.8);
                border: 1.5px solid rgba(221, 186, 94, 0.2);
                border-radius: 12px;
                color: #ffffff;
                font-size: 0.95rem;
                transition: all 0.3s ease;
                font-family: 'Inter', sans-serif;
            }

            .form-group input:focus {
                outline: none;
                border-color: #DDA95E;
                box-shadow: 0 0 0 3px rgba(221, 186, 94, 0.1);
                background: rgba(10, 10, 10, 0.95);
            }

            .form-group input::placeholder {
                color: #444;
                font-weight: 300;
            }

            .login-btn {
                padding: 15px 30px;
                background: linear-gradient(135deg, #DDA95E, #c8953e, #DDA95E);
                background-size: 200% 100%;
                border: none;
                border-radius: 12px;
                color: #0a0a0a;
                font-size: 1rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.4s ease;
                margin-top: 8px;
                letter-spacing: 0.5px;
                position: relative;
                overflow: hidden;
            }

            .login-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s ease;
            }

            .login-btn:hover::before {
                left: 100%;
            }

            .login-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 12px 35px rgba(221, 186, 94, 0.3);
                background-position: 100% 0;
            }

            .login-btn:active {
                transform: translateY(0);
            }

            .login-btn:disabled {
                opacity: 0.6;
                cursor: not-allowed;
                transform: none !important;
                box-shadow: none !important;
            }

            .login-error {
                background: rgba(244, 67, 54, 0.1);
                border: 1px solid rgba(244, 67, 54, 0.25);
                color: #ef5350;
                padding: 12px 16px;
                border-radius: 10px;
                font-size: 0.85rem;
                display: none;
                animation: slideDown 0.3s ease;
            }

            .login-error.show {
                display: block;
            }

            .login-footer-text {
                text-align: center;
                margin-top: 5px;
                color: #444;
                font-size: 0.75rem;
                font-weight: 300;
            }

            /* ===== ADMIN CONTAINER ===== */
            .admin-container {
                display: flex;
                min-height: 100vh;
            }

            .admin-panel {
                display: none;
            }

            .admin-panel.active {
                display: flex;
            }

            /* ===== SIDEBAR ===== */
            .admin-sidebar {
                width: 270px;
                background: linear-gradient(180deg, #111 0%, #0a0a0a 100%);
                border-right: 1px solid rgba(221, 186, 94, 0.15);
                padding: 0;
                position: fixed;
                height: 100vh;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                z-index: 10;
            }

            .admin-sidebar::-webkit-scrollbar {
                width: 4px;
            }

            .admin-sidebar::-webkit-scrollbar-track {
                background: transparent;
            }

            .admin-sidebar::-webkit-scrollbar-thumb {
                background: rgba(221, 186, 94, 0.3);
                border-radius: 4px;
            }

            .admin-logo {
                padding: 28px 25px;
                border-bottom: 1px solid rgba(221, 186, 94, 0.12);
                margin-bottom: 20px;
                text-align: center;
            }

            .admin-logo .logo-icon {
                width: 45px;
                height: 45px;
                margin: 0 auto 12px;
                background: linear-gradient(135deg, #DDA95E, #F4E4BC);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.3rem;
                color: #0a0a0a;
            }

            .admin-logo h1 {
                font-family: 'Playfair Display', serif;
                font-size: 1.5rem;
                background: linear-gradient(135deg, #DDA95E, #F4E4BC);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 3px;
                letter-spacing: 0.5px;
            }

            .admin-logo p {
                color: #555;
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-weight: 300;
            }

            .admin-nav {
                list-style: none;
                flex: 1;
                padding: 0 12px;
            }

            .admin-nav li {
                margin-bottom: 2px;
            }

            .admin-nav a {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 16px;
                color: #888;
                text-decoration: none;
                transition: all 0.25s ease;
                border-radius: 10px;
                font-size: 0.9rem;
                font-weight: 500;
                position: relative;
            }

            .admin-nav a:hover {
                background: rgba(221, 186, 94, 0.08);
                color: #ddd;
            }

            .admin-nav a.active {
                background: rgba(221, 186, 94, 0.12);
                color: #DDA95E;
                font-weight: 600;
            }

            .admin-nav a i {
                width: 20px;
                text-align: center;
                font-size: 1rem;
                color: inherit;
                transition: all 0.3s ease;
            }

            .admin-nav a.active i {
                color: #DDA95E;
            }

            .admin-nav a .nav-badge {
                margin-left: auto;
                background: rgba(221, 186, 94, 0.15);
                color: #DDA95E;
                font-size: 0.7rem;
                padding: 2px 8px;
                border-radius: 10px;
                font-weight: 600;
            }

            .admin-nav-divider {
                height: 1px;
                background: rgba(221, 186, 94, 0.1);
                margin: 12px 16px;
            }

            .logout-btn {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 16px;
                margin: 8px 12px 16px;
                color: #666;
                background: none;
                border: 1px solid rgba(255, 107, 107, 0.15);
                border-radius: 10px;
                width: auto;
                cursor: pointer;
                font-size: 0.85rem;
                font-family: 'Inter', sans-serif;
                transition: all 0.25s ease;
            }

            .logout-btn:hover {
                background: rgba(255, 107, 107, 0.08);
                color: #ff6b6b;
                border-color: rgba(255, 107, 107, 0.3);
            }

            .logout-btn i {
                width: 20px;
                text-align: center;
                font-size: 1rem;
            }

            /* ===== MAIN CONTENT ===== */
            .admin-main {
                flex: 1;
                margin-left: 270px;
                padding: 35px 40px;
                background: linear-gradient(180deg, #0d0d0d 0%, #0a0a0a 100%);
                min-height: 100vh;
            }

            .admin-header {
                margin-bottom: 35px;
                animation: fadeIn 0.5s ease-out;
            }

            .admin-header h2 {
                font-size: 2rem;
                margin-bottom: 6px;
                background: linear-gradient(135deg, #ffffff, #DDA95E);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-weight: 800;
                letter-spacing: -0.5px;
            }

            .admin-header p {
                color: #555;
                font-size: 0.95rem;
                font-weight: 300;
            }

            /* ===== STATS CARDS ===== */
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
                gap: 20px;
                margin-bottom: 35px;
            }

            .stat-card {
                background: linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.9));
                border: 1px solid rgba(221, 186, 94, 0.15);
                border-radius: 16px;
                padding: 25px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                animation: fadeIn 0.5s ease-out;
                animation-fill-mode: both;
            }

            .stat-card:nth-child(1) { animation-delay: 0.1s; }
            .stat-card:nth-child(2) { animation-delay: 0.2s; }
            .stat-card:nth-child(3) { animation-delay: 0.3s; }
            .stat-card:nth-child(4) { animation-delay: 0.4s; }

            .stat-card::after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 80px;
                height: 80px;
                background: radial-gradient(circle, rgba(221, 186, 94, 0.06) 0%, transparent 70%);
                border-radius: 50%;
                transform: translate(20px, -20px);
            }

            .stat-card:hover {
                border-color: rgba(221, 186, 94, 0.4);
                transform: translateY(-3px);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
            }

            .stat-card-icon {
                width: 44px;
                height: 44px;
                background: linear-gradient(135deg, rgba(221, 186, 94, 0.15), rgba(244, 228, 188, 0.1));
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 16px;
                font-size: 1.2rem;
                color: #DDA95E;
                transition: all 0.3s ease;
            }

            .stat-card:hover .stat-card-icon {
                background: linear-gradient(135deg, #DDA95E, #F4E4BC);
                color: #0a0a0a;
            }

            .stat-card-value {
                font-size: 2.2rem;
                font-weight: 800;
                margin-bottom: 4px;
                color: #ffffff;
                letter-spacing: -1px;
            }

            .stat-card-label {
                color: #555;
                font-size: 0.85rem;
                font-weight: 400;
            }

            /* ===== CONTENT SECTIONS ===== */
            .content-section {
                display: none;
                animation: fadeIn 0.4s ease-out;
            }

            .content-section.active {
                display: block;
            }

            /* ===== TABLES ===== */
            .data-table-container {
                background: linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.9));
                border: 1px solid rgba(221, 186, 94, 0.12);
                border-radius: 16px;
                overflow: hidden;
                animation: fadeIn 0.5s ease-out;
            }

            .data-table-header {
                padding: 20px 25px;
                border-bottom: 1px solid rgba(221, 186, 94, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .data-table-header h3 {
                font-size: 1.15rem;
                color: #ffffff;
                font-weight: 600;
            }

            .refresh-btn {
                background: linear-gradient(135deg, #DDA95E, #c8953e);
                border: none;
                padding: 8px 18px;
                border-radius: 8px;
                color: #0a0a0a;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-size: 0.85rem;
                font-family: 'Inter', sans-serif;
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .refresh-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 20px rgba(221, 186, 94, 0.25);
            }

            .refresh-btn:active {
                transform: translateY(0);
            }

            .data-table {
                width: 100%;
                border-collapse: collapse;
            }

            .data-table thead {
                background: rgba(221, 186, 94, 0.05);
            }

            .data-table th {
                padding: 14px 20px;
                text-align: left;
                color: #DDA95E;
                font-weight: 600;
                font-size: 0.78rem;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                border-bottom: 1px solid rgba(221, 186, 94, 0.1);
            }

            .data-table td {
                padding: 13px 20px;
                border-bottom: 1px solid rgba(221, 186, 94, 0.05);
                color: #ccc;
                font-size: 0.88rem;
            }

            .data-table tbody tr {
                transition: all 0.2s ease;
            }

            .data-table tbody tr:last-child td {
                border-bottom: none;
            }

            .data-table tbody tr:hover {
                background: rgba(221, 186, 94, 0.03);
            }

            .status-badge {
                display: inline-block;
                padding: 4px 14px;
                border-radius: 20px;
                font-size: 0.78rem;
                font-weight: 600;
                letter-spacing: 0.3px;
            }

            .status-pending {
                background: rgba(255, 193, 7, 0.12);
                color: #ffc107;
                border: 1px solid rgba(255, 193, 7, 0.2);
            }

            .status-confirmed {
                background: rgba(76, 175, 80, 0.12);
                color: #66bb6a;
                border: 1px solid rgba(76, 175, 80, 0.2);
            }

            .status-completed {
                background: rgba(33, 150, 243, 0.12);
                color: #42a5f5;
                border: 1px solid rgba(33, 150, 243, 0.2);
            }

            .status-cancelled {
                background: rgba(244, 67, 54, 0.12);
                color: #ef5350;
                border: 1px solid rgba(244, 67, 54, 0.2);
            }

            .action-cell {
                white-space: nowrap;
                display: flex;
                gap: 6px;
                align-items: center;
            }

            .action-btn {
                width: 32px;
                height: 32px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 0.8rem;
                transition: all 0.2s ease;
            }

            .action-btn:hover {
                transform: scale(1.1);
            }

            .action-confirm {
                background: rgba(76, 175, 80, 0.15);
                color: #66bb6a;
                border: 1px solid rgba(76, 175, 80, 0.25);
            }

            .action-confirm:hover {
                background: rgba(76, 175, 80, 0.25);
            }

            .action-cancel {
                background: rgba(244, 67, 54, 0.15);
                color: #ef5350;
                border: 1px solid rgba(244, 67, 54, 0.25);
            }

            .action-cancel:hover {
                background: rgba(244, 67, 54, 0.25);
            }

            .message-cell {
                max-width: 280px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
                color: #999;
            }

            .message-cell:hover {
                white-space: normal;
                color: #fff;
            }

            /* ===== CARS GRID ===== */
            .cars-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
                gap: 20px;
            }

            .car-card {
                background: linear-gradient(135deg, rgba(20, 20, 20, 0.9), rgba(10, 10, 10, 0.9));
                border: 1px solid rgba(221, 186, 94, 0.15);
                border-radius: 16px;
                overflow: hidden;
                transition: all 0.3s ease;
                animation: fadeIn 0.4s ease-out;
            }

            .car-card:hover {
                border-color: rgba(221, 186, 94, 0.35);
                transform: translateY(-3px);
                box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
            }

            .car-card.unavailable {
                opacity: 0.6;
            }

            .car-image {
                position: relative;
                height: 200px;
                overflow: hidden;
                background: #111;
            }

            .car-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.4s ease;
            }

            .car-card:hover .car-image img {
                transform: scale(1.05);
            }

            .car-status {
                position: absolute;
                top: 12px;
                right: 12px;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.75rem;
                font-weight: 600;
                letter-spacing: 0.3px;
            }

            .status-available {
                background: rgba(76, 175, 80, 0.9);
                color: #fff;
            }

            .status-unavailable {
                background: rgba(244, 67, 54, 0.9);
                color: #fff;
            }

            .car-info {
                padding: 20px;
            }

            .car-info h3 {
                font-size: 1.15rem;
                color: #fff;
                margin-bottom: 8px;
                font-weight: 600;
            }

            .car-meta {
                display: flex;
                gap: 14px;
                margin-bottom: 10px;
                flex-wrap: wrap;
                align-items: center;
            }

            .car-meta span {
                font-size: 0.8rem;
                color: #888;
                display: flex;
                align-items: center;
                gap: 4px;
            }

            .car-meta span i {
                color: #DDA95E;
            }

            .car-category {
                background: rgba(221, 186, 94, 0.12);
                color: #DDA95E;
                padding: 2px 10px;
                border-radius: 10px;
                font-weight: 600;
                font-size: 0.7rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .car-desc {
                font-size: 0.85rem;
                color: #666;
                line-height: 1.5;
                margin-bottom: 16px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .car-toggle-btn {
                width: 100%;
                padding: 10px;
                border: none;
                border-radius: 10px;
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Inter', sans-serif;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
            }

            .btn-set-unavailable {
                background: rgba(244, 67, 54, 0.12);
                color: #ef5350;
                border: 1px solid rgba(244, 67, 54, 0.2);
            }

            .btn-set-unavailable:hover {
                background: rgba(244, 67, 54, 0.2);
            }

            .btn-set-available {
                background: rgba(76, 175, 80, 0.12);
                color: #66bb6a;
                border: 1px solid rgba(76, 175, 80, 0.2);
            }

            .btn-set-available:hover {
                background: rgba(76, 175, 80, 0.2);
            }

            @media (max-width: 768px) {
                .cars-grid {
                    grid-template-columns: 1fr;
                }
            }

            /* ===== LOADING & EMPTY STATE ===== */
            .loading {
                text-align: center;
                padding: 60px 20px;
                color: #666;
            }

            .loading i {
                font-size: 2rem;
                color: #DDA95E;
                animation: spin 1s linear infinite;
                margin-bottom: 12px;
            }

            .loading p {
                font-size: 0.9rem;
                font-weight: 300;
            }

            .empty-state {
                text-align: center;
                padding: 60px 20px;
                color: #555;
            }

            .empty-state i {
                font-size: 3.5rem;
                color: #DDA95E;
                margin-bottom: 16px;
                opacity: 0.3;
            }

            .empty-state h4 {
                font-size: 1.15rem;
                margin-bottom: 8px;
                color: #888;
                font-weight: 600;
            }

            .empty-state p {
                font-size: 0.9rem;
                font-weight: 300;
            }

            /* ===== SCROLLBAR ===== */
            ::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }

            ::-webkit-scrollbar-track {
                background: #0a0a0a;
            }

            ::-webkit-scrollbar-thumb {
                background: rgba(221, 186, 94, 0.2);
                border-radius: 3px;
            }

            ::-webkit-scrollbar-thumb:hover {
                background: rgba(221, 186, 94, 0.4);
            }

            /* ===== RESPONSIVE ===== */
            @media (max-width: 1200px) {
                .admin-main {
                    padding: 25px;
                }

                .stats-grid {
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                }
            }

            @media (max-width: 768px) {
                .admin-sidebar {
                    width: 100%;
                    height: auto;
                    position: relative;
                    max-height: none;
                    border-right: none;
                    border-bottom: 1px solid rgba(221, 186, 94, 0.15);
                }

                .admin-logo {
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    text-align: left;
                }

                .admin-logo .logo-icon {
                    margin: 0;
                }

                .admin-nav {
                    display: flex;
                    padding: 0 8px 8px;
                    overflow-x: auto;
                }

                .admin-nav li {
                    flex-shrink: 0;
                }

                .admin-nav a {
                    padding: 10px 14px;
                    font-size: 0.8rem;
                    white-space: nowrap;
                }

                .logout-btn {
                    margin: 0 12px 12px;
                }

                .admin-main {
                    margin-left: 0;
                    padding: 20px;
                }

                .admin-container {
                    flex-direction: column;
                }

                .admin-panel.active {
                    flex-direction: column;
                }

                .stats-grid {
                    grid-template-columns: 1fr;
                    gap: 15px;
                }

                .data-table-container {
                    overflow-x: auto;
                }

                .data-table {
                    font-size: 0.8rem;
                    min-width: 700px;
                }

                .data-table th,
                .data-table td {
                    padding: 10px 14px;
                }

                .login-card {
                    padding: 35px 25px;
                }

                .admin-header h2 {
                    font-size: 1.6rem;
                }
            }

            @media (max-width: 480px) {
                .login-card {
                    padding: 28px 20px;
                }

                .login-header h1 {
                    font-size: 1.4rem;
                }

                .admin-main {
                    padding: 15px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Build Login Form
    function buildLoginForm() {
        const loginContainer = document.createElement('div');
        loginContainer.id = 'loginPage';
        loginContainer.className = 'login-container';
        loginContainer.innerHTML = `
            <div class="login-card">
                <div class="login-header">
                    <div class="login-logo-icon"><i class="fas fa-car-side"></i></div>
                    <h1>Admin Login</h1>
                    <p><i class="fas fa-crown"></i> Limo Service Dashboard <i class="fas fa-crown"></i></p>
                </div>
                <form class="login-form" id="loginForm">
                    <div class="form-group">
                        <label for="username">Username</label>
                        <div class="input-wrapper">
                            <i class="fas fa-user"></i>
                            <input type="text" id="username" name="username" placeholder="Enter your username" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <div class="input-wrapper">
                            <i class="fas fa-lock"></i>
                            <input type="password" id="password" name="password" placeholder="Enter your password" required>
                        </div>
                    </div>
                    <div class="login-error" id="loginError">Invalid username or password</div>
                    <button type="submit" class="login-btn" id="loginBtn">
                        <span><i class="fas fa-sign-in-alt"></i> Login</span>
                    </button>
                    <div class="login-footer-text">Authorized personnel only</div>
                </form>
            </div>
        `;
        document.body.appendChild(loginContainer);
    }

    // Build Admin Panel
    function buildAdminPanel() {
        const container = document.createElement('div');
        container.id = 'adminPanel';
        container.className = 'admin-container admin-panel';
        container.innerHTML = `
            <aside class="admin-sidebar">
                <div class="admin-logo">
                    <div class="logo-icon"><i class="fas fa-car-side"></i></div>
                    <h1>Admin Panel</h1>
                    <p>Limo Service Dashboard</p>
                </div>
                <ul class="admin-nav">
                    <li><a href="#" class="nav-link active" data-section="dashboard"><i class="fas fa-tachometer-alt"></i> Dashboard</a></li>
                    <li><a href="#" class="nav-link" data-section="bookings"><i class="fas fa-calendar-check"></i> Bookings</a></li>
                    <li><a href="#" class="nav-link" data-section="contacts"><i class="fas fa-envelope"></i> Contact Messages</a></li>
                    <li><a href="#" class="nav-link" data-section="cars"><i class="fas fa-car"></i> Cars</a></li>
                </ul>
                <button class="logout-btn" id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </button>
            </aside>

            <main class="admin-main">
                <!-- Dashboard Section -->
                <section id="dashboard" class="content-section active">
                    <div class="admin-header">
                        <h2>Dashboard</h2>
                        <p>Overview of your limo service</p>
                    </div>

                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-card-icon"><i class="fas fa-calendar-check"></i></div>
                            <div class="stat-card-value" id="totalBookings">0</div>
                            <div class="stat-card-label">Total Bookings</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-icon"><i class="fas fa-envelope"></i></div>
                            <div class="stat-card-value" id="totalMessages">0</div>
                            <div class="stat-card-label">Contact Messages</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-card-icon"><i class="fas fa-clock"></i></div>
                            <div class="stat-card-value" id="pendingBookings">0</div>
                            <div class="stat-card-label">Pending Bookings</div>
                        </div>
                    </div>

                    <div class="data-table-container">
                        <div class="data-table-header">
                            <h3>Recent Activity</h3>
                        </div>
                        <div id="recentActivity">
                            <div class="loading">
                                <i class="fas fa-spinner"></i>
                                <p>Loading activity...</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Bookings Section -->
                <section id="bookings" class="content-section">
                    <div class="admin-header">
                        <h2>Bookings</h2>
                        <p>Manage booking requests</p>
                    </div>

                    <div class="data-table-container">
                        <div class="data-table-header">
                            <h3>All Bookings</h3>
                            <button class="refresh-btn" onclick="loadBookings()"><i class="fas fa-sync-alt"></i> Refresh</button>
                        </div>
                        <div id="bookingsTable">
                            <div class="loading">
                                <i class="fas fa-spinner"></i>
                                <p>Loading bookings...</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Contact Messages Section -->
                <section id="contacts" class="content-section">
                    <div class="admin-header">
                        <h2>Contact Messages</h2>
                        <p>View customer inquiries</p>
                    </div>

                    <div class="data-table-container">
                        <div class="data-table-header">
                            <h3>All Messages</h3>
                            <button class="refresh-btn" onclick="loadContacts()"><i class="fas fa-sync-alt"></i> Refresh</button>
                        </div>
                        <div id="contactsTable">
                            <div class="loading">
                                <i class="fas fa-spinner"></i>
                                <p>Loading messages...</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Cars Section -->
                <section id="cars" class="content-section">
                    <div class="admin-header">
                        <h2>Fleet Management</h2>
                        <p>Manage vehicle availability</p>
                    </div>
                    <div id="carsGrid">
                        <div class="loading">
                            <i class="fas fa-spinner"></i>
                            <p>Loading cars...</p>
                        </div>
                    </div>
                </section>
            </main>
        `;

        document.body.appendChild(container);
    }

    // Supabase API Helper
    async function fetchFromSupabase(table, orderBy = 'created_at.desc') {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?order=${orderBy}`, {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${table}:`, error);
            return [];
        }
    }

    // Load Dashboard Stats
    async function loadDashboard() {
        const bookings = await fetchFromSupabase('Bookings');
        const contacts = await fetchFromSupabase('Contact');

        document.getElementById('totalBookings').textContent = bookings.length;
        document.getElementById('totalMessages').textContent = contacts.length;
        document.getElementById('pendingBookings').textContent = bookings.filter(b => b.status === 'pending').length;

        // Recent Activity
        const activityContainer = document.getElementById('recentActivity');
        const allActivity = [
            ...bookings.slice(0, 3).map(b => ({
                type: 'booking',
                name: b.name || `${b.first_name} ${b.last_name}`,
                date: b.created_at,
                details: `New booking from ${b.email}`
            })),
            ...contacts.slice(0, 3).map(c => ({
                type: 'contact',
                name: `${c.first_name} ${c.last_name}`,
                date: c.created_at,
                details: `Message: ${c.subject}`
            }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        if (allActivity.length === 0) {
            activityContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <h4>No Activity Yet</h4>
                    <p>Activity will appear here when customers submit bookings or messages</p>
                </div>
            `;
        } else {
            activityContainer.innerHTML = `
                <table class="data-table">
                    <tbody>
                        ${allActivity.map(a => `
                            <tr>
                                <td><i class="fas fa-${a.type === 'booking' ? 'calendar-check' : 'envelope'}" style="color: #DDA95E; margin-right: 10px;"></i></td>
                                <td>${a.name}</td>
                                <td>${a.details}</td>
                                <td>${new Date(a.date).toLocaleDateString()}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
        }
    }

    // Load Bookings
    async function loadBookings() {
        const bookings = await fetchFromSupabase('Bookings');
        const container = document.getElementById('bookingsTable');

        if (bookings.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <h4>No Bookings Yet</h4>
                    <p>Booking requests will appear here</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Vehicle</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${bookings.map(b => `
                        <tr>
                            <td>${b.name || `${b.first_name} ${b.last_name}`}</td>
                            <td>${b.email}</td>
                            <td>${b.phone_number || b.phone || 'N/A'}</td>
                            <td>${b.date || b.pickup_date}</td>
                            <td>${b.time || b.pickup_time}</td>
                            <td>${b.vehicle || b.car_id || 'N/A'}</td>
                            <td><span class="status-badge status-${b.status || 'pending'}">${b.status || 'pending'}</span></td>
                            <td>${new Date(b.created_at).toLocaleDateString()}</td>
                            <td class="action-cell">
                                ${b.status !== 'confirmed' && b.status !== 'completed' ? `
                                    <button class="action-btn action-confirm" onclick="updateBookingStatus(${b.id}, 'confirmed')" title="Confirm"><i class="fas fa-check"></i></button>
                                ` : ''}
                                ${b.status !== 'cancelled' && b.status !== 'completed' ? `
                                    <button class="action-btn action-cancel" onclick="updateBookingStatus(${b.id}, 'cancelled')" title="Cancel"><i class="fas fa-times"></i></button>
                                ` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Update Booking Status
    async function updateBookingStatus(id, status) {
        try {
            await fetch(`${SUPABASE_URL}/rest/v1/Bookings?id=eq.${id}`, {
                method: 'PATCH',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({ status })
            });
            loadBookings();
            loadDashboard();
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    }

    // Load Contacts
    async function loadContacts() {
        const contacts = await fetchFromSupabase('Contact');
        const container = document.getElementById('contactsTable');

        if (contacts.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-envelope-open"></i>
                    <h4>No Messages Yet</h4>
                    <p>Contact messages will appear here</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <table class="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${contacts.map(c => `
                        <tr>
                            <td>${c.first_name} ${c.last_name}</td>
                            <td>${c.email}</td>
                            <td>${c.phone || 'N/A'}</td>
                            <td>${c.subject}</td>
                            <td class="message-cell" title="${c.message}">${c.message}</td>
                            <td>${new Date(c.created_at).toLocaleDateString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    // Load Cars
    async function loadCars() {
        const cars = await fetchFromSupabase('cars', 'id');
        const container = document.getElementById('carsGrid');

        if (cars.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-car"></i>
                    <h4>No Cars Found</h4>
                    <p>No vehicles have been added to the fleet yet</p>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="cars-grid">
                ${cars.map(c => `
                    <div class="car-card ${c.isAvailable ? 'available' : 'unavailable'}">
                        <div class="car-image">
                            <img src="${c.image}" alt="${c.name}" loading="lazy" onerror="this.src='https://placehold.co/400x250/1a1a1a/888?text=No+Image'">
                            <span class="car-status ${c.isAvailable ? 'status-available' : 'status-unavailable'}">
                                ${c.isAvailable ? 'Available' : 'Unavailable'}
                            </span>
                        </div>
                        <div class="car-info">
                            <h3>${c.name}</h3>
                            <div class="car-meta">
                                <span><i class="fas fa-user"></i> ${c.passenger_cap} seats</span>
                                <span><i class="fas fa-suitcase"></i> ${c.luggage_cap} bags</span>
                                <span class="car-category">${c.category}</span>
                            </div>
                            <p class="car-desc">${c.description}</p>
                            <button class="car-toggle-btn ${c.isAvailable ? 'btn-set-unavailable' : 'btn-set-available'}" onclick="toggleCarAvailability(${c.id}, ${c.isAvailable})">
                                <i class="fas ${c.isAvailable ? 'fa-times-circle' : 'fa-check-circle'}"></i>
                                ${c.isAvailable ? 'Set Unavailable' : 'Set Available'}
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Toggle Car Availability
    async function toggleCarAvailability(id, currentStatus) {
        try {
            await fetch(`${SUPABASE_URL}/rest/v1/cars?id=eq.${id}`, {
                method: 'PATCH',
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({ isAvailable: !currentStatus })
            });
            loadCars();
        } catch (error) {
            console.error('Error toggling car availability:', error);
        }
    }

    // Navigate to a section and update the URL
    function navigateToSection(section) {
        // Update active nav
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        const navLink = document.querySelector(`.nav-link[data-section="${section}"]`);
        if (navLink) navLink.classList.add('active');

        // Show active section
        document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
        const sectionEl = document.getElementById(section);
        if (sectionEl) sectionEl.classList.add('active');

        // Update URL without reloading
        const url = new URL(window.location);
        url.searchParams.set('section', section);
        window.history.pushState({ section }, '', url);

        // Load data
        if (section === 'dashboard') loadDashboard();
        if (section === 'bookings') loadBookings();
        if (section === 'contacts') loadContacts();
        if (section === 'cars') loadCars();
    }

    // Get section from URL or default to dashboard
    function getSectionFromURL() {
        const params = new URLSearchParams(window.location.search);
        const section = params.get('section');
        const valid = ['dashboard', 'bookings', 'contacts', 'cars'];
        return valid.includes(section) ? section : 'dashboard';
    }

    // Navigation
    function setupNavigation() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('.nav-link');
            if (link) {
                e.preventDefault();
                navigateToSection(link.dataset.section);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const section = getSectionFromURL();
            navigateToSection(section);
        });
    }

    // Step 1: Check if username exists in the database
    async function checkUsername(username) {
        try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/admins?username=eq.${encodeURIComponent(username)}`, {
                headers: {
                    'apikey': SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            const users = await response.json();
            if (!users || users.length === 0) {
                return { found: false, user: null };
            }
            return { found: true, user: users[0] };
        } catch (error) {
            console.error('Error fetching user:', error);
            return { found: false, user: null, error: true };
        }
    }

    // Step 2: Verify password hash using Argon2
    async function verifyPassword(password, storedHash) {
        await loadArgon2Library();
        const argon2 = window.argon2;
        if (!argon2) {
            console.error('Argon2 library not loaded');
            return false;
        }
        try {
            const verifyResult = await argon2.verify({
                pass: password,
                encoded: storedHash
            });
            // argon2-browser returns undefined on success, {message, code} on mismatch
            return verifyResult === undefined;
        } catch (argonError) {
            console.error('Argon2 verification error:', argonError);
            return false;
        }
    }

    // Login flow: check username, verify password, then log in
    async function handleLogin(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const loginBtn = document.getElementById('loginBtn');
        const loginError = document.getElementById('loginError');
        
        if (!username || !password) {
            loginError.textContent = 'Please enter username and password';
            loginError.classList.add('show');
            return;
        }
        
        loginBtn.disabled = true;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading security module...';
        loginError.classList.remove('show');
        
        // Wait for Argon2 to load (with generous timeout for WASM download)
        try {
            await Promise.race([
                loadArgon2Library(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 30000))
            ]);
        } catch {
            loginError.textContent = 'Security library failed to load. Check your connection and try again.';
            loginError.classList.add('show');
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<span><i class="fas fa-sign-in-alt"></i> Login</span>';
            return;
        }
        
        // Step 1: Check if username exists
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking username...';
        const { found, user, error: fetchError } = await checkUsername(username);
        
        if (fetchError) {
            loginError.textContent = 'Connection error. Please try again.';
            loginError.classList.add('show');
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<span><i class="fas fa-sign-in-alt"></i> Login</span>';
            return;
        }
        
        if (!found) {
            loginError.textContent = 'Username not found';
            loginError.classList.add('show');
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<span><i class="fas fa-sign-in-alt"></i> Login</span>';
            return;
        }
        
        // Step 2: Verify password hash
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying password...';
        const storedHash = user.password;
        
        if (!storedHash) {
            loginError.textContent = 'Account not properly configured';
            loginError.classList.add('show');
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<span><i class="fas fa-sign-in-alt"></i> Login</span>';
            return;
        }
        
        const passwordValid = await verifyPassword(password, storedHash);
        
        if (!passwordValid) {
            loginError.textContent = 'Incorrect password';
            loginError.classList.add('show');
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<span><i class="fas fa-sign-in-alt"></i> Login</span>';
            return;
        }
        
        // Step 3: Log in
        sessionStorage.setItem('adminUser', JSON.stringify({
            id: user.id,
            username: user.username
        }));
        
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('adminPanel').classList.add('active');
        setupNavigation();
        navigateToSection(getSectionFromURL());
        startAutoRefresh();
    }

    // Logout handler
    function handleLogout() {
        sessionStorage.removeItem('adminUser');
        document.getElementById('adminPanel').classList.remove('active');
        document.getElementById('loginPage').style.display = 'flex';
        document.getElementById('loginForm').reset();
    }

    // Auto-refresh
    let refreshInterval;
    function startAutoRefresh() {
        if (refreshInterval) clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
            const activeSection = document.querySelector('.content-section.active');
            if (activeSection) {
                const sectionId = activeSection.id;
                if (sectionId === 'dashboard') loadDashboard();
                if (sectionId === 'bookings') loadBookings();
                if (sectionId === 'contacts') loadContacts();
            }
        }, 30000);
    }

    // Initialize
    function init() {
        injectStyles();
        buildLoginForm();
        buildAdminPanel();
        
        // Check if already logged in
        const adminUser = sessionStorage.getItem('adminUser');
        if (adminUser) {
            document.getElementById('loginPage').style.display = 'none';
            document.getElementById('adminPanel').classList.add('active');
            setupNavigation();
            navigateToSection(getSectionFromURL());
            startAutoRefresh();
        } else {
            document.getElementById('loginPage').style.display = 'flex';
            document.getElementById('adminPanel').classList.remove('active');
        }
        
        // Login form submit
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
        
        // Logout button
        document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
