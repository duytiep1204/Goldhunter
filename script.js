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
   4. GOOGLE TRANSLATE - XỬ LÝ THÔNG MINH
   ========================================= */

// Hàm ẩn banner Google Translate (dùng chung)
function hideGoogleBanner() {
    // Ẩn iframe banner
    const bannerFrames = document.querySelectorAll('.goog-te-banner-frame, iframe.goog-te-banner-frame');
    bannerFrames.forEach(frame => {
        frame.style.display = 'none';
        frame.style.visibility = 'hidden';
    });
    
    // Reset body top (Google Translate thường đẩy body xuống 40px)
    document.body.style.top = '0px';
    document.body.style.position = 'static';
    document.body.style.marginTop = '0px';
}

// Theo dõi sự xuất hiện của Google Translate widget bằng MutationObserver
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        // Mỗi khi DOM thay đổi, kiểm tra và ẩn banner
        hideGoogleBanner();
        
        // Kiểm tra xem widget Google Translate đã load chưa
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect && !googleSelect.dataset.styled) {
            googleSelect.dataset.styled = 'true';
            console.log('✅ Google Translate đã load thành công!');
        }
    });
});

// Bắt đầu theo dõi toàn bộ DOM
observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'style']
});

// Chạy lần đầu ngay khi load
window.addEventListener('load', function() {
    hideGoogleBanner();
    
    // Kiểm tra định kỳ trong 5 giây đầu (đề phòng Google Translate load chậm)
    let checkCount = 0;
    const checkInterval = setInterval(function() {
        hideGoogleBanner();
        checkCount++;
        if (checkCount > 10) {
            clearInterval(checkInterval);
        }
    }, 500);
});

// Chạy lại khi DOMContentLoaded (đề phòng)
document.addEventListener('DOMContentLoaded', function() {
    hideGoogleBanner();
});

/* =========================================
   5. FALLBACK: KIỂM TRA WIDGET SAU 3 GIÂY
   ========================================= */
setTimeout(function() {
    const container = document.getElementById('google_translate_element');
    const googleSelect = document.querySelector('.goog-te-combo');
    
    // Nếu widget không load được, hiển thị thông báo nhỏ
    if (!googleSelect && container) {
        console.warn('⚠️ Google Translate không load được. Có thể do mạng hoặc bị chặn.');
        container.style.background = '#1a1a1a';
        container.style.borderColor = '#333';
        container.innerHTML = '<span style="color:#888;font-size:13px;padding:4px;">🌐 Translate</span>';
    }
}, 3000);