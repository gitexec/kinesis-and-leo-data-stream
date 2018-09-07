const {Kinesis} = require('aws-sdk')
const Promise = require('bluebird')
const kinesisClient = new Kinesis({
	region: 'us-east-1'
})

const params = {
  ShardId: 'shardId-000000000000', /* required */
  ShardIteratorType: 'TRIM_HORIZON', /* required */
  StreamName: 'leo-training-demo1', /* required */
};

function getShard() {
	kinesisClient.getShardIterator(params, function(err, data) {
		  if (err) {
		  	console.log(err, err.stack); // an error occurred
		  	reject(err)
		  }
		  else{
		  	console.log(data);           // successful response
		  	resolve(data)
		  }    
		});
	
}

module.exports = getShard