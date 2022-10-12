const axios = require('axios');
const { Temperament } = require('../db');

/**
 * GET, FILTER TEMPERAMENTS AND SAVE TO DB.
 * chargeTemperaments
 * Función que trae desde el api externo, los temperamentos en cada breed, los filtra eliminando
 * repeticiones y los guarda a la tabla temperaments, para luego poder servirolos como endpoint.
 * 
 * READY
 */

chargeTemperaments = async(req, res) => {
    const temperamentbd = Temperament.findAll();
    try {
        if(temperamentbd.length > 0){
            return;
        }else{
            const temperamentapi = (await axios.get('https://api.thedogapi.com/v1/breeds')).data;
            const temperamentmap = new Set(temperamentapi.map(temp => temp.temperament).join().split(','));
            const temperamentarray = [...temperamentmap];
            const temperamentclean = temperamentarray.filter(filter => filter !== "")
            let iditem = 0;
            const create = temperamentclean.map(item => {
                iditem++;
                return {
                    id: iditem,
                    name: item.trim()
                }
            })
            await Temperament.bulkCreate(create);
            console.log('Temperaments saved succeffully!!!');      
        }
    } catch (error) {
        console.log(error);
    }
}
//==================================================================

/**
 * SERVER ENDPOINT
 * getTemperaments
 * Función servidora de temperamentos que han sido traidos desde la api externa y guardados en la 
 * bd local, filtrados, limpiados para ponerlos a disposición del front.
 * 
 * READY.
 */

getTemperaments = async(req, res) => {
    try {
        const temperamentbd = await Temperament.findAll();
        console.log(temperamentbd);
        return res.status(200).send(temperamentbd);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    chargeTemperaments, 
    getTemperaments,
}
