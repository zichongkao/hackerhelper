$(function() {

    var page = 1,
        pages = $('.page');

    $('.search__example a').on({
        click: function(e) {
            e.preventDefault();
            e.stopPropagation();

            $(this).parents('form').find('#search').val($(this).html()).focus();
        }
    });

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
		var payload = {
			name: domain
		};
		console.log(payload);
		
		$.ajax({
			url: "/domain",
			type: "POST",
			contentType: "application/json",
			processData: false,
			data: JSON.stringify(payload),
			complete: function (data) {
				$('#output').html(data.responseText);
			}
		});
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
		var payload = {
			platform: platformName,
			servername: formData.serverName,
			email: formData.email,
			password: formData.password
		};
		console.log(payload);
		
		$.ajax({
			url: "/platform",
			type: "POST",
			contentType: "application/json",
			processData: false,
			data: JSON.stringify(payload),
			complete: function (data) {
				$('#output').html(data.responseText);
			}
		});
    })

    $('.technologies__toggle').on({
        click: function() {
            $(this).toggleClass('technologies__toggle_state_active');
        }
    });

    //Step3 event firing
    $('.technologies__submit').on({
        click: function() {
            var parent = $(this).parent(),
                selectedTechnologies = parent.find('ul span.technologies__toggle_state_active'),
                techs = [];

            selectedTechnologies.each(function() {
                techs.push($(this).html().replace(" ", "").toLowerCase());
            })

            $(this).trigger('technologiesSelected', [techs]);

            return false;
        }
    });

    //Step3 data will go here
    $('.technologies__submit').on('technologiesSelected', function(e, technologies) {
		var payload = {
			tech: technologies,
		};
		console.log(payload);
		
		$.ajax({
			url: "/tech",
			type: "POST",
			contentType: "application/json",
			processData: false,
			data: JSON.stringify(payload),
			complete: function (data) {
				$('#output').html(data.responseText);
			}
		});
    })
});