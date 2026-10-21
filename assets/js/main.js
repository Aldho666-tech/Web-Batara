// Batara Parkview - Interactive scripts

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle with smooth transitions & accessibility
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  if (mobileMenuBtn && mobileMenu) {
    function openMenu() {
      mobileMenu.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }

    mobileMenuBtn.addEventListener('click', openMenu);

    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', closeMenu);
    }

    // Close when clicking backdrop
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) closeMenu();
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMenu();
      }
    });
  }

  // ==========================================
  // Scroll Progress Bar & Back to Top Button
  // ==========================================
  let progressBar = document.getElementById('scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    document.body.prepend(progressBar);
  }

  let backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) {
    backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.setAttribute('type', 'button');
    backToTopBtn.setAttribute('aria-label', 'Kembali ke atas');
    backToTopBtn.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"></path>
      </svg>
    `;
    document.body.appendChild(backToTopBtn);

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (scrollHeight > 0 && progressBar) {
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    }

    if (backToTopBtn) {
      if (scrollTop > 380) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }
  }, { passive: true });

  // ==========================================
  // IntersectionObserver Scroll Reveal Animations
  // ==========================================
  const revealElements = document.querySelectorAll(
    '.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale, .stagger-children'
  );

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // If element has counter numbers, trigger count up
          const counters = entry.target.querySelectorAll('.counter-val');
          counters.forEach(animateCounter);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: immediately show elements if observer not supported
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target') || el.textContent.replace(/[^0-9.]/g, ''));
    if (isNaN(target)) return;
    const duration = 1600;
    const startTime = performance.now();
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = target * easeProgress;
      el.textContent = prefix + (decimals > 0 ? currentVal.toFixed(decimals) : Math.round(currentVal)) + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }
    requestAnimationFrame(updateCounter);
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
    window.toggleWaPopover = toggleWaPopover;

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
  promoId: 'promo-shocktober-2026', // ID promo SHOCKTOBER
  badge: '✨ SHOCKTOBER 2026',
  title: '✨ SHOCKTOBER Batara Parkview',
  subtitle: '“Oktober Ini, Waktunya Punya Rumah!” Saatnya miliki hunian strategis tipe komersil.',
  bannerImage: 'assets/images/promo-shocktober.jpg', // Gambar flyer SHOCKTOBER
  benefits: [
    'Cukup Bayar 3 Jt All In',
    'Cicilan Mulai 1,8 Juta / Bulan',
    'Beli Rumah Dapat AC & Kanopi',
    'Subsidi Bunga 2% • Free SHM',
    'Unit Terdepan Selangkah ke Stasiun'
  ],
  ctaText: 'Klaim Promo SHOCKTOBER via WA',
  whatsappMessage: 'Halo Marketing Batara Parkview, saya melihat Promo SHOCKTOBER di website (Cukup Bayar 3 Jt All In, Cicilan 1.8 Jt/bln, Bonus AC & Kanopi). Saya ingin konsultasi dan klaim promonya.',
  periodNote: 'Periode Booking: 1 - 31 Oktober 2026 • Tipe Komersil'
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
    const promoId = (window.MONTHLY_PROMO_CONFIG && window.MONTHLY_PROMO_CONFIG.promoId) ? window.MONTHLY_PROMO_CONFIG.promoId : 'shocktober';
    if (dontShowAgain) {
      sessionStorage.setItem('promo_closed_' + promoId, 'true');
    }
  }
};

// WhatsApp CTA from Promo Modal
window.claimMonthlyPromo = function() {
  const phone = '6281234567890';
  const msg = (window.MONTHLY_PROMO_CONFIG && window.MONTHLY_PROMO_CONFIG.whatsappMessage) 
    ? window.MONTHLY_PROMO_CONFIG.whatsappMessage 
    : 'Halo Marketing Batara Parkview, saya ingin klaim Promo SHOCKTOBER Batara Parkview!';
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
    if (imgEl && cfg.bannerImage) {
      imgEl.src = cfg.bannerImage;
      imgEl.alt = 'Flyer ' + cfg.title;
    }
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
        `<li class="flex items-center gap-2 text-xs text-batara-dark font-semibold font-poppins bg-white py-1.5 px-3 rounded-xl border border-gray-100 shadow-xs">
          <span class="w-4 h-4 rounded-full bg-batara-lime/40 text-batara-dark flex items-center justify-center text-[10px] font-bold flex-shrink-0">✓</span>
          <span class="truncate">${b}</span>
        </li>`
      ).join('');
    }

    // Auto show promo modal automatically whenever website is opened (800ms delay)
    const promoKey = 'promo_closed_' + (cfg.promoId || 'shocktober');
    const isDismissedSession = sessionStorage.getItem(promoKey);
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

// ==========================================
// Tipe Rumah Interactive Features
// ==========================================
window.switchUnitView = function(unitId, viewType) {
  const card = document.getElementById(unitId);
  if (!card) return;
  const fasadImg = card.querySelector('.unit-fasad-container');
  const denahImg = card.querySelector('.unit-denah-container');
  const fasadBtn = card.querySelector('.btn-view-fasad');
  const denahBtn = card.querySelector('.btn-view-denah');

  if (viewType === 'fasad') {
    if (fasadImg) fasadImg.classList.remove('hidden');
    if (denahImg) denahImg.classList.add('hidden');
    if (fasadBtn) {
      fasadBtn.classList.add('bg-batara-dark', 'text-white', 'shadow-xs');
      fasadBtn.classList.remove('bg-white', 'text-gray-600', 'hover:bg-gray-100');
    }
    if (denahBtn) {
      denahBtn.classList.remove('bg-batara-dark', 'text-white', 'shadow-xs');
      denahBtn.classList.add('bg-white', 'text-gray-600', 'hover:bg-gray-100');
    }
  } else {
    if (fasadImg) fasadImg.classList.add('hidden');
    if (denahImg) denahImg.classList.remove('hidden');
    if (denahBtn) {
      denahBtn.classList.add('bg-batara-dark', 'text-white', 'shadow-xs');
      denahBtn.classList.remove('bg-white', 'text-gray-600', 'hover:bg-gray-100');
    }
    if (fasadBtn) {
      fasadBtn.classList.remove('bg-batara-dark', 'text-white', 'shadow-xs');
      fasadBtn.classList.add('bg-white', 'text-gray-600', 'hover:bg-gray-100');
    }
  }
};

window.toggleUnitSpecs = function(specId, btn) {
  const specEl = document.getElementById(specId);
  if (!specEl) return;
  const isHidden = specEl.classList.contains('hidden');
  if (isHidden) {
    specEl.classList.remove('hidden');
    if (btn) {
      const textSpan = btn.querySelector('.spec-toggle-text');
      const arrowSpan = btn.querySelector('.spec-toggle-arrow');
      if (textSpan) textSpan.textContent = 'Sembunyikan Spesifikasi Material';
      if (arrowSpan) arrowSpan.style.transform = 'rotate(180deg)';
    }
  } else {
    specEl.classList.add('hidden');
    if (btn) {
      const textSpan = btn.querySelector('.spec-toggle-text');
      const arrowSpan = btn.querySelector('.spec-toggle-arrow');
      if (textSpan) textSpan.textContent = 'Lihat 15 Spesifikasi Konstruksi Lengkap';
      if (arrowSpan) arrowSpan.style.transform = 'rotate(0deg)';
    }
  }
};

window.filterTipeRumah = function(category, btn) {
  const cards = document.querySelectorAll('.tipe-unit-card');
  const btns = document.querySelectorAll('.tipe-filter-btn');

  btns.forEach(b => {
    b.classList.remove('bg-batara-dark', 'text-white', 'shadow-xs');
    b.classList.add('bg-white', 'text-gray-600', 'border-gray-200');
  });
  if (btn) {
    btn.classList.add('bg-batara-dark', 'text-white', 'shadow-xs');
    btn.classList.remove('bg-white', 'text-gray-600', 'border-gray-200');
  }

  cards.forEach(c => {
    const cardCat = c.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      c.style.display = 'block';
      c.style.opacity = '0';
      c.style.transform = 'translateY(12px)';
      setTimeout(() => {
        c.style.opacity = '1';
        c.style.transform = 'translateY(0)';
      }, 50);
    } else {
      c.style.display = 'none';
    }
  });
};



