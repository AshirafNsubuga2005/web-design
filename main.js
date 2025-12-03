document.addEventListener('DOMContentLoaded', function(){
  function openModal(id){
    const modal = document.getElementById(id);
    if(!modal) return;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden','false');
    // focus first input
    const input = modal.querySelector('input'); if(input) input.focus();
  }

  function closeModal(modal){
    if(!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden','true');
  }

  // Open buttons
  document.querySelectorAll('.auth-open').forEach(btn=>{
    btn.addEventListener('click', function(){
      const target = btn.getAttribute('data-target');
      if(target) openModal(target);
    });
  });

  // Mobile nav toggle
  document.querySelectorAll('.nav-toggle').forEach(btn=>{
    btn.addEventListener('click', function(){
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      document.body.classList.toggle('nav-open');
    });
  });

  // Close nav when clicking outside or pressing Escape
  document.addEventListener('click', function(e){
    if(document.body.classList.contains('nav-open')){
      const isToggle = e.target.closest('.nav-toggle');
      const isNav = e.target.closest('.header__nav');
      if(!isToggle && !isNav){
        document.body.classList.remove('nav-open');
        document.querySelectorAll('.nav-toggle').forEach(b=>b.setAttribute('aria-expanded','false'));
      }
    }
  });

  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      if(document.body.classList.contains('nav-open')){
        document.body.classList.remove('nav-open');
        document.querySelectorAll('.nav-toggle').forEach(b=>b.setAttribute('aria-expanded','false'));
      }
    }
  });

  // Close mobile nav after clicking a navigation link (so it navigates cleanly)
  document.querySelectorAll('.header__ul a').forEach(link=>{
    link.addEventListener('click', function(){
      if(document.body.classList.contains('nav-open')){
        document.body.classList.remove('nav-open');
        document.querySelectorAll('.nav-toggle').forEach(b=>b.setAttribute('aria-expanded','false'));
      }
    });
  });

  // Close buttons
  document.addEventListener('click', function(e){
    if(e.target.matches('.modal-close')){
      const modal = e.target.closest('.modal');
      closeModal(modal);
    }
  });

  // Switch between modals (e.g., from login to signup)
  document.addEventListener('click', function(e){
    if(e.target.matches('.modal-switch')){
      const target = e.target.getAttribute('data-switch');
      const curr = e.target.closest('.modal');
      if(curr) closeModal(curr);
      if(target) openModal(target);
    }
  });

  // Close when clicking outside panel
  document.addEventListener('click', function(e){
    if(e.target.classList && e.target.classList.contains('modal')){
      closeModal(e.target);
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      document.querySelectorAll('.modal').forEach(m=> closeModal(m));
    }
  });

  // Example: simple form handlers (no backend) — just close modal on submit
  document.getElementById('login-form')?.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Logged in (demo)');
    closeModal(document.getElementById('login-modal'));
  });

  document.getElementById('signup-form')?.addEventListener('submit', function(e){
    e.preventDefault();
    alert('Account created (demo)');
    closeModal(document.getElementById('signup-modal'));
  });

});
