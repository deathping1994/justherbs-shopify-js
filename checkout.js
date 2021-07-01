setTimeout(function () {

        $(".tdf_input_form").clone().insertAfter(".tdf_input_form")
        $(".tdf_input_discount:eq(0)").addClass("farzipromo_input_1")
        $(".tdf_normal_btn:eq(0)").addClass("farzipromo_button_1")
        $(".tdf_input_discount:eq(1)").addClass("farzipromo_input_2")
        $(".tdf_normal_btn:eq(1)").addClass("farzipromo_button_2")
        $(document).on(`load change`, '.farzipromo_input_2', function () {
            console.log("started")
            var token = ""
            $.getJSON('/cart.js', function (cart) {
                token = cart.token
            });

            $(".farzipromo_button_2").on("click touchstart", function (event) {
                event.preventDefault();
                var basecode = $(".farzipromo_input_2")[0].value;
                $.ajax({
                    type: "POST",
                    url: "https://farzipromo-api-stage.farziengineer.co/discount",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: `{"code":"${basecode}", "cartId":"${token}"}`,
                }).then((response) => {
                    console.log("found")
                    if (response == "true" || response == "True") {
                        $(".farzipromo_input_1")[0].value = basecode;
                        $(".farzipromo_button_1").click();
                        var interval = setInterval(() => {
                            console.log(interval)
                            if($(".dcode_remove_btn.length") > 0){
                                $(".farzipromo_button_2").on("click touchstart", function(){
                                    $(".tdf_input_form").clone().insertAfter(".tdf_input_form")
                                    $(".tdf_input_discount:eq(0)").addClass("farzipromo_input_1")
                                    $(".tdf_normal_btn:eq(0)").addClass("farzipromo_button_1")
                                    $(".tdf_input_discount:eq(1)").addClass("farzipromo_input_2")
                                    $(".tdf_normal_btn:eq(1)").addClass("farzipromo_button_2")
                                })
                                clearInterval(interval)
                            }

                        }, 500);
                    }
                }).fail(() => {
                    $(".farzipromo_input_1")[0].value = basecode;
                    $(".farzipromo_button_1").click();
                });
            });
        });

}, 5000);
