// ==========================================
// 1. رابط Web App الخاص بـ Google Apps Script
// ==========================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzR0hHLITm5HeXFoFF58heJq0lHi8a3Fp-Nhh5YPilUbC169Bs6IFiz7x4XQVLR_7mc/exec';

// ==========================================
// 2. توليد معرّف فريد للجهاز تلقائياً (Device UUID)
// ==========================================
function getOrCreateDeviceId() {
    let deviceId = localStorage.getItem('app_device_uuid');
    if (!deviceId) {
        deviceId = 'dev_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
        localStorage.setItem('app_device_uuid', deviceId);
    }
    return deviceId;
}

// ==========================================
// 3. مؤثرات صوتية سيبرانية خفيفة (Audio Feedback)
// ==========================================
function playCyberClickSound() {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.06);

        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
        // تجاهل في حال حظر المتصفح تشغيل الصوت دون تفاعل
    }
}

// ==========================================
// 4. نظام إشعارات السايبر المنبثقة (Custom Toast)
// ==========================================
let toastTimer = null;
function showCyberToast(message, isError = false) {
    const toast = document.getElementById('cyberToast');
    const toastMsg = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');

    if (!toast || !toastMsg) return;

    if (toastTimer) clearTimeout(toastTimer);

    toastMsg.textContent = message;

    if (isError) {
        toast.classList.add('error-toast');
        if (toastIcon) toastIcon.className = 'fa-solid fa-triangle-exclamation';
    } else {
        toast.classList.remove('error-toast');
        if (toastIcon) toastIcon.className = 'fa-solid fa-circle-check';
    }

    toast.classList.add('show');
    playCyberClickSound();

    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3500);
}

// ==========================================
// 5. تأثير الماتريكس في الخلفية (مع تحسين أداء الهاتف والبطارية)
// ==========================================
(function initMatrix() {
    const canvas = document.getElementById('techCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const isMobile = window.innerWidth < 768;
    // تخفيض حجم وحسابات النقاط بنسبة 50% على المحمول لتوفير الطاقة
    const fontSize = isMobile ? 24 : 16;
    const intervalRate = isMobile ? 65 : 40;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = '01';
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

    window.addEventListener('resize', () => {
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(1);
    });

    function draw() {
        ctx.fillStyle = 'rgba(11, 15, 25, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00F0FF';
        ctx.font = fontSize + 'px "Fira Code", monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, intervalRate);
})();

// ==========================================
// 6. العداد التنازلي لموعد المناقشة
// ==========================================
(function countdown() {
    const eventDate = new Date('August 30, 2026 09:00:00').getTime();

    function update() {
        const now = Date.now();
        const diff = eventDate - now;
        if (diff > 0) {
            const daysEl = document.getElementById('days');
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');

            if (daysEl) daysEl.innerText = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
            if (hoursEl) hoursEl.innerText = String(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
            if (minutesEl) minutesEl.innerText = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            if (secondsEl) secondsEl.innerText = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
        }
    }
    update();
    setInterval(update, 1000);
})();

// ==========================================
// 7. زر التقويم وزر المشاركة
// ==========================================
(function initUtilityActions() {
    const calendarBtn = document.getElementById('addToCalendarBtn');
    const shareBtn = document.getElementById('shareInviteBtn');

    if (calendarBtn) {
        calendarBtn.addEventListener('click', () => {
            playCyberClickSound();
            const title = encodeURIComponent("حفل تخرج ومناقشة - المهندس محمد والمهندس عدي رحمون");
            const details = encodeURIComponent("نتشرف بدعوتكم لحضور حفل تخرجنا ومناقشة مشاريع التخرج.\nمحمد (هندسة معلوماتية) & عدي (هندسة بترول).");
            const location = encodeURIComponent("كلية الهندسة المعلوماتية والبترولية");
            // موعد الحدث بتوقيت عالمي 30 أغسطس 2026 الساعة 09:00 صباحاً
            const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260830T090000/20260830T130000&details=${details}&location=${location}`;
            window.open(calendarUrl, '_blank');
        });
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', () => {
            playCyberClickSound();
            const shareText = `🎓 يسعدنا دعوتكم لحضور حفل تخرج ومناقشة مشاريع الهندسة للمهندس محمد رحمون والمهندس عدي رحمون✨\n📅 التاريخ: الأحد 30 أغسطس 2026 - الساعة 9:00 صباحاً\nلتأكيد الحضور ومعاينة التفاصيل عبر الرابط:\n${window.location.href}`;

            if (navigator.share) {
                navigator.share({
                    title: 'دعوة حفل تخرج - المهندس محمد والمهندس عدي رحمون',
                    text: shareText,
                    url: window.location.href
                }).catch(() => {});
            } else {
                const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
                window.open(whatsappUrl, '_blank');
            }
        });
    }
})();

// ==========================================
// 8. نظام إدارة الحضور بالمعرف التلقائي
// ==========================================
(function rsvpSystem() {
    const STORAGE_USER_DATA = 'rsvp_user_previous_data';

    const countMohammed = document.getElementById('count-mohammed');
    const countOday = document.getElementById('count-oday');
    const totalGuestsEl = document.getElementById('total-guests');
    const mohammedGuestsEl = document.getElementById('mohammed-guests');
    const odayGuestsEl = document.getElementById('oday-guests');

    const modalOverlay = document.getElementById('modalOverlay');
    const modalTitle = document.getElementById('modalTitle');
    const guestName = document.getElementById('guestName');
    const guestCount = document.getElementById('guestCount');
    const modalConfirm = document.getElementById('modalConfirm');
    const modalCancel = document.getElementById('modalCancel');

    let currentTarget = null;

    function fetchLiveCounts() {
        const script = document.createElement('script');
        script.src = `${GOOGLE_SCRIPT_URL}?action=getTotals&callback=handleCountsResponse&_=${Date.now()}`;
        document.body.appendChild(script);
        script.onload = () => script.remove();
        script.onerror = () => script.remove();
    }

    window.handleCountsResponse = function(data) {
        if (data && data.mohammed !== undefined) {
            updateCountersUI(data.mohammed, data.oday);
        }
    };

    function updateCountersUI(m, o) {
        const mohammedVal = parseInt(m, 10) || 0;
        const odayVal = parseInt(o, 10) || 0;
        
        if (countMohammed) countMohammed.textContent = mohammedVal;
        if (countOday) countOday.textContent = odayVal;
        if (mohammedGuestsEl) mohammedGuestsEl.textContent = mohammedVal;
        if (odayGuestsEl) odayGuestsEl.textContent = odayVal;
        if (totalGuestsEl) totalGuestsEl.textContent = mohammedVal + odayVal;
    }

    function openModal(target) {
        playCyberClickSound();
        currentTarget = target;
        const isMohammed = target === 'mohammed';
        if (modalTitle) modalTitle.textContent = `تأكيد الحضور لدى ${isMohammed ? 'المهندس محمد' : 'المهندس عدي'}`;
        if (modalConfirm) modalConfirm.className = `btn-confirm-modal ${isMohammed ? '' : 'oday-theme'}`;

        try {
            const prevData = JSON.parse(localStorage.getItem(STORAGE_USER_DATA) || 'null');
            if (prevData) {
                if (guestName) guestName.value = prevData.name || '';
                if (guestCount) guestCount.value = parseInt(prevData.companions, 10) || 0;
            } else {
                if (guestName) guestName.value = '';
                if (guestCount) guestCount.value = 0;
            }
        } catch (e) {
            if (guestName) guestName.value = '';
            if (guestCount) guestCount.value = 0;
        }

        if (modalOverlay) modalOverlay.classList.add('active');
        setTimeout(() => { if (guestName) guestName.focus(); }, 100);
    }

    function closeModal() {
        playCyberClickSound();
        if (modalOverlay) modalOverlay.classList.remove('active');
        currentTarget = null;
    }

    function handleConfirm() {
        playCyberClickSound();
        const name = guestName ? guestName.value.trim() : '';
        const companions = guestCount ? Math.max(0, parseInt(guestCount.value, 10) || 0) : 0;
        const totalPersons = 1 + companions;
        const deviceId = getOrCreateDeviceId();

        if (!name) {
            showCyberToast('الرجاء إدخال اسمك الكريم لتأكيد الحضور.', true);
            return;
        }

        if (modalConfirm) {
            modalConfirm.disabled = true;
            modalConfirm.textContent = 'جاري الحفظ...';
        }

        const dateStr = new Date().toLocaleString('ar-EG');
        const engStr = currentTarget === 'mohammed' ? 'محمد' : 'عدي';

        const saveUrl = `${GOOGLE_SCRIPT_URL}?action=add&deviceId=${encodeURIComponent(deviceId)}&date=${encodeURIComponent(dateStr)}&name=${encodeURIComponent(name)}&engineer=${encodeURIComponent(engStr)}&companions=${companions}&total=${totalPersons}&callback=handleSaveResponse&_=${Date.now()}`;

        let isHandled = false;
        const timeoutId = setTimeout(() => {
            if (!isHandled) {
                isHandled = true;
                if (modalConfirm) {
                    modalConfirm.disabled = false;
                    modalConfirm.textContent = 'حفظ وتأكيد';
                }
                showCyberToast('⚠️ تعذر الاتصال بالسيرفر، يرجى التحقق من اتصال الإنترنت.', true);
            }
        }, 12000);

        window.handleSaveResponse = function(res) {
            if (isHandled) return;
            isHandled = true;
            clearTimeout(timeoutId);

            if (res && res.result === 'success') {
                localStorage.setItem(STORAGE_USER_DATA, JSON.stringify({
                    name: name,
                    engineer: currentTarget,
                    companions: companions,
                    total: totalPersons
                }));

                closeModal();
                showCyberToast(`✅ تم تأكيد الحضور بنجاح!\nالاسم: ${name} | المرافقين: ${companions} | الإجمالي: ${totalPersons}`);
                updateCountersUI(res.mohammed, res.oday);
            } else {
                showCyberToast('حدث خطأ أثناء الحفظ، يرجى المحاولة مرة أخرى.', true);
            }

            if (modalConfirm) {
                modalConfirm.disabled = false;
                modalConfirm.textContent = 'حفظ وتأكيد';
            }
        };

        const script = document.createElement('script');
        script.src = saveUrl;
        document.body.appendChild(script);
        script.onload = () => script.remove();
        script.onerror = () => {
            if (!isHandled) {
                isHandled = true;
                clearTimeout(timeoutId);
                if (modalConfirm) {
                    modalConfirm.disabled = false;
                    modalConfirm.textContent = 'حفظ وتأكيد';
                }
                showCyberToast('حدث خطأ في شبكة الاتصال، يرجى إعادة المحاولة.', true);
                script.remove();
            }
        };
    }

    document.querySelectorAll('[data-target]').forEach(btn => {
        btn.addEventListener('click', function() {
            openModal(this.dataset.target);
        });
    });

    if (modalConfirm) modalConfirm.addEventListener('click', handleConfirm);
    if (modalCancel) modalCancel.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });

    fetchLiveCounts();
})();