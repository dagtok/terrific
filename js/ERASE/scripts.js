var $menu = '.menu_burguer';
var $contentAll = '.container-all';
var $displayNone = 'add_display-none';
var $menuBurguer = '.menu_burguer__list li';

function openMenu() {
    $($menu).animate({
       top: 0
    }, 200);

    $($contentAll).addClass($displayNone);
}

function closeMenu() {
    $($menu).animate({
        top: '-100%'
    }, 200);

    $($contentAll).removeClass($displayNone);

    $('.ion-ios-close-empty').click (function() {
        $($menuBurguer).find('.submenu-mobile').removeClass('show_submenu-mobile');
        $($menuBurguer).find('a i').addClass('ion-android-add');
    })
}

(function($) {
    // What does the ccpTabs plugin do?
    $.fn.ccpTabs = function(options) {

        if (!this.length) {
            return this;
        }
        
        var tabs = {
            init: function($el) {
                tabs.main = $el;
                this._tabsSelect();
                this._tabsMenuMobile();
                this._tabsOuterClick(); 
                this._tabsResize(); 
                if ($el.find('form').length) {
                    this._tabsForm($el.find('form'));
                }
                
            },
            _tabsSelect: function() {
                this.main.find('.list-group a').on('click', function(e) {
                    e.preventDefault();
                    if (!$(this).hasClass('active')) {
                        $(this).parents(tabs.main).find('.ccpTabs a.active').removeClass('active');
                        $(this).addClass('active');
                        $(this).parents(tabs.main).find('.ccpTabs-content > div.active').removeClass('active');
                        $(this).parents(tabs.main).find('.ccpTabs-content #' + $(this).data('tab')).addClass('active')
                        tabs._tabsClassOpen(tabs.main.find('.ccpTabs'));
                        if (tabs.main.find('form').length) {
                            tabs._tabsFormReset();
                        }
                    }
                });
            },
            _tabsClassOpen: function(element) {
                if ($(element).hasClass('open')) {
                    $(element).removeClass('open')
                }
            },
            _tabsResize: function() {
                window.addEventListener('resize', function() {
                    if ($(window).width() <= 768) {
                        tabs._tabsClassOpen(tabs.main.find('.ccpTabs'));
                    }
                }, false)
            },
            _tabsOuterClick: function() {
                $('body, html').on('click', function(e) {
                    if ($(e.target).closest('.ccpTabs').length != 1) {
                        tabs._tabsClassOpen(tabs.main.find('.ccpTabs'));
                    }
                });
            },
            _tabsMenuMobile: function() {
                this.main.find('.ccpTabs-menu-collapsable').on('click', function() {
                    if ($(window).width() <= 768) {
                        if (!$(this).parent().hasClass('open')) {
                            $(this).parent().addClass('open');
                        } else {
                            $(this).parent().removeClass('open');
                        }
                    }
                });
            },
            _tabsForm: function() {
                for (var f = 0; f < tabs.main.find('form').length; f++) {
                    this._tabsFormSubmit( tabs.main.find('form').eq(f) );
                    for (var p = 0; p <= tabs.main.find('form').eq(f).find('input[data-required="true"]').length; p++) {
                        if (typeof tabs.main.find('form').eq(f).find('input')[p] !== 'undefined') {
                            this._tabsFormWrite(tabs.main.find('form').eq(f).find('input')[p]);
                            this._tabsFormEvent(tabs.main.find('form').eq(f), p);
                        }
                    }
                }
            },
            _tabsFormReset: function() {
                this.main.find('form input').val('');
                this.main.find('form textarea').val('');
                this.main.find('form input[type=checkbox]').attr('checked', false);
                this.main.find('form select').prop('selectedIndex', 0);
                this.main.find('form .error').removeClass('error');
            },
            _tabsFormSubmit: function(element) {
                $(element).on('submit', function(event) {
                    tabs._tabsFormValidate($(this), event);
                });
            },
            _tabsFormValidate: function(form, event) {
                for (var i = 0; i < form.find('input').length; i++) {
                    switch (form.find('input').eq(i).data('required')) {
                        case form.find('input').eq(i).val() === '' && form.find('input').eq(i).attr('type') == 'text' && typeof form.find('input').eq(i).data('type') === 'undefined':
                            form.find('input').eq(i).parents('.form-group').addClass('error');
                            event.preventDefault();
                            break;
                        case form.find('input').eq(i).val() === '' && (form.find('input').eq(i).attr('type') == 'number' || form.find('input').eq(i).attr('type') == 'tel' || form.find('input').eq(i).data('type') === 'number'):
                            if (form.find('input').eq(i).val().match(/[a-zA-Z]/)) {
                                form.find('input').eq(i).parents('.form-group').addClass('error not-number')
                            } else {
                                form.find('input').eq(i).parents('.form-group').addClass('error')
                            }
                            event.preventDefault();
                            break;
                        case form.find('input').eq(i).val() !== '' && (form.find('input').eq(i).attr('type') == 'number' || form.find('input').eq(i).attr('type') == 'tel') && isNaN(parseInt(form.find('input').eq(i).val())):
                            form.find('input').eq(i).parents('.form-group').addClass('error')
                            form.find('input').eq(i).val('Debe ser sÃ³lo nÃºmeros');
                            event.preventDefault();
                            break;
                        case form.find('input').eq(i).val() === '' && form.find('input').eq(i).attr('type') == 'email':
                            form.find('input').eq(i).parents('.form-group').addClass('error')
                            event.preventDefault();
                            break;
                        case form.find('input').eq(i).val() !== '' && form.find('input').eq(i).attr('type') == 'email':
                            if (!form.find('input').eq(i).val().match(/^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                                form.find('input').eq(i).parents('.form-group').addClass('error')
                                event.preventDefault();
                            }
                            break;
                    }
                }
                for (var j = 0; j < form.find('select').length; j++) {
                    if (form.find('select').eq(j).data('required') && form.find('select').eq(j).prop('selectedIndex') === 0) {
                        form.find('select').eq(j).parents('.form-group').addClass('error');
                        event.preventDefault();
                    }
                }
            },
            _tabsFormWrite: function(input) {
                $(input).on('input propertychange', function() {
                    tabs._tabsFormCampoValidate($(this));
                });
            },
            _tabsFormEvent: function(form, i) {
                $(form).find('input').eq(i).on('blur', function() {
                    tabs._tabsFormCampoValidate($(this));
                })
                $(form).find('select').eq(i).on('change', function() {
                    if ($(this).data('required') && $(this).prop('selectedIndex') === 0) {
                        $(this).parents('.form-group').addClass('error');
                    } else {
                        $(this).parents('.form-group').removeClass('error');
                    }
                })
            },
            _tabsFormCampoValidate: function(input) {
                if ($(input).data('required') && $(input).val() == '' && ($(input).attr('type') == 'text' || $(input).attr('type') == 'email') && typeof $(input).data('type') == 'undefined') {
                    $(input).parents('.form-group').addClass('error');
                } else if (($(input).data('required') && $(input).val() != '' && $(input).attr('type') == 'email')) {
                    if (!$(input).val().match(/^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                        $(input).parents('.form-group').addClass('error');
                    } else {
                        $(input).parents('.form-group').removeClass('error');
                    }
                } else if (($(input).data('required') && $(input).attr('type') == 'tel' || $(input).data('type') == 'number')) {
                    if ($(input).val() == '') {
                        $(input).parents('.form-group').addClass('error');
                    } else if ($(input).val() != '') {
                        if ($(input).val().match(/[a-zA-Z]/)) {
                            $(input).parents('.form-group').addClass('error not-number');
                        } else {
                            $(input).parents('.form-group').removeClass('error not-number');
                        }
                    } else {
                        $(input).parents('.form-group').removeClass('error');
                    }

                } else {
                    $(input).parents('.form-group').removeClass('error');
                }
            }

        };

        this.each(function() {
            $this = $(this);
            tabs.init($this);
        });

        return this;
    };

})(jQuery);

var idShopping = {
    main : $('#shopping'),
    init : function(){
        if(this.main.length){
            this.load();
            this.resize();
            this.code();
        }
    },
    load : function(){
        this.main.find('.checkout .drop > a').on('click', function(event){
            event.preventDefault();
            if($(window).width() <= 768 ){
                if(!$(this).parent().hasClass('active')){
                    $(this).parent().addClass('active');
                }else{
                    $(this).parent().removeClass('active');
                    if( $(this).parent().find('.dropping').hasClass('error') ){
                        $(this).parent().find('.dropping').removeClass('error') 
                    }
                }
            }
        });
    },
    resize : function(){
        window.addEventListener('resize', function(){
            if ( idShopping.main.find('.checkout .drop').hasClass('active') ){
                idShopping.main.find('.checkout .drop').removeClass('active') 
            }

            if( idShopping.main.find('.checkout #promoCode .dropping').hasClass('error') ){
                idShopping.main.find('.checkout #promoCode .dropping').removeClass('error')
            }
        },false);
    },
    code : function(){
        this.main.find('.checkout #promoCode').on('submit', function(e){
            e.preventDefault();
            if($(this).find('.code').val() == '' ){
               $(this).find('.dropping').addClass('error'); 
               return false;
            }else{
                $(this).find('.dropping').removeClass('error'); 
                return true;
            }
        })
    }
}

var idProducts = {
    carousel : $('.product-detail.style-1 .carousel'),
    description : $('.product-detail.style-1 .pd-desc'),
    size: $('.product-detail.style-1 .pd-desc .select-form'),
    form: $('.product-detail.style-1 #addCar'),
    tabs : $('.product-detail.style-1 .tabs'),
    mobileCarousel: $('.lista-productos'),
    init : function(){
        if(this.carousel.length){
            this.loadCarousel();
            this.loadLightbox();
            this.loadTabInfo();
            this.loadSelectSize();
            this.sliderSelect();
            this.mobileTabs();
            this.mobileTabsDrop();
            this.resize();
            this.outerClick();
            this.mobileCarouselProducts();
        }
    },
    loadCarousel: function(){
        this.carousel.find('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            draggable: true,
            asNavFor: '.slider-nav'
        });
        this.carousel.find('.slider-nav').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            centerMode: false,
            focusOnSelect: true,
            centerPadding: '500px'
        });
    },
    loadLightbox: function(){
        this.carousel.find('.slider-for').slickLightbox({
            background: 'rgba(242,242,242,.8)'
        });
    },
    loadTabInfo: function(){
        this.description.find('#tabs-description a').on('click', function(e){
            e.preventDefault();
            $(this).tab('show');
        });
    },
    loadSelectSize: function(){
        var select = { 
            list : this.size.find('.select-list li'),
            option: this.size.find('#select-size'),
            text: ''
        };
        select.text += '<option value="">' + 'Selecciona una opción' + '</option>';
        for(var i = 0; i < select.list.length; i++){
            select.text += '<option value="'+ $(select.list).eq(i).text() + '">' + $(select.list).eq(i).text() + '</option>';
        }
        select.option.append(select.text);        
        this.selectDrop();
        this.selectOption();
        this.addCar();
    },
    selectDrop: function(){
        this.size.find('.medida').on('click', function(e){
            e.preventDefault();
            if( !$(this).parents('.select-size').hasClass('drop') ){
                $(this).parents('.select-size').addClass('drop');
                idProducts.removeError($(this).parents('.select-size'));
            }else{
                $(this).parents('.select-size').removeClass('drop');
            }
        });
    },
    selectOption: function(){
        var select = { 
            list : this.size.find('.select-list li'),
            option: this.size.find('#select-size'),
            text : this.size.find('.select-size .size')
        };

        select.list.find('> a').on('click', function(e){
            e.preventDefault();
            select.option.find('option:selected').removeAttr('selected');
            select.option.find('option').eq( $(this).parent().index() ).attr({ selected: 'selected'});
            select.text.html( $(this).parent().text() );
            select.list.removeAttr('class');
            $(this).parent().addClass('selected');
            $(this).parents('.select-size').removeClass('drop');
        });
    },
    addCar: function(){
        var selection = {
            txt : this.size.find('.select-size .size'),
            size : this.size.find('.select-size'),
        }
        this.form.on('submit', function(){
            if( selection.txt.text().toUpperCase() === 'SELECCIONA UNA MEDIDA'){
                if( $(this).find('.select-size').hasClass('drop') ){
                    $(this).find('.select-size').removeClass('drop');
                    selection.size.addClass('error');
                }else{
                    selection.size.addClass('error');
                }
                return false;
            }else{
                selection.size.removeClass('error');
                return true;
            }
        });
    },
    removeError: function(element){
        if( $(element).hasClass('error') ){
            $(element).removeClass('error')
        }
    },
    sliderSelect: function(){
        this.carousel.find('.slick-slide > a').on('click', function(e){
            e.preventDefault();
        });
    },
    resize: function(){
        window.addEventListener('resize', function(){
            if($(window).width() <= 768  ){
                if( !idProducts.tabs.hasClass('colapsable') ){
                    idProducts.tabs.addClass('colapsable');
                    idProducts.tabs.find('.nav-tabs > li > a').removeClass('active');
                }
            }else{
                idProducts.tabs.removeClass('colapsable');
                idProducts.tabs.find('.nav-tabs > li > a').removeClass('active');
            }

            if( idProducts.size.find('.select-size').hasClass('error') ){
                idProducts.removeError(idProducts.size.find('.select-size'));
            }

        }, false);
    },
    mobileTabs: function(){
        if($(window).width() <= 768 ){
            idProducts.mobileTabsColapsable();
        }
    },
    mobileTabsColapsable: function(){
        if( !idProducts.tabs.hasClass('colapsable') ){
            idProducts.tabs.addClass('colapsable');
        }else{
            idProducts.tabs.removeClass('colapsable dropping');
            idProducts.tabs.find('.nav-tabs > li > a').removeClass('active');
        }
    },
    mobileTabsDrop: function(){
        this.tabs.find('.nav-tabs > li > a').on('click', function(e){
            if($(window).width()  <= 768  ){
                e.preventDefault();
                if( idProducts.tabs.hasClass('colapsable') ){
                    idProducts.tabs.removeClass('colapsable').addClass('dropping');
                    $(this).addClass('active');
                }else if( !$(this).hasClass('active') ) {
                    idProducts.tabs.find('.nav-tabs > li > a').removeClass('active');
                    $(this).addClass('active');                    
                }else if( $(this).hasClass('active') ){
                    idProducts.tabs.addClass('colapsable').removeClass('dropping');
                    idProducts.tabs.find('.nav-tabs > li > a').removeClass('active');
                }
            }
       });
    },
    mobileCarouselProducts: function(){
        this.mobileCarousel.find('.carousel').slick({
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows: true,
            draggable: true,
            infinite: false,
            responsive:[
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                    }
                },{
                breakpoint: 480,
                settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }
            ]
        });
    },
    outerClick: function(){
        $(window).on('click touchstart', function(){
            if( idProducts.size.find('.select-size').hasClass('drop') ){
                idProducts.size.find('.select-size').removeClass('drop');
                
            }
            if( idProducts.size.find('.select-size').hasClass('error')){
                idProducts.removeError(idProducts.size.find('.select-size'));
            }
            if( !idProducts.tabs.hasClass('colapsable') ){
                if( $(window).width() <= 768 ){
                    idProducts.tabs.addClass('colapsable');
                    idProducts.tabs.find('.nav-tabs > li > a').removeClass('active');
                }
            }
        });
        this.size.find('.medida').on('click touchstart', function(e){
            e.stopPropagation();
        })
        this.tabs.find('.nav-tabs > li > a').on('click touchstart', function(e){
            e.stopPropagation();
        });
    }
}

var idCuenta = {
    main: $('#account-dashboard'),
    cuenta: $('#account-dashboard .dashboard'),
    form: $('#account-dashboard form'),
    init: function() {
        if (this.main.length) {
            this._tabsSelect();
            this._tabsMenuMobile();
            this._tabsResize();
            //this._tabsOuterClick();
            for (var f = 0; f < this.form.length; f++) {
                this._formSubmit(this.form[f]);
                for (var p = 0; p <= this.form.eq(f).find('input[data-required="true"]').length; p++) {
                    if (typeof this.form.eq(f).find('input')[p] !== 'undefined') {
                        this._formWrite(this.form.eq(f).find('input')[p]);
                        this._formEvent(this.form.eq(f), p);
                    }
                }
            }
        }
    },
    _tabsSelect: function() {
        this.main.find('.dashboard .list-group a').on('click', function(e) {
            e.preventDefault();
            if (!$(this).hasClass('active')) {
                $(this).parents('#account-dashboard').find('.dashboard a.active').removeClass('active');
                $(this).addClass('active');
                $(this).parents('#account-dashboard').find('.content > div.active').removeClass('active');
                $(this).parents('#account-dashboard').find('.content #' + $(this).data('tab')).addClass('active')
                idCuenta._tabsFormReset();
                idCuenta._tabsClassOpen(idCuenta.cuenta);
            }
        });
    },
    _tabsFormReset: function() {
        this.main.find('form input').val('');
        this.main.find('form textarea').val('');
        this.main.find('form input[type=checkbox]').attr('checked', false);
        this.main.find('form select').prop('selectedIndex', 0);
        this.main.find('form .error').removeClass('error');
    },
    _tabsMenuMobile: function() {
        this.cuenta.find('.menu-collapsable').on('click', function() {
            if ($(window).width() <= 768) {
                if (!$(this).parent().hasClass('open')) {
                    $(this).parent().addClass('open');
                } else {
                    $(this).parent().removeClass('open');
                }
            }
        });
    },
    _tabsResize: function() {
        window.addEventListener('resize', function() {
            if ($(window).width() <= 768) {
                idCuenta._tabsClassOpen(idCuenta.cuenta);
            }
        }, false)
    },
    _tabsClassOpen: function(element) {
        if ($(element).hasClass('open')) {
            $(element).removeClass('open')
        }
    },
    _tabsOuterClick: function() {
        $(window).on('click touchstart', function() {
            idCuenta._tabsClassOpen(idCuenta.cuenta);
        });
        this.cuenta.find('.menu-collapsable').on('click', function(e) {
            e.stopPropagation();
        });
    },
    _formSubmit: function(element) {
        $(element).on('submit', function(event) {
            idCuenta._formValidate($(this), event);
        });
    },
    _formValidate: function(form, event) {
        for (var i = 0; i < form.find('input').length; i++) {
            switch (form.find('input').eq(i).data('required')) {
                case form.find('input').eq(i).val() === '' && form.find('input').eq(i).attr('type') == 'text' && typeof form.find('input').eq(i).data('type') === 'undefined':
                    form.find('input').eq(i).parents('.form-group').addClass('error');
                    event.preventDefault();
                    break;
                case form.find('input').eq(i).val() === '' && (form.find('input').eq(i).attr('type') == 'number' || form.find('input').eq(i).attr('type') == 'tel' || form.find('input').eq(i).data('type') === 'number'):
                    if (form.find('input').eq(i).val().match(/[a-zA-Z]/)) {
                        form.find('input').eq(i).parents('.form-group').addClass('error not-number')
                    } else {
                        form.find('input').eq(i).parents('.form-group').addClass('error')
                    }
                    event.preventDefault();
                    break;
                case form.find('input').eq(i).val() !== '' && (form.find('input').eq(i).attr('type') == 'number' || form.find('input').eq(i).attr('type') == 'tel') && isNaN(parseInt(form.find('input').eq(i).val())):
                    form.find('input').eq(i).parents('.form-group').addClass('error')
                    form.find('input').eq(i).val('Debe ser sÃ³lo nÃºmeros');
                    event.preventDefault();
                    break;
                case form.find('input').eq(i).val() === '' && form.find('input').eq(i).attr('type') == 'email':
                    form.find('input').eq(i).parents('.form-group').addClass('error')
                    event.preventDefault();
                    break;
                case form.find('input').eq(i).val() !== '' && form.find('input').eq(i).attr('type') == 'email':
                    if (!form.find('input').eq(i).val().match(/^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                        form.find('input').eq(i).parents('.form-group').addClass('error')
                        event.preventDefault();
                    }
                    break;
            }
        }
        for (var j = 0; j < form.find('select').length; j++) {
            if (form.find('select').eq(j).data('required') && form.find('select').eq(j).prop('selectedIndex') === 0) {
                form.find('select').eq(j).parents('.form-group').addClass('error');
                event.preventDefault();
            }
        }
    },
    _formWrite: function(input) {
        $(input).on('input propertychange', function() {
            idCuenta._formCampoValidate($(this));
        });
    },
    _formEvent: function(form, i) {
        $(form).find('input').eq(i).on('blur', function() {
            idCuenta._formCampoValidate($(this));
        })
        $(form).find('select').eq(i).on('change', function() {
            if ($(this).data('required') && $(this).prop('selectedIndex') === 0) {
                $(this).parents('.form-group').addClass('error');
            } else {
                $(this).parents('.form-group').removeClass('error');
            }
        })
    },
    _formCampoValidate: function(input) {
        if ($(input).data('required') && $(input).val() == '' && ($(input).attr('type') == 'text' || $(input).attr('type') == 'email') && typeof $(input).data('type') == 'undefined') {
            $(input).parents('.form-group').addClass('error');
        } else if (($(input).data('required') && $(input).val() != '' && $(input).attr('type') == 'email')) {
            if (!$(input).val().match(/^[a-zA-Z0-9.!#$%&â€™*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                $(input).parents('.form-group').addClass('error');
            } else {
                $(input).parents('.form-group').removeClass('error');
            }
        } else if (($(input).data('required') && $(input).attr('type') == 'tel' || $(input).data('type') == 'number')) {
            if ($(input).val() == '') {
                $(input).parents('.form-group').addClass('error');
            } else if ($(input).val() != '') {
                if ($(input).val().match(/[a-zA-Z]/)) {
                    $(input).parents('.form-group').addClass('error not-number');
                } else {
                    $(input).parents('.form-group').removeClass('error not-number');
                }
            } else {
                $(input).parents('.form-group').removeClass('error');
            }
        } else {
            $(input).parents('.form-group').removeClass('error');
        }
    }
}

var idFaqs = {
    init: function(element){
        if($(element).length){
            idFaqs.main = $(element).find('.faqs-content');
            for(var i = 0; i < idFaqs.main.length; i++){
                idFaqs._faqsMain(idFaqs.main[i]);
                idFaqs._faqsSecondary(idFaqs.main[i]);
                idFaqs._faqsOuterClick(idFaqs.main[i]);
                idFaqs._faqsResize(idFaqs.main[i]);        
            }
        }
    },
    _faqsMain: function(el){
        $(el).find('.faqs-tabs ul > li > a').on('click', function(e){
            if( !$(e.target).closest('ul').hasClass('active') ){
                e.preventDefault();
                if(!$(this).hasClass('drop') ) {
                    $(this).parents('.faqs-tabs').find('.drop').removeClass('drop');
                    $(this).parents('.faqs-tabs').find('.active').removeClass('active');
                    $(this).addClass('drop');
                    $(this).siblings('ul').addClass('active');
                    if( $(this).parents('.faqs-tabs').find('.open') ){
                        $(this).parents('.faqs-tabs').find('.open').removeClass('open');
                    }
                }else{
                    $(this).removeClass('drop');
                    $(this).siblings('ul').removeClass('active');
                }
            }
        });
    },
    _faqsSecondary: function(el){
       $(el).find('.faqs-tabs > ul > li .faqs-questions .faqs-item > a').on('click', function(e){
            e.preventDefault();
            if(!$(this).parent().hasClass('open')){
                $(el).find('.faqs-tabs > ul > li > .faqs-questions.active .faqs-item').removeClass('open');
                $(this).parent().addClass('open');
                if( $(window).width() <= 768){
                    idFaqs._faqsScroll($(this));
                }
            }else{
                $(this).parent().removeClass('open');
            }
        });
    },
    _faqsOuterClick: function(el){
        $('body, html').on('click touchstart', function(e){
            if( $(e.target).closest('ul.active').length != 1 ){
                if( $(el).find('.faqs-tabs > ul > li > .faqs-questions.active .faqs-item').hasClass('open') ){
                    $(el).find('.faqs-tabs > ul > li > .faqs-questions.active .faqs-item').removeClass('open');
                }
            }
        });
    },
    _faqsScroll: function(tab){
        var body = $('body, html');
        var tabOffset = $(tab).offset().top;
        var menuHeight = body.find('.navbar-fixed-top').outerHeight();
        var scrolling = tabOffset - menuHeight;
        body.stop().animate({scrollTop: scrolling }, '1000', 'swing');
    },
    _faqsResize:function(el){
        window.addEventListener('resize', function(){
            if($(window).width() <= 768){
                if( $(el).find('.faqs-tabs > ul > li > .faqs-questions.active .faqs-item').hasClass('open') ){
                    $(el).find('.faqs-tabs > ul > li > .faqs-questions.active .faqs-item').removeClass('open');
                }
            }
        },false);
    }
}


$(document).ready(function() {
    
    $($menuBurguer)
    .click( function(){
        $(this).find('.submenu-mobile')
        .toggleClass('show_submenu-mobile');
        $(this).find('a i').toggleClass('ion-android-add');
    })
    idShopping.init();
    idProducts.init();
    idCuenta.init();
    
    idFaqs.init($('#servicio-cliente'));
    $('#account-dashboard').ccpTabs();
    $('#servicio-cliente').ccpTabs();
});


