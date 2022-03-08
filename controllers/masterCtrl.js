const mongoose = require('mongoose');
module.exports = {
    getCourse: (req, res, next) => {
        try {
            mongoose.model(collConfig.course.name).find({ isActive: true }).then(data => {
                return res.json({
                    data: data,
                    statusCode: 200,
                    statusMessage: 'Success!'
                })
            }).catch(err => next(err));
        } catch (err) {
            next(err);
        }
    },
    addCourse: (req, res, next) => {
        try {
            const clientData = req.body;
            mongoose.model(collConfig.course.name).create(clientData).then(data => {
                return res.json({
                    data: data,
                    statusCode: 200,
                    statusMessage: 'Success!'
                })
            }).catch(err => next(err));
        } catch (err) {
            next(err);
        }
    }
}
