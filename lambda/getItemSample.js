const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-northeast-1' })
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

exports.handler = async (event, context) => {
    let body

    let statusCode = '200'
    const headers = {
        'Content-Type': 'application/json',
    }

    var data1 = await ddb
        .getItem({
            TableName: 'Links',
            Key: {
                id: { S: '1' },
            },
        })
        .promise()

    console.log(data1)

    return

    return {
        statusCode,
        body,
        headers,
    }
}
