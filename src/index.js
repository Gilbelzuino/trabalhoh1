//importando pacote express
const express = require("express");
const { uuid } = require('uuidv4');
const { validate : isUuid } = require("uuid");
const cors = require('cors');
//preparar para usar express
const app = express();
app.use(express.json());
app.use(cors());

const repositories = [];

// 1 parametro o nome da rota
// 2 parametro ação qeu vou fazer função  
// java script arrow function
// (parametros) => {codigos programa fazer}

app.get('/', (request, response) => {
    //codigo funcao

    return response.send(repositories);

});

function calculaImc(peso, altura){

return peso / (altura*altura);

}

function classificaIMC (vlrIMC){

    if (vlrIMC < 18.5)

return "Peso Baixo";

if (vlrIMC >= 18.5 && vlrIMC < 24.9)

return "Peso Normal";

if (vlrIMC >= 25.0 && vlrIMC < 29.9)

return "Sobrepeso";

if (vlrIMC >= 30.0  && vlrIMC < 34.9)

return "Obesidade Grau - 1 ";

if (vlrIMC >= 35.0  && vlrIMC < 39.9)

return "Obesidade Severa Grau - 2";

if (vlrIMC >= 40.0)

return "Obesidade Severa Grau - 3";


}



app.post('/', (request, response) => {

    
    
    const { name, cpf, altura, peso } = request.body;
    
    //destruturação
    let imc = calculaImc(peso,altura);
    let classificacao = classificaIMC(imc);
    
    
    const newCadastro = { id: uuid(), name, cpf, altura, peso , imc, classificacao};
    repositories.push({ newCadastro });
    return response.json({ newCadastro });



});


app.put('/:id', (request, response) => {
    //route params guid

    const { id } = request.params;
    const { name, cpf, altura, peso } = request.body;
    const CadastroProcurado = repositories.findIndex(cadastroIndex => cadastroIndex.newCadastro.id == id);


    console.log(id);
    console.log(request.body);
    console.log(CadastroProcurado);
    console.log(repositories);

    if (CadastroProcurado < 0) {

        return response.status(404).json({ "ERROR": "Cadastro não Localizado" });

    }

    const newCadastro = { id, name, cpf, altura, peso };
    repositories[CadastroProcurado] = newCadastro;
    return response.json(newCadastro);

});

app.delete('/:id', (request, response) => {

    const { id } = request.params;

    const CadastroProcurado = repositories.findIndex(cadastroIndex => cadastroIndex.newCadastro.id == id);
    if (CadastroProcurado < 0) {

        return response.status(404).json({ "ERROR": `Cadastro ${id} não localizado` });

    }

    repositories.splice(CadastroProcurado, 1);
    return response.json({ "Mensagem": `Cadastro ${id} excluido` });


});




module.exports = app.listen(process.env.PORT || 3333, () => {
    console.log("Server running");
});