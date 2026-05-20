// ==========================================
// 4. FUNCIÓN CARGAR_BATERIA (Corregida)
// ==========================================
function CARGAR_BATERIA () {
    if (Prueba == 2) {
        // 1. Activamos la bandera para permitir la carga
        en_funcion_carga = true
        basic.showLeds(`
            . # # # .
            . # . # .
            . # . # .
            . # . # .
            . # # # .
            `)
    }
}
// Función auxiliar aislada para tocar un compás con desvanecimiento de volumen y luces
function badEndingTocarCompas (patron: any[]) {
    for (let k = 0; k <= patron.length - 1; k++) {
        tiempoActual2 = control.millis() - badEndingTiempoInicio
        // Límite estricto de 12 segundos (12000 ms)
        if (tiempoActual2 >= 12000) {
            badEndingFinalizado = true
            music.setVolume(0)
            // Apaga los LEDs por completo al final
            led.setBrightness(0)
            break;
        }
        // --- EFECTO FADE OUT (Sonido y Luces) ---
        if (tiempoActual2 > 6000) {
            // Calcula la bajada progresiva de 255 a 0 entre el segundo 6 y el 12
            nivelActual = Math.map(tiempoActual2, 6000, 12000, 255, 0)
            nivelSeguro = Math.max(0, nivelActual)
            music.setVolume(nivelSeguro)
            // Baja el brillo de la pantalla en tiempo real
            led.setBrightness(nivelSeguro)
        } else {
            music.setVolume(255)
            // Brillo máximo durante los primeros 6 segundos
            led.setBrightness(255)
        }
        // Toca la nota sin bloquear el procesador
        music.playTone(patron[k], music.beat(BeatFraction.Half))
    }
}
// Evento global del logo (siempre escucha, pero solo actúa si la bandera es verdadera)
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (Prueba == 2) {
        // Si no estamos en la función de carga, ignora el toque
        if (!(en_funcion_carga)) {
            return
        }
        Toques2 += 1
        music.playTone(200 + Toques2 * 10, 50)
        if (Toques2 == 15) {
            basic.showLeds(`
                . # # # .
                . # . # .
                . # . # .
                . # # # .
                . # # # .
                `)
        } else if (Toques2 == 25) {
            basic.showLeds(`
                . # # # .
                . # . # .
                . # # # .
                . # # # .
                . # # # .
                `)
        } else if (Toques2 == 40) {
            basic.showLeds(`
                . # # # .
                . # # # .
                . # # # .
                . # # # .
                . # # # .
                `)
            basic.pause(500)
            basic.showString("GRACIAS!!", 150)
Toques2 = 0
            // 2. Desactivamos la bandera al terminar la carga
            en_funcion_carga = false
            basic.clearScreen()
            Prueba = 3
            basic.showString("A")
            basic.showLeds(`
                . . # . .
                . # . . .
                # # # # #
                . # . . .
                . . # . .
                `)
        }
        while (input.logoIsPressed()) {
            basic.pause(10)
        }
    }
})
function EFECTO_MATRIX_REAL () {
    if (Prueba == 1) {
        // Al pasar la imagen directamente dentro de la función, MakeCode te creará un bloque de dibujo perfecto para cada una.
        procesarLetraMatrix(images.createImage(`
            # # # # #
            . . . # .
            . . . # .
            # . . # .
            . # # . .
            `))
        procesarLetraMatrix(images.createImage(`
            . # . # .
            . # . # .
            . # . # .
            . # . # .
            . # # # .
            `))
        procesarLetraMatrix(images.createImage(`
            . # . . .
            . # . . .
            . # . . .
            . # . . .
            . # # # .
            `))
        procesarLetraMatrix(images.createImage(`
            . # # # .
            . . # . .
            . . # . .
            . . # . .
            . # # # .
            `))
        procesarLetraMatrix(images.createImage(`
            . . # . .
            . # . # .
            . # . # .
            . # # # .
            . # . # .
            `))
        procesarLetraMatrix(images.createImage(`
            . . . . .
            . # . # .
            . . # . .
            . # . # .
            . . . . .
            `))
        procesarLetraMatrix(images.createImage(`
            . # # # .
            # . . . .
            . # # . .
            . . . # .
            # # # . .
            `))
        procesarLetraMatrix(images.createImage(`
            # # # # .
            # . . . .
            # # # . .
            # . . . .
            # # # # .
            `))
        procesarLetraMatrix(images.createImage(`
            # # # . .
            # . . # .
            # # # . .
            # . . # .
            # . . . #
            `))
        procesarLetraMatrix(images.createImage(`
            . # # # .
            # . . . .
            # . . # #
            # . . . #
            . # # # .
            `))
        procesarLetraMatrix(images.createImage(`
            . # # # .
            . . # . .
            . . # . .
            . . # . .
            . # # # .
            `))
        procesarLetraMatrix(images.createImage(`
            . # # # .
            . # . # .
            . # . # .
            . # . # .
            . # # # .
            `))
        Prueba = 2
    }
}
input.onButtonPressed(Button.A, function () {
    if (contador == 8) {
        ejecutarAnimacionLEDsProporcional()
        contador = 9
    } else if (contador <= 7) {
        mostrarRazonActual()
        contador += 1
    } else {
        basic.clearScreen()
        basic.pause(2000)
        reproducirBadEnding()
    }
})
function mostrarRazonActual () {
    basic.clearScreen()
    music.startMelody(music.builtInMelody(Melodies.JumpUp), MelodyOptions.Once)
    if (contador == 1) {
        basic.showString("RAZONES POR QUE TE AMO")
    } else if (contador == 2) {
        basic.showString("TU SONRISA")
    } else if (contador == 3) {
        basic.showString("TU SENTIDO DEL HUMOR")
    } else if (contador == 4) {
        basic.showString("COMO ME CUIDAS")
    } else if (contador == 5) {
        basic.showString("TU PACIENCIA")
    } else if (contador == 6) {
        basic.showString("COMO ME HACES SENTIR")
    } else if (contador == 7) {
        basic.showString("JAJA, REALMENTE CREES QUE TAN POCAS?")
    }
}
function ejecutarAnimacionLEDsProporcional () {
    basic.clearScreen()
    tiempoEspera = 2000
    for (let index = 0; index < 3; index++) {
        for (let y2 = 0; y2 <= 4; y2++) {
            for (let x2 = 0; x2 <= 4; x2++) {
                led.plot(x2, y2)
                music.playTone(880, music.beat(BeatFraction.Sixteenth))
                basic.pause(tiempoEspera)
                if (tiempoEspera > 5) {
                    tiempoEspera = tiempoEspera * 0.922
                }
            }
        }
        music.playTone(440, music.beat(BeatFraction.Eighth))
        basic.pause(150)
        basic.clearScreen()
    }
    music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once)
    basic.showString("TE AMO")
}
// Función auxiliar para reproducir un compás controlando tiempo y volumen
function tocarCompasConFade (patron: any[]) {
    for (let j = 0; j <= patron.length - 1; j++) {
        tiempoActual = control.millis() - tiempoInicio
        // Si ya pasaron los 12 segundos, salimos del bucle y apagamos el sonido
        if (tiempoActual >= tiempoMaximo) {
            cancionTerminada = true
            music.setVolume(0)
            break;
        }
        // --- EFECTO FADE OUT (Bajada de volumen) ---
        // Empezamos a bajar el volumen progresivamente a partir del segundo 6
        if (tiempoActual > 6000) {
            // Mapea el tiempo restante (de 6s a 12s) a un volumen decreciente (de 255 a 0)
            volumenActual = Math.map(tiempoActual, 6000, tiempoMaximo, 255, 0)
            music.setVolume(Math.max(0, volumenActual))
        } else {
            // Volumen máximo al principio
            music.setVolume(255)
        }
        music.playTone(patron[j], music.beat(BeatFraction.Half))
    }
}
// Función principal que gestiona la canción
function reproducirBadEnding () {
    cancionTerminada = false
    // Guardamos el momento exacto en el que empieza
    tiempoInicio = control.millis()
    control.inBackground(function () {
        while (!cancionTerminada) {
            basic.showString("FIN DE LA PARTE 1 ")
        }
        basic.clearScreen()
    })
// Ejecución secuencial de los compases vigilando el límite de 12 segundos
    if (!(cancionTerminada)) {
        tocarCompasConFade(patronLa)
    }
    if (!(cancionTerminada)) {
        tocarCompasConFade(patronFa)
    }
    if (!(cancionTerminada)) {
        tocarCompasConFade(patronSol)
    }
    if (!(cancionTerminada)) {
        tocarCompasConFade(patronMi)
    }
    if (!(cancionTerminada)) {
        tocarCompasConFade(patronLa)
    }
    if (!(cancionTerminada)) {
        tocarCompasConFade(patronFa)
    }
    if (!(cancionTerminada)) {
        tocarCompasConFade(patronSol)
    }
    if (!(cancionTerminada)) {
        tocarCompasConFade(patronMi)
    }
    if (!(cancionTerminada)) {
        tocarCompasConFade(patronLa)
    }
    if (!(cancionTerminada)) {
        tocarCompasConFade(patronFa)
    }
    if (!(cancionTerminada)) {
        tocarCompasConFade(patronSol)
    }
    if (!(cancionTerminada)) {
        tocarCompasConFade(patronMi)
    }
    // Asegurar que todo se detiene al acabar
    cancionTerminada = true
    music.setVolume(0)
}
// ==========================================
// 2. FUNCIÓN INTRO (Tu animación completa)
// ==========================================
function INTRO () {
    if (Prueba == 0) {
        control.inBackground(function () {
        music.setVolume(255)
        for (let i = 0; i < 2; i++) {
            music.play(music.tonePlayable(233, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
            music.play(music.tonePlayable(220, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
            music.play(music.tonePlayable(233, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
            music.play(music.tonePlayable(311, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
            music.play(music.tonePlayable(294, music.beat(BeatFraction.Half)), music.PlaybackMode.UntilDone)
            music.play(music.tonePlayable(233, music.beat(BeatFraction.Quarter)), music.PlaybackMode.UntilDone)
            music.play(music.tonePlayable(220, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        }
        music.play(music.tonePlayable(185, music.beat(BeatFraction.Double)), music.PlaybackMode.UntilDone)
    })
for (let index = 0; index < 2; index++) {
            basic.showLeds(`
                # # # # #
                . . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
            basic.showLeds(`
                # # # # #
                # # # # #
                . . . . .
                . . . . .
                . . . . .
                `)
            basic.showLeds(`
                . . . . .
                # # # # #
                # # # # #
                . . . . .
                . . . . .
                `)
            basic.showLeds(`
                . . . . .
                . . . . .
                # # # # #
                # # # # #
                . . . . .
                `)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                # # # # #
                # # # # #
                `)
            basic.showLeds(`
                . . . . .
                . . . . .
                . . # . .
                . . . . .
                . . . . .
                `)
            basic.showLeds(`
                . . . . .
                . # # # .
                . # . # .
                . # # # .
                . . . . .
                `)
            basic.showLeds(`
                # # # # #
                # . . . #
                # . . . #
                # . . . #
                # # # # #
                `)
        }
        basic.clearScreen()
        basic.pause(1000)
        Prueba = 1
    }
}
function procesarLetraMatrix (letraDibujo: Image) {
    if (Prueba == 1) {
        rejillaMatrix = []
        for (let l = 0; l <= 24; l++) {
            rejillaMatrix.push(l)
        }
        while (rejillaMatrix.length > 0) {
            indiceAleatorio = randint(0, rejillaMatrix.length - 1)
            pos = rejillaMatrix.removeAt(indiceAleatorio)
            cx = pos % 5
            cy = Math.floor(pos / 5)
            led.plot(cx, cy)
            music.playTone(880, 15)
            basic.pause(25)
            // Usamos el método nativo de la imagen para comprobar el pixel
            // Se queda encendido fijo
            if (letraDibujo.pixel(cx, cy)) {
            	
            } else {
                led.unplot(cx, cy)
            }
        }
        basic.pause(1200)
        basic.clearScreen()
    }
}
// FUNCIÓN PRINCIPAL SEGURA: Métela donde quieras en tus bloques
function reproducirBadEndingSeguro () {
    control.inBackground(function () {
        music.setTempo(90)
        badEndingFinalizado = false
        badEndingTiempoInicio = control.millis()

        // Patrones de notas locales (no ensucian tus variables globales)
        let pLa = [Note.A, Note.C5, Note.E5, Note.C5, Note.A, Note.C5, Note.E5, Note.C5]
        let pFa = [Note.F, Note.A, Note.C5, Note.A, Note.F, Note.A, Note.C5, Note.A]
        let pSol = [Note.G, Note.B, Note.D5, Note.B, Note.G, Note.B, Note.D5, Note.B]
        let pMi = [Note.E, Note.G, Note.B, Note.G, Note.E, Note.G, Note.B, Note.G]

        // Lanza el texto de forma segura
        basic.showString("BAD ENDING ", 60)

        // Bucle de reproducción controlado por tiempo
        while (!badEndingFinalizado) {
            if (!badEndingFinalizado) badEndingTocarCompas(pLa)
            if (!badEndingFinalizado) badEndingTocarCompas(pFa)
            if (!badEndingFinalizado) badEndingTocarCompas(pSol)
            if (!badEndingFinalizado) badEndingTocarCompas(pMi)
        }

        // Al terminar los 12 segundos, limpia y restablece los valores estándar
        music.setVolume(255)
        led.setBrightness(255) // Devuelve el brillo al máximo para tus otros bloques
        basic.clearScreen()
    })
}
// ==========================================
// 3. FUNCIÓN ENCENDER_LEDS (Tu juego de acelerómetro)
// ==========================================
function ENCENDER_LEDS () {
    x = 2
    y = 2
    basic.showString("INCLINAME")
    basic.clearScreen()
    while (Luces < 25) {
        if (input.acceleration(Dimension.X) > 200 && x < 4) {
            x += 1
        }
        if (input.acceleration(Dimension.X) < -200 && x > 0) {
            x += -1
        }
        if (input.acceleration(Dimension.Y) > 200 && y < 4) {
            y += 1
        }
        if (input.acceleration(Dimension.Y) < -200 && y > 0) {
            y += -1
        }
        basic.pause(150)
        if (!(led.point(x, y))) {
            led.plot(x, y)
            Luces += 1
            music.playTone(880, music.beat(BeatFraction.Sixteenth))
        }
    }
    music.startMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.OnceInBackground)
    basic.pause(1000)
    basic.clearScreen()
    // Animación corazón
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    // Animación corazón
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    // Animación corazón
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    // Animación corazón
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        # # # # #
        `)
    // Animación corazón
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        `)
    basic.pause(2000)
    basic.clearScreen()
}
let Luces = 0
let y = 0
let x = 0
let pos = 0
let indiceAleatorio = 0
let rejillaMatrix: number[] = []
let volumenActual = 0
let tiempoInicio = 0
let tiempoActual = 0
let tiempoEspera = 0
let Toques2 = 0
let nivelSeguro = 0
let nivelActual = 0
let tiempoActual2 = 0
let en_funcion_carga = false
let tiempoMaximo = 0
let patronMi: number[] = []
let patronSol: number[] = []
let patronFa: number[] = []
let patronLa: number[] = []
let Prueba = 0
let contador = 0
let badEndingFinalizado = false
// Variables de control aisladas para no chocar con tu proyecto
let badEndingTiempoInicio = 0
contador = 0
let Toques = 0
let activo = false
let Verdades: number[] = []
let Retos: number[] = []
let cx = 0
let cy = 0
let ejecutando = false
let cancionTerminada = false
let miContador = 1
Prueba = 0
music.setVolume(14)
INTRO()
EFECTO_MATRIX_REAL()
ENCENDER_LEDS()
// Llamada a la función
CARGAR_BATERIA()
// Configurar el tempo a 90 BPM
music.setTempo(90)
// Definir los patrones de notas utilizando el objeto Note de micro:bit
patronLa = [
440,
523,
659,
523,
440,
523,
659,
523
]
patronFa = [
349,
440,
523,
440,
349,
440,
523,
440
]
patronSol = [
392,
494,
587,
494,
392,
494,
587,
494
]
patronMi = [
330,
392,
494,
392,
330,
392,
494,
392
]
// 12 segundos en milisegundos
tiempoMaximo = 20000
contador = 1
