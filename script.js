// script.js
// Portfolio interactivity for Brahmkeshwar Shukla
// Handles: navbar highlight, smooth scroll, product modals, timeline animation, testimonials

document.addEventListener('DOMContentLoaded', () => {
  // Navbar active link on scroll
  const navLinks = document.querySelectorAll('nav a');
  const sections = Array.from(document.querySelectorAll('main section'));
  function onScroll() {
    let scrollPos = window.scrollY + 120;
    let current = sections[0].id;
    for (const section of sections) {
      if (section.offsetTop <= scrollPos) current = section.id;
    }
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Smooth scroll for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Featured Products
  const products = [
    {
      name: 'PromptPilot',
      desc: 'A workflow tool for prompt engineering and LLM evaluation.',
      img: 'https://cdn-icons-png.flaticon.com/512/2721/2721297.png',
      details: 'PromptPilot helps teams design, test, and optimize prompts for AI models with versioning and analytics.'
    },
    {
      name: 'InsightBoard',
      desc: 'AI-powered dashboard for product analytics and insights.',
      img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      details: 'InsightBoard connects to your data sources and uses AI to surface actionable product insights.'
    },
    {
      name: 'AutoDocs',
      desc: 'Automated documentation generator for APIs and workflows.',
      img: 'https://cdn-icons-png.flaticon.com/512/1828/1828919.png',
      details: 'AutoDocs uses AI to generate, update, and maintain technical documentation with minimal effort.'
    },
    {
      name: 'TeamSync AI',
      desc: 'AI assistant for team meetings and action items.',
      img: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
      details: 'TeamSync AI transcribes, summarizes, and tracks meeting outcomes for better team alignment.'
    },
    {
      name: 'VisionFlow',
      desc: 'Visual workflow builder for AI-powered automations.',
      img: 'https://cdn-icons-png.flaticon.com/512/3523/3523887.png',
      details: 'VisionFlow lets you design and deploy AI-driven workflows with a drag-and-drop interface.'
    }
  ];
  const productCards = document.querySelector('.product-cards');
  if (productCards) {
    products.forEach((p, i) => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}" />
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.desc}</div>
      `;
      card.addEventListener('click', () => openProductModal(i));
      productCards.appendChild(card);
    });
  }
  // Product Modal
  let modal;
  function openProductModal(idx) {
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'product-modal';
      modal.innerHTML = `
        <div class="product-modal-content">
          <button class="close-btn" title="Close">&times;</button>
          <img src="" alt="" />
          <div class="product-name"></div>
          <div class="product-desc"></div>
          <div class="product-details"></div>
        </div>
      `;
      document.body.appendChild(modal);
      modal.querySelector('.close-btn').onclick = closeProductModal;
      modal.addEventListener('click', e => { if (e.target === modal) closeProductModal(); });
    }
    const p = products[idx];
    modal.querySelector('img').src = p.img;
    modal.querySelector('img').alt = p.name;
    modal.querySelector('.product-name').textContent = p.name;
    modal.querySelector('.product-desc').textContent = p.desc;
    modal.querySelector('.product-details').textContent = p.details;
    modal.classList.add('active');
  }
  function closeProductModal() {
    if (modal) modal.classList.remove('active');
  }

  // Timeline animation on scroll
  const timelineItems = document.querySelectorAll('.timeline-item');
  function revealTimeline() {
    const trigger = window.innerHeight * 0.85;
    timelineItems.forEach(item => {
      const top = item.getBoundingClientRect().top;
      if (top < trigger) item.classList.add('visible');
    });
  }
  window.addEventListener('scroll', revealTimeline);
  revealTimeline();

  // Inject timeline items
  const timeline = document.querySelector('.timeline');
  if (timeline) {
    const items = [
      {
        title: 'Product Manager, AI Tools',
        date: '2022–Present',
        desc: 'Leading the development of AI-powered productivity tools for enterprise clients.'
      },
      {
        title: 'Product Designer',
        date: '2020–2022',
        desc: 'Designed user-centric SaaS products and collaborated with cross-functional teams.'
      },
      {
        title: 'Software Engineer',
        date: '2018–2020',
        desc: 'Built scalable backend systems and contributed to open-source AI projects.'
      }
    ];
    items.forEach(item => {
      const el = document.createElement('div');
      el.className = 'timeline-item';
      el.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-date">${item.date}</div>
        <div class="timeline-desc">${item.desc}</div>
      `;
      timeline.appendChild(el);
    });
    // Refresh timelineItems NodeList
    setTimeout(() => {
      document.querySelectorAll('.timeline-item').forEach(item => item.classList.remove('visible'));
      revealTimeline();
    }, 100);
  }

  // Testimonials carousel
  const testimonials = [
    {
      quote: 'Brahmkeshwar brings clarity and vision to every project. His AI tools have transformed our workflow.',
      author: 'A. Verma, CTO, TechCorp'
    },
    {
      quote: 'A rare blend of product sense and technical depth. Highly recommended!',
      author: 'S. Patel, Product Lead'
    },
    {
      quote: 'His leadership in AI product development is outstanding.',
      author: 'J. Kim, CEO, InnovateAI'
    }
  ];
  const testimonialCarousel = document.querySelector('.testimonial-carousel');
  if (testimonialCarousel) {
    testimonials.forEach(t => {
      const card = document.createElement('div');
      card.className = 'testimonial-card';
      card.innerHTML = `<blockquote>“${t.quote}”</blockquote><cite>— ${t.author}</cite>`;
      testimonialCarousel.appendChild(card);
    });
  }

  // Contact form (no backend, just UX)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      contactForm.reset();
      alert('Thank you for reaching out!');
    });
  }
});
