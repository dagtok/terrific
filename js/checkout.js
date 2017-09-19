var $step1 = '.container-step-1';
var $step2 = '.container-step-2';
var $step3 = '.container-step-3';
var $checkAddress = '.check-address';
var $checkShipping = '.check-shipping';
var $editAddress = '.edit-address';
var $editShipping = '.edit-shipping';
var $titlePayment = '.title-payment';
var $titleShipping = '.title-shipping';
var $greyColor = 'add-color-grey';
$(document).ready(function() {
    $("input[type=radio]").click(function() {
        var isChecked = $("#other-address").is(':checked');
        (isChecked) ? $('.billing-address').show(): $('.billing-address').hide();
    });
    $(window).resize(function() {
        if ($(window).width() > 768) {
            $('.container-basket').show();
        }
    });
});
function closeStepOne() {
    $($step1).hide();
    $($checkAddress).show();
    $($editAddress).show();
    $($step2).show();
    $($titleShipping).removeClass($greyColor);
}
function editStepOne() {
    $($step1).show();
    $($step2).hide();
    $($step3).hide();
    $($checkAddress).hide();
    $($checkShipping).hide();
    $($editAddress).hide();
    $($editShipping).hide();
    $($titleShipping).addClass($greyColor);
    $($titlePayment).addClass($greyColor);
    checkWidth();
}
function closeStepTwo() {
    $($step2).hide();
    $($checkShipping).show();
    $($editShipping).show();
    $($step3).show();
    $($titlePayment).removeClass($greyColor);
    $('.container-basket').show();
}
function editStepTwo() {
    $($step1).hide();
    $($step2).show();
    $($step3).hide();
    $($checkShipping).hide();
    $($editShipping).hide();
    $('.title-address').addClass($greyColor);
    $($titlePayment).addClass($greyColor);
    checkWidth();
}
function checkWidth() {
    var getWidth = $(window).width();
    (getWidth < 768) ? $('.container-basket').hide(): $('.container-basket').show();
}