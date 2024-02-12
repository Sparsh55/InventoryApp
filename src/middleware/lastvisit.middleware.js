export const setlastVisit = (req, res, next) => {
    // 1.  if cookie is set, then add a local variable with last visit time date

    if (req.cookies.lastVisit) {
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }

    res.cookie('lastVisit', new Date().toISOString(), {
        maxAge: 2 * 24 * 60 * 60 * 1000,
    });


    next();
}