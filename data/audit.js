import { adminlogs } from "../config/mongoCollections.js";
import { validStr } from "../validation.js";

const createLog = async (action, content) => {
    action = validStr(action)
    content = validStr(content)

    let time = new Date(Date.now())

    const audit = await adminlogs()
    let log = await audit.insertOne({ time: `${time.toLocaleDateString()} ${time.toTimeString()}`, action, content })

    return log
}

const getLogs = async () => {
    const audit = await adminlogs()
    let auditList = await audit.find({}).toArray()

    auditList.map((log) => {
        log._id = log._id.toString();
    });

    return auditList
}

export { createLog, getLogs }