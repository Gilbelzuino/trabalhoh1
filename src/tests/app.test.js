const app = require('../index');
const request = require ('supertest');
const { validate : isUuid } = require("uuid");

    describe("Teste 1 - Criar novo cadstro", () =>{
        it ("POST", async () =>{
        
            //Chamada API metodo POST
            const response = await request(app)
            .post("/")
            .send({

                "name" : "Gilmar",
                cpf : 0147,
                peso : 60,
                altura : 1.72,
               
            })
                .expect(200);
                expect(isUuid(response.body.newCadastro.id)).toBe(true);
                expect(response.body).toMatchObject({

                "newCadastro": {
                        "name" : "Gilmar",
                        cpf : 0147,
                        peso : 60,
                        altura : 1.72,
                        imc :  20.3,
                        "classificacao" : "Peso Normal"


                }
            

                });
             });
         });

         describe("Teste 2 - excluir um cadastro que não existe", () => {
            it("DELETE - cadastro 010 que não existe", async () => {
                await request(app).delete('/123')
                    .expect(404);
            });
        });

        describe("Teste 3 - atualização de um cadastro", () => {
            //2 passos realizar um cadastro e depois atualizar ele
            it("POST e PUT - teste metodo atualizar cadastro", async () => {
                //chamada da API no metodo POST
                const response = await request(app)
                    .post("/")
                    .send({
                        "name" : "Gilmar",
                         cpf : 0147,
                         peso : 60,
                        altura : 1.72
                    })
                    .expect(200);
                expect(isUuid(response.body.newCadastro.id)).toBe(true);
                expect(response.body).toMatchObject({
                   
                    "newCadastro": {
                        "name" : "Gilmar",
                        cpf : 0147,
                        peso : 60,
                        altura : 1.72,
                        imc :  20.3,
                        "classificacao" : "Peso Normal"
                    }
                });
                
                //atualizar cadastro
        
                const responseUpd = await request(app)
                    .put(`/${response.body.newCadastro.id}`)
                    .send({
                        "name" : "Gilmar",
                         cpf : 0147,
                         peso : 60,
                        altura : 1.72
                    })
                    .expect(200);
                expect(responseUpd.body).toMatchObject({
                    "name" : "Gilmar",
                    cpf : 0147,
                    peso : 60,
                   altura : 1.72
                });
            });
        });
        
        afterAll(done => {
            app.close();
            done();
        });