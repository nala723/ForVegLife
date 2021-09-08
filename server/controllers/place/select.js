module.exports = async (req, res) => {
    // res.send('장소 하나 선택하기')
    res.send(`${req.params.placeId}가 id 인 장소를 클릭함`)
  };
  