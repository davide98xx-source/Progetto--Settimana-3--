const cambioBg = document.querySelector("#cambio");
const nuovoLibro = document.querySelector(".newLibri");
const ricerca = document.querySelector(".ricerca");
const listaLibri = document.querySelector(".listaLibri");

const tutti = document.querySelector(".tutti");
const letti = document.querySelector(".letti");
const daLeggere = document.querySelector(".leggere");

const numeroLibri = document.querySelector("#numeroLibri");
const contenitoreBarre = document.querySelector(".contenitoreBarre");
const barraI = document.querySelector(".barraI");
const percentualeLettura = document.querySelector(".percentualeLettura");

let filtroAttivo = "tutti";

// =========================
// Aggiornamento pulsanti filtro
// =========================

function aggiornaPulsantiFiltro() {
    tutti.classList.toggle("attivo", filtroAttivo === "tutti");
    daLeggere.classList.toggle("attivo", filtroAttivo === "da-leggere");
    letti.classList.toggle("attivo", filtroAttivo === "letto");
}

// =========================
// Cambio giorno/notte
// =========================

cambioBg.addEventListener("click", function () {
    if (document.body.classList.contains("giorno")) {
        document.body.classList.replace("giorno", "notte");
    } else {
        document.body.classList.replace("notte", "giorno");
    }
});

// =========================
// Creazione di un libro
// =========================

nuovoLibro.addEventListener("keydown", function (evento) {
    if (evento.key !== "Enter") {
        return;
    }

   const titolo = nuovoLibro.value.trim();

if (titolo === "") {
    alert("Inserire il nome del libro");
    nuovoLibro.focus();
    return;
}

    const riga = document.createElement("div");
    riga.dataset.stato = "da-leggere";

    const nomeLibro = document.createElement("span");
    nomeLibro.textContent = titolo;

    const letto = document.createElement("button");
    letto.textContent = "Letto";

    const nonLetto = document.createElement("button");
    nonLetto.textContent = "Non letto";

    const elimina = document.createElement("button");
    elimina.textContent = "Elimina";

    // Segna il libro come letto
    letto.addEventListener("click", function () {
        riga.dataset.stato = "letto";
        riga.classList.add("libro-letto");
        nomeLibro.style.textDecoration = "line-through";

        aggiornaPagina();
    });

    // Segna il libro come da leggere
    nonLetto.addEventListener("click", function () {
        riga.dataset.stato = "da-leggere";
        riga.classList.remove("libro-letto");
        nomeLibro.style.textDecoration = "none";

        aggiornaPagina();
    });

    // Elimina il libro
    elimina.addEventListener("click", function () {
        riga.remove();

        aggiornaPagina();
    });

    riga.appendChild(nomeLibro);
    riga.appendChild(letto);
    riga.appendChild(nonLetto);
    riga.appendChild(elimina);

    listaLibri.appendChild(riga);

    nuovoLibro.value = "";

    aggiornaPagina();
});

// =========================
// Filtri
// =========================

tutti.addEventListener("click", function () {
    filtroAttivo = "tutti";
    aggiornaPulsantiFiltro();
    applicaRicerca();
});

letti.addEventListener("click", function () {
    filtroAttivo = "letto";
    aggiornaPulsantiFiltro();
    applicaRicerca();
});

daLeggere.addEventListener("click", function () {
    filtroAttivo = "da-leggere";
    aggiornaPulsantiFiltro();
    applicaRicerca();
});

// =========================
// Ricerca dei libri
// =========================

ricerca.addEventListener("input", function () {
    applicaRicerca();
});

function applicaRicerca() {
    const libri = listaLibri.children;
    const testoRicerca = ricerca.value.trim().toLowerCase();

    for (let i = 0; i < libri.length; i++) {
        const libro = libri[i];

        const corrispondeStato =
            filtroAttivo === "tutti" ||
            libro.dataset.stato === filtroAttivo;

        const corrispondeTitolo =
            libro.querySelector("span").textContent
                .toLowerCase()
                .includes(testoRicerca);

        libro.style.display =
            corrispondeStato && corrispondeTitolo ? "" : "none";
    }
}

// =========================
// Contatore e percentuale lettura
// =========================

function aggiornaContatore() {
    const libri = listaLibri.children;
    const totale = libri.length;

    let libriLetti = 0;

    for (let i = 0; i < totale; i++) {
        if (libri[i].dataset.stato === "letto") {
            libriLetti++;
        }
    }

    const percentuale = totale === 0
        ? 0
        : Math.round((libriLetti / totale) * 100);

    numeroLibri.textContent = totale;
    barraI.style.width = percentuale + "%";
    percentualeLettura.textContent =
        "Libri letti: " + percentuale + "%";

    contenitoreBarre.setAttribute("aria-valuenow", percentuale);
}

// =========================
// Aggiornamento generale
// =========================

function aggiornaPagina() {
    applicaRicerca();
    aggiornaContatore();
}

// =========================
// Avvio iniziale
// =========================

aggiornaPagina();
aggiornaPulsantiFiltro();