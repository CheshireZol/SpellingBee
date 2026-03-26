const PALABRAS_POR_PAGINA = 20;

// Variables de Estado
let palabrasTodas = [];
let palabrasJuego = [];
let correctas = [];
let incorrectas = [];
let indice = 0;

// Elementos del DOM (Pantallas)
const viewConfig = document.getElementById('view-config');
const viewJuego = document.getElementById('view-juego');
const viewResultados = document.getElementById('view-resultados');

// Elementos del DOM (Controles)
const radiosLista = document.querySelectorAll('input[name="lista"]');
const paginasContainer = document.getElementById('paginas-container');
const conteoPalabras = document.getElementById('conteo-palabras');
const btnIniciar = document.getElementById('btn-iniciar');

// Elementos del DOM (Juego)
const lblInfoLista = document.getElementById('lbl-info-lista');
const lblProgreso = document.getElementById('lbl-progreso');
const progressBar = document.getElementById('progress-bar');
const lblPalabra = document.getElementById('lbl-palabra');
const lblDesc = document.getElementById('lbl-desc');
const btnCorrecto = document.getElementById('btn-correcto');
const btnIncorrecto = document.getElementById('btn-incorrecto');
const btnFinalizar = document.getElementById('btn-finalizar');

// Elementos del DOM (Resultados)
const lblPorcentaje = document.getElementById('lbl-porcentaje');
const lblDetalleScore = document.getElementById('lbl-detalle-score');
const refuerzoContainer = document.getElementById('refuerzo-container');
const tablaRefuerzo = document.getElementById('tabla-refuerzo');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Inicialización de Eventos
document.addEventListener('DOMContentLoaded', () => {
    radiosLista.forEach(radio => radio.addEventListener('change', cargarListaActual));
    btnIniciar.addEventListener('click', iniciarJuego);
    btnCorrecto.addEventListener('click', marcarCorrecto);
    btnIncorrecto.addEventListener('click', marcarIncorrecto);
    btnFinalizar.addEventListener('click', mostrarResultados);
    btnReiniciar.addEventListener('click', reiniciar);

    // Atajos de teclado
    document.addEventListener('keydown', (e) => {
        if (!viewJuego.classList.contains('hidden')) {
            if (e.key === 'ArrowRight' || e.key === '1') marcarCorrecto();
            if (e.key === 'ArrowLeft' || e.key === '2') marcarIncorrecto();
        }
    });

    // Agregar botón de "Marcar/Desmarcar Todo" dinámicamente arriba de los checks
    const headerPags = conteoPalabras.parentElement;
    const btnToggle = document.createElement('button');
    btnToggle.innerText = "Marcar/Desmarcar Todo";
    btnToggle.className = "text-sm text-primary hover:text-textMain transition-colors ml-4";
    btnToggle.onclick = toggleAll;
    headerPags.appendChild(btnToggle);

    // Cargar la lista 1 por defecto al abrir
    cargarListaActual();
});

// Lógica de Datos
async function cargarListaActual() {
    const listaNum = document.querySelector('input[name="lista"]:checked').value;
    const archivo = `ListaPalabras_${listaNum}.txt`;
    
    try {
        const respuesta = await fetch(archivo);
        if (!respuesta.ok) throw new Error('Archivo no encontrado');
        const texto = await respuesta.text();
        procesarTexto(texto);
        renderizarCheckboxes();
    } catch (error) {
        console.error('Error:', error);
        paginasContainer.innerHTML = `<p class="text-error col-span-5">⚠️ No se pudo cargar el archivo ${archivo}. (Lee la nota abajo sobre el servidor local).</p>`;
        palabrasTodas = [];
        actualizarConteo();
    }
}

function procesarTexto(texto) {
    palabrasTodas = [];
    const lineas = texto.split('\n');
    
    lineas.forEach(linea => {
        linea = linea.trim();
        if (!linea.includes('|')) return;
        
        const partes = linea.split('|');
        if (partes.length < 3) return;
        
        const num = parseInt(partes[0].trim());
        if (isNaN(num)) return;
        
        const palabra = partes[1].trim();
        const desc = partes[2].trim();
        const pag = Math.floor((num - 1) / PALABRAS_POR_PAGINA) + 1;
        
        palabrasTodas.push({ num, pag, palabra, desc });
    });
    // Asegurar orden
    palabrasTodas.sort((a, b) => a.num - b.num);
}

// Lógica de UI - Configuración
function renderizarCheckboxes() {
    paginasContainer.innerHTML = '';
    if (palabrasTodas.length === 0) return;

    const maxPag = Math.max(...palabrasTodas.map(p => p.pag));
    
    for (let i = 1; i <= maxPag; i++) {
        const label = document.createElement('label');
        label.className = "cursor-pointer flex items-center space-x-2 bg-bgMain p-2 rounded-lg border border-gray-700 hover:border-primary transition-colors";
        
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = i;
        checkbox.className = "pagina-checkbox w-4 h-4 text-primary bg-bgMain border-gray-600 focus:ring-primary";
        checkbox.addEventListener('change', actualizarConteo);
        
        const span = document.createElement('span');
        span.innerText = `Pág. ${i}`;
        
        label.appendChild(checkbox);
        label.appendChild(span);
        paginasContainer.appendChild(label);
    }
    actualizarConteo();
}

function actualizarConteo() {
    const seleccionadas = obtenerPaginasSeleccionadas();
    let total = 0;
    
    if (seleccionadas.length === 0) {
        total = palabrasTodas.length; // Si no hay checks, asume todas
    } else {
        total = palabrasTodas.filter(p => seleccionadas.includes(p.pag)).length;
    }
    conteoPalabras.innerText = `Palabras seleccionadas: ${total}`;
}

function obtenerPaginasSeleccionadas() {
    const checks = document.querySelectorAll('.pagina-checkbox:checked');
    return Array.from(checks).map(cb => parseInt(cb.value));
}

function toggleAll() {
    const checks = document.querySelectorAll('.pagina-checkbox');
    if (checks.length === 0) return;
    
    const todosMarcados = Array.from(checks).every(cb => cb.checked);
    checks.forEach(cb => cb.checked = !todosMarcados);
    actualizarConteo();
}

// Utilidad para barajar array (Fisher-Yates)
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Lógica del Juego
function iniciarJuego() {
    const seleccionadas = obtenerPaginasSeleccionadas();
    
    if (seleccionadas.length > 0) {
        palabrasJuego = palabrasTodas.filter(p => seleccionadas.includes(p.pag));
    } else {
        palabrasJuego = [...palabrasTodas]; // Si no marcó ninguna, van todas
    }

    if (palabrasJuego.length === 0) {
        alert("No hay palabras para estudiar.");
        return;
    }

    shuffle(palabrasJuego);
    correctas = [];
    incorrectas = [];
    indice = 0;

    // Cambiar pantallas
    viewConfig.classList.add('hidden');
    viewConfig.classList.remove('block');
    viewJuego.classList.remove('hidden');
    viewJuego.classList.add('block');

    mostrarSiguiente();
}

function mostrarSiguiente() {
    if (indice < palabrasJuego.length) {
        const p = palabrasJuego[indice];
        const listaNum = document.querySelector('input[name="lista"]:checked').value;
        
        lblInfoLista.innerText = `Lista ${listaNum} · Pág. ${p.pag} · Palabra #${p.num}`;
        lblProgreso.innerText = `Progreso: ${indice + 1} de ${palabrasJuego.length}`;
        lblPalabra.innerText = p.palabra;
        lblDesc.innerText = p.desc || "(Sin descripción)";
        
        const porcentajeW = (indice / palabrasJuego.length) * 100;
        progressBar.style.width = `${Math.max(porcentajeW, 2)}%`;
    } else {
        mostrarResultados();
    }
}

function marcarCorrecto() {
    if (indice < palabrasJuego.length) {
        correctas.push(palabrasJuego[indice]);
        indice++;
        mostrarSiguiente();
    }
}

function marcarIncorrecto() {
    if (indice < palabrasJuego.length) {
        incorrectas.push(palabrasJuego[indice]);
        indice++;
        mostrarSiguiente();
    }
}

// Lógica de Resultados
function mostrarResultados() {
    viewJuego.classList.add('hidden');
    viewJuego.classList.remove('block');
    viewResultados.classList.remove('hidden');
    viewResultados.classList.add('block');

    const total = correctas.length + incorrectas.length;
    const porcentaje = total === 0 ? 0 : (correctas.length / total) * 100;

    lblPorcentaje.innerText = `${porcentaje.toFixed(1)}%`;
    lblDetalleScore.innerText = `Aciertos: ${correctas.length} • Errores: ${incorrectas.length}`;

    // Colorear el porcentaje según el score
    lblPorcentaje.className = "text-7xl font-bold mb-4 " + 
        (porcentaje >= 80 ? "text-success" : (porcentaje >= 50 ? "text-primary" : "text-error"));

    if (incorrectas.length > 0) {
        refuerzoContainer.classList.remove('hidden');
        tablaRefuerzo.innerHTML = '';
        const listaNum = document.querySelector('input[name="lista"]:checked').value;

        // Ordenar errores por número original de la lista
        incorrectas.sort((a, b) => a.num - b.num).forEach(p => {
            const tr = document.createElement('tr');
            tr.className = "hover:bg-bgMain transition-colors";
            tr.innerHTML = `
                <td class="py-3 px-4 text-center border-t border-gray-700">Lista ${listaNum}</td>
                <td class="py-3 px-4 text-center border-t border-gray-700">Pág. ${p.pag}</td>
                <td class="py-3 px-4 text-center border-t border-gray-700">#${p.num}</td>
                <td class="py-3 px-4 border-t border-gray-700 font-bold">${p.palabra}</td>
            `;
            tablaRefuerzo.appendChild(tr);
        });
    } else {
        refuerzoContainer.classList.add('hidden');
    }
}

function reiniciar() {
    viewResultados.classList.add('hidden');
    viewResultados.classList.remove('block');
    viewConfig.classList.remove('hidden');
    viewConfig.classList.add('block');
    
    progressBar.style.width = '0%';
    cargarListaActual();
}