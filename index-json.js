var es = require('elasticsearch');
var fs = require('fs');
var client = new es.Client({
    host : 'localhost:9200'
});



var br = [];

/*
function importEls(bulk_request){
    let i=0;
    var models = importModels();
    //var models = JSON.parse(fs.readFileSync('cars.json', 'utf8'));
    models.forEach(line => {
        var element = JSON.parse(line);
        bulk_request.push({index: {_index: 'cars', _type: 'car', _id: i+1}});
        bulk_request.push({element});
        i++;
    });
    console.log(bulk_request);
    return bulk_request;
}
*/
//Here we use the full json because api didn't worked well
async function create_bulk (bulk_request) {
  var elt = JSON.parse(fs.readFileSync('cars.json', 'utf8'));
  let i = 1;
  elt.forEach(function(model)
  {
    bulk_request.push( {index : { _index: 'cars', _type: 'model', _id: i }})
    bulk_request.push({ doc: model})
    i++
  })
  console.log(bulk_request);
  return bulk_request;
  };

create_bulk(br);

client.bulk(
    {
        body : br
    }, function (err, resp) {
      console.log(err);
    });


