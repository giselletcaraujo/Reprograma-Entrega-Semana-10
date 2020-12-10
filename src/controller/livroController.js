const livros = require('../model/livros.json');
const fs = require("fs");

const postLivros = (req,res) => {
    console.log(req.body);
    const {id, nomeDoLivro, editora, lancamento, autor, genero} = req.body;
    livros.push({id, nomeDoLivro, editora, lancamento, autor, genero});

    fs.writeFile("./src/model/livros.json" , JSON.stringify(livros), 'utf8', function(err) {
        if (err) {
        return res.status(424).send({ message:err });
    }
        console.log("Arquivo atualizado com sucesso");
    });

    res.status(201).send(livros)

};
const deleteLivro = (req, res) => {
const id = req.params.id;
const livroFiltrado = livros.find((livro) => livro.id == id);
const index = livros.indexOf(livroFiltrado);
livros.splice(index,1);

fs.writeFile("./src/model/livros.json" , JSON.stringify(livros), 'utf8', function(err) {
    if (err) {
        return res.status(424).send({message:err});
};
console.log("Arquivo atualizado com sucesso");

res.status(200).send(livros)

});

};
const getLivrosByGenero = (req,res) => {
    const genero = req.query.genero
    if (genero) {
        const livroByGenre = livros.filter(livro => livro.genero.includes(genero))
        res.status(200).send(livroByGenre)
    } else{
        res.status(200).send(livros)
    }
    
}
const getAllNomeLivro = (req, res) => {
    const nomeLivro = livros.map((livro) => livro.nomeDoLivro)
    res.status(200).send(nomeLivro)
}

module.exports = {
    postLivros,
    deleteLivro,
    getLivrosByGenero,
    getAllNomeLivro

};

const putLivro = (req, res) => {
    const id = req.params.id;
    try {
        const livroASerModificado = livros.find((livro) => livro.id == id);
        console.log(livroASerModificado);

        const livroAtualizado = req.body;
        console.log(livroAtualizado);

        const index = livros.indexOf(livroASerModificado);
        console.log(index);

        livros.splice(index, 1, livroAtualizado);
        console.log(livros);
        fs.writeFile("./src/model/livros.json",JSON.stringify(livros),"utf8",function (err) {
                if (err) {
                    return res.status(500).send({message: err,});
                }
                console.log("Arquivo modificado com sucesso");
            }
        );

        res.status(200).send(livros);
    } catch (err) {
        return res.status(424).send({
            message: err,
        });
    }
};

const patchLivro = (req, res) => {
    const id = req.params.id;
    const atualizacao = req.body;
    console.log(atualizacao);
    try {
        const livroASerModificado = livros.find((livro) => livro.id == id);
        Object.keys(atualizacao).forEach((chave) => {
        livroASerModificado[chave] = atualizacao[chave];
        });
        fs.writeFile("./src/model/livros.json",JSON.stringify(livros),"utf8", function (err) {
                if (err) {
                    return res.status(424).send({
                    message: err,
                    });
                }
                console.log("Arquivo modificado com sucesso");
            }
        );

        return res.status(200).send(livros);
    } catch (err) {
        return res.status(424).send({
            message: err,
        });
    }
};

module.exports = {
        putLivro,
        patchLivro
};