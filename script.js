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
   4. GOOGLE TRANSLATE - TỰ ĐỘNG XỬ LÝ
   ========================================= */
/* 
   Google Translate Widget đã được nhúng trong file index.html.
   Script này chỉ đảm bảo widget hoạt động mượt mà và không bị lỗi.
*/

// Đợi Google Translate load xong rồi mới chạy các tinh chỉnh
window.addEventListener('load', function() {
    // Chờ 1 giây để Google Translate khởi tạo
    setTimeout(function() {
        // Ẩn iframe banner quảng cáo của Google Translate (nếu có)
        const googleBanner = document.querySelector('.goog-te-banner-frame');
        if (googleBanner) {
            googleBanner.style.display = 'none';
        }
        
        // Đảm bảo body không bị đẩy xuống
        document.body.style.top = '0px';
        
        // Đảm bảo dropdown của Google Translate hiển thị đúng
        const googleSelect = document.querySelector('.goog-te-combo');
        if (googleSelect) {
            googleSelect.style.color = '#fff';
            googleSelect.style.background = '#1a1a1a';
            googleSelect.style.border = '1px solid #333';
        }
    }, 1000);
});

// Theo dõi sự thay đổi ngôn ngữ (tùy chọn - chỉ log ra console)
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
            const htmlLang = document.documentElement.lang;
            console.log('Ngôn ngữ hiện tại:', htmlLang);
        }
    });
});
observer.observe(document.documentElement, { attributes: true });