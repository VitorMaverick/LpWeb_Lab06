module.exports = function (app) {

    app.get('/livros', function (req, resp) {

        let conexao = new app.infra.ConnectionFactory().getConexao();
        let livros = new app.repositorio.LivroRepository(conexao);

        if(req.query.id){
            let conexao = new app.infra.ConnectionFactory().getConexao();
            let livros = new app.repositorio.LivroRepository(conexao);

            livros.porId(req.query.id, function (erros, resultado) {

                if (erros) {
                    console.log(erros);
                }
                resp.render('livros/listagem', {lista: resultado });
            })
        }else if(req.query.nome){
            let conexao = new app.infra.ConnectionFactory().getConexao();
            let livros = new app.repositorio.LivroRepository(conexao);

            livros.porNome(req.query.nome, function (erros, resultado) {

                if (erros) {
                    console.log(erros);
                }
                resp.render('livros/listagem', {lista: resultado });
            })
        }else if(req.query.autor){
            let conexao = new app.infra.ConnectionFactory().getConexao();
            let livros = new app.repositorio.LivroRepository(conexao);

            livros.porAutor(req.query.autor, function (erros, resultado) {

                if (erros) {
                    console.log(erros);
                }
                resp.render('livros/listagem', {lista: resultado });
            })
        }
        livros.todos(function (erros, resultado) {

            if (erros) {
                console.log(erros);
            }
            resp.render('livros/listagem', {lista: resultado });
        });
        conexao.end();
    });

   
    app.get('/livros/form', function (req, resp) {
        resp.render('livros/form-cadastro', {errosValidacao: {},  livro: {} });
    });


    app.post('/livros', function (req, resp) {

        let livro = req.body;
        console.log(livro);

        req.assert('nome', 'Nome do livro é obrigatório.').notEmpty();
        req.assert('preco', 'Preço no Formato inválido').isFloat();
        req.assert('preco', 'Preço do livro é obrigatório.').notEmpty();
        req.assert('editora', 'Editora do livro é obrigatória.').notEmpty();
        req.assert('autor', 'Nome do autor do livro é obrigatório.').notEmpty();
        req.assert('descricao', 'Descrição do livro é obrigatória.').notEmpty();
        req.assert('ano', 'Ano de lançamento do livro é obrigatório.').notEmpty();
        
        

        let erros = req.validationErrors();

        if (erros) {
            resp.render('livros/form-cadastro', { errosValidacao: erros, livro: livro });
            return;
        }


        let conexao = new app.infra.ConnectionFactory().getConexao();
        let livros = new app.repositorio.LivroRepository(conexao);

        livros.salva(livro, function (erros, resultados) { 
           resp.redirect('/livros');
        });

        conexao.end();

    });

    app.post('/livros/remove/(:id)', function (req, resp) {
        let livro = {
            id: req.params.id
        }

        let conexao = new app.infra.ConnectionFactory().getConexao();
        let livros = new app.repositorio.LivroRepository(conexao);

        livros.remove(livro, function (erros, resultados) {
            resp.redirect('/livros');
        });
    });


    app.get('/livro/edita/(:id)', function (req, resp) {
        

        let conexao = new app.infra.ConnectionFactory().getConexao();
        let livros = new app.repositorio.LivroRepository(conexao);

        livros.porId(req.params.id, function (erros, resultado) {
            if (erros ) {
                console.log(erros);
            }
            resp.render('livros/form-cadastro', {errosValidacao: erros,  
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