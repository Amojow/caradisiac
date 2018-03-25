var es = require('elasticsearch');
var fs = require('fs');

var client = new es.Client({
    host : 'localhost:9200'
});

const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');

async function exportJson(obj, name_new_file){
  let data = JSON.stringify(obj, null, 2);
  fs.writeFile(name_new_file + '.json', data);
}

async function getBrands () {
  const brands = await getBrands();
  console.log("brands imported")
  return brands;
}

async function getCars () {
  const brands = getBrands();
  const cars = [];
  for (var i = 0; i < brands.length; i++){
    const elts = await getModels(brands[i]);
    elts.forEach(models => cars.push(elts));
  }
  exportJson(cars, 'cars');
  console.log("cars imported");
}

getCars();
