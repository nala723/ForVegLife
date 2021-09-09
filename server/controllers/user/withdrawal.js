const { isAuthorized } = require('../tokenFunctions');
const { user, review, users_places_like } = require('../../models')

module.exports = async (req, res) => {
  const authorization = req.headers['authorization'];

  if(!authorization){
    res.status(401).json('invalid token')
  }else{
    const accessToken = authorization.split(' ')[1];
    const userData = isAuthorized(accessToken);
    const userid = userData.id;

    await user.destroy({
      where : {
        id : userid
      }
    });

    await review.destroy({
      where : {
        id : userid
      }
    });

    await users_places_like.destroy({
      where : {
        id : userid
      }
    });

    res.status(200).json({message : 'ok'})
  }
};
  