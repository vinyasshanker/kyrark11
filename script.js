// Scroll animation
const fadeElements = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    });
}, appearOptions);

fadeElements.forEach(element => {
    appearOnScroll.observe(element);
});

// Stats counter animation
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        
        const inc = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    
    const startCounter = () => {
        const counterPosition = counter.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (counterPosition < screenPosition) {
            updateCount();
        }
    };
    
    window.addEventListener('scroll', startCounter);
    startCounter();
});
// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});
  const baseText = "We ";
  const words = [
    { text: "stop threats 🛡️", color: "crimson" },
    { text: "protect data 🔐", color: "seagreen" },
    { text: "fight breaches ⚔️", color: "royalblue" }
  ];
    
  const typingElement = document.getElementById("typing");
    
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;
    
  function typeLoop() {
    const current = words[wordIndex];
    const fullText = baseText + current.text;
    
    const typed = fullText.substring(0, baseText.length + charIndex);
    const base = typed.substring(0, baseText.length);
    const dynamic = typed.substring(baseText.length);
    
    typingElement.innerHTML = base + `<span style="color: ${current.color}">${dynamic}</span>`;
    
    if (!deleting) {
      charIndex++;
      if (charIndex > current.text.length) {
        deleting = true;
        setTimeout(typeLoop, 1000); // Pause before deleting
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeLoop, deleting ? 50 : 100);
  }
  typeLoop();
  