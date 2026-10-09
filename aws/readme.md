# Fajar Sahuri — Portfolio

Portofolio personal modern untuk **Fajar Sahuri**, Full Stack AI Engineer.
Dibangun dengan HTML + CSS murni dan JavaScript vanilla — ringan, responsif, dan siap production.

## ✨ Fitur (tahap saat ini)

- Dark modern developer theme dengan animated gradient background
- Navbar fixed dengan smooth-scroll, scroll-spy, dan menu mobile
- Hero section: badge "available", typewriter effect, floating UI chips, glowing photo placeholder, CTA
- About section: bio profesional, highlight pengalaman, animated statistics cards
- Glassmorphism cards, hover animations, soft glowing accents
- Fully responsive: mobile, tablet, desktop
- Menghormati `prefers-reduced-motion`

- Skills section: 4 kategori (Frontend, Backend, Database, AI & Cloud) dalam glass cards dengan progress bar ter-animasi, shine effect, dan hover glow
- Projects section: 3 interactive card dengan placeholder visual, tech tags, dan overlay link GitHub + Live Demo saat hover
- Work Experience section: timeline vertikal dengan 3 peran profesional
- Testimonials section: 3 interactive card dengan avatar inisial dan hover lift
- Contact section: form (nama, email, pesan) dengan validasi real-time, state success/error, info kontak, dan placeholder peta
- Footer: copyright (tahun otomatis), link navigasi, link media sosial, dan tombol back-to-top dengan smooth scroll

**Website lengkap dan siap production.**

## 📁 Struktur folder

```
.
├── index.html
├── readme.md
├── assets/              # gambar, resume, dsb.
├── css/
│   ├── base.css         # design tokens, reset, layout, animated bg
│   └── components/
│       ├── navbar.css
│       ├── hero.css
│       ├── about.css
│       ├── skills.css
│       ├── projects.css
│       ├── experience.css
│       ├── testimonials.css
│       ├── contact.css
│       └── footer.css
├── js/
│   └── main.js          # navbar, typewriter, reveal, counters, form, back-to-top
├── components/          # (reserved) potongan markup reusable
└── pages/               # (reserved) halaman tambahan
```

## 🚀 Menjalankan

Buka `index.html` langsung di browser, atau jalankan server statis:

```bash
python3 -m http.server 8000
# lalu buka http://localhost:8000
```

## 🎨 Kustomisasi

- Warna & token desain: `css/base.css` pada `:root`
- Teks typewriter: array `words` di `js/main.js`
- Foto profil: ganti placeholder `.hero__photo` di `index.html` dengan `<img>`
- Resume: letakkan file di `assets/resume.pdf`

## 🛠 Tech stack

HTML5 · CSS3 (custom properties, grid, backdrop-filter) · Vanilla JavaScript (IntersectionObserver)
