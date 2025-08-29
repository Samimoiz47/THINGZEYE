// Loading Animation Manager
class LoadingManager {
    constructor() {
        this.loadingShown = false;
    }

    showLoading() {
        if (this.loadingShown) return;
        
        this.loadingShown = true;
        
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.5s ease;
        `;
        
        // Create iframe for loading animation
        const iframe = document.createElement('iframe');
        iframe.src = '/loading-animation.html';
        iframe.style.cssText = `
            width: 100%;
            height: 100%;
            border: none;
            background: #000;
        `;
        
        overlay.appendChild(iframe);
        document.body.appendChild(overlay);
        
        // Fade in
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 100);
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.remove();
                this.loadingShown = false;
            }, 500);
        }
    }
}

// Global instance
window.loadingManager = new LoadingManager();

// Usage example:
// loadingManager.showLoading();
// setTimeout(() => loadingManager.hideLoading(), 6000);
