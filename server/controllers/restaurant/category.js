const models = require("../../models")
const sequelize = require("sequelize");
const Op = sequelize.Op;

module.exports = async (req, res) => {
    // res.send('카테고리별로 불러오기')
    
   try { const category = req.params.category
    const address = req.params.address
    
    console.log(address)
    let data = []
    const allData = await models.place.findAll({
      include: [
        {
          model: models.vegCategory,
          required: true,
          where:{category:category}
        },
      ],
      where:{address:{
        [Op.like]: address +"%"
      }},raw:true
    })
    console.log(allData)

    for(let i =0; i<allData.length; i++){
      data.push({
        title: allData[i].title,
        placeId: allData[i].id,
        longitude: allData[i].longitude,
        latitude: allData[i].latitude,
      })
    }
    res.status(200)
    .send(data)}
    catch (error) {
      res.status(500).send(error);
   }
  };
  