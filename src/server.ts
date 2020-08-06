import express from 'express';

const app = express();
// rotas 
app.get('/users', (request, response) => {
    const users = [
        {name: 'Pierre', age: 38 },
        {name: 'Marcia', age: 33 },
    ];
    return response.json(users);
});

app.listen(3333);