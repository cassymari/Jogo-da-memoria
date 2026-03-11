let tempo = 0;
let timer;
let primeira = null;
let segunda = null;
let travar = false;
let pares = 0;

const emojisBase = [
    "🍎","🍌","🍇","🍓","🍍","🥝",
    "🍉","🍒","🥑","🍑","🍋","🍊","🥥","🍈","🍏","🍐","🥭","🍅"
];

function iniciarJogo() {
    clearInterval(timer);
    tempo = 0;
    document.getElementById("tempo").innerText = tempo;
    document.getElementById("mensagem").innerText = "";
    pares = 0;
    primeira = null;
    segunda = null;
    travar = false;

    const nivel = Number(document.getElementById("nivel").value);
    const totalCartas = nivel * nivel;
    const emojis = emojisBase.slice(0, totalCartas / 2);
    let cartas = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = "";
    tabuleiro.style.gridTemplateColumns = `repeat(${nivel}, 1fr)`;

    cartas.forEach(emoji => {
        const carta = document.createElement("div");
        carta.classList.add("carta");

        carta.innerHTML = `
            <div class="carta-inner">
                <div class="face frente"></div>
                <div class="face verso">${emoji}</div>
            </div>
        `;

        carta.addEventListener("click", () => virarCarta(carta, emoji));
        tabuleiro.appendChild(carta);
    });

    timer = setInterval(() => {
        tempo++;
        document.getElementById("tempo").innerText = tempo;
    }, 1000);
}

function virarCarta(carta, emoji) {
    if (travar || carta.classList.contains("virada")) return;

    carta.classList.add("virada");

    if (!primeira) {
        primeira = { carta, emoji };
    } else {
        segunda = { carta, emoji };
        verificarPar();
    }
}

function verificarPar() {
    travar = true;

    if (primeira.emoji === segunda.emoji) {
        primeira.carta.classList.add("acertou");
        segunda.carta.classList.add("acertou");
        pares++;

        resetar();

        const nivel = Number(document.getElementById("nivel").value);
        if (pares === (nivel * nivel) / 2) {
            clearInterval(timer);
            document.getElementById("mensagem").innerText =
                `🎉 Você venceu em ${tempo}s!;`
        }
    } else {
        setTimeout(() => {
            primeira.carta.classList.remove("virada");
            segunda.carta.classList.remove("virada");
            resetar();
        }, 900);
    }
}

function resetar() {
    [primeira, segunda] = [null, null];
    travar = false;
}

iniciarJogo();