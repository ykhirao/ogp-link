const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-northeast-1' })

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

exports.handler = async (event, context) => {
    console.log('Received event:', JSON.stringify(event.body, null, 2))

    let body

    let statusCode = '200'
    const headers = {
        'Content-Type': 'application/json',
    }

    // if (event.httpMethod !== 'POST') {
    //     throw new Error(`Unsupported method "${event.httpMethod}"`)
    // }

    var params = {
        TableName: 'ogp-test',
        Item: {
            LINK_ID: { S: '001' },
            OGP_TYPE: { S: 'Richard Roe' },
        },
    }

    // ddb.putItem(params, function (err, data) {
    //     if (err) {
    //         console.log('Error', err)
    //     } else {
    //         console.log('Success', data)
    //     }
    // })

    var params = {
        TableName: 'ogp-test',
        Key: {
            LINK_ID: { S: '001' },
        },
        ProjectionExpression: 'ATTRIBUTE_NAME',
    }

    // Call DynamoDB to read the item from the table
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
