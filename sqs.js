const { SQS } = require('aws-sdk')
const sqs = new SQS({
	region: 'us-east-1'
})

async function setQueue(data = 'no data given') {
	const params = {
	  MessageBody: data, /* required */
	  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/591145395373/queue-leo-demo1', /* required */
	  DelaySeconds: 0,
	}
	let q = await sqs.sendMessage(params).promise()
}
/*let q = setQueue()
console.log(q)
*/
module.exports = setQueue