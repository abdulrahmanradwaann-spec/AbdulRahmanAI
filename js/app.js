// =================================================================
// Abdulrahman AI - التطبيق الرئيسي
// =================================================================

// =================================================================
// 1. المتغيرات العامة
// =================================================================
let currentCategoryIndex = null;
let searchTimeout;
let currentSort = 'default';
let currentLang = localStorage.getItem('appLang') || 'ar';
let favorites = JSON.parse(localStorage.getItem('new_favorites')) || [];
let clickStats = JSON.parse(localStorage.getItem('new_clickStats')) || {};

// =================================================================
// 2. دالة إظهار الإشعارات
// =================================================================
window.showToast = function(message, type = 'info') {
    const container = document.getElementById('newToastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `new-toast ${type}`;
    let icon = 'fa-info-circle';
    if (type === 'success') icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

// =================================================================
// 3. دوال العرض الأساسية
// =================================================================
function renderMainPage() {
    document.title = "Abdulrahman AI | دليل أدوات الذكاء الاصطناعي";
    const container = document.getElementById('contentContainer');
    let catsToRender = [...categories];
    
    if (currentSort === 'name') {
        catsToRender.sort((a, b) => a.name.localeCompare(b.name));
    } else if (currentSort === 'count') {
        catsToRender.sort((a, b) => b.tools.length - a.tools.length);
    }
    
    container.innerHTML = `
        <div class="categories-grid">
            ${catsToRender.map((cat, index) => `
                <a href="?index=${categories.findIndex(c => c.name === cat.name)}" class="category-card" style="--card-index: ${index + 1};">
                    <div class="category-card-icon"><i class="${cat.icon}"></i></div>
                    <h3>${cat.name}</h3>
                    <p>${cat.tools.length} أداة متاحة</p>
                </a>
            `).join('')}
        </div>
    `;
    
    const noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = 'none';
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
        searchInput.placeholder = 'ابحث عن أداة ذكاء اصطناعي...';
    }
    
    updateBreadcrumbs();
    const sortControls = document.getElementById('sortControls');
    if (sortControls) sortControls.style.display = 'flex';
    
    attachToolEvents();
    updateSidebarStats();
}

function renderCategoryPage(index) {
    const cat = categories[index];
    if (!cat) {
        window.location.href = window.location.pathname;
        return;
    }
    
    currentCategoryIndex = index;
    document.title = `${cat.name} | Abdulrahman AI`;
    const container = document.getElementById('contentContainer');
    
    container.innerHTML = `
        <a href="${window.location.pathname}" class="back-link">
            <i class="fa-solid fa-arrow-left"></i> العودة لجميع الأقسام
        </a>
        <div class="category-header" onclick="window.location.href='${window.location.pathname}'">
            <div class="category-icon"><i class="${cat.icon}"></i></div>
            <h2 class="category-title">${cat.name}</h2>
        </div>
        <div class="tools-grid" id="toolsGrid">
            ${cat.tools.map((tool, idx) => `
                <div class="tool-card" style="--card-index: ${idx + 1};">
                    <div class="card-icon"><i class="${tool.icon}"></i></div>
                    <h3 class="tool-name">${tool.name}</h3>
                    <p class="tool-desc">${tool.desc}</p>
                    <a href="${tool.url}" class="tool-link" target="_blank" rel="noopener noreferrer">
                        <span>زيارة</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            `).join('')}
        </div>
    `;
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = `ابحث في ${cat.name}...`;
        searchInput.value = '';
    }
    
    const noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = 'none';
    
    updateBreadcrumbs(cat.name);
    const sortControls = document.getElementById('sortControls');
    if (sortControls) sortControls.style.display = 'none';
    
    attachToolEvents();
}

function updateBreadcrumbs(categoryName = null) {
    const bread = document.getElementById('breadcrumbs');
    if (!bread) return;
    if (categoryName) {
        bread.innerHTML = `<a href="/">الرئيسية</a> <span class="separator">/</span> <span>${categoryName}</span>`;
    } else {
        bread.innerHTML = `<a href="/">الرئيسية</a>`;
    }
}

// =================================================================
// 4. البحث والتصفية
// =================================================================
function debounceFilter() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        filterTools();
    }, 300);
}

function filterTools() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase().trim();
    const noResults = document.getElementById('noResults');

    if (currentCategoryIndex === null) {
        const container = document.getElementById('contentContainer');
        
        if (query === '') {
            renderMainPage();
            return;
        }
        
        const filteredCategories = categories.filter(cat =>
            cat.name.toLowerCase().includes(query) ||
            cat.tools.some(tool => tool.name.toLowerCase().includes(query) || tool.desc.toLowerCase().includes(query))
        );
        
        if (filteredCategories.length === 0) {
            if (container) container.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
        } else {
            if (container) {
                container.innerHTML = `
                    <div class="categories-grid">
                        ${filteredCategories.map((cat, index) => {
                            const originalIndex = categories.findIndex(c => c.name === cat.name);
                            return `
                                <a href="?index=${originalIndex}" class="category-card" style="--card-index: ${index + 1};">
                                    <div class="category-card-icon"><i class="${cat.icon}"></i></div>
                                    <h3>${cat.name}</h3>
                                    <p>${cat.tools.length} أداة متاحة</p>
                                </a>
                            `;
                        }).join('')}
                    </div>
                `;
            }
            if (noResults) noResults.style.display = 'none';
        }
    } else {
        const cat = categories[currentCategoryIndex];
        const toolsGrid = document.getElementById('toolsGrid');
        if (!toolsGrid) return;

        if (query === '') {
            toolsGrid.innerHTML = cat.tools.map((tool, idx) => `
                <div class="tool-card" style="--card-index: ${idx + 1};">
                    <div class="card-icon"><i class="${tool.icon}"></i></div>
                    <h3 class="tool-name">${tool.name}</h3>
                    <p class="tool-desc">${tool.desc}</p>
                    <a href="${tool.url}" class="tool-link" target="_blank" rel="noopener noreferrer">
                        <span>Visit</span>
                        <i class="fa-solid fa-arrow-left"></i>
                    </a>
                </div>
            `).join('');
            if (noResults) noResults.style.display = 'none';
        } else {
            const filtered = cat.tools.filter(tool =>
                tool.name.toLowerCase().includes(query) || tool.desc.toLowerCase().includes(query)
            );
            
            if (filtered.length === 0) {
                toolsGrid.innerHTML = '';
                if (noResults) noResults.style.display = 'block';
            } else {
                toolsGrid.innerHTML = filtered.map((tool, idx) => `
                    <div class="tool-card" style="--card-index: ${idx + 1};">
                        <div class="card-icon"><i class="${tool.icon}"></i></div>
                        <h3 class="tool-name">${tool.name}</h3>
                        <p class="tool-desc">${tool.desc}</p>
                        <a href="${tool.url}" class="tool-link" target="_blank" rel="noopener noreferrer">
                            <span>Visit</span>
                            <i class="fa-solid fa-arrow-left"></i>
                        </a>
                    </div>
                `).join('');
                if (noResults) noResults.style.display = 'none';
            }
        }
    }
    
    attachToolEvents();
}

// =================================================================
// 5. الاقتراحات (Autocomplete)
// =================================================================
function setupAutocomplete() {
    const searchInput = document.getElementById('searchInput');
    const autocompleteBox = document.getElementById('autocompleteBox');
    if (!searchInput || !autocompleteBox) return;

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (query.length < 2) {
            autocompleteBox.classList.remove('show');
            return;
        }

        let suggestions = [];
        categories.forEach(cat => {
            cat.tools.forEach(tool => {
                if (tool.name.toLowerCase().includes(query) && !suggestions.includes(tool.name)) {
                    suggestions.push(tool.name);
                }
            });
        });
        suggestions = suggestions.slice(0, 8);

        if (suggestions.length === 0) {
            autocompleteBox.classList.remove('show');
            return;
        }

        autocompleteBox.innerHTML = suggestions.map(s => `
            <div class="autocomplete-item" data-value="${s}">
                <i class="fas fa-search"></i> ${s}
            </div>
        `).join('');
        autocompleteBox.classList.add('show');
    });

    autocompleteBox.addEventListener('click', function(e) {
        const item = e.target.closest('.autocomplete-item');
        if (item && searchInput) {
            searchInput.value = item.dataset.value;
            autocompleteBox.classList.remove('show');
            filterTools();
        }
    });

    document.addEventListener('click', function(e) {
        if (searchInput && autocompleteBox && !searchInput.contains(e.target) && !autocompleteBox.contains(e.target)) {
            autocompleteBox.classList.remove('show');
        }
    });
}

// =================================================================
// 6. تأثير الكتابة
// =================================================================
function typeEffect() {
    const textElement = document.getElementById('typingText');
    if (!textElement) return;
    const phrases = ["دليل متكامل لأدوات الذكاء الاصطناعي", "اكتشف المستقبل اليوم", "أحدث تقنيات 2026", "أدوات AI احترافية"];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;
    
    function animate() {
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            textElement.innerHTML = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(animate, 400);
                return;
            }
        } else {
            textElement.innerHTML = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(animate, 2000);
                return;
            }
        }
        setTimeout(animate, isDeleting ? 60 : 120);
    }
    animate();
}

// =================================================================
// 7. شريط التقدم
// =================================================================
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
}

// =================================================================
// 8. تبديل الوضع (داكن/فاتح)
// =================================================================
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
    } else if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
    } else {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-mode');
            if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
        } else {
            document.body.classList.add('light-mode');
        }
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            if (icon) { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
        }
    });
}

// =================================================================
// 9. خلفية الجسيمات والشبكة العصبية
// =================================================================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    resize();
    window.addEventListener('resize', resize);

    const particleCount = 60;
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5,
            color: ['rgba(99, 102, 241, 0.5)', 'rgba(14, 165, 233, 0.5)', 'rgba(244, 63, 94, 0.5)'][Math.floor(Math.random() * 3)]
        });
    }

    function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);
        const isDark = document.body.classList.contains('dark-mode');

        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)';
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;

            if (p.x < 0 || p.x > width) p.dx *= -1;
            if (p.y < 0 || p.y > height) p.dy *= -1;
        });

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }
    animate();
}

function initNeuralNetwork() {
    const canvas = document.getElementById('neuralCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];
    const nodeCount = 25;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = 400;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 2
        });
    }

    function animate() {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(99, 102, 241, 0.1)';
            ctx.fill();
        });

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(14, 165, 233, ${0.4 * (1 - distance / 120)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }
    animate();
}

// =================================================================
// 10. مسح البحث
// =================================================================
function setupClearSearch() {
    const clearBtn = document.getElementById('clearSearch');
    const searchInput = document.getElementById('searchInput');
    if (!clearBtn || !searchInput) return;
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchInput.focus();
        filterTools();
    });
}

// =================================================================
// 11. الإحصائيات والمفضلة
// =================================================================
function getAllTools() {
    const all = [];
    categories.forEach(cat => {
        cat.tools.forEach(tool => {
            all.push({ ...tool, category: cat.name, categoryIcon: cat.icon });
        });
    });
    return all;
}

function updateSidebarStats() {
    const totalCategories = categories.length;
    const totalTools = getAllTools().length;
    const catElem = document.getElementById('newStatCategories');
    const toolsElem = document.getElementById('newStatTools');
    const favElem = document.getElementById('newFavCount');
    const headerCats = document.getElementById('statCategories');
    const headerTools = document.getElementById('statTools');
    
    if (catElem) catElem.textContent = totalCategories;
    if (toolsElem) toolsElem.textContent = totalTools;
    if (favElem) favElem.textContent = favorites.length;
    if (headerCats) headerCats.textContent = totalCategories;
    if (headerTools) headerTools.textContent = totalTools;
}

function updateTopTools() {
    const topToolsList = document.getElementById('newTopTools');
    if (!topToolsList) return;
    
    const sorted = Object.entries(clickStats)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 5)
        .map(([url, data]) => {
            const allTools = getAllTools();
            const tool = allTools.find(t => t.url === url);
            return tool ? { name: tool.name, url, count: data.count } : null;
        })
        .filter(t => t);
    
    topToolsList.innerHTML = sorted.length ? sorted.map(t => `
        <li><span title="${t.url}">${t.name}</span></li>
    `).join('') : '';
}

function updateTrending() {
    const trendingList = document.getElementById('newTrendingList');
    if (!trendingList) return;
    
    const sorted = Object.entries(clickStats)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 5)
        .map(([url, data]) => {
            const allTools = getAllTools();
            const tool = allTools.find(t => t.url === url);
            return tool ? { name: tool.name, url, count: data.count } : null;
        })
        .filter(t => t);
    
    trendingList.innerHTML = sorted.length ? sorted.map(t => `
        <li onclick="window.open('${t.url}', '_blank')"><span>${t.name}</span></li>
    `).join('') : '<li style="text-align:center;">لا يوجد بيانات بعد</li>';
}

function updateRecentlyUsed() {
    const recentList = document.getElementById('newRecentList');
    if (!recentList) return;
    
    const sorted = Object.entries(clickStats)
        .sort((a, b) => b[1].lastUsed - a[1].lastUsed)
        .slice(0, 5)
        .map(([url, data]) => {
            const allTools = getAllTools();
            const tool = allTools.find(t => t.url === url);
            return tool ? { name: tool.name, url } : null;
        })
        .filter(t => t);
    
    recentList.innerHTML = sorted.length ? sorted.map(t => `
        <li onclick="window.open('${t.url}', '_blank')"><span>${t.name}</span></li>
    `).join('') : '<li style="text-align:center;">لا يوجد بيانات بعد</li>';
}

function updateFavorites() {
    const favList = document.getElementById('newFavoritesList');
    if (!favList) return;
    
    if (favorites.length === 0) {
        favList.innerHTML = '<li style="text-align:center;">لا توجد أدوات في المفضلة</li>';
        return;
    }
    
    favList.innerHTML = favorites.map(tool => `
        <li><span>${tool.name}</span><i class="fas fa-trash-alt new-fav-remove" data-url="${tool.url}" style="color:var(--accent);cursor:pointer;"></i></li>
    `).join('');
    
    document.querySelectorAll('.new-fav-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const url = btn.dataset.url;
            favorites = favorites.filter(f => f.url !== url);
            localStorage.setItem('new_favorites', JSON.stringify(favorites));
            updateFavorites();
            updateSidebarStats();
            window.showToast('تمت الإزالة من المفضلة', 'success');
        });
    });
}

function recordClick(url) {
    const now = Date.now();
    clickStats[url] = clickStats[url] || { count: 0, lastUsed: 0 };
    clickStats[url].count++;
    clickStats[url].lastUsed = now;
    localStorage.setItem('new_clickStats', JSON.stringify(clickStats));
    updateTopTools();
    updateTrending();
    updateRecentlyUsed();
    updateSidebarStats();
}

function attachToolEvents() {
    document.querySelectorAll('.tool-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const toolCard = link.closest('.tool-card');
            if (!toolCard) return;
            const nameElem = toolCard.querySelector('.tool-name');
            const url = link.href;
            if (nameElem) {
                recordClick(url);
            }
        });
    });
    
    document.querySelectorAll('.tool-card').forEach(card => {
        const starBtn = card.querySelector('.new-fav-star');
        if (starBtn) starBtn.remove();
        
        const newStarBtn = document.createElement('i');
        newStarBtn.className = 'fas fa-star new-fav-star';
        newStarBtn.style.cssText = 'position:absolute;top:1rem;left:1rem;font-size:1.2rem;color:var(--accent);cursor:pointer;z-index:10;opacity:0.7;transition:all 0.3s;';
        newStarBtn.onmouseover = () => { newStarBtn.style.opacity = '1'; newStarBtn.style.transform = 'scale(1.2)'; };
        newStarBtn.onmouseout = () => { newStarBtn.style.opacity = '0.7'; newStarBtn.style.transform = 'scale(1)'; };
        
        const toolNameElem = card.querySelector('.tool-name');
        const toolDescElem = card.querySelector('.tool-desc');
        const toolIconElem = card.querySelector('.card-icon i');
        const toolLinkElem = card.querySelector('.tool-link');
        
        const toolName = toolNameElem ? toolNameElem.textContent : '';
        const toolDesc = toolDescElem ? toolDescElem.textContent : '';
        const toolIcon = toolIconElem ? toolIconElem.className : 'fa-solid fa-robot';
        const toolUrl = toolLinkElem ? toolLinkElem.href : '#';
        
        const tool = { name: toolName, desc: toolDesc, icon: toolIcon, url: toolUrl };
        
        if (favorites.some(f => f.url === tool.url)) {
            newStarBtn.style.color = 'gold';
        }
        
        newStarBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (favorites.some(f => f.url === tool.url)) {
                favorites = favorites.filter(f => f.url !== tool.url);
                newStarBtn.style.color = 'var(--accent)';
window.showToast('تمت الإزالة من المفضلة', 'success');
            } else {
                favorites.push(tool);
                newStarBtn.style.color = 'gold';
                window.showToast('تمت الإضافة إلى المفضلة', 'success');
            }
            localStorage.setItem('new_favorites', JSON.stringify(favorites));
            updateFavorites();
            updateSidebarStats();
        });
        
        card.style.position = 'relative';
        card.appendChild(newStarBtn);
    });
}

// =================================================================
// 12. الشريط الجانبي
// =================================================================
function initSidebar() {
    const toggleBtn = document.getElementById('newSidebarToggle');
    const sidebar = document.getElementById('newSidebar');
    const closeSidebar = document.getElementById('newSidebarClose');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => sidebar.classList.add('open'));
        if (closeSidebar) closeSidebar.addEventListener('click', () => sidebar.classList.remove('open'));
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target) && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
            }
        });
    }
}

// =================================================================
// 13. إعدادات الترتيب
// =================================================================
function initSortControls() {
    const btns = document.querySelectorAll('.sort-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.dataset.sort;
            if (currentCategoryIndex === null) {
                renderMainPage();
            } else {
                renderCategoryPage(currentCategoryIndex);
            }
        });
    });
}

// =================================================================
// 14. إحصائيات الزوار
// =================================================================
function initVisitorStats() {
    const today = new Date().toDateString();
    let visits = JSON.parse(localStorage.getItem('visits')) || {};
    if (visits[today]) {
        visits[today]++;
    } else {
        visits[today] = 1;
    }
    localStorage.setItem('visits', JSON.stringify(visits));
    const totalVisits = Object.values(visits).reduce((a, b) => a + b, 0);
    const statsDiv = document.getElementById('visitorStats');
    if (statsDiv) statsDiv.innerHTML = `Today's visitors: ${visits[today]} | Total visits: ${totalVisits}`;
}

// =================================================================
// 15. التهيئة عند تحميل الصفحة
// =================================================================
function initApp() {
    const urlParams = new URLSearchParams(window.location.search);
    const catIndex = urlParams.get('index');

    if (catIndex !== null) {
        renderCategoryPage(parseInt(catIndex));
    } else {
        renderMainPage();
        currentCategoryIndex = null;
    }

    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.addEventListener('input', debounceFilter);

    setupAutocomplete();
    setupClearSearch();
    initTheme();
    initParticles();
    initNeuralNetwork();
    typeEffect();
    window.addEventListener('scroll', updateProgressBar);
    initSortControls();
    initSidebar();
    updateFavorites();
    updateSidebarStats();
    updateTrending();
    updateRecentlyUsed();
    
    // إخفاء مؤشر التحميل
    setTimeout(() => {
        const loader = document.getElementById('pageLoaderFull');
        if (loader) loader.style.display = 'none';
    }, 500);
}

// =================================================================
// 21. إعدادات PWA والتطبيق
// =================================================================
document.addEventListener('DOMContentLoaded', initApp);

// =================================================================
// 22. منع النسخ وأدوات المطور
// =================================================================
document.addEventListener('keydown', e => {
    if (e.ctrlKey && (e.key === 'c' || e.key === 'x' || e.key === 'v' || e.key === 's' || e.key === 'p')) {
        e.preventDefault();
    }
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
});

document.addEventListener('contextmenu', e => {
    e.preventDefault();
});

// =================================================================
// 17. Service Worker
// =================================================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('SW registered:', registration.scope);
            })
            .catch((err) => {
                console.log('SW registration failed:', err);
            });
    });
}

// =================================================================
// 18. Online/Offline Status
// =================================================================
window.addEventListener('online', () => {
    if (window.showToast) window.showToast('Internet connection restored', 'success');
});

window.addEventListener('offline', () => {
    if (window.showToast) window.showToast('No internet connection. Some features may not work.', 'error');
});
