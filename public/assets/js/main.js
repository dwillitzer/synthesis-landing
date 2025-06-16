// Synthesis Landing Page JavaScript
// Professional interactions and animations

class SynthesisApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigationEffects();
        this.setupScrollAnimations();
        this.setupFormHandling();
        this.setupNeuralNetworkAnimation();
        this.setupIntersectionObserver();
        this.setupParticleEffect();
    }

    // Navigation Effects
    setupNavigationEffects() {
        const nav = document.querySelector('.nav');
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Hide/show navigation based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
            
            // Add background blur when scrolled
            if (currentScrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // Scroll Animations
    setupScrollAnimations() {
        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroGrid = document.querySelector('.hero-grid');
            if (heroGrid) {
                heroGrid.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Animate elements on scroll
        const animateOnScroll = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(animateOnScroll, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements for animation
        document.querySelectorAll('.about-card, .tech-card, .research-item').forEach(el => {
            observer.observe(el);
        });
    }

    // Form Handling
    setupFormHandling() {
        const form = document.querySelector('.form');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            try {
                // Simulate form submission (replace with actual endpoint)
                await this.simulateFormSubmission(new FormData(form));
                
                // Success state
                submitBtn.innerHTML = '✓ Message Sent!';
                submitBtn.style.background = 'var(--success)';
                
                // Reset form
                form.reset();
                
                // Show success notification
                this.showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                
            } catch (error) {
                // Error state
                submitBtn.innerHTML = '✗ Error - Try Again';
                submitBtn.style.background = 'var(--danger)';
                
                this.showNotification('Failed to send message. Please try again.', 'error');
            }
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 3000);
        });
    }

    // Neural Network Animation Enhancement
    setupNeuralNetworkAnimation() {
        const nodes = document.querySelectorAll('.node');
        const connections = [];
        
        // Create dynamic connections between nodes
        nodes.forEach((node, index) => {
            nodes.forEach((otherNode, otherIndex) => {
                if (index !== otherIndex && Math.random() > 0.6) {
                    this.createConnection(node, otherNode);
                }
            });
        });

        // Add hover interactions
        nodes.forEach(node => {
            node.addEventListener('mouseenter', () => {
                node.style.transform = 'scale(1.5)';
                node.style.zIndex = '10';
                this.createRippleEffect(node);
            });
            
            node.addEventListener('mouseleave', () => {
                node.style.transform = '';
                node.style.zIndex = '';
            });
        });
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    
                    // Animate based on element type
                    if (target.classList.contains('about-card')) {
                        target.style.animationDelay = `${Array.from(target.parentNode.children).indexOf(target) * 0.2}s`;
                        target.classList.add('slide-up');
                    }
                    
                    if (target.classList.contains('tech-card')) {
                        target.style.animationDelay = `${Array.from(target.parentNode.children).indexOf(target) * 0.3}s`;
                        target.classList.add('fade-in-up');
                    }
                    
                    if (target.classList.contains('research-item')) {
                        target.style.animationDelay = `${Array.from(target.parentNode.children).indexOf(target) * 0.1}s`;
                        target.classList.add('slide-in-left');
                    }
                    
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        document.querySelectorAll('.about-card, .tech-card, .research-item').forEach(el => {
            observer.observe(el);
        });
    }

    // Particle Effect for Hero Section
    setupParticleEffect() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.3';
        hero.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particles = [];
        const particleCount = 50;

        // Resize canvas
        const resizeCanvas = () => {
            canvas.width = hero.offsetWidth;
            canvas.height = hero.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = '#6366f1';
                ctx.fill();
                ctx.restore();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.save();
                        ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = '#6366f1';
                        ctx.stroke();
                        ctx.restore();
                    }
                });
            });

            requestAnimationFrame(animate);
        };
        animate();
    }

    // Utility Methods
    createConnection(node1, node2) {
        const line = document.createElement('div');
        line.className = 'neural-connection';
        line.style.position = 'absolute';
        line.style.height = '2px';
        line.style.background = 'linear-gradient(90deg, var(--primary), transparent)';
        line.style.opacity = '0.3';
        line.style.transformOrigin = 'left center';
        line.style.animation = 'pulse-line 3s ease-in-out infinite';
        
        document.querySelector('.neural-network').appendChild(line);
        
        // Position line between nodes (simplified)
        const rect1 = node1.getBoundingClientRect();
        const rect2 = node2.getBoundingClientRect();
        const angle = Math.atan2(rect2.top - rect1.top, rect2.left - rect1.left);
        const distance = Math.sqrt(Math.pow(rect2.left - rect1.left, 2) + Math.pow(rect2.top - rect1.top, 2));
        
        line.style.left = node1.offsetLeft + 'px';
        line.style.top = node1.offsetTop + 'px';
        line.style.width = distance + 'px';
        line.style.transform = `rotate(${angle}rad)`;
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(99, 102, 241, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        ripple.style.pointerEvents = 'none';
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    async simulateFormSubmission(formData) {
        // Simulate API call delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    resolve({ success: true });
                } else {
                    reject(new Error('Network error'));
                }
            }, 2000);
        });
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: var(--success);' : 'background: var(--danger);'}
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
}

// Add CSS animations
const animationCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse-line {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.5; }
    }
    
    @keyframes slide-up {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fade-in-up {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slide-in-left {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .slide-up {
        animation: slide-up 0.6s ease-out forwards;
    }
    
    .fade-in-up {
        animation: fade-in-up 0.8s ease-out forwards;
    }
    
    .slide-in-left {
        animation: slide-in-left 0.6s ease-out forwards;
    }
    
    .nav.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: var(--shadow-md);
    }
`;

// Inject animations CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = animationCSS;
document.head.appendChild(styleSheet);

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SynthesisApp();
});

// Add smooth scrolling for the entire page
document.documentElement.style.scrollBehavior = 'smooth';

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
    // Any additional scroll handling can go here
}, 16)); // ~60fps