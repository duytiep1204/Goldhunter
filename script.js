/* =========================================
   1. ĐÓNG BANNER QUẢNG CÁO
   ========================================= */
const closeBannerBtn = document.querySelector('.close-banner');
if (closeBannerBtn) {
    closeBannerBtn.addEventListener('click', function() {
        document.querySelector('.top-banner').style.display = 'none';
    });
}

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

if (langBtn) {
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langSelector.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!langSelector.contains(e.target)) {
            langSelector.classList.remove('open');
        }
    });
}

const langNames = {
    'vi': 'Tiếng Việt', 'en': 'English', 'ms': 'Bahasa Melayu',
    'id': 'Bahasa Indonesia', 'zh-CN': '简体中文', 'zh-TW': '繁體中文',
    'th': 'ไทย', 'ko': '한국어', 'ja': '日本語', 'tl': 'Filipino',
    'hi': 'हिन्दी', 'es': 'Español', 'pt': 'Português (Brasil)',
    'ru': 'Русский', 'fr': 'Français', 'de': 'Deutsch', 'mn': 'Монгол',
    'kk': 'Қазақша', 'uz': "O'zbekcha", 'en-ZA': 'English (South Africa)'
};

function clearGoogleTranslateCookies() {
    const expire = 'expires=Thu, 01 Jan 1970 00:00:00 UTC';
    const hostname = window.location.hostname;
    document.cookie = `googtrans=; ${expire}; path=/;`;
    document.cookie = `googtrans=; ${expire}; path=/; domain=${hostname};`;
    document.cookie = `googtrans=; ${expire}; path=/; domain=.${hostname};`;
    document.cookie = `googtrans=; ${expire}; path=${window.location.pathname};`;
}

function changeLanguage(langCode) {
    clearGoogleTranslateCookies();
    if (langCode === 'vi') {
        window.location.reload();
        return;
    }
    const hostname = window.location.hostname;
    document.cookie = `googtrans=/vi/${langCode}; path=/;`;
    if (hostname && hostname !== 'localhost' && hostname !== '127.0.0.1') {
        document.cookie = `googtrans=/vi/${langCode}; path=/; domain=${hostname};`;
    }
    setTimeout(() => {
        window.location.reload();
    }, 100);
}

langLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const langCode = link.getAttribute('data-lang');

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

        if (currentLangSpan) {
            currentLangSpan.textContent = langNames[langCode] || langCode;
        }
        if (langSelector) {
            langSelector.classList.remove('open');
        }
        changeLanguage(langCode);
    });
});

/* =========================================
   5. ĐỌC NGÔN NGỮ HIỆN TẠI TỪ COOKIE
   ========================================= */
window.addEventListener('load', function() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith('googtrans=')) {
            const value = cookie.substring('googtrans='.length);
            const parts = value.split('/');
            const currentLangCode = parts[parts.length - 1];
            
            if (currentLangCode && langNames[currentLangCode] && currentLangSpan) {
                currentLangSpan.textContent = langNames[currentLangCode];
                
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

/* =========================================
   6. ẨN BANNER GOOGLE TRANSLATE
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
setInterval(hideGoogleBanner, 500);
window.addEventListener('load', hideGoogleBanner);
document.addEventListener('DOMContentLoaded', hideGoogleBanner);

/* =========================================
   7. HÀM CHO TRANG FREE ACCESS
   ========================================= */

// Copy mã giới thiệu
function copyRefCode(event) {
    const code = 'UN60VTqp';
    navigator.clipboard.writeText(code).then(() => {
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Đã sao chép';
        btn.style.color = '#22c55e';
        btn.style.borderColor = '#22c55e';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 2000);
    }).catch(() => {
        alert('Mã giới thiệu: ' + code);
    });
}

// Mở/đóng modal người dùng đã có tài khoản
function openExistingModal() {
    document.getElementById('existingModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeExistingModal() {
    document.getElementById('existingModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Copy text đơn giản
function copyText(text, event) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Đã copy';
        btn.style.color = '#22c55e';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.color = '';
        }, 1500);
    }).catch(() => {
        alert('Nội dung: ' + text);
    });
}

// Copy toàn bộ nội dung email body
function copyBody(event) {
    const userName = document.getElementById('userNameInput').value || '(Your Name)';
    const userEmail = document.getElementById('userEmailInput').value || '[Your Email]';
    
    const bodyText = `Dear Iskandar,

Please assist to move my account under IB (32368874).

My registered email: ${userEmail}

Thank you.`;
    
    navigator.clipboard.writeText(bodyText).then(() => {
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '✓ Đã copy';
        btn.style.color = '#22c55e';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.color = '';
        }, 1500);
    }).catch(() => {
        alert(bodyText);
    });
}

// Đóng modal khi click ra ngoài
document.addEventListener('click', (e) => {
    const modal = document.getElementById('existingModal');
    if (modal && e.target === modal) {
        closeExistingModal();
    }
});

// Submit form gửi mail đến duytiep1204@gmail.com
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('accessForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const mt5Id = document.getElementById('mt5-id').value;
        const email = document.getElementById('email').value;
        const telegram = document.getElementById('telegram').value;

        if (!mt5Id || !email) {
            alert('Vui lòng nhập đầy đủ ID tài khoản MT5 và Email.');
            return;
        }

        const btn = form.querySelector('.btn-submit');
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Đang gửi...';
        btn.disabled = true;
        btn.style.background = '#e6c200';

        // Gửi form qua FormSubmit.co đến email duytiep1204@gmail.com
        fetch('https://formsubmit.co/ajax/duytiep1204@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _subject: '🔔 Yêu cầu Truy Cập Miễn Phí GoldHunter EA',
                _template: 'table',
                'ID MT5': mt5Id,
                'Email người dùng': email,
                'Telegram': telegram || 'Không có',
                'Thời gian gửi': new Date().toLocaleString('vi-VN'),
                'Trang gửi': window.location.href
            })
        })
        .then(response => response.json())
        .then(data => {
            btn.innerHTML = '✅ Đã gửi thành công!';
            btn.style.background = '#22c55e';
            
            setTimeout(() => {
                alert('✅ Cảm ơn bạn!\n\nChúng tôi đã nhận được yêu cầu:\n\n• ID MT5: ' + mt5Id + '\n• Email: ' + email + '\n• Telegram: ' + (telegram || 'Không có') + '\n\nChúng tôi sẽ xác minh và gửi thông tin truy cập qua email trong vòng vài phút.');
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 500);
        })
        .catch(error => {
            console.error('Error:', error);
            btn.innerHTML = '❌ Lỗi, thử lại!';
            btn.style.background = '#ef4444';
            
            setTimeout(() => {
                alert('Có lỗi khi gửi. Vui lòng thử lại hoặc liên hệ qua Telegram.');
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 1000);
        });
    });
});