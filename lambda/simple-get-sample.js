const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-northeast-1' })
const dynamo = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event.body, null, 2))

    let body

    let statusCode = '200'
    const headers = {
        'Content-Type': 'application/json',
    }

    var params = {
        TableName: 'ogp-test',
        Key: { link_id: '1234' },
    }

    body = await dynamo.get(params).promise()

    console.log(body)

    return {
        statusCode,
        body,
        headers,
    }
}
