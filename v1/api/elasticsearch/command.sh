#Show all index
GET /_cat/indices?v

GET /auction_idx/_search
{
  "query": {
    "match_all": {}
  }
}
POST /auction_idx/_search
{
 "query": {
    "bool": {
      "must": [
        {"term": {"status": {"value": 2}}},
        {"bool": {"must_not": {"exists": {"field": "a.deleted_at"}}}}
        // Thêm các điều kiện khác tùy thuộc vào function Node.js của bạn
      ]
    }
  },
  "sort": [
    {"updated_at": {"order": "desc"}}
  ],
  "size": 6,
  "from": 0
}


# Auction Status
# --------------------------------
GET /auction_status_index/_count
{
  "query": {
    "match_all": {}
  }
}

GET /auction_status_index/_search
{

  "query": {

    "match_all": {}

  }

}

DELETE /auction_status_index
# --------------------------------

# Auction
GET /auction_idx/_count
{
  "query": {
    "match_all": {}
  }
}


GET /auction_index/_count
{
  "query": {
    "match_all": {}
  }
}

## Get All
GET /auction_index/_search
{

  "query": {

    "match_all": {}

  }

}

GET /auction_index/_search
{
  "query": {
    "match": {
      "sell_price": "72000"
    }
  }
}


DELETE /auction_status_index
# --------------------------------

# product
GET /product_index/_count
{
  "query": {
    "match_all": {}
  }
}

## Get All
GET /product_index/_search
{

  "query": {

    "match_all": {}

  }

}

GET /product_index/_search
{
  "query": {
    "match": {
      "name": "đồng hồ"
    }
  }
}
GET /product_index/_search
{
  "query": {
   "multi_match": {
      "query": "đồng hồ",
      "fields": ["name", "description"]
    }
  }
}


DELETE /product_status_index
# --------------------------------