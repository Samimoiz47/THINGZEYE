/**
 * THINGZEYE Advanced Animation System
 * Handles scroll-triggered animations, staggered reveals, and performance monitoring
 */

class NeonAnimationSystem {
    constructor() {
        this.observer = null;
        this.performanceMonitor = null;
        this.isMonitoring = false;
        this.animationElements = new Set();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupPerformanceMonitor();
        this.setupEventListeners();
        this.initializeStaggeredAnimations();
        this.startPerformanceMonitoring();
        this.enhanceDragAndDrop();
    }

    /**
     * Setup Intersection Observer for scroll-triggered animations
     */
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleElementInView(entry.target);
                }
            });
        }, options);

        // Observe all scroll-triggered elements
        document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-zoom-in')
            .forEach(el => this.observer.observe(el));
    }

    /**
     * Handle elements coming into view
     */
    handleElementInView(element) {
        element.classList.add('visible');
        this.animationElements.add(element);

        // Remove observer after animation completes
        setTimeout(() => {
            this.observer.unobserve(element);
        }, 1000);
    }

    /**
     * Initialize staggered animations
     */
    initializeStaggeredAnimations() {
        const staggerContainers = document.querySelectorAll('.stagger-container');
        
        staggerContainers.forEach(container => {
            this.observer.observe(container);
            
            container.addEventListener('animationend', () => {
                // Add individual stagger items to animation tracking
                container.querySelectorAll('.stagger-item').forEach(item => {
                    this.animationElements.add(item);
                });
            });
        });
    }

    /**
     * Setup performance monitoring
     */
    setupPerformanceMonitor() {
        this.performanceMonitor = document.createElement('div');
        this.performanceMonitor.className = 'performance-monitor';
        this.performanceMonitor.innerHTML = `
            <div class="fps-counter">FPS: <span id="fps">0</span></div>
            <div class="memory-usage">Memory: <span id="memory">0 MB</span></div>
        `;
        document.body.appendChild(this.performanceMonitor);
    }

    /**
     * Start performance monitoring
     */
    startPerformanceMonitoring() {
        if (this.isMonitoring) return;

        this.isMonitoring = true;
        let frameCount = 0;
        let lastTime = performance.now();
        let fps = 0;

        const updatePerformance = () => {
            if (!this.isMonitoring) return;

            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                frameCount = 0;
                lastTime = currentTime;

                this.updatePerformanceDisplay(fps);
                this.adjustPerformanceBasedOnFPS(fps);
            }

            requestAnimationFrame(updatePerformance);
        };

        requestAnimationFrame(updatePerformance);
    }

    /**
     * Update performance display
     */
    updatePerformanceDisplay(fps) {
        const fpsElement = document.getElementById('fps');
        const memoryElement = document.getElementById('memory');
        
        if (fpsElement) fpsElement.textContent = fps;
        
        // Memory usage (approximate)
        if (performance.memory) {
            const memoryMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
            if (memoryElement) memoryElement.textContent = `${memoryMB} MB`;
        }
    }

    /**
     * Adjust performance based on FPS
     */
    adjustPerformanceBasedOnFPS(fps) {
        const body = document.body;
        
        // Remove previous performance classes
        body.classList.remove('performance-low', 'performance-critical');
        
        if (fps < 30) {
            body.classList.add('performance-critical');
        } else if (fps < 45) {
            body.classList.add('performance-low');
        }
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Window resize handler
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Scroll handler for parallax effects
        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));

        // Mouse move for interactive elements
        document.addEventListener('mousemove', this.throttle((e) => {
            this.handleMouseMove(e);
        }, 32));
    }

    /**
     * Handle window resize
     */
    handleResize() {
        // Re-initialize observers if needed
        this.observer.disconnect();
        this.setupIntersectionObserver();
        this.initializeStaggeredAnimations();
    }

    /**
     * Handle scroll for parallax effects
     */
    handleScroll() {
        const scrollY = window.scrollY;
        const parallaxElements = document.querySelectorAll('.parallax-layer');
        
        parallaxElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed') || 0.5);
            const yPos = -(scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    /**
     * Handle mouse move for interactive effects
     */
    handleMouseMove(e) {
        const interactiveElements = document.querySelectorAll('.neon-hover, .draggable-item');
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        interactiveElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distanceX = mouseX - centerX;
            const distanceY = mouseY - centerY;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            // Add subtle hover effects based on mouse position
            if (distance < 200) {
                const intensity = 1 - (distance / 200);
                element.style.setProperty('--hover-intensity', intensity);
            }
        });
    }

    /**
     * Enhance drag-and-drop experience with neon effects
     */
    enhanceDragAndDrop() {
        const dropAreas = document.querySelectorAll('.drag-and-drop-area');
        
        dropAreas.forEach(area => {
            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                this.handleDragOver(area);
            });
            
            area.addEventListener('dragleave', (e) => {
                this.handleDragLeave(area);
            });
            
            area.addEventListener('drop', (e) => {
                e.preventDefault();
                this.handleDrop(area);
            });
        });
    }

    /**
     * Handle drag over for drop areas
     */
    handleDragOver(element) {
        element.classList.add('drag-over');
        this.createParticleEffect(
            element.getBoundingClientRect().left + element.offsetWidth / 2,
            element.getBoundingClientRect().top + element.offsetHeight / 2,
            '#00ffff',
            3
        );
    }

    /**
     * Handle drag leave for drop areas
     */
    handleDragLeave(element) {
        element.classList.remove('drag-over');
    }

    /**
     * Handle drop for drop areas
     */
    handleDrop(element) {
        element.classList.remove('drag-over');
        this.createParticleEffect(
            element.getBoundingClientRect().left + element.offsetWidth / 2,
            element.getBoundingClientRect().top + element.offsetHeight / 2,
            '#ff00ff',
            8
        );
        
        // Add success animation
        element.classList.add('drop-success');
        setTimeout(() => {
            element.classList.remove('drop-success');
        }, 1000);
    }

    /**
     * Add spring animation to element
     */
    addSpringAnimation(element, type = 'bounce') {
        element.classList.add(`spring-${type}`);
        
        element.addEventListener('animationend', () => {
            element.classList.remove(`spring-${type}`);
        }, { once: true });
    }

    /**
     * Trigger staggered animation sequence
     */
    triggerStaggerAnimation(container) {
        if (!container.classList.contains('stagger-container')) {
            container.classList.add('stagger-container');
        }
        
        container.classList.add('animate');
    }

    /**
     * Create particle effect at coordinates
     */
    createParticleEffect(x, y, color = '#00ffff', count = 5) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'advanced-particle';
            particle.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: ${color};
                --drift-x: ${Math.random() * 2 - 1};
            `;
            
            document.body.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 4000);
        }
    }

    /**
     * Debounce function
     */
    debounce(func, wait) {
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

    /**
     * Throttle function
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Cleanup method
     */
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.isMonitoring = false;
        
        if (this.performanceMonitor && this.performanceMonitor.parentNode) {
            this.performanceMonitor.parentNode.removeChild(this.performanceMonitor);
        }
        
        // Clean up animation elements
        this.animationElements.clear();
    }

    /**
     * Add hyperrealistic particle effects to buttons
     */
    addHyperrealisticParticleEffect(element) {
        const x = element.getBoundingClientRect().left + element.offsetWidth / 2;
        const y = element.getBoundingClientRect().top + element.offsetHeight / 2;
        this.createParticleEffect(x, y, '#ff00ff', 10); // Example color and count
    }

    /**
     * Trigger animations on hover
     */
    enhanceHoverEffects() {
        const hoverElements = document.querySelectorAll('.neon-hover');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.addHyperrealisticParticleEffect(element);
                this.addSpringAnimation(element, 'bounce');
            });
        });
    }
}

// Initialize animation system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.neonAnimationSystem = new NeonAnimationSystem();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NeonAnimationSystem;
}

/**
 * Utility functions for external use
 */
window.NeonAnimations = {
    // Spring animations
    springBounce: (element) => {
        if (window.neonAnimationSystem) {
            window.neonAnimationSystem.addSpringAnimation(element, 'bounce');
        }
    },
    
    springWobble: (element) => {
        if (window.neonAnimationSystem) {
            window.neonAnimationSystem.addSpringAnimation(element, 'wobble');
        }
    },
    
    // Stagger animations
    stagger: (container) => {
        if (window.neonAnimationSystem) {
            window.neonAnimationSystem.triggerStaggerAnimation(container);
        }
    },
    
    // Particle effects
    particles: (x, y, color, count) => {
        if (window.neonAnimationSystem) {
            window.neonAnimationSystem.createParticleEffect(x, y, color, count);
        }
    },
    
    // Scroll to element with animation
    scrollTo: (element, offset = 0) => {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Toggle animation system
    togglePerformanceMonitor: (show) => {
        if (window.neonAnimationSystem && window.neonAnimationSystem.performanceMonitor) {
            window.neonAnimationSystem.performanceMonitor.style.display = show ? 'block' : 'none';
        }
    }
};

// Auto-initialize if script is loaded after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.neonAnimationSystem = new NeonAnimationSystem();
    });
} else {
    window.neonAnimationSystem = new NeonAnimationSystem();
}
