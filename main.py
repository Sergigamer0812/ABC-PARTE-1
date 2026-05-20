"""

FIN  DEL CODIGO DE PROGRAMACION

"""
# AQUI EMPIEZA LA FUNCION Ventana_B
def Ventana_B():
    global Verdades, Retos
    Verdades = ["¿PRIMERA IMPRESION DE MI?",
        "¿QUE TE DA MAS RISA?",
        "¿RECUERDO FAVORITO NUESTRO?",
        "¿QUE TE ATRAE DE MI?",
        "¿CUENTAME UN SECRETO?",
        "¿QUE CAMBIARIAS DE MI?",
        "¿SOLOS QUE ME HARIAS?",
        "¿QUE TE DA MAS MIEDO?"]
    Retos = ["DAME UN BESO DE 10S",
        "SUSURRAME ALGO BONITO",
        "BAILA UNA CANCION LENTA",
        "ABRAZO MAS FUERTE",
        "DEJATE O DA 3 BESOS EN EL CUELLO",
        "DEJA O ARREBATA UNA PRENDA",
        "DEJATE LEVANTAR",
        "ESCRIBEME EL MENSAJE MAS CURSI"]
    
    def on_button_pressed_a():
        global activo
        if not activo:
            activo = True
            led.stop_animation()
            basic.clear_screen()
            if len(Verdades) > 0:
                j = randint(0, len(Verdades) - 1)
                basic.show_string(Verdades[j], 110)
                Verdades.remove_at(j)
            else:
                basic.show_icon(IconNames.NO)
            basic.pause(1000)
            activo = False
    input.on_button_pressed(Button.A, on_button_pressed_a)
    
    
    def on_button_pressed_b():
        global activo
        if not activo:
            activo = True
            led.stop_animation()
            basic.clear_screen()
            if len(Retos) > 0:
                k = randint(0, len(Retos) - 1)
                basic.show_string(Retos[k], 110)
                Retos.remove_at(k)
            else:
                basic.show_icon(IconNames.NO)
            basic.pause(1000)
            activo = False
    input.on_button_pressed(Button.B, on_button_pressed_b)
    
    
    def on_forever():
        global activo
        if not activo:
            if len(Verdades) == 0 and len(Retos) == 0:
                basic.show_icon(IconNames.YES)
            else:
                basic.show_string("VERDAD(A) O RETO(B)", 110)
    basic.forever(on_forever)
    
# --- DEFINICIÓN DE LA FUNCIÓN MAESTRA ---
def Intro():
    
    def on_in_background():
        music.set_volume(255)
        for i in range(2):
            music.play(music.tone_playable(233, music.beat(BeatFraction.HALF)),
                music.PlaybackMode.UNTIL_DONE)
            music.play(music.tone_playable(220, music.beat(BeatFraction.QUARTER)),
                music.PlaybackMode.UNTIL_DONE)
            music.play(music.tone_playable(233, music.beat(BeatFraction.HALF)),
                music.PlaybackMode.UNTIL_DONE)
            music.play(music.tone_playable(311, music.beat(BeatFraction.QUARTER)),
                music.PlaybackMode.UNTIL_DONE)
            music.play(music.tone_playable(294, music.beat(BeatFraction.HALF)),
                music.PlaybackMode.UNTIL_DONE)
            music.play(music.tone_playable(233, music.beat(BeatFraction.QUARTER)),
                music.PlaybackMode.UNTIL_DONE)
            music.play(music.tone_playable(220, music.beat(BeatFraction.WHOLE)),
                music.PlaybackMode.UNTIL_DONE)
        music.play(music.tone_playable(185, music.beat(BeatFraction.DOUBLE)),
            music.PlaybackMode.UNTIL_DONE)
    control.in_background(on_in_background)
    
    # 2. Animación de LEDs (se ejecuta a la vez que la música)
    for index in range(3):
        basic.show_leds("""
            # # # # #
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            """)
        basic.show_leds("""
            # # # # #
            # # # # #
            . . . . .
            . . . . .
            . . . . .
            """)
        basic.show_leds("""
            . . . . .
            # # # # #
            # # # # #
            . . . . .
            . . . . .
            """)
        basic.show_leds("""
            . . . . .
            . . . . .
            # # # # #
            # # # # #
            . . . . .
            """)
        basic.show_leds("""
            . . . . .
            . . . . .
            . . . . .
            # # # # #
            # # # # #
            """)
        basic.show_leds("""
            . . . . .
            . . . . .
            . . # . .
            . . . . .
            . . . . .
            """)
        basic.show_leds("""
            . . . . .
            . # # # .
            . # . # .
            . # # # .
            . . . . .
            """)
        basic.show_leds("""
            # # # # #
            # . . . #
            # . . . #
            # . . . #
            # # # # #
            """)
    # 3. Final de la función
    basic.clear_screen()
    basic.pause(1000)
    basic.clear_screen()
# AQUI EMPIEZA LA FUNCION Ventana_C
def Ventana_C():
    # Dibujo inicial de batería vacía
    basic.show_leds("""
        . # # # .
        . # . # .
        . # . # .
        . # . # .
        . # # # .
        """)
    
    def on_logo_pressed():
        global Toques
        Toques += 1
        if Toques == 5:
            basic.show_leds("""
                . # # # .
                . # . # .
                . # . # .
                . # . # .
                . # # # .
                """)
        elif Toques == 15:
            basic.show_leds("""
                . # # # .
                . # . # .
                . # . # .
                . # # # .
                . # # # .
                """)
        elif Toques == 25:
            basic.show_leds("""
                . # # # .
                . # . # .
                . # # # .
                . # # # .
                . # # # .
                """)
        elif Toques == 40:
            basic.show_leds("""
                . # # # .
                . # # # .
                . # # # .
                . # # # .
                . # # # .
                """)
            basic.pause(500)
            basic.show_string("GRACIAS POR DARME BATERIA")
            Toques = 0
            # Volver a mostrar la batería vacía para reiniciar
            basic.show_leds("""
                . # # # .
                . # . # .
                . # . # .
                . # . # .
                . # # # .
                """)
        # Bloqueo para que no cuente mientras mantiene presionado
        while input.logo_is_pressed():
            basic.pause(10)
    input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)
    
# AQUI EMPIEZA LA FUNCION Ventana_A
def Ventana_A():
    global x, y, Luces
    x = 2
    y = 2
    basic.clear_screen()
    # Bucle principal del juego
    while Luces < 25:
        # 1. MOVIMIENTO
        if input.acceleration(Dimension.X) > 200 and x < 4:
            x += 1
        if input.acceleration(Dimension.X) < -200 and x > 0:
            x += -1
        if input.acceleration(Dimension.Y) > 200 and y < 4:
            y += 1
        if input.acceleration(Dimension.Y) < -200 and y > 0:
            y += -1
        basic.pause(150)
        # 2. PINTAR Y SONIDO
        if not (led.point(x, y)):
            led.plot(x, y)
            Luces += 1
            music.play_tone(880, music.beat(BeatFraction.SIXTEENTH))
    # 3. ANIMACIÓN DE VICTORIA (AL LLEGAR A 25)
    music.start_melody(music.built_in_melody(Melodies.POWER_UP),
        MelodyOptions.ONCE_IN_BACKGROUND)
    basic.pause(1000)
    basic.clear_screen()
    basic.show_leds("""
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        """)
    basic.show_leds("""
        . # . # .
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        """)
    basic.show_leds("""
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        # # # # #
        """)
    basic.show_leds("""
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        """)
    basic.pause(2000)
    basic.clear_screen()
Luces = 0
y = 0
x = 0
Toques = 0
activo = False
Verdades: List[str] = []
Retos: List[str] = []
# --- EJECUCIÓN DEL CÓDIGO ---
# Solo necesitas llamar a la función para que todo el bloque anterior ocurra
Intro()
# --- EJECUCIÓN ---
# Llamamos a la función para que el juego arranque
Ventana_A()
Ventana_B()
# Llamamos a la función mágica al iniciar
Ventana_C()