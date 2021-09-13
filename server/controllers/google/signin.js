const { user } = require('../../models')

module.exports = async (req, res) => {
  const { email, nickName} = req.body;

  try {
    const userInfo = await user.findOne({where : {email: email}});
    if(!userInfo){
       //유저 정보가 없을 경우 처음 구글 로그인한 사람이므로 db에 정보 넣어주기
       user.create({
         nickName : nickName,
         email : email,
         social : 1
       })
       .then((result) => {
         res.status(200).json({message : 'Successfully Google Signup'});
       })
    }else{
      //이미 구글 로그인 한 적 있으면 바로 메시지 보내주기
        res.status(200).json({message : "Successfully Google Signin"});
    }
  } catch (error) {
        res.status(500).send(error);
  }
};
