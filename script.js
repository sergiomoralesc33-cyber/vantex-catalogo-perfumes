// ===============================================
// VANTEX - Fragancia de Élite
// Script JavaScript para Interactividad
// ===============================================

// Carrito de compras
let carrito = [];

// Elemento botones de añadir al carrito
document.querySelectorAll('.btn-add').forEach((btn, index) => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        agregarAlCarrito(index);
    });
});

// Función para agregar al carrito
function agregarAlCarrito(index) {
    const card = document.querySelectorAll('.perfume-card')[index];
    const nombre = card.querySelector('h3').textContent;
    const precio = card.querySelector('.price').textContent;
    const descripcion = card.querySelector('.description').textContent;

    const producto = {
        id: index,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion
    };

    carrito.push(producto);
    
    // Efecto visual en el botón
    mostrarNotificacion(`✨ ${nombre} añadido al carrito`);
    animarBoton(this);
    
    console.log('Carrito actualizado:', carrito);
}

// Función para mostrar notificación
function mostrarNotificacion(mensaje) {
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion';
    notificacion.textContent = mensaje;
    notificacion.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #d4af37 0%, #e6c200 100%);
        color: #1a1a1a;
        padding: 15px 25px;
        border-radius: 5px;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.5s ease-out;
        box-shadow: 0 5px 20px rgba(212, 175, 55, 0.3);
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        notificacion.style.animation = 'slideOutRight 0.5s ease-out';
        setTimeout(() => notificacion.remove(), 500);
    }, 3000);
}

// Función para animar el botón
function animarBoton(boton) {
    const textOriginal = boton.textContent;
    boton.textContent = '✓ Añadido';
    boton.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
    
    setTimeout(() => {
        boton.textContent = textOriginal;
        boton.style.background = 'linear-gradient(135deg, #d4af37 0%, #e6c200 100%)';
    }, 2000);
}

// Estilos de animación para notificaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Función para obtener el total del carrito
function obtenerTotalCarrito() {
    let total = 0;
    carrito.forEach(producto => {
        const precio = parseFloat(producto.precio.replace('$', ''));
        total += precio;
    });
    return total.toFixed(2);
}

// Función para mostrar el carrito
function mostrarCarrito() {
    if (carrito.length === 0) {
        console.log('El carrito está vacío');
        mostrarNotificacion('El carrito está vacío');
        return;
    }
    
    let mensaje = '🛍️ CARRITO VANTEX\n\n';
    carrito.forEach((producto, index) => {
        mensaje += `${index + 1}. ${producto.nombre} - ${producto.precio}\n`;
    });
    mensaje += `\n💰 Total: $${obtenerTotalCarrito()}`;
    
    console.log(mensaje);
}

// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = [];
    mostrarNotificacion('Carrito vaciado');
    console.log('Carrito vaciado');
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(index) {
    if (index >= 0 && index < carrito.length) {
        const nombre = carrito[index].nombre;
        carrito.splice(index, 1);
        mostrarNotificacion(`${nombre} eliminado del carrito`);
    }
}

// Función para buscar perfumes
function buscarPerfumes(termino) {
    const cards = document.querySelectorAll('.perfume-card');
    let resultados = 0;
    
    cards.forEach(card => {
        const nombre = card.querySelector('h3').textContent.toLowerCase();
        const descripcion = card.querySelector('.description').textContent.toLowerCase();
        
        if (nombre.includes(termino.toLowerCase()) || descripcion.includes(termino.toLowerCase())) {
            card.style.display = 'block';
            resultados++;
        } else {
            card.style.display = 'none';
        }
    });
    
    console.log(`Se encontraron ${resultados} resultados`);
}

// Función para ordenar perfumes por precio
function ordenarPorPrecio(orden = 'asc') {
    const grid = document.querySelector('.perfumes-grid');
    const cards = Array.from(document.querySelectorAll('.perfume-card'));
    
    cards.sort((a, b) => {
        const precioA = parseFloat(a.querySelector('.price').textContent.replace('$', ''));
        const precioB = parseFloat(b.querySelector('.price').textContent.replace('$', ''));
        
        return orden === 'asc' ? precioA - precioB : precioB - precioA;
    });
    
    cards.forEach(card => grid.appendChild(card));
    mostrarNotificacion(`Ordenado por precio (${orden === 'asc' ? 'menor a mayor' : 'mayor a menor'})`);
}

// Agregar interactividad al pasar el ratón sobre las tarjetas
document.querySelectorAll('.perfume-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// Inicializar el catálogo
console.log('✨ VANTEX - Catálogo de Perfumes Cargado Exitosamente ✨');
console.log('Perfumes disponibles: 30');
console.log('Marca: VANTEX - Fragancia de Élite');
console.log('---');
console.log('Funciones disponibles:');
console.log('• agregarAlCarrito(index) - Agregar producto al carrito');
console.log('• mostrarCarrito() - Ver contenido del carrito');
console.log('• obtenerTotalCarrito() - Ver total del carrito');
console.log('• vaciarCarrito() - Vaciar el carrito');
console.log('• eliminarDelCarrito(index) - Eliminar producto del carrito');
console.log('• buscarPerfumes("término") - Buscar perfumes');
console.log('• ordenarPorPrecio("asc" o "desc") - Ordenar por precio');