const { verifyJwt } = require("./functions");

const userAuthCheck = async (req, res, next) => {
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
            let token = req.headers.authorization.split(" ")[1];
            const isTokenValid = await verifyJwt(token);
            if (isTokenValid) {
                req.body.tokenData = isTokenValid;
                next();
            } else {
                res.send({
                    code: 400,
                    msg: "Authentication is required",
                });
            }
        } else {
            res.send({
                code: 400,
                msg: "Authentication is required",
            });
        }
    } catch (e) {
        res.send({
            code: 444,
            msg: "Some error has occured!",
        });
    }
};

module.exports = {
    userAuthCheck
}