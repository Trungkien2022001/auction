use auction
use auction_clone
insert into auction_incomming 
select COUNT(*) from auction 
where start_time > '2023-12-24 06:00:00'
select count(id) from auction_incomming
select count(*) from auction_incomming ai where status = 1
select count(id) from auction
select `a`.`id`, `a`.`start_time`, `a`.`end_time`, `a`.`start_price`, `a`.`sell_price`, `a`.`seller_id`, `a`.`status`, `p`.`category_id`, `a`.`auction_count`, `a`.`auctioneer_win`, `ast`.`name` as `auction_status`, `p`.`name` as `product_name`, `at`.`title` as `auction_time` 
from `auction` as `a` 
inner join `product` as `p` on `a`.`product_id` = `p`.`id` 
inner join `auction_time` as `at` on `a`.`auction_time` = `at`.`id` 
inner join `auction_status` as `ast` on `a`.`status` = `ast`.`id` 
where (`p`.`category_id` = 11 
and a.start_time >'2023-12-24 06:00:00'
and a.start_time <'2024-01-24 06:00:00'
and `a`.`sell_price` <= '1000000' 
and p.name like '%kien%'
and `a`.`status` = 1) order by `a`.`sell_price` 
asc limit 2400 
CREATE INDEX idx_id_status_auction_incomming ON auction_incomming(id, status);
create index idx_id_auction on auction(id)
create index idx_id_product on product(id)
show index from auction
show index from product
create index idx_id_auction_test1 on auction_incomming(id)
select * from auction_incomming ai  where id > 1000000 and id < 1200000