document.addEventListener('DOMContentLoaded', () => {
    // --- ЕФЕКТ ДРУКУ (БЕЗ КУРСОРА) ---
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const textToType = "NPC\nзапам’ятає тебе назавжди?";
        let i = 0;

        // Ми прибрали додавання border-right (курсора) тут

        const type = () => {
            if (i < textToType.length) {
                const char = textToType.charAt(i);
                if (char === '\n') {
                    typingElement.innerHTML += '<br>';
                } else {
                    typingElement.innerHTML += char;
                }
                i++;
                setTimeout(type, 80); // Швидкість друку
            }
            // Блок else для прибирання курсора теж більше не потрібен
        };
        
        // Запускаємо через 1 секунду
        setTimeout(type, 1000);
    }

    // --- АКТИВАЦІЯ ПРИ СКРОЛІ (HIGHLIGHT) ---
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observerOptions = {
        root: null,
        rootMargin: "-25% 0px -25% 0px", 
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // --- ЗБЕРЕЖЕННЯ ІМЕНІ ---
    const input = document.getElementById('author');
    if (input) {
        input.value = localStorage.getItem('authorName') || '';
        if(input.value) input.classList.add('glow');
        
        input.addEventListener('input', () => {
            localStorage.setItem('authorName', input.value);
            input.classList.toggle('glow', input.value.trim() !== '');
        });
    }
});