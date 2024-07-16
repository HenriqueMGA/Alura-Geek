/*CONEXAO API*/

async function listaDeProdutos() {
    const conexao = await fetch("http://localhost:3000/produtos");
    const conexaoConvertida = await conexao.json();
    return conexaoConvertida;
}

let ultimoId = 0
async function criaProdutos(nome, valor, imagem) {
    const novoId = ++ultimoId
    const conexao = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome: nome,
            valor: valor,
            imagem: imagem,
            id: novoId
        })
    });
    if (!conexao.ok) {
        throw new Error("Não foi possível enviar o produto")
    }
    const conexaoConvertida = await conexao.json();

    return { conexaoConvertida, id: novoId };
}


async function deletaProdutos(id) {
    try {
        const conexao = await fetch(`http://localhost:3000/produtos/${Number(id)}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'ContentType': 'application/json'
            }
        });

        if (!conexao.ok) {
            const errorData = await conexao.json(); 
            throw new Error(`Erro ao deletar o produto: ${errorData.message}`);
        }

        console.log('Produto deletado com sucesso!');
        return conexao.json();
    } catch (error) {
        console.error('Erro na requisição:', error);
        throw error;
    }
}

export const conectaApi = {
    listaDeProdutos,
    criaProdutos,
    deletaProdutos
}