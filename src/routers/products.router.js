//개발필수 (상품생성 api, 상품목록조회,상품상세조회,상품수정,상품삭제 구현)
import express from 'express';
import Products from '../schemas/product.schema.js';
const router = express.Router();

/* 1.상품 생성 API*/

router.post('/products', async (req, res) => {
  const { name, description, manager, password } = req.body; //req.body 로 전달 받는다.
  try {
    if (!name || !description || !manager || !password) {
      return res
        .status(400)
        .json({ errorMessage: '누락된 입력값이 존재합니다.' });
    }
    const existProduct = await Products.findOne({ name }).exec(); // 입력된 이름을 찾게 된다면
    if (existProduct) {
      return res
        .status(400)
        .json({ errorMessage: '이미 등록 된 상품입니다.' });
    }
    const createProducts = await Products.create({
      name,
      description,
      manager,
      password,
      status: 'FOR_SALE',
      doneAt: Date.now(),
    });
    return res.status(201).json({ createProducts });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.' });
  }
});

/*2.상품목록 조회 api  get localhost:3000/products*/
router.get('/products', async (req, res) => {
  try { 
    const products = await Products.find({}, '-password')
      .sort('-doneAt')
      .exec();

      if(!products){
        return res.status(200).json([]);
      }

    return res.status(200).json({ products });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.' });
  }
});

/*3.상품상세 조회 api  get localhost:3000/products/:id  */

router.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const searchProduct = await Products.findById(id, '-password').exec(); //파람스로 들어오는 아이디 Producs 에서 찾기

    if (!searchProduct) {
      return res.status(400).json({ errorMessage: '상품이 존재하지 않습니다.' });
    }

    return res.status(200).json({ searchProduct });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.' });
  }
});

/*4.상품수정 api  put /products/:id */

router.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, description, manager, status, password } = req.body;
  try {
    //수정할 상품 id로 가져오기
    const fixTarget = await Products.findById(id).exec();

    if (!fixTarget) {
      return res.json(404).json({ errorMessage: '상품이 존재하지 않습니다.' });
    }

    if (fixTarget.password !== password) {
      return res
        .status(400)
        .json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
    }

    //중복된 이름으로 수정이 될 수 없게.
    if (name !== fixTarget.name) {
      const existingProduct = await Products.findOne({ name }).exec();
      if (existingProduct) {
        return res
          .status(400)
          .json({ errorMessage: '이미 같은 이름의 상품이 존재합니다.' });
      }
    }
    await Products.updateOne(
      { _id: id },
      {
        name,
        description,
        manager,
        password,
        status,
        doneAt: Date.now(),
      },
    );
    return res.status(200).json({ message: '정보가 수정 되었습니다.' });
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.' });
  }
});

/* 상품 삭제 API delete /products/:id */
router.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  try {
    const existProduct = await Products.findById(id).exec();
    if (!existProduct) {
      return res
        .status(404)
        .json({ errorMessage: '상품이 존재하지 않습니다.' });
    }
    if (existProduct.password === password) {
      await Products.deleteOne({ _id: id });
      return res
        .status(200)
        .json({ message: '성공적으로 상품이 삭제되었습니다.' });
    } else {
      return res
        .status(400)
        .json({ errorMessage: '비밀번호가 일치 하지 않습니다.' });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ errorMessage: '예상치 못한 에러가 발생했습니다. 관리자에게 문의해 주세요.' });
  }
});

export default router; // app.js에서 import
