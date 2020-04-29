// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_get
exports.create = async (dynamo) => {
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

    return body
}
