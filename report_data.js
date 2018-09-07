const {Kinesis} = require('aws-sdk')
const { Transform } = require('stream')
const kinesisClient = new Kinesis({
  region: 'us-east-1'
})

class ReportStream extends Transform {
    constructor(){
      super()
    }

    async readRecords() {
      let data  = await kinesisClient.getShardIterator({
        ShardId: 'shardId-000000000000', /* required */
        ShardIteratorType: 'TRIM_HORIZON', /* required */
        StreamName: 'leo-training-demo1', /* required */
      }).promise()
      this.getRecords(data.ShardIterator)
    }

    async getRecords(nextIt) {
      const records = await kinesisClient.getRecords({
        ShardIterator: nextIt, /* required */
        Limit: 1
      }).promise()

      for(let record of records.Records){
        let resultBuf = JSON.stringify(record.Data.toString())
        console.log(record)
        this.reportData(resultBuf)
        console.log('record', record)
        if( record.NextShardIterator) {
          this.getRecords(record.NextShardIterator)
        }
      }
    }

    async reportData(data){
      console.log('processing data', data)
    }
}

const streamStuff = new ReportStream()
console.log(streamStuff.readRecords())