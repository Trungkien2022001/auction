package com.auction.auctionspringboot.constant;

public enum ProductCategory {
    all(0),
    watch_and_accessory(1),
    electronic_computer(2),
    camera(3),
    house_life(4),
    sport_entertainment(5),
    cultural(6),
    fashion(7),
    film(8),
    music(9),
    health_beauty(10),
    kid(11),
    present(12),
    vehicle(13),
    health_and_beauty(14),
    game(15),
    food(16),
    flower(17),
    book(18),
    comic(19),
    hobby(20),
    other(21);;
    

    private final int id;

    ProductCategory(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public static int get(String type) {
        for (ProductCategory category : ProductCategory.values()) {
            if (category.name().replace("_", "-").equals(type)) {
                return category.getId();
            }
        }
        throw new IllegalArgumentException("type not found!");
    }
}
