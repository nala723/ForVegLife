module.exports = async (req, res) => {
    // res.send('즐겨찾기 해제')
    res.send(`${req.params.placeId}이 id인 장소를 해제`)
}
  