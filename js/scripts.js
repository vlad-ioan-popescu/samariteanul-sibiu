$(document).ready(function () {
    // random movement la nori
    $('.clouds').each(function () {
        let posX = $(this).offset().left / 10;
        console.log(posX);
        let randX = Math.round(Math.random() * 10);

        let randY = Math.round(Math.random() * 10);

        if (Math.abs(randX - posX) <= 3) {
            randX = randX > posX ? randX + 3 : randX - 3;
        }

        $(this).css('top', `${randY}0%`);

        $(this).css('left', `${randX}0%`);
    });

    // repetir
    setTimeout(moveClouds, 500);
    setInterval(moveClouds, 30000);

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
