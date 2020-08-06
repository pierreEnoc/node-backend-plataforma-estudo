import express from 'express';

const app = express();
app.use(express.json())
// rotas 
//corpo(Reuest Body): Dados para cria de um registro
//Route Params: Identificar qual recurso eu quero atualizar ou deleter
//Query Params: listagem paginacao, filtro,ordrnacao etc..

app.get('/', (request, response) => {

    return response.json({message:'Hello'});
});

app.listen(3333);