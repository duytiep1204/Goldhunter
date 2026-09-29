/* =========================================
   1. ĐÓNG BANNER QUẢNG CÁO
   ========================================= */
const closeBannerBtn = document.querySelector('.close-banner');
if (closeBannerBtn) {
    closeBannerBtn.addEventListener('click', function() {
        const banner = document.querySelector('.top-banner');
        if (banner) banner.style.display = 'none';
    });
}

/* =========================================
   2. FAQ TRANG CHỦ (TABS + ACCORDION)
   ========================================= */
document.querySelectorAll('.faq-tabs button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.faq-tabs button').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.faq-content').forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        const tabId = button.getAttribute('data-tab');
        const tabContent = document.getElementById(tabId);
        if (tabContent) tabContent.classList.add('active');
    });
});

document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
        question.addEventListener('click', () => {
            const parentList = item.closest('.faq-list');
            if (parentList) {
                parentList.querySelectorAll('.faq-item').forEach(otherItem => {
                    if (otherItem !== item) otherItem.classList.remove('open');
                });
            }
            item.classList.toggle('open');
        });
    }
});

/* =========================================
   3. LANGUAGE SELECTOR
   ========================================= */
const langSelector = document.getElementById('langSelector');
const langBtn = document.getElementById('langBtn');
const currentLangSpan = document.getElementById('currentLang');
const langLinks = document.querySelectorAll('#langDropdown a');

if (langBtn && langSelector) {
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
    setTimeout(() => window.location.reload(), 100);
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

        if (currentLangSpan) currentLangSpan.textContent = langNames[langCode] || langCode;
        if (langSelector) langSelector.classList.remove('open');
        changeLanguage(langCode);
    });
});

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
   4. ẨN BANNER GOOGLE TRANSLATE
   ========================================= */
function hideGoogleBanner() {
    document.querySelectorAll('.goog-te-banner-frame, iframe.goog-te-banner-frame').forEach(frame => {
        frame.style.display = 'none';
        frame.style.visibility = 'hidden';
    });
    document.body.style.top = '0px';
    document.body.style.position = 'static';
    document.body.style.marginTop = '0px';
}
setInterval(hideGoogleBanner, 500);

/* =========================================
   5. MODAL THANH TOÁN
   ========================================= */
function openBuyModal299() {
    const modal = document.getElementById('buyModal299');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
function closeBuyModal299() {
    const modal = document.getElementById('buyModal299');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openBuyModalUnlimited() {
    const modalPrice = document.getElementById('modalUnlimitedPrice');
    const displayPrice = document.getElementById('unlimitedPrice');
    if (modalPrice && displayPrice) {
        modalPrice.textContent = displayPrice.textContent;
    }
    const modal = document.getElementById('buyModalUnlimited');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
function closeBuyModalUnlimited() {
    const modal = document.getElementById('buyModalUnlimited');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function copyWallet(event) {
    const address = '0xcff897402f6b952ee41ea13f41d9081970df2893';
    const btn = event.currentTarget;
    const originalHTML = btn.innerHTML;

    navigator.clipboard.writeText(address).then(() => {
        btn.innerHTML = '✓';
        btn.style.color = '#22c55e';
        btn.style.borderColor = '#22c55e';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.color = '';
            btn.style.borderColor = '';
        }, 1800);
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = address;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        btn.innerHTML = '✓';
        btn.style.color = '#22c55e';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.color = '';
        }, 1800);
    });
}

document.addEventListener('click', (e) => {
    ['buyModal299', 'buyModalUnlimited', 'existingModal'].forEach(id => {
        const modal = document.getElementById(id);
        if (modal && e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        ['buyModal299', 'buyModalUnlimited', 'existingModal'].forEach(id => {
            const modal = document.getElementById(id);
            if (modal) modal.classList.remove('active');
        });
        document.body.style.overflow = '';
    }
});

/* =========================================
   6. ĐỒNG HỒ ĐẾM NGƯỢC - GIÁ ĐỘNG
   ========================================= */
const PRICE_CONFIG = {
    startPrice: 899,
    incrementPerDay: 5,
    fixedStartDate: '2026-09-26T00:00:00+07:00'
};

function getStartTimestamp() {
    return new Date(PRICE_CONFIG.fixedStartDate).getTime();
}

function calculateCurrentPrice() {
    const startTime = getStartTimestamp();
    const now = Date.now();
    const elapsedMs = now - startTime;
    const elapsedDays = Math.floor(elapsedMs / (24 * 60 * 60 * 1000));
    return PRICE_CONFIG.startPrice + (elapsedDays * PRICE_CONFIG.incrementPerDay);
}

function calculateTimeToNextPrice() {
    const startTime = getStartTimestamp();
    const now = Date.now();
    const elapsedMs = now - startTime;
    const msInDay = 24 * 60 * 60 * 1000;
    const msSinceLastCycle = elapsedMs % msInDay;
    const msUntilNext = msInDay - msSinceLastCycle;

    return {
        hours: Math.floor(msUntilNext / (60 * 60 * 1000)),
        minutes: Math.floor((msUntilNext % (60 * 60 * 1000)) / (60 * 1000)),
        seconds: Math.floor((msUntilNext % (60 * 1000)) / 1000)
    };
}

function updatePriceAndCountdown() {
    const currentPrice = calculateCurrentPrice();
    const priceEl = document.getElementById('unlimitedPrice');
    const priceBtnEl = document.getElementById('unlimitedPriceBtn');
    const modalPriceEl = document.getElementById('modalUnlimitedPrice');

    if (priceEl) priceEl.textContent = currentPrice;
    if (priceBtnEl) priceBtnEl.textContent = currentPrice;
    if (modalPriceEl) modalPriceEl.textContent = currentPrice;

    const time = calculateTimeToNextPrice();
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    if (hoursEl) hoursEl.textContent = String(time.hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(time.minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(time.seconds).padStart(2, '0');
}

if (document.getElementById('countdownTimer')) {
    updatePriceAndCountdown();
    setInterval(updatePriceAndCountdown, 1000);
}

/* =========================================
   7. HÀM CHO TRANG FREE ACCESS
   ========================================= */
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
    }).catch(() => alert('Mã giới thiệu: ' + code));
}

function openExistingModal() {
    const modal = document.getElementById('existingModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
function closeExistingModal() {
    const modal = document.getElementById('existingModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

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
    }).catch(() => alert('Nội dung: ' + text));
}

function copyBody(event) {
    const userEmail = document.getElementById('userEmailInput')?.value || '[Your Email]';
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
    }).catch(() => alert(bodyText));
}

/* =========================================
   8. SUBMIT FORM FREE ACCESS
   ========================================= */
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

/* =========================================
   9. TRANG FAQ ĐẦY ĐỦ
   ========================================= */
(function() {
    const faqContainer = document.getElementById('faqContainer');
    if (!faqContainer) return;

    /* 9.1. ACCORDION */
    document.querySelectorAll('.faq-item-full').forEach(item => {
        const question = item.querySelector('.faq-question-full');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('open');
            });
        }
    });

    /* 9.2. TABS DANH MỤC */
    const catButtons = document.querySelectorAll('.faq-cat-btn');
    const categories = document.querySelectorAll('.faq-category');

    catButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cat = btn.getAttribute('data-cat');

            catButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (cat === 'all') {
                categories.forEach(c => c.classList.remove('hidden'));
            } else {
                categories.forEach(c => {
                    if (c.getAttribute('data-category') === cat) {
                        c.classList.remove('hidden');
                    } else {
                        c.classList.add('hidden');
                    }
                });
            }

            updateTabCounts();
            updateVisibleCount();
            const controls = document.querySelector('.faq-controls');
            if (controls) controls.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* 9.3. NÚT MỞ RỘNG TẤT CẢ */
    const btnExpandAll = document.getElementById('btnExpandAll');
    if (btnExpandAll) {
        btnExpandAll.addEventListener('click', () => {
            const visibleItems = document.querySelectorAll('.faq-item-full:not(.hidden)');
            const allOpen = Array.from(visibleItems).every(item => item.classList.contains('open'));

            if (allOpen) {
                visibleItems.forEach(item => item.classList.remove('open'));
                btnExpandAll.textContent = 'Mở rộng tất cả';
            } else {
                visibleItems.forEach(item => item.classList.add('open'));
                btnExpandAll.textContent = 'Thu gọn tất cả';
            }
        });
    }

    /* 9.4. HÀM ĐẾM SỐ CÂU HỎI HIỂN THỊ */
    function updateVisibleCount() {
        const visibleItems = document.querySelectorAll('.faq-item-full:not(.hidden)');
        const countDisplay = document.getElementById('faqVisibleCount');
        if (countDisplay) countDisplay.textContent = visibleItems.length;
    }
    updateVisibleCount();

    /* 9.5. CẬP NHẬT SỐ ĐẾM TRÊN TABS */
    function updateTabCounts() {
        catButtons.forEach(btn => {
            const catKey = btn.getAttribute('data-cat');
            const countSpan = btn.querySelector('.cat-count');
            if (!countSpan) return;

            if (catKey === 'all') {
                const total = document.querySelectorAll('.faq-item-full:not(.hidden)').length;
                countSpan.textContent = total;
            } else {
                const cat = document.querySelector(`.faq-category[data-category="${catKey}"]`);
                if (cat) {
                    const count = cat.querySelectorAll('.faq-item-full:not(.hidden)').length;
                    countSpan.textContent = count;
                }
            }
        });
    }

    /* ========================================
       9.6. TÌM KIẾM - SO SÁNH CẢ CÂU HỎI VÀ CÂU TRẢ LỜI
       ======================================== */
    const searchInput = document.getElementById('faqSearch');

    // Chuẩn hóa chuỗi: bỏ dấu tiếng Việt
    function normalizeText(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'd')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Lấy nội dung tìm kiếm
    function getSearchableContent(item) {
        const dataSearch = item.getAttribute('data-search');
        if (dataSearch) {
            return {
                raw: dataSearch,
                normalized: normalizeText(dataSearch)
            };
        }
        const questionText = item.querySelector('.faq-q-text')?.textContent || '';
        const answerText = item.querySelector('.faq-answer-full p')?.textContent || '';
        const category = item.getAttribute('data-category') || '';
        const categoryNames = {
            'bat-dau': 'bắt đầu bat dau',
            'dinh-gia': 'định giá cấp phép dinh gia cap phep license',
            'moi-gioi': 'môi giới kế toán moi gioi ke toan broker',
            'von-rui-ro': 'vốn rủi ro von rui ro capital risk',
            'chien-luoc': 'chiến lược hiệu suất chien luoc hieu suat strategy',
            'thiet-lap': 'thiết lập cài đặt thiet lap cai dat setup',
            'vps': 'vps máy chủ ảo may chu ao virtual server',
            'khac-phuc': 'khắc phục sự cố hỗ trợ khac phuc su co ho tro fix support'
        };
        const categoryText = categoryNames[category] || '';
        const combined = questionText + ' ' + answerText + ' ' + categoryText;
        return {
            raw: combined.toLowerCase(),
            normalized: normalizeText(combined)
        };
    }

    // Tạo index tìm kiếm
    const searchIndex = [];
    document.querySelectorAll('.faq-item-full').forEach(item => {
        const content = getSearchableContent(item);
        searchIndex.push({
            element: item,
            raw: content.raw,
            normalized: content.normalized,
            category: item.getAttribute('data-category')
        });
    });

    // Hàm highlight từ khóa
    function highlightKeyword(element, keyword) {
        const qText = element.querySelector('.faq-q-text');
        const aText = element.querySelector('.faq-answer-full p');
        
        [qText, aText].forEach(el => {
            if (!el) return;
            // Xóa highlight cũ
            el.querySelectorAll('mark.highlight').forEach(mark => {
                const parent = mark.parentNode;
                parent.replaceChild(document.createTextNode(mark.textContent), mark);
                parent.normalize();
            });
        });

        if (!keyword || keyword.length < 2) return;

        const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedKeyword})`, 'gi');

        [qText, aText].forEach(el => {
            if (!el) return;
            const originalHTML = el.innerHTML;
            // Chỉ highlight nếu không chứa HTML phức tạp
            if (!originalHTML.includes('<mark')) {
                el.innerHTML = originalHTML.replace(regex, '<mark class="highlight">$1</mark>');
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const rawKeyword = e.target.value.trim();
            const noResults = document.getElementById('noResults');
            const searchTermSpan = document.getElementById('searchTerm');
            const countDisplay = document.getElementById('faqVisibleCount');

            if (rawKeyword === '') {
                document.querySelectorAll('.faq-item-full').forEach(item => {
                    item.classList.remove('hidden');
                    // Xóa highlight cũ
                    item.querySelectorAll('mark.highlight').forEach(mark => {
                        const parent = mark.parentNode;
                        parent.replaceChild(document.createTextNode(mark.textContent), mark);
                        parent.normalize();
                    });
                });
                categories.forEach(c => c.classList.remove('hidden'));
                if (noResults) noResults.style.display = 'none';
                updateTabCounts();
                updateVisibleCount();
                return;
            }

            const normalizedKeyword = normalizeText(rawKeyword);
            const lowerKeyword = rawKeyword.toLowerCase();

            let visibleCount = 0;

            searchIndex.forEach(item => {
                const matchRaw = item.raw.includes(lowerKeyword);
                const matchNormalized = item.normalized.includes(normalizedKeyword);

                if (matchRaw || matchNormalized) {
                    item.element.classList.remove('hidden');
                    // Highlight từ khóa
                    highlightKeyword(item.element, rawKeyword);
                    visibleCount++;
                } else {
                    item.element.classList.add('hidden');
                    // Xóa highlight ở item bị ẩn
                    item.element.querySelectorAll('mark.highlight').forEach(mark => {
                        const parent = mark.parentNode;
                        parent.replaceChild(document.createTextNode(mark.textContent), mark);
                        parent.normalize();
                    });
                }
            });

            categories.forEach(cat => {
                const visibleInCat = cat.querySelectorAll('.faq-item-full:not(.hidden)').length;
                if (visibleInCat > 0) {
                    cat.classList.remove('hidden');
                } else {
                    cat.classList.add('hidden');
                }
            });

            updateTabCounts();

            if (visibleCount === 0) {
                if (noResults) {
                    if (searchTermSpan) searchTermSpan.textContent = rawKeyword;
                    noResults.style.display = 'block';
                }
            } else {
                if (noResults) noResults.style.display = 'none';
            }

            if (countDisplay) countDisplay.textContent = visibleCount;
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === '/' && document.activeElement !== searchInput) {
                e.preventDefault();
                searchInput.focus();
            }
            if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        });
    }

    /* 9.7. CLICK CÂU HỎI PHỔ BIẾN */
    document.querySelectorAll('.popular-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const questionText = tag.textContent.toLowerCase().trim();

            catButtons.forEach(b => b.classList.remove('active'));
            document.querySelector('[data-cat="all"]')?.classList.add('active');
            categories.forEach(c => c.classList.remove('hidden'));
            updateTabCounts();
            updateVisibleCount();

            let targetItem = null;
            document.querySelectorAll('.faq-item-full').forEach(item => {
                const qText = item.querySelector('.faq-q-text')?.textContent.toLowerCase().trim() || '';
                if (qText.includes(questionText.split(' ').slice(0, 5).join(' '))) {
                    targetItem = item;
                }
            });

            if (targetItem) {
                setTimeout(() => {
                    targetItem.classList.add('open');
                    targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetItem.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.4)';
                    setTimeout(() => { targetItem.style.boxShadow = ''; }, 2000);
                }, 100);
            }
        });
    });

    /* 9.8. SAO CHÉP LINK CÂU HỎI */
    window.copyQuestionLink = function(btn) {
        const item = btn.closest('.faq-item-full');
        const questionText = item.querySelector('.faq-q-text')?.textContent || '';
        const encoded = encodeURIComponent(questionText);
        const url = `${window.location.origin}${window.location.pathname}#q-${encoded}`;

        navigator.clipboard.writeText(url).then(() => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '✓ Đã sao chép';
            btn.style.color = '#22c55e';
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.color = '';
            }, 1800);
        }).catch(() => alert('Link: ' + url));
    };

    /* 9.9. TỰ ĐỘNG MỞ CÂU HỎI TỪ HASH URL */
    if (window.location.hash) {
        const hash = decodeURIComponent(window.location.hash.substring(1));
        if (hash.startsWith('q-')) {
            const questionToFind = hash.substring(2).toLowerCase();
            document.querySelectorAll('.faq-item-full').forEach(item => {
                const qText = item.querySelector('.faq-q-text')?.textContent.toLowerCase() || '';
                if (qText === questionToFind) {
                    item.classList.add('open');
                    setTimeout(() => {
                        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                }
            });
        }
    }
})();