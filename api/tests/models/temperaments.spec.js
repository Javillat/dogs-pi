const {Temperament, conn} = require('../../src/db.js');
const { expect } = require('chai');

describe('Temperament model', () => {
    before(() => 
        conn.authenticate().catch((err) => {
        console.log('Imposible conectar a la base de datos', err);
    })
    );
    describe("Validadores", ()=>{
        beforeEach(()=>Temperament.sync({force:true}));
        describe("id",()=>{
            it("Muestra error si el Id es nulo", (done)=>{
                Temperament.create({})
                .then(()=> done(new Error("Id no puede ser nulo")))
                .catch(()=> done());
            });
            it("Pasa si ID no es nulo", () => {
                Temperament.create({id:200});
            })
        });

        describe("name",()=>{
            it("Muestra error si el name es nulo", (done)=>{
                Temperament.create({})
                .then(()=> done(new Error("El name no puede ser nulo")))
                .catch(()=> done());
            });
            it("Pasa si name no es nulo", () => {
                Temperament.create({name:"Feliz"});
            })
        });
    })
})