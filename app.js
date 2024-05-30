/*CONEXAO API*/

async function listaDeProdutos () {
    const conexao = await fetch("http://localhost:3000/produtos");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

/*MOSTRAR VIDEOS*/

const lista = document.querySelector("[data-lista-produtos]");

function constroiCard (nome, preco, imagem) {
    const produto = document.createElement("div");
    produto.className = "produto";
    produto.innerHTML = `<img src="${imagem}" alt="" class="produto__imagem">
    <p class="produto__nome">${nome}</p>
    <div class="produto__valor__lixeira">
        <p class="produto__valor">${preco}</p>
        <a href="" class="produto__lixeira">
            <img src="/assets/🦆 icon _trash 2_.png" alt="">
        </a>
    </div>`;

    return produto;
}

async function listaProduto () {
    try {
        const listaApi = await listaDeProdutos();
        listaApi.forEach(elemento => lista.appendChild(constroiCard(elemento.nome, elemento.preco, elemento.imagem)));
    } catch {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de produtos</h2>`
    }
}

listaProduto()

/*FORMULARIO*/

const formulario = document.querySelector("[data-formulario]");

async function criaProdutos (nome, valor, imagem) {
    const conexao = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            valor: valor,
            imagem: imagem
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar o produto")
    }
    const conexaoConvertida = conexao.json();

    return conexaoConvertida;
}

async function postaProduto (evento) {
    evento.preventDefaut()
    const nome = document.querySelector("[data-nome]");
    const valor = document.querySelector("[data-valor]");
    const imagem = document.querySelector("[data-imagem]");
    try {
        await criaProdutos(nome, valor, imagem)
    } catch (e) {
        alert (e)
    }
}

formulario.addEventListener("submit", evento => postaProduto(evento))