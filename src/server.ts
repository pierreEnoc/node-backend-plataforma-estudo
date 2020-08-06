import express from 'express';

const app = express();
app.use(express.json())
// rotas 
//corpo(Reuest Body): Dados para cria de um registro
//Route Params: Identificar qual recurso eu quero atualizar ou deleter
//Query Params: listagem paginacao, filtro,ordrnacao etc..

app.post('/users', (request, response) => {

    console.log(request.query);

    const users = [
        {name: 'Pierre', age: 38 },
        {name: 'Marcia', age: 33 },
    ];

    return response.json(users);
});

app.listen(3333);