// Smooth scroll helper used by nav buttons (prevent default anchor behavior to keep smooth)
    function scrollToSection(e, id){
      if (e && e.preventDefault) e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // scroll into view with offset for sticky nav
      const navHeight = document.querySelector('.nav').offsetHeight || 80;
      window.scrollTo({
        top: window.pageYOffset + rect.top - navHeight - 18,
        behavior: 'smooth'
      });
    }

    // Reveal on scroll (IntersectionObserver)
    const reveals = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // optional: unobserve to improve perf
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(r => obs.observe(r));

    // micro-interaction: floating hero tilt on mouse move (subtle)
    const hero = document.querySelector('.hero-card');
    if (hero) {
      hero.addEventListener('mousemove', (e) => {
        const w = hero.offsetWidth;
        const h = hero.offsetHeight;
        const x = (e.offsetX - w/2)/(w/2);
        const y = (e.offsetY - h/2)/(h/2);
        hero.style.transform = `translateY(${ -6 + y * -4 }px) rotateX(${y * 1.2}deg) rotateY(${x * 1.2}deg)`;
      });
      hero.addEventListener('mouseleave', () => {
        hero.style.transform = '';
      });
    }

    // tiny UX: form submit feedback (client-side only)
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        // show micro-feedback
        const btn = form.querySelector('button[type="submit"]');
        if (!btn) return;
        const orig = btn.innerText;
        btn.innerText = 'Preparation du mail...';
        btn.disabled = true;
        send_mail();
        setTimeout(() => {
          btn.innerText = 'OK !';
          btn.style.transform = 'translateY(-2px)';
        }, 700);
        setTimeout(() => {
          btn.innerText = orig;
          btn.disabled = false;
          btn.style.transform = '';
        }, 5000);
      });
    });

    // Accessibility: add focus outline for keyboard users
    document.body.addEventListener('keyup', function(e){
      if (e.key === 'Tab') document.documentElement.classList.add('show-focus');
    });

    // Gestion des hébergements recommandés
    const hostsContainer = document.getElementById('hosts-container');
    
    function add_host(nom, lieu, nb_voyageur, prix) {
      const hostCard = document.createElement('div');
      hostCard.className = 'host-card';
      
      hostCard.innerHTML = `
        <div class="host-name">${nom}</div>
        <div class="host-details">
          <div class="host-detail">
            <span>📍</span>
            <span>${lieu}</span>
          </div>
          <div class="host-detail">
            <span>👥</span>
            <span>${nb_voyageur} voyageur${nb_voyageur > 1 ? 's' : ''}</span>
          </div>
        </div>
        <div class="host-price">${prix}€ <span>/nuit</span></div>
      `;
      
      hostsContainer.appendChild(hostCard);
      
      // Ajouter l'animation reveal si le conteneur est visible
      setTimeout(() => {
        hostCard.classList.add('reveal', 'visible');
      }, 10);
    }

    // Exemples d'hébergements (à supprimer ou modifier selon vos besoins)
/*    add_host("Appartement Panorama", "Nice, Centre-ville", 4, 89);
    add_host("Studio Cosy", "Bordeaux, Chartrons", 2, 65);
    add_host("Loft Moderne", "Lyon, Confluence", 6, 120);
    add_host("Villa Mer & Soleil", "Biarritz, Front de mer", 8, 250);
*/
    function send_mail(){
      window.open("mailto:vipresidence123@gmail.com?subject=Demande de contact - "+document.getElementById("nom2").value+"&body=[Vous pouvez ajouter un cours message ici]%0A%0A%0A"+document.getElementById("nom2").value+"%0AMail : "+document.getElementById("mail2").value+"%0ATel : "+document.getElementById("tel2").value+"%0ACode postal : "+document.getElementById("postal2").value+"%0ALien : "+document.getElementById("lien2").value)
    }