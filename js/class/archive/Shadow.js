function Shadow(){
    var that = this;

    that.log = [];
    that.car = false;

    that.init = function(log){
        that.log = log;
        that.log.sort(function(a,b){return a-b;})

        if(that.car === false){
            that.car = game.add.sprite(50, game.world.centerY * 1.3, 'car');
            that.car.body.collideWorldBounds = true;
            that.car.body.bounce.y = 0.001;
            that.car.scale.y = 0.7;
            that.car.scale.x = 0.7;
            that.car.animations.add('drive', [0,1],
                10,
                true);
            that.car.animations.play('drive', 10, true);            
        }
    }

    that.play = function(){
        for (var i = that.log.length - 1; i >= 0; i--) {
            var time = that.log[i] * 10;
            var id = setTimeout(function(){
                console.log('j!');
                that.car_jump();
            }, time);
            console.log(id, that.log[i], time)
        };
        that.log = [];
    }

    that.car_jump = function(){
        console.log('j!');
        that.car.body.velocity.y = -220;
    }

    that.car_update = function(){
        if(that.car.body.velocity.y < -1){
            that.car.angle = that.car.body.velocity.y / 20;
        } else {
            that.car.angle = 0;
        }

    }

    that.destroy = function(){
        that.car.destroy();
    }
}