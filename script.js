const formulario = document.getElementById("formulario")

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
    RESET: {
        accion: () => {
            string_num.replaceAll(string_num, "") 
            string_num = ""
        }
    },
    DEL: {
        accion: () => {
            if(string_num.endsWith(" ")){
                let string_modificado = string_num.slice(0, -3)
                string_num = string_modificado
            }
            else{
                let string_modificado = string_num.slice(0, -1)
                string_num = string_modificado
            }

        }
    },
    NAN: {
        accion: (numero) => isNaN(numero)
    }
}

let numero = ""
let resultado_operacion = ""
let operacion_ingresada = []

const handleCalculardora = (event) => {

    numero = event.target.value

    if((numero === "1"||numero === "2"||numero === "3"||numero === "4"||numero === "5"||numero === "6"||numero === "7"||numero === "8" ||numero === "9"||numero === "0")){
        string_num = string_num + numero
        operacion.innerText = string_num
    }

    else if(numero === undefined || numero === "=" || numero === "RST" || numero === "DEL"){
        string_num = string_num + ""
        if(numero === "DEL"){
            ACCIONES.DEL.accion()
            operacion.innerText = string_num
        }
        else if(numero === "RST"){
            ACCIONES.RESET.accion()
            operacion.innerText = string_num
        }
    }

    else{
        if(string_num.includes(" + ") || string_num.includes(" - ") || string_num.includes(" x ") || string_num.includes(" / ") || string_num === ""){
            string_num = string_num + ""
            operacion.innerText = string_num
        }
        else if(numero === "."){
            string_num = string_num + "."
            operacion.innerText = string_num
        }
        else{
            string_num = string_num + " " + numero + " "
            operacion.innerText = string_num
        }
    }
}

const handleSubmit = (event) => {
    event.preventDefault()
    operacion_ingresada = string_num.split(" ")
    if(operacion_ingresada[1] === "+"){
        resultado_operacion = ACCIONES.SUMAR.accion(parseFloat(operacion_ingresada[0]), parseFloat(operacion_ingresada[2]))
        if(ACCIONES.NAN.accion(resultado_operacion)){
            resultado_operacion = "error"
            resultado.innerText = resultado_operacion
        }
        resultado.innerText = resultado_operacion
    }
    else if(operacion_ingresada[1] === "-"){
        resultado_operacion = ACCIONES.RESTAR.accion(parseFloat(operacion_ingresada[0]), parseFloat(operacion_ingresada[2]))
        if(ACCIONES.NAN.accion(resultado_operacion)){
            resultado_operacion = "error"
            resultado.innerText = resultado_operacion
        }
        resultado.innerText = resultado_operacion
    }
    else if(operacion_ingresada[1] === "x"){
        resultado_operacion = ACCIONES.MULTIPLICAR.accion(parseFloat(operacion_ingresada[0]), parseFloat(operacion_ingresada[2]))
        if(ACCIONES.NAN.accion(resultado_operacion)){
            resultado_operacion = "error"
            resultado.innerText = resultado_operacion
        }
        resultado.innerText = resultado_operacion
    }
    else if(operacion_ingresada[1] === "/"){
        resultado_operacion = ACCIONES.DIVIDIR.accion(parseFloat(operacion_ingresada[0]), parseFloat(operacion_ingresada[2]))
        if(ACCIONES.NAN.accion(resultado_operacion)){
            resultado_operacion = "error"
            resultado.innerText = resultado_operacion
        }
        resultado.innerText = resultado_operacion
    }
    else{
        resultado_operacion = "error"
        resultado.innerText = resultado_operacion
    }

    string_num = ""
}

formulario.addEventListener("submit", handleSubmit)
formulario.addEventListener("click", handleCalculardora)