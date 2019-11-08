// verificar a presença de um token dentro de uma requisição 

const jwt = require('jsonwebtoken'); 
const { promisify } = require('util')

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization; 

    if(!authHeader) {
        return res.status(401).json({ message: 'Token not provided' })
    }

    const [, token ] = authHeader.split(' ') //pegamos somente a segunda parte do array que é retornado com a função split

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)

        req.userId = decoded.id;

        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Token invalid' })
    }

    return next();
};