$(function() {

    var page = 1,
        pages = $('.page');

    function nextPage() {
        if (page <= pages.length) {
            pages.each(function () {
                $(this).removeClass('page-active');
                if ($(this).data('page') === page) {
                    $(this).addClass('page-active');
                }
            });
            page++;
        }
    };

    nextPage();

    $('form[name="domainSearch"]').on({
        submit: function (e) {
            e.preventDefault();
            e.stopPropagation();

            nextPage();
            //Here we triggering 'domain' event on form submit with value of the input
            $(this).trigger('domainSelected', [$(this).find('input').val()]);
        }
    })

    //Step1 data will go here
    $('form[name="domainSearch"]').on('domainSelected', function(e, domain) {
        console.log(domain);
    });

    //Toggling server forms
    $('.platforms__item').on({
        click: function() {
            $('.platforms__form').hide();
            $('.platforms__form.platforms__form_' + $(this).data('item')).show();
            $('.platforms__item').removeClass('platforms__item_state_active');
            $('.platforms__item.platforms__item_' + $(this).data('item')).addClass('platforms__item_state_active');
        }
    });

    $('form[data-form="amazon"], form[data-form="heroku"]').on({
        submit: function (e) {
            e.preventDefault();
            e.stopPropagation();

            var formData = [];

            nextPage();
            $(this).find('input').each(function() {
                formData[$(this).attr('name')] = $(this).val();
            })
            $(this).trigger('platformSelected', [$(this).data('form'), formData]);
        }
    })

    //Step2 data will go here
    $('form[data-form="amazon"], form[data-form="heroku"]').on('platformSelected', function(e, platformName, formData) {
        console.log(platformName);
        console.log(formData);
    })



});