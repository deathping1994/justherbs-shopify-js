setTimeout(function () {
    var cartInterval = setInterval(function () {
        if ($('.couponsection').length > 0 && $('.couponsection_2').length == 0 ) {
            $('.couponsection').after(`<div class="couponsection_2 style="margin-bottom: 10px;max-width: 300px;display: flex;margin: auto;position: relative;"">
                                            <input type="text" class="couponsdiscbox" name="couponsdiscboxtext" placeholder="Enter coupon code" value="">
                                            <button type="button" class="couponsdiscbtn"> Apply </button>
                                       </div>`)
//             $('.couponsection').css({ "display": "none" })
            var token = ""
            $.getJSON('/cart.js', function (cart) {
                token = cart.token
            });
            $(".couponsection_2 .couponsdiscbtn").on("click touchstart", function (event) {
                event.preventDefault();

                var basecode = $(".couponsection_2 .couponsdiscbox")[0].value;
                $.ajax({
                    type: "POST",
                    url: "https://justherbs-api.farziengineer.co/discount",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: `{"code":"${basecode}", "cartId":"${token}"}`,
                }).then((response) => {
                    if (response == "true" || response == "True") {
                        $(".couponsection .couponsdiscbox")[0].value = basecode;
                        $(".couponsection .couponsdiscbtn").click();
                        setTimeout(function () {
                            var couponlog_postrequest = {
                                url: "https://justherbs-api.farziengineer.co/couponlog",
                                method: "POST",
                                timeout: 0,
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            };
                            var v = setInterval(function () {
                                if ($(".tdf_notify").length != 0 && $(".tdf_notify").css("display") != "none") {
                                    couponlog_postrequest.data = JSON.stringify({
                                        coupon: basecode,
                                        log: $(".tdf_notify div").text(),
                                    });
                                    $.ajax(couponlog_postrequest).done(function (response) {
                                        console.log(response);
                                    });
                                    clearInterval(v);
                                }
                                else if ($("#tdf_discount_box .tdf_discounted_dcode").length.length != 0) {
                                    couponlog_postrequest.data = JSON.stringify({
                                        coupon: basecode,
                                        log: $("#tdf_discount_box .tdf_discounted_dcode .tdf_coupon_mess").text(),
                                    });
                                    $.ajax(couponlog_postrequest).done(function (response) {
                                        console.log(response);
                                    });
                                    clearInterval(v);
                                }
                            }, 500);
                        }, 2000);

                    }
                }).fail(() => {
                    $("#tdf_discount_box .tdf_input_discount")[0].value = basecode;
                    $("#tdf_discount_box .tdf_normal_btn").click();
                    setTimeout(function () {
                        var couponlog_postrequest = {
                            url: "https://justherbs-api.farziengineer.co/couponlog",
                            method: "POST",
                            timeout: 0,
                            headers: {
                                "Content-Type": "application/json",
                            },
                        };
                        var v = setInterval(function () {
                            if ($(".tdf_notify").length != 0 && $(".tdf_notify").css("display") != "none") {
                                couponlog_postrequest.data = JSON.stringify({
                                    coupon: basecode,
                                    log: $(".tdf_notify div").text(),
                                });
                                $.ajax(couponlog_postrequest).done(function (response) {
                                    console.log(response);
                                });
                                clearInterval(v);
                            }
                            else if ($("#tdf_discount_box .tdf_discounted_dcode").length.length != 0) {
                                couponlog_postrequest.data = JSON.stringify({
                                    coupon: basecode,
                                    log: $("#tdf_discount_box .tdf_discounted_dcode .tdf_coupon_mess").text(),
                                });
                                $.ajax(couponlog_postrequest).done(function (response) {
                                    console.log(response);
                                });
                                clearInterval(v);
                            }
                        }, 500);
                    }, 2000);
                });
            });

            var interval = setInterval(() => {
                if ($("#tdf_discount_box .tdf_input_form").length != 0 && $("#tdf_discount_box .tdf_discounted_dcode").length == 0) {
                    $("#tdf_discount_box_2").show()
                    $("#tdf_discount_box").hide()
                }
                if ($("#tdf_discount_box .tdf_discounted_dcode").length != 0) {
                    $("#tdf_discount_box").show()
                    $("#tdf_discount_box_2").hide()
                }
            }, 200);
        }
    }, 1000);
}, 5000);
