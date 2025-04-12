// Create floating hearts
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heartColors = ['#e83e8c', '#ff6b6b', '#f783ac', '#da77f2', '#ffa8a8'];
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.className = 'floating-heart';
        heart.style.position = 'absolute';
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.opacity = Math.random() * 0.7 + 0.3;
        heart.style.animation = `floatHeart ${Math.random() * 10 + 10}s linear infinite`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(heart);
    }
    
    // Add keyframes for floating hearts
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes floatHeart {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Countdown timer
function setupCountdown() {
    // Calculate the start date (1 year and 11 months ago)
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();
    
    // Calculate the start date (approximately 1 year and 11 months ago)
    // If today is April 12, 2025, then the start date would be May 12, 2023
    let startYear = currentYear - 1; // Go back 1 year
    let startMonth = currentMonth - 11; // Go back 11 months
    
    // Adjust if month calculation goes negative
    if (startMonth < 0) {
        startMonth += 12;
        startYear -= 1;
    }
    
    const startDate = new Date(startYear, startMonth, 16); // Use day 16 as the anniversary day
    
    // Calculate the next anniversary date
    const nextAnniversaryDate = new Date(currentYear, startMonth, 16);
    if (nextAnniversaryDate < now) {
        nextAnniversaryDate.setFullYear(currentYear + 1);
    }
    
    // Days until next anniversary
    const daysUntilAnniversary = Math.ceil((nextAnniversaryDate - now) / (1000 * 60 * 60 * 24));
    
    // Add anniversary message if it's coming up soon
    const anniversaryMessage = document.createElement('p');
    anniversaryMessage.className = 'anniversary-message';
    
    if (daysUntilAnniversary <= 7) {
        anniversaryMessage.innerHTML = `<span class="highlight">¡Faltan ${daysUntilAnniversary} días para nuestro aniversario de 2 años!</span>`;
    } else {
        anniversaryMessage.innerHTML = ``;
    }
    
    // Insert after the countdown
    const countdownElement = document.querySelector('.countdown');
    countdownElement.appendChild(anniversaryMessage);
    
    function updateCountdown() {
        const now = new Date();
        const difference = now - startDate;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        // Calculate years, months and remaining days
        let totalMonths = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
        const years = Math.floor(totalMonths / 12);
        const months = totalMonths % 12;
        
        // Display the result
        document.getElementById("days").textContent = days.toString().padStart(2, '0');
        document.getElementById("hours").textContent = hours.toString().padStart(2, '0');
        document.getElementById("minutes").textContent = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").textContent = seconds.toString().padStart(2, '0');
        
        // Update the anniversary label to show years and months
        const anniversaryLabel = document.querySelector('.anniversary-label');
        anniversaryLabel.textContent = `${years} año${years !== 1 ? 's' : ''} y ${months} mes${months !== 1 ? 'es' : ''} juntos`;
    }
    
    // Helper function to get month name
    function getMonthName(monthIndex) {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return months[monthIndex];
    }
    
    // Update the countdown every 1 second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Parallax effect for header
function setupParallax() {
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const header = document.querySelector('header');
        const hero = document.querySelector('.hero');
        
        // Parallax effect for header background
        header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        
        // Opacity effect for hero content
        hero.style.opacity = 1 - (scrollPosition * 0.002);
    });
}

// Music player
function setupMusicPlayer() {
    const playButton = document.getElementById('play-music');
    const audio = document.getElementById('love-song');
    
    playButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            playButton.textContent = '♫ Pausar Nuestra Canción';
        } else {
            audio.pause();
            playButton.textContent = '♫ Reproducir Nuestra Canción';
        }
    });
}

// Scroll animation for elements
function setupScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.classList.add('scroll-animation');
        observer.observe(section);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.innerHTML = `
        .scroll-animation {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .scroll-animation.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    setupCountdown();
    setupParallax();
    setupMusicPlayer();
    setupScrollAnimations();
});