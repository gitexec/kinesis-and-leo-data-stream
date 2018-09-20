const path = require('path')
process.env.LEO_LOCAL = true
process.env.NODE_ENV = 'local'
process.env.LEO_LOGGER = '/.*/tide'
process.env.leo_config_bootstrap_path = process.cwd()+ path.sep + 'leo_config.js'

let leo = require('leo-sdk')
const request = require('superagent')
let botId = 'wingtonEnrichProducerId'
let inQueueName = "loadOrderQueue";
let outQueueName = "enrichedloadOrderQueue";
leo.enrich({
    id: botId,
    inQueue: inQueueName,
    outQueue:outQueueName,
    each: async (payload, meta, done) =>{
    	//promisify next
    	let apiKey = '834e8011e66161d3e6c3ffa462f38028';
		let city = 'portland';
		let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
		let weather = await request.get(url)
		let richWeather = JSON.parse(weather.res.text).main
        // Add new data to the event payload
        done(null, Object.assign({
            enriched: true,
            weather: richWeather,
            enrichedNow: Date.now()
        }, payload));
    }
}, (err)=>{
    console.log("All done processing events", err);
});