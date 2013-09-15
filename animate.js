(function ($) {
    $.fn.animateSprites = function (options) {

        return this.each(function () {

            var settings = $.extend({
                interval: 200,
                tiles: 1,        //number of tiles.
                nx: 1
            }, options);

            var $this = $(this),        //$this is the canvas object;
                ctx = this.getContext("2d"),
                $img = $(options.source),
                img = $img[0],
                tcount = 1,
                width = options.width,
                height = options.height,
                nx = options.nx;

            if (!$img.is('img')) return;  //source is not an image;

            if (ctx) {
                var sprite = function () {
                    setTimeout(function () {
                        if (tcount > options.tiles) return;
                        ctx.clearRect(0, 0, width, height);
                        var corx = Math.floor(tcount / nx);
                        var cory = tcount % nx;
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
            }

            else {      //fallback for browsers doesn't support canvas.
                var src = $img.attr('src');
                $this.css('background', src + ' 0 0');

            }

        });
    }
})(jQuery);

