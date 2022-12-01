# Offer API

## Environment
* Develoment: https://hotel-svc-staging.asgard.goquo.com/
* Production: https://hotel-svc.asgard.goquo.com/

## Methods Supported

* `POST /search` for destination search
* `POST /search-by-id` for individual property search
* `POST /getrooms` for getting list of available rooms. Must be used after `POST /search`.
* `POST /prebook` for prebooking rooms. Must be used after `/getrooms` step or `/search-by-id` step.
* `POST /book` to confirm booking
* `POST /cancel` to cancel your booking
* `POST /retrieve-booking` to get information about your booking
* `POST /hotelinfo` to get hotel information

## Workflow

### Method 1
* Perform `POST /search` to get the list of hotels id available.
* Use `POST /getrooms` to get the list of rooms availble for specific hotels.
* Prebook `POST /prebook` to re-check the selected rate
* Book `POST /book` to confirm booking

### Method 2
* Perform `POST /search-by-id` to get list of rooms availble for specific hotels.
* Prebook `POST /prebook` to re-check the selected rate
* Book `POST /book` to confirm booking

## Sample

### Login

*Parameters*
```json
POST /svc/login HTTP/1.1
Host: <API-ENDPOINT-URL>
Content-Type: application/json
Cache-Control: no-cache

{
    "email": "<your-email@your-domain.com>",
    "password": "<your-password>"
}
```

| Name | Type | Mandatory | Description |
|--|--|--|--|
| email | string | Y | your login email |
| password | string | Y | your login password |

*Responses*
```json
{
    "success": true,
    "data": {
        "auth_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZW1haWwiOiJtYWxpbmRvQGdvcXVvLmNvbSIsImV4cGlyZSI6MTUyMjQyOTcwM30.Md8ZUVTiSIPcmGRDOU7cS8NrPyIZku3kLX4cLPPp-kw"
    }
}
```

| Name | Type | Mandatory | Description |
|--|--|--|--|
| success | boolean | Y |  |
| data | object | Y |  |
| data.auth_token | string | Y | Your authentication token. Required for all the requests. |

### Search

*Parameters*
```json
POST /svc/search HTTP/1.1
Host: <API-ENDPOINT-URL>
Content-Type: application/json
x-key: <your-email@your-domain.com>
x-access-token: <token-from-login-method>
Cache-Control: no-cache

{
    "checkin": "2018-06-14",
    "checkout": "2018-06-16",
    "rooms": [
        {
            "idx": 1,
            "adults": 2,
            "children": [
                {
                    "age": 5
                }
            ]
        }
    ],
    "package": true,
    "destination_code": "BKK",
    "language_code": "en-US",
    "ip": "118.70.12.148",
    "wait_time": 3000,
    "user_agent": "Mozilla",
    "session_id": "b25e745cdd3e4f4ca897bb8eaded4a49",
    "nationality": "VN",
    "country_residence": "VN"
}
```

| Name | Type | Mandatory | Description |
|--|--|--|--|
| checkin | string | Y | Check-in date, in `YYYY-MM-DD` format. |
| checkout | string | Y | Check-out date, in `YYYY-MM-DD` format. |
| rooms | array | Y | The number of items defines the number of rooms requested. Each item has its own adult/child guest count. |
| rooms.idx | int | Y | Specifies for which room number out of total passed rooms the room types are provided for. Please note that the running serial number starts from 1. Must be continuously. |
| rooms.adults | int | Y | Adult guest count for the room. |
| rooms.children | array | Y | The number of items defines the child count. Each item has its own child information. |
| children.age | int | Y (if has children) | Age of the children that will be accomodated in the room. |
| package | boolean | Y | `true` if you're bundling hotel with other product. `false` if you're selling hotel only. |
| destination_code | string | Y | Destination to search within. |
| language_code | string | Y | Identifies your customer’s language want to display. We'll return English if expected language missing. |
| ip | string | Y | IP address of the guest |
| wait_time | int | Y | How long you want to wait in milliseconds. The longer, the more properties we can find. We recommand settings this at 7000-1000 ms |
| user_agent | string | Y | The `user-agent` header string from the customer’s request, as captured by your integration. |
| session_id | string | Y | Unique value for your search |
| nationality | string | Y | Nationality of the guest |
| country_residence | string | Y | Country of residence of the guest |


*Responses*
```json
{
    "success": true,
    "request_id": "de106757746649c2b05b95daaf42e5eb",
    "data": [
        {
            "source_id": "agymbwykbqc",
            "hotel_id": "2225570",
            "currency": "USD",
            "rooms": [
                {
                    "idx": 1,
                    "price_from": 113.56,
                    "free_cancellation": false
                }
            ]
        },
        {
            "source_id": "agymbwykbqc",
            "hotel_id": "148771",
            "goquo_id": "25354",
            "currency": "USD",
            "rooms": [
                {
                    "idx": 1,
                    "price_from": 175.48,
                    "free_cancellation": false
                }
            ]
        }
    ]
}
```

| Name | Type | Mandatory | Description |
|--|--|--|--|
| success | boolean | Y | Request is success or not |
| request_id | string | Y | Unique string, use for next step |
| data | array | Y | |
| data.source_id | string | Y | Data source, where this inventory coming |
| data.hotel_id | string | Y | Hotel id from data source |
| data.goquo_id | string | N | This is the property id which can be used to map properties from different sources. |
| data.currency | string | Y | Currency code of the rates returned |
| data.rooms | array | Y | Contains the details of the rooms for this hotel with cheapest price. |
| rooms.idx | int | Y | Specifies for which room number out of total passed rooms the room types are provided for. Please note that the running serial number starts from 1. |
| rooms.price_from | float | Y | The lowest offer we can find for this specific property. |
| rooms.free_cancellation | boolean | N | Indicates if any room has free cancellation without charge. |

### Search By Id

> Please note that this method is not intended to use for mass city search. Use `/search` instead.

*Parameters*
```json
POST /svc/search-by-id HTTP/1.1
Host: <API-ENDPOINT-URL>
Content-Type: application/json
x-key: <your-email@your-domain.com>
x-access-token: <token-from-login-method>
Cache-Control: no-cache

{
    "source_id": "agymbwykbqc",
    "ids": [
        "529364",
        "1135283",
        "1235627"
    ],
    "checkin": "2018-06-03",
    "checkout": "2018-06-06",
    "rooms": [
        {
            "idx": 1,
            "adults": 2
        }
    ],
    "package": false,
    "language_code": "en-US",
    "ip": "127.0.0.1",
    "user_agent": "Mozilla",
    "session_id": "b25e745cdd3e4f4ca897bb8eaded4a49",
    "nationality": "VN",
    "country_residence": "VN"
}
```

> All parameters are same `search` method, different parameter mentioned below

| Name | Type | Mandatory | Description |
|--|--|--|--|
| source_id | string | N | Required if you want to looking for inventories from specific source |
| ids | array | Y | List of hotel ids |

*Responses*
```json
{
    "success": true,
    "data": [
        {
            "hotel_id": "290147",
            "rooms": [
                {
                    "idx": 1,
                    "rates": [
                        {
                            "board_basis": "Breakfast",
                            "cancellation_text": "This booking is Non-Refundable and cannot be amended or modified. If you fail to arrive or cancel the booking, no refund will be given.",
                            "cancellations": [
                                {
                                    "from": "2017-11-13 00:00",
                                    "to": "2018-02-06 23:59",
                                    "amount": 182.58
                                }
                            ],
                            "currency": "USD",
                            "non_refundable": true,
                            "price": 188.06,
                            "promos": [
                                {
                                    "name": "Limited time offer. Rate includes 45% discount!",
                                    "value": 74.69
                                }
                            ],
                            "rate_detail": "JbGon8pPSoTyde0S04PWGFu/mmaStFZQBhvkUKSL1bF8ER7OCIzk2qch+W3PQTznoMO/KiTme7Knk6EAfvOlHP4eFZvQNYujcGupWMhG1S4=",
                            "remainings": 7
                        }
                    ],
                    "room_name": "Superior Room",
                    "room_type_id": "3075923"
                },
                {
                    "idx": 1,
                    "rates": [
                        {
                            "board_basis": "Breakfast",
                            "cancellation_text": "Any cancellation received within 1 day prior to the arrival date will incur the first night's charge. If you fail to arrive or cancel the booking, no refund will be given.",
                            "cancellations": [
                                {
                                    "from": "2017-11-13 01:51",
                                    "to": "2018-02-02 23:59",
                                    "amount": 0
                                },
                                {
                                    "from": "2018-02-03 00:00",
                                    "to": "2018-02-03 23:59",
                                    "amount": 130.37
                                },
                                {
                                    "from": "2018-02-04 00:00",
                                    "to": "2018-02-06 23:59",
                                    "amount": 260.74
                                }
                            ],
                            "currency": "USD",
                            "non_refundable": false,
                            "price": 268.56,
                            "promos": [
                                {
                                    "name": "Limited time offer. Rate includes 40% discount!",
                                    "value": 86.92
                                }
                            ],
                            "rate_detail": "Ch2b7LaAEr6M3iiXrwPkai/WORt/+HfKqk+5YGoZzmEpxqbiSbsU9uUm1Q/PPuX/3b9wO897mnjgbqlIRuSDCTBAwr0EDeTrRKOQ3aOS7yY=",
                            "remainings": 1
                        }
                    ],
                    "room_name": "Executive Room",
                    "room_type_id": "3075910"
                },
                {
                    "idx": 2,
                    "rates": [
                        {
                            "board_basis": "Breakfast",
                            "cancellation_text": "Any cancellation received within 1 day prior to the arrival date will incur the first night's charge. If you fail to arrive or cancel the booking, no refund will be given.",
                            "cancellations": [
                                {
                                    "from": "2017-11-13 01:51",
                                    "to": "2018-02-02 23:59",
                                    "amount": 0
                                },
                                {
                                    "from": "2018-02-03 00:00",
                                    "to": "2018-02-03 23:59",
                                    "amount": 130.98
                                },
                                {
                                    "from": "2018-02-04 00:00",
                                    "to": "2018-02-06 23:59",
                                    "amount": 261.96
                                }
                            ],
                            "currency": "USD",
                            "non_refundable": false,
                            "price": 269.82,
                            "promos": [
                                {
                                    "name": "Limited time offer. Rate includes 30% discount!",
                                    "value": 56.13
                                }
                            ],
                            "rate_detail": "90mo37iysoxG5/Re/LSzCLGN4YBnZqQlm88RnrE6k9JG262KVYqkM81fBsZ/gK2q8guwrOW8+rqn/tHoMJcjgkz+ZrB/URyPt7ahHkHY/cs=",
                            "remainings": 5
                        }
                    ],
                    "room_name": "Deluxe Room",
                    "room_type_id": "3075890"
                },
                {
                    "idx": 2,
                    "rates": [
                        {
                            "board_basis": "Breakfast",
                            "cancellation_text": "Any cancellation received within 1 day prior to the arrival date will incur the first night's charge. If you fail to arrive or cancel the booking, no refund will be given.",
                            "cancellations": [
                                {
                                    "from": "2017-11-13 01:51",
                                    "to": "2018-02-02 23:59",
                                    "amount": 0
                                },
                                {
                                    "from": "2018-02-03 00:00",
                                    "to": "2018-02-03 23:59",
                                    "amount": 255.01
                                },
                                {
                                    "from": "2018-02-04 00:00",
                                    "to": "2018-02-06 23:59",
                                    "amount": 510.02
                                }
                            ],
                            "currency": "USD",
                            "non_refundable": false,
                            "price": 525.32,
                            "promos": [
                                {
                                    "name": "Limited time offer. Rate includes 35% discount!",
                                    "value": 137.31
                                }
                            ],
                            "rate_detail": "a9kYoa+iuEKcv/NEBPhBvblxX2baG69QZrrGE6rZQaO6/fLVsrt3YGZHHXB3psZQXjSaU0UTqLI2HC108n6eRobhbV1tdx+ZNJqeL3rgv+E=",
                            "remainings": 1
                        }
                    ],
                    "room_name": "Connecting Rooms",
                    "room_type_id": "9450469"
                }
            ],
            "source_id": "agymbwykbqc",
            "goquo_id": "216947"
        }
    ]
}
```

| Name | Type | Mandatory | Description |
|--|--|--|--|
| success | boolean | Y | |
| data | array | Y | |
| data.hotel_id | string | Y | ID for the property. |
| data.source_id | string | Y | |
| data.goquo_id | string | N | |
| data.rooms | array | Y | Contains the details for the rooms returned by the hotel. |
| rooms.idx | int | Y | Specifies for which room number out of total passed rooms the room types are provided for. Please note that the running serial number starts from 1. |
| rooms.room_type_id | string | Y | Room type ID for the room |
| rooms.room_name | string | Y | Short description of the room type |
| rooms.rates | array | Y | Contains an array of `rates` elements that provide detailed rate information for individual rooms. |
| rates.board_basis | string | Y | Short description of the rate. Can be these values: `Self Catering`, `Room Only`, `Breakfast`, `Half Board`, `Full Board`, `All Inclusive` |
| rates.currency | string | Y | Currency code for the rates returned |
| rates.price | float | Y | The total to be charged for the reservation. This is the total value that must be displayed to the customer and included in the booking request. |
| rates.rate_detail | string | Y | Key to the search parameters and other values determining the rate. |
| rates.remainings | int | N | The number of rooms available besides the one returned. |
| rates.non_refundable | boolean | N | Indicates if the booking is nonrefundable. Must display if returned - all charges are final after a successful booking. This value always takes precedence over any differing policy data. |
| rates.free_cancellation | boolean | N| Indicates if the booking is free cancellation without charge. |
| rates.cancellation_text | string | N | Hotel's cancellation policy for this room. Free text, if any. |
| rates.cancellations | array | N | Details about the cancellation policy applicable for this room type and rate basis. |
| cancellations.from | string | Y | Starting date of the rule. From this day forward until `to`, the specified charge will be applied for any cancellations or amendments. Date format is: `YYYY-MM-DD HH:mm:ss` |
| cancellations.to | string | Y | Ending date of the rule. The specified charge will be applied for any cancellations or amendments until this date. Date format is: `YYYY-MM-DD HH:mm:ss` |
| cancellations.amount | float | Y | Charge that will be applied |
| rates.promos | array | Y | Encapsulates a list with all the special promotion that are applicable for this room type in the specified period. |
| promos.name | string | N | Description for the promo returned, if any. |
| promos.value | float | N | Promo value applied, if any. This is not exact amount or not match with promo name. |

### Get Rooms

*Parameters*
```json
POST /svc/getrooms HTTP/1.1
Host: <API-ENDPOINT-URL>
Content-Type: application/json
x-key: <your-email@your-domain.com>
x-access-token: <token-from-login-method>
Cache-Control: no-cache

{
    "request_id": "ed33cedc432f4e6c8b198a7773faf56f",
    "hotels": [
        {
            "source_id": "{{source_id}}",
            "hotel_id": "{{hotel_id}}"
        }
    ]
}
```

| Name | Type | Mandatory | Description |
|--|--|--|--|
| request_id | string | Y | Unique string from search / search-by-id response. |
| hotels | array | Y | Contains a hotel element for each hotel the customer wishes to book. |
| hotels.source_id | string | Y | Data source, where this inventory coming |
| hotels.hotel_id | string | Y | Hotel id from data source |
| hotels.goquo_id | string | N | Unique id from GoQuo. Required if `source_id` and `hotel_id` missing |

*Responses*
> Same as `search-by-id` responses

### Prebook

*Parameters*
```json
POST /svc/prebook HTTP/1.1
Host: <API-ENDPOINT-URL>
Content-Type: application/json
x-key: <your-email@your-domain.com>
x-access-token: <token-from-login-method>
Cache-Control: no-cache

{
    "request_id": "ed33cedc432f4e6c8b198a7773faf56f",
    "source_id": "{{source_id}}",
    "hotel_id": "{{hotel_id}}",
    "rooms": [
      {
        "idx": 1,
        "room_type_id": "200175136",
        "rate_detail": "1lDwawfeT47XG44DxiisvRNwHjf942xT0otDICBj9VC00CtstkL1pWpmsoHDK5PgqIJXf0K4KaAenT5oz+nD2bFztw/ZTk02oxTMsxGJBDK0BZIIvNYohWQjMbL7g7ukbwAFMBYvDszKB1ot3mmo1XZk5wtGhoZ1xRreogIgVWylRuk5GtpSFKiEtuZZxQ4RUv40uh5KRCA09d9Y5soFDg=="
      }
    ]
}
```

| Name | Type | Mandatory | Description |
|--|--|--|--|
| request_id | string | Y | Unique string from search / search-by-id response. |
| source_id | string | Y | Data source, where this inventory coming |
| hotel_id | string | Y | Hotel id from data source |
| goquo_id | string | N | Unique id from GoQuo. Required if `source_id` and `hotel_id` missing |
| rooms | array | Y |Contains the details for the rooms which customer wishes to book |
| rooms.idx | int | Y | Specifies for which room number out of total passed rooms the room types are provided for. Please note that the running serial number starts from 1. |
| rooms.room_type_id | string | Y | Room type ID for the room |
| rooms.rate_detail | string | Y | Key to the search parameters and other values determining the rate. |

*Responses*
```json
{
    "success": true,
    "request_id": "42e64459d46d43bb882813af2c3dd136",
    "data": {
        "hotel_id": "290147",
        "amount": 188.06,
        "currency": "USD",
        "rooms": [
            {
                "board_basis": "Breakfast",
                "cancellations": [
                    {
                        "from": "2017-11-13 00:00",
                        "to": "2018-02-06 23:59",
                        "amount": 182.58
                    }
                ],
                "currency": "USD",
                "idx": 1,
                "non_refundable": true,
                "prebook_token": "XDr1FrL9R0y3KpPgkuoz55OhZEavYYDKeZ2iZ/GjgjPPfNDTXn1qwfXOn2W0gxlgSW2y465EFx1WI/jMkIuq0UA04wIHkHGwwLwqhwMUOiERL2b1N8ndp4/BmEyF9P8PoMFr3fhU+aXDQoCzWFZign2faeAWzsnP3eUSUan5iNIs9IPEEWhP0wG1eyc37WTOTruMBqEkr5ypR/iqmsmdmZ9y/FlWkX70pJ/tLRXiqZWP44X8k/U7E1DOi2Gz9C6Ay6snsmoA3XdbfaRZWKJVaMTUbcAwb6CfWG7z0Jd6g49PUkYx/B3hkKpShPHGSoOYFNEkX3x7TkcdsdaSEwuSceasTycu3A1xidr4Tu13ztT7yG96sDVip4dZry2dx5LGJphj/s5lXxWGeHktA2Up7FCGyguSoVDJZZhweYIugHhf8mtlj08i4GEl7GXJD1P9uhLO+El3g4H7G0jzK7zw18KRozkA6Zz+oxNfOuVm2Y2ZP4J1ndC2IGljKOht7HKx1XoEPKNEmXBKjoz/f4RGCX42b707irZgclrq63YC8se9m/I1EztwfU05RoaOy8/I+Bpggum4zYLDiwTTsWxdbQ==",
                "price": 188.06,
                "remainings": 7,
                "room_name": "Superior Room",
                "room_type_id": "3075923"
            }
        ]
    }
}
```

> All parameters are same `search-by-id` or `getrooms` response, different parameter mentioned below

| Name | Type | Mandatory | Description |
|--|--|--|--|
| data.rooms.prebook_token | string | Y | Key to determining the room rate wishes to book. |

### Book

*Parameters*
```json
POST /booksvc/book HTTP/1.1
Host: <API-ENDPOINT-URL>
Content-Type: application/json
x-key: <your-email@your-domain.com>
x-access-token: <token-from-login-method>
Cache-Control: no-cache

{
  "request_id": "5b615d2ccc0146639e4b038462bf6601",
  "source_id": "agymbwykbqc",
  "client_ref": "ANH15894",
  "rooms": [
    {
      "idx": 1,
      "paxes": [
        {
          "title": "Mr",
          "first_name": "John",
          "last_name": "Doe",
          "age": 30,
          "type": "adult",
          "nationality": "VN"
        },
        {
          "title": "Ms",
          "first_name": "Jane",
          "last_name": "Doe",
          "age": 20,
          "type": "adult",
          "nationality": "VN"
        }
      ]
    }
  ],
  "holder": {
    "title": "Mr",
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "mobile": "123123123",
    "city": "Kuala Lumpur",
    "address": "1st Main St.",
    "postal_code": "100000"
  }
}
```

| Name | Type | Mandatory | Description |
|--|--|--|--|
| request_id | string | Y | Key to determining the room rate wishes to book. |
| source_id | string | Y |  |
| client_ref | string | Y | Your unique booking identifier. This field is required to be unique. |
| rooms | array | Y |  |
| rooms.idx | int | Y |  |
| rooms.paxes | array | Y |  |
| rooms.paxes.title | string | Y | Title of room guest. |
| rooms.paxes.first_name | string | Y | First name of room guest. |
| rooms.paxes.last_name | string | Y | Last name of room guest. |
| rooms.paxes.age | int | N | Required if passenger is child. |
| rooms.paxes.type | string | Y | One of these value: `adult`, `child`, `infant` |  |
| rooms.paxes.nationality | string | Y | Nationality of room guest. |
| rooms.remarks | array | Y | Special requests to send to hotel (not guaranteed). |

*Responses*
```json
{
  "success": true,
  "request_id": "7d214a3303d34896a4b7ba8d6418b68e",
  "data": {
    "booking_id": "303905482",
    "currency": "USD",
    "status": "Confirmed",
    "rooms": [
      {
        "confirmation_number": "146545200866",
        "idx": 1,
        "status": "Confirmed"
      }
    ],
    "amount": 30.01
  }
}
```

| Name | Type | Mandatory | Description |
|--|--|--|--|
| success | boolean | Y |  |
| request_id | string | Y | Key to determining the room rate wishes to book. |
| data | object | Y | |
| data.booking_id | string | Y | |
| data.currency | string | Y | |
| data.status | string | Y | One of these value: `Confirmed`, `Pending`, `Received` |
| data.rooms | array | Y | |
| rooms.idx | int | Y | |
| rooms.confirmation_number | string | Y | |
| rooms.status | string | Y | |

### Cancel booking

*Parameters*
```json
POST /booksvc/cancel HTTP/1.1
Host: <API-ENDPOINT-URL>
Content-Type: application/json
Cache-Control: no-cache

{
  "source_id": "agymbwykbqc",
  "booking_id": "700879655"
}
```

| Name | Type | Mandatory | Description |
|--|--|--|--|
| source_id | string | Y | Data source for your booking id. |
| booking_id | string | Y | Your booking id from book step. |

*Responses*
```json
{
    "success": true,
    "data": [
        {
            "booking_id": "5829568",
            "status": "Cancelled"
        }
    ]
}
```

### Retrieve

*Parameters*
```json
POST /booksvc/retrieve-booking HTTP/1.1
Host: <API-ENDPOINT-URL>
Content-Type: application/json
Cache-Control: no-cache

{
  "booking_id": "700879655"
}
```

> All parameters same as cancel booking api.

*Responses*


### Hotel Information

*Paramerter*
```json
POST /infosvc/hotelinfo HTTP/1.1
Host: <API-ENDPOINT-URL>
Content-Type: application/json
Authorization: Basic Z29xdW86MTIzMTIz

{
  "source_id": "agymbwykbqc",
  "ids": [
    "424497"
  ],
  "language_code": "en-US"
}
```

| Name | Type | Mandatory | Description |
|--|--|--|--|
| source_id | string | Y | Data source for your hotel. |
| ids | string | Y | List of hotel id you want to get the information. Max: 20 |
| language_code | string | Y | Language code |

*Responses*

```json
{
    "success": true,
    "data": [
        {
            "hotel_id": "6961",
            "name": "Hilton Kuala Lumpur",
            "address": "3 Jalan Stesen Sentral, 50470 Kuala Lumpur",
            "city": "Kuala Lumpur",
            "country": "MY",
            "star_rating": 5,
            "postal_code": "50470",
            "description": "<p><b>Property Location</b> <br />With a stay at Hilton Kuala Lumpur, you'll be centrally located in Kuala Lumpur, within a 10-minute drive of Merdeka Square and Petaling Street.  This 5-star hotel is 2.5 mi (4 km) from Malaysian Houses of Parliament and 7.2 mi (11.7 km) from Petronas Twin Towers.</p><p><b>Rooms</b> <br />Make yourself at home in one of the 510 individually furnished guestrooms, featuring refrigerators and LED televisions. Digital programming provides entertainment, and wired and wireless Internet access is available for a surcharge. Private bathrooms with separate bathtubs and showers feature deep soaking bathtubs and rainfall showerheads. Conveniences include phones, as well as safes and desks.</p><p><b>Amenities</b> <br />Relax at the full-service spa, where you can enjoy massages, body treatments, and facials. If you're looking for recreational opportunities, you'll find an outdoor pool, a waterslide, and a spa tub. This hotel also features complimentary wireless Internet access, concierge services, and gift shops/newsstands.</p><p><b>Dining</b> <br />Enjoy fusion cuisine at Boardwalk, one of the hotel's 6 restaurants, or stay in and take advantage of the 24-hour room service. Snacks are also available at the coffee shop/café. Relax with a refreshing drink from the poolside bar or one of the 3 bars/lounges. Buffet breakfasts are available for a fee.</p><p><b>Business, Other Amenities</b> <br />Featured amenities include a business center, limo/town car service, and express check-in. Event facilities at this hotel consist of conference space and meeting rooms. A roundtrip airport shuttle is provided for a surcharge (available 24 hours), and self parking (subject to charges) is available onsite.</p>",
            "accommodation_type": "hotel",
            "checkin_instructions": "Extra-person charges may apply and vary depending on property policy. <br />Government-issued photo identification and a credit card or cash deposit are required at check-in for incidental charges. <br />Special requests are subject to availability upon check-in and may incur additional charges. Special requests cannot be guaranteed. <br /> <br />",
            "special_checkin_instructions": "24-hour airport shuttle service is available on request. Contact the property in advance to make arrangements.",
            "lat": 3.135227,
            "lng": 101.685899,
            "phone": "+60322642264",
            "fax": "+60322642266",
            "email": "kuala-lumpur@hilton.com",
            "website": "http://www1.hilton.com/en_US/hi/hotel/KULHIHI-Hilton-Kuala-Lumpur-hotel/index.do?WT.mc_id=zADWAYC1HI4GooglePlaces7UK",
            "checkin": "15:00",
            "checkout": "12:00",
            "nearby_airports": [
                "KUL"
            ],
            "nationality_restrictions": "",
            "amenities": [
                {
                    "code": "4468",
                    "name": "24-hour fitness facilities"
                },
                {
                    "code": "2063",
                    "name": "24-hour front desk"
                },
                {
                    "code": "2420",
                    "name": "Accessible bathroom"
                },
                {
                    "code": "56",
                    "name": "Airport transportation (surcharge)"
                },
                {
                    "code": "361",
                    "name": "Breakfast available (surcharge)"
                },
                {
                    "code": "2065",
                    "name": "Business center"
                },
                {
                    "code": "2014",
                    "name": "Children's pool"
                },
                {
                    "code": "2004",
                    "name": "Coffee shop or café"
                },
                {
                    "code": "324",
                    "name": "Coffee/tea in common areas"
                },
                {
                    "code": "43",
                    "name": "Concierge services"
                },
                {
                    "code": "81",
                    "name": "Conference space"
                },
                {
                    "code": "2349",
                    "name": "Designated smoking areas"
                },
                {
                    "code": "3269",
                    "name": "Designated smoking areas (fines apply)"
                },
                {
                    "code": "2070",
                    "name": "Dry cleaning/laundry service"
                },
                {
                    "code": "8",
                    "name": "Elevator/lift"
                },
                {
                    "code": "2177",
                    "name": "Express check-in"
                },
                {
                    "code": "2067",
                    "name": "Express check-out"
                },
                {
                    "code": "2390",
                    "name": "Free WiFi"
                },
                {
                    "code": "2047",
                    "name": "Free newspapers in lobby"
                },
                {
                    "code": "2123",
                    "name": "Full-service spa"
                },
                {
                    "code": "44",
                    "name": "Gift shops or newsstand"
                },
                {
                    "code": "40",
                    "name": "Hair salon"
                },
                {
                    "code": "2423",
                    "name": "In-room accessibility"
                },
                {
                    "code": "369",
                    "name": "Laundry facilities"
                },
                {
                    "code": "2072",
                    "name": "Limo or Town Car service available"
                },
                {
                    "code": "4451",
                    "name": "Long-term parking (surcharge)"
                },
                {
                    "code": "4003",
                    "name": "Luggage storage"
                },
                {
                    "code": "2131",
                    "name": "Meeting rooms - 14"
                },
                {
                    "code": "2043",
                    "name": "Multilingual staff"
                },
                {
                    "code": "3913",
                    "name": "Number of bars/lounges - 3"
                },
                {
                    "code": "54",
                    "name": "Number of floors - 35"
                },
                {
                    "code": "2537",
                    "name": "Number of restaurants - 6"
                },
                {
                    "code": "24",
                    "name": "Outdoor pool"
                },
                {
                    "code": "400",
                    "name": "Poolside bar"
                },
                {
                    "code": "2066",
                    "name": "Porter/bellhop"
                },
                {
                    "code": "2783",
                    "name": "RV, bus, truck parking"
                },
                {
                    "code": "2421",
                    "name": "Roll-in shower"
                },
                {
                    "code": "2135",
                    "name": "Sauna"
                },
                {
                    "code": "3862",
                    "name": "Self parking (surcharge)"
                },
                {
                    "code": "45",
                    "name": "Shopping on site"
                },
                {
                    "code": "2129",
                    "name": "Spa treatment room(s)"
                },
                {
                    "code": "371",
                    "name": "Spa tub"
                },
                {
                    "code": "2134",
                    "name": "Steam room"
                },
                {
                    "code": "52",
                    "name": "Total number of rooms - 510"
                },
                {
                    "code": "2387",
                    "name": "Tours/ticket assistance"
                },
                {
                    "code": "3864",
                    "name": "Valet parking (surcharge)"
                },
                {
                    "code": "2818",
                    "name": "Waterslide"
                },
                {
                    "code": "2167",
                    "name": "Wedding services"
                },
                {
                    "code": "2515",
                    "name": "Year Built - 2004"
                },
                {
                    "code": "151",
                    "name": "English"
                },
                {
                    "code": "154",
                    "name": "Arabic"
                },
                {
                    "code": "187",
                    "name": "Chinese [Cantonese]"
                },
                {
                    "code": "186",
                    "name": "Chinese [Mandarin]"
                },
                {
                    "code": "189",
                    "name": "Filipino"
                },
                {
                    "code": "163",
                    "name": "French"
                },
                {
                    "code": "164",
                    "name": "German"
                },
                {
                    "code": "167",
                    "name": "Hindi"
                },
                {
                    "code": "169",
                    "name": "Indonesian"
                },
                {
                    "code": "170",
                    "name": "Italian"
                },
                {
                    "code": "153",
                    "name": "Japanese"
                },
                {
                    "code": "171",
                    "name": "Korean"
                },
                {
                    "code": "174",
                    "name": "Malay"
                },
                {
                    "code": "192",
                    "name": "Nepali"
                },
                {
                    "code": "181",
                    "name": "Spanish"
                },
                {
                    "code": "194",
                    "name": "Tamil"
                },
                {
                    "code": "152",
                    "name": "Thai"
                },
                {
                    "code": "79",
                    "name": "Wi-Fi in public areas"
                },
                {
                    "code": "57",
                    "name": "Fitness center"
                },
                {
                    "code": "54",
                    "name": "Hot tub"
                },
                {
                    "code": "51",
                    "name": "Massage"
                },
                {
                    "code": "10",
                    "name": "Nightclub"
                },
                {
                    "code": "61",
                    "name": "Spa"
                },
                {
                    "code": "59",
                    "name": "Steamroom"
                },
                {
                    "code": "65",
                    "name": "Swimming pool [outdoor]"
                },
                {
                    "code": "268",
                    "name": "Yoga room"
                },
                {
                    "code": "7",
                    "name": "Bar"
                },
                {
                    "code": "6",
                    "name": "Coffee shop"
                },
                {
                    "code": "11",
                    "name": "Restaurants"
                },
                {
                    "code": "1",
                    "name": "Room service [24-hour]"
                },
                {
                    "code": "104",
                    "name": "Hot spring bath"
                },
                {
                    "code": "23",
                    "name": "Concierge"
                },
                {
                    "code": "120",
                    "name": "Currency exchange"
                },
                {
                    "code": "240",
                    "name": "Daily housekeeping"
                },
                {
                    "code": "274",
                    "name": "Doorman "
                },
                {
                    "code": "118",
                    "name": "Dry cleaning"
                },
                {
                    "code": "243",
                    "name": "Gift/souvenir shop"
                },
                {
                    "code": "246",
                    "name": "Laundromat"
                },
                {
                    "code": "8",
                    "name": "Laundry service"
                },
                {
                    "code": "13",
                    "name": "Safety deposit boxes"
                },
                {
                    "code": "14",
                    "name": "Salon"
                },
                {
                    "code": "2",
                    "name": "Shops"
                },
                {
                    "code": "83",
                    "name": "Smoking area"
                },
                {
                    "code": "19",
                    "name": "Babysitting service"
                },
                {
                    "code": "81",
                    "name": "Family room"
                },
                {
                    "code": "55",
                    "name": "Kids club"
                },
                {
                    "code": "53",
                    "name": "Swimming pool [kids]"
                },
                {
                    "code": "119",
                    "name": "Check-in/out [express]"
                },
                {
                    "code": "251",
                    "name": "Check-in/out [private]"
                },
                {
                    "code": "272",
                    "name": "Check-in [24-hour]"
                },
                {
                    "code": "5",
                    "name": "Elevator"
                },
                {
                    "code": "16",
                    "name": "Facilities for disabled guests"
                },
                {
                    "code": "116",
                    "name": "Front desk [24-hour]"
                },
                {
                    "code": "24",
                    "name": "Pets allowed"
                },
                {
                    "code": "235",
                    "name": "Security [24-hour]"
                },
                {
                    "code": "254",
                    "name": "Wheelchair accessible"
                },
                {
                    "code": "17",
                    "name": "Airport transfer"
                },
                {
                    "code": "358",
                    "name": "Car park [charges apply]"
                },
                {
                    "code": "354",
                    "name": "Car park [on-site]"
                },
                {
                    "code": "123",
                    "name": "Rental car "
                },
                {
                    "code": "252",
                    "name": "Taxi service"
                },
                {
                    "code": "22",
                    "name": "Valet parking"
                },
                {
                    "code": "25",
                    "name": "Air conditioning"
                },
                {
                    "code": "26",
                    "name": "Bathrobes"
                },
                {
                    "code": "37",
                    "name": "Bathtub"
                },
                {
                    "code": "47",
                    "name": "Coffee/tea maker"
                },
                {
                    "code": "29",
                    "name": "Desk"
                },
                {
                    "code": "49",
                    "name": "Free bottled water"
                },
                {
                    "code": "30",
                    "name": "Hair dryer"
                },
                {
                    "code": "34",
                    "name": "In-room safe box"
                },
                {
                    "code": "31",
                    "name": "Internet access – wireless"
                },
                {
                    "code": "33",
                    "name": "Ironing facilities"
                },
                {
                    "code": "78",
                    "name": "LAN Internet in room [charges apply]"
                },
                {
                    "code": "40",
                    "name": "Mini bar"
                },
                {
                    "code": "15",
                    "name": "Non-smoking"
                },
                {
                    "code": "28",
                    "name": "On-demand movies"
                },
                {
                    "code": "44",
                    "name": "Satellite/cable channels"
                },
                {
                    "code": "38",
                    "name": "Shower"
                },
                {
                    "code": "139",
                    "name": "Telephone"
                },
                {
                    "code": "141",
                    "name": "Toiletries"
                },
                {
                    "code": "195",
                    "name": "Wake-up service"
                },
                {
                    "code": "76",
                    "name": "Wi-Fi [charges apply]"
                },
                {
                    "code": "1995",
                    "name": "Wheelchair Access"
                },
                {
                    "code": "3224",
                    "name": "Shopping Arcade"
                },
                {
                    "code": "1993",
                    "name": "Safety Deposit Box"
                },
                {
                    "code": "3154",
                    "name": "Night Club"
                },
                {
                    "code": "641",
                    "name": "Restaurant"
                },
                {
                    "code": "3871",
                    "name": "Foreign Currency Exchange"
                },
                {
                    "code": "18236",
                    "name": "Express Check-In"
                },
                {
                    "code": "698",
                    "name": "Valet Parking"
                },
                {
                    "code": "18446",
                    "name": "Room Service - 24 Hours"
                },
                {
                    "code": "2007",
                    "name": "Elevators"
                },
                {
                    "code": "18776",
                    "name": "Complimentary In-Room Coffee Or Tea"
                },
                {
                    "code": "663",
                    "name": "Car Parking - Onsite Paid"
                },
                {
                    "code": "18246",
                    "name": "Express Check-Out"
                },
                {
                    "code": "719",
                    "name": "Air Conditioning"
                }
            ],
            "images": [
                {
                    "caption": "Featured Image",
                    "url": "https://static.goquo.com/eean/hotels/1000000/910000/901900/901881/42d5f76f_b.jpg"
                }
            ],
            "interest_points": [
                {
                    "distance": "6000 meters",
                    "name": "Pavillion Kuala Lumpur"
                },
                {
                    "distance": "350 meters",
                    "name": "Nu Sentral, Shopping Mall"
                },
                {
                    "distance": "6500 meters",
                    "name": "Petronas Twin Towers"
                },
                {
                    "distance": "1200 meters",
                    "name": "Muzium Negara (National Museum)"
                },
                {
                    "distance": "2200 meters",
                    "name": "Midvalley Megamall"
                },
                {
                    "distance": 1,
                    "name": "Petaling Street"
                },
                {
                    "distance": 0.76,
                    "name": "Istana Negara Malaysia Palace"
                },
                {
                    "distance": 0.98,
                    "name": "National Monument Kuala Lumpur"
                },
                {
                    "distance": 0.2,
                    "name": "National Museum and the Museum and Antiquity Department"
                },
                {
                    "distance": 0.61,
                    "name": "Kuala Lumpur Bird Park"
                },
                {
                    "distance": 1.07,
                    "name": "Merdeka Stadium"
                },
                {
                    "distance": 0.64,
                    "name": "Old Kuala Lumpur Railway Station"
                },
                {
                    "distance": 0.5,
                    "name": "Buddhist Maha Vihara, Brickfields"
                },
                {
                    "distance": 0.62,
                    "name": "National Mosque"
                },
                {
                    "distance": 0.97,
                    "name": "Central Market aka Pasar Seni"
                }
            ]
        }
    ]
}
```