

/**
* animateSprites is a jQuery plugin that a set of sprites drawn on a spritesheet.
*
* @name animateSprites
* @version 1.0.0
* @requires jQuery v1.7+
* @author 
* @license MIT License - http://www.opensource.org/licenses/mit-license.php
*
*/

; (function ($) {
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
                tcount = 0,
                width = options.width,
                height = options.height,
                nx = options.nx;

            if (!$img.is('img')) return;  //source is not an image;

            var fn = function (callback) {
                setTimeout(function () {
                    if (tcount >= options.tiles) return;
                    var corx = Math.floor(tcount / nx);
                    var cory = tcount % nx;
                    callback(corx, cory, width, height);
                    console.log(tcount, corx, cory);
                    tcount++;
                    fn(callback);
                }, settings.interval);      //draw image on canvas to form animation every interval(ms);
            }

            if (ctx) {

                var draw = function(corx, cory, width, height) {
                    ctx.clearRect(0, 0, width, height);
                    ctx.drawImage(img, corx * width, cory * height, width, height, 0, 0, width, height);
                }
            }

            else {      //fallback for browsers doesn't support canvas. changing background position.
                var src = $img.attr('src');
                $this.css('backgroundImage', 'url(' + src + ') ');
                var draw = function (corx, cory, width, height) {
                    var src = $img.attr('src');
                    $this.css('backgroundPosition', (-corx * width + 'px ' + -cory * height + 'px'));
                }
            }
            fn(draw);
        });
    }
})(jQuery);

