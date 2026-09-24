/* =========================================
   1. ĐÓNG BANNER QUẢNG CÁO
   ========================================= */
document.querySelector('.close-banner').addEventListener('click', function() {
    document.querySelector('.top-banner').style.display = 'none';
});

/* =========================================
   2. HIỆU ỨNG MỞ/ĐÓNG FAQ
   ========================================= */
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        const span = item.querySelector('span');
        if (span.textContent === '+') {
            span.textContent = '−';
        } else {
            span.textContent = '+';
        }
    });
});

/* =========================================
   3. ĐỔI MÀU TAB FAQ
   ========================================= */
document.querySelectorAll('.faq-tabs button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.faq-tabs button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

/* =========================================
   4. LANGUAGE SELECTOR TÙY CHỈNH
   ========================================= */
const langSelector = document.getElementById('langSelector');
const langBtn = document.getElementById('langBtn');
const currentLangSpan = document.getElementById('currentLang');
const langLinks = document.querySelectorAll('#langDropdown a');

// 4.1. Mở/đóng dropdown khi bấm nút
langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langSelector.classList.toggle('open');
});

// 4.2. Đóng dropdown khi click ra ngoài
document.addEventListener('click', (e) => {
    if (!langSelector.contains(e.target)) {
        langSelector.classList.remove('open');
    }
});

// 4.3. Tên hiển thị tương ứng với mã ngôn ngữ
const langNames = {
    'vi': 'Tiếng Việt',
    'en': 'English',
    'ms': 'Bahasa Melayu',
    'id': 'Bahasa Indonesia',
    'zh-CN': '简体中文',
    'zh-TW': '繁體中文',
    'th': 'ไทย',
    'ko': '한국어',
    'ja': '日本語',
    'tl': 'Filipino',
    'hi': 'हिन्दी',
    'es': 'Español',
    'pt': 'Português (Brasil)',
    'ru': 'Русский',
    'fr': 'Français',
    'de': 'Deutsch',
    'mn': 'Монгол',
    'kk': 'Қазақша',
    'uz': "O'zbekcha",
    'en-ZA': 'English (South Africa)'
};

// 4.4. Hàm thay đổi ngôn ngữ bằng Google Translate
function changeLanguage(langCode) {
    // Google Translate sử dụng cookie "googtrans"
    // Format: /<source>/<target>
    const sourceLang = 'vi';
    
    if (langCode === sourceLang) {
        // Xóa cookie để về tiếng Việt gốc
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
        // Reload để áp dụng
        window.location.reload();
        return;
    }
    
    // Set cookie googtrans
    document.cookie = `googtrans=/${sourceLang}/${langCode}; path=/;`;
    document.cookie = `googtrans=/${sourceLang}/${langCode}; path=/; domain=${window.location.hostname}`;
    
    // Cách 1: Thử dùng dropdown ẩn của Google Translate
    const googleSelect = document.querySelector('.goog-te-combo');
    if (googleSelect) {
        googleSelect.value = langCode;
        googleSelect.dispatchEvent(new Event('change'));
    } else {
        // Cách 2: Reload trang để áp dụng cookie
        window.location.reload();
    }
}

// 4.5. Xử lý khi chọn ngôn ngữ
langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const langCode = link.getAttribute('data-lang');

        // Cập nhật UI
        langLinks.forEach(l => {
            l.classList.remove('active');
            const oldCheck = l.querySelector('.check');
            if (oldCheck) oldCheck.remove();
        });
        link.classList.add('active');
        if (!link.querySelector('.check')) {
            const checkSpan = document.createElement('span');
            checkSpan.className = 'check';
            checkSpan.textContent = '✓';
            link.appendChild(checkSpan);
        }

        // Cập nhật tên ngôn ngữ trên nút
        currentLangSpan.textContent = langNames[langCode] || langCode;

        // Đóng dropdown
        langSelector.classList.remove('open');

        // Thực hiện đổi ngôn ngữ
        changeLanguage(langCode);
    });
});

/* =========================================
   5. ẨN BANNER GOOGLE TRANSLATE
   ========================================= */
function hideGoogleBanner() {
    const bannerFrames = document.querySelectorAll('.goog-te-banner-frame, iframe.goog-te-banner-frame');
    bannerFrames.forEach(frame => {
        frame.style.display = 'none';
        frame.style.visibility = 'hidden';
    });
    document.body.style.top = '0px';
    document.body.style.position = 'static';
    document.body.style.marginTop = '0px';
}

// Chạy liên tục để đảm bảo banner bị ẩn
setInterval(hideGoogleBanner, 500);
window.addEventListener('load', hideGoogleBanner);
document.addEventListener('DOMContentLoaded', hideGoogleBanner);

/* =========================================
   6. ĐỌC NGÔN NGỮ HIỆN TẠI TỪ COOKIE
   ========================================= */
window.addEventListener('load', function() {
    // Đọc cookie googtrans
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith('googtrans=')) {
            const value = cookie.substring('googtrans='.length);
            const parts = value.split('/');
            const currentLangCode = parts[parts.length - 1];
            
            if (currentLangCode && langNames[currentLangCode]) {
                // Cập nhật UI
                currentLangSpan.textContent = langNames[currentLangCode];
                
                // Đánh dấu active
                langLinks.forEach(l => {
                    l.classList.remove('active');
                    const oldCheck = l.querySelector('.check');
                    if (oldCheck) oldCheck.remove();
                    
                    if (l.getAttribute('data-lang') === currentLangCode) {
                        l.classList.add('active');
                        if (!l.querySelector('.check')) {
                            const checkSpan = document.createElement('span');
                            checkSpan.className = 'check';
                            checkSpan.textContent = '✓';
                            l.appendChild(checkSpan);
                        }
                    }
                });
            }
            break;
        }
    }
});