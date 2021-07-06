setTimeout(function () {
    var cartInterval = setInterval(function () {
        console.log("interval to check")
        if ($('#tdf_discount_box').length > 0 && $('#tdf_discount_box_2').length == 0) {
            console.log("entered interval")
            $('#tdf_discount_box').after(`<div id="tdf_discount_box_2" class="tdf_content_section_discounted tdf_container tdf_nonpopup">   <div class="tdf_input_form"><input type="text" class="tdf_input_discount" placeholder="Discount code"><button type="button" class="tdf_normal_btn" data-e="dcode_apply" tdfbinded="1">Apply</button></div> </div>`)
            $('#tdf_discount_box').css({ "display": "none" })
            $("#tdf_discount_box_2").css({ "text-align": "center", "margin-bottom": "10px" })
            $("#tdf_discount_box_2 .tdf_input_form").css({ "color": "#212b36" })
            $("#tdf_discount_box_2 .tdf_input_discount").css({
                "width": "130px",
                "border": "1px solid #d3d3db",
                "margin-right": "5px",
                "display": "inline-block",
                "padding": "11px 12px",
                "font-size": "14px",
                "height": "36px",
                "color": "#212b36",
                "letter-spacing": ".8px",
                "border-radius": "2px"
            })
            $("#tdf_discount_box_2 .tdf_normal_btn").css({
                "background-color": "#5ea44c",
                "border": "none",
                "width": "80px",
                "padding": "8px 13px",
                "color": "white",
                "line-height": "20px",
                "border-radius": "2px",
                "cursor": "pointer"
            })
            var token = ""
            $.getJSON('/cart.js', function (cart) {
                token = cart.token
            });
            console.log("started")
            $("#tdf_discount_box_2 .tdf_normal_btn").on("click touchstart", function (event) {
                event.preventDefault();

                var basecode = $("#tdf_discount_box_2 .tdf_input_discount")[0].value;
                $.ajax({
                    type: "POST",
                    url: "https://justherbs-api.farziengineer.co/discount",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: `{"code":"${basecode}", "cartId":"${token}"}`,
                }).then((response) => {
                    console.log("found")
                    if (response == "true" || response == "True") {
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
                    console.log("show")
                    $("#tdf_discount_box_2").show()
                    $("#tdf_discount_box").hide()
                }
                if ($("#tdf_discount_box .tdf_discounted_dcode").length != 0) {
                    console.log("hide")
                    $("#tdf_discount_box").show()
                    $("#tdf_discount_box_2").hide()
                }
            }, 200);
        }
    }, 1000);
}, 5000);
