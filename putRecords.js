const {Kinesis} = require('aws-sdk')

const kinesisClient = new Kinesis({
	region: 'us-east-1'
})

var params = {
  Data: new Buffer('...more more') || 'STRING_VALUE' /* Strings will be Base-64 encoded on your behalf */, /* required */
  PartitionKey: 'partion1', /* required */
  StreamName: 'leo-training-demo1', /* required */
};

kinesisClient.putRecord(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});