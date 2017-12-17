var fs = require('fs'),
  path = require('path'),
  // lodash = require('lodash'),
  Sequelize = require('sequelize'),
  db = {},
  dbName = 'taskManagement',
  user = 'root',
  pass = '';

const Op = Sequelize.Op;

//Vvar sequelize = new Sequelize('eventsbug', 'root', '');
//var sequelize = new Sequelize( dbName, user, '',{    host:'localhost',dialect: 'mysql'});

var sequelize = new Sequelize( dbName, user, pass, { host :'localhost', dialect:'mysql' });

console.log("creates tables");

fs.readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function(file) {
    console.log("File name:: ",file);
    var model = sequelize.import(path.join(__dirname, file));
    console.log("Model in index.js:: ",model);
    if (model instanceof Array) {
      model.forEach(function(m) {
	console.dir("table name coming in if"+m);
        db[m.name] = m;
      });
    } else {
      db[model.name] = model;
      console.dir("table name else"+model);
    }
  });

Object.keys(db).forEach(function(modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});


module.exports = Object.assign({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);
