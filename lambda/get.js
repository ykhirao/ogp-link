const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-northeast-1' })

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

exports.handler = async (event, context) => {
    // console.log('Received event:', JSON.stringify(event.body, null, 2))

    let body

    let statusCode = '200'
    const headers = {
        'Content-Type': 'application/json',
    }

    var params = {
        TableName: 'ogp-test',
        Key: {
            LINK_ID: { S: '001' },
        },
        ProjectionExpression: 'ATTRIBUTE_NAME',
    }

    ddb.getItem(params, function (err, data) {
        if (err) {
            console.log('Error', err)
        } else {
            console.log('Success', data.Item)
        }
    })

    return {
        statusCode,
        body,
        headers,
    }
}
