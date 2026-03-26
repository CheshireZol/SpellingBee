import tkinter as tk
from tkinter import ttk, messagebox
import random
from pathlib import Path

# ==========================
# Configuración de Estilo (DARK MODE)
# ==========================
COLORS = {
    "bg": "#0F172A",          # Slate 900 (Fondo principal)
    "card": "#1E293B",        # Slate 800 (Tarjetas y Contenedores)
    "primary": "#6366F1",     # Indigo 500 (Botones y Acentos)
    "primary_hover": "#4F46E5",
    "success": "#10B981",     # Emerald 500 (Aciertos)
    "success_hover": "#059669",
    "error": "#F43F5E",       # Rose 500 (Errores)
    "error_hover": "#E11D48",
    "text_main": "#F8FAFC",   # Slate 50 (Texto Principal)
    "text_muted": "#94A3B8",  # Slate 400 (Texto Secundario)
    "shadow": "#050914"       # Sombra (Muy oscuro)
}

FONTS = {
    "title": ("Segoe UI", 26, "bold"),
    "subtitle": ("Segoe UI", 16, "bold"),
    "word": ("Segoe UI", 48, "bold"),
    "body": ("Segoe UI", 14),
    "info": ("Segoe UI", 11),
    "button": ("Segoe UI", 13, "bold")
}

# ==========================
# Config: rutas de archivos
# ==========================
BASE_DIR = Path(__file__).resolve().parent
RUTA_L1 = BASE_DIR / "ListaPalabras_Ronda1.txt"
RUTA_L2 = BASE_DIR / "ListaPalabras_Ronda2.txt"

PALABRAS_POR_PAGINA = 20

# ==========================
# Funciones Gráficas Auxiliares
# ==========================
def draw_rounded_rect(canvas, x1, y1, x2, y2, r, **kwargs):
    """ Dibuja un rectángulo con esquinas redondeadas en un Canvas """
    points = [
        x1+r, y1,  x2-r, y1,  x2, y1,  x2, y1+r,
        x2, y2-r,  x2, y2,  x2-r, y2,  x1+r, y2,
        x1, y2,  x1, y2-r,  x1, y1+r,  x1, y1
    ]
    return canvas.create_polygon(points, smooth=True, **kwargs)

def center_window(root, width, height):
    screen_width = root.winfo_screenwidth()
    screen_height = root.winfo_screenheight()
    x = (screen_width - width) // 2
    y = (screen_height - height) // 2
    root.geometry(f"{width}x{height}+{x}+{y}")

# ==========================
# Componentes UI Avanzados
# ==========================
class RoundedFrame(tk.Canvas):
    """ Un contenedor tipo tarjeta con bordes redondeados y sombra. """
    def __init__(self, parent, bg_color=COLORS["card"], radius=15, padding=20, shadow=True, **kwargs):
        super().__init__(parent, background=COLORS["bg"], highlightthickness=0, **kwargs)
        self.bg_color = bg_color
        self.radius = radius
        self.padding = padding
        self.shadow = shadow
        
        # Frame interior donde se colocarán los widgets
        self.content = tk.Frame(self, bg=self.bg_color)
        self.window_id = self.create_window(padding, padding, window=self.content, anchor="nw")
        
        self.bind("<Configure>", self._on_resize)
        
    def _on_resize(self, event):
        w, h = event.width, event.height
        self.delete("bg")
        
        offset = 5 if self.shadow else 0
        if self.shadow:
            # Dibujar Sombra
            draw_rounded_rect(self, offset, offset, w, h, self.radius, fill=COLORS["shadow"], tags="bg")
        
        # Dibujar Tarjeta Principal
        draw_rounded_rect(self, 0, 0, w-offset, h-offset, self.radius, fill=self.bg_color, tags="bg")
        
        # Redimensionar frame interior
        self.itemconfig(self.window_id, width=w - (self.padding*2) - offset, height=h - (self.padding*2) - offset)
        self.tag_lower("bg")

class RoundedButton(tk.Canvas):
    """ Un botón elegante interactivo con bordes redondeados, sombra y efecto de presión. """
    def __init__(self, parent, text, bg_color, hover_color, command=None, radius=12, height=60, **kwargs):
        super().__init__(parent, background=COLORS["bg"], highlightthickness=0, height=height, **kwargs)
        self.text = text
        self.bg_color = bg_color
        self.hover_color = hover_color
        self.command = command
        self.radius = radius
        self.current_color = bg_color
        self.pressed = False

        self.bind("<Configure>", self._on_resize)
        self.bind("<Enter>", self._on_enter)
        self.bind("<Leave>", self._on_leave)
        self.bind("<Button-1>", self._on_click)
        self.bind("<ButtonRelease-1>", self._on_release)

    def _on_resize(self, event):
        self.draw()

    def draw(self):
        self.delete("all")
        w, h = self.winfo_width(), self.winfo_height()
        if w <= 1 or h <= 1: return
        
        offset_y = 3 if self.pressed else 0
        shadow_h = 5
        
        # Sombra
        if not self.pressed:
            draw_rounded_rect(self, 0, shadow_h, w, h, self.radius, fill=COLORS["shadow"])

        # Cuerpo principal del botón
        draw_rounded_rect(self, 0, offset_y, w, h - shadow_h + offset_y, self.radius, fill=self.current_color)

        # Texto centrado (soporta saltos de línea)
        text_y = (h - shadow_h) // 2 + offset_y
        self.create_text(w//2, text_y, text=self.text, fill="white", font=FONTS["button"], justify="center")

    def _on_enter(self, e):
        self.current_color = self.hover_color
        self.draw()

    def _on_leave(self, e):
        self.current_color = self.bg_color
        self.pressed = False
        self.draw()

    def _on_click(self, e):
        self.pressed = True
        self.draw()

    def _on_release(self, e):
        if self.pressed:
            self.pressed = False
            self.draw()
            if self.command:
                self.command()

# ==========================
# Lógica de datos
# ==========================
def cargar_palabras_con_pagina(ruta_archivo):
    palabras = []
    if not ruta_archivo.exists():
        return []
    try:
        with open(ruta_archivo, 'r', encoding='utf-8') as f:
            for linea in f:
                linea = linea.strip()
                if '|' not in linea: continue
                partes = linea.split('|')
                if len(partes) < 3: continue
                try:
                    num = int(partes[0])
                    palabra = partes[1].strip()
                    desc = partes[2].strip()
                    pagina = (num - 1) // PALABRAS_POR_PAGINA + 1
                    
                    palabras.append({
                        "num": num,
                        "pag": pagina,
                        "palabra": palabra,
                        "desc": desc
                    })
                except ValueError: continue
        palabras.sort(key=lambda x: x["num"])
    except Exception as e:
        print(f"Error cargando archivo: {e}")
    return palabras

# ==========================
# Aplicación Principal
# ==========================
class SpellingBeeApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Spelling Bee - Pro Dark Edition")
        center_window(self.root, 950, 780)
        self.root.configure(bg=COLORS["bg"])
        
        # Variables de estado
        self.palabras_juego = []
        self.correctas = []
        self.incorrectas = []
        self.indice = 0
        self.lista_var = tk.IntVar(value=1)
        self.checkbox_vars = []

        self._setup_ui()
        self.refrescar_paginas()
        
        # Bindings globales
        self.root.bind("<Right>", lambda e: self.marcar_correcto() if self.frame_juego.winfo_viewable() else None)
        self.root.bind("<Left>", lambda e: self.marcar_incorrecto() if self.frame_juego.winfo_viewable() else None)
        self.root.bind("1", lambda e: self.marcar_correcto() if self.frame_juego.winfo_viewable() else None)
        self.root.bind("2", lambda e: self.marcar_incorrecto() if self.frame_juego.winfo_viewable() else None)

    def _setup_ui(self):
        self.main_container = tk.Frame(self.root, bg=COLORS["bg"])
        self.main_container.pack(fill="both", expand=True, padx=40, pady=30)

        self.frame_config = tk.Frame(self.main_container, bg=COLORS["bg"])
        self.frame_juego = tk.Frame(self.main_container, bg=COLORS["bg"])
        self.frame_resultados = tk.Frame(self.main_container, bg=COLORS["bg"])

        self._build_config_ui()
        self._build_juego_ui()
        self._build_resultados_ui()

        self.frame_config.pack(fill="both", expand=True)

    # --- CONSTRUCCIÓN DE INTERFAZ ---
    def _build_config_ui(self):
        header = tk.Label(self.frame_config, text="Configuración de Práctica", font=FONTS["title"], fg=COLORS["text_main"], bg=COLORS["bg"])
        header.pack(pady=(0, 20), anchor="w")

        # Tarjeta Redondeada 1: Lista
        self.ronda_card = RoundedFrame(self.frame_config, height=120)
        self.ronda_card.pack(fill="x", pady=15)
        self.ronda_card.pack_propagate(False)

        lbl_lista = tk.Label(self.ronda_card.content, text="1. Selecciona la Lista", font=FONTS["subtitle"], bg=COLORS["card"], fg=COLORS["primary"])
        lbl_lista.pack(anchor="w", pady=(0, 10))

        frame_radios = tk.Frame(self.ronda_card.content, bg=COLORS["card"])
        frame_radios.pack(anchor="w")

        for i in range(1, 3):
            rb = tk.Radiobutton(frame_radios, text=f"Lista {i}", variable=self.lista_var, value=i, 
                                bg=COLORS["card"], fg=COLORS["text_main"], font=FONTS["body"], 
                                command=self.refrescar_paginas, activebackground=COLORS["card"], 
                                activeforeground=COLORS["primary"], selectcolor=COLORS["bg"], cursor="hand2")
            rb.pack(side="left", padx=(0, 30))

        # Tarjeta Redondeada 2: Páginas
        self.pags_card = RoundedFrame(self.frame_config)
        self.pags_card.pack(fill="both", expand=True, pady=10)

        top_pags_frame = tk.Frame(self.pags_card.content, bg=COLORS["card"])
        top_pags_frame.pack(fill="x", pady=(0, 15))

        lbl_pags = tk.Label(top_pags_frame, text="2. Selecciona las Páginas", font=FONTS["subtitle"], bg=COLORS["card"], fg=COLORS["primary"])
        lbl_pags.pack(side="left")

        self.info_conteo = tk.Label(top_pags_frame, text="Palabras seleccionadas: 0", font=FONTS["body"], bg=COLORS["card"], fg=COLORS["text_muted"])
        self.info_conteo.pack(side="left", padx=20)

        btn_toggle = tk.Button(top_pags_frame, text="Marcar/Desmarcar Todo", font=FONTS["info"], bg=COLORS["card"], fg=COLORS["text_muted"], relief="flat", cursor="hand2", command=self.toggle_all, activebackground=COLORS["card"], activeforeground=COLORS["text_main"])
        btn_toggle.pack(side="right")

        self.frame_checks = tk.Frame(self.pags_card.content, bg=COLORS["card"])
        self.frame_checks.pack(fill="both", expand=True)

        self.btn_iniciar = RoundedButton(self.frame_config, text="Comenzar Práctica", bg_color=COLORS["primary"], hover_color=COLORS["primary_hover"], height=60, command=self.iniciar_juego)
        self.btn_iniciar.pack(fill="x", pady=(25, 0))

    def _build_juego_ui(self):
        # Header Superior
        self.game_header = tk.Frame(self.frame_juego, bg=COLORS["bg"])
        self.game_header.pack(fill="x", pady=(0, 15))

        self.lbl_list_page = tk.Label(self.game_header, text="Lista 1  ·  Pág. 1  ·  Palabra #1", font=FONTS["subtitle"], fg=COLORS["primary"], bg=COLORS["bg"])
        self.lbl_list_page.pack(side="left")

        self.lbl_counter = tk.Label(self.game_header, text="Progreso: 1 de 20", font=FONTS["subtitle"], fg=COLORS["text_muted"], bg=COLORS["bg"])
        self.lbl_counter.pack(side="right")

        # Barra de progreso
        self.progress_container = tk.Frame(self.frame_juego, bg=COLORS["bg"])
        self.progress_container.pack(fill="x", pady=(0, 40))

        self.progress_bg = tk.Frame(self.progress_container, bg=COLORS["shadow"], height=10)
        self.progress_bg.pack(fill="x")
        self.progress_bar = tk.Frame(self.progress_bg, bg=COLORS["primary"], height=10, width=0)
        self.progress_bar.place(x=0, y=0)

        # Contenedor de la palabra (Redondeado)
        self.word_card = RoundedFrame(self.frame_juego, height=260, shadow=False)
        self.word_card.pack(fill="x")
        self.word_card.pack_propagate(False)

        self.lbl_word = tk.Label(self.word_card.content, text="PALABRA", font=FONTS["word"], fg=COLORS["text_main"], bg=COLORS["card"], wraplength=800)
        self.lbl_word.pack(expand=True)

        self.lbl_pronun = tk.Label(self.word_card.content, text="Descripción", font=FONTS["body"], fg=COLORS["text_muted"], bg=COLORS["card"], wraplength=800, justify="center")
        self.lbl_pronun.pack(pady=(0, 20))

        # Botones de Acción
        self.action_container = tk.Frame(self.frame_juego, bg=COLORS["bg"])
        self.action_container.pack(pady=40, fill="x")

        # Configurar columnas para centrar los botones
        self.action_container.columnconfigure(0, weight=1)
        self.action_container.columnconfigure(1, weight=1)

        self.btn_wrong = RoundedButton(self.action_container, text="Incorrecta\n[←] o [2]", bg_color=COLORS["error"], hover_color=COLORS["error_hover"], height=70, command=self.marcar_incorrecto)
        self.btn_wrong.grid(row=0, column=0, padx=(0, 15), sticky="ew")

        self.btn_right = RoundedButton(self.action_container, text="Correcta\n[→] o [1]", bg_color=COLORS["success"], hover_color=COLORS["success_hover"], height=70, command=self.marcar_correcto)
        self.btn_right.grid(row=0, column=1, padx=(15, 0), sticky="ew")

        self.btn_exit = tk.Button(self.frame_juego, text="Finalizar Sesión", font=FONTS["info"], fg=COLORS["text_muted"], bg=COLORS["bg"], relief="flat", cursor="hand2", command=self.mostrar_resultados, activebackground=COLORS["bg"], activeforeground=COLORS["error_hover"])
        self.btn_exit.pack(side="bottom", pady=10)

    def _build_resultados_ui(self):
        self.res_header = tk.Label(self.frame_resultados, text="Resultados de la Sesión", font=FONTS["title"], fg=COLORS["text_main"], bg=COLORS["bg"])
        self.res_header.pack(pady=(0, 10))

        # Score Card Redondeada (Se incrementó la altura de 160 a 190 para evitar que se corte el texto)
        self.score_card = RoundedFrame(self.frame_resultados, height=190)
        self.score_card.pack(fill="x", pady=10)
        self.score_card.pack_propagate(False)

        self.lbl_score_pct = tk.Label(self.score_card.content, text="0%", font=("Segoe UI", 56, "bold"), bg=COLORS["card"])
        self.lbl_score_pct.pack()

        self.lbl_score_detail = tk.Label(self.score_card.content, text="Aciertos: 0  •  Errores: 0", font=FONTS["body"], fg=COLORS["text_main"], bg=COLORS["card"])
        self.lbl_score_detail.pack(pady=(5, 0))

        # Contenedor Tabla de Refuerzo
        self.refuerzo_container = tk.Frame(self.frame_resultados, bg=COLORS["bg"])
        
        tk.Label(self.refuerzo_container, text="Lista de Refuerzo:", font=FONTS["subtitle"], fg=COLORS["error"], bg=COLORS["bg"]).pack(pady=(20, 10), anchor="w")
        
        self.table_card = RoundedFrame(self.refuerzo_container, padding=5, shadow=False)
        self.table_card.pack(fill="both", expand=True)

        # Treeview (Tabla) en lugar de un TextBox simple
        columns = ("lista", "pag", "linea", "palabra")
        self.tree = ttk.Treeview(self.table_card.content, columns=columns, show="headings")
        
        self.tree.heading("lista", text="Lista")
        self.tree.heading("pag", text="Página")
        self.tree.heading("linea", text="Línea #")
        self.tree.heading("palabra", text="Palabra")
        
        self.tree.column("lista", width=80, anchor="center")
        self.tree.column("pag", width=80, anchor="center")
        self.tree.column("linea", width=100, anchor="center")
        # Se actualizó el anchor de "w" a "center" para centrar el texto
        self.tree.column("palabra", width=400, anchor="center")
        
        self.tree.pack(side="left", fill="both", expand=True)
        
        self.scrollbar = ttk.Scrollbar(self.table_card.content, orient="vertical", command=self.tree.yview)
        self.scrollbar.pack(side="right", fill="y")
        self.tree.configure(yscrollcommand=self.scrollbar.set)

        self.btn_volver = RoundedButton(self.frame_resultados, text="Volver al Menú", bg_color=COLORS["primary"], hover_color=COLORS["primary_hover"], height=60, command=self.restart)
        self.btn_volver.pack(fill="x", pady=(25, 0))

    # --- LÓGICA DE INTERFAZ Y EVENTOS ---
    def obtener_ruta_lista(self):
        return [None, RUTA_L1, RUTA_L2][self.lista_var.get()]

    def refrescar_paginas(self):
        for widget in self.frame_checks.winfo_children():
            widget.destroy()
        self.checkbox_vars = []

        ruta = self.obtener_ruta_lista()
        palabras = cargar_palabras_con_pagina(ruta)
        
        if not palabras:
            tk.Label(self.frame_checks, text="⚠️ Archivo no encontrado. Crea ListaPalabras_1.txt o ListaPalabras_2.txt", fg=COLORS["error"], bg=COLORS["card"], font=FONTS["info"]).pack(pady=20)
            self.info_conteo.config(text="Palabras seleccionadas: 0")
            return

        n_pag = max((p["pag"] for p in palabras), default=0)
        cols = 5
        for i in range(1, n_pag + 1):
            var = tk.BooleanVar(value=False)
            cb = tk.Checkbutton(self.frame_checks, text=f"Pág. {i}", variable=var, 
                                bg=COLORS["card"], fg=COLORS["text_main"], font=FONTS["info"], 
                                command=self.actualizar_conteo, activebackground=COLORS["card"], 
                                activeforeground=COLORS["primary"], selectcolor=COLORS["card"], cursor="hand2")
            r, c = (i-1)//cols, (i-1)%cols
            cb.grid(row=r, column=c, sticky="w", padx=20, pady=10)
            self.checkbox_vars.append((i, var))
        
        self.actualizar_conteo()

    def actualizar_conteo(self):
        pags = [i for i, v in self.checkbox_vars if v.get()]
        palabras = cargar_palabras_con_pagina(self.obtener_ruta_lista())
        filtradas = [p for p in palabras if p["pag"] in pags] if pags else palabras
        self.info_conteo.config(text=f"Palabras seleccionadas: {len(filtradas)}")

    def toggle_all(self):
        if not self.checkbox_vars: return
        all_checked = all(var.get() for _, var in self.checkbox_vars)
        nuevo_estado = not all_checked
        for _, var in self.checkbox_vars: var.set(nuevo_estado)
        self.actualizar_conteo()

    def iniciar_juego(self):
        ruta = self.obtener_ruta_lista()
        pags = [i for i, v in self.checkbox_vars if v.get()]
        
        todas = cargar_palabras_con_pagina(ruta)
        self.palabras_juego = [p for p in todas if p["pag"] in pags] if pags else todas[:]
        
        if not self.palabras_juego:
            messagebox.showwarning("Atención", "No hay palabras para estudiar en la selección actual.")
            return

        random.shuffle(self.palabras_juego)
        self.correctas, self.incorrectas, self.indice = [], [], 0
        
        self.frame_config.pack_forget()
        self.frame_juego.pack(fill="both", expand=True)
        self.mostrar_siguiente()

    def update_progress(self):
        self.root.update_idletasks()
        total_w = self.progress_bg.winfo_width()
        if total_w <= 1: total_w = self.root.winfo_width() - 80 
            
        if len(self.palabras_juego) > 0:
            prog_w = (self.indice / len(self.palabras_juego)) * total_w
            self.progress_bar.config(width=max(prog_w, 1))

    def mostrar_siguiente(self):
        if self.indice < len(self.palabras_juego):
            palabra_actual = self.palabras_juego[self.indice]
            
            self.lbl_word.config(text=palabra_actual["palabra"])
            self.lbl_pronun.config(text=palabra_actual["desc"] if palabra_actual["desc"] else "(Sin descripción)")
            
            lista_num = self.lista_var.get()
            # Actualizado al formato exacto solicitado
            self.lbl_list_page.config(text=f"Lista {lista_num}  ·  Pág. {palabra_actual['pag']}  ·  Palabra #{palabra_actual['num']}")
            self.lbl_counter.config(text=f"Progreso: {self.indice + 1} de {len(self.palabras_juego)}")
            
            self.update_progress()
        else:
            self.mostrar_resultados()

    def marcar_correcto(self):
        if self.indice < len(self.palabras_juego):
            self.correctas.append(self.palabras_juego[self.indice])
            self.indice += 1
            self.mostrar_siguiente()

    def marcar_incorrecto(self):
        if self.indice < len(self.palabras_juego):
            self.incorrectas.append(self.palabras_juego[self.indice])
            self.indice += 1
            self.mostrar_siguiente()

    def mostrar_resultados(self):
        self.frame_juego.pack_forget()
        self.frame_resultados.pack(fill="both", expand=True)
        
        total = len(self.correctas) + len(self.incorrectas)
        porcentaje = (len(self.correctas) / total * 100) if total else 0
        
        color_score = COLORS["success"] if porcentaje >= 80 else (COLORS["primary"] if porcentaje >= 50 else COLORS["error"])
        
        self.lbl_score_pct.config(text=f"{porcentaje:.1f}%", fg=color_score)
        self.lbl_score_detail.config(text=f"Aciertos: {len(self.correctas)}  •  Errores: {len(self.incorrectas)}")

        # Limpiar tabla previa
        for item in self.tree.get_children():
            self.tree.delete(item)

        if self.incorrectas:
            self.refuerzo_container.pack(fill="both", expand=True)
            lista_n = self.lista_var.get()
            
            for p in sorted(self.incorrectas, key=lambda x: x["num"]):
                # Insertar en la tabla profesional (Treeview)
                self.tree.insert("", "end", values=(f"Lista {lista_n}", f"Pág. {p['pag']}", f"#{p['num']}", p['palabra']))
        else:
            self.refuerzo_container.pack_forget()

    def restart(self):
        self.frame_resultados.pack_forget()
        
        self.palabras_juego = []
        self.correctas, self.incorrectas = [], []
        self.indice = 0
        self.progress_bar.config(width=0)
        
        self.frame_config.pack(fill="both", expand=True)
        self.refrescar_paginas()

# ==========================
# Configuración Estilo Avanzado para la Tabla (Treeview)
# ==========================
def config_treeview_style():
    style = ttk.Style()
    style.theme_use('clam')
    
    # Estilo general de la tabla
    style.configure("Treeview",
        background=COLORS["card"],
        foreground=COLORS["text_main"],
        fieldbackground=COLORS["card"],
        borderwidth=0,
        rowheight=35,
        font=FONTS["info"]
    )
    # Color al seleccionar fila
    style.map('Treeview', background=[('selected', COLORS["primary"])])
    
    # Estilo de los encabezados de la tabla
    style.configure("Treeview.Heading",
        background=COLORS["shadow"],
        foreground=COLORS["text_muted"],
        borderwidth=0,
        font=FONTS["button"],
        padding=8
    )
    style.map('Treeview.Heading', background=[('active', COLORS["bg"])])
    
    # Estilo Scrollbar oscuro
    style.configure("Vertical.TScrollbar", gripcount=0, background=COLORS["shadow"], 
                    darkcolor=COLORS["bg"], lightcolor=COLORS["shadow"], 
                    troughcolor=COLORS["card"], bordercolor=COLORS["card"], arrowcolor=COLORS["text_muted"])

if __name__ == "__main__":
    root = tk.Tk()
    config_treeview_style()
    app = SpellingBeeApp(root)
    root.mainloop()