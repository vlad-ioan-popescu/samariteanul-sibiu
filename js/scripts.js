$(document).ready(function () {
    // random movement la nori
    $('.clouds').each(function () {
        let randX = Math.round(Math.random() * 10);

        let randY = Math.round(Math.random() * 10);

        $(this).css('top', `${randY}0%`);

        $(this).css('left', `${randX}0%`);
    });
    setTimeout(moveClouds, 500);

    setInterval(moveClouds, 30000);

    // intersection observer la header
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
            // rootMargin: `-50px`,
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
