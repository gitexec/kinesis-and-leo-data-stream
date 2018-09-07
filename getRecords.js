const {Kinesis} = require('aws-sdk')
const kinesisClient = new Kinesis({
	region: 'us-east-1'
})

let ShardIterator;
async function getRecords() {
	let data  = await kinesisClient.getShardIterator({
	  ShardId: 'shardId-000000000000', /* required */
	  ShardIteratorType: 'TRIM_HORIZON', /* required */
	  StreamName: 'leo-training-demo1', /* required */
	}).promise()

	console.log("dataaaa: ", data.ShardIterator)
	ShardIterator = data.ShardIterator
	const params = {
	  ShardIterator: ShardIterator, /* required */
	  Limit: 1
	};
	kinesisClient.getRecords(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     console.log(data);           // successful response
	});	
}
console.log(getRecords())