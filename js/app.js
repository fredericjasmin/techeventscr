const contenedorEventos = document.getElementById("contenedorEventos")
const mensajeEventos = document.getElementById("mensajeEventos")
const filtroCategoria = document.getElementById("filtroCategoria")
const filtroModalidad = document.getElementById("filtroModalidad")
const filtroEtiqueta = document.getElementById("filtroEtiqueta")
const btnLimpiarFiltros = document.getElementById("btnLimpiarFiltros")
const selectEventoInscripcion = document.getElementById("selectEventoInscripcion")
const detalleEventoInscripcion = document.getElementById("detalleEventoInscripcion")
const cantidadCupos = document.getElementById("cantidadCupos")
const nombreParticipante = document.getElementById("nombreParticipante")
const btnVistaPreviaInscripcion = document.getElementById("btnVistaPreviaInscripcion")
const resumenInscripcion = document.getElementById("resumenInscripcion")

selectEventoInscripcion.addEventListener(
    "change",
    mostrarDetalleSeleccionado
)

cantidadCupos.addEventListener(
    "input",
    mostrarDetalleSeleccionado
)

btnVistaPreviaInscripcion.addEventListener(
    "click",
    generarVistaPrevia
)

function calcularDisponibles(evento) {
    return evento.cuposTotales - evento.inscritos
}

function obtenerEstadoEvento(evento) {
    const disponibles = calcularDisponibles(evento)
    if (disponibles === 0) {
        return "Evento lleno"
    }
    if (disponibles <= 10) {
        return "Pocos cupos"
    }
    return "Disponible"
}

function obtenerClaseEstado(evento) {
    const disponibles = calcularDisponibles(evento)
    if (disponibles === 0) {
        return "state-danger"
    }
    if (disponibles <= 10) {
        return "state-warning"
    }
    return "state-success"
}

function obtenerEventosActivos() {
    return eventos.filter(function (evento) {
        return evento.activo
    });
}

function obtenerValoresUnicos(lista, propiedad) {
    const valores = []
    for (const item of lista) {
        if (!valores.includes(item[propiedad])) {
            valores.push(item[propiedad])
        }
    }
    return valores
}

function obtenerEtiquetasUnicas(lista) {
    const etiquetas = []
    for (const evento of lista) {
        for (const etiqueta of evento.etiquetas) {
            if (!etiquetas.includes(etiqueta)) {
                etiquetas.push(etiqueta)
            }
        }
    }
    return etiquetas
}

function cargarOpcionesSelect(select, opciones) {
    for (const opcion of opciones) {
        const option = document.createElement("option")
        option.value = opcion
        option.textContent = opcion
        select.appendChild(option)
    }
}

function cargarFiltros() {
    const eventosActivos = obtenerEventosActivos()
    const categorias =
        obtenerValoresUnicos(eventosActivos, "categoria")
    const modalidades =
        obtenerValoresUnicos(eventosActivos, "modalidad")
    const etiquetas =
        obtenerEtiquetasUnicas(eventosActivos)
    cargarOpcionesSelect(filtroCategoria, categorias)
    cargarOpcionesSelect(filtroModalidad, modalidades)
    cargarOpcionesSelect(filtroEtiqueta, etiquetas)
}

function cargarEventos() {
    const eventosActivos = obtenerEventosActivos()
    for (const evento of eventosActivos) {
        const option = document.createElement("option")
        option.value = evento.id
        option.textContent = evento.nombre
        selectEventoInscripcion.appendChild(option)
    }
}

function buscarEventoPorId(id) {
    return eventos.find(function (evento) {
        return evento.id == id
    })
}

function mostrarDetalleSeleccionado() {

    const idEvento = selectEventoInscripcion.value

    if (idEvento === "") {

        detalleEventoInscripcion.innerHTML = `
            <div class="detail-empty">
                <h3>Seleccione un evento</h3>
                <p>
                    Aquí se mostrará la información del evento seleccionado.
                </p>
            </div>
        `
        return
    }

    const evento = buscarEventoPorId(idEvento)

    const disponibles = calcularDisponibles(evento)

    const cantidadSolicitada =
        Number(cantidadCupos.value)

    const cuposRestantes =
        disponibles - cantidadSolicitada

    if (cantidadSolicitada > disponibles) {

        detalleEventoInscripcion.style.opacity = "0.6"

    } else {

        detalleEventoInscripcion.style.opacity = "1"
    }

    detalleEventoInscripcion.innerHTML = `
        <img src="${evento.imagen}"
             alt="${evento.nombre}">

        <div class="detail-content">

            <h3>${evento.nombre}</h3>

            <div class="detail-grid">

                <div class="detail-item">
                    <span>Categoría</span>
                    <strong>${evento.categoria}</strong>
                </div>

                <div class="detail-item">
                    <span>Modalidad</span>
                    <strong>${evento.modalidad}</strong>
                </div>

                <div class="detail-item">
                    <span>Cupos Totales</span>
                    <strong>${evento.cuposTotales}</strong>
                </div>

                <div class="detail-item">
                    <span>Inscritos</span>
                    <strong>${evento.inscritos}</strong>
                </div>

                <div class="detail-item">
                    <span>Disponibles</span>
                    <strong>${disponibles}</strong>
                </div>

                <div class="detail-item">
                    <span>Restarían</span>
                    <strong>${cuposRestantes}</strong>
                </div>

            </div>

            <div class="event-tags">
                ${evento.etiquetas.map(function (etiqueta) {
        return `<span>${etiqueta}</span>`
    }).join("")}
            </div>

        </div>
    `
}

function generarVistaPrevia() {

    const idEvento =
        selectEventoInscripcion.value

    if (idEvento === "") {

        resumenInscripcion.textContent =
            "Debe seleccionar un evento."

        return
    }

    const evento =
        buscarEventoPorId(idEvento)

    const disponibles =
        calcularDisponibles(evento)

    const solicitados =
        Number(cantidadCupos.value)

    const restantes =
        disponibles - solicitados

    const participante =
        nombreParticipante.value

    if (solicitados > disponibles) {

        resumenInscripcion.className =
            "registration-summary summary-warning"

        resumenInscripcion.innerHTML = `
            Participante: ${participante}<br>
            Evento: ${evento.nombre}<br>
            Cupos solicitados: ${solicitados}<br>
            Cupos disponibles actuales: ${disponibles}<br>
            Cupos restantes si continúa: ${restantes}<br>
            Estado: No hay suficientes cupos para esta solicitud.
        `

    } else {

        resumenInscripcion.className =
            "registration-summary summary-success"

        resumenInscripcion.innerHTML = `
            Participante: ${participante}<br>
            Evento: ${evento.nombre}<br>
            Cupos solicitados: ${solicitados}<br>
            Cupos disponibles actuales: ${disponibles}<br>
            Cupos restantes si continúa: ${restantes}<br>
            Estado: La inscripción puede continuar.
        `
    }
}

function crearTarjetaEvento(evento) {
    const disponibles = calcularDisponibles(evento)
    const estado = obtenerEstadoEvento(evento)
    const claseEstado = obtenerClaseEstado(evento)

    const tarjeta = document.createElement("article")
    tarjeta.classList.add("dynamic-event-card")

    tarjeta.innerHTML = `
        <div class="event-image-box">
            <img src="${evento.imagen}" alt="Imagen del evento ${evento.nombre}">
            <span class="event-status ${claseEstado}">
                ${estado}
            </span>
        </div>
        <div class="dynamic-event-content">
            <span class="event-category">
                ${evento.categoria}
            </span>
            <h3>${evento.nombre}</h3>
            <p>
                Modalidad:
                <strong>${evento.modalidad}</strong>
            </p>
            <p>
                Cupos disponibles:
                <strong>${disponibles}</strong>
            </p>
            <div class="event-tags">
                ${evento.etiquetas.map(function (etiqueta) {
        return `<span>${etiqueta}</span>`
    }).join("")}
            </div>
        </div>
    `
    return tarjeta
}

function renderizarEventos(listaEventos) {
    contenedorEventos.innerHTML = ""
    if (listaEventos.length === 0) {
        mensajeEventos.textContent =
            "No se encontraron eventos activos con los filtros seleccionados."
        contenedorEventos.innerHTML = `
            <div class="dynamic-empty-state">
                <h3>Sin resultados</h3>
                <p>
                    Cambie los filtros para visualizar otros eventos disponibles.
                </p>
            </div>
        `
        return
    }
    mensajeEventos.textContent =
        `Mostrando ${listaEventos.length} evento(s) activo(s).`
    for (const evento of listaEventos) {
        const tarjeta = crearTarjetaEvento(evento)
        contenedorEventos.appendChild(tarjeta)
    }
}

function filtrarEventos() {
    const categoriaSeleccionada = filtroCategoria.value
    const modalidadSeleccionada = filtroModalidad.value
    const etiquetaSeleccionada = filtroEtiqueta.value
    const eventosFiltrados = eventos.filter(function (evento) {
        const cumpleActivo = evento.activo
        const cumpleCategoria =
            categoriaSeleccionada === "" ||
            evento.categoria === categoriaSeleccionada
        const cumpleModalidad =
            modalidadSeleccionada === "" ||
            evento.modalidad === modalidadSeleccionada
        const cumpleEtiqueta =
            etiquetaSeleccionada === "" ||
            evento.etiquetas.includes(etiquetaSeleccionada)
        return cumpleActivo &&
            cumpleCategoria &&
            cumpleModalidad &&
            cumpleEtiqueta
    })
    renderizarEventos(eventosFiltrados)
}

function limpiarFiltros() {
    filtroCategoria.value = ""
    filtroModalidad.value = ""
    filtroEtiqueta.value = ""

    filtrarEventos()
}

filtroCategoria.addEventListener("change", filtrarEventos);
filtroModalidad.addEventListener("change", filtrarEventos);
filtroEtiqueta.addEventListener("change", filtrarEventos);
btnLimpiarFiltros.addEventListener("click", limpiarFiltros);

document.addEventListener("DOMContentLoaded", function () {
    cargarFiltros();
    cargarEventos();
    renderizarEventos(obtenerEventosActivos());
});
