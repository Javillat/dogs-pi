const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    minheight: {
      type: DataTypes. INTEGER,
      allowNull: false,
    },
    maxheight: {
      type: DataTypes. INTEGER,
      allowNull: false,
    },
    minweight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    maxweight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {timestamps: false}, {freezeTableName:true});
};
