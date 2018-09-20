const path = require('path')
process.env.LEO_LOCAL = true
process.env.NODE_ENV = 'local'
process.env.LEO_LOGGER = '/.*/tide'
process.env.leo_config_bootstrap_path = process.cwd()+ path.sep + 'leo_config.js'

let leo = require('leo-sdk')
const AWS = require('aws-sdk')
const uuidv1 = require('uuidv1')
let botId = 'wingtonOffloadProducerId'
let queueName = "enrichedloadOrderQueue"
let s3 = new AWS.S3({ region: 'us-east-1' });

leo.offload({
    id: botId,
    queue: queueName,
    start: 'z/2018/09/06',
    each: (payload, meta, done) =>{
        uploadToS3(payload, () => {done(null, true)})
    }
}, (err)=>{
    console.log("All done processing events", err);
})

function uploadToS3(payload, cb) {
  console.log("uploading...............")
  const key = uuidv1();
  const base64data = new Buffer.from(JSON.stringify(payload));
  s3.putObject(
    {
      Bucket: 'wington-bucket',
      Key: key,
      Body: base64data,
      ACL: "public-read"
    },
    function(resp) {
      cb();
      console.log(arguments);
      console.log("Successfully uploaded package.");
    }
  );
};