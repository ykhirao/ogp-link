const { get } = require('./utils')
const { create } = require('./create')
const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-northeast-1' })
const dynamo = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

exports.handler = async (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event.body, null, 2))

    let body
    let statusCode = 200
    const headers = {
        'Content-Type': 'application/json',
    }

    body = await create(dynamo)

    const response = {
        statusCode,
        body: JSON.stringify(body),
        headers,
        isBase64Encoded: false,
    }

    callback(null, response)
}
