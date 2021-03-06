(function(window, document, undefined) {
 
var $;
var AD_INTERVAL_IN_MINUTES = 1;
var player,
    random = Math.random,
    floor = Math.floor,
    timerId;

// thanks to http://www.youtube.com/user/prcouncil
var stealACar = "KOJeXBzWmZw";

var excellentTrailers = [
    "qvfU5gzAmHg", // Titanic: The Legend Goes On... (2000)
    "bEOxyoJcNtM", // Superbabies: Baby Geniuses 2 (2004)
    "9XVPOjXmCQ0", // Ben & Arthur (2002)
    "qzYuHX4jp9A", // Pledge This! (2006)
    "mAzHtgXEN5I", // Zombie Nation (2004)
    "f4SNoskjS-8", // The Hillz (2004)
    "1LO7xSZKPIU", // Yes Sir (2007)
    "bLjbm_nO3HY", // Who's Your Caddy? (2007)
    "3U53_EWZtnA", // Zodiac Killer (2005)
    "AN_5fyHXy8Y"  // Crossover (2006)
];

function init() {
    $.getJSON("http://88.80.20.28/ip?callback=?", checkIp);
}

function checkIp(data) {
    $.getJSON("http://88.80.20.28/ip/" + data.ip + "?callback=?", function(response) {
        if (/#iamabastard/.test(location.href) || response.bastard) { // check data.ip against array of freedom haters ip:s
            initLightbox();
            $('#hwdr_overlay').fadeIn("slow", function(){
                $('#hwdr_lightbox').show();
                censor();
                showVideo(stealACar);
                startPoll();
            }).click(function() {
                removeLightbox();
            });
        }
    });
}

function censor() {
    var elems = $("p, span, img").filter(function() {
        return random() > 0.5;
    });
        
    elems.css({
        backgroundColor: '#000',
        color: '#f00'
    });

    elems.filter("img")
        .replaceWith('<h1 style="background-color:#000;color:#f00;"><blink>CENSORED</blink></h1>');
    elems.filter(":not(img)")
        .html('<h1 style="background-color:#000;color:#f00;"><blink>CENSORED</blink></h1>');

    $("a").filter(function() {
        return random() > 0.5;
    }).click(function(e) {
        e.preventDefault();
        alert('THIS LINK IS ILLEGAL');
    }).css({
        color: '#f00',
        textDecoration: 'line-through'
    }).attr('href', '#');
}

function startPoll() {
    timerId = setInterval(function() {
        if($('#hwdr_overlay').length == 0) {
            initLightbox();

            $('#hwdr_overlay').fadeIn("slow", function(){
                $('#hwdr_lightbox').show();
            }).click(function() {
                removeLightbox();
            });
        }

        showVideo(excellentTrailers[Math.floor(Math.random() * excellentTrailers.length)]);
    }, AD_INTERVAL_IN_MINUTES * 60000);
}

function initLightbox() {
    $('body')
        .append('<div id="hwdr_overlay"></div>')
        .append('<div id="hwdr_lightbox"><div id="hwdr_player"></div></div>');

    var ho = $('#hwdr_overlay').css({
        position: 'fixed',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: '100%',
        height: '100%',
        zIndex: '999'
    }).hide();

    var lb = $('#hwdr_lightbox').css({
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginLeft: '-400px',
        marginTop: '-300px',
        zIndex: '1000',
        width: '800px',
        height: '600px',
        textAlign: 'center'
    }).hide();
}

function removeLightbox() {
    var ho = $('#hwdr_overlay');
    var lb = $('#hwdr_lightbox');

    lb.fadeOut("slow", function(){
        ho.fadeOut("slow", function(){
            $('#hwdr_lightbox, #hwdr_overlay').remove();
        });
    });
}

function showVideo(videoId) {
    var params = { allowScriptAccess: "always", autoplay: "1"};
    var atts = { id: "hwdr_player" };

    swfobject.embedSWF("http://www.youtube.com/v/" + videoId + "?enablejsapi=1&playerapiid=hwdr_player&version=3&autoplay=1&controls=0&disablekb=1", "hwdr_player", "800", "600", "8", null, null, params, atts);
}

(function() {
    var head = document.getElementsByTagName('head')[0];

    if (typeof(swfobject) == "undefined") {
        var swfobj = document.createElement("script");
        swfobj.src = "//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js";

        head.appendChild(swfobj);
    }

    function loadScript(src, callback) {
        var script = document.createElement('script');
        script.onreadystatechange = function () {
            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                callback();
            }
        }

        script.onload = callback;
        script.src = src;
        head.appendChild(script);
    }

    function isjQueryLoaded() {
        return (typeof jQuery !== 'undefined');
    }

    function tryLoadChain() {
        var chain = arguments;
        if (!isjQueryLoaded()) {
            if (chain.length) {
                loadScript(
                    chain[0],
                    function() {
                        tryLoadChain.apply(this, Array.prototype.slice.call(chain, 1));
                    }
                );
            } else {
            }
        } else {
            $ = jQuery.noConflict(true);
            $(init);
        }
    }

    tryLoadChain('https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');

})()
})(window, document);
