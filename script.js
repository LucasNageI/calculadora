document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario")
    const operacion = document.getElementById("operacion")
    const resultado = document.getElementById("resultado")

    let string_num = ""

    const ACCIONES = {
        SUMAR: {
            accion: (a, b) => a + b
        },
        RESTAR: {
            accion: (a, b) => a - b
        },
        MULTIPLICAR: {
            accion: (a, b) => a * b
        },
        DIVIDIR: {
            accion: (a, b) => a / b
        },
        C: {
            accion: () => {
                if (string_num.endsWith(" ")) {
                    string_num = string_num.slice(0, -3)
                } else {
                    string_num = string_num.slice(0, -1)
                }
                operacion.innerText = string_num
            }
        },
        NAN: {
            accion: (numero) => isNaN(numero)
        }
    }

    const handleCalculadora = (event) => {
        const numero = event.target.value

        if (numero >= "0" && numero <= "9") {
            string_num += numero
            operacion.innerText = string_num
        } 

        else if (numero === "C") {
            ACCIONES.C.accion()
        } 
        else if (["+", "-", "x", "/"].includes(numero)) {
            if (string_num.endsWith(" ")) {
                string_num = string_num.slice(0, -3)
            }
            string_num += " " + numero + " "
            operacion.innerText = string_num
        } 

        else if (numero === ".") {
            if (!string_num.endsWith(" ")) {
                string_num += "."
                operacion.innerText = string_num
            }
        } 

        else if (numero === "=") {
            handleSubmit()
        }
    }

    const handleSubmit = () => {
        const operacion_ingresada = string_num.split(" ")
        let resultado_operacion = ""

        if (operacion_ingresada.length >= 3) {
            let resultado = parseFloat(operacion_ingresada[0])

            for (let i = 1; i < operacion_ingresada.length - 1; i += 2) {
                const op = operacion_ingresada[i]
                const num = parseFloat(operacion_ingresada[i + 1])

                if (ACCIONES.NAN.accion(resultado) || ACCIONES.NAN.accion(num)) {
                    resultado_operacion = "error"
                    break
                }

                switch (op) {
                    case "+":
                        resultado += num
                        break
                    case "-":
                        resultado -= num
                        break
                    case "x":
                        resultado *= num
                        break
                    case "/":
                        resultado /= num
                        break
                    default:
                        resultado_operacion = "error"
                        break
                }
            }

            resultado_operacion = resultado
        } 
        
        else {
            resultado_operacion = "error"
        }

        operacion.innerText = string_num
        resultado.innerText = resultado_operacion

        string_num = ""
    }

    formulario.addEventListener("click", handleCalculadora)
})