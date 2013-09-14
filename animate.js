(function ($) {
    $.fn.animateSprites = function (options) {

        return this.each(function () {

            var settings = $.extend({
                interval: 200,
                tiles: 1        //number of tiles.
            }, options);

            var $this = $(this);        //$this is the canvas object;
            var ctx = this.getContext("2d");
            var $img = $(options.source);
            if (!$img.is('img')) return;  //source is not an image;
            var img = $img[0];
            var tcount = 1;
            var width = options.width;
            var height = options.height;

            var sprite = function () {
                setTimeout(function () {
                    if (tcount > options.tiles) return;
                    ctx.clearRect(0, 0, width, height);
                    var corx = Math.floor(tcount / 4);
                    var cory = tcount % 4;
                    draw(corx, cory, width, height);
                    //console.log(tcount, corx, cory);
                    tcount++;
                    sprite();
                }, settings.interval);      //draw image on canvas to form animation every interval(ms);
            }

            function draw(corx, cory, width, height) {
                ctx.drawImage(img, corx * width, cory * height, width, height, 0, 0, width, height);
            }

            sprite();
        });
    }
})(jQuery);

