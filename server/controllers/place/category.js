module.exports = async (req, res) => {
    // res.send('카테고리별로 불러오기')
    res.send(`${req.params.category}인 카테고리를 전부 불러오기`)
  };
  