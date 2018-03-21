
const {getBrands} = require('node-car-api');

async function print () {
  const brands = await getBrands();

  console.log(brands);
}

print();

