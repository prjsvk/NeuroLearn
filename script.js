// Accessibility Panel Toggle
const accessibilityNavToggle = document.getElementById('accessibilityNavToggle');
const accessibilityPanel = document.getElementById('accessibilityPanel');
const closeAccessibility = document.getElementById('closeAccessibility');

// Toggle panel visibility
function toggleAccessibilityPanel() {
    const isExpanded = accessibilityNavToggle.getAttribute('aria-expanded') === 'true';
    accessibilityNavToggle.setAttribute('aria-expanded', !isExpanded);
    accessibilityPanel.setAttribute('aria-hidden', isExpanded);
    accessibilityPanel.classList.toggle('visible');
    
    // Move focus to panel when opening
    if (!isExpanded) {
        setTimeout(() => {
            closeAccessibility.focus();
        }, 100);
    }
}

accessibilityNavToggle.addEventListener('click', toggleAccessibilityPanel);

// Close panel when clicking the close button
closeAccessibility.addEventListener('click', (e) => {
    e.preventDefault();
    accessibilityNavToggle.setAttribute('aria-expanded', 'false');
    accessibilityPanel.setAttribute('aria-hidden', 'true');
    accessibilityPanel.classList.remove('visible');
    accessibilityNavToggle.focus();
});

// Close panel with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && accessibilityPanel.classList.contains('visible')) {
        accessibilityNavToggle.setAttribute('aria-expanded', 'false');
        accessibilityPanel.setAttribute('aria-hidden', 'true');
        accessibilityPanel.classList.remove('visible');
        accessibilityNavToggle.focus();
    }
});

// Font Size Adjustment
const increaseFont = document.getElementById('increaseFont');
const decreaseFont = document.getElementById('decreaseFont');

increaseFont.addEventListener('click', () => {
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = `${currentSize * 1.1}px`;
});

decreaseFont.addEventListener('click', () => {
    const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
    document.body.style.fontSize = `${currentSize / 1.1}px`;
});

// High Contrast Mode
const highContrast = document.getElementById('highContrast');
highContrast.addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// Dyslexia Mode
const dyslexiaMode = document.getElementById('dyslexiaMode');
dyslexiaMode.addEventListener('click', () => {
    document.body.classList.toggle('dyslexia-mode');
});

// Grayscale Mode
const grayscale = document.getElementById('grayscale');
grayscale.addEventListener('click', () => {
    document.body.classList.toggle('grayscale');
});

// Reset Accessibility
const resetAccessibility = document.getElementById('resetAccessibility');
resetAccessibility.addEventListener('click', () => {
    document.body.className = '';
    document.body.style.fontSize = '';
});

// Speech Controls
const readPage = document.getElementById('readPage');
const stopSpeech = document.getElementById('stopSpeech');
const showDisabilityOptions = document.getElementById('showDisabilityOptions');
const disabilityOptions = document.getElementById('disabilityOptions');

showDisabilityOptions.addEventListener('click', () => {
    disabilityOptions.classList.toggle('visible');
});

// Disability-Specific Assistants Tabs
const tabs = document.querySelectorAll('.assistant-tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and content
        document.querySelectorAll('.assistant-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.assistant-content').forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(`${tabId}-content`).classList.add('active');
    });
});

// Initialize particles.js
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        }
    }
});

// Disability-Specific Modes
const visualImpairment = document.getElementById('visualImpairment');
const hearingImpairment = document.getElementById('hearingImpairment');
const motorDisability = document.getElementById('motorDisability');
const cognitiveDisability = document.getElementById('cognitiveDisability');
const seizureSafe = document.getElementById('seizureSafe');

// Visual Impairment Mode
visualImpairment.addEventListener('change', function() {
    if(this.checked) {
        document.body.classList.add('high-contrast');
        document.body.style.fontSize = '18px';
    } else {
        document.body.classList.remove('high-contrast');
        document.body.style.fontSize = '';
    }
});

// Hearing Impairment Mode
hearingImpairment.addEventListener('change', function() {
    // This would trigger visual alternatives for audio content
    if(this.checked) {
        document.body.classList.add('hearing-impairment');
    } else {
        document.body.classList.remove('hearing-impairment');
    }
});

// Motor Disability Mode
motorDisability.addEventListener('change', function() {
    // This would enlarge click targets and ensure keyboard navigation
    if(this.checked) {
        document.body.classList.add('motor-disability');
        const buttons = document.querySelectorAll('button, a');
        buttons.forEach(btn => {
            btn.style.padding = '12px 24px';
            btn.style.minWidth = '48px';
            btn.style.minHeight = '48px';
        });
    } else {
        document.body.classList.remove('motor-disability');
        const buttons = document.querySelectorAll('button, a');
        buttons.forEach(btn => {
            btn.style.padding = '';
            btn.style.minWidth = '';
            btn.style.minHeight = '';
        });
    }
});

// Cognitive Disability Mode
cognitiveDisability.addEventListener('change', function() {
    // This would simplify the interface
    if(this.checked) {
        document.body.classList.add('cognitive-disability');
        document.querySelectorAll('p, li, span').forEach(el => {
            el.style.lineHeight = '1.8';
        });
    } else {
        document.body.classList.remove('cognitive-disability');
        document.querySelectorAll('p, li, span').forEach(el => {
            el.style.lineHeight = '';
        });
    }
});

// Seizure Safe Mode
seizureSafe.addEventListener('change', function() {
    if(this.checked) {
        document.body.classList.add('seizure-safe');
        // Stop any animations
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
        // Stop particles animation
        if(window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.pause();
        }
    } else {
        document.body.classList.remove('seizure-safe');
        // Re-enable reduced motion preferences
        if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.querySelectorAll('.floating').forEach(el => {
                el.style.animation = 'float 6s ease-in-out infinite';
            });
        }
        // Restart particles if they exist
        if(window.pJSDom && window.pJSDom.length > 0) {
            window.pJSDom[0].pJS.fn.play();
        }
    }
});

// Simple text-to-speech functionality
let speechSynthesis = window.speechSynthesis;

readPage.addEventListener('click', () => {
    if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
    }
    
    const speechOption = document.querySelector('input[name="speechOption"]:checked').value;
    let textToRead = '';
    
    if (speechOption === 'all') {
        textToRead = document.body.innerText;
    } else if (speechOption === 'main') {
        textToRead = document.querySelector('main').innerText;
    } else if (speechOption === 'section') {
        // This would need more sophisticated section detection in a real implementation
        textToRead = document.querySelector('section:not([class="accessibility-features"])').innerText;
    }
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    speechSynthesis.speak(utterance);
});

stopSpeech.addEventListener('click', () => {
    speechSynthesis.cancel();
});