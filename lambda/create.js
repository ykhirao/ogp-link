exports.create = async (dynamo) => {
    const created_at = Math.floor(new Date().getTime() / 1000)
    const ttl = created_at + 1 * 60 * 60 * 24 * 7 // 7 days
    const id = Math.random().toString(32).substring(2)
    // const id = '1'

    var params = {
        TableName: 'Links',
        Item: {
            id,
            ttl,
            user_id: 'owner',
            created_at,
        },
        Expected: {
            id: {
                Exists: false,
            },
        },
    }

    if (process.env['debug'] === '1') {
        return { body: JSON.stringify({ ok: false, message: 'Debug' }) }
    }

    const body = await dynamo
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
    // {
    //   "ok": true,
    //   "message": "Success!!",
    //   "id": "1"
    // }

    // 異常系
    // {
    //   "ok": false,
    //   "message": "Sorry. Try it again!!",
    //   "id": "1"
    // }

    return { body: JSON.stringify(body) }
}
