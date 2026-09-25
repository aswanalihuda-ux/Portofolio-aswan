/**
 * ASWAN ALI HUDA - PROFESSIONAL PORTFOLIO
 * Script: Interactive Flow, Modal Certificate Viewer, and Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll state
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav .nav-link');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (mobileNav.classList.contains('open')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. ScrollSpy / Active Section Highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop .nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // 4. Certificate Modal Viewer
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalCertImg');
  const modalTitle = document.getElementById('modalCertTitle');
  const modalIssuer = document.getElementById('modalCertIssuer');
  const modalReg = document.getElementById('modalCertReg');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalDownload = document.getElementById('modalDownloadBtn');

  const certData = {
    'bnsp-warehouse': {
      title: 'Sertifikat Kompetensi: Okupasi Warehouse Supervisor',
      issuer: 'BNSP - LSP Logistik Insan Prima',
      reg: 'No. Reg. LSC 253 00419 2025 | Sertifikat No. 52101 1324 0 0005758 2025',
      img: 'img/page_9.png'
    },
    'bnsp-umkm': {
      title: 'Sertifikat Kompetensi: Pengelolaan Usaha Ritel Koperasi dan UMKM',
      issuer: 'BNSP - LSP UMKM',
      reg: 'No. Reg. UKM 1420 25885 2024 | Sertifikat No. 47000 1220 0025885 2024',
      img: 'img/page_10.png'
    },
    'bkti-erp': {
      title: 'Sertifikat Kelulusan: ERP Implementation for Supply Chain Management',
      issuer: 'Badan Keahlian Teknik Industri PII (BKTI-PII) & diklatkerja.com',
      reg: 'No. BKTI-PII-0004001 | Nilai: 93.33 (Sembilan Puluh Tiga Koma Tiga Tiga)',
      img: 'img/page_5.png'
    },
    'bkti-warehouse': {
      title: 'Sertifikat Kelulusan: Operasi Warehousing',
      issuer: 'Badan Kejuruan Teknik Industri PII (BKTI-PII) & diklatkerja.com',
      reg: 'No. BKTI-PII-0025001 | Nilai: 96.67 (Sembilan Puluh Enam Koma Enam Tujuh)',
      img: 'img/page_6.png'
    },
    'wik-internship': {
      title: 'Surat Keterangan Pengalaman Magang Industri SCM',
      issuer: 'PT WIK Far East Batam',
      reg: 'No. WIK/0233/03/2026 | Masa Kerja: 11 Agustus 2025 - 10 April 2026',
      img: 'img/page_7.png'
    },
    'pupr-internship': {
      title: 'Sertifikat Praktek Kerja Lapangan (PKL)',
      issuer: 'BPJN KEPRI Ditjen Bina Marga Kementerian PUPR',
      reg: 'NIS: 3550 | Nilai Rata-Rata: 92 (Sembilan Puluh Dua - Baik Sekali)',
      img: 'img/page_8.png'
    },
    'wmk-polibatam': {
      title: 'Transkrip Nilai Wirausaha Merdeka Polibatam Angkatan III',
      issuer: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi - WMK Polibatam',
      reg: 'NIM: 4132201061 | Nilai: 89.22 (Indeks: A / 20 SKS)',
      img: 'img/page_11.png'
    },
    'polibatam-diploma': {
      title: 'Ijazah Sarjana Terapan Logistik Perdagangan Internasional (S.Tr.Log.)',
      issuer: 'Politeknik Negeri Batam',
      reg: 'No. Ijazah Nasional: 005029633142026100039 | IPK: 3.62 / 4.00 (Cumlaude)',
      img: 'img/page_3.png'
    }
  };

  document.querySelectorAll('[data-cert-id]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const certId = trigger.getAttribute('data-cert-id');
      const data = certData[certId];

      if (data && modal && modalImg && modalTitle) {
        modalImg.src = data.img;
        modalTitle.textContent = data.title;
        if (modalIssuer) modalIssuer.textContent = data.issuer;
        if (modalReg) modalReg.textContent = data.reg;
        if (modalDownload) modalDownload.href = data.img;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = () => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 5. Toast Notification & Copy Details
  const toast = document.getElementById('toastNotice');
  const showToast = (message) => {
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  document.querySelectorAll('[data-copy]').forEach(el => {
    el.addEventListener('click', (e) => {
      const textToCopy = el.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Tersalin ke clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`Gagal menyalin text.`);
        });
      }
    });
  });
});