document.addEventListener('DOMContentLoaded', () => {
    // Scroll to the top of the page on load
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const nameElement = document.getElementById('name');
    const descriptionElement = document.getElementById('description');
    const socialIcons = document.querySelector('.social-icons');
    const scrollArrow = document.querySelector('.scroll-arrow');

    // Set initial hidden state
    nameElement.classList.add('hidden');
    descriptionElement.classList.add('hidden');
    socialIcons.classList.add('hidden');
    scrollArrow.classList.add('hidden');

    // Add slide-in class after a delay to trigger the animation
    setTimeout(() => {
        nameElement.classList.add('slide-in');
        nameElement.classList.remove('hidden');
    }, 500);

    setTimeout(() => {
        descriptionElement.classList.add('slide-in');
        descriptionElement.classList.remove('hidden');
    }, 1500);

    setTimeout(() => {
        socialIcons.classList.add('slide-in');
        socialIcons.classList.remove('hidden');
    }, 2500);

    // Gravity/ball drop effect for scroll arrow
    scrollArrow.style.position = 'relative';
    scrollArrow.style.top = '-150px';
    scrollArrow.style.opacity = '0';
    setTimeout(() => {
        scrollArrow.style.transition = 'top 0.5s ease-out, opacity 0.5s ease-in';
        scrollArrow.style.top = '0';
        scrollArrow.style.opacity = '1';
    }, 3500);

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

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const projectCards = document.querySelectorAll('.project');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const project = card.getAttribute('data-project');
            const modal = document.getElementById(`${project}-modal`);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    modals.forEach(modal => {
        const closeBtn = modal.querySelector('.close');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
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
