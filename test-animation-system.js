/**
 * THINGZEYE Animation System Test
 * Validates the advanced animation system functionality
 */

console.log('🧪 Testing THINGZEYE Animation System...');

// Test CSS classes existence
function testCSSClasses() {
    console.log('📋 Testing CSS Classes...');
    
    const requiredClasses = [
        'spring-bounce',
        'spring-wobble',
        'stagger-container',
        'stagger-item',
        'scroll-fade-in',
        'scroll-slide-left',
        'scroll-slide-right',
        'scroll-zoom-in',
        'silver-neon-border',
        'silver-neon-text',
        'rainbow-neon-border',
        'rainbow-neon-text',
        'draggable-item',
        'drag-over',
        'performance-monitor',
        'performance-low',
        'performance-critical'
    ];

    let allClassesExist = true;
    
    requiredClasses.forEach(className => {
        // Create a test element to check if class exists in stylesheet
        const testEl = document.createElement('div');
        testEl.className = className;
        document.body.appendChild(testEl);
        
        const computedStyle = window.getComputedStyle(testEl);
        // If the class has no effect, it might not be defined
        if (computedStyle.display === 'inline' && className !== 'performance-monitor') {
            console.warn(`⚠️  Class "${className}" may not be properly defined`);
            allClassesExist = false;
        }
        
        document.body.removeChild(testEl);
    });

    return allClassesExist;
}

// Test JavaScript functionality
function testJavaScriptAPI() {
    console.log('⚡ Testing JavaScript API...');
    
    const testAPI = {
        'NeonAnimations.springBounce': typeof NeonAnimations?.springBounce === 'function',
        'NeonAnimations.springWobble': typeof NeonAnimations?.springWobble === 'function',
        'NeonAnimations.stagger': typeof NeonAnimations?.stagger === 'function',
        'NeonAnimations.particles': typeof NeonAnimations?.particles === 'function',
        'NeonAnimations.scrollTo': typeof NeonAnimations?.scrollTo === 'function',
        'NeonAnimations.togglePerformanceMonitor': typeof NeonAnimations?.togglePerformanceMonitor === 'function',
        'window.neonAnimationSystem': window.neonAnimationSystem instanceof Object
    };

    let allAPIFunctionsExist = true;
    
    Object.entries(testAPI).forEach(([apiName, exists]) => {
        if (!exists) {
            console.error(`❌ ${apiName} is not available`);
            allAPIFunctionsExist = false;
        } else {
            console.log(`✅ ${apiName} is available`);
        }
    });

    return allAPIFunctionsExist;
}

// Test animation system initialization
function testInitialization() {
    console.log('🚀 Testing System Initialization...');
    
    try {
        if (!window.neonAnimationSystem) {
            throw new Error('Animation system not initialized');
        }

        const system = window.neonAnimationSystem;
        const requiredProperties = [
            'observer',
            'performanceMonitor',
            'animationElements',
            'isMonitoring'
        ];

        let allPropertiesExist = true;
        
        requiredProperties.forEach(prop => {
            if (!(prop in system)) {
                console.error(`❌ System property "${prop}" missing`);
                allPropertiesExist = false;
            } else {
                console.log(`✅ System property "${prop}" exists`);
            }
        });

        return allPropertiesExist;
    } catch (error) {
        console.error('❌ Initialization test failed:', error.message);
        return false;
    }
}

// Test performance monitoring
function testPerformanceMonitoring() {
    console.log('📊 Testing Performance Monitoring...');
    
    try {
        const monitor = document.querySelector('.performance-monitor');
        if (!monitor) {
            console.warn('⚠️  Performance monitor element not found');
            return false;
        }

        const fpsElement = document.getElementById('fps');
        const memoryElement = document.getElementById('memory');
        
        if (!fpsElement || !memoryElement) {
            console.error('❌ Performance monitor elements missing');
            return false;
        }

        console.log('✅ Performance monitor is active');
        return true;
    } catch (error) {
        console.error('❌ Performance monitoring test failed:', error.message);
        return false;
    }
}

// Test particle effects
function testParticleEffects() {
    console.log('✨ Testing Particle Effects...');
    
    try {
        // Test if particle creation function works
        NeonAnimations.particles(100, 100, '#ff0000', 3);
        
        // Check if particles were created
        setTimeout(() => {
            const particles = document.querySelectorAll('.advanced-particle');
            if (particles.length > 0) {
                console.log(`✅ Created ${particles.length} particles`);
                
                // Clean up particles
                particles.forEach(particle => particle.remove());
            } else {
                console.warn('⚠️  No particles created');
            }
        }, 100);

        return true;
    } catch (error) {
        console.error('❌ Particle effects test failed:', error.message);
        return false;
    }
}

// Run all tests
function runAllTests() {
    console.log('🎯 Starting comprehensive animation system tests...\n');
    
    const testResults = {
        cssClasses: testCSSClasses(),
        javascriptAPI: testJavaScriptAPI(),
        initialization: testInitialization(),
        performanceMonitoring: testPerformanceMonitoring(),
        particleEffects: testParticleEffects()
    };

    console.log('\n📈 Test Results:');
    console.log('================');
    
    Object.entries(testResults).forEach(([testName, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${testName}: ${passed ? 'PASSED' : 'FAILED'}`);
    });

    const allPassed = Object.values(testResults).every(result => result);
    
    if (allPassed) {
        console.log('\n🎉 ALL TESTS PASSED! Animation system is working correctly.');
        console.log('\n🚀 Next steps:');
        console.log('1. Open animation-system-demo.html to see all features in action');
        console.log('2. Check browser console for performance monitoring data');
        console.log('3. Test interactive elements and animations');
    } else {
        console.log('\n⚠️  Some tests failed. Please check the implementation.');
    }

    return allPassed;
}

// Export for use in browser console
window.testAnimationSystem = runAllTests;

// Auto-run tests if this is the main module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        testCSSClasses,
        testJavaScriptAPI,
        testInitialization,
        testPerformanceMonitoring,
        testParticleEffects,
        runAllTests
    };
} else {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(runAllTests, 1000);
        });
    } else {
        setTimeout(runAllTests, 1000);
    }
}
