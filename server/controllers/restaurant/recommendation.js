const { place, review, vegCategory} = require('../../models');
const { isAuthorized } = require("../tokenFunctions");
const { Op } = require("sequelize");

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

module.exports = async (req, res) => {
    
    let sendArr = [];
    let obj = {};
    let placeList;

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
            
           if(type !== 'vegetarian'){
                placeList = await vegCategory.findAll({
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
           }else{
            placeList = await vegCategory.findAll({
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
                }]
            })
           }

            let firstIndex = getRandomIntInclusive(0, placeList.length-4);

            for(let i=firstIndex; i<firstIndex+4; i++){
                obj['placeId'] = placeList[i].dataValues.place.dataValues.id
                obj['title'] = placeList[i].dataValues.place.dataValues.title
                obj['pictureUrl'] = placeList[i].dataValues.place.dataValues.picture_url
                obj['address'] = placeList[i].dataValues.place.dataValues.address
                obj['star'] = placeList[i].dataValues.place.dataValues.reviews[placeList[i].dataValues.place.dataValues.reviews.length-1].dataValues.stars
                obj['content'] = placeList[i].dataValues.place.dataValues.reviews[placeList[i].dataValues.place.dataValues.reviews.length-1].dataValues.review
                sendArr.push(obj);
                obj = {};
            }

            res.status(200).send(sendArr);
       }
 
    } catch (error) {
        res.status(500).send(error);
    }
}