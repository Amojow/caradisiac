var es = require('elasticsearch');
var client = new es.Client({
    host : 'localhost:9200'
});

const {getModels} = require('node-car-api');
const car = "SEAT";
async function importModels (y) {
  const models = await getModels(y);

  console.log(models);
}
var br = [];

function importEls(bulk_request){
    let i=0;
    models.forEach(line => {
        var element = JSON.parse(line);
        bulk_request.push({index: {_index: 'jsindex', _type: 'jstype', _id: i+1}});
        bulk_request.push(element);
        i++;
    });
}

client.bulk(
    {
        body : br
    }, function (err, resp) {
      console.log(err);
    });



