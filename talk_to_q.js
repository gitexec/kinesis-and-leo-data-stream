const { SQS } = require('aws-sdk')
const { SNS } = require('aws-sdk')
const sns = new SNS({
	region: 'us-east-1'
})

const sqs = new SQS({
	region: 'us-east-1'
})


async function getQueue() {
	const params = {
	  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/591145395373/queue-leo-demo1', /* required */
	}
	let q = await sqs.receiveMessage(params).promise()
	return q
}

async function setQueue(data = 'no data given') {
	const params = {
	  MessageBody: data, /* required */
	  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/591145395373/queue-leo-demo1', /* required */
	  DelaySeconds: 0,
	}
	let q = await sqs.sendMessage(params).promise()
}

async function run(){
	for(let i = 0; i < 20; i++){
		setQueue(`message ${i}`)

		const q = await getQueue()
/*		console.log(q)
*/		
		for(let msg of q.Messages){
			process(msg).then(data => console.log("processed"))
		}
		
	}
} 

/*{ ResponseMetadata: { RequestId: 'b92e92e6-55e1-535c-a62a-c6ec6d81e9a4' },
  Messages:
   [ { MessageId: 'c016e216-a327-421a-b903-d9ba744e7950',
       ReceiptHandle:
        'AQEBAiLmETpdGm8z1T/WwjIvXajPMaufPXI2PjPkU/PIGbb7eXAvoFEpoFXY/xkoFQlAQ7SNu2wmZXLVSh8QGC8HfQhDCsJV4h+/4dsdRgSxVSymRSTKGF7GXkOxLbPfYE3zuiHNdAbYwO4/NDRkrHBOPJ5IjNEC9ZgD9C/UsMix3csrl2PZ4XZZyqAywKFOgVj1bhP8bdEcHLJFMw+Rdhrk4wT3qGyGgCjXMg/KxFKB5MefCdv0Fuu4jlkcqzYOHp5mvaV1fa6G3risePuIPwsdH6yC3hlVHmkHl0uehNdhhV+blyUtCLye5oM+EfulGEiUQuDhPKqzlpTnoB/jhx3LpAEQBBF/3eBwwMceStDGvsblOzoEktD/UCE6uS5+vhDlECR6kJ4ZbC2NuCqd557sLw==',
       MD5OfBody: '008c5926ca861023c1d2a36653fd88e2',
       Body: 'whatever' } ] }
*/
async function process(msg) {
	//
	publishSNS(msg)
	if (msg.ReceiptHandle) {
		deleteQ(msg.ReceiptHandle)
	}
}

async function deleteQ(ReceiptHandle) {
	var params = {
	  QueueUrl: 'https://sqs.us-east-1.amazonaws.com/591145395373/queue-leo-demo1', /* required */
	  ReceiptHandle: ReceiptHandle /* required */
	};
	let delQ = await sqs.deleteMessage(params).promise()
	console.log("delete success", delQ)
}

async function publishSNS(data) {
	const params3 = {
	  Message: data.Body,
	  Subject: 'ringg!',
	  TopicArn: 'arn:aws:sns:us-east-1:591145395373:sns-leo-demo1'
	}

	let msg = await sns.publish(params3).promise()
	console.log("send!!", data)
}

run()