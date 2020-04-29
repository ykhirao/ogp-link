const { get } = require('./src/utils')
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

    const unixtime = Math.floor(new Date().getTime() / 1000)
    const ttl = unixtime + 1 * 60 * 60 * 24 * 7 // 7 days
    const id = Math.random().toString(32).substring(2)
    // const id = '1'

    var params = {
        TableName: 'OGP-LINK',
        Item: {
            id,
            ttl,
            user_id: 'owner',
        },
        Expected: {
            id: {
                Exists: false,
            },
        },
    }

    body = await dynamo
        .put(params)
        .promise()
        .then(() => {
            return { ok: true, message: 'Success!!', id }
        })
        .catch((e) => {
            console.error(`作成失敗: id is [${id}]`)
            return {
                ok: false,
                message: 'Sorry. Try it again!!',
                id,
            }
        })

    // 正常系
    //   {
    //     "ok": true,
    //     "message": "Success!!",
    //     "id": "1"
    //   }
    // }

    // 異常系
    //   {
    //     "ok": false,
    //     "message": "Sorry. Try it again!!",
    //     "id": "1"
    //   }

    const response = {
        statusCode,
        body: JSON.stringify(body),
        headers,
        isBase64Encoded: false,
    }

    callback(null, response)
}

function getSample() {
    // var params = {
    //     TableName: 'OGP-LINK',
    //     Key: { id: '2' },
    // }
    // body = await dynamo.get(params).promise()
}
