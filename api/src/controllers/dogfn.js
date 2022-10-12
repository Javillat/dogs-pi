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
 * READY
 */

getDogs = async (req, res) => {
  try {
    const getapi = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    const mapapi = getapi.data.map((item) => {
      const weightminmax = item.weight.metric.split(" - ");
      return {
        id: item.id,
        name: item.name,
        image: item.image.url,
        min_weight: weightminmax[0],
        max_weight: weightminmax[1],
        temperament: item.temperament,
      };
    });
    const getbd = await Dog.findAll({
      include: {
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] },
      },
    }); //Traer los temperamentos
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
 * READY
 */

allDogs = async () => {
  const item = await getDogs();
  return item;
};
//=========================================================

/**
 * REALIZAR BUSQUEDA DE DOGS POR NOMBRE.
 * Poner a disposición del front los datos en la ruta principal, determinar
 * si viene una busqueda por query o solo servir los datos generales directamente.
 * READY
 */
dogsByName = async (req, res) => {
  try {
    const alldogs = await allDogs();
    const { name } = req.query;
    if (name) {
      console.log(name);
      const filterName = alldogs.filter((dog) => {
        const datalower = dog.name.toLowerCase();
        const nameLower = name.toLowerCase();
        if (datalower.includes(nameLower)) {
          return dog;
        }
      });
      filterName.length
        ? res.status(200).send(filterName)
        : res.status(404).send("Breer not found");
    } else {
      return res.status(200).send(alldogs);
    }
  } catch (error) {
    console.log(error);
  }
};
//========================================================

/**
 * TRAER DOG POR ID
 * dogById
 * Función que trae desde la api externa y la bd, los datos referentes a una
 * raza en particular, discriminado por el Id.
 * READY
 */

dogById = async (req, res) => {
  const { id } = req.params;
  const idUPPER = id.toUpperCase();
  try {
    const getbd = await Dog.findOne({
      where: { id: idUPPER },
      include: {
        model: Temperament,
        attributes: ["name"],
        through: { attributes: [] },
      },
    });
    console.log("BD", getbd);
    if (getbd) {
      return res.status(200).send(getbd);
    } else {
      const getapi = (await axios.get("https://api.thedogapi.com/v1/breeds"))
        .data;
      //console.log(getapi);
      //console.log('params ',id);
      const gotdata = getapi.filter(
        (filtered) => parseInt(filtered.id) === parseInt(id)
      );
      const { name, image, height, weight, life_span, temperament } =
        gotdata[0];
      //console.log(gotdata);
      const heightminmax = height.metric.split(" - ");
      const weightminmax = weight.metric.split(" - ");
      const lifespan = life_span.slice(0, 7).split(" - ");
      const serveddata = {
        id: id,
        name: name,
        image: image.url,
        min_height: heightminmax[0],
        max_height: heightminmax[1],
        min_weight: weightminmax[0],
        max_weight: weightminmax[1],
        min_life_span: lifespan[0],
        max_life_span: lifespan[1],
        temperament: temperament,
      };
      //console.log(gotdata[0]);
      res.status(200).send(serveddata);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(`Id ${id} not found`);
  }
};
//========================================================

/**
 * _isAttribute: [Function (anonymous)],
  getTemperaments: [Function (anonymous)],
  countTemperaments: [Function (anonymous)],
  hasTemperament: [Function (anonymous)],
  hasTemperaments: [Function (anonymous)],
  setTemperaments: [Function (anonymous)],
  addTemperament: [Function (anonymous)],
  addTemperaments: [Function (anonymous)],
  removeTemperament: [Function (anonymous)],
  removeTemperaments: [Function (anonymous)],
  createTemperament: [Function (anonymous)]
 * POST BREEDS
 * Función para crear razas de perros, obtiene los datos desde un formulario en el front
 * los procesa y establece las relaciones necesarios con temperament.
 * READY
 */

breedPost = async(req, res) => {
  const { name, minheight, maxheight, minweight, maxweight, image, origin, life_span, tempid } = req.body;
  try {
    const findone = await Dog.findOne({
      where:{name:{[Op.eq]:name}}
    });
    if(!findone){
      const idCount = (await Dog.count()) + 1;
      const idString = 'BD-' + idCount;
      const breed = await Dog.create({
        id:idString,
        name:name,
        minheight:minheight,
        maxheight:maxheight,
        minweight:minweight,
        maxweight:maxweight,
        origin:origin,
        life_span:life_span,
        image:image || 'https://thumbs.dreamstime.com/z/group-twelve-dogs-24189584.jpg'
      });
      //console.log('Proto ',breed.__proto__);
      await breed.addTemperaments(tempid);
      return res.status(201).send('Breed succefull created'); 
    }else{
      return res.status(304).json('Breed already exist into db, not modyfied');
    }
  } catch (error) {
    console.log(error);
  }
}

//#######################################################
module.exports = {
  dogsByName,
  dogById,
  breedPost,
};
