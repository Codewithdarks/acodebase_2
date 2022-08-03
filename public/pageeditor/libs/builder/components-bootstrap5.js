/*
Copyright 2017 Ziadin Givan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

https://github.com/givanz/WEOjs
*/

WEO.ComponentsGroup['Bootstrap 5'] =
    ["html/container", "html/gridrow", "html/btn", "html/buttongroup", "html/buttontoolbar", "html/heading", "html/image", "html/alert", "html/card", "html/listgroup", "html/hr", "html/badge", "html/progress", "html/navbar", "html/breadcrumbs", "html/pagination", "html/form", "html/table", "html/paragraph", "html/section", "html/article"];


WEO.Components.extend("_base", "html/container", {
    classes: ["container", "container-fluid"],
    image: "icons/container.svg",
    html: '<div class="container" style="min-height:150px;"><div class="m-5">Container</div></div>',
    name: "Container",
    properties: [
        {
            name: "Type",
            key: "type",
            htmlAttr: "class",
            inputtype: SelectInput,
            validValues: ["container", "container-fluid"],
            data: {
                options: [{
                    value: "container",
                    text: "Default"
                }, {
                    value: "container-fluid",
                    text: "Fluid"
                }]
            }
        },
        {
            name: "Background",
            key: "background",
            htmlAttr: "class",
            validValues: bgcolorClasses,
            inputtype: SelectInput,
            data: {
                options: bgcolorSelectOptions
            }
        },
        {
            name: "Background Color",
            key: "background-color",
            htmlAttr: "style",
            inputtype: ColorInput,
        },
        {
            name: "Text Color",
            key: "color",
            htmlAttr: "style",
            inputtype: ColorInput,
        }],
});
var modalHtml = ""
var product_data = [];
var file = ""
let selectedProducts = []
let selectedProducts2 = []
function getProducts(type, modalClass, name) {
    var items = [];
    $.getJSON(productsjson,
        function (data) {
            //console.log("data: ", data)
            var prodcutsall = JSON.parse(data.response_body);
            product_data = prodcutsall.products
            var pagination = JSON.parse(data.response_paginate);
            var nextpage = pagination.next;
            var previouspage = pagination.previous;
            //console.log(nextpage);
            //console.log(previouspage);
            if(typeof previouspage !== "undefined"){
                $('.prev-page').prop("disabled", false).attr('data-action',previouspage);
            }else{
                $('.prev-page').prop("disabled", true).attr('data-action','');
            }
            if(typeof nextpage !== "undefined"){
                $('.next-page').prop("disabled", false).attr('data-action',nextpage);
            }else{
                $('.next-page').prop("disabled", false).attr('action','');
            }

            $.each(product_data, function (key, val) {
                let image = val.images !== null && val.images.length > 0 ? val.images[0].src : `${WEO.imgBaseUrl}no_image.jpg`;

                setTimeout(() => {
                    let dataID = `${name}_${val['id']}`
                    let arr = []
                    if (type == "radio" && val['id'].toString() == file.toString()) {
                        $("#" + dataID).prop('checked', true)
                    } else {
                        if (name == "products") {
                            arr = selectedProducts
                        } else {
                            arr = selectedProducts2
                        }
                        if (arr.length > 0) {
                            $.each(arr, function (x, y) {
                                if (y.id == val.id) {
                                    $("#" + dataID).prop('checked', true)
                                }
                            })
                        }
                    }
                }, 500);
                let item = `
                            <li class="files">									
                                <label class="form-check">									 
                                    <input type="${type}" class="form-check-input" value="${val['id']}" id="${name}_${val['id']}" name="file[]" onchange="productCheck(this)">
                                    <span class="form-check-label">
                                    </span>
                                    <div href="#" class="files">
                                        <img class="image" loading="lazy" src="${image}" title="">
                                        <div class="info">
                                            <div class="name">${val['title']}</div>
                                        </div>
                                    </div>									
                                </label>								
                            </li>`

                items.push(item);
            })
            $('.loading-message').css('display','none');
            $("#product_list").html(items);


        }
    )
    // $(`.${modalClass} .files input`)
    modalHtml =
        `
            <div class="modal fade modal-full ${modalClass}" id="ProductModal" tabindex="-1" role="dialog" aria-labelledby="ProductModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="ProductModalLabel">Products</h5>
                    <p class="m-0" style="color: red; display: none;" id="modal_error">You can choose upto 10 products</p>
                    
                    <button type="button" class="btn btn-sm" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="la la-times la-lg"></i></span>
                    </button>
                </div>
                <div class="modal-body">
        
                        <div class="filemanager">
    
                            <div class="top-panel">
    
    
                            </div>
                            
                            <div class="display-panel">
                            <div class="loading-message">
                            <div class="animation-container">
                                <div class="dot dot-1"></div>
                                <div class="dot dot-2"></div>
                                <div class="dot dot-3"></div>
                            </div>
    
                            <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                                <defs>
                                    <filter id="goo">
                                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 21 -7"></feColorMatrix>
                                    </filter>
                                </defs>
                            </svg>
                            <!-- https://codepen.io/Izumenko/pen/MpWyXK -->
                        </div>
                                <ul class="data" id="product_list">
                                </ul>
                            
                            </div>
                        </div>
    
                </div>
                <div class="modal-footer justify-content-between">
                
                    <div class="align-left">
                    
                    <button type="button" class="btn btn-primary next-page" data-action="" onclick="productnextprev('${type}')" disabled>Load More</button>
                    </div>
                
                    <div class="align-right">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary save-btn" id="save-btn">Add selected</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <style>
            #ProductModal .filemanager .data li {
            width: 130px;
            height: auto;
        }
        #ProductModal .filemanager .data li .info {
            padding: 5px;
        }
        #ProductModal .files .image {
            float: none;
            max-width: 100%;
            width: 100%;
            max-height: 120px;
            object-fit: cover;
        }
        #ProductModal .filemanager .data {
            display: flex;
            flex-wrap: wrap;
        }
            </style>
            <script>       
                function productCheck(e){
                    console.log("e----", e)
                    if($(".${modalClass} .files input:checked").length > 10){
                        $("#modal_error").show()
                        $(".${modalClass} #save-btn").addClass("disabled").removeClass("save-btn")
                    }else{
                        $("#modal_error").hide()
                        $(".${modalClass} #save-btn").removeClass("disabled").addClass("save-btn")
                    }
                }
            </script>`;
}
	
function getProductOptions(array, result, cols) {
    $.each(array, function (_key, opt) {
        let option_val = []
        $.each(opt.values, function (_key1, val) {
            let option_list = `<option value="${val}">${val}</option>`
            option_val.push(option_list);
        })
        let item = ``;
        if(opt.name!='Title'){
        let item = `<div class="${cols}">
                        <label>${opt.name}</label>                                            
                        <select class="form-control custom_select single-option-selector">
                            ${option_val}
                        </select>
                    </div>`
                    result.push(item);        
        }
        
    })
}
function getProductVariations(array, result) {
    let option_val = []
    $.each(array, function (_key, opt) {
            let option_list = `<option value="${opt.id}">${opt.title}</option>`
            option_val.push(option_list);  
    })
        let item = `<select class="product-form__variation" name="id" style="display:none;">
                    ${option_val}
                </select>`
            result.push(item);
    
}

function productnextprev(type){
   // var prevpage = $('.prev-page').attr('data-action');
    var nextpage = $('.next-page').attr('data-action');
    var pagetoken ='';
    // if(typeof prevpage !== "undefined"){
    //     var pagetoken = $('.prev-page').attr('data-action');
    // }
    if(typeof nextpage !== "undefined"){
        var pagetoken = $('.next-page').attr('data-action');
    }
    var items = [];
    $.getJSON(productsjson+'?'+pagetoken,
        function (data) {
            var prodcutsall = JSON.parse(data.response_body);
            product_data = prodcutsall.products
            var pagination = JSON.parse(data.response_paginate);
            var nextpage = pagination.next;
            var previouspage = pagination.previous;
            if(typeof previouspage !== "undefined"){
                $('.prev-page').prop("disabled", false).attr('data-action',previouspage);
            }else{
                $('.prev-page').prop("disabled", true).attr('data-action','');
            }
            if(typeof nextpage !== "undefined"){
                $('.next-page').prop("disabled", false).attr('data-action',nextpage);
            }else{
                $('.next-page').prop("disabled", false).attr('action','');
            }

            $.each(product_data, function (key, val) {
                let image = val.images !== null && val.images.length > 0 ? val.images[0].src : `${WEO.imgBaseUrl}no_image.jpg`;
                let item = `
                            <li class="files">									
                                <label class="form-check">									 
                                    <input type="${type}" class="form-check-input" value="${val['id']}" id="${name}_${val['id']}" name="file[]" onchange="productCheck(this)">
                                    <span class="form-check-label">
                                    </span>
                                    <div href="#" class="files">
                                        <img class="image" loading="lazy" src="${image}" title="">
                                        <div class="info">
                                            <div class="name">${val['title']}</div>
                                        </div>
                                    </div>									
                                </label>								
                            </li>`

                items.push(item);
            })
            $("#product_list").append(items);


        }
    );

}

WEO.Components.extend("_base", "html/article", {
    classes: ["product-section"],
    image: "icons/button.svg",
    name: "Section",
    properties: [{
        name: "Connection",
        key: "addChild",
        inputtype: ButtonInput,
        data: { text: "Connect to shopify", icon: "la-plus" },
        onChange: function (node) {
            //console.log("common WEO: ", WEO)
            getProducts("radio", "product-section-modal", "product")
            if ($("body #ProductModal").length == 0) {
                $("body").append(modalHtml)
            }
            if ($("body #ProductModal").length > 0 && $("body #ProductModal.product-section-modal").length == 0) {
                $("body #ProductModal").replaceWith(modalHtml)
            }
            if (modalHtml !== "") {
                $('.product-section-modal').modal('show')
                $(".product-section-modal .save-btn").on("click", () => save());
                //$(".product-section-modal .next-page").on("click", () => productnextprev('radio'));
            }
            
            function save() {
                file = $(".product-section-modal .files input:checked").eq(0).val();
               // console.log("file: ", file)
                $(".product-section-modal").modal('hide');
                let active = product_data.filter(opt => opt.id == file)
                //console.log("active: ", active)
                if (active.length > 0) {
                    let image = active[0].images !== null && active[0].images.length > 0 ? active[0].images[0].src : `${WEO.imgBaseUrl}no_image.jpg`;

                    let product_image = []
                    $.each(active[0].images !== null && active[0].images.length > 0 && active[0].images, function (_keys, opt) {
                        let product_sliderHtml = `<div><img class="img-fluid border " src=${opt.src} alt=""></div>`
                        product_image.push(product_sliderHtml)
                    })
                    let product_title = active[0].title
                    let product_description = active[0].body_html
                    let product_price = active[0].variants.length > 0 ? `$${active[0].variants[0].price}` : "$0.00"
                    let product_options = []
                    let product_variations = []
                    if (active[0].options.length > 0) {
                        getProductOptions(active[0].options, product_options, "col-md-4 col-6")
                    }
                    if (active[0].variants.length > 0) {
                        getProductVariations(active[0].variants, product_variations)
                    }

                    let node = WEO.Builder.frameBody[0]

                    let slider_setting = `<script>
                    var options = {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false,
                        fade: false,
                        infinite: true,
                        arrows: false,
                        speed: 1000,
                        asNavFor: '#product-slider-thumb',
                        autoplay: true,
                    }
                    var optionsThumb = {
                        slidesToShow: 5,
                        slidesToScroll: 5,
                        arrows: true,
                        infinite: true,
                        asNavFor: '#product_image',
                        prevArrow: '<div class="slick-nav prev-arrow carousel-control-prev-icon"></div>',
                        nextArrow: '<div class="slick-nav next-arrow carousel-control-next-icon"></div>',
                        dots: false,
                        focusOnSelect: true,
                        responsive: [{
                            breakpoint: 576,
                            settings: {
            
                                vertical: false,
                                slidesToShow: 4,
                                slidesToScroll: 4,
            
                            }
                        }, ]
                      }
                        function sliderInit(){
                            $("#product_image").slick(options);
                            $("#product-slider-thumb").slick(optionsThumb);
                        }
                        function sliderUnslick(){
                            $("#product_image").slick("unslick");
                            $("#product-slider-thumb").slick("unslick");
                        }
                        function sliderAddSlide(addhtml){
                            $("#product_image").slick('slickAdd', addhtml);
                            $("#product-slider-thumb").slick('slickAdd', addhtml);
                        }
                        function sliderRemoveAll(){
                            $("#product_image").slick('slickRemove', null, null, true);
                            $("#product-slider-thumb").slick('slickRemove', null, null, true);
                        }
                        function Handler(e) {
                            let inputVal = $(e).parent().find('input').val()
                            let newVal = ""
                            if(e.classList.contains("plus")){
                                newVal = parseInt(inputVal)+1
                            }else{
                                if(parseInt(inputVal) > 1){
                                    newVal = parseInt(inputVal)-1
                                }else{
                                    newVal = 1
                                }
                            }
                            $(e).parent().find('input').val(newVal)
                        }
                        function onchangeHandler(e){
                            if($(e).val() < 1){
                                $(e).val(1)
                            }
                        }
                        var variationselect = $("[class*='single-option-selector']").map(function() {
                            //console.log($(this).val());
                             return $(this).val();
                             }).get().join(' / ');
                             $(".product-form__variation option").filter(function() {
                             $('option:selected', this).remove();    
                             return this.text == variationselect; 
                             }).attr('selected', true); 
                        $(document).on("change", ".single-option-selector",function () {
                            $('.product-form__variation option:selected').removeAttr('selected');
                            var variationselect = $("[class*='single-option-selector']").map(function() {
                               // console.log($(this).val());
                                return $(this).val();
                                }).get().join(' / ');
                                $(".product-form__variation option").filter(function() {
                                return this.text == variationselect; 
                                }).attr('selected', true);    
                            //console.log(variationselect);    
                        });
                        </script>`
                    $(node).append(slider_setting)
                    for (var j = 0; j < node.childNodes.length; j++) {
                        let child = node.childNodes[j];

                        //skip text and comments nodes
                        if (child.nodeType == 3 || child.nodeType == 8) {
                            continue;
                        }

                        if (child) {
                            //console.log("child: ", child)
                           // console.log("child.id: ", child.id)
                            if (child.id === "product-section") {
                                // child.querySelector("#product_block").innerHTML = product_html


                                // child.querySelector("#product_image").innerHTML = product_image.join(" ")
                                // child.querySelector("#product-slider-thumb").innerHTML = product_image.join(" ")


                                if (child.classList.contains("section_event") == true) {
                                    child.querySelector("#product_image").innerHTML = product_image.join(" ")
                                    child.querySelector("#product-slider-thumb").innerHTML = product_image.join(" ")
                                    WEO.Builder.iframe.contentWindow.sliderInit()
                                } else {
                                    WEO.Builder.iframe.contentWindow.sliderRemoveAll()
                                    WEO.Builder.iframe.contentWindow.sliderAddSlide(product_image.join(" "))
                                    // WEO.Builder.iframe.contentWindow.sliderReinit()

                                }
                                if (product_image.length < 6) {
                                    child.querySelector("#product-slider-thumb").classList.add("noslider")
                                } else {
                                    child.querySelector("#product-slider-thumb").classList.remove("noslider")
                                }
                                child.classList.remove("section_event")

                                // child.querySelector("#product_image").innerHTML = product_image
                                child.querySelector("#product_title").innerHTML = product_title
                                child.querySelector("#product_description").innerHTML = product_description
                                child.querySelector("#product_price").innerHTML = product_price
                                child.querySelector("#product_options").innerHTML = product_options.join(" ")
                                child.querySelector("#product_variations").innerHTML = product_variations.join(" ")
                            }
                        }
                    }
                }
            }
        }
    }]
});
WEO.Components.extend("_base", "html/section", {
    classes: ["product-card", "subscription"],
    image: "icons/button.svg",
    name: "Section",
    properties: [{
        name: "Products",
        key: "addChild",
        inputtype: ButtonInput,
        data: { text: "Choose products", icon: "la-plus" },
        onChange: function (node) {
            //console.log("common node: ", node)
            //console.log("common WEO: ", WEO)
            let className = "product-card-modal"
            let modalType = "products"
            if (node[0].classList.contains("subscription")) {
                className = "subscription-modal"
                modalType = "subscription"
            } else {
                className = "product-card-modal"
                modalType = "products"
            }
            getProducts("checkbox", className, modalType)
            if ($("body #ProductModal").length == 0) {
                $("body").append(modalHtml)
            } else {
                // if ($("body #ProductModal").length > 0 && $("body #ProductModal.product-card-modal").length == 0) {
                $("body #ProductModal").replaceWith(modalHtml)
            }
            if (modalHtml !== "") {
                if (modalType == "products") {
                    $('.product-card-modal').modal('show')
                    $(".product-card-modal .save-btn").on("click", () => addProduct());
                } else {
                    $('.subscription-modal').modal('show')
                    $(".subscription-modal .save-btn").on("click", () => addProduct2());
                }
                
            }

            function addProduct() {
                // let file = $(".product-card-modal .files input:checked").eq(0).val();
                selectedProducts = []
                $.each(product_data, function (_keys, opt) {
                    $.each($(".product-card-modal .files input:checked"), function (key, val) {
                        //console.log("selectedProducts.indexOf(opt): ", selectedProducts.indexOf(opt))
                        if (opt.id == val.value && selectedProducts.indexOf(opt) === -1) {
                            selectedProducts.push(opt)
                        }
                        // selectedProducts = product_data.products.filter(opt => opt.id == file)
                    })
                })
                const ids = selectedProducts.map(o => o.id)
                selectedProducts = selectedProducts.filter(({ id }, index) => !ids.includes(id, index + 1))
                if (selectedProducts.length > 0) {

                    let items = []
                    $.each(selectedProducts, function (_k, data) {
                        let image = data.images !== null && data.images.length > 0 ? data.images[0].src : `${WEO.imgBaseUrl}no_image.jpg`;
                        let price = data.variants !== null && data.variants.length > 0 ? data.variants[0].price : `0.00`;
                        let product_options = []
                        let product_variations = []
                        if (data.options.length > 0) {
                            getProductOptions(data.options, product_options, "col-6 text-start")
                        }
                        if (active[0].variants.length > 0) {
                            getProductVariations(active[0].variants, product_variations)
                        }
                        let product_html = `<div class="p-3">
                        <a href="#" class="card rounded">
                            <div class="card-image">
                                <span class="card-notify-badge bg-primary text-white">New</span>
                                <img class="img-fluid" src="${image}" alt="Alternate Text" />
                            </div>
                            <div class="card-body text-center">
                                <div class="ad-title text-dark m-auto">
                                    <h5>${data.title}</h5>
                                    <div class="d-flex justify-content-between">
                                    <span>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        5.0
                                    </span>
                                    <h5>$${price}</h5>
                                </div>
                            </div>
                            <div class="row g-2 pt-2 pb-3 justify-content-center">
                                ${product_options.join(" ")}
                            </div>
                            <button class="btn btn-primary btn-lg btn-rounded w-100">ADD TO BAG</button>
                            </div>
                        </a>
                    </div>`
                        items.push(product_html)
                    })

                    let node = WEO.Builder.frameBody[0]
                    let slider_setting = `<script>
                    var options = {
                        slidesToShow: 3,
                            slidesToScroll: 1,
                            dots: false,
                            fade: false,
                            infinite: false,
                            arrows: true,
                            speed: 500,
                            prevArrow: '<div class="slick-nav prev-arrow carousel-control-prev-icon"></div>',
                            nextArrow: '<div class="slick-nav next-arrow carousel-control-next-icon"></div>',
                            autoplay: false,
                            responsive: [{
                                breakpoint: 768,
                                settings: {

                                    slidesToShow: 2,
                                    slidesToScroll: 1,

                                }
                            }, {
                                breakpoint: 380,
                                settings: {

                                    slidesToShow: 1,
                                    slidesToScroll: 1,

                                }
                            },
                            ]
                      }
                        function sliderInit(){
                            $("#add_products").slick(options);
                        }
                        function sliderUnslick(){
                            $("#add_products").slick("unslick");
                        }
                        function sliderAddSlide(addhtml){
                            $("#add_products").slick('slickAdd', addhtml);
                        }
                        function sliderRemoveSlide(i){
                            $("#add_products").slick('slickRemove', i);
                        }
                        function sliderRemoveAll(){
                            $("#add_products").slick('slickRemove', null, null, true);
                        }
                    </script>`
                    $(node).append(slider_setting)
                    for (var j = 0; j < node.childNodes.length; j++) {
                        let child = node.childNodes[j];

                        //skip text and comments nodes
                        if (child.nodeType == 3 || child.nodeType == 8) {
                            continue;
                        }

                        if (child) {
                            //console.log("child: ", child)
                            //console.log("child.id: ", child.id)
                            if (child.id === "product-card") {
                                child.querySelector("#add_products").classList.remove("row")

                                if (child.classList.contains("section_event") == true) {
                                    child.querySelector("#add_products").innerHTML = items.join(" ")
                                    WEO.Builder.iframe.contentWindow.sliderInit()
                                } else {
                                    WEO.Builder.iframe.contentWindow.sliderRemoveAll()
                                    WEO.Builder.iframe.contentWindow.sliderAddSlide(items.join(" "))
                                    // WEO.Builder.iframe.contentWindow.sliderReinit()

                                }
                                child.classList.remove("section_event")
                            }
                        }
                    }
                }

                $(".product-card-modal").modal('hide');
            }

            //Add subscription products
            function addProduct2() {
                selectedProducts2 = []
                $.each(product_data, function (_keys, opt) {
                    $.each($(".subscription-modal .files input:checked"), function (key, val) {
                        if (opt.id == val.value && selectedProducts2.indexOf(opt) === -1) {
                            selectedProducts2.push(opt)
                        }
                        // selectedProducts2 = product_data.products.filter(opt => opt.id == file)
                    })
                })
                const ids = selectedProducts2.map(o => o.id)
                selectedProducts2 = selectedProducts2.filter(({ id }, index) => !ids.includes(id, index + 1))
                //console.log("selectedProducts2: ", selectedProducts2)

                // console.log("active: ", active)
                if (selectedProducts2.length > 0) {

                    let items = []
                    $.each(selectedProducts2, function (_k, data) {
                        let image = data.images !== null && data.images.length > 0 ? data.images[0].src : `${WEO.imgBaseUrl}no_image.jpg`;
                        let price = data.variants !== null && data.variants.length > 0 ? data.variants[0].price : `0.00`;
                        let product_options = []
                        let product_variations = []
                        if (data.options.length > 0) {
                            getProductOptions(data.options, product_options, "col-6 text-start")
                        }
                        if (active[0].variants.length > 0) {
                            getProductVariations(active[0].variants, product_variations)
                        }
                        let product_html = `<div class="p-3">
                        <div class="card rounded">
                            <div class="card-image">
                                <img class="img-fluid" src="${image}" alt="Alternate Text" />
                            </div>
                            <div class="card-body text-center">
                                <div class="ad-title text-dark m-auto">
                                    <h5>${data.title}</h5>
                                    <h2 class="mt-2 mb-0"><strong>$${price} / Month</strong></h2>
                                    <div class="product_quantity">
                                        <button class="btn btn-outline-primary minus" onclick="Handler(this)"><i class="la la-minus"></i></button>
                                        <input type="number" class="quantity_input" value="1" onblur="onchangeHandler(this)">
                                        <button class="btn btn-outline-primary plus" onclick="Handler(this)"><i class="la la-plus"></i></button>
                                    </div>
                                    <div class="row g-2 pt-2 pb-3 justify-content-center">
                                        ${product_options.join(" ")}
                                    </div>
                                </div>
                                <ul class="list-group text-center mb-3">
                                    <li class="list-group-item"><i class="fa fa-check"></i> Save 15% off the regular purchase</li>
                                    <li class="list-group-item"><i class="fa fa-check"></i> Free delivery</li>
                                    <li class="list-group-item"><i class="fa fa-check"></i> 24/7 support</li>
                                </ul>
                                <button class="btn btn-primary btn-lg btn-rounded w-100">ADD TO BAG</button>
                            </div>
                        </div>
                    </div>`
                        items.push(product_html)
                    })

                    let node = WEO.Builder.frameBody[0]
                    let slider_setting = `<script>
                    var options = {
                        slidesToShow: 3,
                            slidesToScroll: 1,
                            dots: false,
                            fade: false,
                            infinite: false,
                            arrows: true,
                            speed: 500,
                            prevArrow: '<div class="slick-nav prev-arrow carousel-control-prev-icon"></div>',
                            nextArrow: '<div class="slick-nav next-arrow carousel-control-next-icon"></div>',
                            autoplay: false,
                            responsive: [{
                                breakpoint: 768,
                                settings: {

                                    slidesToShow: 2,
                                    slidesToScroll: 1,

                                }
                            }, {
                                breakpoint: 380,
                                settings: {

                                    slidesToShow: 1,
                                    slidesToScroll: 1,

                                }
                            },
                            ]
                      }
                        function sliderInit(){
                            $("#add_products2").slick(options);
                        }
                        function sliderUnslick(){
                            $("#add_products2").slick("unslick");
                        }
                        function sliderAddSlide(addhtml){
                            $("#add_products2").slick('slickAdd', addhtml);
                        }
                        function sliderRemoveSlide(i){
                            $("#add_products2").slick('slickRemove', i);
                        }
                        function sliderRemoveAll(){
                            $("#add_products2").slick('slickRemove', null, null, true);
                        }
                        function Handler(e) {
                            let inputVal = $(e).parent().find('input').val()
                            let newVal = ""
                            if(e.classList.contains("plus")){
                                newVal = parseInt(inputVal)+1
                            }else{
                                if(parseInt(inputVal) > 1){
                                    newVal = parseInt(inputVal)-1
                                }else{
                                    newVal = 1
                                }
                            }
                            $(e).parent().find('input').val(newVal)
                        }
                        function onchangeHandler(e){
                            if($(e).val() < 1){
                                $(e).val(1)
                            }
                        }
                        </script>`
                    $(node).append(slider_setting)
                    for (var j = 0; j < node.childNodes.length; j++) {
                        let child = node.childNodes[j];

                        //skip text and comments nodes
                        if (child.nodeType == 3 || child.nodeType == 8) {
                            continue;
                        }

                        if (child) {
                            //console.log("child: ", child)
                            //console.log("child.id: ", child.id)
                            if (child.id === "subscription") {
                                child.querySelector("#add_products2").classList.remove("row")
                                //console.log("WEO.Builder.iframe: ", WEO.Builder.iframe)
                                if (child.classList.contains("section_event") == true) {
                                    child.querySelector("#add_products2").innerHTML = items.join(" ")
                                    WEO.Builder.iframe.contentWindow.sliderInit()
                                } else {
                                    WEO.Builder.iframe.contentWindow.sliderRemoveAll()
                                    WEO.Builder.iframe.contentWindow.sliderAddSlide(items.join(" "))
                                    // child.querySelector(".product_quantity .btn").addEventListener("click", WEO.Builder.iframe.contentWindow.qtyCounter())
                                    // WEO.Builder.iframe.contentWindow.sliderReinit()

                                }
                                child.classList.remove("section_event")
                            }
                        }
                    }
                }

                $(".subscription-modal").modal('hide');
            }
        }
    }]
});

WEO.Components.extend("_base", "html/btn", {
    classes: ["btn", "btn-link"],
    name: "Button",
    image: "icons/button.svg",
    html: '<button type="button" class="btn btn-primary">Primary</button>',
    properties: [{
        name: "Link To",
        key: "href",
        htmlAttr: "href",
        inputtype: LinkInput
    }, {
        name: "Type",
        key: "type",
        htmlAttr: "class",
        inputtype: SelectInput,
        validValues: ["btn-default", "btn-primary", "btn-info", "btn-success", "btn-warning", "btn-info", "btn-light", "btn-dark", "btn-outline-primary", "btn-outline-info", "btn-outline-success", "btn-outline-warning", "btn-outline-info", "btn-outline-light", "btn-outline-dark", "btn-link"],
        data: {
            options: [{
                value: "btn-default",
                text: "Default"
            }, {
                value: "btn-primary",
                text: "Primary"
            }, {
                value: "btn btn-info",
                text: "Info"
            }, {
                value: "btn-success",
                text: "Success"
            }, {
                value: "btn-warning",
                text: "Warning"
            }, {
                value: "btn-info",
                text: "Info"
            }, {
                value: "btn-light",
                text: "Light"
            }, {
                value: "btn-dark",
                text: "Dark"
            }, {
                value: "btn-outline-primary",
                text: "Primary outline"
            }, {
                value: "btn btn-outline-info",
                text: "Info outline"
            }, {
                value: "btn-outline-success",
                text: "Success outline"
            }, {
                value: "btn-outline-warning",
                text: "Warning outline"
            }, {
                value: "btn-outline-info",
                text: "Info outline"
            }, {
                value: "btn-outline-light",
                text: "Light outline"
            }, {
                value: "btn-outline-dark",
                text: "Dark outline"
            }, {
                value: "btn-link",
                text: "Link"
            }]
        }
    }, {
        name: "Size",
        key: "size",
        htmlAttr: "class",
        inputtype: SelectInput,
        validValues: ["btn-lg", "btn-sm"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "btn-lg",
                text: "Large"
            }, {
                value: "btn-sm",
                text: "Small"
            }]
        }
    }, {
        name: "Target",
        key: "target",
        htmlAttr: "target",
        inputtype: TextInput
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "class",
        inputtype: ToggleInput,
        validValues: ["disabled"],
        data: {
            on: "disabled",
            off: null
        }
    }]
});
WEO.Components.extend("_base", "html/buttongroup", {
    classes: ["btn-group"],
    name: "Button Group",
    image: "icons/button_group.svg",
    html: '<div class="btn-group" role="group" aria-label="Basic example"><button type="button" class="btn btn-secondary">Left</button><button type="button" class="btn btn-secondary">Middle</button> <button type="button" class="btn btn-secondary">Right</button></div>',
    properties: [{
        name: "Size",
        key: "size",
        htmlAttr: "class",
        inputtype: SelectInput,
        validValues: ["btn-group-lg", "btn-group-sm"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "btn-group-lg",
                text: "Large"
            }, {
                value: "btn-group-sm",
                text: "Small"
            }]
        }
    }, {
        name: "Alignment",
        key: "alignment",
        htmlAttr: "class",
        inputtype: SelectInput,
        validValues: ["btn-group", "btn-group-vertical"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "btn-group",
                text: "Horizontal"
            }, {
                value: "btn-group-vertical",
                text: "Vertical"
            }]
        }
    }]
});
WEO.Components.extend("_base", "html/buttontoolbar", {
    classes: ["btn-toolbar"],
    name: "Button Toolbar",
    image: "icons/button_toolbar.svg",
    html: '<div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">\
		  <div class="btn-group me-2" role="group" aria-label="First group">\
			<button type="button" class="btn btn-secondary">1</button>\
			<button type="button" class="btn btn-secondary">2</button>\
			<button type="button" class="btn btn-secondary">3</button>\
			<button type="button" class="btn btn-secondary">4</button>\
		  </div>\
		  <div class="btn-group me-2" role="group" aria-label="Second group">\
			<button type="button" class="btn btn-secondary">5</button>\
			<button type="button" class="btn btn-secondary">6</button>\
			<button type="button" class="btn btn-secondary">7</button>\
		  </div>\
		  <div class="btn-group" role="group" aria-label="Third group">\
			<button type="button" class="btn btn-secondary">8</button>\
		  </div>\
		</div>'
});
WEO.Components.extend("_base", "html/alert", {
    classes: ["alert"],
    name: "Alert",
    image: "icons/alert.svg",
    html: '<div class="alert alert-warning alert-dismissible fade show" role="alert">\
		  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">\
			<!--span aria-hidden="true">&times;</span-->\
		  </button>\
		  <strong>Holy guacamole!</strong> You should check in on some of those fields below.\
		</div>',
    properties: [{
        name: "Type",
        key: "type",
        htmlAttr: "class",
        validValues: ["alert-primary", "alert-secondary", "alert-success", "alert-danger", "alert-warning", "alert-info", "alert-light", "alert-dark"],
        inputtype: SelectInput,
        data: {
            options: [{
                value: "alert-primary",
                text: "Default"
            }, {
                value: "alert-secondary",
                text: "Secondary"
            }, {
                value: "alert-success",
                text: "Success"
            }, {
                value: "alert-danger",
                text: "Danger"
            }, {
                value: "alert-warning",
                text: "Warning"
            }, {
                value: "alert-info",
                text: "Info"
            }, {
                value: "alert-light",
                text: "Light"
            }, {
                value: "alert-dark",
                text: "Dark"
            }]
        }
    }]
});
WEO.Components.extend("_base", "html/badge", {
    classes: ["badge"],
    image: "icons/badge.svg",
    name: "Badge",
    html: '<span class="badge bg-primary">Primary badge</span>',
    properties: [{
        name: "Color",
        key: "color",
        htmlAttr: "class",
        validValues: ["bg-primary", "bg-secondary", "bg-success", "bg-danger", "bg-warning", "bg-info", "bg-light", "bg-dark"],
        inputtype: SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "bg-primary",
                text: "Primary"
            }, {
                value: "bg-secondary",
                text: "Secondary"
            }, {
                value: "bg-success",
                text: "Success"
            }, {
                value: "bg-warning",
                text: "Warning"
            }, {
                value: "bg-danger",
                text: "Danger"
            }, {
                value: "bg-info",
                text: "Info"
            }, {
                value: "bg-light",
                text: "Light"
            }, {
                value: "bg-dark",
                text: "Dark"
            }]
        }
    }]
});
WEO.Components.extend("_base", "html/card", {
    classes: ["card"],
    image: "icons/panel.svg",
    name: "Card",
    html: '<div class="card">\
		  <img class="card-img-top" src="' + WEO.baseUrl + 'icons/image.svg" alt="Card image cap" width="128" height="128">\
		  <div class="card-body">\
			<h4 class="card-title">Card title</h4>\
			<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card\'s content.</p>\
			<a href="#" class="btn btn-primary">Go somewhere</a>\
		  </div>\
		</div>'
});
WEO.Components.extend("_base", "html/listgroup", {
    name: "List Group",
    image: "icons/list_group.svg",
    classes: ["list-group"],
    html: '<ul class="list-group">\n  <li class="list-group-item">\n    <span class="badge">14</span>\n    Cras justo odio\n  </li>\n  <li class="list-group-item">\n    <span class="badge">2</span>\n    Dapibus ac facilisis in\n  </li>\n  <li class="list-group-item">\n    <span class="badge">1</span>\n    Morbi leo risus\n  </li>\n</ul>'
});
WEO.Components.extend("_base", "html/listitem", {
    name: "List Item",
    classes: ["list-group-item"],
    html: '<li class="list-group-item"><span class="badge">14</span> Cras justo odio</li>'
});
WEO.Components.extend("_base", "html/breadcrumbs", {
    classes: ["breadcrumb"],
    name: "Breadcrumbs",
    image: "icons/breadcrumbs.svg",
    html: '<ol class="breadcrumb">\
		  <li class="breadcrumb-item active"><a href="#">Home</a></li>\
		  <li class="breadcrumb-item active"><a href="#">Library</a></li>\
		  <li class="breadcrumb-item active">Data 3</li>\
		</ol>'
});
WEO.Components.extend("_base", "html/breadcrumbitem", {
    classes: ["breadcrumb-item"],
    name: "Breadcrumb Item",
    html: '<li class="breadcrumb-item"><a href="#">Library</a></li>',
    properties: [{
        name: "Active",
        key: "active",
        htmlAttr: "class",
        validValues: ["", "active"],
        inputtype: ToggleInput,
        data: {
            on: "active",
            off: ""
        }
    }]
});
WEO.Components.extend("_base", "html/pagination", {
    classes: ["pagination"],
    name: "Pagination",
    image: "icons/pagination.svg",
    html: '<nav aria-label="Page navigation example">\
	  <ul class="pagination">\
		<li class="page-item"><a class="page-link" href="#">Previous</a></li>\
		<li class="page-item"><a class="page-link" href="#">1</a></li>\
		<li class="page-item"><a class="page-link" href="#">2</a></li>\
		<li class="page-item"><a class="page-link" href="#">3</a></li>\
		<li class="page-item"><a class="page-link" href="#">Next</a></li>\
	  </ul>\
	</nav>',

    properties: [{
        name: "Size",
        key: "size",
        htmlAttr: "class",
        inputtype: SelectInput,
        validValues: ["btn-lg", "btn-sm"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "btn-lg",
                text: "Large"
            }, {
                value: "btn-sm",
                text: "Small"
            }]
        }
    }, {
        name: "Alignment",
        key: "alignment",
        htmlAttr: "class",
        inputtype: SelectInput,
        validValues: ["justify-content-center", "justify-content-end"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "justify-content-center",
                text: "Center"
            }, {
                value: "justify-content-end",
                text: "Right"
            }]
        }
    }]
});
WEO.Components.extend("_base", "html/pageitem", {
    classes: ["page-item"],
    html: '<li class="page-item"><a class="page-link" href="#">1</a></li>',
    name: "Pagination Item",
    properties: [{
        name: "Link To",
        key: "href",
        htmlAttr: "href",
        child: ".page-link",
        inputtype: TextInput
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "class",
        validValues: ["disabled"],
        inputtype: ToggleInput,
        data: {
            on: "disabled",
            off: ""
        }
    }]
});
WEO.Components.extend("_base", "html/progress", {
    classes: ["progress"],
    name: "Progress Bar",
    image: "icons/progressbar.svg",
    html: '<div class="progress"><div class="progress-bar w-25"></div></div>',
    properties: [{
        name: "Background",
        key: "background",
        htmlAttr: "class",
        validValues: bgcolorClasses,
        inputtype: SelectInput,
        data: {
            options: bgcolorSelectOptions
        }
    },
    {
        name: "Progress",
        key: "background",
        child: ".progress-bar",
        htmlAttr: "class",
        validValues: ["", "w-25", "w-50", "w-75", "w-100"],
        inputtype: SelectInput,
        data: {
            options: [{
                value: "",
                text: "None"
            }, {
                value: "w-25",
                text: "25%"
            }, {
                value: "w-50",
                text: "50%"
            }, {
                value: "w-75",
                text: "75%"
            }, {
                value: "w-100",
                text: "100%"
            }]
        }
    },
    {
        name: "Progress background",
        key: "background",
        child: ".progress-bar",
        htmlAttr: "class",
        validValues: bgcolorClasses,
        inputtype: SelectInput,
        data: {
            options: bgcolorSelectOptions
        }
    }, {
        name: "Striped",
        key: "striped",
        child: ".progress-bar",
        htmlAttr: "class",
        validValues: ["", "progress-bar-striped"],
        inputtype: ToggleInput,
        data: {
            on: "progress-bar-striped",
            off: "",
        }
    }, {
        name: "Animated",
        key: "animated",
        child: ".progress-bar",
        htmlAttr: "class",
        validValues: ["", "progress-bar-animated"],
        inputtype: ToggleInput,
        data: {
            on: "progress-bar-animated",
            off: "",
        }
    }]
});
WEO.Components.extend("_base", "html/navbar", {
    classes: ["navbar"],
    image: "icons/navbar.svg",
    name: "Nav Bar",
    html: '<nav class="navbar navbar-expand-lg navbar-light bg-light">\
		  <a class="navbar-brand" href="#">Navbar</a>\
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">\
			<span class="navbar-toggler-icon"></span>\
		  </button>\
		\
		  <div class="collapse navbar-collapse" id="navbarSupportedContent">\
			<ul class="navbar-nav me-auto">\
			  <li class="nav-item active">\
				<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>\
			  </li>\
			  <li class="nav-item">\
				<a class="nav-link" href="#">Link</a>\
			  </li>\
			  <li class="nav-item">\
				<a class="nav-link disabled" href="#">Disabled</a>\
			  </li>\
			</ul>\
			<form class="form-inline my-2 my-lg-0">\
			  <input class="form-control me-sm-2" type="text" placeholder="Search" aria-label="Search">\
			  <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>\
			</form>\
		  </div>\
		</nav>',

    properties: [{
        name: "Color theme",
        key: "color",
        htmlAttr: "class",
        validValues: ["navbar-light", "navbar-dark"],
        inputtype: SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "navbar-light",
                text: "Light"
            }, {
                value: "navbar-dark",
                text: "Dark"
            }]
        }
    }, {
        name: "Background color",
        key: "background",
        htmlAttr: "class",
        validValues: bgcolorClasses,
        inputtype: SelectInput,
        data: {
            options: bgcolorSelectOptions
        }
    }, {
        name: "Placement",
        key: "placement",
        htmlAttr: "class",
        validValues: ["fixed-top", "fixed-bottom", "sticky-top"],
        inputtype: SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "fixed-top",
                text: "Fixed Top"
            }, {
                value: "fixed-bottom",
                text: "Fixed Bottom"
            }, {
                value: "sticky-top",
                text: "Sticky top"
            }]
        }
    }]
});

WEO.Components.extend("_base", "html/form", {
    nodes: ["form"],
    image: "icons/form.svg",
    name: "Form",
    html: '<form><div class="mb-3"><label>Text</label><input type="text" class="form-control"></div></div></form>',
    properties: [{
        name: "Style",
        key: "style",
        htmlAttr: "class",
        validValues: ["", "form-search", "form-inline", "form-horizontal"],
        inputtype: SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "form-search",
                text: "Search"
            }, {
                value: "form-inline",
                text: "Inline"
            }, {
                value: "form-horizontal",
                text: "Horizontal"
            }]
        }
    }, {
        name: "Action",
        key: "action",
        htmlAttr: "action",
        inputtype: TextInput
    }, {
        name: "Method",
        key: "method",
        htmlAttr: "method",
        inputtype: TextInput
    }]
});

WEO.Components.extend("_base", "html/table", {
    nodes: ["table"],
    classes: ["table"],
    image: "icons/table.svg",
    name: "Table",
    html: '<table class="table">\
		  <thead>\
			<tr>\
			  <th>#</th>\
			  <th>First Name</th>\
			  <th>Last Name</th>\
			  <th>Username</th>\
			</tr>\
		  </thead>\
		  <tbody>\
			<tr>\
			  <th scope="row">1</th>\
			  <td>Mark</td>\
			  <td>Otto</td>\
			  <td>@mdo</td>\
			</tr>\
			<tr>\
			  <th scope="row">2</th>\
			  <td>Jacob</td>\
			  <td>Thornton</td>\
			  <td>@fat</td>\
			</tr>\
			<tr>\
			  <th scope="row">3</th>\
			  <td>Larry</td>\
			  <td>the Bird</td>\
			  <td>@twitter</td>\
			</tr>\
		  </tbody>\
		</table>',
    properties: [
        {
            name: "Type",
            key: "type",
            htmlAttr: "class",
            validValues: ["table-primary", "table-secondary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-dark", "table-white"],
            inputtype: SelectInput,
            data: {
                options: [{
                    value: "Default",
                    text: ""
                }, {
                    value: "table-primary",
                    text: "Primary"
                }, {
                    value: "table-secondary",
                    text: "Secondary"
                }, {
                    value: "table-success",
                    text: "Success"
                }, {
                    value: "table-danger",
                    text: "Danger"
                }, {
                    value: "table-warning",
                    text: "Warning"
                }, {
                    value: "table-info",
                    text: "Info"
                }, {
                    value: "table-light",
                    text: "Light"
                }, {
                    value: "table-dark",
                    text: "Dark"
                }, {
                    value: "table-white",
                    text: "White"
                }]
            }
        },
        {
            name: "Responsive",
            key: "responsive",
            htmlAttr: "class",
            validValues: ["table-responsive"],
            inputtype: ToggleInput,
            data: {
                on: "table-responsive",
                off: ""
            }
        },
        {
            name: "Small",
            key: "small",
            htmlAttr: "class",
            validValues: ["table-sm"],
            inputtype: ToggleInput,
            data: {
                on: "table-sm",
                off: ""
            }
        },
        {
            name: "Hover",
            key: "hover",
            htmlAttr: "class",
            validValues: ["table-hover"],
            inputtype: ToggleInput,
            data: {
                on: "table-hover",
                off: ""
            }
        },
        {
            name: "Bordered",
            key: "bordered",
            htmlAttr: "class",
            validValues: ["table-bordered"],
            inputtype: ToggleInput,
            data: {
                on: "table-bordered",
                off: ""
            }
        },
        {
            name: "Striped",
            key: "striped",
            htmlAttr: "class",
            validValues: ["table-striped"],
            inputtype: ToggleInput,
            data: {
                on: "table-striped",
                off: ""
            }
        },
        {
            name: "Inverse",
            key: "inverse",
            htmlAttr: "class",
            validValues: ["table-inverse"],
            inputtype: ToggleInput,
            data: {
                on: "table-inverse",
                off: ""
            }
        },
        {
            name: "Head options",
            key: "head",
            htmlAttr: "class",
            child: "thead",
            inputtype: SelectInput,
            validValues: ["", "thead-inverse", "thead-default"],
            data: {
                options: [{
                    value: "",
                    text: "None"
                }, {
                    value: "thead-default",
                    text: "Default"
                }, {
                    value: "thead-inverse",
                    text: "Inverse"
                }]
            }
        }]
});
WEO.Components.extend("_base", "html/tablerow", {
    nodes: ["tr"],
    name: "Table Row",
    html: "<tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr>",
    properties: [{
        name: "Type",
        key: "type",
        htmlAttr: "class",
        inputtype: SelectInput,
        validValues: ["", "success", "danger", "warning", "active"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "success",
                text: "Success"
            }, {
                value: "error",
                text: "Error"
            }, {
                value: "warning",
                text: "Warning"
            }, {
                value: "active",
                text: "Active"
            }]
        }
    }]
});
WEO.Components.extend("_base", "html/tablecell", {
    nodes: ["td"],
    name: "Table Cell",
    html: "<td>Cell</td>"
});
WEO.Components.extend("_base", "html/tableheadercell", {
    nodes: ["th"],
    name: "Table Header Cell",
    html: "<th>Head</th>"
});
WEO.Components.extend("_base", "html/tablehead", {
    nodes: ["thead"],
    name: "Table Head",
    html: "<thead><tr><th>Head 1</th><th>Head 2</th><th>Head 3</th></tr></thead>",
    properties: [{
        name: "Type",
        key: "type",
        htmlAttr: "class",
        inputtype: SelectInput,
        validValues: ["", "success", "danger", "warning", "info"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "success",
                text: "Success"
            }, {
                value: "anger",
                text: "Error"
            }, {
                value: "warning",
                text: "Warning"
            }, {
                value: "info",
                text: "Info"
            }]
        }
    }]
});
WEO.Components.extend("_base", "html/tablebody", {
    nodes: ["tbody"],
    name: "Table Body",
    html: "<tbody><tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr></tbody>"
});

WEO.Components.add("html/gridcolumn", {
    name: "Grid Column",
    image: "icons/grid_row.svg",
    classesRegex: ["col-"],
    html: '<div class="col-sm-4"><h3>col-sm-4</h3></div>',
    properties: [{
        name: "Column",
        key: "column",
        inline: false,
        inputtype: GridInput,
        data: { hide_remove: true },

        beforeInit: function (node) {
            _class = $(node).attr("class");

            var reg = /col-([^-\$ ]*)?-?(\d+)/g;
            var match;

            while ((match = reg.exec(_class)) != null) {
                this.data["col" + ((match[1] != undefined) ? "_" + match[1] : "")] = match[2];
            }
        },

        onChange: function (node, value, input) {
            var _class = node.attr("class");

            //remove previous breakpoint column size
            _class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
            //add new column size
            if (value) _class += ' ' + input.name + '-' + value;
            node.attr("class", _class);

            return node;
        },
    }]
});
WEO.Components.add("html/gridrow", {
    name: "Grid Row",
    image: "icons/grid_row.svg",
    classes: ["row"],
    html: '<div class="row"><div class="col-sm-4"><h3>col-sm-4</h3></div><div class="col-sm-4 col-5"><h3>col-sm-4</h3></div><div class="col-sm-4"><h3>col-sm-4</h3></div></div>',
    children: [{
        name: "html/gridcolumn",
        classesRegex: ["col-"],
    }],
    beforeInit: function (node) {
        properties = [];
        var i = 0;
        var j = 0;

        $(node).find('[class*="col-"]').each(function () {
            _class = $(this).attr("class");

            var reg = /col-([^-\$ ]*)?-?(\d+)/g;
            var match;
            var data = {};

            while ((match = reg.exec(_class)) != null) {
                data["col" + ((match[1] != undefined) ? "_" + match[1] : "")] = match[2];
            }

            i++;
            properties.push({
                name: "Column " + i,
                key: "column" + i,
                //index: i - 1,
                columnNode: this,
                col: 12,
                inline: false,
                inputtype: GridInput,
                data: data,
                onChange: function (node, value, input) {

                    //column = $('[class*="col-"]:eq(' + this.index + ')', node);
                    var column = $(this.columnNode);

                    //if remove button is clicked remove column and render row properties
                    if (input.nodeName == 'BUTTON') {
                        column.remove();
                        WEO.Components.render("html/gridrow");
                        return node;
                    }

                    //if select input then change column class
                    _class = column.attr("class");

                    //remove previous breakpoint column size
                    _class = _class.replace(new RegExp(input.name + '-\\d+?'), '');
                    //add new column size
                    if (value) _class += ' ' + input.name + '-' + value;
                    column.attr("class", _class);

                    //console.log(this, node, value, input, input.name);

                    return node;
                },
            });
        });

        //remove all column properties
        this.properties = this.properties.filter(function (item) {
            return item.key.indexOf("column") === -1;
        });

        //add remaining properties to generated column properties
        properties.push(this.properties[0]);

        this.properties = properties;
        return node;
    },

    properties: [{
        name: "Column",
        key: "column1",
        inputtype: GridInput
    }, {
        name: "Column",
        key: "column1",
        inline: true,
        col: 12,
        inputtype: GridInput
    }, {
        name: "",
        key: "addChild",
        inputtype: ButtonInput,
        data: { text: "Add column", icon: "la la-plus" },
        onChange: function (node) {
            $(node).append('<div class="col-3">Col-3</div>');

            //render component properties again to include the new column inputs
            WEO.Components.render("html/gridrow");

            return node;
        }
    }]
});


WEO.Components.extend("_base", "html/paragraph", {
    nodes: ["p"],
    name: "Paragraph",
    image: "icons/paragraph.svg",
    html: '<p>Lorem ipsum</p>',
    properties: [{
        name: "Text align",
        key: "text-align",
        htmlAttr: "class",
        inline: false,
        inputtype: SelectInput,
        validValues: ["", "text-start", "text-center", "text-end"],
        inputtype: RadioButtonInput,
        data: {
            extraclass: "btn-group-sm btn-group-fullwidth",
            options: [{
                value: "",
                icon: "la la-times",
                //text: "None",
                title: "None",
                checked: true,
            }, {
                value: "text-start",
                //text: "Left",
                title: "text-start",
                icon: "la la-align-left",
                checked: false,
            }, {
                value: "text-center",
                //text: "Center",
                title: "Center",
                icon: "la la-align-center",
                checked: false,
            }, {
                value: "text-end",
                //text: "Right",
                title: "Right",
                icon: "la la-align-right",
                checked: false,
            }],
        },
    }]
});
