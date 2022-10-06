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
    return [...mapapi, getbd];
    //return res.send(mapapi);
  } catch (error) {
    console.log(error);
  }
};
//======================================================

/**
 * PONER A DISPOSICIÓN DEL FRONT LA DATA.
 * allDogs
 * Función que llama a getDogs, sirviendo los datos al front. 
 */

allDogs = async() => {
  const item = await this.getDogs();
  return item;
}

module.exports = {
  allDogs,
};
