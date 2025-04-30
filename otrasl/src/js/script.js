$(function () {
    $('input[name="antibot"]').attr('value','js-valid-form');
    $(document).on('change', 'input[type=file]', function (event) {
        var file = $(this);
        if (file.val() != '') {
            var label = file.next('label');
            label.attr('title', file.val());
            label.find('.name').css('text-transform', 'none').text(file.val());
        }
    });

    $('#orderModal, #orderModal-bitrix-seo').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var recipient = button.data('whatever');
        var modal = $(this);
        if (typeof recipient !== 'undefined') {
            modal.find('#name-order').text(recipient);
            modal.find('[name=title]').val('Р—Р°РєР°Р· ' + recipient);
        }
    });

    $('form.ajax').on('submit', '', function (event) {
        var form = $(this);
        event.preventDefault();
		//console.log(form.prev('.modal-title.modal-zakaz').html());
        $.ajax({
            url: form.data('validate') + "?isAjax=Y",
            type: 'post',
            dataType: 'json',
            data: form.serialize(),
            beforeSend: function () {
                form.find('.btn').addClass('loading').attr('disabled', true);
            },
            error: function () {
                alert("Р’РѕР·РЅРёРєР»Р° РѕС€РёР±РєР° СЃРµСЂРІРµСЂР°, РїРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕР·Р¶Рµ");
            },
            success: function (res) {
                form.find('.alert').removeClass('alert');
                if (typeof res === 'string') {
                    res = JSON.parse(res);
                }
				console.log(res);
				if($('.modal-title.modal-zakaz').length > 0){
					form.find('[name=form_text_158]').val($('.modal-title.modal-zakaz').html());
				}
                if (res['VALIDATE'] == 'Y') {
                    form.trigger('form.ajax.beforeSubmit');
                    if (form.find('[type=file]').length > 0 && !(form.find('[type=file]').val() == '' || typeof form.find('[type=file]').val() === 'undefined')) {
                        form.addClass('success');
                        form.off('submit').submit();
                    } else {
                        $.ajax({
                            url: form.attr('action') + "?isAjax=Y",
                            type: 'post',
                            dataType: 'json',
                            data: form.serialize(),
                            error: function () {
                                alert("Р’РѕР·РЅРёРєР»Р° РѕС€РёР±РєР° СЃРµСЂРІРµСЂР°, РїРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕР·Р¶Рµ");
                            },
                            success: function (res) {
								console.log(form.parents('.modal-inputs'));
                                if (form.parents('.modal-dialog').length > 0) {
                                    form.parents('.modal-dialog').addClass('success');
                                } else {
                                    form.addClass('success');
                                }
								if (form.children('.modal-inputs').length > 0) {
									if(form.prev('.modal-title.modal-zakaz').html() == 'Р РµРіРёСЃС‚СЂР°С†РёСЏ Р±РµСЃРїР»Р°С‚РЅРѕР№ РІРµСЂСЃРёРё Р‘РёС‚СЂРёРєСЃ24'){
										window.location.href = 'https://www.bitrix24.ru/create.php?p=146876';
									}else{
										form.children('.modal-inputs').html('<div class="note">РќР°С€ РјРµРЅРµРґР¶РµСЂ РїРѕ РїСЂРѕРґР°Р¶Р°Рј СЃРІСЏР¶РµС‚СЃСЏ СЃ РІР°РјРё РІ Р±Р»РёР¶Р°Р№С€РµРµ РІСЂРµРјСЏ</div>');
										form.children('.button-big.button-orange').hide();
										form.children('label.b24-form-control-container').hide();
									}
								}
								if (form.children('.modal-inputs2').length > 0) {
										form.children('.modal-inputs2').html('<div class="note">РќР°С€ РјРµРЅРµРґР¶РµСЂ РїРѕ РїСЂРѕРґР°Р¶Р°Рј СЃРІСЏР¶РµС‚СЃСЏ СЃ РІР°РјРё РІ Р±Р»РёР¶Р°Р№С€РµРµ РІСЂРµРјСЏ</div>');
								}
                            }
                        });
                    }
                    form.find('.btn').text(form.find('.success-message').text());

                } else {
                    form.find('.btn').removeClass('loading').attr('disabled', false);
                    $.each(res['ERRORS'], function (index, value) {
                        form.find('[data-sid=' + value + ']').addClass('alert');
                    });
                    var firstAlert = form.find('.alert:first');
                    if (firstAlert.is('input') || firstAlert.is('textarea')) {
                        firstAlert.focus();
                    } else {
                        firstAlert.find('input').focus();
                    }

                }
            }
        });
    });
    $('form.ajax-submit').on('submit', '', function (event) {
        var form = $(this),
            bValid = true;
        event.preventDefault();
        var empty = form.find('.req');
        if (empty.length > 0) {
            $.each(empty, function () {
                if (typeof $(this).val() === 'undefined' || $(this).val() == '') {
                    if (bValid) {
                        $(this).focus();
                    }
                    $(this).addClass('alert');
                    bValid = false;
                }
            });
        }
        if (bValid) {
            $.ajax({
                url: form.attr('action') + "?isAjax=Y",
                type: 'post',
                dataType: 'html',
                data: form.serialize(),
                beforeSend: function () {
                    form.find('.btn').addClass('loading').attr('disabled', true);
                },
                error: function () {
                    alert("Р’РѕР·РЅРёРєР»Р° РѕС€РёР±РєР° СЃРµСЂРІРµСЂР°, РїРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕР·Р¶Рµ");
                },
                success: function (res) {
                    form.addClass('success');
                    form.find('.alert').removeClass('alert');

                    if ($('.success-message').length > 0) {
                        form.find('.btn').text($('.success-message').text());
                    }
                }
            });
        }
    });


    $('.view-more .btn-primary').on('click', function (e) {
        e.preventDefault();
        var $form = $('.view-more');
        var $url = $form.attr('action');
        $.ajax({
            type: "POST",
            url: $url,
            data: $form.serialize(),
            dataType: "html",
            success: function (data) {
                $('.PAGEN_1').val(parseInt($('.PAGEN_1').val()) + 1);
                $('.list-news .row').append(data);
            }
        });
        return false;
    });


    $('.phone-mask').mask('+7 (999) 999-99-99');
    $(".input-tel").mask("+ 7 (999) 999-99-99");

    $(".demo_modal").click(function () {
        var edition = $(this).data('edition');
        $("#orderModal-b24-download iframe").attr("src", "https://it-in.ru/ajax/demo.php?type=demo&edition=" + edition);
    });


});
$(document).ready(function(){
    $('.arrow-link.subscr').click(function(){
        $.getJSON('/ajax/subscr.php', {
            email:$('input[name="subscr"]').val()
        }, function(data){
            if (data.status=='ok'){
                alert('РќР° РІР°С€ РїРѕС‡С‚РѕРІС‹Р№ Р°РґСЂРµСЃ РѕС‚РїСЂР°РІР»РµРЅРѕ РїРёСЃСЊРјРѕ СЃ РїРѕРґС‚РІРµСЂР¶РґРµРЅРёРµРј РїРѕРґРїРёСЃРєРё.');
            } else {
                alert(data.msg);
            }
        });
    });
});
$('.prof .tabs-item--js').on('click', function() {
	var actionp = $(this).attr('data-pr');
	$('.tariff-price.prof.priceotr3').html($(this).attr('data-price'));
	if(actionp == 'stan'){
		$('.button-add.otr.dop[data-vid=3]').addClass('active');
		$('img.icon.dop[data-vid=3]').removeClass('active');
		$('.button-add.otr[data-vid=3]').removeClass('button-add-active');
		$('.button.button-orange.prof').attr('data-vid','3');
	}
	if(actionp == 'rash'){
		$('.button-add.otr.dop[data-vid=3]').removeClass('active');
		$('img.icon.dop[data-vid=3]').addClass('active');
		$('.button-add.otr[data-vid=3]').removeClass('button-add-active');
		$('.button.button-orange.prof').attr('data-vid','4');
	}
});
$('.enter .tabs-item--js').on('click', function() {
	var actionp = $(this).attr('data-pr');
	$('.tariff-price.enter.priceotr4').html($(this).attr('data-price'));
	if(actionp == 'stan'){
		$('.button-add.otr.dop[data-vid=4]').addClass('active');
		$('img.icon.dop[data-vid=4]').removeClass('active');
		$('.button-add.otr[data-vid=4]').removeClass('button-add-active');
		$('.button.button-orange.enter').attr('data-vid','5');
	}
	if(actionp == 'rash'){
		$('.button-add.otr.dop[data-vid=4]').removeClass('active');
		$('img.icon.dop[data-vid=4]').addClass('active');
		$('.button-add.otr[data-vid=4]').removeClass('button-add-active');
		$('.button.button-orange.enter').attr('data-vid','6');
	}
});

$(document).ready(function(){
	$('.input.phone.form-control').mask('+7 (999) 999-99-99');
});
$('.button[data-target="#modal-order-otrasl"]').on('click', function (e) {
	var idt = $(this).attr('data-id');
	var vido = $(this).attr('data-vid');
	var zagol = $(this).attr('data-title');
	$('#modal-order-otrasl input[name=form_text_648]').val(zagol);
	//console.log(vido);
	if(vido > 0){
		$('.modal-inputs .input__wrap.vidotgruzki').show();
	}else{
		$('.modal-inputs .input__wrap.vidotgruzki').hide();
	}
	$('.form-group.id .dropdown option').attr('selected',false);
	$('.form-group.id .dropdown option[data-id="'+idt+'"]').attr('selected',true);
	$('.form-group.vid .dropdown option').attr('selected',false);
	$('.form-group.vid .dropdown option[data-vid="'+vido+'"]').attr('selected',true);
	if(vido == 3 || vido == 4 ){vido = 3;}
	if(vido == 5 || vido == 6 ){vido = 4;}
	//console.log(vido);
	$('input[name="form_text_661"]').val($('.tariff-price.priceotr'+vido).html());
});
	