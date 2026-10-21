// Batara Parkview - Interactive scripts

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    });

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      });
    });
  }

  // Lead Form Handling ("AMBIL BROSUR!")
  window.handleLeadSubmit = function(e) {
    if (e && e.preventDefault) e.preventDefault();
    const form = (e && e.target) ? e.target : document.querySelector('form[id*="LeadForm"], .lead-capture-form');
    if (!form) return;
    const nameInput = form.querySelector('input[name="nama"]') || form.querySelector('input[type="text"]');
    const phoneInput = form.querySelector('input[name="telepon"]') || form.querySelector('input[type="tel"]');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    if (!name || !phone) {
      alert('Silakan lengkapi Nama dan Nomor Telepon Anda.');
      return;
    }

    const clientNameEl = document.getElementById('modalClientName');
    if (clientNameEl) clientNameEl.textContent = name;

    const waText = encodeURIComponent(`Halo Marketing Batara Parkview, saya ${name} (${phone}). Saya tertarik dan ingin mendapatkan brosur digital serta informasi unit.`);
    const waBtn = document.getElementById('modalWaBtn');
    if (waBtn) {
      waBtn.href = `https://wa.me/6281234567890?text=${waText}`;
    }

    const brochureModal = document.getElementById('brochureModal');
    if (brochureModal) {
      brochureModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    setTimeout(() => {
      window.open(`https://wa.me/6281234567890?text=${waText}`, '_blank');
    }, 1000);

    form.reset();
  };

  const leadForms = document.querySelectorAll('.lead-capture-form');
  const brochureModal = document.getElementById('brochureModal');
  const brochureModalClose = document.getElementById('closeBrochureModal');

  leadForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      window.handleLeadSubmit(e);
    });
  });

  if (brochureModalClose && brochureModal) {
    brochureModalClose.addEventListener('click', () => {
      brochureModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  // Denah (Floor plan) Lightbox
  const denahModal = document.getElementById('denahModal');
  const denahModalImg = document.getElementById('denahModalImg');
  const denahModalTitle = document.getElementById('denahModalTitle');
  const closeDenahModal = document.getElementById('closeDenahModal');

  window.openDenahModal = function(imageSrc, title) {
    if (denahModal && denahModalImg) {
      denahModalImg.src = imageSrc;
      if (denahModalTitle) denahModalTitle.textContent = 'Denah ' + title;
      denahModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }
  };

  if (closeDenahModal && denahModal) {
    closeDenahModal.addEventListener('click', () => {
      denahModal.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  // Close modals on clicking overlay
  const promoModalEl = document.getElementById('monthlyPromoModal');
  [brochureModal, denahModal, promoModalEl].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
          document.body.style.overflow = '';
        }
      });
    }
  });

  // Smooth scroll to #contact if clicked on another page or current page
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ==========================================
  // Interactive Floating WhatsApp Widget
  // ==========================================
  const waBtn = document.getElementById('waFloatingBtn');
  const waPopover = document.getElementById('waPopover');
  const waCloseBtn = document.getElementById('waClosePopover');
  const waBadge = document.getElementById('waBadge');

  if (waBtn && waPopover) {
    function openWaPopover() {
      waPopover.classList.remove('wa-hidden');
      waPopover.classList.add('wa-visible');
      waBtn.setAttribute('aria-expanded', 'true');
      if (waBadge) {
        waBadge.classList.add('hidden');
      }
    }

    function closeWaPopover() {
      waPopover.classList.remove('wa-visible');
      waPopover.classList.add('wa-hidden');
      waBtn.setAttribute('aria-expanded', 'false');
    }

    function toggleWaPopover() {
      if (waPopover.classList.contains('wa-visible')) {
        closeWaPopover();
      } else {
        openWaPopover();
      }
    }

    waBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleWaPopover();
    });

    if (waCloseBtn) {
      waCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeWaPopover();
      });
    }

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (waPopover.classList.contains('wa-visible')) {
        if (!waPopover.contains(e.target) && !waBtn.contains(e.target)) {
          closeWaPopover();
        }
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && waPopover.classList.contains('wa-visible')) {
        closeWaPopover();
      }
    });

    // Proactive greeting bubble after 4.5s (only once per session)
    if (!sessionStorage.getItem('waGreeted')) {
      setTimeout(() => {
        if (!waPopover.classList.contains('wa-visible')) {
          openWaPopover();
          sessionStorage.setItem('waGreeted', 'true');
        }
      }, 4500);
    }
  }
});

// Quick action helper for WhatsApp topics
function sendWaMessage(topic) {
  const phone = '6281234567890';
  let message = 'Halo Marketing Batara Parkview, saya ingin informasi lebih lanjut mengenai hunian Batara Parkview.';
  
  if (topic === 'brosur') {
    message = 'Halo Marketing Batara Parkview, saya ingin meminta E-Brosur dan Price List unit terbaru.';
  } else if (topic === 'promo') {
    message = 'Halo Marketing Batara Parkview, saya ingin konsultasi mengenai promo DP 0% dan simulasi cicilan KPR.';
  } else if (topic === 'survey') {
    message = 'Halo Marketing Batara Parkview, saya ingin menjadwalkan kunjungan survey lokasi langsung ke Batara Parkview.';
  }

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/* ==========================================================================
   KONFIGURASI PROMO BULANAN (EDIT MATERI PROMO SETIAP BULAN DI SINI)
   Anda dapat mengganti judul, teks keuntungan, flyer/gambar, serta link WA.
   ========================================================================== */
window.MONTHLY_PROMO_CONFIG = {
  enabled: true, // Ubah ke false jika ingin menonaktifkan pop up promo
  promoId: 'promo-oktober-2026', // Ganti ID ini setiap awal bulan agar promo otomatis muncul lagi ke pengunjung baru
  badge: 'Promo Spesial',
  title: 'Promo Spesial Batara Parkview',
  subtitle: 'Wujudkan hunian hijau mandiri cuma selangkah ke Stasiun Cikoya.',
  bannerImage: 'assets/images/hero-banner-real.jpg', // Gambar flyer/banner promo bulanan
  benefits: [
    'DP 0% — Bebas Uang Muka',
    'Bebas Biaya KPR, BPHTB & Notaris',
    'Cukup Booking Fee Rp 1 Juta',
    'Bonus Smart Door Lock & Subsidi'
  ],
  ctaText: 'Klaim Promo via WA',
  whatsappMessage: 'Halo Marketing Batara Parkview, saya melihat Promo Spesial di website dan ingin konsultasi serta mengklaim promonya.',
  periodNote: 'Batara Parkview • Kuota Terbatas Bulan Ini'
};

// Open Promo Modal Function
window.openPromoModal = function() {
  const modal = document.getElementById('monthlyPromoModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
};

// Close Promo Modal Function
window.closePromoModal = function(dontShowAgain = false) {
  const modal = document.getElementById('monthlyPromoModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    if (dontShowAgain) {
      sessionStorage.setItem('promo_closed_session', 'true');
    }
  }
};

// WhatsApp CTA from Promo Modal
window.claimMonthlyPromo = function() {
  const phone = '6281234567890';
  const msg = (window.MONTHLY_PROMO_CONFIG && window.MONTHLY_PROMO_CONFIG.whatsappMessage) 
    ? window.MONTHLY_PROMO_CONFIG.whatsappMessage 
    : 'Halo Marketing Batara Parkview, saya ingin klaim Promo Spesial Batara Parkview!';
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  window.closePromoModal();
};

// Initialize Promo Modal on Website Open
document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.MONTHLY_PROMO_CONFIG;
  if (cfg && cfg.enabled) {
    // Populate promo elements if modal exists
    const badgeEl = document.getElementById('promoBadge');
    const titleEl = document.getElementById('promoTitle');
    const subtitleEl = document.getElementById('promoSubtitle');
    const imgEl = document.getElementById('promoBannerImg');
    const benefitsListEl = document.getElementById('promoBenefitsList');
    const ctaBtnEl = document.getElementById('promoCtaBtn');
    const noteEl = document.getElementById('promoPeriodNote');

    if (badgeEl) badgeEl.textContent = cfg.badge;
    if (titleEl) titleEl.textContent = cfg.title;
    if (subtitleEl) subtitleEl.textContent = cfg.subtitle;
    if (imgEl && cfg.bannerImage) imgEl.src = cfg.bannerImage;
    if (noteEl) noteEl.textContent = cfg.periodNote;
    if (ctaBtnEl) {
      const ctaSpan = ctaBtnEl.querySelector('.cta-text');
      if (ctaSpan) {
        ctaSpan.textContent = cfg.ctaText;
      } else {
        ctaBtnEl.textContent = cfg.ctaText;
      }
    }

    if (benefitsListEl && cfg.benefits) {
      benefitsListEl.innerHTML = cfg.benefits.map(b => 
        `<li class="flex items-center gap-2 text-xs text-batara-dark font-medium font-poppins bg-white/90 py-1.5 px-2.5 rounded-xl border border-gray-100 shadow-xs">
          <span class="w-4 h-4 rounded-full bg-batara-lime/30 text-batara-dark flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
          <span class="truncate">${b.replace(/^[^\w\s]+/, '').trim()}</span>
        </li>`
      ).join('');
    }

    // Auto show promo modal automatically whenever website is opened (800ms delay)
    const isDismissedSession = sessionStorage.getItem('promo_closed_session');
    if (!isDismissedSession) {
      setTimeout(() => {
        window.openPromoModal();
      }, 800);
    }
  }

  // ==========================================
  // Interactive House Unit Filter (Section 3)
  // ==========================================
  const filterBtns = document.querySelectorAll('.unit-filter-btn');
  const houseCards = document.querySelectorAll('.house-card');

  window.filterHouseUnits = function(category, btnElement) {
    // Update active button classes
    if (btnElement) {
      filterBtns.forEach(btn => {
        btn.classList.remove('bg-batara-lime', 'text-batara-dark', 'active');
        btn.classList.add('bg-white/10', 'text-white', 'hover:bg-white/20');
      });
      btnElement.classList.remove('bg-white/10', 'text-white', 'hover:bg-white/20');
      btnElement.classList.add('bg-batara-lime', 'text-batara-dark', 'active');
    }

    // Filter house cards
    houseCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'all' || cardCat === category) {
        card.classList.remove('is-hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.classList.add('is-hidden');
      }
    });
  };

  // ==========================================
  // Interactive Mini KPR Calculator
  // ==========================================
  window.updateKprCalc = function() {
    const typeSelect = document.getElementById('kprHouseType');
    const tenorSelect = document.getElementById('kprTenor');
    const resultEl = document.getElementById('kprResultAmount');
    const priceEl = document.getElementById('kprPriceDisplay');
    const waKprBtn = document.getElementById('kprWaInquiryBtn');

    if (!typeSelect || !tenorSelect || !resultEl) return;

    const price = parseInt(typeSelect.value, 10) || 185000000;
    const years = parseInt(tenorSelect.value, 10) || 20;
    const isSubsidi = typeSelect.options[typeSelect.selectedIndex].getAttribute('data-subsidi') === 'true';

    // Annual interest rate: 5% fixed for Subsidi FLPP, 7.5% for commercial
    const annualRate = isSubsidi ? 0.05 : 0.075;
    const monthlyRate = annualRate / 12;
    const totalMonths = years * 12;

    // DP 0% promo assumption (loan amount = price)
    const loanAmount = price;

    // Monthly installment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
    const monthlyInstallment = Math.round(
      loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );

    // Format currency
    const formattedAmount = 'Rp ' + monthlyInstallment.toLocaleString('id-ID');
    const formattedPrice = 'Rp ' + (price / 1000000).toFixed(0) + ' Juta';

    resultEl.textContent = formattedAmount;
    if (priceEl) priceEl.textContent = formattedPrice;

    if (waKprBtn) {
      const typeName = typeSelect.options[typeSelect.selectedIndex].text;
      const waMsg = `Halo Marketing Batara Parkview, saya telah mencoba simulasi KPR untuk ${typeName} dengan tenor ${years} tahun (estimasi cicilan ${formattedAmount}/bulan). Saya ingin konsultasi pengajuan KPR.`;
      waKprBtn.href = `https://wa.me/6281234567890?text=${encodeURIComponent(waMsg)}`;
    }
  };

  // Run initial calculation if elements present
  if (document.getElementById('kprHouseType')) {
    window.updateKprCalc();
  }
});


