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
// 1b. نظام الترجمة (i18n)
// =================================================================
const translations = {
    ar: {
        developer_role: 'المطور والمؤسس',
        contact_support: 'تواصل مع فريق الدعم',
        header_subtitle: 'دليلك الشامل لأدوات الذكاء الاصطناعي',
        stat_year: 'السنة',
        stat_tools: 'أداة AI',
        stat_categories: 'قسم',
        breadcrumb_home: 'الرئيسية',
        search_placeholder: 'ابحث عن أداة ذكاء اصطناعي...',
        sort_default: 'الافتراضي',
        sort_name: 'بالاسم',
        sort_count: 'بالعدد',
        filter_title: 'تصفية الأدوات',
        filter_price: 'السعر',
        filter_all: 'الكل',
        filter_free: 'مجاني',
        filter_freemium: 'فريميوم',
        filter_paid: 'مدفوع',
        filter_type: 'النوع',
        filter_tool: 'أداة متخصصة',
        filter_assistant: 'مساعد ذكي',
        filter_platform: 'منصة متكاملة',
        filter_platform_label: 'المنصة',
        filter_web: 'ويب',
        filter_mobile: 'موبايل',
        filter_desktop: 'ديسكتوب',
        filter_lang: 'اللغة',
        filter_ar: 'يدعم العربية',
        filter_en: 'يدعم الإنجليزية',
        filter_rating: 'التقييم الأدنى',
        filter_any_rating: 'أي تقييم',
        filter_year: 'السنة',
        filter_apply: 'تطبيق',
        filter_reset: 'إعادة تعيين',
        filter_results: 'نتيجة',
        clear_filters: 'إلغاء التصفية',
        no_results: 'لا توجد أدوات مطابقة. جرب كلمة مفتاحية أخرى!',
        sidebar_title: 'القائمة الذكية',
        sidebar_categories: 'الأقسام',
        sidebar_tools: 'الأدوات',
        sidebar_favorites: 'المفضلة',
        sidebar_trending: 'الأكثر استخداماً',
        sidebar_recent: 'الاستخدام الأخير',
        sidebar_favorites_title: 'المفضلة',
        footer_rights: 'جميع الحقوق محفوظة',
        tools_count: 'أداة',
        view_tool: 'زيارة',
        categories_title: 'الأقسام',
        tools_in_category: 'أداة',
        back_home: 'العودة للرئيسية',
        reviews: 'التقييمات',
        write_review: 'اكتب تقييمك',
        your_name: 'اسمك',
        your_rating: 'تقييمك',
        your_review: 'تعليقك',
        submit_review: 'إرسال التقييم',
        no_reviews: 'لا توجد تقييمات بعد. كن أول من يقيّم!',
        average_rating: 'متوسط التقييم',
        total_reviews: 'إجمالي التقييمات',
        trending: 'الأكثر استخداماً',
        recent: 'الأخيرة',
        favorites_list: 'المفضلة',
        no_favorites: 'لا توجد مفضلة بعد',
        no_trending: 'لا توجد استخدامات بعد',
        no_recent: 'لا توجد استخدامات حديثة',
        dashboard: 'لوحة التحكم',
        visits: 'الزيارات',
        clicks: 'النقرات',
        time_spent: 'وقت التصفح',
        achievements: 'الإنجازات',
        recommendations: 'توصيات',
        export_stats: 'تصدير الإحصائيات',
        reset_stats: 'إعادة تعيين',
        edit_profile: 'تعديل الملف',
        close: 'إغلاق',
        save: 'حفظ',
        cancel: 'إلغاء',
        online: 'متصل',
        offline: 'غير متصل — بعض الميزات قد لا تعمل',
        connection_restored: 'تم استعادة الاتصال',
        search_english: 'Search for an AI tool...',
        sort_default_en: 'Default',
        sort_name_en: 'By Name',
        sort_count_en: 'By Count',
        filter_title_en: 'Filter Tools',
        filter_price_en: 'Price',
        filter_all_en: 'All',
        filter_free_en: 'Free',
        filter_freemium_en: 'Freemium',
        filter_paid_en: 'Paid',
        filter_type_en: 'Type',
        filter_tool_en: 'Specialized Tool',
        filter_assistant_en: 'AI Assistant',
        filter_platform_en: 'Platform',
        filter_platform_label_en: 'Platform',
        filter_web_en: 'Web',
        filter_mobile_en: 'Mobile',
        filter_desktop_en: 'Desktop',
        filter_lang_en: 'Language',
        filter_ar_en: 'Supports Arabic',
        filter_en_en: 'Supports English',
        filter_rating_en: 'Min Rating',
        filter_any_rating_en: 'Any Rating',
        filter_year_en: 'Year',
        filter_apply_en: 'Apply',
        filter_reset_en: 'Reset',
        filter_results_en: 'results',
        clear_filters_en: 'Clear Filters',
        no_results_en: 'No matching tools. Try another keyword!',
        sidebar_title_en: 'Smart Menu',
        sidebar_categories_en: 'Categories',
        sidebar_tools_en: 'Tools',
        sidebar_favorites_en: 'Favorites',
        sidebar_trending_en: 'Most Used',
        sidebar_recent_en: 'Recent',
        sidebar_favorites_title_en: 'Favorites',
        footer_rights_en: 'All Rights Reserved',
        tools_count_en: 'tools',
        view_tool_en: 'Visit',
        categories_title_en: 'Categories',
        tools_in_category_en: 'tools',
        back_home_en: 'Back to Home',
        reviews_en: 'Reviews',
        write_review_en: 'Write a review',
        your_name_en: 'Your name',
        your_rating_en: 'Your rating',
        your_review_en: 'Your review',
        submit_review_en: 'Submit Review',
        no_reviews_en: 'No reviews yet. Be the first to review!',
        average_rating_en: 'Average Rating',
        total_reviews_en: 'Total Reviews',
        trending_en: 'Most Used',
        recent_en: 'Recent',
        favorites_list_en: 'Favorites',
        no_favorites_en: 'No favorites yet',
        no_trending_en: 'No usage yet',
        no_recent_en: 'No recent usage',
        dashboard_en: 'Dashboard',
        visits_en: 'Visits',
        clicks_en: 'Clicks',
        time_spent_en: 'Browsing Time',
        achievements_en: 'Achievements',
        recommendations_en: 'Recommendations',
        export_stats_en: 'Export Stats',
        reset_stats_en: 'Reset',
        edit_profile_en: 'Edit Profile',
        close_en: 'Close',
        save_en: 'Save',
        cancel_en: 'Cancel',
        online_en: 'Online',
        offline_en: 'Offline — some features may not work',
        connection_restored_en: 'Connection restored'
    },
    en: {}
};

// Build English translations from Arabic keys
(function buildEnTranslations() {
    const en = translations.en;
    const ar = translations.ar;
    for (const key in ar) {
        if (key.endsWith('_en')) {
            const baseKey = key.slice(0, -3);
            en[baseKey] = ar[key];
        } else if (!key.endsWith('_en') && !ar[key + '_en']) {
            en[key] = ar[key];
        }
    }
})();

function t(key) {
    if (currentLang === 'ar') return translations.ar[key] || key;
    return translations.en[key] || translations.ar[key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translated = t(key);
        if (translated) el.textContent = translated;
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const translated = t(key);
        if (translated) el.placeholder = translated;
    });
    const langLabel = document.getElementById('langLabel');
    if (langLabel) langLabel.textContent = currentLang === 'ar' ? 'EN' : 'عربي';
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('appLang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    applyTranslations();
}

function initLanguage() {
    const savedLang = localStorage.getItem('appLang') || 'ar';
    setLanguage(savedLang);
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            setLanguage(currentLang === 'ar' ? 'en' : 'ar');
        });
    }
}

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
function catName(cat) {
    return currentLang === 'en' && cat.nameEn ? cat.nameEn : cat.name;
}

function toolDesc(tool) {
    return currentLang === 'en' && tool.descEn ? tool.descEn : tool.desc;
}

function renderMainPage() {
    document.title = currentLang === 'ar' ? "Abdulrahman AI | دليل أدوات الذكاء الاصطناعي" : "Abdulrahman AI | AI Tools Guide";
    const container = document.getElementById('contentContainer');
    let catsToRender = [...categories];
    
    if (currentSort === 'name') {
        catsToRender.sort((a, b) => catName(a).localeCompare(catName(b)));
    } else if (currentSort === 'count') {
        catsToRender.sort((a, b) => b.tools.length - a.tools.length);
    }
    
    const toolsLabel = currentLang === 'en' ? 'tools available' : 'أداة متاحة';
    
    container.innerHTML = `
        <div class="categories-grid">
            ${catsToRender.map((cat, index) => `
                <a href="?index=${categories.findIndex(c => c.name === cat.name)}" class="category-card" style="--card-index: ${index + 1};" data-category="${cat.name}">
                    <div class="category-card-icon"><i class="${cat.icon}"></i></div>
                    <h3>${catName(cat)}</h3>
                    <p>${cat.tools.length} ${toolsLabel}</p>
                </a>
            `).join('')}
        </div>
    `;
    
    const noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = 'none';
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
        searchInput.placeholder = t('search_placeholder');
    }
    
    updateBreadcrumbs();
    const sortControls = document.getElementById('sortControls');
    if (sortControls) sortControls.style.display = 'flex';
    
    attachToolEvents();
    updateSidebarStats();
    initCategoryCardGlow();
}

function renderCategoryPage(index) {
    const cat = categories[index];
    if (!cat) {
        window.location.href = window.location.pathname;
        return;
    }
    
    currentCategoryIndex = index;
    const displayName = catName(cat);
    document.title = `${displayName} | Abdulrahman AI`;
    const container = document.getElementById('contentContainer');
    
    const backText = currentLang === 'en' ? 'Back to all categories' : 'العودة لجميع الأقسام';
    const visitText = t('view_tool');
    const searchInText = currentLang === 'en' ? 'Search in' : 'ابحث في';
    
    container.innerHTML = `
        <a href="${window.location.pathname}" class="back-link">
            <i class="fa-solid fa-arrow-left"></i> ${backText}
        </a>
        <div class="category-header" onclick="window.location.href='${window.location.pathname}'">
            <div class="category-icon"><i class="${cat.icon}"></i></div>
            <h2 class="category-title">${displayName}</h2>
        </div>
        <div class="tools-grid" id="toolsGrid">
            ${cat.tools.map((tool, idx) => `
                <div class="tool-card" style="--card-index: ${idx + 1};">
                    <div class="card-icon"><i class="${tool.icon}"></i></div>
                    <h3 class="tool-name">${tool.name}</h3>
                    <p class="tool-desc">${toolDesc(tool)}</p>
                    <a href="${tool.url}" class="tool-link" target="_blank" rel="noopener noreferrer">
                        <span>${visitText}</span>
                        <i class="fa-solid fa-arrow-right"></i>
                    </a>
                </div>
            `).join('')}
        </div>
    `;
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.placeholder = `${searchInText} ${displayName}...`;
        searchInput.value = '';
    }
    
    const noResults = document.getElementById('noResults');
    if (noResults) noResults.style.display = 'none';
    
    updateBreadcrumbs(displayName);
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

// =================================================================
// 4.5 نظام التصفية المتقدم
// =================================================================

let filterState = {
    price: 'all',      // all | free | freemium | paid
    type: [],           // tool | assistant | platform
    platform: [],       // web | mobile | desktop
    lang: [],           // ar | en
    rating: 0,          // 0 = any, 1-5
    year: 2026
};

let isFilterActive = false;

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
        
        // البحث عن الأدوات الفردية في جميع الأقسام
        const allTools = [];
        categories.forEach(cat => {
            cat.tools.forEach(tool => {
                const nameMatch = tool.name.toLowerCase().includes(query);
                const descMatch = tool.desc.toLowerCase().includes(query);
                const descEnMatch = tool.descEn && tool.descEn.toLowerCase().includes(query);
                const catNameMatch = cat.name.toLowerCase().includes(query);
                const catNameEnMatch = cat.nameEn && cat.nameEn.toLowerCase().includes(query);
                if (nameMatch || descMatch || descEnMatch || catNameMatch || catNameEnMatch) {
                    allTools.push({ ...tool, category: cat.name, categoryIcon: cat.icon });
                }
            });
        });
        
        // تجميع النتائج حسب القسم
        const grouped = {};
        allTools.forEach(tool => {
            if (!grouped[tool.category]) grouped[tool.category] = { icon: tool.categoryIcon, tools: [] };
            grouped[tool.category].tools.push(tool);
        });
        
        const catNames = Object.keys(grouped);
        
        // أيضاً عرض الأقسام التي اسمها يطابق البحث حتى لو مافي أدوات مطابقة
        categories.forEach(cat => {
            if ((cat.name.toLowerCase().includes(query) || (cat.nameEn && cat.nameEn.toLowerCase().includes(query))) && !grouped[cat.name]) {
                grouped[cat.name] = { icon: cat.icon, tools: [] };
            }
        });
        
        const entries = Object.entries(grouped);
        
        if (entries.length === 0) {
            if (container) container.innerHTML = '';
            if (noResults) noResults.style.display = 'block';
        } else {
            const toolsLabel = currentLang === 'en' ? 'tools' : 'أدوات';
            const visitText = t('view_tool');
            const allToolsText = currentLang === 'en' ? 'All tools in this category' : 'جميع أدوات هذا القسم';
            if (container) {
                container.innerHTML = entries.map(([catKey, data]) => {
                    const catObj = categories.find(c => c.name === catKey);
                    const displayName = catObj ? catName(catObj) : catKey;
                    return `
                    <div class="filtered-category-section">
                        <div class="category-header-mini">
                            <div class="category-icon-mini"><i class="${data.icon}"></i></div>
                            <span class="category-title-mini">${displayName}</span>
                            <span class="category-count-mini">${data.tools.length} ${toolsLabel}</span>
                            <a href="?index=${categories.findIndex(c => c.name === catKey)}" class="category-link-inside" title="${currentLang === 'en' ? 'View all categories' : 'عرض كل الأقسام'}"><i class="fas fa-arrow-left"></i></a>
                        </div>
                        ${data.tools.length > 0 ? `
                        <div class="tools-grid">
                            ${data.tools.map((tool, idx) => `
                                <div class="tool-card" style="--card-index: ${idx + 1};">
                                    <div class="card-icon"><i class="${tool.icon}"></i></div>
                                    <h3 class="tool-name">${tool.name}</h3>
                                    <p class="tool-desc">${toolDesc(tool)}</p>
                                    <a href="${tool.url}" class="tool-link" target="_blank" rel="noopener noreferrer">
                                        <span>${visitText}</span>
                                        <i class="fa-solid fa-arrow-right"></i>
                                    </a>
                                </div>
                            `).join('')}
                        </div>` : `<p style="padding:1rem;color:var(--text-muted-light);font-size:0.85rem;">${allToolsText}</p>`}
                    </div>`;
                }).join('');
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
                        <span>زيارة</span>
                        <i class="fa-solid fa-arrow-right"></i>
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
                            <span>زيارة</span>
                            <i class="fa-solid fa-arrow-right"></i>
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
// 9. الخلفية المتحركة الناعمة
// =================================================================
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const isLowEnd = window.navigator.hardwareConcurrency <= 4;
    const ctx = canvas.getContext('2d');
    let width, height, time = 0;
    let blobs = [
        { x: 0.3, y: 0.25, r: 99, g: 102, b: 241, dx: 0.002, dy: 0.0015, size: 0.45 },
        { x: 0.7, y: 0.35, r: 14, g: 165, b: 233, dx: -0.0015, dy: 0.002, size: 0.4 },
        { x: 0.5, y: 0.7, r: 139, g: 92, b: 246, dx: 0.001, dy: -0.0015, size: 0.35 }
    ];
    if (isLowEnd) blobs = blobs.slice(0, 2);

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    resize();
    window.addEventListener('resize', resize);

    function animate() {
        if (!ctx) return;
        time += 0.003;
        ctx.clearRect(0, 0, width, height);

        const isDark = document.body.classList.contains('dark-mode');
        const alpha = isDark ? 0.25 : 0.12;

        blobs.forEach(b => {
            b.x += b.dx + Math.sin(time * 0.5 + b.r) * 0.001;
            b.y += b.dy + Math.cos(time * 0.4 + b.g) * 0.001;
            if (b.x < 0 || b.x > 1) b.dx *= -1;
            if (b.y < 0 || b.y > 1) b.dy *= -1;

            const cx = b.x * width;
            const cy = b.y * height;
            const radius = Math.min(width, height) * b.size;
            
            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            grad.addColorStop(0, `rgba(${b.r}, ${b.g}, ${b.b}, ${alpha})`);
            grad.addColorStop(0.5, `rgba(${b.r}, ${b.g}, ${b.b}, ${alpha * 0.3})`);
            grad.addColorStop(1, `rgba(${b.r}, ${b.g}, ${b.b}, 0)`);
            
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, width, height);
        });

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
function inferFilterProps(tool, categoryName) {
    const name = tool.name.toLowerCase();
    const desc = tool.desc.toLowerCase();
    let price = 'free';
    if (name.includes('pro') || name.includes('premium') || name.includes('enterprise') || tool.badge === 'Pro') price = 'paid';
    if (name.includes('lite') || name.includes('mini') || name.includes('trial') || name.includes('basic')) price = 'freemium';
    if (name.includes('turbo') || name.includes('flash')) price = 'freemium';
    
    let type = 'tool';
    if (name.includes('assistant') || name.includes('chat') || name.includes('bot') || name.includes('gpt')) type = 'assistant';
    if (categoryName.includes('Platform') || name.includes('studio') || name.includes('workspace')) type = 'platform';
    
    let platform = 'web';
    if (name.includes('app') || categoryName.includes('Mobile')) platform = 'mobile';
    if (name.includes('desktop') || name.includes('studio')) platform = 'desktop';
    
    let lang = 'en';
    if (desc.includes('arabic') || desc.includes('عربي') || desc.includes('بالعربية')) lang = 'ar';
    
    let rating = 3;
    if (tool.badge === 'Best' || tool.badgeColor === 'gold') rating = 5;
    else if (tool.badge === 'Pro' || tool.badgeColor === 'purple') rating = 4;
    else if (tool.badge === 'New' || tool.badgeColor === 'cyan') rating = 4;
    else if (tool.badge === 'Fast' || tool.badgeColor === 'green') rating = 3;
    else if (name.includes('turbo')) rating = 4;
    
    let year = 2026;
    return { price, type, platform, lang, rating, year };
}

function getAllTools() {
    const all = [];
    categories.forEach(cat => {
        cat.tools.forEach(tool => {
            const props = inferFilterProps(tool, cat.name);
            all.push({
                ...tool,
                category: cat.name,
                categoryIcon: cat.icon,
                price: tool.price || props.price,
                type: tool.type || props.type,
                platform: tool.platform || props.platform,
                lang: tool.lang || props.lang,
                rating: tool.rating || props.rating,
                year: tool.year || props.year,
                _filterIndex: all.length
            });
        });
    });
    return all;
}

// =================================================================
// 4.5 نظام التصفية المتقدم
// =================================================================

function initFilterSystem() {
    const filterToggle = document.getElementById('filterToggleBtn');
    const filterHeader = document.getElementById('filterHeader');
    const filterBody = document.getElementById('filterBody');
    
    if (filterHeader && filterBody) {
        filterHeader.addEventListener('click', function(e) {
            if (!e.target.closest('.filter-toggle-btn') && !e.target.closest('.filter-actions')) {
                filterBody.classList.toggle('show');
                if (filterToggle) filterToggle.classList.toggle('active');
            }
        });
    }
    if (filterToggle) {
        filterToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            filterBody.classList.toggle('show');
            filterToggle.classList.toggle('active');
        });
    }
    
    initRatingStars();
    initYearRange();
    initFilterEvents();
    updateResultsCount();
}

function initRatingStars() {
    const stars = document.querySelectorAll('#ratingStars span');
    const ratingValue = document.getElementById('ratingValue');
    let selectedRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.dataset.value);
            selectedRating = selectedRating === value ? 0 : value;
            filterState.rating = selectedRating;
            
            stars.forEach(s => s.classList.remove('active'));
            if (selectedRating > 0) {
                stars.forEach(s => {
                    if (parseInt(s.dataset.value) <= selectedRating) s.classList.add('active');
                });
            }
            if (ratingValue) {
                ratingValue.textContent = selectedRating > 0 ? selectedRating + '+ نجوم' : 'أي تقييم';
            }
        });
        
        star.addEventListener('mouseenter', function() {
            const value = parseInt(this.dataset.value);
            stars.forEach(s => {
                if (parseInt(s.dataset.value) <= value) s.style.color = '#fbbf24';
                else s.style.color = '';
            });
        });
        
        star.addEventListener('mouseleave', function() {
            if (selectedRating === 0) {
                stars.forEach(s => s.style.color = '');
            } else {
                stars.forEach(s => {
                    if (parseInt(s.dataset.value) <= selectedRating) s.style.color = '#fbbf24';
                    else s.style.color = '';
                });
            }
        });
    });
}

function initYearRange() {
    const yearRange = document.getElementById('yearRange');
    const yearValue = document.getElementById('yearValue');
    if (yearRange && yearValue) {
        yearRange.addEventListener('input', function() {
            filterState.year = parseInt(this.value);
            yearValue.textContent = this.value;
        });
    }
}

function initFilterEvents() {
    document.querySelectorAll('.filter-options input[type="radio"]').forEach(input => {
        input.addEventListener('change', function() {
            const group = this.closest('.filter-options');
            const filterKey = group.dataset.filter;
            if (filterKey) {
                filterState[filterKey] = this.value;
            }
        });
    });
    
    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', function() {
            const group = this.closest('.filter-options');
            const filterKey = group.dataset.filter;
            if (filterKey) {
                if (this.checked) {
                    if (!filterState[filterKey].includes(this.value)) {
                        filterState[filterKey].push(this.value);
                    }
                } else {
                    filterState[filterKey] = filterState[filterKey].filter(v => v !== this.value);
                }
            }
        });
    });
    
    const applyBtn = document.getElementById('applyFiltersBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            applyFilters();
            const filterBody = document.getElementById('filterBody');
            const filterToggle = document.getElementById('filterToggleBtn');
            if (filterBody) filterBody.classList.remove('show');
            if (filterToggle) filterToggle.classList.remove('active');
        });
    }
    
    const resetBtn = document.getElementById('resetFiltersBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }
    
    const clearBtn = document.getElementById('clearFiltersBtn');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            resetFilters();
            const indicator = document.getElementById('filteredToolsIndicator');
            if (indicator) indicator.style.display = 'none';
            if (currentCategoryIndex === null) renderMainPage();
            else renderCategoryPage(currentCategoryIndex);
        });
    }
}

function applyFilters() {
    const price = filterState.price;
    const types = filterState.type;
    const platforms = filterState.platform;
    const langs = filterState.lang;
    const minRating = filterState.rating;
    const minYear = filterState.year;
    
    isFilterActive = price !== 'all' || types.length > 0 || platforms.length > 0 || langs.length > 0 || minRating > 0 || minYear > 2020;
    
    if (!isFilterActive) {
        const indicator = document.getElementById('filteredToolsIndicator');
        if (indicator) indicator.style.display = 'none';
        if (currentCategoryIndex === null) renderMainPage();
        else renderCategoryPage(currentCategoryIndex);
        return;
    }
    
    const allTools = getAllTools();
    let filtered = allTools.filter(tool => {
        if (price !== 'all' && tool.price !== price) return false;
        if (types.length > 0 && !types.includes(tool.type)) return false;
        if (platforms.length > 0 && !platforms.includes(tool.platform)) return false;
        if (langs.length > 0 && !langs.includes(tool.lang)) return false;
        if (minRating > 0 && tool.rating < minRating) return false;
        if (tool.year < minYear) return false;
        return true;
    });
    
    // تجميع النتائج حسب القسم
    const grouped = {};
    filtered.forEach(tool => {
        if (!grouped[tool.category]) {
            grouped[tool.category] = {
                category: tool.category,
                icon: tool.categoryIcon,
                tools: []
            };
        }
        grouped[tool.category].tools.push(tool);
    });
    
    // عرض النتائج
    const container = document.getElementById('contentContainer');
    const sortControls = document.getElementById('sortControls');
    if (sortControls) sortControls.style.display = 'none';
    
    const catsArray = Object.values(grouped);
    // ترتيب حسب عدد الأدوات
    catsArray.sort((a, b) => b.tools.length - a.tools.length);
    
    if (catsArray.length === 0) {
        container.innerHTML = `
            <div class="empty-filter">
                <i class="fas fa-filter" style="font-size:3rem;color:var(--text-muted-light);margin-bottom:1rem;"></i>
                <h3>لا توجد نتائج تطابق معايير التصفية</h3>
                <p style="color:var(--text-muted-light);margin:.5rem 0 1rem;">حاول تغيير معايير التصفية أو إعادة تعيينها</p>
                <button class="btn-reset-filter" onclick="resetFilters()">
                    <i class="fas fa-undo"></i> إعادة تعيين التصفية
                </button>
            </div>
        `;
    } else {
        container.innerHTML = catsArray.map(cat => `
            <div class="filtered-category-section">
                <div class="category-header-mini">
                    <div class="category-icon-mini"><i class="${cat.icon}"></i></div>
                    <span class="category-title-mini">${cat.category}</span>
                    <span class="category-count-mini">${cat.tools.length} أدوات</span>
                </div>
                <div class="tools-grid">
                    ${cat.tools.map(tool => {
                        const badgePrice = tool.price === 'paid' ? 'مدفوع' : tool.price === 'freemium' ? 'فريميوم' : 'مجاني';
                        const badgeClass = tool.price === 'paid' ? 'price-paid' : tool.price === 'freemium' ? 'price-freemium' : 'price-free';
                        return `
                            <div class="tool-card" style="--card-index: 1;">
                                <div class="card-icon"><i class="${tool.icon}"></i></div>
                                <h3 class="tool-name">${tool.name}</h3>
                                <span class="price-badge ${badgeClass}">${badgePrice}</span>
                                <p class="tool-desc">${tool.desc}</p>
                                <div class="tool-meta">
                                    <span><i class="fas fa-star" style="color:#fbbf24"></i> ${tool.rating}/5</span>
                                    <span><i class="fas fa-calendar"></i> ${tool.year}</span>
                                </div>
                                <a href="${tool.url}" class="tool-link" target="_blank" rel="noopener noreferrer">
                                    <span>زيارة</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </a>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `).join('');
    }
    
    const indicator = document.getElementById('filteredToolsIndicator');
    if (indicator) {
        indicator.style.display = 'flex';
        document.getElementById('filteredCount').textContent = `تم تطبيق التصفية - ${filtered.length} نتائج`;
    }
    
    updateResultsCount();
    attachToolEvents();
}

function resetFilters() {
    filterState = {
        price: 'all',
        type: [],
        platform: [],
        lang: [],
        rating: 0,
        year: 2026
    };
    isFilterActive = false;
    
    // إعادة تعيين واجهة المستخدم
    document.querySelectorAll('.filter-options input[type="radio"]').forEach(input => {
        if (input.value === 'all') input.checked = true;
        else input.checked = false;
    });
    document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(input => {
        input.checked = false;
    });
    
    const yearRange = document.getElementById('yearRange');
    const yearValue = document.getElementById('yearValue');
    if (yearRange) yearRange.value = 2020;
    if (yearValue) yearValue.textContent = '2026';
    
    const stars = document.querySelectorAll('#ratingStars span');
    stars.forEach(s => s.classList.remove('active'));
    const ratingValue = document.getElementById('ratingValue');
    if (ratingValue) ratingValue.textContent = 'أي تقييم';
    
    const indicator = document.getElementById('filteredToolsIndicator');
    if (indicator) indicator.style.display = 'none';
    
    updateResultsCount();
    
    // إعادة عرض الصفحة
    if (currentCategoryIndex === null) renderMainPage();
    else renderCategoryPage(currentCategoryIndex);
}

function updateResultsCount() {
    const countElem = document.getElementById('resultsCount');
    if (!countElem) return;
    const activeFilters = isFilterActive;
    if (activeFilters) {
        countElem.textContent = getAllTools().filter(tool => {
            if (filterState.price !== 'all' && tool.price !== filterState.price) return false;
            if (filterState.type.length > 0 && !filterState.type.includes(tool.type)) return false;
            if (filterState.platform.length > 0 && !filterState.platform.includes(tool.platform)) return false;
            if (filterState.lang.length > 0 && !filterState.lang.includes(tool.lang)) return false;
            if (filterState.rating > 0 && tool.rating < filterState.rating) return false;
            if (tool.year < filterState.year) return false;
            return true;
        }).length;
    } else {
        countElem.textContent = getAllTools().length;
    }
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
    
    if (sorted.length === 0) {
        trendingList.innerHTML = '<li style="text-align:center;">✨ لا توجد بيانات بعد</li>';
        return;
    }
    
    trendingList.innerHTML = sorted.map(t => `
        <li onclick="window.open('${t.url}', '_blank')" title="تمت زيارته ${t.count} مرة">
            <span>${t.name}</span>
            <span class="trend-count">${t.count}</span>
        </li>
    `).join('');
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
    
    addRatingButtonToTools();
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

let wasOffline = false;

function initNetworkStatus() {
    function updateNetworkStatus() {
        const isOnline = navigator.onLine;
        
        if (!isOnline && !wasOffline) {
            showToast('⚠️ لا يوجد اتصال بالإنترنت. بعض الميزات قد لا تعمل.', 'error');
            document.body.classList.add('offline-mode');
        } else if (isOnline && wasOffline) {
            showToast('✅ تم استعادة الاتصال بالإنترنت', 'success');
            document.body.classList.remove('offline-mode');
            if (currentCategoryIndex !== null) {
                renderCategoryPage(currentCategoryIndex);
            } else {
                renderMainPage();
            }
        }
        
        wasOffline = !isOnline;
    }
    
    window.addEventListener('online', updateNetworkStatus);
    window.addEventListener('offline', updateNetworkStatus);
    updateNetworkStatus();
}

const offlineStyles = `
.offline-mode .tool-link {
    opacity: 0.6;
    pointer-events: none;
}
.offline-mode .search-wrapper input {
    background: rgba(0,0,0,0.05);
}
`;
document.head.insertAdjacentHTML('beforeend', `<style>${offlineStyles}</style>`);

// =================================================================
// 14. تحسينات إضافية - موبايل
// =================================================================
function initStickySearch() {
    const searchSection = document.querySelector('.search-section');
    const header = document.querySelector('.header');
    if (!searchSection || !header) return;
    
    const observer = new IntersectionObserver(([e]) => {
        searchSection.classList.toggle('sticky', e.intersectionRatio < 1);
    }, { threshold: [1] });
    
    observer.observe(header);
}

// =================================================================
// نظام التقييمات والتعليقات
// =================================================================

let reviews = JSON.parse(localStorage.getItem('tool_reviews')) || {};

function getToolReviews(toolUrl) {
    if (!reviews[toolUrl]) {
        reviews[toolUrl] = {
            averageRating: 0,
            totalRatings: 0,
            ratings: {1:0, 2:0, 3:0, 4:0, 5:0},
            comments: []
        };
    }
    return reviews[toolUrl];
}

function saveReviews() {
    localStorage.setItem('tool_reviews', JSON.stringify(reviews));
}

function addOrUpdateUserRating(toolUrl, rating, userName) {
    const tr = getToolReviews(toolUrl);
    const key = `ur_${userName}_${toolUrl}`;
    const prev = localStorage.getItem(key);
    if (prev) { const o = parseInt(prev); tr.ratings[o]--; tr.totalRatings--; }
    tr.ratings[rating]++; tr.totalRatings++;
    let total = 0; for (let i=1;i<=5;i++) total += tr.ratings[i]*i;
    tr.averageRating = tr.totalRatings ? total/tr.totalRatings : 0;
    localStorage.setItem(key, rating);
    saveReviews();
    return tr;
}

function addComment(toolUrl, userName, rating, commentText) {
    const tr = getToolReviews(toolUrl);
    const c = {
        id: Date.now().toString(36) + Math.random().toString(36).substr(2,6),
        userName: userName || 'مستخدم',
        userAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName||'مستخدم')}&background=6366f1&color=fff&bold=true`,
        rating, comment: commentText, likes: 0, likedBy: [],
        reported: false, date: new Date().toISOString(), isEdited: false, lastEdited: null
    };
    tr.comments.unshift(c); saveReviews(); return c;
}

function likeComment(toolUrl, commentId, userName) {
    const tr = getToolReviews(toolUrl);
    const c = tr.comments.find(x => x.id === commentId);
    if (!c) return 0;
    if (c.likedBy.includes(userName)) { c.likes--; c.likedBy = c.likedBy.filter(u=>u!==userName); }
    else { c.likes++; c.likedBy.push(userName); }
    saveReviews(); return c.likes;
}

function reportComment(toolUrl, commentId) {
    const tr = getToolReviews(toolUrl);
    const c = tr.comments.find(x => x.id === commentId);
    if (!c || c.reported) return false;
    c.reported = true; saveReviews(); return true;
}

function generateStars(rating, small) {
    const f = Math.floor(rating), h = rating%1>=0.5, e = 5-f-(h?1:0);
    let s = '';
    for (let i=0;i<f;i++) s+='<i class="fas fa-star"></i>';
    if (h) s+='<i class="fas fa-star-half-alt"></i>';
    for (let i=0;i<e;i++) s+='<i class="far fa-star"></i>';
    return `<div class="stars-display${small?' stars-small':''}">${s}</div>`;
}

function escapeHtml(text) {
    const d = document.createElement('div');
    d.textContent = text; return d.innerHTML;
}

function formatDate(dateString) {
    const d = new Date(dateString), n = new Date();
    const mins = Math.floor((n-d)/60000);
    if (mins<1) return 'الآن';
    if (mins<60) return `منذ ${mins} دقيقة`;
    const hrs = Math.floor(mins/60);
    if (hrs<24) return `منذ ${hrs} ساعة`;
    const days = Math.floor(hrs/24);
    if (days<7) return `منذ ${days} يوم`;
    return d.toLocaleDateString('ar');
}

function renderCommentsList(comments, toolUrl) {
    if (!comments.length) return `<div class="no-comments"><i class="fas fa-comment-slash"></i><p>لا توجد تعليقات بعد. كن أول من يقيّم!</p></div>`;
    const visible = comments.filter(c=>!c.reported);
    return visible.map(c => `
        <div class="comment-item" data-id="${c.id}">
            <div class="comment-avatar"><img src="${c.userAvatar}" alt="${c.userName}" loading="lazy"></div>
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-user">${escapeHtml(c.userName)}</span>
                    ${generateStars(c.rating,true)}
                    <span class="comment-date">${formatDate(c.date)}</span>
                    ${c.isEdited?'<span class="edited-badge">(معدل)</span>':''}
                </div>
                <div class="comment-text">${escapeHtml(c.comment)}</div>
                <div class="comment-actions">
                    <button class="comment-like-btn${localStorage.getItem('lk_'+c.id)==='true'?' liked':''}" onclick="handleLikeComment('${toolUrl}','${c.id}')">
                        <i class="fas fa-heart"></i> <span>${c.likes}</span>
                    </button>
                    <button class="comment-report-btn" onclick="handleReportComment('${toolUrl}','${c.id}')">
                        <i class="fas fa-flag"></i> <span>إبلاغ</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function showReviewsModal(tool) {
    const old = document.getElementById('reviewsModal');
    if (old) old.remove();
    const tr = getToolReviews(tool.url);
    const m = document.createElement('div');
    m.id='reviewsModal'; m.className='reviews-modal-overlay';
    m.innerHTML=`
        <div class="reviews-modal">
            <div class="reviews-modal-header">
                <div class="reviews-modal-title"><i class="fas fa-star"></i><h3>${escapeHtml(tool.name)}</h3></div>
                <button class="reviews-modal-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="reviews-modal-body">
                <div class="ratings-summary">
                    <div class="average-rating">
                        <div class="rating-number">${tr.averageRating.toFixed(1)}</div>
                        ${generateStars(tr.averageRating)}
                        <div class="rating-count">${tr.totalRatings} تقييم</div>
                    </div>
                    <div class="rating-distribution">
                        ${[5,4,3,2,1].map(s=>{
                            const pct = tr.totalRatings ? (tr.ratings[s]/tr.totalRatings*100) : 0;
                            return `<div class="rating-bar-item"><span class="rating-star-label">${s} <i class="fas fa-star"></i></span><div class="rating-bar-bg"><div class="rating-bar-fill" style="width:${pct}%"></div></div><span class="rating-percent">${tr.ratings[s]}</span></div>`;
                        }).join('')}
                    </div>
                </div>
                <div class="add-review-section">
                    <h4><i class="fas fa-pen"></i> أضف تقييمك</h4>
                    <div class="user-rating-input"><span>تقييمك:</span><div class="rating-input-stars" data-rating="0">${[1,2,3,4,5].map(s=>`<i class="far fa-star" data-value="${s}"></i>`).join('')}</div></div>
                    <textarea class="review-textarea" id="reviewComment" placeholder="شارك تجربتك مع هذه الأداة..."></textarea>
                    <div class="review-actions">
                        <input type="text" id="reviewerName" placeholder="اسمك (اختياري)" maxlength="30">
                        <button class="btn-submit-review" id="submitReviewBtn"><i class="fas fa-paper-plane"></i> نشر التقييم</button>
                    </div>
                </div>
                <div class="comments-section">
                    <h4><i class="fas fa-comments"></i> التعليقات (${tr.comments.length})</h4>
                    <div class="comments-list" id="commentsList">${renderCommentsList(tr.comments,tool.url)}</div>
                </div>
            </div>
        </div>`;
    document.body.appendChild(m);
    document.body.style.overflow = 'hidden';

    const close = ()=>{ m.remove(); document.body.style.overflow=''; };
    m.querySelector('.reviews-modal-close').onclick = close;
    m.onclick = (e)=>{ if(e.target===m) close(); };

    let selRating = 0;
    const stars = m.querySelectorAll('.rating-input-stars i');
    function upd(r, solid) { stars.forEach(s=>{ const v=parseInt(s.dataset.value); if(v<=r){ s.className=solid?'fas fa-star':'fas fa-star'; s.style.color='#fbbf24'; } else { s.className=solid?'far fa-star':'far fa-star'; s.style.color='#cbd5e1'; } }); }
    stars.forEach(s=>{ s.onmouseenter=()=>upd(parseInt(s.dataset.value)); s.onclick=()=>{ selRating=parseInt(s.dataset.value); upd(selRating,true); }; });
    m.querySelector('.rating-input-stars').onmouseleave=()=>upd(selRating,true);

    m.querySelector('#submitReviewBtn').onclick=()=>{
        const name = (m.querySelector('#reviewerName').value||'').trim()||'مستخدم';
        const cmt = (m.querySelector('#reviewComment').value||'').trim();
        if(!selRating) return showToast('الرجاء اختيار تقييم بالنجوم','error');
        if(!cmt) return showToast('الرجاء كتابة تعليق','error');
        addOrUpdateUserRating(tool.url, selRating, name);
        addComment(tool.url, name, selRating, cmt);
        showToast('تم إضافة تقييمك بنجاح!','success');
        close();
        setTimeout(()=>showReviewsModal(tool),300);
    };
}

function handleLikeComment(toolUrl, commentId) {
    const u = localStorage.getItem('reviewer_name')||'مستخدم';
    const n = likeComment(toolUrl, commentId, u);
    const el = document.querySelector(`.comment-item[data-id="${commentId}"]`);
    if(el) {
        const btn = el.querySelector('.comment-like-btn');
        if(btn) { btn.querySelector('span').textContent=n; btn.classList.toggle('liked'); }
        localStorage.setItem('lk_'+commentId, btn?.classList.contains('liked'));
    }
}

function handleReportComment(toolUrl, commentId) {
    if(!confirm('هل أنت متأكد من الإبلاغ عن هذا التعليق؟')) return;
    if(reportComment(toolUrl, commentId)) {
        showToast('تم الإبلاغ عن التعليق، شكراً لك','success');
        const el = document.querySelector(`.comment-item[data-id="${commentId}"]`);
        if(el){ el.style.opacity='0.5'; el.style.pointerEvents='none'; }
    }
}

function addRatingButtonToTools() {
    document.querySelectorAll('.tool-card').forEach(card => {
        if (card.querySelector('.rating-btn')) return;
        const n = card.querySelector('.tool-name');
        const l = card.querySelector('.tool-link');
        if (!n) return;
        const tool = {
            name: n.textContent,
            desc: (card.querySelector('.tool-desc')||{}).textContent||'',
            icon: (card.querySelector('.card-icon i')||{}).className||'fa-solid fa-robot',
            url: l ? l.href : '#'
        };
        const tr = getToolReviews(tool.url);
        const btn = document.createElement('button');
        btn.className='rating-btn';
        btn.innerHTML=`<i class="fas fa-star"></i><span class="rating-value">${tr.averageRating.toFixed(1)}</span><span class="rating-count">(${tr.totalRatings})</span>`;
        btn.onclick=(e)=>{ e.preventDefault(); e.stopPropagation(); showReviewsModal(tool); };
        if(l) l.parentNode.insertBefore(btn, l);
        else card.appendChild(btn);
    });
}

// تصدير الدوال العالمية
window.showReviewsModal = showReviewsModal;
window.handleLikeComment = handleLikeComment;
window.handleReportComment = handleReportComment;

// =================================================================
// لوحة التحكم الشخصية
// =================================================================

let userProfile = JSON.parse(localStorage.getItem('user_profile')) || {
    name: '', avatar: '', joinDate: new Date().toISOString(),
    stats: {
        totalVisits: 0, totalToolsClicked: 0, totalCategoriesViewed: 0,
        totalTimeSpent: 0, favoriteCategory: '', favoriteTool: '',
        lastActive: new Date().toISOString()
    },
    currentSession: { startTime: Date.now(), toolsViewed: [], categoriesViewed: [], searchQueries: [] },
    achievements: [],
    settings: { darkMode: false, notificationsEnabled: true, dashboardWidgets: ['stats','trending','favorites','achievements'] }
};

const achievementsList = [
    { id:'first_click', name:'🚀 أول خطوة', description:'استخدم أول أداة ذكاء اصطناعي', icon:'fa-solid fa-rocket', condition:(s)=>s.totalToolsClicked>=1, reward:'10 نقطة' },
    { id:'power_user', name:'⚡ مستخدم محترف', description:'استخدم 20 أداة مختلفة', icon:'fa-solid fa-bolt', condition:(s)=>s.totalToolsClicked>=20, reward:'50 نقطة' },
    { id:'explorer', name:'🧭 مستكشف', description:'استكشف 10 أقسام مختلفة', icon:'fa-solid fa-compass', condition:(s)=>s.totalCategoriesViewed>=10, reward:'30 نقطة' },
    { id:'super_fan', name:'💖 معجب حقيقي', description:'أضف 15 أداة إلى المفضلة', icon:'fa-solid fa-heart', condition:()=>favorites.length>=15, reward:'40 نقطة' },
    { id:'reviewer', name:'📝 ناقد محترف', description:'اكتب 5 تعليقات على الأدوات', icon:'fa-solid fa-pen-fancy', condition:()=>{ let t=0; Object.values(reviews).forEach(r=>t+=r.comments.length); return t>=5; }, reward:'25 نقطة' },
    { id:'time_master', name:'⏰ سيد الوقت', description:'اقضِ أكثر من ساعة في الموقع', icon:'fa-solid fa-clock', condition:(s)=>s.totalTimeSpent>=3600, reward:'20 نقطة' },
    { id:'social_bird', name:'🐦 طائر اجتماعي', description:'شارك 3 أدوات مع أصدقائك', icon:'fa-solid fa-share-alt', condition:()=>userProfile.stats.sharedCount>=3, reward:'15 نقطة' },
    { id:'searcher', name:'🔍 باحث محترف', description:'قم بـ 20 عملية بحث', icon:'fa-solid fa-search', condition:(s,p)=>p&&p.currentSession.searchQueries.length>=20, reward:'20 نقطة' }
];

function saveUserProfile() { localStorage.setItem('user_profile', JSON.stringify(userProfile)); }

function updateUserStats(action, data) {
    const now = Date.now();
    switch(action) {
        case 'tool_click':
            userProfile.stats.totalToolsClicked++;
            userProfile.currentSession.toolsViewed.push({ tool: data.toolName, category: data.category, timestamp: now });
            updateFavoriteTool(data.toolName);
            break;
        case 'category_view':
            if (!userProfile.currentSession.categoriesViewed.includes(data.category)) {
                userProfile.currentSession.categoriesViewed.push(data.category);
                userProfile.stats.totalCategoriesViewed = userProfile.currentSession.categoriesViewed.length;
            }
            updateFavoriteCategory();
            break;
        case 'search':
            userProfile.currentSession.searchQueries.push({ query: data.query, timestamp: now });
            break;
        case 'share':
            userProfile.stats.sharedCount = (userProfile.stats.sharedCount || 0) + 1;
            break;
        case 'session_end':
            userProfile.stats.totalTimeSpent += Math.floor((now - userProfile.currentSession.startTime) / 1000);
            break;
    }
    userProfile.stats.lastActive = new Date().toISOString();
    saveUserProfile();
    checkAchievements();
}

function updateFavoriteTool(toolName) {
    const freq = {};
    userProfile.currentSession.toolsViewed.forEach(t => freq[t.tool] = (freq[t.tool]||0)+1);
    let max=0, fav='';
    Object.entries(freq).forEach(([t,c])=> { if(c>max){ max=c; fav=t; } });
    userProfile.stats.favoriteTool = fav;
}

function updateFavoriteCategory() {
    const freq = {};
    userProfile.currentSession.toolsViewed.forEach(t => { if(t.category) freq[t.category] = (freq[t.category]||0)+1; });
    let max=0, fav='';
    Object.entries(freq).forEach(([c,ct])=> { if(ct>max){ max=ct; fav=c; } });
    userProfile.stats.favoriteCategory = fav;
}

function checkAchievements() {
    achievementsList.forEach(a => {
        if (userProfile.achievements.some(x => x.id === a.id)) return;
        let met = false;
        if (a.id === 'super_fan' || a.id === 'reviewer') met = a.condition();
        else if (a.id === 'searcher') met = a.condition(userProfile.stats, userProfile);
        else met = a.condition(userProfile.stats);
        if (met) {
            userProfile.achievements.push({ ...a, earnedAt: new Date().toISOString() });
            showToast(`🎉 إنجاز جديد: ${a.name}! ${a.reward}`, 'success');
        }
    });
    saveUserProfile();
}

function startSession() {
    userProfile.stats.totalVisits++;
    userProfile.currentSession = { startTime: Date.now(), toolsViewed: [], categoriesViewed: [], searchQueries: [] };
    saveUserProfile();
}

function endSession() { updateUserStats('session_end'); }

function calculateUserLevel() {
    const pts = userProfile.achievements.length*10 + Math.floor(userProfile.stats.totalToolsClicked/5) + Math.floor(userProfile.stats.totalTimeSpent/600);
    return Math.floor(pts/100)+1;
}
function calculateLevelProgress() {
    const pts = userProfile.achievements.length*10 + Math.floor(userProfile.stats.totalToolsClicked/5) + Math.floor(userProfile.stats.totalTimeSpent/600);
    return (pts%100);
}

function formatTime(seconds) {
    const h = Math.floor(seconds/3600), m = Math.floor((seconds%3600)/60);
    if (h>0) return `${h} ساعة ${m} دقيقة`;
    if (m>0) return `${m} دقيقة`;
    return `${seconds} ثانية`;
}

function formatRelativeTime(ts) {
    const diff = Date.now()-ts, mins = Math.floor(diff/60000), hrs = Math.floor(diff/3600000), days = Math.floor(diff/86400000);
    if (mins<1) return 'الآن';
    if (mins<60) return `منذ ${mins} دقيقة`;
    if (hrs<24) return `منذ ${hrs} ساعة`;
    return `منذ ${days} يوم`;
}

function getWeeklyActivity() {
    const act = [0,0,0,0,0,0,0];
    const now = new Date(), start = new Date(now); start.setDate(now.getDate()-now.getDay());
    userProfile.currentSession.toolsViewed.forEach(t => {
        const d = new Date(t.timestamp);
        if (d >= start) act[(d.getDay()+6)%7]++;
    });
    return act;
}

function renderActivityChart() {
    const canvas = document.getElementById('activityChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const activity = getWeeklyActivity();
    const w = canvas.width, h = canvas.height, barW = (w-80)/7-10, max = Math.max(...activity,1);
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(99,102,241,0.05)';
    ctx.fillRect(0,0,w,h);
    const days = ['ن','ث','ر','خ','ج','س','ح'];
    activity.forEach((v,i) => {
        const bh = (v/max)*(h-60), x = 40+i*(barW+10), y = h-bh-20;
        ctx.fillStyle = 'rgba(99,102,241,0.7)';
        ctx.fillRect(x,y,barW,bh);
        ctx.fillStyle = 'var(--text-muted-light)';
        ctx.font = '10px sans-serif';
        ctx.fillText(days[i], x+barW/2-5, h-10);
        if (v>0) { ctx.fillStyle = 'var(--primary)'; ctx.fillText(v.toString(), x+barW/2-5, y-5); }
    });
}

function renderFavoriteCategories() {
    const freq = {};
    userProfile.currentSession.toolsViewed.forEach(t => { if(t.category) freq[t.category] = (freq[t.category]||0)+1; });
    const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,5);
    if (!sorted.length) return '<p class="empty-message">لا توجد بيانات كافية بعد</p>';
    return sorted.map(([cat,ct]) => `<div class="favorite-category-item"><span class="category-name">${cat}</span><span class="category-count">${ct} زيارة</span></div>`).join('');
}

function renderTopUserTools() {
    const freq = {};
    userProfile.currentSession.toolsViewed.forEach(t => freq[t.tool] = (freq[t.tool]||0)+1);
    const sorted = Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,5);
    if (!sorted.length) return '<p class="empty-message">ابدأ باستخدام الأدوات لرؤية إحصائياتك</p>';
    return sorted.map(([tool,ct],i) => `<div class="top-tool-item"><span class="tool-rank">#${i+1}</span><span class="tool-name">${tool}</span><span class="tool-count">${ct} مرة</span></div>`).join('');
}

function renderAchievements() {
    if (!userProfile.achievements.length) return '<p class="empty-message">لا توجد إنجازات بعد. استخدم المزيد من الأدوات لكسب الإنجازات!</p>';
    return userProfile.achievements.map(a => `
        <div class="achievement-card">
            <div class="achievement-icon"><i class="${a.icon}"></i></div>
            <div class="achievement-info">
                <div class="achievement-name">${a.name}</div>
                <div class="achievement-desc">${a.description}</div>
                <div class="achievement-date">${formatDate(a.earnedAt)}</div>
            </div>
            <div class="achievement-reward">${a.reward}</div>
        </div>
    `).join('');
}

function renderSearchHistory() {
    const s = userProfile.currentSession.searchQueries.slice(-5).reverse();
    if (!s.length) return '<p class="empty-message">لم تقم بأي بحث بعد</p>';
    return s.map(q => `<div class="search-history-item" onclick="searchFor('${escapeHtml(q.query)}')"><i class="fas fa-search"></i><span>${escapeHtml(q.query)}</span><small>${formatRelativeTime(q.timestamp)}</small></div>`).join('');
}

function renderRecommendations() {
    const interests = {};
    userProfile.currentSession.toolsViewed.forEach(t => { if(t.category) interests[t.category] = (interests[t.category]||0)+1; });
    const topCats = Object.entries(interests).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([c])=>c);
    const used = new Set(userProfile.currentSession.toolsViewed.map(t=>t.tool));
    const recs = [];
    categories.forEach(cat => {
        if (topCats.includes(cat.name)) cat.tools.forEach(t => { if(!used.has(t.name)&&recs.length<6) recs.push(t); });
    });
    if (!recs.length) return '<p class="empty-message">استخدم المزيد من الأدوات للحصول على توصيات مخصصة</p>';
    return recs.map(t => `<div class="recommendation-card" onclick="window.open('${t.url}','_blank')"><div class="rec-icon"><i class="${t.icon}"></i></div><div class="rec-info"><div class="rec-name">${t.name}</div><div class="rec-category">${t.desc.substring(0,50)}...</div></div></div>`).join('');
}

function showDashboard() {
    const old = document.getElementById('dashboardModal');
    if (old) old.remove();
    const d = document.createElement('div');
    d.id='dashboardModal'; d.className='dashboard-overlay';
    d.innerHTML = `
        <div class="dashboard-container">
            <div class="dashboard-header">
                <div class="dashboard-title"><i class="fas fa-chart-line"></i><h2>لوحة التحكم الشخصية</h2></div>
                <div class="dashboard-actions">
                    <button class="dashboard-export-btn" id="exportStatsBtn"><i class="fas fa-download"></i><span class="hide-mobile">تصدير</span></button>
                    <button class="dashboard-close-btn"><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div class="dashboard-body">
                <div class="welcome-card">
                    <div class="user-info">
                        <div class="user-avatar" id="userAvatar">${userProfile.avatar?`<img src="${userProfile.avatar}" alt="avatar">`:'<i class="fas fa-user-circle"></i>'}</div>
                        <div class="user-details"><h3 id="userName">${userProfile.name||'زائر'}</h3><p>عضو منذ ${formatDate(userProfile.joinDate)}</p></div>
                        <button class="edit-profile-btn" id="editProfileBtn"><i class="fas fa-pen"></i></button>
                    </div>
                    <div class="user-level">
                        <div class="level-progress"><div class="level-bar" style="width:${calculateLevelProgress()}%"></div></div>
                        <span class="level-text">المستوى ${calculateUserLevel()}</span>
                    </div>
                </div>
                <div class="stats-grid-dashboard">
                    <div class="stat-card-dashboard"><div class="stat-icon"><i class="fas fa-calendar-week"></i></div><div class="stat-info"><span class="stat-value" id="statVisits">${userProfile.stats.totalVisits}</span><span class="stat-label">زيارة</span></div></div>
                    <div class="stat-card-dashboard"><div class="stat-icon"><i class="fas fa-mouse-pointer"></i></div><div class="stat-info"><span class="stat-value" id="statClicks">${userProfile.stats.totalToolsClicked}</span><span class="stat-label">نقرة على الأدوات</span></div></div>
                    <div class="stat-card-dashboard"><div class="stat-icon"><i class="fas fa-clock"></i></div><div class="stat-info"><span class="stat-value" id="statTime">${formatTime(userProfile.stats.totalTimeSpent)}</span><span class="stat-label">وقت التصفح</span></div></div>
                    <div class="stat-card-dashboard"><div class="stat-icon"><i class="fas fa-heart"></i></div><div class="stat-info"><span class="stat-value" id="statFavorites">${favorites.length}</span><span class="stat-label">المفضلة</span></div></div>
                </div>
                <div class="chart-section"><h4><i class="fas fa-chart-bar"></i> نشاطك الأسبوعي</h4><canvas id="activityChart" width="400" height="200"></canvas></div>
                <div class="dashboard-two-columns">
                    <div class="dashboard-card"><h4><i class="fas fa-folder-open"></i> أقسامك المفضلة</h4><div class="favorite-categories-list" id="favoriteCategoriesList">${renderFavoriteCategories()}</div></div>
                    <div class="dashboard-card"><h4><i class="fas fa-trophy"></i> أفضل أدواتك</h4><div class="top-tools-list" id="topToolsList">${renderTopUserTools()}</div></div>
                </div>
                <div class="achievements-section"><h4><i class="fas fa-medal"></i> إنجازاتك</h4><div class="achievements-grid" id="achievementsGrid">${renderAchievements()}</div></div>
                <div class="search-history-section"><h4><i class="fas fa-history"></i> آخر عمليات البحث</h4><div class="search-history-list" id="searchHistoryList">${renderSearchHistory()}</div></div>
                <div class="recommendations-section"><h4><i class="fas fa-lightbulb"></i> قد يعجبك أيضاً</h4><div class="recommendations-grid" id="recommendationsGrid">${renderRecommendations()}</div></div>
            </div>
        </div>`;
    document.body.appendChild(d);
    document.body.style.overflow = 'hidden';

    const close = ()=>{ d.remove(); document.body.style.overflow=''; };
    d.querySelector('.dashboard-close-btn').onclick = close;
    d.onclick = (e)=>{ if(e.target===d) close(); };
    d.querySelector('#editProfileBtn').onclick = showEditProfileModal;
    d.querySelector('#exportStatsBtn').onclick = exportUserStats;
    renderActivityChart();
}

function closeDashboard() {
    const d = document.getElementById('dashboardModal');
    if (d) { d.remove(); document.body.style.overflow = ''; }
}

function showEditProfileModal() {
    const m = document.createElement('div');
    m.className = 'edit-profile-modal-overlay';
    m.innerHTML = `
        <div class="edit-profile-modal">
            <div class="edit-profile-header"><h3><i class="fas fa-user-edit"></i> تعديل الملف الشخصي</h3><button class="edit-profile-close"><i class="fas fa-times"></i></button></div>
            <div class="edit-profile-body">
                <div class="form-group"><label>الاسم</label><input type="text" id="profileName" value="${escapeHtml(userProfile.name||'')}" placeholder="اسمك"></div>
                <div class="form-group"><label>رابط الصورة (اختياري)</label><input type="url" id="profileAvatar" value="${userProfile.avatar||''}" placeholder="https://example.com/avatar.jpg"></div>
                <div class="form-group"><label>البريد الإلكتروني (اختياري)</label><input type="email" id="profileEmail" value="${userProfile.email||''}" placeholder="your@email.com"></div>
                <div class="form-actions"><button class="btn-save-profile" id="saveProfileBtn">حفظ التغييرات</button><button class="btn-reset-stats" id="resetStatsBtn">إعادة تعيين الإحصائيات</button></div>
            </div>
        </div>`;
    document.body.appendChild(m);
    m.querySelector('.edit-profile-close').onclick = ()=>m.remove();
    m.querySelector('#saveProfileBtn').onclick = ()=>{
        const n = (m.querySelector('#profileName').value||'').trim();
        const a = (m.querySelector('#profileAvatar').value||'').trim();
        const e = (m.querySelector('#profileEmail').value||'').trim();
        if (n) userProfile.name=n;
        if (a) userProfile.avatar=a;
        if (e) userProfile.email=e;
        saveUserProfile(); m.remove(); showDashboard();
        showToast('تم تحديث الملف الشخصي!','success');
    };
    m.querySelector('#resetStatsBtn').onclick = ()=>{
        if (!confirm('هل أنت متأكد؟ سيتم مسح جميع إحصائياتك ولا يمكن استعادتها!')) return;
        userProfile.stats = {
            totalVisits: userProfile.stats.totalVisits, totalToolsClicked: 0, totalCategoriesViewed: 0,
            totalTimeSpent: 0, favoriteCategory: '', favoriteTool: '', lastActive: new Date().toISOString(), sharedCount: 0
        };
        userProfile.currentSession = { startTime: Date.now(), toolsViewed: [], categoriesViewed: [], searchQueries: [] };
        userProfile.achievements = [];
        saveUserProfile(); m.remove(); showDashboard();
        showToast('تم إعادة تعيين الإحصائيات','info');
    };
}

function exportUserStats() {
    const data = { profile: { name: userProfile.name, joinDate: userProfile.joinDate, stats: userProfile.stats }, favorites, achievements: userProfile.achievements, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `abdulrahman_ai_stats_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast('تم تصدير الإحصائيات بنجاح!','success');
}

function addDashboardButton() {
    if (document.getElementById('dashboardBtn')) return;
    const btn = document.createElement('button');
    btn.id='dashboardBtn'; btn.className='dashboard-btn';
    btn.innerHTML='<i class="fas fa-chart-line"></i>';
    btn.title='لوحة التحكم الشخصية';
    btn.onclick=showDashboard;
    const fb = document.querySelector('.floating-buttons');
    if (fb) fb.insertBefore(btn, fb.firstChild);
    else document.body.appendChild(btn);
}

function searchFor(query) {
    const si = document.getElementById('searchInput');
    if (si) { si.value = query; closeDashboard(); filterTools(); }
}

// تعديل recordClick لتسجيل الإحصائيات
const originalRecordClick = recordClick;
window.recordClick = function(url) {
    originalRecordClick(url);
    const all = getAllTools();
    const tool = all.find(t => t.url === url);
    if (tool) updateUserStats('tool_click', { toolName: tool.name, category: tool.category });
};

// تعديل filterTools لتسجيل عمليات البحث
const originalFilterTools = filterTools;
window.filterTools = function() {
    const si = document.getElementById('searchInput');
    if (si && si.value.trim().length > 2) updateUserStats('search', { query: si.value.trim() });
    originalFilterTools();
};

// =================================================================
// 15. Glow effect for category cards
// =================================================================
function initCategoryCardGlow() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// =================================================================
// 16. التهيئة عند تحميل الصفحة
// =================================================================
function initApp() {
    // بدء الجلسة
    startSession();
    window.addEventListener('beforeunload', () => { endSession(); });
    
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
    initLanguage();
    typeEffect();
    initNetworkStatus();
    window.addEventListener('scroll', updateProgressBar);
    initSortControls();
    initSidebar();
    updateFavorites();
    updateSidebarStats();
    updateTrending();
    updateRecentlyUsed();
    initStickySearch();
    initFilterSystem();
    
    // تحميل اسم المستخدم المحفوظ للتقييمات
    const savedName = localStorage.getItem('reviewer_name');
    if (savedName) {
        const nameInput = document.getElementById('reviewerName');
        if (nameInput) nameInput.value = savedName;
    }
    document.addEventListener('input', (e) => {
        if (e.target.id === 'reviewerName') {
            localStorage.setItem('reviewer_name', e.target.value);
        }
    });
    
    // إضافة زر لوحة التحكم
    addDashboardButton();
    
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
// 22. منع أدوات المطور
// =================================================================
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
    }
});

document.addEventListener('contextmenu', e => {
    if (e.target.closest('.tool-link') || 
        e.target.closest('.category-card') ||
        e.target.closest('a')) {
        return;
    }
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

window.addEventListener('online', () => {
    if (window.showToast) window.showToast(t('connection_restored'), 'success');
});

window.addEventListener('offline', () => {
    if (window.showToast) window.showToast(t('offline'), 'error');
});
