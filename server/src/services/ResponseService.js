module.exports = {
    apiResponse: function(res, code, msg, data){
        res.status(code);
        var resObj = {
            status:code,
            message:msg,
            data:data
        }
        return res.json(resObj);
    }
}