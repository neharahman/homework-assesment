const taskModel = require("../models/taskModel")

module.exports.createTask = async (req, res) => {
    try {
        const { class_id, teacher_id, batch_id, task, taskFlag } = req.body
        const createTaskModel = await new taskModel({
            class_id, teacher_id, batch_id, task, taskFlag
        })
        const save_taskModel = await createTaskModel.save();
        res.status(200).json({
            status: 'successful',
            message: 'task created',
            data: save_taskModel
        })

    } catch (err) {
        if (err) console.log(err)
        res.status(401).json({
            stats: 'fail',
            message: 'something went wrong plaese try again',
            error: err

        })

    }

}


module.exports.allTask = async (req, res) => {
    try {
        console.log('inside allTask')
        const { authorization } = req.headers
        const findAllTask = await taskModel.find({ taskFlag: req.body.taskFlag });
        res.status(200).json({
            status: 'successefull',
            message: 'all task',

            data: findAllTask
        })

    }
    catch (err) {
        if (err) console.log(err)
        res.status(401).json({
            stats: 'fail',
            message: 'something went wrong plaese try again',
            error: err

        })
    }

}

