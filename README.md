#Assignment for backend

내배캠 장터 백엔드 서버 만들기

---

##과제할때 문제였던점.

-app.js와 .env 가 같은 디렉토리안에 있지 않아서 yarn dev 로는 mongoDB 연결이 되는데
node app.js로는  mongoDB 연결이 안되는 문제 발생.
두 파일을 같은 디렉토리로 옮겨 주어야 합니다.

---




## API 명세서

| 설명         | Method   |    URL        |
|-------------|----------|---------------|
| 상품생성(C)   | POST     | /products     |
| 상품목록조회(R)| GET      | /products     |
| 상품상세조회(R)| GET      | /products/:id |
| 상품 수정(U)  | PUT      | /products/:id |
| 상품 삭제(D)  | DELETE   | /products/:id |



### Request & response

```json

##상품생성(/products )

//request
{ 
    "name": "빼빼로ㄹ", 
    "description": "빼빼로 데이는 11월 11일 이다.", 
    "manager": "이무기", 
    "password": "1234" 
}


//response:
{
    "createProducts": {
        "name": "빼빼로ㄹ",
        "description": "빼빼로 데이는 11월 11일 이다.",
        "manager": "이무기",
        "password": "1234",
        "doneAt": "2024-05-16T23:50:43.751Z",
        "status": "FOR_SALE",
        "_id": "66469bd307a7a2865919540d",
        "__v": 0
    }
}


##상품 수정(/products/:id  || name, description, manager, status 수정가능 || 이름중복 x)

//request
{
	"name":"가나 초콜렛",
	"description" : " 우유에 타먹으면 너무 맛있다. <판매완료>",
	"manager" : "황달",
	"status":"SOLD_OUT",
	"password" : "1234"
}                           


##상품삭제 (/products:id )

//request
{
	"password" : "1234"
}






