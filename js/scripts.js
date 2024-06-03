$(document).ready(function () {
    // random movement la nori
    const cloudInterval = $('.mobile-cloud').length > 0 ? 15000 : 30000;
    $('.clouds').each(function () {
        let posX = $(this).offset().left / 10;

        let randX = Math.round(Math.random() * 10);

        let randY = $(this).hasClass('mobile-cloud') ? 8 : Math.round(Math.random() * 10);

        if (Math.abs(randX - posX) <= 3) {
            randX = randX > posX ? randX + 3 : randX - 3;
        }
        $(this).css('top', `${randY}0%`);

        $(this).css('left', `${randX}0%`);
    });

    // repetir
    setTimeout(moveClouds, 500);
    setInterval(moveClouds, cloudInterval);

    // intersection observer la header, pentru meniu
    const header = document.querySelector('header');

    const nav = $('.thin-header');

    const headerObserver = new IntersectionObserver(
        function (entries) {
            const [entry] = entries;
            if (!entry.isIntersecting) {
                nav.addClass('visible');
            } else {
                nav.removeClass('visible');
            }
        },
        {
            root: null,
            threshold: 0,
            rootMargin: `-50px`,
        }
    );

    headerObserver.observe(header);

    // MOBIL: deschiderea meniului din buton
    $('#menuButton').click(function () {
        $(this).toggleClass('open');

        $(this)[0].src = $(this).hasClass('open') ? '../img/mobile_menu_close.png' : '../img/mobile_menu_open.png';

        $('#menu').toggleClass('open');
    });
});

function moveClouds() {
    $('.clouds').each(function () {
        $(this).addClass('moving');

        let randX = Math.round(Math.random() * 10);

        $(this).css('left', `${randX}0%`);
    });
}

// trimite formularul
function sendForm() {
    $('#sendButton').toggleClass('sending');
}
