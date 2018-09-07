const { SQS } = require('aws-sdk')
const sqs = new SQS({
	region: 'us-east-1'
})

async function getQueue() {
	const params = {
	  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/591145395373/queue-leo-demo1', /* required */
	}
	let q = await sqs.receiveMessage(params).promise()
	console.log("qqqqq", q)
	return q
}

module.exports = getQueue

/*getQueue()*/
