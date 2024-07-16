/*CONEXAO API*/

async function listaDeProdutos () {
    const conexao = await fetch("http://localhost:3000/produtos");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

 let ultimoId = 0
async function criaProdutos (nome, valor, imagem) {
    const novoId = ++ultimoId
    const conexao = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            preco: valor,
            imagem: imagem,
            id: novoId
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar o produto")
    }
    const conexaoConvertida =  await conexao.json();

    return {conexaoConvertida, id: novoId};
}


async function deletaProdutos(id) {
    try {
      const response = await fetch(`http://localhost:3000/produtos`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'ContentType': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao deletar o produto: ${errorData.message}`);
      }
  
      console.log('Produto deletado com sucesso!');
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  }

/*MOSTRAR VIDEOS*/

const lista = document.querySelector("[data-lista-produtos]");

function constroiCard (nome, preco, imagem, id) {
    const produto = document.createElement("div");
    produto.className = "produto";
    produto.id = `${id}`
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
        lista.innerHTML = '';
        listaApi.forEach(elemento => {
            const produto = constroiCard(elemento.nome, elemento.preco, elemento.imagem, elemento.id);
            lista.appendChild(produto);
            ultimoId = Math.max(ultimoId, elemento.id);});
        
    } catch {
        lista.innerHTML = `<h2 class="mensagem__titulo">Não foi possível carregar a lista de produtos</h2>`
    }
}


/*FORMULARIO*/

const formulario = document.querySelector("[data-formulario]");

async function postaProduto (evento) {
    evento.preventDefault()
    const nome = document.querySelector("[data-nome]").value;
    const preco = document.querySelector("[data-valor]").value;
    const imagem = document.querySelector("[data-imagem]").value;
    try {
        const novoProduto = await criaProdutos(nome, preco, imagem);
        lista.appendChild(constroiCard(novoProduto.nome, novoProduto.preco, novoProduto.imagem, novoProduto.id));
        ultimoId = novoProduto.id;
    } catch (e) {
        alert (e)
    }
}

formulario.addEventListener("submit", evento => postaProduto(evento))


/*DELETAR PRODUTO*/
const botaoDelete = document.querySelectorAll(".produto__lixeira")

async function deletaProduto(evento) {
    evento.preventDefault();
    const produtoElement = evento.target.closest(".produto");
    const id = produtoElement.id;
    try {
        await deletaProdutos(id);
        produtoElement.remove();
        ultimoId = Math.max(ultimoId, id);
    } catch (e) {
        alert(e);
    }
} 
botaoDelete.forEach(botao => {
    botao.addEventListener("click", (evento) => deletaProduto(evento));
});

listaProduto()