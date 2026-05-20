// ==========================================
// 5. CARGAR BATERÍA
// ==========================================
function CARGAR_BATERIA () {
    if (Prueba == 2) {
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
            basic.showString("GRACIAS!!")
            Toques2 = 0
            en_funcion_carga = false
            bloqueo_botones = false
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
    }
})
// ==========================================
// 2. EFECTO MATRIX
// ==========================================
function EFECTO_MATRIX_REAL () {
    if (Prueba == 1) {
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
        bloqueo_botones = false
    }
}
// --- EVENTOS DE BOTONES ---
input.onButtonPressed(Button.A, function () {
    if (bloqueo_botones) {
        return
    }
    if (Prueba == 2 && !(en_funcion_carga) && Verdades.length > 0) {
        activo_juego = true
        // <--- AÑADIDO: Quita el texto del menú inmediatamente
        basic.clearScreen()
        music.playTone(262, 100)
        music.playTone(330, 100)
        music.playTone(392, 100)
        j = randint(0, Verdades.length - 1)
        basic.showString("" + (Verdades.removeAt(j)))
        activo_juego = false
    } else if (Prueba == 3) {
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
                music.playTone(880, 20)
                basic.pause(tiempoEspera)
                if (tiempoEspera > 5) {
                    tiempoEspera *= 0.92
                }
            }
        }
        basic.clearScreen()
    }
    music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once)
    music.startMelody(music.builtInMelody(Melodies.Prelude), MelodyOptions.Once)
    basic.showString("CADA LED ENCENDIDO ES UN MOTIVO")
}
// ==========================================
// 4. VERDAD O RETO
// ==========================================
function VERDAD_O_RETO () {
    if (Prueba == 2) {
        Verdades = [
        "¿PRIMERA IMPRESION DE MI?",
        "¿QUE TE DA MAS RISA?",
        "¿RECUERDO FAVORITO NUESTRO?",
        "¿QUE TE ATRAE DE MI?",
        "¿CUENTAME UN SECRETO?",
        "¿QUE CAMBIARIAS DE MI?",
        "¿SOLOS QUE ME HARIAS?",
        "¿QUE TE DA MAS MIEDO?"
        ]
        Retos = [
        "DAME UN BESO DE 10S",
        "SUSURRAME ALGO BONITO",
        "BAILA UNA CANCION LENTA",
        "ABRAZO MAS FUERTE",
        "3 BESOS EN EL CUELLO",
        "ARREBATA UNA PRENDA",
        "DEJATE LEVANTAR",
        "ESCRIBEME ALGO CURSI"
        ]
        while (Verdades.length > 0 || Retos.length > 0) {
            if (!(activo_juego)) {
                basic.showString("VERDAD(A) O RETO(B)", 150)
            }
            basic.pause(100)
        }
    }
}
function reproducirBadEnding () {
    cancionTerminada = false
    tiempoInicio = control.millis()
    control.inBackground(function () {
        while (!cancionTerminada) basic.showString("FIN DE LA PARTE 1 ")
    })
secuencia = [
    patronLa,
    patronFa,
    patronSol,
    patronMi,
    patronLa,
    patronFa,
    patronSol,
    patronMi
    ]
    for (let compas of secuencia) {
        if (!(cancionTerminada)) {
            for (let nota of compas) {
                if (control.millis() - tiempoInicio > 30000) {
                    break;
                }
                music.playTone(nota, 500)
            }
        }
    }
    cancionTerminada = true
    music.setVolume(0)
}
input.onButtonPressed(Button.B, function () {
    if (bloqueo_botones) {
        return
    }
    if (Prueba == 2 && !(en_funcion_carga) && Retos.length > 0) {
        activo_juego = true
        // <--- AÑADIDO: Quita el texto del menú inmediatamente
        basic.clearScreen()
        music.playTone(392, 100)
        music.playTone(330, 100)
        music.playTone(262, 100)
        k = randint(0, Retos.length - 1)
        basic.showString("" + (Retos.removeAt(k)))
        activo_juego = false
    }
})
// ==========================================
// 1. FUNCIÓN INTRO
// ==========================================
function INTRO () {
    if (Prueba == 0) {
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
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        # # # # #
        `)
    basic.showLeds(`
        . # . # .
        # # # # #
        # # # # #
        . # # # .
        . . # . .
        `)
    basic.pause(2000)
    basic.clearScreen()
    bloqueo_botones = false
}
let Luces = 0
let y = 0
let x = 0
let pos = 0
let indiceAleatorio = 0
let rejillaMatrix: number[] = []
let k = 0
let secuencia: number[][] = []
let tiempoInicio = 0
let Retos: string[] = []
let razones: string[] = []
let j = 0
let activo_juego = false
let Verdades: string[] = []
let Toques2 = 0
let en_funcion_carga = false
let bloqueo_botones = false
let contador = 0
let patronMi: number[] = []
let patronSol: number[] = []
let patronFa: number[] = []
let patronLa: number[] = []
let Prueba = 0
let tiempoEspera = 0
let cx = 0
let cy = 0
let cancionTerminada = false
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
contador = 1
INTRO()
EFECTO_MATRIX_REAL()
ENCENDER_LEDS()
VERDAD_O_RETO()
CARGAR_BATERIA()
