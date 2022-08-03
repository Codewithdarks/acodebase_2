<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>::Product example 3::</title>
    <link href="{{ asset('pageeditor/css/editor.css') }}" rel="stylesheet">
    <!-- Slick slider css CDN -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.0/slick.min.css" />
    <!-- Custom fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==" crossorigin="anonymous" referrerpolicy="no-referrer"
    />
    <!-- Custom css -->
    <link rel="stylesheet" href="{{ asset('landing_pages/template1/custom.css') }}">
</head>

<body class="bg-white">
    <!-- Header -->
    <header class="bg-white shadow-sm py-3">
        <div class="container">
            <div class="row ">
                <nav class="navbar navbar-expand-lg navbar-light  justify-content-between header-navUl pt-0 pb-0">

                    <a class="navbar-brand" href="#"><img class="img-fluid"
                            src="{{ asset('landing_pages/template1/img/logo.png') }}" alt="logo"></a>


                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul class="navbar-nav mb-2 mb-lg-0">
                            <li class="nav-item mx-2">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item mx-2">

                                <a class="nav-link" href="#">Shop</a>

                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">
                                    Sunglasses
                                </a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">Eyewears</a>
                            </li>
                            <li class="nav-item mx-2">
                                <a class="nav-link" href="#">Lenses</a>
                            </li>

                        </ul>

                    </div>

                </nav>
            </div>
        </div>

    </header>
    <!-- //Header -->
    <!-- Product Details -->

    <section data-name="product-section" class="product-section py-5 section_event" id="product-section">
        <div class="container pt-5">
            <div id="product_block">
                <div class="row">
                    <div class="col-lg-6 col-sm-12 col-md-6">
                        <div class="product-img-hldr" id="product_image">
                            <img class="img-fluid border " src="{{ asset('landing_pages/template1/img/googles.jpg') }}"
                                alt="">
                        </div>
                        <div id="product-slider-thumb"></div>
                    </div>
                    <div class="col-lg-6 col-sm-12 col-md-6 mt-sm-3 mt-md-0 mt-3">
                        <div class="product-text-hldr">
                            <div class="product-name">
                                <h2 id="product_title">Product name</h2>
                            </div>
                            <div class="product-rating d-flex align-items-center">
                                <img class="img-fluid " src="{{ asset('landing_pages/template1/img/star-rating.svg') }}"
                                    alt="" width="100">
                                <h6 class="mb-0 ms-2"> 500+ reviews</h6>
                            </div>
                            <div class="product-discription mt-3">
                                <p id="product_description">Lorem Ipsum is simply dummy text of the printing and
                                    typesetting
                                    industry. Lorem Ipsum
                                    has
                                    been the industry's standard dummy text ever since the 1500s, when an unknown
                                    printer
                                    took a
                                    galley of type and scrambled it to make a type

                                </p>
                            </div>
                            <div class="product-list-price py-3">
                                <h1 id="product_price">$95.25</h1>
                                <div class="row g-2" id="product_options">
                                    <div class="col-md-4 col-6">
                                        <label>Color</label>
                                        <select class="form-control custom_select">
                                            <option>
                                                Red
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-md-4 col-6">
                                        <label>Size</label>
                                        <select class="form-control custom_select">
                                            <option>
                                                Large
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="product_quantity">
                                    <button class="btn btn-outline-primary minus" onclick="Handler(this)"><i class="la la-minus"></i></button>
                                    <input type="number" class="quantity_input" value="1" onblur="onchangeHandler(this)">
                                    <button class="btn btn-outline-primary plus" onclick="Handler(this)"><i class="la la-plus"></i></button>
                                </div>
                            </div>
                            <div class="product-cart-action mt-3">
                                <a href="javascript:void(0)" class="btn btn-lg btn-primary d-block">Add to cart</a>
                            </div>
                            <div class="product-features mt-5">
                                <div class="accordion accordion-flush" id="accordionFlushExample">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-headingOne">
                                            <button class="accordion-button collapsed " type="button"
                                                data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                                                aria-expanded="false" aria-controls="flush-collapseOne">
                                                <h5>Product details</h5>
                                            </button>
                                        </h2>
                                        <div id="flush-collapseOne" class="accordion-collapse collapse"
                                            aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                            <div class="accordion-body">
                                                <ul>
                                                    <li>Model: R12345</li>
                                                    <li>Frame size: M</li>
                                                    <li>Frame color: Black</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-headingTwo">
                                            <button class="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo"
                                                aria-expanded="false" aria-controls="flush-collapseTwo">
                                                <h5>Shipping Details</h5>
                                            </button>
                                        </h2>
                                        <div id="flush-collapseTwo" class="accordion-collapse collapse"
                                            aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                            <div class="accordion-body">Lorem Ipsum is simply dummy text of the printing
                                                and
                                                typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                                text
                                                ever since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it
                                                to make a type specimen book. It has survived not only five centuries,
                                                but
                                                also
                                                the leap into electronic typesetting, remaining essentially unchanged.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="accordion-item">
                                        <h2 class="accordion-header" id="flush-headingThree">
                                            <button class="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#flush-collapseThree"
                                                aria-expanded="false" aria-controls="flush-collapseThree">
                                                <h5>Free exchange/return</h5>
                                            </button>
                                        </h2>
                                        <div id="flush-collapseThree" class="accordion-collapse collapse"
                                            aria-labelledby="flush-headingThree"
                                            data-bs-parent="#accordionFlushExample">
                                            <div class="accordion-body">Lorem Ipsum is simply dummy text of the printing
                                                and
                                                typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                                text
                                                ever since the 1500s, when an unknown printer took a galley of type and
                                                scrambled it
                                                to make a type specimen book. It has survived not only five centuries,
                                                but
                                                also
                                                the leap into electronic typesetting, remaining essentially unchanged.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- //Product Details -->

    <!-- product more Info -->
    <div class="container mt-5">
        <div class="py-4 row flex-row-reverse justify-content-between align-items-center">
            <div class="col-lg-6 col-md-6 col-sm-12">
                <img class="img-fluid" src="{{ asset('landing_pages/template1/img/sunglass2.jpg') }}" alt="">
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="more-text-info pe-md-5">
                    <h2>Look Sharp</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type
                        specimen book.</p>
                </div>
            </div>
        </div>
        <div class="py-4 row justify-content-between align-items-center ">
            <div class="col-lg-6 col-md-6 col-sm-12">
                <img class="img-fluid  mb-3" src="{{ asset('landing_pages/template1/img/sunglass3.jpg') }}" alt="">

            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
                <div class="more-text-info ps-md-5">
                    <h3>Chasing sunshine</h3>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                        the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley
                        of type and scrambled it to make a type
                        specimen book.</p>
                </div>
            </div>
        </div>
    </div>
    <!-- //product more Info -->
    <!-- customer review -->
    <section class="bg-light py-2 my-5">
        <div class="container mt-5 mb-5">
            <h2 class="text-center mb-4">Reviews</h2>
            <div class="row">

                <div class="col-lg-4 col-md-4 col-sm-12  ">
                    <div class="review-hldr rounded p-4 bg-white rounded mb-3 ">
                        <div class="customer-name d-flex  align-items-center">
                            <div class="client_img">
                                <img class="img-fluid" src="{{ asset('landing_pages/template1/img/avtar.png') }}"
                                    alt="">
                            </div>
                            <div class="rating-review ">
                                <h6 class="m-0">Name here</h6>
                                <div class="">
                                    <img class="img-fluid "
                                        src="{{ asset('landing_pages/template1/img/star-rating.svg') }}" alt=""
                                        width="80">
                                </div>
                            </div>

                        </div>

                        <p class="mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                            printer took a galley of type and scrambled it to make a type
                            specimen book.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12  ">
                    <div class="review-hldr  p-4 bg-white rounded">
                        <div class="customer-name d-flex align-items-center">
                            <div class="client_img">
                                <img class="img-fluid" src="{{ asset('landing_pages/template1/img/avtar.png') }}"
                                    alt="">
                            </div>
                            <div class="rating-review ">
                                <h6 class="m-0">Name here</h6>
                                <div class="">
                                    <img class="img-fluid "
                                        src="{{ asset('landing_pages/template1/img/star-rating.svg') }}" alt=""
                                        width="80">
                                </div>
                            </div>

                        </div>
                        <p class="mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                            printer took a galley of type and scrambled it to make a type
                            specimen book.</p>
                    </div>
                </div>
                <div class="col-lg-4 col-md-4 col-sm-12 ">
                    <div class="review-hldr bg-white rounded p-4 ">
                        <div class="customer-name d-flex align-items-center">
                            <div class="client_img">
                                <img class="img-fluid" src="{{ asset('landing_pages/template1/img/avtar.png') }}"
                                    alt="">
                            </div>
                            <div class="rating-review ">

                                <h6 class="m-0">Name here</h6>
                                <div class="">
                                    <img class="img-fluid "
                                        src="{{ asset('landing_pages/template1/img/star-rating.svg') }}" alt=""
                                        width="80">
                                </div>
                            </div>

                        </div>
                        <p class="mt-3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                            Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown
                            printer took a galley of type and scrambled it to make a type
                            specimen book.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- customer  review-->
    <!-- Like product -->

    <section data-name="product-card" class="product-card section_event" id="product-card">
        <div class="container bt-5 mb-5">
            <h2 class="text-center mb-5 ">You may also like</h2>
            <div class=" row " id="add_products">
                <div class="product-may-like ">
                    <div>
                        <a href="#" class="card rounded">
                            <div class="card-image">
                                <span class="card-notify-badge bg-primary text-white">New</span>
                                <img class="img-fluid" src="{{ asset('landing_pages/template1/img/googles.jpg') }}"
                                    alt="" />
                            </div>
                            <div class="card-body text-center">
                                <div class="ad-title text-dark m-auto mb-3">
                                    <h5>Lorem ipsum dolor</h5>
                                    <span>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        5.0
                                    </span>
                                </div>
                                <button class="btn btn-primary btn-lg w-100">ADD TO BAG $60.00</button>
                            </div>
                        </a>
                    </div>
                    <div>
                        <a href="#" class="card rounded">
                            <div class="card-image">
                                <span class="card-notify-badge bg-primary text-white">New</span>
                                <img class="img-fluid" src="{{ asset('landing_pages/template1/img/1.jpg') }}" alt="" />
                            </div>
                            <div class="card-body text-center">
                                <div class="ad-title text-dark m-auto mb-3">
                                    <h5>Lorem ipsum dolor</h5>
                                    <span>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        5.0
                                    </span>
                                </div>
                                <button class="btn btn-primary btn-lg w-100">ADD TO BAG $60.00</button>
                            </div>
                        </a>
                    </div>
                    <div>
                        <a href="#" class="card rounded">
                            <div class="card-image">
                                <span class="card-notify-badge bg-primary text-white">New</span>
                                <img class="img-fluid" src="{{ asset('landing_pages/template1/img/3.jpg') }}" alt="" />
                            </div>
                            <div class="card-body text-center">
                                <div class="ad-title text-dark m-auto mb-3">
                                    <h5>Lorem ipsum dolor</h5>
                                    <span>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        5.0
                                    </span>
                                </div>
                                <button class="btn btn-primary btn-lg w-100">ADD TO BAG $60.00</button>
                            </div>
                        </a>
                    </div>
                    <div>
                        <a href="#" class="card rounded">
                            <div class="card-image">
                                <span class="card-notify-badge bg-primary text-white">New</span>
                                <img class="img-fluid" src="{{ asset('landing_pages/template1/img/4.jpg') }}" alt="" />
                            </div>
                            <div class="card-body text-center">
                                <div class="ad-title text-dark m-auto mb-3">
                                    <h5>Lorem ipsum dolor</h5>
                                    <span>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        5.0
                                    </span>
                                </div>
                                <button class="btn btn-primary btn-lg w-100">ADD TO BAG $60.00</button>
                            </div>
                        </a>
                    </div>
                    <div>
                        <a href="#" class="card rounded">
                            <div class="card-image">
                                <span class="card-notify-badge bg-primary text-white">New</span>
                                <img class="img-fluid" src="{{ asset('landing_pages/template1/img/googles.jpg') }}"
                                    alt="" />
                            </div>
                            <div class="card-body text-center">
                                <div class="ad-title text-dark m-auto mb-3">
                                    <h5>Lorem ipsum dolor</h5>
                                    <span>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        <i class="la la-star text-warning"></i>
                                        5.0
                                    </span>
                                </div>
                                <button class="btn btn-primary btn-lg w-100">ADD TO BAG $60.00</button>
                            </div>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    </section>
    <!-- //Like product -->
    <!-- Footer -->

    <!-- //Footer -->

    <footer class=" border-top py-5 bg-light">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md ps-3">
                    <img class="img-fluid mb-3" src="{{ asset('landing_pages/template1/img/logo.png') }}" alt="logo"
                        width="100">
                </div>
                <div class="col-6 col-md">
                    <h5>Features</h5>
                    <ul class="list-unstyled text-small">
                        <li><a class="link-secondary" href="#">Cool stuff</a></li>
                        <li><a class="link-secondary" href="#">Random feature</a></li>
                        <li><a class="link-secondary" href="#">Team feature</a></li>
                        <li><a class="link-secondary" href="#">Stuff for developers</a></li>
                        <li><a class="link-secondary" href="#">Another one</a></li>
                        <li><a class="link-secondary" href="#">Last time</a></li>
                    </ul>
                </div>
                <div class="col-6 col-md">
                    <h5>Resources</h5>
                    <ul class="list-unstyled text-small">
                        <li><a class="link-secondary" href="#">Resource name</a></li>
                        <li><a class="link-secondary" href="#">Resource</a></li>
                        <li><a class="link-secondary" href="#">Another resource</a></li>
                        <li><a class="link-secondary" href="#">Final resource</a></li>
                    </ul>
                </div>
                <div class="col-6 col-md">
                    <h5>Resources</h5>
                    <ul class="list-unstyled text-small">
                        <li><a class="link-secondary" href="#">Business</a></li>
                        <li><a class="link-secondary" href="#">Education</a></li>
                        <li><a class="link-secondary" href="#">Government</a></li>
                        <li><a class="link-secondary" href="#">Gaming</a></li>
                    </ul>
                </div>
                <div class="col-6 col-md">
                    <h5>About</h5>
                    <ul class="list-unstyled text-small">
                        <li><a class="link-secondary" href="#">Team</a></li>
                        <li><a class="link-secondary" href="#">Locations</a></li>
                        <li><a class="link-secondary" href="#">Privacy</a></li>
                        <li><a class="link-secondary" href="#">Terms</a></li>
                    </ul>
                </div>
            </div>
            <div class="row text-center">
                <small class="d-block mb-3 text-muted">© 2017-2022. All rights reserved. </small>
            </div>
        </div>

    </footer>

    <script src="{{ asset('pageeditor/js/jquery.hotkeys.js') }}"></script>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
<script src="{{ asset('pageeditor/js/popper.min.js') }}"></script>
<script src="{{ asset('pageeditor/js/bootstrap.min.js') }}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.0/slick.min.js"></script>
    <script>
        // slick slider
        $('.product-may-like').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            fade: false,
            infinite: true,
            arrows: true,
            speed: 500,
            autoplay: true,
            prevArrow: '<div class="slick-nav prev-arrow "><i></i><svg><use xlink:href="#circle "></svg></div>',
            nextArrow: '<div class="slick-nav next-arrow "><i></i><svg><use xlink:href="#circle "></svg></div>',
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


        });
    </script>
</body>

</html>