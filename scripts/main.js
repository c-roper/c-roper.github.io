// Form handling functionality
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        var formData = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('Thank you for your message!');
                this.reset();
            } else {
                alert('Oops! There was a problem with your submission. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Oops! There was a problem with your submission. Please try again.');
        });
    });

    // Particle.js initialization
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 100,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'bounce',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'repulse'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1
                    }
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3
                },
                repulse: {
                    distance: 200,
                    duration: 0.4
                },
                push: {
                    particles_nb: 4
                },
                remove: {
                    particles_nb: 2
                }
            }
        },
        retina_detect: true
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.querySelectorAll('.scroll-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Wiggle effect and tooltip for logos
    document.querySelectorAll('.social-icon, #tech-logos img').forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.animation = 'wiggle 0.5s infinite';
        });

        icon.addEventListener('mouseleave', () => {
            icon.style.animation = 'none';
        });

        icon.addEventListener('mouseover', () => {
            const title = icon.getAttribute('title');
            if (title) {
                const tooltip = document.createElement('span');
                tooltip.className = 'tooltip';
                tooltip.innerText = title;
                document.body.appendChild(tooltip);

                const rect = icon.getBoundingClientRect();
                tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;

                icon._tooltip = tooltip;
            }
        });

        icon.addEventListener('mouseout', () => {
            if (icon._tooltip) {
                document.body.removeChild(icon._tooltip);
                icon._tooltip = null;
            }
        });
    });

    // Fade-in animations
    const nameElement = document.getElementById('name');
    const descriptionElement = document.getElementById('description');
    const socialIcons = document.querySelector('.social-icons');

    setTimeout(() => {
        nameElement.classList.add('fade-in');
    }, 500);

    setTimeout(() => {
        descriptionElement.classList.add('fade-in');
    }, 1500);

    setTimeout(() => {
        socialIcons.classList.add('fade-in');
    }, 2500);
});

// CSS keyframes for wiggle effect
const style = document.createElement('style');
style.innerHTML = `
@keyframes wiggle {
    0%, 100% { transform: rotate(-5deg); }
    50% { transform: rotate(5deg); }
}
.tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    border-radius: 5px;
    padding: 5px;
    font-size: 0.9em;
    z-index: 10;
    white-space: nowrap;
}
.fade-in {
    opacity: 0;
    animation: fadeIn ease 1.5s;
    animation-fill-mode: forwards;
}

@keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
}
`;
document.head.appendChild(style);
