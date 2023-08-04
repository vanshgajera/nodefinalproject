module.exports.setFlash = (req,res,next) => {
    res.locals.flash = {
        'success' : req.flash('success')
    }
    next()
}


