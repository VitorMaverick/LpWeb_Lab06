module.exports = function (app) {

    app.get('/produtos', function (req, resp) {

        let conexao = new app.infra.ConnectionFactory().getConexao();
        let produtos = new app.repositorio.ProdutoRepository(conexao);

        produtos.todos(function (erros, resultado) {

            if (erros) {
                console.log(erros);
            }
            resp.render('produtos/listagem', {lista: resultado });
        });
        conexao.end();
    });

    /* ---------------------------------------------------------------- */
    app.get('/produtos/form', function (req, resp) {
        resp.render('produtos/form-cadastro', {errosValidacao: {},  livro: {} });
    });


    app.post('/produtos', function (req, resp) {

        let livro = req.body;
        console.log(livro);

        req.assert('nome', 'Nome do livro é obrigatório.').notEmpty();
        req.assert('preco', 'Preço no Formato inválido').isFloat();
        //req.assert('dataCadastro', 'Data inválida').isDate();

        let erros = req.validationErrors();

        if (erros) {
            resp.render('produtos/form-cadastro', { errosValidacao: erros, livro: livro });
            return;
        }


        let conexao = new app.infra.ConnectionFactory().getConexao();
        let produtos = new app.repositorio.ProdutoRepository(conexao);

        produtos.salva(livro, function (erros, resultados) {
           //resp.render('produtos/listagem' );   
           resp.redirect('/produtos');
        });

        conexao.end();

    });

    app.post('/produtos/remove/(:id)', function (req, resp) {
        let livro = {
            id: req.params.id
        }

        let conexao = new app.infra.ConnectionFactory().getConexao();
        let livros = new app.repositorio.ProdutoRepository(conexao);

        livros.remove(livro, function (erros, resultados) {
            resp.redirect('/produtos');
        });
    });


    app.get('/produto/edita/(:id)', function (req, resp) {
        

        let conexao = new app.infra.ConnectionFactory().getConexao();
        let livros = new app.repositorio.ProdutoRepository(conexao);

        livros.porId(req.params.id, function (erros, resultado) {
            if (erros ) {
                console.log(erros);
            }
            resp.render('produtos/form-cadastro', {errosValidacao: erros,  
                                                    livro: {
                                                        id: resultado[0].id,
                                                        nome: resultado[0].nome,
                                                        editora: resultado[0].editora,
                                                        autor: resultado[0].autor,
                                                        ano: resultado[0].ano,
                                                        preco: resultado[0].preco,
                                                        descricao: resultado[0].descricao } 
            });
            console.log(resultado);
        });
        conexao.end();
    });


}