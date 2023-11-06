
# Project Title

### AuctionHub: Your Premier Online Auction Destination for a Wide Range of Exclusive Merchandise

AuctionHub is a cutting-edge online auction platform featuring an extensive catalog of over 20 unique product categories, each offering a diverse selection of high-quality items. At AuctionHub, bidders have the opportunity to search, bid, and secure coveted items through exciting and competitive online auctions.

Our platform offers real-time notifications, allowing users to stay informed about upcoming auctions in their areas of interest. This empowers bidders to strategize effectively and maximize their chances of winning in the auctions. Furthermore, our dedicated 24/7 admin team plays a vital role in verifying auction sessions and ensuring the security of every transaction. They are also readily available for users to report any suspicious activities or disruptive behavior, creating a safe and enjoyable auction environment for all.

AuctionHub's robust system has been rigorously tested, capable of handling a massive inventory of 100,000 products and accommodating a community of 6,000 users. Discover the thrill of bidding and securing unique treasures at AuctionHub.

Feel free to modify and adapt this title according to your project's branding and description. If you need more assistance or have specific requests, please let me know.


## Main API Reference

#### Get all auction

```http
  GET /auctions
```

| Parameter    | Type     | Description               |
| :----------- | :------- | :------------------------ |
| `sort`       | `string` | Sort type for products (e.g., cheapest, incomming, luxury) |
| `category`   | `string` | Product category (e.g., clock, antiques, real estate) |
| `price_from` | `number` | Minimum price range for the product |
| `price_to`   | `number` | Maximum price range for the product |
| `name`       | `string` | Product name or keyword |
| `page`       | `number` | Page number for pagination |
| `limit`      | `number` | Limit the number of items per page |

#### Get item

```http
  GET /api/auction/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


## Solution Architect
<div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
    <div>
        <h1>Auction Solution Architect</h1>
        <div>
            <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1699243459/upload/sdqbnpmk0wtkzva1fz1l.png"
                width="400px" height="auto">
        </div>
    </div>
    <div>
        <h1>Usecase</h1>
        <div>
            <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1699243459/upload/hqkpv4amxpaptlm50mwd.png" width="400px" height="auto">
        </div>
    </div>
</div>

### ER Diagram

<img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1699243459/upload/rdomipt3j7fud4n6ecyx.png" width="800px" height="auto" style="margin-left: 50px;">


## Demo

https://kiennguyen.vercel.app/


## Tech Stack

**Client:** React, Redux, Scss, ReduxToolkit, Socket.io-client, MaterialUI

**Server:** Node, Express, Springboot, Socket, Redis, MySQL,...


## Authors

- [@trungkien2022001](https://github.com/trungkien2022001)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Key                        | Description                                            |
| :------------------------- | :----------------------------------------------------- |
| `API_KEY`                  | Your API key                                            |
| `ANOTHER_API_KEY`          | Another API key                                         |
| `APP_CODE`                 | Auction                                                |
| `AWS_ACCESS_KEY_ID`        | Your Access Key ID                                      |
| `AWS_REGION`               | Your AWS region                                         |
| `AWS_SECRET_ACCESS_KEY`    | Your Secret Access Key                                  |
| `IS_DEBUGGING`             |                                           |
| `IS_DEBUG_LOCAL`           |                                          |
| `DEBUG`                    | auction:\*,-auction:helpers:\*,-auction:utils:\*       |
| `PORT`                     | 3030                                                   |
| `SOCKET_PORT`              | 3031                                                   |
| `HTTP_PROXY`               |  |
| `HTTPS_PROXY`              |   |
| `MAX_DISTANCE_KM`          | 50                                                     |
| `MYSQL_CONNECTION_URL`     | defautl: mysql://root@localhost/auction                         |
| `NODE_ENV`                 | staging                                                |
| `NODE_TLS_REJECT_UNAUTHORIZED` | 0                                                  |
| `REDIS_DB`                 | 3                                                      |
| `MAX_LOG_LENGTH`           | 5000                                                   |
| `REDIS_HOST`               | 127.0.0.1                                              |
| `REDIS_PORT`               | 6379                                                   |
| `REDIS_PREFIX`             | auction:                                               |
| `SECRET`                   |    Your JWT secret key                       |
| `MAX_RATE_LIMIT`           | 100                                                    |
| `REACT_APP_API_ENDPOINT`   | http://localhost:3030                                  |
| `REACT_APP_SOCKET_ENDPOINT` | http://localhost:3031                                 |
| `PRODUCTS_WAIT_TIME`       | 3000                                                   |
| `PRODUCT_WAIT_TIME`        | 3000                                                   |
| `HOMEPAGE_WAIT_TIME`       | 4000   



## Features

- Lazy loading
- Product pagination
- Multi-criteria search
- Logging all user activities and system logs
- Real-time notification system, chat
- Spam filtering
- Etc


## Feedback

If you have any feedback, please reach out to us at nguyenkien2022001@gmail.com


## 🚀 About Me
Hi, I'm Kien Nguyen! 👋, I study Computer Science at Hanoi University of Science and Technology. I have a keen interest in exploring new technologies and frameworks. With 1.5 years of experience in Node.js and React.js, along with 3 months of hands-on work in Spring Boot, I've also delved into Laravel, .NET Core, Django, Big Data, Deep Learning, ...

[![Facebook](https://img.shields.io/badge/Facebook-Connect-brightgreen?style=for-the-badge&labelColor=black&logo=facebook)](https://www.facebook.com/trungkien2022001)


## Run Locally

#### 1. Clone the project

```bash
  git clone https://github.com/Trungkien2022001/auction.git
```

#### 2. Go to the project directory

```bash
  cd auction
```

#### 3. Run React APP 
Go to the project directory
```bash
  cd client
```
Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```

#### 4. Run NodeJS APP 
Go to the project directory
```bash
  cd api
```
Install dependencies

```bash
  npm install
```

Start the server

```bash
  pm2 start all
```

#### 5. Run Springboot server APP 
Go to the project directory
```bash
  cd api-springboot
```

Start the server

```bash
  mvn spring-boot:run
```




## Screenshots
<div style="display: flex; flex-wrap: wrap;">
    <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1699241668/upload/sl0rhokjdmukcizemlpd.png"
        width="400px" style="margin: 20px;">
    <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1699241871/upload/zk5qbmarsqb3fex7vlyg.png"
        width="400px" style="margin: 20px;">
    <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1699241905/upload/eo1pr4q9t8abhibyotbj.png"
        width="400px" style="margin: 20px;">
    <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1699244211/upload/hsjiozd2hhxhr302i9pm.png"
        width="400px" style="margin: 20px;">
    <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1699245095/upload/b0fn6yjtovp7lb7wsz9q.png" width="400px" style="margin: 20px;">
    <img src="http://res.cloudinary.com/nguyenkien2022001/image/upload/v1699245169/upload/gt9iuspggqlosfo9mdjz.png" width="400px" style="margin: 20px;">
        
</div>


## Support

For support, email nguyenkien2022001@gmail.com.


## Running Tests

To run tests, run the following command

```bash
  node test.js
```
