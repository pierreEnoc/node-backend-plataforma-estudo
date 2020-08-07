import express from 'express';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);
// rotas 
//corpo(Reuest Body): Dados para cria de um registro
//Route Params: Identificar qual recurso eu quero atualizar ou deleter
//Query Params: listagem paginacao, filtro,ordrnacao etc..

