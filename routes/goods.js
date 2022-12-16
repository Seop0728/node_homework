//express 라는 라이브러리에서 라이브러리를 express라는 변수에 할당
const express = require("express")

//express.Router라는 함수를 실행해서 router라는 변수에 할당
const router = express.Router();

// /routes/goods.js
const goods = [
  {
    goodsId: 4,
    name: "상품 4",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
    category: "drink",
    price: 0.1,
  },
  {
    goodsId: 3,
    name: "상품 3",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
    category: "drink",
    price: 2.2,
  },
  {
    goodsId: 2,
    name: "상품 2",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
    category: "drink",
    price: 0.11,
  },
  {
    goodsId: 1,
    name: "상품 1",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
    category: "drink",
    price: 6.2,
  },
];

// 상품 목록 조회 API
router.get('/goods', (req,res) => {
    res.status(200).json({"goods":goods})
})

// 상품 상세 조회 API
router.get("/goods/:goodsId", (req, res)=> {
    const { goodsId } = req.params
    const [result] = goods.filter((good) => Number(goodsId) === good.goodsId)
    res.status(200).json({ "detail": result})
})

// 장바구니에 추가
const Cart = require("../schemas/cart.js")
router.post("/goods/:goodsId/cart", async (req,res) => {
  const {goodsId} = req.params
  const {quantity} = req.body

  const existsCarts = await Cart.find({goodsId})
  if (existsCarts.length){
    return res.status(400).json({
      success: false,
      errorMessage: "이미 장바구니에 해당상품이 존재합니다."
    })
  }

  await Cart.create({goodsId, quantity})
  res.json({result: "success"})
})

// 장바구니 상품수정
router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId: goodsId });
  if (existsCarts.length) {
    await Cart.updateOne(
        { goodsId: goodsId },
        { $set: { quantity } }
    );
  }
  res.json({ success: true });
})

// 장바구니 상품제거
router.delete("/goods/:goodsId/cart", async (req,res) => {
  const {goodsId} = req.params

  const existsCarts = await Cart.find({goodsId})
  if (existsCarts.length) {
    await Cart.deleteOne({goodsId})
  }
  res.json({result: "success"})
})


const Goods = require("../schemas/goods.js")
const {json} = require("express");
router.post('/goods',async (req,res) => {
  const {goodsId, name, thumbnailUrl, category, price} = req.body

  const goods = await Goods.find({goodsId})

  if (goods.length){
    return res.status(400).json({
      success : false,
      errorMessage : "이미 존재하는 GoodsId입니다"
    })
  }

  const createdGoods = await Goods.create({goodsId, name, thumbnailUrl, category, price})
  res.json({goods : createdGoods})

})
// router 라는 변수를 밖으로 내보내 준다
module.exports = router;








// //반환 받은 router라는 변수를 이용해서
// //GET 메서드 라는걸 들어왔을때 / 기본경로로 들어왔을때 해당코드를 실행할꺼다
// //어떤코드를 반환하냐면(response) "default ~~"라는 문자열을 반환할
// //API를 하나 만들거고
//
// // localhost:3000/api/
// router.get('/',(req,res) =>{
//     res.send("default url for goods.js GET Method")
// })
//
// //GET 메서드로 들어온 즉, about라는 경로에 들어온 GET메서드를 실행을 할 거다
// //res 우리는 반환을 할 거고 데이터는"goods.js ~~"문자열을 반환 할거다
// //라는 라우터를 만들었다
//
// // localhost:3000/api/about GET
// router.get('/about',(req,res) => {
//     res.send("goods.js about PATH")
// })

