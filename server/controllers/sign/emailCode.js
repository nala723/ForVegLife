require('dotenv').config();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const smtpServerURL = "smtp.naver.com";
const authUser = process.env.EMAIL_ID;
const authPass = process.env.EMAIL_PW;
const fromEmail = 'veg_veri@naver.com';

module.exports = async (req, res) => {
    const email = req.body.email;
    const generateRandom = function (min, max) {
      let ranNum = Math.floor(Math.random()*(max-min+1)) + min;
      return ranNum;
    };

    const number = generateRandom(1111,9999);

    let transporter = nodemailer.createTransport({
      host: smtpServerURL,    //SMTP 서버 주소
      secure: true,           //보안 서버 사용 false로 적용시 port 옵션 추가 필요
      auth: {
          user: authUser,     //메일서버 계정
          pass: authPass      //메일서버 비번
      }
  });

  let mailOptions = {
    from: fromEmail,       
    to: email ,           
    subject: 'VegLife 본인인증 메일입니다',
    text: `아래 번호를 입력해 주세요


            ${number}`      
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
          //에러
          //console.log(error);
      
          res.status(500).send(error);
      }
      //전송 완료
      //console.log("Finish sending email : " + info.response);        
      transporter.close()
  })

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(String(number), salt, (err, hash) => {
        if(err){
            throw err;
        }else{
            res.status(200).json({
                data:{emailcode : hash},
                message: 'ok'
            })
        }

    })
  })
};
  