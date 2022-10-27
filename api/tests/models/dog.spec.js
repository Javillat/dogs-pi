const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));

    describe('id', () =>{
      it('Debe mostrar un error si id es null', (done)=> {
        Dog.create({})
        .then(()=> done(new Error('Requiere que id no sea null')))
        .catch(() => done());
      });
      it('Debe pasar sin problemas si tiene un id valido', ()=>{
        Dog.create({ id:"BD-10"});
      })
    });

    describe('name', () => {
      it('Debe mostrar un error si name es null', (done) => {
        Dog.create({})
          .then(() => done(new Error('Requiere un name valido')))
          .catch(() => done());
      });
      it('Debe pasar sin problema si tiene un name valido', () => {
        Dog.create({ name: 'Pug' });
      });
    });

    describe('minheight', () =>{
      it('Debe mostrar un error si minheight es null', (done)=> {
        Dog.create({})
        .then(()=> done(new Error('Requiere que minheight no sea null')))
        .catch(() => done());
      });
      it('Debe pasar sin problemas si tiene un minheight valido', ()=>{
        Dog.create({ minheight:2});
      })
    });

    describe('maxheight', () =>{
      it('Debe mostrar un error si maxheight es null', (done)=> {
        Dog.create({})
        .then(()=> done(new Error('Requiere que maxheight no sea null')))
        .catch(() => done());
      });
      it('Debe pasar sin problemas si tiene un maxheight valido', ()=>{
        Dog.create({ maxheight:5});
      })
    });

    describe('minweight', () =>{
      it('Debe mostrar un error si minweight es null', (done)=> {
        Dog.create({})
        .then(()=> done(new Error('Requiere que minweight no sea null')))
        .catch(() => done());
      });
      it('Debe pasar sin problemas si tiene un minweight valido', ()=>{
        Dog.create({ minweight:4});
      })
    });

    describe('maxweight', () =>{
      it('Debe mostrar un error si maxweight es null', (done)=> {
        Dog.create({})
        .then(()=> done(new Error('Requiere que maxweight no sea null')))
        .catch(() => done());
      });
      it('Debe pasar sin problemas si tiene un maxweight valido', ()=>{
        Dog.create({ maxweight:56});
      })
    });
    
  });
});
