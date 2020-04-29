const { get } = require('./utils')
const { create } = require('./create')
const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-northeast-1' })
const dynamo = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

exports.handler = async (event, context, callback) => {
    // console.log('Received event:', JSON.stringify(event.body, null, 4))

    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({}),
        isBase64Encoded: false,
    }

    let override = {}
    try {
        if (
            process.env['debug'] === '2' ||
            (event.path === '/v1/ogp' && event.httpMethod === 'POST')
        ) {
            override = await create(dynamo)
        } else {
            throw new Error(`Unsupported method "${event.httpMethod}"`)
        }
    } catch (err) {
        override.statusCode = 400
        override.body = JSON.stringify(err.message)
    }

    callback(null, { ...response, ...override })
}
