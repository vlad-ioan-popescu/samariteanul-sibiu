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

//  validari formular (erori)
$("[type='text'], textarea").on('blur', function () {
    if (this.value.length < 3 || ($(this).is('#email') && !validEmail(this.value))) {
        $(this).addClass('error');
    } else {
        $(this).removeClass('error');
    }
});
$('#bifa').on('click', function () {
    if (this.checked) {
        $(this).removeClass('error');
    } else {
        $(this).addClass('error');
    }
});
// validare si trimitere formular
function sendForm(button) {
    let errors = 0;
    let formData = new FormData();
    const mailType = $(button).is('#enrollButton') ? 'inscriere' : 'contact';
    formData.append('type', mailType);

    $("[type='text'], textarea").each(function () {
        if (this.value.length < 3 || ($(this).is('#email') && !validEmail(this.value))) {
            $(this).addClass('error');
            errors++;
        } else {
            $(this).removeClass('error');
            formData.append(this.name, this.value);
        }
    });

    if ($('#bifa').prop('checked') == false) {
        $('#bifa').addClass('error');
        errors++;
    } else {
        $('#bifa').removeClass('error');
    }
    if (errors == 0) {
        $(button).addClass('sending');
        fetch('/smtp/send_email.php', {
            body: formData,
            method: 'POST',
        })
            .then(res => res.text())
            .then(html => {
                if (html) {
                    $('#msg').addClass('ok').html(html);
                } else {
                    $('#msg').addClass('error').html(html);
                }
            })
            .finally(function () {
                $('#msg').show();
                setTimeout(() => {
                    $('#msg').hide();
                    $(button).addClass('disabled');
                    $(button).removeClass('sending');
                }, 3000);
            });
    }
}

// validare email
function validEmail(email) {
    const pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    return pattern.test(email);
}
