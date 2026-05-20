/**
 * --- VARIABLES GLOBALES ---
 */
// ==========================================
// 4. CARGA DE BATERÍA
// ==========================================
function CARGAR_BATERIA () {
    if (Prueba == 2) {
        // Bloqueamos el botón A durante la carga [cite: 1]
        bloqueo_botones = true
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
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    if (Prueba == 2 && en_funcion_carga) {
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
            en_funcion_carga = false
            // Desbloqueamos el botón A al terminar la carga [cite: 1]
            bloqueo_botones = false
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
// ==========================================
// 2. EFECTO MATRIX
// ==========================================
function EFECTO_MATRIX_REAL () {
    if (Prueba == 1) {
        // Bloqueo activo
        bloqueo_botones = true
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
        // Desbloqueo
        bloqueo_botones = false
    }
}
// ==========================================
// 5. CONTROL DEL BOTÓN A (Lógica Principal)
// ==========================================
input.onButtonPressed(Button.A, function () {
    // Si el bloqueo está activo, no hace nada
    if (bloqueo_botones) {
        return;
    }
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
    razones = [
    "",
    "RAZONES POR QUE TE AMO",
    "TU SONRISA",
    "TU SENTIDO DEL HUMOR",
    "COMO ME CUIDAS",
    "TU PACIENCIA",
    "COMO ME HACES SENTIR",
    "JAJA, REALMENTE CREES QUE TAN POCAS?"
    ]
    if (contador >= 1 && contador <= 7) {
        basic.showString("" + (razones[contador]))
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
// ==========================================
// 6. BAD ENDING Y MÚSICA
// ==========================================
function tocarCompasConFade (patron: any[]) {
    for (let j = 0; j <= patron.length - 1; j++) {
        tiempoActual = control.millis() - tiempoInicio
        if (tiempoActual >= tiempoMaximo) {
            cancionTerminada = true
            music.setVolume(0)
            break;
        }
        if (tiempoActual > 6000) {
            volumenActual = Math.map(tiempoActual, 6000, tiempoMaximo, 255, 0)
            music.setVolume(Math.max(0, volumenActual))
        } else {
            music.setVolume(255)
        }
        music.playTone(patron[j], music.beat(BeatFraction.Half))
    }
}
function reproducirBadEnding () {
    cancionTerminada = false
    tiempoInicio = control.millis()
    control.inBackground(function () {
        while (!cancionTerminada) {
            basic.showString("FIN DE LA PARTE 1 ")
        }
        basic.clearScreen()
    })
secuencia = [
    patronLa,
    patronFa,
    patronSol,
    patronMi,
    patronLa,
    patronFa,
    patronSol,
    patronMi,
    patronLa,
    patronFa,
    patronSol,
    patronMi
    ]
    for (let p of secuencia) {
        if (!(cancionTerminada)) {
            tocarCompasConFade(p)
        }
    }
    cancionTerminada = true
    music.setVolume(0)
}
// ==========================================
// 1. FUNCIÓN INTRO
// ==========================================
function INTRO () {
    if (Prueba == 0) {
        // Bloqueo activo
        bloqueo_botones = true
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
        // Desbloqueo
        bloqueo_botones = false
    }
}
function procesarLetraMatrix (letraDibujo: Image) {
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
        if (!(letraDibujo.pixel(cx, cy))) {
            led.unplot(cx, cy)
        }
    }
    basic.pause(1200)
    basic.clearScreen()
}
// ==========================================
// 3. JUEGO ACELERÓMETRO
// ==========================================
function ENCENDER_LEDS () {
    // Bloqueo activo
    bloqueo_botones = true
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
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        `)
    basic.pause(2000)
    basic.clearScreen()
    // Desbloqueo
    bloqueo_botones = false
}
let Luces = 0
let y = 0
let x = 0
let pos = 0
let indiceAleatorio = 0
let rejillaMatrix: number[] = []
let secuencia: number[][] = []
let volumenActual = 0
let tiempoInicio = 0
let tiempoActual = 0
let tiempoEspera = 0
let razones: string[] = []
let Toques2 = 0
let en_funcion_carga = false
let bloqueo_botones = false
let contador = 0
let tiempoMaximo = 0
let patronMi: number[] = []
let patronSol: number[] = []
let patronFa: number[] = []
let patronLa: number[] = []
let Prueba = 0
let cancionTerminada = false
let cy = 0
let cx = 0
let badEndingTiempoInicio = 0
let badEndingFinalizado = false
let tiempoActual2 = 0
let nivelActual = 0
let nivelSeguro = 0
// --- ARRANQUE DEL PROGRAMA ---
Prueba = 0
music.setVolume(14)
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
tiempoMaximo = 20000
contador = 1
INTRO()
EFECTO_MATRIX_REAL()
ENCENDER_LEDS()
CARGAR_BATERIA()
