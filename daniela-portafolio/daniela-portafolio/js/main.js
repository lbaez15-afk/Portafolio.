(function () {
  // Menú de celular
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('menu');
  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) { nav.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); }
  });

  // Filtros de proyectos
  var cards = document.querySelectorAll('.card');
  var empty = document.getElementById('empty');
  document.querySelectorAll('.filters button').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.f, shown = 0;
      document.querySelectorAll('.filters button').forEach(function (x) {
        var on = x === b; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', on);
      });
      cards.forEach(function (c) {
        var ok = f === 'todos' || c.dataset.cat === f;
        c.hidden = !ok; if (ok) shown++;
      });
      empty.hidden = shown !== 0;
    });
  });
  document.getElementById('count').textContent = cards.length;

  // Enlace activo al hacer scroll
  var links = document.querySelectorAll('.nav a');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle('is-active', l.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { io.observe(s); });
  }

  // Formularios: abren el correo con el mensaje listo (GitHub Pages no tiene servidor)
  var TO = 'ldanielabaez08@gmail.com';
  document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target;
    var body = 'Nombre o marca: ' + f.nombre.value + '\nCorreo: ' + f.correo.value +
      '\nTipo de proyecto: ' + f.tipo.value + '\nPresupuesto: ' + f.presupuesto.value + '\n\n' + f.idea.value;
    location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent('Nuevo proyecto: ' + f.nombre.value) + '&body=' + encodeURIComponent(body);
  });
  document.getElementById('talk').addEventListener('submit', function (e) {
    e.preventDefault();
    var m = document.getElementById('talk-mail').value;
    location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent('Dudas y comentarios') + '&body=' + encodeURIComponent('Hola Daniela, te escribo desde: ' + m + '\n\n');
  });
})();
