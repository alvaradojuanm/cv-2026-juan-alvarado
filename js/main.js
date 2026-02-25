// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme or prefer-color-scheme
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply theme
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

// Toggle theme
themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeIcon.setAttribute('aria-label', 'Switch to light theme');
    } else {
        themeIcon.className = 'fas fa-moon';
        themeIcon.setAttribute('aria-label', 'Switch to dark theme');
    }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== FORM HANDLING =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simple validation
        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all fields');
            return;
        }
        
        // In a real implementation, you would send this to a server
        // For now, just show a success message
        alert('Thank you for your message! I\'ll get back to you soon.');
        this.reset();
    });
}

// ===== ANIMATIONS ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .expertise-card, .project-card, .stack-category').forEach(el => {
    observer.observe(el);
});

// ===== GITHUB REPOS COUNT =====
// This would be replaced with actual GitHub API call in production
async function updateGitHubStats() {
    try {
        // In production, you would fetch from GitHub API
        // const response = await fetch('https://api.github.com/users/alvaradojuanm');
        // const data = await response.json();
        // document.getElementById('repo-count').textContent = data.public_repos + '+';
        
        // For now, using static data
        document.getElementById('repo-count').textContent = '50+';
    } catch (error) {
        console.log('GitHub API not available, using static data');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateGitHubStats();
    
    // Add animation delays
    document.querySelectorAll('.about-card, .expertise-card, .project-card').forEach((card, index) => {
        card.classList.add(`delay-${(index % 5) + 1}`);
    });
});

// ===== NAVBAR SCROLL EFFECT =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// ===== COPYRIGHT YEAR =====
const yearElement = document.querySelector('.footer-copyright');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.innerHTML = yearElement.innerHTML.replace('2026', currentYear);
}
