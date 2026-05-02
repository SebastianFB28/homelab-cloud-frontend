export const vReveal = {
  mounted(el) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Descomenta la siguiente línea si quieres que la animación ocurra solo una vez
          // observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(el);
  }
}