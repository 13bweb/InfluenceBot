document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20 - 10;
        const y = (e.clientY / window.innerHeight) * 20 - 10;
        hero.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });

    // Scroll-triggered animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply fade-in to sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-init');
        fadeInObserver.observe(section);
    });

    // Webhook URL encoded in base64 to prevent spam
    const WEBHOOK_URL = atob('aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTMyMDQyNDc2MjcyNzcyNzE5Ni9ROXhWT2daTksxQkh2Mm83NDNtVWpFVlM1UUlZMGhpWFZjWTdsczQwbEhlbmM2cGZzWGJzdnM0SmhubXdQRGROeFBBMQ==');

    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate required fields
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('invalid');
                isValid = false;
            } else {
                field.classList.remove('invalid');
            }
        });
        
        if (!isValid) {
            return;
        }
        
        // Get form data
        const formData = {
            nom: form.querySelector('#name').value,
            email: form.querySelector('#email').value,
            entreprise: form.querySelector('#company').value || 'Non spécifié',
            telephone: form.querySelector('#phone').value || 'Non spécifié',
            ia_choisie: form.querySelector('#service').value,
            budget: form.querySelector('#budget').value || 'Non spécifié',
            projet: form.querySelector('#message').value
        };
        
        // Create Discord message embed
        const embed = {
            title: '🤖 Nouvelle Demande de Projet IA',
            color: 0xD4AF37, // Gold color
            fields: [
                {
                    name: '👤 Nom',
                    value: formData.nom,
                    inline: true
                },
                {
                    name: '📧 Email',
                    value: formData.email,
                    inline: true
                },
                {
                    name: '🏢 Entreprise',
                    value: formData.entreprise,
                    inline: true
                },
                {
                    name: '📱 Téléphone',
                    value: formData.telephone,
                    inline: true
                },
                {
                    name: '🤖 IA Choisie',
                    value: formData.ia_choisie,
                    inline: true
                },
                {
                    name: '💰 Budget',
                    value: formData.budget,
                    inline: true
                },
                {
                    name: '📝 Description du Projet',
                    value: formData.projet
                }
            ],
            timestamp: new Date().toISOString()
        };
        
        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    embeds: [embed]
                })
            });
            
            if (response.ok) {
                // Show success message
                form.reset();
                alert('Votre message a été envoyé avec succès !');
            } else {
                throw new Error('Erreur lors de l\'envoi');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.');
        }
    });

    // Testimonial slider (basic implementation)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    let currentTestimonial = 0;

    function rotateTestimonials() {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial-card');
        testimonials.forEach(card => card.style.display = 'none');
        testimonials[currentTestimonial].style.display = 'block';
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }

    // Rotate testimonials every 5 seconds
    setInterval(rotateTestimonials, 5000);
    rotateTestimonials(); // Initial call
});
