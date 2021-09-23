const { place, review, vegCategory} = require('../../models');
const { isAuthorized } = require("../tokenFunctions");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
    
    let sendArr = [];
    let obj = {};

   try {
        const authorization = req.headers['authorization'];
        if(!authorization){
            res.status(401).json({message : 'unauthorized token'})
        }else{
            const accessToken = authorization.split(' ')[1];
        
            if(isAuthorized(accessToken) === 'jwt expired'){
                res.set('accessToken', remakeToken(req)); //엑세스 토큰 만기시 다시 만들어서 헤더에 담아서 보내기
            }

            const userData = isAuthorized(accessToken);
           
           const type = userData.vegtype;
            

            const placeList = await vegCategory.findAll({
                attributes : ['category'],
                include : [{
                    model : place,
                    required: true,
                    attributes : ['id', 'title', 'picture_url', 'address'],
                    include : [{
                        model : review,
                        required : true,
                        attributes : ['stars', 'review'],
                        where : {
                            stars: {
                                [Op.gte]: 4
                            }
                        }
                    }]
                }],
                where : {
                    category : type
                }
            })
            //console.log(placeList)
            console.log(placeList[0].dataValues.place.dataValues.id);
            console.log(placeList[0].dataValues.place.dataValues.title);
            console.log(placeList[0].dataValues.place.dataValues.picture_url);
            console.log(placeList[0].dataValues.place.dataValues.address);
            //console.log(placeList[0].dataValues.place.dataValues.reviews);
            //console.log(placeList[0].dataValues.place.dataValues.reviews.length);
            // console.log(placeList[0].dataValues.place.dataValues.reviews[0].dataValues.stars);
            console.log(placeList[0].dataValues.place.dataValues.reviews[placeList[0].dataValues.place.dataValues.reviews.length-1].dataValues.review);
            console.log(placeList[0].dataValues.place.dataValues.reviews[placeList[0].dataValues.place.dataValues.reviews.length-1].dataValues.stars);

            console.log(placeList[1].dataValues.place.dataValues.id);
            console.log(placeList[1].dataValues.place.dataValues.title);
            console.log(placeList[1].dataValues.place.dataValues.picture_url);
            console.log(placeList[1].dataValues.place.dataValues.address);
            //console.log(placeList[0].dataValues.place.dataValues.reviews);
            //console.log(placeList[0].dataValues.place.dataValues.reviews.length);
            // console.log(placeList[0].dataValues.place.dataValues.reviews[0].dataValues.stars);
            console.log(placeList[1].dataValues.place.dataValues.reviews[placeList[1].dataValues.place.dataValues.reviews.length-1].dataValues.review);
            console.log(placeList[1].dataValues.place.dataValues.reviews[placeList[1].dataValues.place.dataValues.reviews.length-1].dataValues.stars);

            res.status(200).send("전송")
       }

        
    } catch (error) {
        res.status(500).send(error);
    }
}