// ==================== SPINNER ====================
setTimeout(function() {
    const spinner = document.getElementById('spinner');
    if (spinner) {
        spinner.classList.remove('show');
    }
}, 500);

// ==================== COUNTERS (Al hacer scroll) ====================
let countersStarted = false;
const counters = document.querySelectorAll('.counter');

function startCounters() {
    counters.forEach(counter => {
        let target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        let increment = target / 50;
        
        let timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 30);
    });
}

function checkCounters() {
    const countersSection = document.querySelector('.counters');
    if (!countersStarted && countersSection) {
        const rect = countersSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            countersStarted = true;
            startCounters();
        }
    }
}

window.addEventListener('scroll', checkCounters);
window.addEventListener('load', checkCounters);

// ==================== BACK TO TOP ====================
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==================== SCROLL SUAVE PARA TODOS LOS ENLACES ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== FORMULARIO DE CONTACTO ====================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefono = document.getElementById('telefono').value.trim();
        const servicio = document.getElementById('servicio').value;
        const mensaje = document.getElementById('mensaje').value.trim();
        
        if (!nombre || !email || !telefono) {
            mostrarMensaje('Por favor completa todos los campos requeridos.', 'danger');
            return;
        }
        
        function validarEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        if (!validarEmail(email)) {
            mostrarMensaje('Por favor ingresa un email válido.', 'danger');
            return;
        }
        
        let textoWhatsApp = `Hola Smile Care,%0A%0A`;
        textoWhatsApp += `*Nueva solicitud de cita:*%0A%0A`;
        textoWhatsApp += `📝 *Nombre:* ${encodeURIComponent(nombre)}%0A`;
        textoWhatsApp += `📧 *Email:* ${encodeURIComponent(email)}%0A`;
        textoWhatsApp += `📞 *Teléfono:* ${encodeURIComponent(telefono)}%0A`;
        textoWhatsApp += `🦷 *Servicio:* ${servicio || 'No especificado'}%0A`;
        textoWhatsApp += `💬 *Mensaje:* ${mensaje ? encodeURIComponent(mensaje) : 'Sin mensaje adicional'}%0A%0A`;
        textoWhatsApp += `*¡Espero su respuesta!*`;
        
        const whatsappUrl = `https://wa.me/18095395340?text=${textoWhatsApp}`;
        window.open(whatsappUrl, '_blank');
        
        const emailSubject = `Cita Odontológica - ${nombre}`;
        const emailBody = `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\nServicio: ${servicio || 'No especificado'}\nMensaje: ${mensaje || 'Sin mensaje adicional'}`;
        const emailUrl = `mailto:smilegarciagroup@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        mostrarMensaje('¡Solicitud enviada! Te contactaremos pronto.', 'success');
        contactForm.reset();
        
        setTimeout(() => {
            window.open(emailUrl, '_blank');
        }, 500);
    });
}

function mostrarMensaje(mensaje, tipo) {
    if (formMessage) {
        formMessage.style.display = 'block';
        formMessage.innerHTML = `<div class="alert alert-${tipo} rounded-pill">${mensaje}</div>`;
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// ==================== NEWSLETTER ====================
function enviarNewsletter() {
    const email = document.getElementById('newsletterEmail').value.trim();
    
    if (!email) {
        alert('Por favor ingresa tu email');
        return;
    }
    
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    if (!validarEmail(email)) {
        alert('Por favor ingresa un email válido');
        return;
    }
    
    const subject = 'Suscripción Newsletter Smile Care';
    const body = `Hola, me gustaría suscribirme al newsletter. Mi email es: ${email}`;
    window.open(`mailto:smilegarciagroup@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    
    alert('¡Gracias por suscribirte! Te enviaremos nuestras novedades.');
    document.getElementById('newsletterEmail').value = '';
}
// ==================== FUNCIÓN PARA MOSTRAR/OCULTAR TEXTO COMPLETO ====================
function toggleTexto(button, textoId) {
    const textoCompleto = document.getElementById(textoId);
    
    if (textoCompleto.style.display === 'none' || textoCompleto.style.display === '') {
        textoCompleto.style.display = 'block';
        button.textContent = 'Leer menos';
        button.classList.add('active');
        
        // Scroll suave hasta el texto
        setTimeout(() => {
            textoCompleto.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        textoCompleto.style.display = 'none';
        button.textContent = 'Leer más';
        button.classList.remove('active');
    }
}