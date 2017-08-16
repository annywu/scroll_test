/* 
*作者：一些事情
*时间：2015-4-17
*购物车方法*需要结合jquery一起使用
----------------------------------------------------------*/
//商品数量加减一
function addCartNum(num) {
    var numObj = $("#buynum");
    var selectNum = 1;
    if (numObj.val().length > 0) {
        selectNum = parseInt(numObj.val());
    }
    var minValue = parseInt($("#buynum").attr("min"));
    var maxValue = parseInt($("#buynum").attr("max"));
    selectNum += num;
    //最小值
    if (selectNum < minValue) {
        selectNum = minValue;
    }
    //最大值
    if (selectNum > maxValue) {
        selectNum = maxValue;
    }
    numObj.val(selectNum);
}
//初始化商品规格事件
function initGoodsSpec(sendUrl) {
    var specId = "";
    //检查是否有规格
    if ($(".spec_part dl").length == 0) {
        //检查商品库存
        specId = "0";
    }else{
    $(".spec_part dd").removeClass("on");
    $(".spec_part dl").each(function () {
        $(this).find("dd").eq(0).addClass("on");
        specId += $(this).find("dd").eq(0).attr("specid") + ',';
    })
    }
        $.ajax({
            type: "POST",
            url: sendUrl,
            dataType: "json",
            data: {
                "goods_id": $("#goods_id").val(),
                "ids": specId
            },
            timeout: 20000,
            success: function (data, textStatus) {
                if (data.status == 1) {
                    $("#goods_item_id").val(data.id);
                    //$("#commodityMarketPrice").text('¥' + data.market_price);
                    //$("#commoditySellPrice").text('¥' + data.sale_price);
                    $(".col_member_price money").text(data.sale_price);
                    $(".col_market_price money").text(data.market_price);
                    $("#stock_num").text(data.goods_number);
                    $("#buynum").attr("max", data.goods_number);
                    if (data.spec_img.length > 10) {
                        $("#spec_img").attr("src", data.spec_img);
                    }
                    //$("#buyButton button").prop("disabled", false).removeClass("over");
                    //检查是否足够库存
                    if (parseInt(data.goods_number) > 0) {
                        $("#btn_choose_ok").prop("disabled", false).removeClass("disabled").val("确定");
                        $("#btn_choose_ok").click(function () {
                            cartAdd(1);
                        })
                        $("#buynum").val("1");
                    } else {
                        $("#btn_choose_ok").prop("disabled", true).addClass("disabled").val("库存不足");
                        $("#buynum").val("0");
                    }
                } else {
                    //alert(data.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("查询出错：" + textStatus + ",提示：" + errorThrown);
            }
        });

        
   
    //遍历规格属性
    //$(".spec_ul").each(function () {
    $(".spec_part dd").click(function () {
        if (!$(this).hasClass("on")) {
            //标签选中状态
            $(this).siblings().removeClass("on");
            $(this).addClass("on");
            //获取商品价格
            if ($(".spec_part dd.on").length == $(".spec_part").length) {
                var specIds = '';
                $(".spec_part dd.on").each(function (i) {
                    if (i == 0) {
                        specIds = ",";
                    }
                    specIds += $(this).attr("specid") + ',';
                });
                //发送异步请求
                $.ajax({
                    type: "POST",
                    url: sendUrl,
                    dataType: "json",
                    data: {
                        "goods_id": $("#goods_id").val(),
                        "ids": specIds
                    },
                    timeout: 20000,
                    success: function (data, textStatus) {
                        if (data.status == 1) {
                            $("#goods_item_id").val(data.id);
                            //$("#commodityMarketPrice").text('¥' + data.market_price);
                            //$("#commoditySellPrice").text('¥' + data.sale_price);
                            $(".col_member_price money").text(data.sale_price);
                            $(".col_market_price money").text(data.market_price);
                            $("#stock_num").text(data.goods_number);
                            $("#buynum").attr("max", data.goods_number);
                            if (data.spec_img.length > 10) {
                                $("#spec_img").attr("src",data.spec_img);
                            }
                            //检查是否足够库存
                            if (parseInt(data.goods_number) > 0) {
                                $("#btn_choose_ok").prop("disabled", false).removeClass("disabled").val("确定");
                                $("#btn_choose_ok").click(function () {
                                    cartAdd(1);
                                })
                                $("#buynum").val("1");
                            } else {
                                $("#btn_choose_ok").prop("disabled", true).addClass("disabled").val("库存不足");
                                $("#buynum").val("0");
                            }
                        } else {
                            alert(data.msg);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert("查询出错：" + textStatus + ",提示：" + errorThrown);
                    }
                });
            }
        }
    });
}
function show_choose_spec(_type) {
    var goods_item_id = parseInt($("#goods_item_id").val());
    //检查商品是否有规格
    if ($(".spec_part").length > 0) {
        if (!$("#areaColSize").is(":hidden")) {
            //alert("请先选择商品规格！");
            show_spec_col();

        }
        return false;
    } else {
        cartAdd(_type);
    }
}
//添加进购物车
function cartAdd(_type) {
    
    var goods_item_id = parseInt($("#goods_item_id").val());
    var goods_id = parseInt($("#goods_id").val());
    var selectNum = parseInt($("#buynum").val());
    var shop_id = $("#shop_id").val();
    if ($("#btn_choose_ok").prop("disabled") == true) {
        return false;
    }
    $("#btn_choose_ok").prop("disabled", true);
    //检查商品ID
    if (isNaN(goods_id)) {
        alert("商品参数不正确！");
        return false;
    }
    //检查商品是否有规格
    if (goods_item_id == 0 && $(".spec_part").length > 0) {
        if (!$("#areaColSize").is(":hidden")) { 
            //alert("请先选择商品规格！");
            show_spec_col();
            
        }
        return false;
    }
    //检查购买数量
    if (isNaN(selectNum) || selectNum == 0) {
        //alert("购买数量不能为零！");
        return false;
    }
    //检查库存数量
    if (parseInt(selectNum) > parseInt($("#stock_num").text())) {
        alert("购买数量大于库存数量，库存不足！");
        return false;
    }
    //如果是立即购买
    if (1 > 0) {
        $.ajax({
            type: "post",
            url: "/tools/submit_ajax.ashx?action=cart_goods_add",
            data: {
                "goods_id": goods_id,
                "goods_item_id": goods_item_id,
                "shop_id":shop_id,
                "quantity": selectNum
            },
            dataType: "json",
            beforeSend: function (XMLHttpRequest) {
                //发送前动作
                // $(obj).prop("disabled", true).text("请稍候...");
            },
            success: function (data, textStatus) {
                //alert(data.msg);
                if (data.status == 1) {
                    //if (confirm('购物车共有' + data.quantity + '件商品，合计：' + data.amount + '元，需要现在去结算吗？')) {
                    //该商品已成功加入购物车！购物车共有**件商品，合计：****元。点击取消 继续浏览
                    //if (confirm('该商品已成功加入购物车！\r\n点击取消 继续浏览')) {
                    //    location.href = "order_submit.aspx";
                    //}
                    get_carts_count();
                    if (_type == 2) {
                        layer.open({
                            content: '添加成功<br/>在购物车中等亲哟', skin: 'msg', time: 2 //2秒后自动关闭

                        });
                    } else {
                        window.location.href = "carts.aspx?cart_id="+data.msg;
                    }
                } else {
                    // alert(data.msg);
                    hide_spec_col();
                }
                $("#btn_choose_ok").prop("disabled", false);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("状态：" + textStatus + "；出错提示：" + errorThrown);
                $("#btn_choose_ok").prop("disabled", false);
            },
            complete: function (XMLHttpRequest, textStatus) {
                // $(obj).prop("disabled", false).html(buttonText);
                $("#btn_choose_ok").prop("disabled", false);
            },
            timeout: 20000
        });
        return false;
    }
}

//修改购物车数量
function updateCart(obj, webpath, num) {
    var objInput;
    var goodsQuantity; //购买数量
    var stockQuantity = parseInt($(obj).parents("li").find("input[name='hideStockQuantity']").val()); //库存数量
    var articleId = $(obj).parents("li").find("input[name='hideArticleId']").val(); //文章ID
    var goodsId = $(obj).parents("li").find("input[name='hideGoodsId']").val(); //商品ID
    var goodsPrice = $(obj).parents("li").find("input[name='hideGoodsPrice']").val(); //商品单价
    var goodsPoint = $(obj).parents("li").find("input[name='hidePoint']").val(); //商品积分
    var min_buy = parseInt($(obj).parents("li").find("input[name='goodsQuantity']").attr("minValue"));
    var max_buy = parseInt($(obj).parents("li").find("input[name='goodsQuantity']").attr("maxValue"));
    var step_buy = parseInt($(obj).parents("li").find("input[name='goodsQuantity']").attr("stepbuy"));
    if (arguments.length == 2) {
        objInput = $(obj);
        goodsQuantity = parseInt(objInput.val());
    } else {
        objInput = $(obj).siblings("input[name='goodsQuantity']");
        if (num > 0) {
            goodsQuantity = parseInt(objInput.val()) + step_buy;
        } else {
            goodsQuantity = parseInt(objInput.val()) - step_buy;
        }
    }
    if (isNaN(goodsQuantity)) {
        alert('商品数量只能输入数字!');
        return false;
    }
    if (isNaN(stockQuantity)) {
        alert('检测不到商品库存数量!');
        return false;
    }
    if (goodsQuantity < min_buy) {
        goodsQuantity = min_buy;
    }
    if (goodsQuantity > max_buy) {
        alert("购买数量不能大于最大购买量");
        goodsQuantity = max_buy;
    }
    if (goodsQuantity > stockQuantity) {
        alert('购买数量不能大于库存数量!');
        goodsQuantity = stockQuantity;
    }
    $.ajax({
        type: "post",
        url: webpath + "tools/submit_ajax.ashx?action=cart_goods_update",
        data: {
            "article_id": articleId,
            "goods_id": goodsId,
            "quantity": goodsQuantity
        },
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            //发送前动作
        },
        success: function (data, textStatus) {
            if (data.status == 1) {
                objInput.val(goodsQuantity);
                var totalPrice = parseFloat(goodsPrice) * goodsQuantity; //金额
                var totalPoint = parseFloat(goodsPoint) * goodsQuantity; //积分
                $(obj).parents("tr").find("label[name='amountCount']").text(totalPrice.toFixed(2));
                if (totalPoint > 0) {
                    $(obj).parents("li").find("label[name='pointCount']").text("+" + totalPoint);
                } else {
                    $(obj).parents("li").find("label[name='pointCount']").text(totalPoint);
                }
                
                cartAmountTotal(); //重新统计
            } else {
                alert(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        },
        timeout: 20000
    });
    return false;
}

//删除购物车商品
function deleteCart(webpath, obj) {
    if (!confirm("您确认要从购物车中移除吗？")) {
        return false;
    }
    //组合参数
    var datastr;
    var arglength = arguments.length; //参数个数
    if (arglength == 1) {
        datastr = { "clear": 1 }
    } else {
        var articleId = $(obj).parents("li.shop_list_li").find("input[name='hideArticleId']").val();
        var goodsId = $(obj).parents("li.shop_list_li").find("input[name='hideGoodsId']").val();
        datastr = { "article_id": articleId, "goods_id": goodsId }
    }
    $.ajax({
        type: "post",
        url: webpath + "tools/submit_ajax.ashx?action=cart_goods_delete",
        data: datastr,
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            //发送前动作
        },
        success: function (data, textStatus) {
            if (data.status == 1) {
                if (arglength == 1) {
                    location.reload();
                } else {
                    $(obj).parents(".shop_list_li").remove();
                    cartAmountTotal(); //重新统计
                }
            } else {
                alert(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        },
        timeout: 20000
    });
    return false;
}

//删除购物车所选商品
function deleteCartSelect() {
    if (!confirm("您确认要从购物车中移除吗？")) {
        return false;
    }
    //组合参数
    var datastr;
    var cartids = "";
    if ($(".cart_list_li .selected").length == 0) {
        alert("未选择任何商品！");
        return false;
    }
    $(".cart_list_li .selected").each(function (i) {
        var articleId = $(this).parents(".shop_list_li").find("input[name='hideArticleId']").val();
        var goodsId = $(this).parents(".shop_list_li").find("input[name='hideGoodsId']").val();
        cartids += articleId + "_" + goodsId + "";
        if (i < $(".cart_list_li .selected").length - 1) {
            cartids += ",";
        }
    })
    datastr = { "cart_ids": cartids }
    $.ajax({
        type: "post",
        url: "/tools/submit_ajax.ashx?action=cart_goods_delete_selected",
        data: datastr,
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            //发送前动作
        },
        success: function (data, textStatus) {
            if (data.status == 1) {
               // $(obj).parents(".shop_list_li").remove();
                // cartAmountTotal(); //重新统计
                location.reload();
            } else {
                alert(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        },
        timeout: 20000
    });
    return false;
}

//选择商品
function selectCart(obj) {
    var arglength = arguments.length; //参数个数
    if (arglength == 1) {
        if ($(obj).text() == "全选") {
            $(obj).text("取消");
            $(".checkall").prop("checked", true);
        } else {
            $(obj).text("全选");
            $(".checkall").prop("checked", false);
        }
    }
    cartAmountTotal(); //统计商品
}

//计算购物车金额
function cartAmountTotal() {
    var jsondata = ""; //商品组合参数
    var totalAmount = 0; //商品总计
    $(".cart_list_li .selected").each(function (i) {
        var articleId = $(this).parents(".shop_list_li").find("input[name='hideArticleId']").val(); //文章ID
        var goodsId = $(this).parents(".shop_list_li").find("input[name='hideGoodsId']").val(); //商品ID
        var goodsPrice = $(this).parents(".shop_list_li").find("input[name='hideGoodsPrice']").val(); //商品单价
        var goodsQuantity = $(this).parents(".shop_list_li").find("input[name='goodsQuantity']").val(); //购买数量
        totalAmount += parseFloat(goodsPrice) * parseFloat(goodsQuantity);
        jsondata += '{"article_id":"' + articleId + '", "goods_id":"' + goodsId + '", "quantity":"' + goodsQuantity + '"}';
        if (i < $(".cart_list_li .selected").length - 1) {
            jsondata += ',';
        }
    });
    if ($(".cart_list_li .selected").length > 0) {
        $(".btn_accout").removeClass("no_select");
    } else {
        if (!$(".btn_accout").hasClass("no_select")) {
            $(".btn_accout").addClass("no_select");
        }
    }
    $("#totalQuantity").text($(".cart_list_li .selected").length);
    $("#totalAmount").text(totalAmount.toFixed(2));
    if (jsondata.length > 0) {
        jsondata = '[' + jsondata + ']';
    }
    $("#jsondata").val(jsondata);
}

//进入结算中心
function formSubmit(obj, webpath, linkurl) {
    var jsondata = $("#jsondata").val();
    if (jsondata == "") {
        alert("未选中要购买的商品，请选中后提交！");
        return false;
    }
    //记住按钮文字
    var buttonText = $(obj).text();
    //加入购物清单
    $.ajax({
        type: "post",
        url: webpath + "tools/submit_ajax.ashx?action=cart_goods_buy",
        data: { "jsondata": jsondata },
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            //发送前动作
            $(obj).prop("disabled", true).text("请稍候...");
        },
        success: function (data, textStatus) {
            if (data.status == 1) {
                location.href = linkurl;
            } else {
                $(obj).prop("disabled", false).text(buttonText);
                alert("尝试进入结算中心失败，请重试！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $(obj).prop("disabled", false).text(buttonText);
            alert("状态：" + textStatus + "；出错提示：" + errorThrown);
        },
        timeout: 20000
    });
    return false;
}

/*初始化收货地址*/
function initUserAddress(obj) {
    //初始化省市区
    var mypcas = new PCAS("province,所属省份", "city,所属城市", "area,所属地区");
    //初始化地址
    $(obj).children("li").each(function () {
        //初始化值
        if ($(this).hasClass("selected")) {
            $("#book_id").val($(this).find("input[name='user_book_id']").val());
            $("#accept_name").val($(this).find("input[name='user_accept_name']").val());
            $("#address").val($(this).find("input[name='user_address']").val());
            $("#mobile").val($(this).find("input[name='user_mobile']").val());
            $("#telphone").val($(this).find("input[name='user_telphone']").val());
            $("#email").val($(this).find("input[name='user_email']").val());
            $("#post_code").val($(this).find("input[name='user_post_code']").val());
            $(this).find("input[name='user_book_id']").prop("checked", true); //设置选中
            //改变省市区
            var areaArr = $(this).find("input[name='user_area']").val().split(",");
            if (areaArr.length == 3) {
                mypcas.SetValue(areaArr[0], areaArr[1], areaArr[2]);
            } else {
                mypcas.SetValue();
            }
        }
        //初始化事件
        $(this).click(function () {
            $(this).siblings("li").removeClass("selected");
            $(this).addClass("selected");
            $("#book_id").val($(this).find("input[name='user_book_id']").val());
            $("#accept_name").val($(this).find("input[name='user_accept_name']").val());
            $("#address").val($(this).find("input[name='user_address']").val());
            $("#mobile").val($(this).find("input[name='user_mobile']").val());
            $("#telphone").val($(this).find("input[name='user_telphone']").val());
            $("#email").val($(this).find("input[name='user_email']").val());
            $("#post_code").val($(this).find("input[name='user_post_code']").val());
            $(this).find("input[name='user_book_id']").prop("checked", true); //设置选中
            //改变省市区
            var areaArr = $(this).find("input[name='user_area']").val().split(",");
            if (areaArr.length == 3) {
                mypcas.SetValue(areaArr[0], areaArr[1], areaArr[2]);
            } else {
                mypcas.SetValue();
            }
        });
    });
}

//计算支付手续费总金额
function paymentAmountTotal(obj) {
    var paymentPrice = $(obj).children("option:selected").attr("fee");
    $("#paymentFee").text(paymentPrice); //运费
    orderAmountTotal();
}
//计算配送费用总金额
function freightAmountTotal(obj) {
    var expressPrice = $(obj).children(":selected").attr("fee");
    $("#expressFee").text(expressPrice); //运费
    orderAmountTotal();
}

//计算税金
function taxAmoutTotal(obj) {
    var taxesFee = 0 //税费
    if ($(obj).children(":selected").attr("value") == 1) {
        taxesFee = parseFloat($("#taxAmout").val());
        $("#invoiceBox").show();
    } else {
        $("#invoiceBox").hide();
    }
    $("#taxesFee").text(taxesFee.toFixed(2));
    orderAmountTotal();
}

//计算订单总金额
function orderAmountTotal() {
    var goodsAmount = $("#goodsAmount").text(); //商品总金额
    var paymentFee = $("#paymentFee").text(); //手续费
    var expressFee = $("#expressFee").text(); //运费
    var taxesFee = 0 //税费
    if ($("#is_invoice").children(":selected").attr("value") == 1) {
        taxesFee = parseFloat($("#taxAmout").val());
    }
    //订单总金额 = 商品金额 + 手续费 + 运费 + 税费
    var totalAmount = parseFloat(goodsAmount) + parseFloat(paymentFee) + parseFloat(expressFee) + parseFloat(taxesFee);
    $("#totalAmount").text(totalAmount.toFixed(2));
}