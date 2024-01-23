use auction
use auction_clone
insert into auction_incomming 
select COUNT(*) from auction 
where start_time > '2023-12-24 06:00:00'
select count(id) from auction_incomming
select count(*) from auction_incomming ai where status = 1
select count(id) from auction
select `a`.`id`, `a`.`start_time`, `a`.`end_time`, 
`a`.`start_price`, `a`.`sell_price`, `a`.`seller_id`, 
`a`.`status`, `p`.`category_id`, `a`.`auction_count`, 
`a`.`auctioneer_win`, `ast`.`name` as `auction_status`, 
`p`.`name` as `product_name`, `at`.`title` as `auction_time` 
from `auction` as `a` 
inner join `product` as `p` on `a`.`product_id` = `p`.`id` 
inner join `auction_time` as `at` on `a`.`auction_time` = `at`.`id` 
inner join `auction_status` as `ast` on `a`.`status` = `ast`.`id` 
where (`p`.`category_id` = 11 
-- and a.start_time >'2023-12-24 06:00:00'
-- and a.start_time <'2024-01-24 06:00:00'
and `a`.`sell_price` <= '1000000' 
and p.name like '%kien%'
and `a`.`status` = 2) 
limit 24
CREATE INDEX idx_id_status_auction_incomming ON auction_incomming(id, status);
create index idx_id_auction on auction(id)
create index idx_id_product on product(id)
show index from auction
show index from product
create index idx_id_auction_test1 on auction_incomming(id)
select * from auction_incomming ai  where id > 1000000 and id < 1200000
use auction
DELIMITER //
CREATE PROCEDURE auction.InsertMillionRecords()
BEGIN
    DECLARE i INT DEFAULT 1;

    WHILE i <= 1000000 DO
        INSERT INTO test (point) VALUES (FLOOR(RAND() * 100) + 1);
        SET i = i + 1;
    END WHILE;
END //

DELIMITER ;

-- Gọi thủ tục để chèn dữ liệu
CALL auction.InsertMillionRecords();
select count * from test
show index from auction
delete from test where id > 100
select * from auction where status = 1
create index idx_auction_status on auction(status)
ALTER TABLE product ADD FULLTEXT INDEX idx_fulltext_name (name);




delete from auction_history where true
delete from notification  where true
delete from user_auction  where true
delete from image  where true
delete from auction  where true
