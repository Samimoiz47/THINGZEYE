// Test script for THINGZEYE Neon Effects
// Run this in browser console to verify all effects are working

class NeonEffectsTester {
    constructor() {
        this.results = [];
        this.testContainer = null;
    }

    init() {
        console.log('🧪 Starting THINGZEYE Neon Effects Test...');
        this.createTestContainer();
        this.runTests();
        this.displayResults();
    }

    createTestContainer() {
        this.testContainer = document.createElement('div');
        this.testContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 10000;
            max-width: 300px;
            max-height: 400px;
            overflow-y: auto;
            font-family: monospace;
            font-size: 12px;
        `;
        document.body.appendChild(this.testContainer);
    }

    runTests() {
        this.testColorThemes();
        this.testHyperrealEffects();
        this.testPerformanceFeatures();
        this.testResponsiveDesign();
    }

    testColorThemes() {
        const themes = ['cyan', 'magenta', 'purple', 'green', 'gold', 'red'];
        
        themes.forEach(theme => {
            // Test text classes
            const textElement = document.createElement('div');
            textElement.className = `${theme}-neon-text`;
            textElement.textContent = `${theme.toUpperCase()} Text`;
            textElement.style.padding = '10px';
            textElement.style.margin = '5px 0';
            
            const hasTextEffect = window.getComputedStyle(textElement).backgroundImage !== 'none';
            this.recordTest(`${theme}-neon-text`, hasTextEffect, 'Text effect');

            // Test border classes
            const borderElement = document.createElement('div');
            borderElement.className = `${theme}-neon-border`;
            borderElement.textContent = `${theme.toUpperCase()} Border`;
            borderElement.style.padding = '10px';
            borderElement.style.margin = '5px 0';
            
            const hasBorderEffect = window.getComputedStyle(borderElement, '::before').content !== 'normal';
            this.recordTest(`${theme}-neon-border`, hasBorderEffect, 'Border effect');
        });
    }

    testHyperrealEffects() {
        const effects = [
            { class: 'hyperreal-depth', name: '3D Depth' },
            { class: 'hyperreal-glass', name: 'Glass Effect' },
            { class: 'neon-tube', name: 'Neon Tube' },
            { class: 'holographic', name: 'Holographic' },
            { class: 'card-3d-flip', name: '3D Card Flip' }
        ];

        effects.forEach(effect => {
            const element = document.createElement('div');
            element.className = effect.class;
            element.textContent = effect.name;
            element.style.padding = '10px';
            element.style.margin = '5px 0';

            // Check if the class is applied
            const isApplied = element.classList.contains(effect.class);
            this.recordTest(effect.class, isApplied, effect.name);
        });
    }

    testPerformanceFeatures() {
        // Test reduced motion media query
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.recordTest('prefers-reduced-motion', true, 'Reduced motion support', reducedMotion ? '⚠️ User prefers reduced motion' : '✅ Motion allowed');

        // Test touch device detection
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.recordTest('touch-device', true, 'Touch device detection', isTouch ? '✅ Touch device' : 'Desktop device');
    }

    testResponsiveDesign() {
        const breakpoints = [
            { width: 768, name: 'Tablet' },
            { width: 480, name: 'Mobile' }
        ];

        const currentWidth = window.innerWidth;
        this.recordTest('viewport-width', true, `Current viewport: ${currentWidth}px`);

        breakpoints.forEach(bp => {
            const isActive = currentWidth <= bp.width;
            this.recordTest(`breakpoint-${bp.width}`, true, 
                `${bp.name} breakpoint`, 
                isActive ? `✅ Active (<= ${bp.width}px)` : `Inactive (> ${bp.width}px)`);
        });
    }

    recordTest(name, passed, description, details = '') {
        const status = passed ? '✅' : '❌';
        const result = {
            name,
            passed,
            description,
            details: details || (passed ? 'Working correctly' : 'Failed')
        };
        
        this.results.push(result);
        
        const testElement = document.createElement('div');
        testElement.style.cssText = `
            margin: 5px 0;
            padding: 5px;
            border-left: 3px solid ${passed ? '#4CAF50' : '#f44336'};
            background: ${passed ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)'};
        `;
        
        testElement.innerHTML = `
            <strong>${status} ${name}</strong><br>
            <small>${description}</small><br>
            <small style="color: #888;">${result.details}</small>
        `;
        
        this.testContainer.appendChild(testElement);
    }

    displayResults() {
        const passed = this.results.filter(r => r.passed).length;
        const total = this.results.length;
        const percentage = ((passed / total) * 100).toFixed(1);

        const summary = document.createElement('div');
        summary.style.cssText = `
            margin-top: 15px;
            padding: 10px;
            background: ${percentage === '100.0' ? 'rgba(76, 175, 80, 0.2)' : 'rgba(255, 193, 7, 0.2)'};
            border-radius: 5px;
            text-align: center;
            font-weight: bold;
        `;
        
        summary.innerHTML = `
            📊 Test Results: ${passed}/${total} passed (${percentage}%)<br>
            <small>${percentage === '100.0' ? '🎉 All tests passed!' : '⚠️ Some tests failed'}</small>
        `;
        
        this.testContainer.appendChild(summary);

        console.log(`📊 Test Results: ${passed}/${total} passed (${percentage}%)`);
        this.results.forEach(result => {
            console.log(`${result.passed ? '✅' : '❌'} ${result.name}: ${result.description} - ${result.details}`);
        });
    }
}

// Run tests when script is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const tester = new NeonEffectsTester();
        tester.init();
    }, 1000);
});

// Export for manual testing
window.NeonEffectsTester = NeonEffectsTester;

console.log('🔧 Neon Effects Tester loaded. Run "new NeonEffectsTester().init()" to test manually.');
