document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.contenedor-header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(39, 41, 46, 0.6)';
            header.style.padding = '0';
        } else {
            header.style.backgroundColor = 'rgba(39, 41, 46, 1)';
            header.style.padding = '16px 0';
        }
    });
});
