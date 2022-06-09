window.onload = function() {
    var banner = document.querySelector(".banner");
    var banimgs = banner.querySelectorAll("img");
    var index = 0;
    console.log(banimgs);
    t = setInterval(function() {
        if (index == banimgs.length - 1) {
            index = 0;
        } else {
            index++;
        }
        for (var i = 0; i < banimgs.length; i++) {
            banimgs[i].className = '';
        }
        banimgs[index].className = 'show';
    }, 2000)
    banner.onmouseenter = function() {
        clearInterval(t);
    }
    banner.onmouseout = function() {
        t = setInterval(function() {
            if (index == banimgs.length - 1) {
                index = 0;
            } else {
                index++;
            }
            for (var i = 0; i < banimgs.length; i++) {
                banimgs[i].className = '';
            }
            banimgs[index].className = 'show';
        }, 2000)
    }
}