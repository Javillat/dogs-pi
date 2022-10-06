const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const { KEY } = process.env;

/**
 * OBTENER DATA PARA RUTA PRINCIPAL.
 * getDogs
 * Función que sirve los datos traidos desde la API externa y BD, puestos
 * a disposición de allDogs para mostrarlos al front.
 *
 * NOT READY JET
 */

getDogs = async (req, res) => {
  try {
    const getapi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const mapapi = getapi.data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        image: item.image.url,
        weight: item.weight.metric,
        temperament: item.temperament,
      };
    });
    const getbd = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ['name'],
        through: {attributes:[]},
      },
    });//Traer los temperamentos
    console.log(mapapi);
    return [...mapapi, ...getbd];
    //return res.send(mapapi);
  } catch (error) {
    console.log(error);
  }
};
//======================================================

/**
 * PONER A DISPOSICIÓN DEL FRONT LA DATA MEDIANTE DOGSBYNAME.
 * allDogs
 * Función que llama a getDogs, sirviendo los datos indirectamente al front. 
 */

allDogs = async() => {
  const item = await getDogs();
  return item;
};
//=========================================================

/**
 * REALIZAR BUSQUEDA DE DOGS POR NOMBRE.
 * Poner a disposición del front los datos en la ruta principal, determinar
 * si viene una busqueda por query o solo servir los datos generales directamente.
 * NOT READY JET
 */
dogsByName = async (req, res) => {
  try {
    const alldogs = await allDogs();
    const { name } = req.query;
    if(name){
      console.log(name);
      const filterName = alldogs.filter(dog => {
        const datalower = dog.name.toLowerCase();
        const nameLower = name.toLowerCase();
        if(datalower.includes(nameLower)){
          return dog
        }
      });
      filterName.length ? res.status(200).send(filterName) : res.status(404).send('Dog not found');
    }else{
      return res.status(200).send(alldogs);
    }
  } catch (error) {
    console.log(error);
  };
};


//#######################################################
module.exports = {
  dogsByName,
};
