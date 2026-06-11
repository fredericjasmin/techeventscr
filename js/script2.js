const eventos = [
    {
        id: 1,
        nombre: "React Summit Alajuela",
        categoria: "Desarrollo Web",
        modalidad: "Presencial",
        cuposTotales: 50,
        inscritos: 15,
        activo: true
    },
    {
        id: 2,
        nombre: "Foro de Inteligencia Artificial Aplicada",
        categoria: "Inteligencia Artificial",
        modalidad: "Híbrida",
        cuposTotales: 50,
        inscritos: 42,
        activo: true
    },
    {
        id: 3,
        nombre: "Introducción a la Ciberseguridad",
        categoria: "Ciberseguridad",
        modalidad: "Presencial",
        cuposTotales: 25,
        inscritos: 25,
        activo: true
    },
    {
        id: 4,
        nombre: "Bootcamp de Desarrollo Móvil con Flutter",
        categoria: "Desarrollo Móvil",
        modalidad: "Virtual",
        cuposTotales: 80,
        inscritos: 35,
        activo: true
    },
    {
        id: 5,
        nombre: "Cloud Computing Essentials",
        categoria: "Computación en la Nube",
        modalidad: "Híbrida",
        cuposTotales: 40,
        inscritos: 38,
        activo: false
    }
];
//Funcion declarada
function saludar() {
    console.log("Bienvenido a TechEvents CR")
}
saludar()
//Funcion con parametros
function mostrarNombreEvento(nombre) {
    console.log(`Evento seleccionado: ${nombre}`)
}
//Funcion con retorno
function calcularCuposDisponibles(CuposTotales, inscritos) {
    return CuposTotales - inscritos
}

const cupos = calcularCuposDisponibles(50, 15)
console.log(cupos)

//Funcion anonima
const mostrarMensaje = function () {
    console.log("Funcion anonima ejecutada")
}
mostrarMensaje()

//Mas usada - Arrow Function o Funcion Flecha
const obtenerNombreSitio = () => {
    return "TechEvents CR"
}
console.log(obtenerNombreSitio())

const obtenerNombreSitio1 = () => "TechEvents CR"
const obtenerNombreSitio2 = () => ("TechEvents CR")

const duplicarCupos = (cupos) => (cupos * 2)

function mostrarResumenEvento(evento) {
    console.log(`Evento: ${evento.nombre}`)
    console.log(`Categoría: ${evento.categoria}`)
    console.log(`Modalidad: ${evento.modalidad}`)
}

mostrarResumenEvento(eventos[0])

function calcularDisponibles(evento) {
    return evento.cuposTotales - evento.inscritos;
}

function obtenerEstadoEvento(evento) {
    const disponibles = calcularDisponibles(evento);
    if (!evento.activo) {
        return "Evento inactivo";
    }
    if (disponibles > 10) {
        return "Disponible";
    }
    if (disponibles > 0) {
        return "Pocos cupos";
    }
    return "Evento lleno";
}

function buscarEventoPorId(id) {
    for (const evento of eventos) {
        if (evento.id === id) {
            return evento;
        }
    }
    return null;
}

function mostrarDetalleEvento(id) {
    const evento = buscarEventoPorId(id);
    if (evento === null) {
        console.log("No se encontró el evento");

        const disponibles = calcularDisponibles(evento);
        const estado = obtenerEstadoEvento(evento);
        console.log("================================");
        console.log(`Evento: ${evento.nombre}`);
        console.log(`Categoría: ${evento.categoria}`);
        console.log(`Modalidad: ${evento.modalidad}`);
        console.log(`Cupos disponibles: ${disponibles}`);
        console.log(`Estado: ${estado}`);
        console.log("================================");
    }
}

//Forma 2
const btnDetalle =
    document.getElementById("btnDetalle");
btnDetalle.onclick = function () {
    mostrarDetalleEvento(2);
};

function mostrarTodosLosEventos() {
    for (const evento of eventos) {
        mostrarDetalleEvento(evento.id)
    }
}

btnMostrarEventos.addEventListener("click", function() {
    mostrarTodosLosEventos()
    console.log("El usuario hizo click")
})