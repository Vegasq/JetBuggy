function CarSelectorMenu(main){
    "use strict";
    var that = this;
    that.main = main;

    that.create = function(){
        that.car_selector_menu = new ButtonContainer(that);
        that.select_car1 = new SomeButton(that);
        that.select_car2 = new SomeButton(that);
        that.car_selector_menu.add(that.select_car1);
        that.car_selector_menu.add(that.select_car2);

        that.select_car1.create(false, 'car', game.world.centerY - 75, that.select_car1_callback);
        that.select_car2.create(false, 'car_blue', game.world.centerY + 75, that.select_car2_callback);
        that.car_selector_menu.hide();

    }

    that.select_car1_callback = function(){
        that.selected_car = 'dark_car';
        that.main.button_click();
    }

    that.select_car2_callback = function(){
        that.selected_car = 'blue_car';
        that.main.button_click();
    }

    that.hide = function(){
        that.car_selector_menu.hide();
    }

    that.show = function(){
        that.car_selector_menu.show();
    }
}