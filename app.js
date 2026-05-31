const PALABRAS_POR_PAGINA = 20;

// ==========================================
// 1. MOTOR DE AUDIO Y EFECTOS SINTETIZADOS (Web Audio API)
// ==========================================
const MagicAudio = {
    ctx: null,
    enabled: true,
    
    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    },
    
    playSuccess() {
        if (!this.enabled) return;
        try {
            this.init();
            const now = this.ctx.currentTime;
            // Arpegio brillante celestial ascendente (C5 -> E5 -> G5 -> C6)
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, index) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, now + index * 0.08);
                osc.frequency.exponentialRampToValueAtTime(freq * 1.02, now + index * 0.08 + 0.15);
                
                gain.gain.setValueAtTime(0, now + index * 0.08);
                gain.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.02);
                gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.35);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start(now + index * 0.08);
                osc.stop(now + index * 0.08 + 0.35);
            });
        } catch (e) {
            console.warn('Audio synthesis failed:', e);
        }
    },
    
    playError() {
        if (!this.enabled) return;
        try {
            this.init();
            const now = this.ctx.currentTime;
            // Sonido descendente grave de hechizo fallido (fizzle)
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(130.81, now);
            osc.frequency.linearRampToValueAtTime(80.00, now + 0.4);
            
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
            
            // Filtro pasa bajos para atenuar sierra y hacerlo sonar a "humo mágico"
            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(300, now);
            
            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now);
            osc.stop(now + 0.42);
        } catch (e) {
            console.warn('Audio synthesis failed:', e);
        }
    },
    
    playClick() {
        if (!this.enabled) return;
        try {
            this.init();
            const now = this.ctx.currentTime;
            // Cristalino tic de varita
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(2200, now);
            osc.frequency.exponentialRampToValueAtTime(1500, now + 0.06);
            
            gain.gain.setValueAtTime(0.04, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now);
            osc.stop(now + 0.07);
        } catch (e) {
            console.warn('Audio synthesis failed:', e);
        }
    },

    playSpellCast() {
        if (!this.enabled) return;
        try {
            this.init();
            const now = this.ctx.currentTime;
            // Ráfaga mágica swoosh
            const osc = this.ctx.createOscillator();
            const osc2 = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(250, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
            
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(120, now);
            osc2.frequency.exponentialRampToValueAtTime(500, now + 0.3);
            
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.1, now + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
            
            osc.connect(gain);
            osc2.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(now);
            osc2.start(now);
            osc.stop(now + 0.31);
            osc2.stop(now + 0.31);
        } catch (e) {
            console.warn('Audio synthesis failed:', e);
        }
    }
};

// ==========================================
// 2. SÍNTESIS DE VOZ MÁGICA (Text-to-Speech)
// ==========================================
const WizardTTS = {
    enabled: true,
    speed: 1.0,
    voice: null,

    init() {
        if (!('speechSynthesis' in window)) {
            console.warn('TTS no soportado en este navegador.');
            this.enabled = false;
            return;
        }
        this.loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
        }
    },

    loadVoices() {
        const voices = window.speechSynthesis.getVoices();
        // Buscamos acento Americano (en-US) por preferencia
        this.voice = voices.find(v => v.lang === 'en-US' || v.lang.startsWith('en-US')) ||
                     voices.find(v => v.lang.startsWith('en-GB')) ||
                     voices.find(v => v.lang.startsWith('en')) ||
                     voices[0];
    },

    speak(word) {
        if (!this.enabled || !word) return;
        
        window.speechSynthesis.cancel(); // Cancelar cualquier pronunciación previa
        
        const cleanWord = word.replace(/[^a-zA-Z\s-]/g, '').trim(); // Limpiar caracteres especiales de sonido
        const utterance = new SpeechSynthesisUtterance(cleanWord);
        if (this.voice) {
            utterance.voice = this.voice;
        }
        utterance.lang = this.voice ? this.voice.lang : 'en-US';
        utterance.rate = this.speed;
        utterance.pitch = 1.05; // Tono mágico sutilmente alto
        
        window.speechSynthesis.speak(utterance);
    }
};

// ==========================================
// 3. CONSTANTES Y VARIABLES DE ESTADO
// ==========================================
const HOUSE_CRESTS = {
    hogwarts: 'multimedia/Hogwarts_logo.png',
    gryffindor: 'multimedia/Gryffindor_logo.png',
    slytherin: 'multimedia/Slytherin_logo.png',
    ravenclaw: 'multimedia/Ravenclaw_logo.png',
    hufflepuff: 'multimedia/Hufflepuff_logo.png'
};

const HOUSE_NAMES_ES = {
    hogwarts: 'Hogwarts (General)',
    gryffindor: 'Gryffindor',
    slytherin: 'Slytherin',
    ravenclaw: 'Ravenclaw',
    hufflepuff: 'Hufflepuff'
};

let palabrasTodas = [];
let palabrasJuego = [];
let correctas = [];
let incorrectas = [];
let indice = 0;
let listaCargadaNum = '1';

// Estado de Juego Avanzado (Mágico)
let selectedHouse = 'hogwarts';
let gameMode = 'writing'; // 'writing' o 'examiner'
let housePoints = 0;
let streak = 0;
let maxStreak = 0;

// Filtros de Selección de Práctica (Por Dificultad o Capítulos)
let activeFilterType = 'pages'; // 'pages' o 'difficulty'
let selectedDifficulties = []; // Array de dificultades seleccionadas (ej: ['fácil', 'medio'])

// Elementos del DOM (Pantallas principales)
const viewConfig = document.getElementById('view-config');
const viewJuego = document.getElementById('view-juego');
const viewResultados = document.getElementById('view-resultados');

// Controles y Configuración
const radiosLista = document.querySelectorAll('input[name="lista"]');
const btnEdicion1 = document.getElementById('btn-edicion-1');
const btnEdicion2 = document.getElementById('btn-edicion-2');
const btnModeWriting = document.getElementById('btn-mode-writing');
const btnModeExaminer = document.getElementById('btn-mode-examiner');
const chkSoundFx = document.getElementById('chk-sound-fx');
const paginasContainer = document.getElementById('paginas-container');
const conteoPalabras = document.getElementById('conteo-palabras');
const btnIniciar = document.getElementById('btn-iniciar');
const headerHouseCrest = document.getElementById('header-house-crest');

// Elementos de la Arena de Juego
const lblInfoLista = document.getElementById('lbl-info-lista');
const lblProgreso = document.getElementById('lbl-progreso');
const progressBar = document.getElementById('progress-bar');
const gameCard = document.getElementById('game-card');
const bgCrestWatermark = document.getElementById('bg-crest-watermark');
const lblPalabra = document.getElementById('lbl-palabra');
const wordContainerBox = document.getElementById('word-container-box');
const lblDificultadBadge = document.getElementById('lbl-dificultad-badge');
const lblPhonetics = document.getElementById('lbl-phonetics');
const lblDesc = document.getElementById('lbl-desc');
const btnRevealWord = document.getElementById('btn-reveal-word');
const btnPronounceActive = document.getElementById('btn-pronounce-active');
const juegoHouseBadge = document.getElementById('juego-house-badge');
const lblHousePointsTracker = document.getElementById('lbl-house-points-tracker');
const wordHiddenDisplay = document.getElementById('word-hidden-display');

// Paneles de Control de Modos
const controlsExaminer = document.getElementById('controls-examiner');
const controlsWriting = document.getElementById('controls-writing');
const btnCorrecto = document.getElementById('btn-correcto');
const btnIncorrecto = document.getElementById('btn-incorrecto');
const btnFinalizar = document.getElementById('btn-finalizar');
const txtSpellInput = document.getElementById('txt-spell-input');
const frmSpell = document.getElementById('frm-spell');
const spellFeedback = document.getElementById('spell-feedback');

// Resultados de la Copa de las Casas
const resultsCrest = document.getElementById('results-crest');
const lblRangoMago = document.getElementById('lbl-rango-mago');
const lblPorcentaje = document.getElementById('lbl-porcentaje');
const lblDetalleScore = document.getElementById('lbl-detalle-score');
const lblHousePointsWon = document.getElementById('lbl-house-points-won');
const refuerzoContainer = document.getElementById('refuerzo-container');
const tablaRefuerzo = document.getElementById('tabla-refuerzo');
const btnReiniciar = document.getElementById('btn-reiniciar');

// Biblioteca Modal (Grimorio Explorer)
const modalBiblioteca = document.getElementById('modal-biblioteca');
const btnBibliotecaAbrir = document.getElementById('btn-biblioteca-abrir');
const btnBibliotecaCerrar = document.getElementById('btn-biblioteca-cerrar');
const btnLibEd1 = document.getElementById('btn-lib-ed-1');
const btnLibEd2 = document.getElementById('btn-lib-ed-2');
const txtLibSearch = document.getElementById('txt-lib-search');
const libWordList = document.getElementById('lib-word-list');
let libActiveListNum = '1';
let libPalabrasCached = [];

// ==========================================
// 4. INICIALIZACIÓN Y EVENTOS
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar Motores de Audio y Voz
    MagicAudio.init();
    WizardTTS.init();
    
    // Cargar Preferencias del Almacenamiento Local (Persistencia)
    cargarPreferencias();
    
    // Asignar Eventos a los Controles
    btnEdicion1.addEventListener('click', () => cambiarEdicionRadio('1'));
    btnEdicion2.addEventListener('click', () => cambiarEdicionRadio('2'));
    btnModeWriting.addEventListener('click', () => cambiarModoJuego('writing'));
    btnModeExaminer.addEventListener('click', () => cambiarModoJuego('examiner'));
    
    chkSoundFx.addEventListener('change', (e) => {
        MagicAudio.enabled = e.target.checked;
        guardarPreferencias();
    });
    
    radiosLista.forEach(radio => radio.addEventListener('change', cargarListaActual));
    btnIniciar.addEventListener('click', iniciarJuego);
    
    // Controles de Juego Manual
    btnCorrecto.addEventListener('click', marcarCorrecto);
    btnIncorrecto.addEventListener('click', marcarIncorrecto);
    btnFinalizar.addEventListener('click', mostrarResultados);
    btnReiniciar.addEventListener('click', reiniciar);
    
    // Botones Adicionales del Juego Activo
    btnRevealWord.addEventListener('click', revelarPalabraManual);
    btnPronounceActive.addEventListener('click', () => {
        if (indice < palabrasJuego.length) {
            WizardTTS.speak(palabrasJuego[indice].palabra);
            MagicAudio.playClick();
        }
    });

    // Cambios de Velocidad del TTS
    document.querySelectorAll('input[name="tts-speed"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            WizardTTS.speed = parseFloat(e.target.value);
        });
    });

    // Formulario de Escritura Mágica
    frmSpell.addEventListener('submit', (e) => {
        e.preventDefault();
        evaluarEscrituraMagica();
    });

    // Botón de Conteo / Alternancia Total
    document.getElementById('btn-toggle-all').addEventListener('click', () => {
        MagicAudio.playClick();
        toggleAll();
    });

    // Eventos Biblioteca (Grimorio Explorer)
    btnBibliotecaAbrir.addEventListener('click', abrirBiblioteca);
    btnBibliotecaCerrar.addEventListener('click', cerrarBiblioteca);
    btnLibEd1.addEventListener('click', () => cambiarLibEdicion('1'));
    btnLibEd2.addEventListener('click', () => cambiarLibEdicion('2'));
    txtLibSearch.addEventListener('input', renderizarBibliotecaPalabras);

    // Cargar Estrellas Animadas en Fondo
    inicializarEstrellas();

    // Eventos de Filtro (Páginas vs Dificultad)
    document.getElementById('btn-filter-type-pages').addEventListener('click', () => {
        setFilterType('pages');
    });
    document.getElementById('btn-filter-type-difficulty').addEventListener('click', () => {
        setFilterType('difficulty');
    });

    // Ajustar dinámicamente el tamaño de la palabra cuando cambie el tamaño de pantalla
    window.addEventListener('resize', ajustarTamanoPalabra);

    // Cargar la Lista inicial por defecto
    cargarListaActual();
});

// Generar partículas de estrellas flotantes de manera procedural en el fondo
function inicializarEstrellas() {
    const container = document.getElementById('stars-container');
    if (!container) return;
    container.innerHTML = '';
    
    const count = 45;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Atributos aleatorios
        const size = Math.random() * 2.5 + 0.5;
        const left = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 15 + 10;
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${left}%`;
        star.style.animationDelay = `${delay}s`;
        star.style.animationDuration = `${duration}s`;
        
        // Tonos mágicos tenues amarillos/blancos/celestes
        const hues = [60, 200, 0]; // Amarillo, celeste, blanco
        const hue = hues[Math.floor(Math.random() * hues.length)];
        if (hue !== 0) {
            star.style.backgroundColor = `hsla(${hue}, 100%, 90%, ${Math.random() * 0.4 + 0.2})`;
            star.style.boxShadow = `0 0 5px hsla(${hue}, 100%, 80%, 0.5)`;
        } else {
            star.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.4 + 0.2})`;
        }

        container.appendChild(star);
    }
}

// ==========================================
// 5. PERSISTENCIA Y PREFERENCIAS
// ==========================================
function guardarPreferencias() {
    const prefs = {
        selectedHouse,
        gameMode,
        soundFxEnabled: MagicAudio.enabled,
        listaSeleccionada: document.querySelector('input[name="lista"]:checked')?.value || '1',
        housePoints
    };
    localStorage.setItem('spelling_bee_wizard_prefs', JSON.stringify(prefs));
}

function cargarPreferencias() {
    try {
        const stored = localStorage.getItem('spelling_bee_wizard_prefs');
        if (stored) {
            const prefs = JSON.parse(stored);
            
            // Casa
            if (prefs.selectedHouse) {
                selectHouse(prefs.selectedHouse, false);
            }
            
            // Modo de Juego
            if (prefs.gameMode) {
                cambiarModoJuego(prefs.gameMode, false);
            }
            
            // Sonidos
            if (prefs.soundFxEnabled !== undefined) {
                MagicAudio.enabled = prefs.soundFxEnabled;
                chkSoundFx.checked = MagicAudio.enabled;
            }
            
            // Puntos acumulados de Casa
            if (prefs.housePoints !== undefined) {
                housePoints = parseInt(prefs.housePoints) || 0;
            }
            
            // Lista Edición
            if (prefs.listaSeleccionada) {
                const targetRadio = document.querySelector(`input[name="lista"][value="${prefs.listaSeleccionada}"]`);
                if (targetRadio) {
                    targetRadio.checked = true;
                    cambiarEdicionRadioVisual(prefs.listaSeleccionada);
                }
            }
        }
    } catch (e) {
        console.warn('Error cargando preferencias de localStorage:', e);
    }
}

// ==========================================
// 6. SELECCIÓN DE CASA Y TEMATIZACIÓN
// ==========================================
window.selectHouse = function(houseName, playSound = true) {
    if (playSound) MagicAudio.playSpellCast();

    // Eliminar clases anteriores de casa en el body
    document.body.classList.remove('theme-gryffindor', 'theme-slytherin', 'theme-ravenclaw', 'theme-hufflepuff');
    
    if (houseName !== 'hogwarts') {
        document.body.classList.add(`theme-${houseName}`);
    }

    selectedHouse = houseName;

    // Actualizar badges visuales de selección de casa
    document.querySelectorAll('.house-card').forEach(card => {
        card.classList.remove('border-yellow-500/40', 'bg-slate-900/60');
        card.classList.add('border-slate-800', 'bg-slate-950/40');
        card.querySelector('span:last-child').className = "font-magic text-xs sm:text-sm font-semibold text-slate-300";
    });

    const activeCard = document.getElementById(`card-house-${houseName}`);
    if (activeCard) {
        activeCard.classList.remove('border-slate-800', 'bg-slate-950/40');
        activeCard.classList.add('border-yellow-500/40', 'bg-slate-900/60');
        activeCard.querySelector('span:last-child').className = "font-magic text-xs sm:text-sm font-semibold text-yellow-500";
    }

    // Cambiar ícono del escudo en el cabezal principal
    headerHouseCrest.src = HOUSE_CRESTS[houseName];

    // Sincronizar en el juego activo si está cargado
    if (juegoHouseBadge) juegoHouseBadge.src = HOUSE_CRESTS[houseName];
    if (bgCrestWatermark) bgCrestWatermark.src = HOUSE_CRESTS[houseName];
    
    actualizarMarcadorPuntos();
    guardarPreferencias();
};

// SIMULADOR DEL SOMBRERO SELECCIONADOR
document.getElementById('btn-sorting-hat').addEventListener('click', () => {
    MagicAudio.playSpellCast();
    
    // Inyectar clase de animación flotante pesada al escudo
    headerHouseCrest.classList.add('hat-animating');
    
    // Decisión final del sombrero desde el inicio
    const houseList = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff'];
    const chosenHouse = houseList[Math.floor(Math.random() * houseList.length)];
    
    const houseQuotes = {
        gryffindor: [
            "\"Mmm… no espera a sentirse listo. Salta primero, piensa después… peligroso, sí, pero también admirable.\"",
            "\"Hay palabras que hacen dudar a cualquiera. A este no. Este las mira como si fueran dragones pequeños.\"",
            "\"No le asusta fallar frente a todos; le asusta no intentarlo. Demasiado corazón, demasiada chispa… esto apunta a un lugar claro.\""
        ],
        ravenclaw: [
            "\"Silencio… está escuchando la palabra por dentro. No la repite: la desarma.\"",
            "\"Curioso caso. Donde otros oyen sonidos, aquí hay patrones, raíces, pistas… una mente que no se conforma.\"",
            "\"Podría responder rápido, pero prefiere pensar bien. Paciencia mental, ojos atentos, hambre de entender… difícil ignorarlo.\""
        ],
        hufflepuff: [
            "\"Ah, esto es distinto. No hay prisa, no hay arrogancia… solo una voluntad tranquila que no se rompe fácil.\"",
            "\"Letra por letra. Sin presumir. Sin rendirse. Así se construyen las victorias que nadie ve venir.\"",
            "\"No teme al trabajo duro; de hecho, parece conocerlo bien. Paciente, honesto, firme cuando importa… la decisión es clara.\""
        ],
        slytherin: [
            "\"Interesante… no está jugando solo para participar. Ya está calculando cómo ganar.\"",
            "\"Sabe cuándo esperar, cuándo arriesgar y cuándo callar. Eso no es suerte; eso es instinto.\"",
            "\"No le incomoda la presión; la convierte en ventaja. Ambición, control, mirada afilada… sí, aquí hay intención de victoria.\""
        ]
    };
    
    const quotes = houseQuotes[chosenHouse];
    
    // Crear una superposición modal mágica momentánea del sombrero
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md transition-all duration-300';
    overlay.innerHTML = `
        <div class="max-w-md space-y-6 flex flex-col items-center">
            <div class="relative w-32 h-32 flex items-center justify-center mb-2">
                <div class="absolute inset-0 rounded-full bg-yellow-500/20 blur-2xl animate-hat-glow"></div>
                <img src="multimedia/Sorting hat_logo.png" class="w-24 h-24 object-contain z-10 float-effect" alt="Sombrero Seleccionador">
            </div>
            <h2 class="font-magic text-2xl sm:text-3xl font-black text-yellow-500 animate-pulse text-center">¡El Sombrero Seleccionador piensa!</h2>
            <div class="border border-yellow-500/30 p-6 rounded-2xl bg-slate-950/80 font-mono text-sm leading-relaxed text-slate-300" id="hat-thinking-text">
                ${quotes[0]}
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    let step = 0;
    const interval = setInterval(() => {
        step++;
        if (step < 3) {
            document.getElementById('hat-thinking-text').innerText = quotes[step];
            MagicAudio.playClick();
        } else {
            clearInterval(interval);
            
            // Decisión final del sombrero
            const crest = HOUSE_CRESTS[chosenHouse];
            const name = HOUSE_NAMES_ES[chosenHouse].toUpperCase();
            
            overlay.innerHTML = `
                <div class="max-w-md space-y-6 animate-scale flex flex-col items-center">
                    <img src="${crest}" class="w-32 h-32 object-contain float-effect filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" alt="${name}">
                    <h2 class="font-magic text-3xl sm:text-4xl font-black text-yellow-400 tracking-wider">¡${name}!</h2>
                    <p class="text-slate-300 font-light px-4 leading-relaxed">
                        ¡El Sombrero Seleccionador te ha asignado formalmente a la noble casa de <b>${HOUSE_NAMES_ES[chosenHouse]}</b> por tus excepcionales dotes de deletreo!
                    </p>
                    <button id="btn-accept-sorting" class="btn-magic px-8 py-3 rounded-xl font-bold uppercase tracking-wider text-slate-950 mt-2">
                        Entrar a la Sala Común
                    </button>
                </div>
            `;
            
            MagicAudio.playSuccess();
            selectHouse(chosenHouse, false);
            
            document.getElementById('btn-accept-sorting').addEventListener('click', () => {
                headerHouseCrest.classList.remove('hat-animating');
                overlay.remove();
                MagicAudio.playSpellCast();
            });
        }
    }, 3500);
});

// ==========================================
// 7. SELECCIÓN DE NIVEL Y MODOS (COMPATIBLE)
// ==========================================
function cambiarEdicionRadio(val) {
    MagicAudio.playClick();
    const rInput = document.getElementById(`radio-lista-${val}`);
    if (rInput) {
        rInput.checked = true;
        rInput.dispatchEvent(new Event('change'));
    }
    cambiarEdicionRadioVisual(val);
    guardarPreferencias();
}

function cambiarEdicionRadioVisual(val) {
    const btn1 = document.getElementById('btn-edicion-1');
    const btn2 = document.getElementById('btn-edicion-2');
    
    if (val === '1') {
        btn1.className = "w-full text-left p-4 rounded-2xl border-2 border-yellow-500/50 bg-yellow-500/5 flex items-start gap-3 transition-all hover:border-yellow-400";
        btn1.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-yellow-400";
        
        btn2.className = "w-full text-left p-4 rounded-2xl border border-slate-800 bg-slate-950/40 flex items-start gap-3 transition-all hover:border-yellow-500/35";
        btn2.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-slate-300";
    } else {
        btn2.className = "w-full text-left p-4 rounded-2xl border-2 border-yellow-500/50 bg-yellow-500/5 flex items-start gap-3 transition-all hover:border-yellow-400";
        btn2.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-yellow-400";
        
        btn1.className = "w-full text-left p-4 rounded-2xl border border-slate-800 bg-slate-950/40 flex items-start gap-3 transition-all hover:border-yellow-500/35";
        btn1.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-slate-300";
    }
}

function cambiarModoJuego(mode, playSound = true) {
    if (playSound) MagicAudio.playClick();
    gameMode = mode;

    const btnW = document.getElementById('btn-mode-writing');
    const btnEx = document.getElementById('btn-mode-examiner');

    if (mode === 'writing') {
        btnW.className = "w-full text-left p-4 rounded-2xl border-2 border-yellow-500/50 bg-yellow-500/5 flex items-start gap-3 transition-all hover:border-yellow-400";
        btnW.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-yellow-400";
        
        btnEx.className = "w-full text-left p-4 rounded-2xl border border-slate-800 bg-slate-950/40 flex items-start gap-3 transition-all hover:border-yellow-500/35";
        btnEx.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-slate-300";
    } else {
        btnEx.className = "w-full text-left p-4 rounded-2xl border-2 border-yellow-500/50 bg-yellow-500/5 flex items-start gap-3 transition-all hover:border-yellow-400";
        btnEx.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-yellow-400";
        
        btnW.className = "w-full text-left p-4 rounded-2xl border border-slate-800 bg-slate-950/40 flex items-start gap-3 transition-all hover:border-yellow-500/35";
        btnW.querySelector('h4').className = "font-magic text-sm sm:text-base font-bold text-slate-300";
    }

    guardarPreferencias();
}

function actualizarMarcadorPuntos() {
    if (lblHousePointsTracker) {
        lblHousePointsTracker.innerHTML = `Puntos de Casa: <b class="text-yellow-400 font-bold">${housePoints}</b> ${streak >= 3 ? `<span class="text-amber-400 text-xs ml-1 font-mono">¡Racha x${streak}!</span>` : ''}`;
    }
}

// ==========================================
// 8. PROCESADOR DE TEXTO INTELIGENTE Y ROBUSTO (Resuelve Bugs Críticos)
// ==========================================
async function cargarListaActual() {
    const listaNum = document.querySelector('input[name="lista"]:checked').value;
    const archivo = `./resources/ListaPalabras_Ronda${listaNum}.txt`;
    
    try {
        btnIniciar.disabled = true;
        btnIniciar.innerText = "Cargando grimorio...";
        btnIniciar.classList.add('opacity-50', 'cursor-not-allowed');

        const respuesta = await fetch(archivo, { cache: 'no-store' });
        if (!respuesta.ok) throw new Error(`Archivo no encontrado: ${archivo}`);
        const texto = await respuesta.text();
        console.log(`Cargado exitosamente desde: ${archivo}`);

        procesarTexto(texto);
        renderizarCheckboxes();
        
        listaCargadaNum = listaNum; 
        
        btnIniciar.disabled = false;
        btnIniciar.innerText = "¡Comenzar Práctica Mágica!";
        btnIniciar.classList.remove('opacity-50', 'cursor-not-allowed');
        
    } catch (error) {
        console.error('Error:', error);
        paginasContainer.innerHTML = `<p class="text-red-400 text-center col-span-full">No se pudo abrir el pergamino de ${archivo}. Revisa la conexión o ubicación del archivo.</p>`;
        palabrasTodas = [];
        actualizarConteo();
        
        btnIniciar.innerText = "Error al abrir pergamino";
    }
}

function procesarTexto(texto) {
    palabrasTodas = [];
    const lineasRaw = texto.split('\n');
    const lineasProcesadas = [];
    
    // Soluciona el problema de saltos de línea dentro del campo de significado/descripción
    lineasRaw.forEach(linea => {
        const trimmed = linea.trim();
        if (!trimmed) return;
        
        // Detectar si la línea comienza una nueva palabra:
        // Formato 1: "1|word..."
        // Formato 2: "| 1 | word..."
        const isNewRecord = /^\d+\|/.test(trimmed) || /^\|\s*\d+\s*\|/.test(trimmed);
        
        if (isNewRecord) {
            lineasProcesadas.push(trimmed);
        } else {
            if (lineasProcesadas.length > 0) {
                // Acumula la descripción multilínea uniéndola con un espacio
                lineasProcesadas[lineasProcesadas.length - 1] += ' ' + trimmed;
            } else {
                lineasProcesadas.push(trimmed);
            }
        }
    });
    
    lineasProcesadas.forEach(linea => {
        let cleanLinea = linea;
        
        // Quita pipes externos iniciales/finales de tablas en markdown (ej. Ronda 2)
        if (cleanLinea.startsWith('|')) {
            cleanLinea = cleanLinea.substring(1);
        }
        if (cleanLinea.endsWith('|')) {
            cleanLinea = cleanLinea.substring(0, cleanLinea.length - 1);
        }
        
        const partes = cleanLinea.split('|').map(p => p.trim());
        if (partes.length < 2) return;
        
        const num = parseInt(partes[0]);
        if (isNaN(num)) return; // Salta encabezados de tabla o líneas inválidas
        
        let palabra = partes[1];
        let desc = '';
        let tipo = '';
        let pronunciacion = '';
        let significado = '';
        let dificultad = '';
        
        // Formato Ronda 1: num | palabra | desc
        if (partes.length === 2) {
            desc = '';
        } else if (partes.length === 3) {
            desc = partes[2];
        } 
        // Formato Ronda 2: num | word | type | pronunciation | meaning | dificulty
        else if (partes.length >= 5) {
            tipo = partes[2] || '';
            pronunciacion = partes[3] || '';
            significado = partes[4] || '';
            dificultad = partes[5] || '';
            
            // Ensamblar descripción formateada limpia y profesional
            let partsArray = [];
            if (tipo) partsArray.push(tipo);
            if (pronunciacion) partsArray.push(pronunciacion);
            if (significado) partsArray.push(significado);
            desc = partsArray.join(' ');
        }
        
        // Quitar comillas residuales alrededor de la descripción
        if (desc.startsWith('"') && desc.endsWith('"')) {
            desc = desc.substring(1, desc.length - 1);
        }
        
        const pag = Math.floor((num - 1) / PALABRAS_POR_PAGINA) + 1;
        
        palabrasTodas.push({ 
            num, 
            pag, 
            palabra, 
            desc, 
            tipo, 
            pronunciacion, 
            significado, 
            dificultad 
        });
    });
    
    palabrasTodas.sort((a, b) => a.num - b.num);
}

// ==========================================
// 9. RENDERIZACIÓN DE PAGINAS Y CONFIG (COMPATIBLE)
// ==========================================
function renderizarCheckboxes() {
    paginasContainer.innerHTML = '';
    if (palabrasTodas.length === 0) return;

    const maxPag = Math.max(...palabrasTodas.map(p => p.pag));
    
    for (let i = 1; i <= maxPag; i++) {
        const label = document.createElement('label');
        label.id = `label-check-pag-${i}`;
        label.className = "magic-checkbox-label cursor-pointer flex items-center space-x-3 bg-slate-950/40 p-3 rounded-2xl border border-slate-800 hover:border-yellow-500/30 transition-colors";
        
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.value = i;
        checkbox.className = "pagina-checkbox w-4 h-4 text-yellow-500 bg-slate-900 border-slate-700 rounded focus:ring-yellow-500";
        
        checkbox.addEventListener('change', (e) => {
            MagicAudio.playClick();
            if (e.target.checked) {
                label.classList.add('checked');
            } else {
                label.classList.remove('checked');
            }
            actualizarConteo();
        });
        
        const span = document.createElement('span');
        span.className = "text-sm sm:text-base font-magic text-slate-300 font-semibold";
        span.innerText = `Pág. ${i}`;
        
        label.appendChild(checkbox);
        label.appendChild(span);
        paginasContainer.appendChild(label);
    }
    actualizarConteo();
}

function actualizarConteo() {
    let total = 0;
    
    if (activeFilterType === 'pages') {
        const seleccionadas = obtenerPaginasSeleccionadas();
        if (seleccionadas.length === 0) {
            total = palabrasTodas.length;
        } else {
            total = palabrasTodas.filter(p => seleccionadas.includes(p.pag)).length;
        }
    } else {
        // Filtrar por dificultad (Estricto - Solo muestra las seleccionadas)
        total = palabrasTodas.filter(p => {
            const diffClean = (p.dificultad || '').trim().toLowerCase();
            return selectedDifficulties.includes(diffClean);
        }).length;
    }
    conteoPalabras.innerText = `Palabras: ${total}`; 
}

function obtenerPaginasSeleccionadas() {
    const checks = document.querySelectorAll('.pagina-checkbox:checked');
    return Array.from(checks).map(cb => parseInt(cb.value));
}

function toggleAll() {
    const checks = document.querySelectorAll('.pagina-checkbox');
    if (checks.length === 0) return;
    
    const todosMarcados = Array.from(checks).every(cb => cb.checked);
    checks.forEach(cb => {
        cb.checked = !todosMarcados;
        const lbl = document.getElementById(`label-check-pag-${cb.value}`);
        if (lbl) {
            if (!todosMarcados) {
                lbl.classList.add('checked');
            } else {
                lbl.classList.remove('checked');
            }
        }
    });
    actualizarConteo();
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// ==========================================
// 10. ARENA DE JUEGO MÁGICO (GAME LOOP)
// ==========================================
function iniciarJuego() {
    if (activeFilterType === 'pages') {
        const seleccionadas = obtenerPaginasSeleccionadas();
        if (seleccionadas.length > 0) {
            palabrasJuego = palabrasTodas.filter(p => seleccionadas.includes(p.pag));
        } else {
            palabrasJuego = [...palabrasTodas];
        }
    } else {
        // Filtro por dificultad (Estricto - Solo muestra las seleccionadas)
        palabrasJuego = palabrasTodas.filter(p => {
            const diffClean = (p.dificultad || '').trim().toLowerCase();
            return selectedDifficulties.includes(diffClean);
        });
    }

    if (palabrasJuego.length === 0) {
        alert("El Grimorio está vacío para la selección activa. Por favor, realiza otra selección.");
        return;
    }

    // Efecto de sonido de lanzamiento
    MagicAudio.playSpellCast();

    shuffle(palabrasJuego);
    correctas = [];
    incorrectas = [];
    indice = 0;
    
    // Resetear marcadores del juego
    streak = 0;
    actualizarMarcadorPuntos();

    viewConfig.classList.add('hidden');
    viewConfig.classList.remove('block');
    viewJuego.classList.remove('hidden');
    viewJuego.classList.add('block');

    // Configurar layout según Modo de Juego
    if (gameMode === 'writing') {
        controlsWriting.classList.remove('hidden');
        controlsExaminer.classList.add('hidden');
        wordHiddenDisplay.classList.remove('hidden');
        lblPalabra.classList.add('hidden');
        wordContainerBox.classList.add('hidden');
        btnRevealWord.classList.remove('hidden');
    } else {
        controlsWriting.classList.add('hidden');
        controlsExaminer.classList.remove('hidden');
        wordHiddenDisplay.classList.add('hidden');
        lblPalabra.classList.remove('hidden');
        wordContainerBox.classList.remove('hidden');
        btnRevealWord.classList.add('hidden');
    }

    mostrarSiguiente();
}

function mostrarSiguiente() {
    if (indice < palabrasJuego.length) {
        const p = palabrasJuego[indice];
        
        const edicionLabel = listaCargadaNum === '1' ? 'Primer Año: Fundamentos' : 'Segundo Año: Encantamientos';
        
        lblInfoLista.innerText = `${edicionLabel} · Pág. ${p.pag} · #${p.num}`;
        lblProgreso.innerText = `Progreso: ${indice + 1} de ${palabrasJuego.length}`;
        
        // Palabra principal
        lblPalabra.innerText = p.palabra;
        
        // Obtener dificultad de la palabra actual
        const diff = (p.dificultad || 'fácil').trim().toLowerCase();
        
        // Resetear clases de dificultad en el Badge, Contenedor y Palabra
        lblDificultadBadge.className = "absolute top-4 right-4 text-[10px] font-magic font-bold uppercase tracking-wider px-3 py-1 rounded-full select-none border transition-all bg-slate-950/80 border-slate-800 text-slate-400";
        wordContainerBox.className = "inline-block max-w-full break-words";
        
        // Asignar clases fijas y ajustar el tamaño de fuente dinámicamente según el espacio del contenedor
        lblPalabra.className = `magic-title font-black tracking-wide text-center select-none w-full text-white`;
        ajustarTamanoPalabra();
        
        // Asignar colores: fácil (verde), medio (azul), difícil (morado)
        if (diff === 'medio') {
            lblDificultadBadge.className = "absolute top-4 right-4 text-[10px] font-magic font-bold uppercase tracking-wider px-3 py-1 rounded-full select-none border transition-all border-blue-500/30 bg-blue-500/10 text-blue-400";
            lblDificultadBadge.innerText = 'Medio';
        } else if (diff === 'difícil') {
            lblDificultadBadge.className = "absolute top-4 right-4 text-[10px] font-magic font-bold uppercase tracking-wider px-3 py-1 rounded-full select-none border transition-all border-purple-500/30 bg-purple-500/10 text-purple-400";
            lblDificultadBadge.innerText = 'Difícil';
        } else { // fácil
            lblDificultadBadge.className = "absolute top-4 right-4 text-[10px] font-magic font-bold uppercase tracking-wider px-3 py-1 rounded-full select-none border transition-all border-green-500/30 bg-green-500/10 text-green-400";
            lblDificultadBadge.innerText = 'Fácil';
        }
        
        // Fonética
        if (p.pronunciacion) {
            lblPhonetics.innerText = p.pronunciacion;
            lblPhonetics.classList.remove('hidden');
        } else if (p.desc.includes('//')) {
            // Extraer fonética si está embebida en la descripción en formato //sonido//
            const match = p.desc.match(/\/\/.*?\/\//);
            if (match) {
                lblPhonetics.innerText = match[0];
                lblPhonetics.classList.remove('hidden');
            } else {
                lblPhonetics.classList.add('hidden');
            }
        } else {
            lblPhonetics.classList.add('hidden');
        }

        // Limpiar descripción de dobles slashes y fonética duplicada
        let cleanDesc = p.desc || "(Encantamiento sin descripción en los archivos)";
        cleanDesc = cleanDesc.replace(/\/\/.*?\/\//g, '').trim();
        lblDesc.innerText = cleanDesc;
        
        // Progress bar
        const porcentajeW = (indice / palabrasJuego.length) * 100;
        progressBar.style.width = `${Math.max(porcentajeW, 3)}%`;

        // Si es modo escritura, resetear campos
        if (gameMode === 'writing') {
            txtSpellInput.value = '';
            txtSpellInput.disabled = false;
            txtSpellInput.className = "flex-1 bg-slate-950/80 border-2 border-slate-800 focus:border-yellow-500/60 rounded-xl px-4 py-3 sm:py-4 text-white text-base sm:text-lg placeholder-slate-600 outline-none transition-all tracking-wide";
            
            document.getElementById('btn-cast-spell').style.display = 'flex';
            
            spellFeedback.classList.add('hidden');
            spellFeedback.className = "hidden text-center py-2 rounded-xl transition-all";
            
            wordHiddenDisplay.classList.remove('hidden');
            lblPalabra.classList.add('hidden');
            wordContainerBox.classList.add('hidden');
            btnRevealWord.classList.remove('hidden');
            txtSpellInput.focus();
        }

        // Pronunciar la palabra automáticamente después de una breve pausa
        setTimeout(() => {
            if (!viewJuego.classList.contains('hidden') && indice < palabrasJuego.length) {
                WizardTTS.speak(p.palabra);
            }
        }, 400);

    } else {
        mostrarResultados();
    }
}

// Ajusta dinámicamente el tamaño de la palabra principal para que quepa en su contenedor
function ajustarTamanoPalabra() {
    if (!lblPalabra) return;
    
    const parent = document.getElementById('game-card');
    if (!parent) return;
    
    // Ancho máximo disponible (con un 85% seguro del contenedor de la tarjeta)
    const maxAvailableWidth = parent.clientWidth * 0.85;
    if (maxAvailableWidth <= 0) return;
    
    // Si está oculto temporalmente, se muestra para poder medir su scrollWidth real
    const wasHidden = lblPalabra.classList.contains('hidden');
    if (wasHidden) {
        lblPalabra.classList.remove('hidden');
    }
    
    const isMobile = window.innerWidth < 640;
    let fontSize = isMobile ? 2.3 : 3.5; // en rem por defecto
    
    lblPalabra.style.fontSize = `${fontSize}rem`;
    lblPalabra.style.whiteSpace = 'nowrap';
    
    // Bucle interactivo de ajuste de tamaño de fuente
    let safetyCounter = 0;
    while (lblPalabra.scrollWidth > maxAvailableWidth && fontSize > 1.2 && safetyCounter < 50) {
        fontSize -= 0.1;
        lblPalabra.style.fontSize = `${fontSize}rem`;
        safetyCounter++;
    }
    
    // Restaurar visibilidad original del pergamino
    if (wasHidden) {
        lblPalabra.classList.add('hidden');
    }
}

// Revela manualmente el deletreo en modo de Escritura u oculto (cast Aparecium!)
function revelarPalabraManual() {
    MagicAudio.playSpellCast();
    lblPalabra.classList.remove('hidden');
    wordContainerBox.classList.remove('hidden');
    wordHiddenDisplay.classList.add('hidden');
    btnRevealWord.classList.add('hidden');
    ajustarTamanoPalabra();
}

// ==========================================
// 11. EVALUADOR INTERACTIVO DE ESCRITURA
// ==========================================
function evaluarEscrituraMagica() {
    if (indice >= palabrasJuego.length) return;
    
    const wordObj = palabrasJuego[indice];
    const userSpelling = txtSpellInput.value.trim();
    const correctSpelling = wordObj.palabra.trim();

    if (!userSpelling) {
        txtSpellInput.focus();
        return;
    }

    txtSpellInput.disabled = true;
    const btnCast = document.getElementById('btn-cast-spell');

    if (userSpelling === correctSpelling) {
        // Acierto!
        correctas.push(wordObj);
        
        // Revelar la palabra correcta de fondo en el pergamino
        revelarPalabraManual();

        // Sumar puntos e incremental por racha
        streak++;
        if (streak > maxStreak) maxStreak = streak;
        const ptsGained = 10 + (Math.floor(streak / 3) * 5); // Combo bonus!
        housePoints += ptsGained;
        actualizarMarcadorPuntos();

        // Sonido y feedback visual
        MagicAudio.playSuccess();
        spellFeedback.className = "block bg-green-500/15 border border-green-500/30 text-green-400 py-3 px-4 rounded-xl text-sm font-semibold animate-pulse";
        spellFeedback.innerHTML = `<b>¡Hechizo correcto!</b> <span class="text-white">+${ptsGained} Pts</span>`;
        spellFeedback.classList.remove('hidden');

        // Poner botón verde con "Correcto" por 500ms
        btnCast.innerText = "Correcto";
        btnCast.style.background = "#22c55e";
        btnCast.style.color = "#ffffff";
        btnCast.disabled = true;

        setTimeout(() => {
            btnCast.style.display = 'none';
            btnCast.innerText = "Conjurar";
            btnCast.style.background = "";
            btnCast.style.color = "";
            btnCast.disabled = false;
        }, 500);

        // Avanzar automáticamente después de 1.6 segundos
        setTimeout(() => {
            indice++;
            mostrarSiguiente();
        }, 1600);

    } else {
        // Error!
        incorrectas.push({ ...wordObj, intentoUsuario: userSpelling });
        streak = 0;
        actualizarMarcadorPuntos();

        // Efecto vibración de error a la tarjeta
        gameCard.classList.add('shake-effect');
        setTimeout(() => gameCard.classList.remove('shake-effect'), 500);

        // Sonido y feedback visual
        MagicAudio.playError();
        txtSpellInput.className = "flex-1 bg-slate-950/80 border-2 border-red-500/60 rounded-xl px-4 py-3 sm:py-4 text-red-300 text-base sm:text-lg placeholder-slate-600 outline-none transition-all tracking-wide";
        
        spellFeedback.className = "block bg-red-500/15 border border-red-500/30 text-red-400 py-3 px-4 rounded-xl text-sm font-semibold animate-pulse";
        spellFeedback.innerHTML = `<b>Hechizo fallido...</b>`;
        spellFeedback.classList.remove('hidden');

        // Poner botón rojo con "Incorrecto" por 500ms
        btnCast.innerText = "Incorrecto";
        btnCast.style.background = "#dc2626";
        btnCast.style.color = "#ffffff";
        btnCast.disabled = true;

        setTimeout(() => {
            btnCast.style.display = 'none';
            btnCast.innerText = "Conjurar";
            btnCast.style.background = "";
            btnCast.style.color = "";
            btnCast.disabled = false;
        }, 500);

        // Avanzar automáticamente después de 1.6 segundos
        setTimeout(() => {
            indice++;
            mostrarSiguiente();
        }, 1600);
    }
    
    guardarPreferencias();
}

// Resalta visualmente las diferencias para que el estudiante aprenda rápido
function resaltarDiferenciasSpell(escrita, correcta) {
    let result = '';
    const maxLen = Math.max(escrita.length, correcta.length);
    for (let i = 0; i < maxLen; i++) {
        const charEscrita = escrita[i] || '';
        const charCorrecta = correcta[i] || '';
        
        if (charEscrita === charCorrecta) {
            result += `<span class="text-slate-400">${charEscrita}</span>`;
        } else {
            result += `<span class="bg-red-900/60 text-red-200 border border-red-500/40 px-0.5 rounded font-black">${charEscrita || '•'}</span>`;
        }
    }
    return result;
}

// ==========================================
// 12. EVALUADOR MANUAL (MODO EXAMINADOR)
// ==========================================
function marcarCorrecto() {
    if (indice < palabrasJuego.length) {
        correctas.push(palabrasJuego[indice]);
        
        // Sumar puntos
        streak++;
        if (streak > maxStreak) maxStreak = streak;
        const ptsGained = 10 + (Math.floor(streak / 3) * 5);
        housePoints += ptsGained;
        actualizarMarcadorPuntos();

        MagicAudio.playSuccess();
        indice++;
        mostrarSiguiente();
        guardarPreferencias();
    }
}

function marcarIncorrecto() {
    if (indice < palabrasJuego.length) {
        incorrectas.push(palabrasJuego[indice]);
        streak = 0;
        actualizarMarcadorPuntos();

        MagicAudio.playError();
        indice++;
        mostrarSiguiente();
        guardarPreferencias();
    }
}

// ==========================================
// 13. CEREMONIA DE RESULTADOS (COPA DE LAS CASAS)
// ==========================================
function mostrarResultados() {
    viewJuego.classList.add('hidden');
    viewJuego.classList.remove('block');
    viewResultados.classList.remove('hidden');
    viewResultados.classList.add('block');

    const total = correctas.length + incorrectas.length;
    const porcentaje = total === 0 ? 0 : (correctas.length / total) * 100;

    // Calcular puntos de casa ganados en esta sesión
    const puntosGanadosSesion = correctas.length * 10 + (maxStreak * 2);

    lblPorcentaje.innerText = `${porcentaje.toFixed(1)}%`;
    lblDetalleScore.innerText = `Aciertos: ${correctas.length} • Errores: ${incorrectas.length}`;
    lblHousePointsWon.innerText = `¡+${puntosGanadosSesion} Puntos ganados para la casa de ${HOUSE_NAMES_ES[selectedHouse]}!`;

    // Asignar colores de porcentaje dinámicos
    lblPorcentaje.className = "text-4xl sm:text-5xl font-black " + 
        (porcentaje >= 80 ? "text-green-400" : (porcentaje >= 50 ? "text-amber-400" : "text-red-400"));

    // Rango de calificacion del mago
    let rangoMago = '';
    
    if (porcentaje === 100) {
        rangoMago = 'Mago Supremo (Orden de Merlín)';
    } else if (porcentaje >= 85) {
        rangoMago = 'Prefecto de Hogwarts';
    } else if (porcentaje >= 65) {
        rangoMago = 'Estudiante Aventajado';
    } else if (porcentaje >= 40) {
        rangoMago = 'Aprendiz de Pociones';
    } else if (porcentaje > 0) {
        rangoMago = 'Muggle en Entrenamiento';
    } else {
        rangoMago = 'Squib Confundido';
    }

    lblRangoMago.innerText = rangoMago;
    resultsCrest.src = HOUSE_CRESTS[selectedHouse];

    // Tocar sonido ceremonioso
    if (porcentaje >= 75) {
        MagicAudio.playSuccess();
        setTimeout(() => MagicAudio.playSpellCast(), 400);
    } else {
        MagicAudio.playError();
    }

    // Renderizar la tabla de refuerzo si hay errores
    if (incorrectas.length > 0) {
        refuerzoContainer.classList.remove('hidden');
        tablaRefuerzo.innerHTML = '';
        
        const edicionLabel = listaCargadaNum === '1' ? 'Primer Año' : 'Segundo Año';

        incorrectas.sort((a, b) => a.num - b.num).forEach(p => {
            const tr = document.createElement('tr');
            tr.className = "hover:bg-slate-900/60 transition-colors text-xs sm:text-sm text-slate-300";
            
            // Botón de reproducción de audio individual
            const btnSpeakCell = document.createElement('button');
            btnSpeakCell.className = "w-8 h-8 rounded-full bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 flex items-center justify-center border border-yellow-500/20 transition-all text-xs";
            btnSpeakCell.innerHTML = `<svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z"></path></svg>`;
            btnSpeakCell.addEventListener('click', () => WizardTTS.speak(p.palabra));

            // Crear columnas estructuradas
            const tdEd = document.createElement('td');
            tdEd.className = "py-4 px-4 text-center border-t border-slate-800 font-magic";
            tdEd.innerText = edicionLabel;

            const tdPag = document.createElement('td');
            tdPag.className = "py-4 px-4 text-center border-t border-slate-800";
            tdPag.innerText = `Pág. ${p.pag}`;

            const tdNum = document.createElement('td');
            tdNum.className = "py-4 px-4 text-center border-t border-slate-800 font-mono";
            tdNum.innerText = `#${p.num}`;

            const tdWord = document.createElement('td');
            tdWord.className = "py-4 px-4 border-t border-slate-800 font-bold text-center text-emerald-400";
            tdWord.innerText = p.palabra;

            const tdWritten = document.createElement('td');
            tdWritten.className = "py-4 px-4 border-t border-slate-800 font-bold text-center font-mono";
            if (p.intentoUsuario !== undefined) {
                tdWritten.innerHTML = resaltarDiferenciasSpell(p.intentoUsuario, p.palabra);
            } else {
                tdWritten.innerHTML = `<span class="text-slate-500 font-light italic">Manual</span>`;
            }

            const tdAudio = document.createElement('td');
            tdAudio.className = "py-4 px-4 border-t border-slate-800 flex justify-center items-center";
            tdAudio.appendChild(btnSpeakCell);

            tr.appendChild(tdEd);
            tr.appendChild(tdPag);
            tr.appendChild(tdNum);
            tr.appendChild(tdWord);
            tr.appendChild(tdWritten);
            tr.appendChild(tdAudio);

            tablaRefuerzo.appendChild(tr);
        });
    } else {
        refuerzoContainer.classList.add('hidden');
    }
}

function reiniciar() {
    MagicAudio.playClick();
    viewResultados.classList.add('hidden');
    viewResultados.classList.remove('block');
    viewConfig.classList.remove('hidden');
    viewConfig.classList.add('block');
    
    progressBar.style.width = '0%';
    
    cargarListaActual();
}

// ==========================================
// 14. BIBLIOTECA / EXPLORADOR DE PALABRAS (GRIMORIO)
// ==========================================
async function abrirBiblioteca() {
    MagicAudio.playSpellCast();
    modalBiblioteca.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Evitar scroll de fondo
    
    libActiveListNum = document.querySelector('input[name="lista"]:checked')?.value || '1';
    await cargarDatosBiblioteca();
}

function cerrarBiblioteca() {
    MagicAudio.playClick();
    modalBiblioteca.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Habilitar scroll
}

async function cambiarLibEdicion(num) {
    MagicAudio.playClick();
    libActiveListNum = num;
    
    // Toggle clases visuales de botones
    const btn1 = document.getElementById('btn-lib-ed-1');
    const btn2 = document.getElementById('btn-lib-ed-2');
    if (num === '1') {
        btn1.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-magic border-2 border-yellow-500/50 bg-yellow-500/10 text-yellow-400";
        btn2.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-magic border border-slate-800 bg-slate-950 text-slate-400";
    } else {
        btn2.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-magic border-2 border-yellow-500/50 bg-yellow-500/10 text-yellow-400";
        btn1.className = "px-4 py-2 rounded-xl text-xs sm:text-sm font-magic border border-slate-800 bg-slate-950 text-slate-400";
    }
    
    await cargarDatosBiblioteca();
}

async function cargarDatosBiblioteca() {
    const archivo = `./resources/ListaPalabras_Ronda${libActiveListNum}.txt`;
    libWordList.innerHTML = `<p class="text-slate-500 text-center col-span-full animate-pulse my-10">Desenrollando pergamino de palabras...</p>`;
    
    try {
        const respuesta = await fetch(archivo, { cache: 'no-store' });
        if (!respuesta.ok) throw new Error(`Archivo no encontrado: ${archivo}`);
        const texto = await respuesta.text();
        
        // Procesar temporalmente para la biblioteca
        procesarTextoBiblioteca(texto);
        renderizarBibliotecaPalabras();
    } catch (e) {
        console.error('Error cargando biblioteca:', e);
        libWordList.innerHTML = `<p class="text-red-400 text-center col-span-full py-10">Error al consultar el grimorio en ${archivo}.</p>`;
    }
}

function procesarTextoBiblioteca(texto) {
    libPalabrasCached = [];
    const lineasRaw = texto.split('\n');
    const lineasProcesadas = [];
    
    lineasRaw.forEach(linea => {
        const trimmed = linea.trim();
        if (!trimmed) return;
        const isNewRecord = /^\d+\|/.test(trimmed) || /^\|\s*\d+\s*\|/.test(trimmed);
        if (isNewRecord) {
            lineasProcesadas.push(trimmed);
        } else {
            if (lineasProcesadas.length > 0) {
                lineasProcesadas[lineasProcesadas.length - 1] += ' ' + trimmed;
            } else {
                lineasProcesadas.push(trimmed);
            }
        }
    });
    
    lineasProcesadas.forEach(linea => {
        let cleanLinea = linea;
        if (cleanLinea.startsWith('|')) cleanLinea = cleanLinea.substring(1);
        if (cleanLinea.endsWith('|')) cleanLinea = cleanLinea.substring(0, cleanLinea.length - 1);
        
        const partes = cleanLinea.split('|').map(p => p.trim());
        if (partes.length < 2) return;
        
        const num = parseInt(partes[0]);
        if (isNaN(num)) return;
        
        let palabra = partes[1];
        let desc = '';
        let tipo = '';
        let pronunciacion = '';
        
        if (partes.length === 2) {
            desc = '';
        } else if (partes.length === 3) {
            desc = partes[2];
        } else if (partes.length >= 5) {
            tipo = partes[2] || '';
            pronunciacion = partes[3] || '';
            const significado = partes[4] || '';
            const dif = partes[5] || '';
            
            let partsArray = [];
            if (tipo) partsArray.push(tipo);
            if (pronunciacion) partsArray.push(pronunciacion);
            if (significado) partsArray.push(significado);
            desc = partsArray.join(' ');
        }
        
        if (desc.startsWith('"') && desc.endsWith('"')) {
            desc = desc.substring(1, desc.length - 1);
        }
        
        const pag = Math.floor((num - 1) / PALABRAS_POR_PAGINA) + 1;
        
        libPalabrasCached.push({ num, pag, palabra, desc, tipo, pronunciacion });
    });
    libPalabrasCached.sort((a, b) => a.num - b.num);
}

function renderizarBibliotecaPalabras() {
    libWordList.innerHTML = '';
    
    const query = txtLibSearch.value.trim().toLowerCase();
    const filtradas = libPalabrasCached.filter(p => {
        return p.palabra.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
    });
    
    if (filtradas.length === 0) {
        libWordList.innerHTML = `<p class="text-slate-500 text-center col-span-full py-12">Ninguna palabra mágica coincide con tu búsqueda.</p>`;
        return;
    }
    
    filtradas.forEach(p => {
        const card = document.createElement('div');
        card.className = "bg-slate-900/50 border border-slate-800/80 p-4 rounded-2xl hover:border-yellow-500/20 transition-all flex items-start justify-between gap-3 text-left relative overflow-hidden group";
        
        // Limpieza de descripción para el listado de biblioteca
        let cleanDesc = p.desc || "(Sin descripción)";
        cleanDesc = cleanDesc.replace(/\/\/.*?\/\//g, '').trim();

        // Extraer fonética si existe
        let foneticaStr = '';
        if (p.pronunciacion) {
            foneticaStr = p.pronunciacion;
        } else {
            const match = p.desc.match(/\/\/.*?\/\//);
            if (match) foneticaStr = match[0];
        }

        const infoDiv = document.createElement('div');
        infoDiv.className = "flex-1 space-y-1";
        infoDiv.innerHTML = `
            <div class="flex items-center gap-2">
                <span class="text-xs font-semibold bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800 font-mono">Pág. ${p.pag}</span>
                <span class="text-xs font-mono text-yellow-500/60 font-semibold">#${p.num}</span>
            </div>
            <h4 class="font-sans text-base font-bold text-yellow-400 tracking-wide group-hover:text-white transition-colors">${p.palabra}</h4>
            ${foneticaStr ? `<p class="text-xs font-mono text-slate-500">${foneticaStr}</p>` : ''}
            <p class="text-xs sm:text-sm text-slate-400 leading-relaxed font-light line-clamp-2" title="${cleanDesc}">${cleanDesc}</p>
        `;

        const btnSpeak = document.createElement('button');
        btnSpeak.className = "w-10 h-10 rounded-full bg-yellow-500/5 hover:bg-yellow-500/15 text-yellow-500 border border-yellow-500/20 hover:border-yellow-400 flex items-center justify-center text-sm transition-all flex-shrink-0 group-hover:scale-105 self-center";
        btnSpeak.innerHTML = `<svg class="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M12 18.75V5.25L7.75 9.5H4.5v5h3.25L12 18.75z"></path></svg>`;
        btnSpeak.addEventListener('click', () => {
            MagicAudio.playClick();
            WizardTTS.speak(p.palabra);
        });

        card.appendChild(infoDiv);
        card.appendChild(btnSpeak);
        libWordList.appendChild(card);
    });
}

// ==========================================
// 15. SELECCIÓN DE FILTRO: PÁGINAS O DIFICULTAD
// ==========================================
function setFilterType(type) {
    MagicAudio.playClick();
    activeFilterType = type;
    
    const btnPages = document.getElementById('btn-filter-type-pages');
    const btnDiff = document.getElementById('btn-filter-type-difficulty');
    const pagContainer = document.getElementById('paginas-container');
    const diffContainer = document.getElementById('difficulty-container');
    const btnToggleAll = document.getElementById('btn-toggle-all');
    const pagSublabel = document.getElementById('pag-sublabel');

    if (type === 'pages') {
        btnPages.className = "py-1.5 px-3 rounded-lg font-magic font-bold transition-all bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
        btnDiff.className = "py-1.5 px-3 rounded-lg font-magic font-bold transition-all text-slate-400";
        
        pagContainer.classList.remove('hidden');
        diffContainer.classList.add('hidden');
        btnToggleAll.classList.remove('hidden');
        pagSublabel.innerText = "Selecciona páginas específicas o practica el libro completo.";
    } else {
        btnDiff.className = "py-1.5 px-3 rounded-lg font-magic font-bold transition-all bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
        btnPages.className = "py-1.5 px-3 rounded-lg font-magic font-bold transition-all text-slate-400";
        
        pagContainer.classList.add('hidden');
        diffContainer.classList.remove('hidden');
        btnToggleAll.classList.add('hidden');
        pagSublabel.innerText = "Selecciona una o más dificultades para iniciar tu práctica.";
        
        if (selectedDifficulties.length === 0) {
            toggleDifficultyFilter('fácil', false); // Selecciona facil por defecto
        }
    }
    actualizarConteo();
}

window.toggleDifficultyFilter = function(diff, playSound = true) {
    if (playSound) MagicAudio.playClick();

    const index = selectedDifficulties.indexOf(diff);
    if (index > -1) {
        selectedDifficulties.splice(index, 1);
    } else {
        selectedDifficulties.push(diff);
    }

    // Actualizar clases visuales de los botones de dificultad
    const diffCards = {
        'fácil': { btn: document.getElementById('btn-diff-facil'), colorClass: 'border-green-500/40 bg-green-500/5 text-green-400', emoji: '' },
        'medio': { btn: document.getElementById('btn-diff-medio'), colorClass: 'border-blue-500/40 bg-blue-500/5 text-blue-400', emoji: '' },
        'difícil': { btn: document.getElementById('btn-diff-dificil'), colorClass: 'border-purple-500/40 bg-purple-500/5 text-purple-400', emoji: '' }
    };

    Object.keys(diffCards).forEach(key => {
        const item = diffCards[key];
        if (selectedDifficulties.includes(key)) {
            item.btn.className = `diff-card magic-card p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border-2 ${item.colorClass} transition-all hover:scale-105`;
            item.btn.querySelector('h4').className = `font-magic text-sm sm:text-base font-bold text-white`;
        } else {
            item.btn.className = `diff-card magic-card p-5 rounded-2xl flex flex-col items-center justify-center text-center gap-3 border border-slate-800 bg-slate-950/40 transition-all hover:scale-105`;
            item.btn.querySelector('h4').className = `font-magic text-sm sm:text-base font-bold text-slate-300`;
        }
    });

    actualizarConteo();
};