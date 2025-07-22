const preguntas = [
  { texto: "Prefiero hacer un mapa que explicarle a alguien como tiene que llegar.", cat: "C" }, // 1
  { texto: "Si estoy enojado(a) o contento(a) generalmente sé exactamente por qué.", cat: "F" }, // 2
  { texto: "Sé tocar (o antes sabía tocar) un instrumento musical.", cat: "E" }, // 3
  { texto: "Asocio la música con mis estados de ánimo.", cat: "E" }, // 4
  { texto: "Puedo sumar o multiplicar mentalmente con mucha rapidez.", cat: "B" }, // 5
  { texto: "Puedo ayudar a un amigo a manejar sus sentimientos porque yo lo pude hacer antes en relación a sentimientos parecidos.", cat: "F" }, // 6
  { texto: "Me gusta trabajar con calculadoras y computadores.", cat: "B" }, // 7
  { texto: "Aprendo rápido a bailar un ritmo nuevo.", cat: "D" }, // 8
  { texto: "No me es difícil decir lo que pienso en el curso de una discusión o debate.", cat: "A" }, // 9
  { texto: "Disfruto de una buena charla, discurso o sermón.", cat: "A" }, // 10
  { texto: "Siempre distingo el norte del sur, esté donde esté.", cat: "C" }, // 11
  { texto: "Me gusta reunir grupos de personas en una fiesta o en un evento especial.", cat: "G" }, // 12
  { texto: "La vida me parece vacía sin música.", cat: "E" }, // 13
  { texto: "Siempre entiendo los gráficos que vienen en las instrucciones de equipos o instrumentos.", cat: "C" }, // 14
  { texto: "Me gusta hacer rompecabezas y entretenerme con juegos electrónicos.", cat: "B" }, // 15
  { texto: "Me fue fácil aprender a andar en bicicleta (o patines).", cat: "D" }, // 16
  { texto: "Me enojo cuando oigo una discusión o una afirmación que parece ilógica.", cat: "A" }, // 17
  { texto: "Soy capaz de convencer a otros que sigan mis planes.", cat: "G" }, // 18
  { texto: "Tengo buen sentido de equilibrio y coordinación.", cat: "D" }, // 19
  { texto: "Con frecuencia veo configuraciones y relaciones entre números con más rapidez y facilidad que otros.", cat: "B" }, // 20
  { texto: "Me gusta construir modelos (o hacer esculturas).", cat: "D" }, // 21
  { texto: "Tengo agudeza para encontrar el significado de las palabras.", cat: "A" }, // 22
  { texto: "Puedo mirar un objeto de una manera y con la misma facilidad verlo.", cat: "C" }, // 23
  { texto: "Con frecuencia hago la conexión entre una pieza de música y algún evento de mi vida.", cat: "E" }, // 24
  { texto: "Me gusta trabajar con números y figuras.", cat: "B" }, // 25
  { texto: "Me gusta sentarme silenciosamente y reflexionar sobre mis sentimientos íntimos.", cat: "F" }, // 26
  { texto: "Con sólo mirar la forma de construcciones y estructuras me siento a gusto.", cat: "C" }, // 27
  { texto: "Me gusta tararear, silbar y cantar en la ducha o cuando estoy solo(a).", cat: "E" }, // 28
  { texto: "Soy bueno(a) para el atletismo.", cat: "D" }, // 29
  { texto: "Me gusta escribir cartas detalladas a mis amigos.", cat: "A" }, // 30
  { texto: "Generalmente me doy cuenta de la expresión que tengo en la cara.", cat: "F" }, // 31
  { texto: "Me doy cuenta de las expresiones en la cara de otras personas.", cat: "G" }, // 32
  { texto: "Me mantengo en contacto con mis estados de ánimo. No me cuesta identificarlos.", cat: "F" }, // 33
  { texto: "Me doy cuenta de los estados de ánimo de otros.", cat: "G" }, // 34
  { texto: "Me doy cuenta bastante bien de lo que otros piensan de mí.", cat: "G" }  // 35
];

let indice = 0;
let puntajes = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 };
let datosUsuario = { nombre: "", edad: "", carrera: "" };
const seccionInicio = document.getElementById('inicio');
const seccionPreguntas = document.getElementById('preguntas');
const seccionResultado = document.getElementById('resultado');

const textoPregunta = document.getElementById('texto-pregunta');
const progreso = document.getElementById('progreso');
const textoResultado = document.getElementById('texto-resultado');
const detalleResultados = document.getElementById('detalle-resultados');
const contenedorPregunta = document.getElementById('contenedor-pregunta');
const mensajeError = document.getElementById('mensajeError');

const botonesOpcion = document.querySelectorAll('.btn-opcion');

const inputNombre = document.getElementById('nombre');
const inputEdad = document.getElementById('edad');
const inputCarrera = document.getElementById('carrera');
const nombresCats = {
  A: "Inteligencia Verbal",
  B: "Inteligencia Lógico-Matemática",
  C: "Inteligencia Visual-Espacial",
  D: "Inteligencia Corporal-Kinestésica",
  E: "Inteligencia Musical",
  F: "Inteligencia Intrapersonal",
  G: "Inteligencia Interpersonal"
};
function contarMaximos() {
  const max = { A:0,B:0,C:0,D:0,E:0,F:0,G:0 };
  preguntas.forEach(p => max[p.cat]++);
  return max;
}
const maxPorCat = contarMaximos();

function interpretar(cat) {
  const puntos = puntajes[cat];
  const max = maxPorCat[cat] || 5;
  if (puntos >= 5 && max >= 5 && puntos === max) return "Sobresaliente";
  if (puntos >= 4) return "Habilidad marcada";
  if (puntos === 3) return "Moderado";
  if (puntos === 2) return "Bajo";
  return "Muy bajo";
}

function mostrarPantalla(pantalla) {
  document.querySelectorAll('.pantalla').forEach(sec => sec.classList.remove('active'));
  pantalla.classList.add('active');
}
function cargarPregunta() {
  if (indice < preguntas.length) {
    contenedorPregunta.classList.remove('anim-slide-in','anim-slide-out');
    void contenedorPregunta.offsetWidth; 
    contenedorPregunta.classList.add('anim-slide-in');
    textoPregunta.textContent = `${indice + 1}. ${preguntas[indice].texto}`;
    progreso.style.width = ((indice) / preguntas.length) * 100 + '%';
  } else {
    mostrarResultado();
  }
}

function responder(respuesta) {
  if (respuesta === 'V' && indice < preguntas.length) {
    puntajes[preguntas[indice].cat]++;
  }
  contenedorPregunta.classList.remove('anim-slide-in');
  contenedorPregunta.classList.add('anim-slide-out');
  setTimeout(() => {
    indice++;
    cargarPregunta();
  }, 250);
}
function mostrarResultado() {
  progreso.style.width = '100%';
  mostrarPantalla(seccionResultado);

  const maxCat = Object.keys(puntajes)
    .reduce((a, b) => (puntajes[a] > puntajes[b] ? a : b));

  textoResultado.textContent = `
    ${datosUsuario.nombre} (${datosUsuario.edad} años) - ${datosUsuario.carrera}
    → Tu inteligencia predominante es: ${nombresCats[maxCat]} con ${puntajes[maxCat]} punto(s).
  `.trim();

  let filas = '';
  Object.keys(puntajes).forEach(cat => {
    filas += `
      <tr>
        <td>${nombresCats[cat]}</td>
        <td>${puntajes[cat]} / ${maxPorCat[cat]}</td>
        <td>${interpretar(cat)}</td>
      </tr>
    `;
  });

  detalleResultados.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Inteligencia</th>
          <th>Puntos</th>
          <th>Interpretación</th>
        </tr>
      </thead>
      <tbody>${filas}</tbody>
    </table>
  `;
}
function validarDatos() {
  mensajeError.textContent = "";
  if (!inputNombre.value.trim() ||
      !inputEdad.value.trim() ||
      !inputCarrera.value.trim()) {
    mensajeError.textContent = "Por favor completa todos los campos antes de iniciar.";
    return false;
  }
  return true;
}
document.getElementById('btnIniciar').addEventListener('click', () => {
  if (!validarDatos()) return;
  datosUsuario.nombre = inputNombre.value.trim();
  datosUsuario.edad = inputEdad.value.trim();
  datosUsuario.carrera = inputCarrera.value.trim();
  mostrarPantalla(seccionPreguntas);
  indice = 0;
  cargarPregunta();
});

botonesOpcion.forEach(btn => {
  btn.addEventListener('click', () => {
    responder(btn.dataset.respuesta);
  });
});

document.getElementById('btnReiniciar').addEventListener('click', () => {
  indice = 0;
  puntajes = { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 };
  mostrarPantalla(seccionInicio);
  progreso.style.width = '0';
  mensajeError.textContent = "";
});

