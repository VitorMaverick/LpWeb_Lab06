 
class LivroRepository {
    
    constructor(conexao) {
       this._conexao = conexao;
    }

    porId(id, callback ) {
        this._conexao.query(`select * from livro where id = ${id}`, callback);
    }
    porNome(nome, callback ) {
        this._conexao.query(`select * from livro where nome like '%${nome}%'`, callback);
    }
    porAutor(autor, callback ) {
        this._conexao.query(`select * from livro where autor like '%${autor}%'`, callback);
    }


    todos(callback) {
      this._conexao.query('select * from livro', callback);
    }

   
    salva(livro, callback) {
        console.log('ID ' + livro.id);

        if ( (livro.hasOwnProperty('id')) && (livro.id > 0) ) {
               this._conexao.query('update livro set ? where id = ' + livro.id, livro, callback);
               console.log('executou update');

        } else {
            this._conexao.query('insert into livro set ?', livro, callback);
            console.log('executou insert');

        }    
    }

    remove(livro, callback) {
        this._conexao.query('delete from livro where id = ' + livro.id, callback);
    }

} 

module.exports = () => { return LivroRepository };