
WEO.SectionsGroup['Bootstrap'] =
["bootstrap4/product-section", "bootstrap4/product-card", "bootstrap4/pricing", "bootstrap4/image-gallery", "bootstrap4/video-header", "bootstrap4/slider-header", "bootstrap4/about-team", "bootstrap4/portfolio-one-column", "bootstrap4/portfolio-two-column", "bootstrap4/portfolio-three-column", "bootstrap4/portfolio-four-column"];


// WEO.Sections.add("bootstrap4/signin-split", {
//   name: "Modern Sign In Page with Split Screen Format",
//   dragHtml: '<img src="' + WEO.baseUrl + 'icons/product.png">',
//   image: "https://assets.startbootstrap.com/img/screenshots/snippets/sign-in-split.jpg",
//   html: `
// <section data-name="sigin-split">    
// <div class="container-fluid">
//   <div class="row no-gutter">
//     <div class="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
//     <div class="col-md-8 col-lg-6">
//       <div class="login d-flex align-items-center py-5">
//         <div class="container">
//           <div class="row">
//             <div class="col-md-9 col-lg-8 mx-auto">
//               <h3 class="login-heading mb-4">Welcome back!</h3>
//               <form>
//                 <div class="form-label-group">
//                   <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
//                   <label for="inputEmail">Email address</label>
//                 </div>

//                 <div class="form-label-group">
//                   <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
//                   <label for="inputPassword">Password</label>
//                 </div>

//                 <div class="mb-3">
//                   <input type="checkbox" class="form-check-input" id="customCheck1">
//                   <label class="custom-control-label" for="customCheck1">Remember password</label>
//                 </div>
//                 <button class="btn btn-lg btn-primary btn-section btn-login text-uppercase font-weight-bold mb-2" type="submit">Sign in</button>
//                 <div class="text-center">
//                   <a class="small" href="#">Forgot password?</a></div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// <style>
// .login,
// .image {
//   min-height: 100vh;
// }

// .bg-image {
//   background-image: url('https://source.unsplash.com/WEQbe2jBg40/600x1200');
//   background-size: cover;
//   background-position: center;
// }

// .login-heading {
//   font-weight: 300;
// }

// .btn-login {
//   font-size: 0.9rem;
//   letter-spacing: 0.05rem;
//   padding: 0.75rem 1rem;
//   border-radius: 2rem;
// }

// .form-label-group {
//   position: relative;
//   margin-bottom: 1rem;
// }

// .form-label-group>input,
// .form-label-group>label {
//   padding: 1rem 1rem;
//   height: auto;
//   border-radius: 2rem;
// }

// .form-label-group>label {
//   position: absolute;
//   top: 0;
//   left: 0;
//   display: block;
//   width: 100%;
//   margin-bottom: 0;
//   line-height: 1.5;
//   color: #495057;
//   cursor: text;
//   /* Match the input under the label */
//   border: 1px solid transparent;
//   border-radius: .25rem;
//   transition: all .1s ease-in-out;
// }

// .form-label-group input::-webkit-input-placeholder {
//   color: transparent;
// }

// .form-label-group input:-ms-input-placeholder {
//   color: transparent;
// }

// .form-label-group input::-ms-input-placeholder {
//   color: transparent;
// }

// .form-label-group input::-moz-placeholder {
//   color: transparent;
// }

// .form-label-group input::placeholder {
//   color: transparent;
// }

// .form-label-group input:not(:placeholder-shown) {
//   padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
//   padding-bottom: calc(var(--input-padding-y) / 3);
// }

// .form-label-group input:not(:placeholder-shown)~label {
//   padding-top: 0.5;
//   padding-bottom: 0.5;
//   font-size: 12px;
//   color: #777;
// }
// </style>  
// </div>
// </section>
// `,
// });

WEO.Sections.add("bootstrap4/image-gallery", {
name: "Image gallery",
image: "https://assets.startbootstrap.com/img/screenshots/snippets/thumbnail-gallery.jpg",
dragHtml: '<img src="' + WEO.baseUrl + 'icons/product.png">',
html: `
<section data-name="image-gallery">    
<div class="container">

<h1 class="font-weight-light text-center text-lg-left">Thumbnail Gallery</h1>

<hr class="mt-2 mb-5">

<div class="row text-center text-lg-left">

  <div class="col-lg-3 col-md-4 col-6">
    <a href="#" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/pWkk7iiCoDM/400x300" alt="">
        </a>
  </div>
  <div class="col-lg-3 col-md-4 col-6">
    <a href="#" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/aob0ukAYfuI/400x300" alt="">
        </a>
  </div>
  <div class="col-lg-3 col-md-4 col-6">
    <a href="#" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/EUfxH-pze7s/400x300" alt="">
        </a>
  </div>
  <div class="col-lg-3 col-md-4 col-6">
    <a href="#" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/M185_qYH8vg/400x300" alt="">
        </a>
  </div>
  <div class="col-lg-3 col-md-4 col-6">
    <a href="#" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/sesveuG_rNo/400x300" alt="">
        </a>
  </div>
  <div class="col-lg-3 col-md-4 col-6">
    <a href="#" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/AvhMzHwiE_0/400x300" alt="">
        </a>
  </div>
  <div class="col-lg-3 col-md-4 col-6">
    <a href="#" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/2gYsZUmockw/400x300" alt="">
        </a>
  </div>
  <div class="col-lg-3 col-md-4 col-6">
    <a href="#" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/EMSDtjVHdQ8/400x300" alt="">
        </a>
  </div>
  <div class="col-lg-3 col-md-4 col-6">
    <a href="#" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/8mUEy0ABdNE/400x300" alt="">
        </a>
  </div>
  <div class="col-lg-3 col-md-4 col-6">
    <a href="#" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/G9Rfc1qccH4/400x300" alt="">
        </a>
  </div>
  <div class="col-lg-3 col-md-4 col-6">
    <a href="#" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/aJeH0KcFkuc/400x300" alt="">
        </a>
  </div>
  <div class="col-lg-3 col-md-4 col-6">
    <a href="#" class="d-block mb-4 h-100">
          <img class="img-fluid img-thumbnail" src="https://source.unsplash.com/p2TQ-3Bh3Oo/400x300" alt="">
        </a>
  </div>
</div>

</div>
</section>
`,
});

WEO.Sections.add("bootstrap4/slider-header", {
name: "Image Slider Header",
dragHtml: '<img src="' + WEO.baseUrl + 'icons/product.png">',
image: "https://assets.startbootstrap.com/img/screenshots/snippets/full-slider.jpg",
html: `
<header class="slider" data-name="slider">
<div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner" role="listbox">
    <!-- Slide One - Set the background image for this slide in the line below -->
    <div class="carousel-item active" style="background-image: url('https://source.unsplash.com/LAaSoL0LrYs/1920x1080')">
      <div class="carousel-caption d-none d-md-block">
        <h2 class="display-4">First Slide</h2>
        <p class="lead">This is a description for the first slide.</p>
      </div>
    </div>
    <!-- Slide Two - Set the background image for this slide in the line below -->
    <div class="carousel-item" style="background-image: url('https://source.unsplash.com/bF2vsubyHcQ/1920x1080')">
      <div class="carousel-caption d-none d-md-block">
        <h2 class="display-4">Second Slide</h2>
        <p class="lead">This is a description for the second slide.</p>
      </div>
    </div>
    <!-- Slide Three - Set the background image for this slide in the line below -->
    <div class="carousel-item" style="background-image: url('https://source.unsplash.com/szFUQoyvrxM/1920x1080')">
      <div class="carousel-caption d-none d-md-block">
        <h2 class="display-4">Third Slide</h2>
        <p class="lead">This is a description for the third slide.</p>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
</div>
  
<style>
.carousel-item {
height: 100vh;
min-height: 350px;
background: no-repeat center center scroll;
-webkit-background-size: cover;
-moz-background-size: cover;
-o-background-size: cover;
background-size: cover;
}
</style>  
</header>
`,
});


WEO.Sections.add("bootstrap4/video-header", {
name: "Video Header",
dragHtml: '<img src="' + WEO.baseUrl + 'icons/image.svg">',
image: "https://assets.startbootstrap.com/img/screenshots/snippets/video-header.jpg",
html: `
<header class="video" data-name="header-video">
<div class="overlay"></div>
<video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
  <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4">
</video>
<div class="container h-100">
  <div class="d-flex h-100 text-center align-items-center">
    <div class="w-100 text-white">
      <h1 class="display-3">Video Header</h1>
      <p class="lead mb-0">With HTML5 Video and Bootstrap 4</p>
    </div>
  </div>
</div>


<div class="my-5">
<div class="container">
  <div class="row">
    <div class="col-md-8 mx-auto">
      <p>The HTML5 video element uses an mp4 video as a source. Change the source video to add in your own background! The header text is vertically centered using flex utilities that are build into Bootstrap 4.</p>
    </div>
  </div>
</div>
</div>
<style>
header.video {
position: relative;
background-color: black;
height: 75vh;
min-height: 25rem;
width: 100%;
overflow: hidden;
}

header.video video {
position: absolute;
top: 50%;
left: 50%;
min-width: 100%;
min-height: 100%;
width: auto;
height: auto;
z-index: 0;
-ms-transform: translateX(-50%) translateY(-50%);
-moz-transform: translateX(-50%) translateY(-50%);
-webkit-transform: translateX(-50%) translateY(-50%);
transform: translateX(-50%) translateY(-50%);
}

header.video .container {
position: relative;
z-index: 2;
}

header.video .overlay {
/*position: absolute;*/
top: 0;
left: 0;
height: 100%;
width: 100%;
background-color: black;
opacity: 0.5;
z-index: 1;
}

@media (pointer: coarse) and (hover: none) {
header {
  background: url('https://source.unsplash.com/XT5OInaElMw/1600x900') black no-repeat center center scroll;
}
header video {
  display: none;
}
}
</style>
</header>
`,
});



WEO.Sections.add("bootstrap4/about-team", {
name: "About and Team Section",
dragHtml: '<img src="' + WEO.baseUrl + 'icons/image.svg">',
image: "https://assets.startbootstrap.com/img/screenshots/snippets/about-team.jpg",
html: `
<section data-name="about-team">    
<header class="bg-primary text-center py-5 mb-4">
<div class="container">
  <h1 class="font-weight-light text-white">Meet the Team</h1>
</div>
</header>

<div class="container">
<div class="row">
  <!-- Team Member 1 -->
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-0 shadow">
      <img src="https://source.unsplash.com/TMgQMXoglsM/500x350" class="card-img-top" alt="...">
      <div class="card-body text-center">
        <h5 class="card-title mb-0">Team Member</h5>
        <div class="card-text text-black-50">Web Developer</div>
      </div>
    </div>
  </div>
  <!-- Team Member 2 -->
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-0 shadow">
      <img src="https://source.unsplash.com/9UVmlIb0wJU/500x350" class="card-img-top" alt="...">
      <div class="card-body text-center">
        <h5 class="card-title mb-0">Team Member</h5>
        <div class="card-text text-black-50">Web Developer</div>
      </div>
    </div>
  </div>
  <!-- Team Member 3 -->
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-0 shadow">
      <img src="https://source.unsplash.com/sNut2MqSmds/500x350" class="card-img-top" alt="...">
      <div class="card-body text-center">
        <h5 class="card-title mb-0">Team Member</h5>
        <div class="card-text text-black-50">Web Developer</div>
      </div>
    </div>
  </div>
  <!-- Team Member 4 -->
  <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-0 shadow">
      <img src="https://source.unsplash.com/ZI6p3i9SbVU/500x350" class="card-img-top" alt="...">
      <div class="card-body text-center">
        <h5 class="card-title mb-0">Team Member</h5>
        <div class="card-text text-black-50">Web Developer</div>
      </div>
    </div>
  </div>
</div>
<!-- /.row -->

</div>
</section>
`,
});



WEO.Sections.add("bootstrap4/portfolio-one-column", {
name: "One Column Portfolio Layout",
dragHtml: '<img src="' + WEO.baseUrl + 'icons/image.svg">',
image: "https://assets.startbootstrap.com/img/screenshots/snippets/portfolio-one-column.jpg",
html: `
<section data-name="portfolion-one-column">    
  <div class="container">

    <!-- Page Heading -->
    <h1 class="my-4">Page Heading
      <small>Secondary Text</small>
    </h1>

    <!-- Project One -->
    <div class="row">
      <div class="col-md-7">
        <a href="#">
          <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">
        </a>
      </div>
      <div class="col-md-5">
        <h3>Project One</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium veniam exercitationem expedita laborum at voluptate. Labore, voluptates totam at aut nemo deserunt rem magni pariatur quos perspiciatis atque eveniet unde.</p>
        <a class="btn btn-primary" href="#">View Project</a>
      </div>
    </div>
    <!-- /.row -->

    <hr>

    <!-- Project Two -->
    <div class="row">
      <div class="col-md-7">
        <a href="#">
          <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">
        </a>
      </div>
      <div class="col-md-5">
        <h3>Project Two</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, odit velit cumque vero doloremque repellendus distinctio maiores rem expedita a nam vitae modi quidem similique ducimus! Velit, esse totam tempore.</p>
        <a class="btn btn-primary" href="#">View Project</a>
      </div>
    </div>
    <!-- /.row -->

    <hr>

    <!-- Project Three -->
    <div class="row">
      <div class="col-md-7">
        <a href="#">
          <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">
        </a>
      </div>
      <div class="col-md-5">
        <h3>Project Three</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, temporibus, dolores, at, praesentium ut unde repudiandae voluptatum sit ab debitis suscipit fugiat natus velit excepturi amet commodi deleniti alias possimus!</p>
        <a class="btn btn-primary" href="#">View Project</a>
      </div>
    </div>
    <!-- /.row -->

    <hr>

    <!-- Project Four -->
    <div class="row">

      <div class="col-md-7">
        <a href="#">
          <img class="img-fluid rounded mb-3 mb-md-0" src="http://placehold.it/700x300" alt="">
        </a>
      </div>
      <div class="col-md-5">
        <h3>Project Four</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, quidem, consectetur, officia rem officiis illum aliquam perspiciatis aspernatur quod modi hic nemo qui soluta aut eius fugit quam in suscipit?</p>
        <a class="btn btn-primary" href="#">View Project</a>
      </div>
    </div>
    <!-- /.row -->

    <hr>

    <!-- Pagination -->
    <ul class="pagination justify-content-center">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">1</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">2</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#">3</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
      </li>
    </ul>

  </div>
</section>    
`,
});



WEO.Sections.add("bootstrap4/portfolio-two-column", {
name: "Two Column Portfolio Layout",
dragHtml: '<img src="' + WEO.baseUrl + 'icons/image.svg">',
image: "https://assets.startbootstrap.com/img/screenshots/snippets/portfolio-one-column.jpg",
html: `
<section data-name="portfolio-two-column">    
<div class="container">

<!-- Page Heading -->
<h1 class="my-4">Page Heading
  <small>Secondary Text</small>
</h1>

<div class="row">
  <div class="col-lg-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project One</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
      </div>
    </div>
  </div>
  <div class="col-lg-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Two</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit aliquam aperiam nulla perferendis dolor nobis numquam, rem expedita, aliquid optio, alias illum eaque. Non magni, voluptates quae, necessitatibus unde temporibus.</p>
      </div>
    </div>
  </div>
  <div class="col-lg-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Three</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
      </div>
    </div>
  </div>
  <div class="col-lg-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Four</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit aliquam aperiam nulla perferendis dolor nobis numquam, rem expedita, aliquid optio, alias illum eaque. Non magni, voluptates quae, necessitatibus unde temporibus.</p>
      </div>
    </div>
  </div>
  <div class="col-lg-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Five</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
      </div>
    </div>
  </div>
  <div class="col-lg-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Six</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit aliquam aperiam nulla perferendis dolor nobis numquam, rem expedita, aliquid optio, alias illum eaque. Non magni, voluptates quae, necessitatibus unde temporibus.</p>
      </div>
    </div>
  </div>
</div>
<!-- /.row -->

<!-- Pagination -->
<ul class="pagination justify-content-center">
  <li class="page-item">
    <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">1</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">2</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">3</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
  </li>
</ul>

</div>
</section>
`,
});

WEO.Sections.add("bootstrap4/portfolio-three-column", {
name: "Three Column Portfolio Layout",
dragHtml: '<img src="' + WEO.baseUrl + 'icons/image.svg">',
image: "https://assets.startbootstrap.com/img/screenshots/snippets/portfolio-three-column.jpg",
html: `
<section data-name="portfolio-three-column">    
<div class="container">

<!-- Page Heading -->
<h1 class="my-4">Page Heading
  <small>Secondary Text</small>
</h1>

<div class="row">
  <div class="col-lg-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project One</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!</p>
      </div>
    </div>
  </div>
  <div class="col-lg-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Two</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
      </div>
    </div>
  </div>
  <div class="col-lg-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Three</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus et facere atque iure perspiciatis mollitia recusandae vero vel quam!</p>
      </div>
    </div>
  </div>
  <div class="col-lg-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Four</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
      </div>
    </div>
  </div>
  <div class="col-lg-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Five</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
      </div>
    </div>
  </div>
  <div class="col-lg-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Six</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
      </div>
    </div>
  </div>
</div>
<!-- /.row -->

<!-- Pagination -->
<ul class="pagination justify-content-center">
  <li class="page-item">
    <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">1</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">2</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">3</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
  </li>
</ul>

</div>
</section>`,
});


WEO.Sections.add("bootstrap4/portfolio-four-column", {
name: "Four Column Portfolio Layout",
dragHtml: '<img src="' + WEO.baseUrl + 'icons/image.svg">',
image: "https://assets.startbootstrap.com/img/screenshots/snippets/portfolio-four-column.jpg",
html: `
<section data-name="portfolio-four-column">
<div class="container">

<!-- Page Heading -->
<h1 class="my-4">Page Heading
  <small>Secondary Text</small>
</h1>

<div class="row">
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project One</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam aspernatur eum quasi sapiente nesciunt? Voluptatibus sit, repellat sequi itaque deserunt, dolores in, nesciunt, illum tempora ex quae? Nihil, dolorem!</p>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Two</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Three</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos quisquam, error quod sed cumque, odio distinctio velit nostrum temporibus necessitatibus et facere atque iure perspiciatis mollitia recusandae vero vel quam!</p>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Four</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Five</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Six</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque earum nostrum suscipit ducimus nihil provident, perferendis rem illo, voluptate atque, sit eius in voluptates, nemo repellat fugiat excepturi! Nemo, esse.</p>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Seven</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra euismod odio, gravida pellentesque urna varius vitae.</p>
      </div>
    </div>
  </div>
  <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
    <div class="card h-100">
      <a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
        <h4 class="card-title">
          <a href="#">Project Eight</a>
        </h4>
        <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius adipisci dicta dignissimos neque animi ea, veritatis, provident hic consequatur ut esse! Commodi ea consequatur accusantium, beatae qui deserunt tenetur ipsa.</p>
      </div>
    </div>
  </div>
</div>
<!-- /.row -->

<!-- Pagination -->
<ul class="pagination justify-content-center">
  <li class="page-item">
    <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
          <span class="sr-only">Previous</span>
        </a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">1</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">2</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#">3</a>
  </li>
  <li class="page-item">
    <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
          <span class="sr-only">Next</span>
        </a>
  </li>
</ul>

</div>
<section>
`,
});

WEO.Sections.add("bootstrap4/product-card", {
name: "Product Cards",
dragHtml: '<img src="' + WEO.baseUrl + 'icons/image.svg">',
image: "http://122.160.61.100/design/builder/v3/img/product-section2.jpg",
html: `
<section data-name="product-card" class="product-card section_event" id="product-card">
<div class="container">
<div class="row ads products" id="add_products">
<div class="col-md-4 mb-4">
    <a href="#" class="card rounded">
        <div class="card-image">
            <span class="card-notify-badge bg-primary text-white">New</span>
            <img class="img-fluid" src="https://imageonthefly.autodatadirect.com/images/?USER=eDealer&PW=edealer872&IMG=USC80HOC011A021001.jpg&width=440&height=262" alt="Alternate Text" />
        </div>
        <div class="card-body text-center">
            <div class="ad-title text-dark m-auto">
            <h5>Lorem ipsum dolor</h5>
            <div class="d-flex justify-content-between py-2">
                <span>
                <i class="la la-star text-warning"></i>
                <i class="la la-star text-warning"></i>
                <i class="la la-star text-warning"></i>
                <i class="la la-star text-warning"></i>
                <i class="la la-star text-warning"></i>
                5.0
                </span>
                <h5>$60.00</h5>
            </div>
            </div>
            <button class="btn btn-primary btn-lg btn-rounded w-100">ADD TO BAG</button>
        </div>
    </a>
</div>
<div class="col-md-4">
    <a href="#" class="card rounded">
        <div class="card-image">
            <span class="card-notify-badge bg-primary text-white">Top seller</span>
            <img class="img-fluid" src="https://imageonthefly.autodatadirect.com/images/?USER=eDealer&PW=edealer872&IMG=USC80HOC011A021001.jpg&width=440&height=262" alt="Alternate Text" />
        </div>
        <div class="card-body text-center">
            <div class="ad-title text-dark m-auto">
            <h5>Lorem ipsum dolor</h5>
            <div class="d-flex justify-content-between py-2">
                <span>
                <i class="la la-star text-warning"></i>
                <i class="la la-star text-warning"></i>
                <i class="la la-star text-warning"></i>
                <i class="la la-star text-warning"></i>
                <i class="la la-star text-warning"></i>
                5.0
                </span>
                <h5>$60.00</h5>
            </div>
            </div>
            <button class="btn btn-primary btn-lg btn-rounded w-100">ADD TO BAG</button>
        </div>
    </a>
</div>

<div class="col-md-4">
    <a href="#" class="card rounded">
        <div class="card-image">
            <img class="img-fluid" src="https://imageonthefly.autodatadirect.com/images/?USER=eDealer&PW=edealer872&IMG=USC80HOC011A021001.jpg&width=440&height=262" alt="Alternate Text" />
        </div>
        <div class="card-body text-center">
            <div class="ad-title text-dark m-auto">
            <h5>Lorem ipsum dolor</h5>
            <div class="d-flex justify-content-between py-2">
                <span>
                <i class="la la-star text-warning"></i>
                <i class="la la-star text-warning"></i>
                <i class="la la-star text-warning"></i>
                <i class="la la-star text-warning"></i>
                <i class="la la-star text-warning"></i>
                5.0
                </span>
                <h5>$60.00</h5>
            </div>
            </div>
            <button class="btn btn-primary btn-lg btn-rounded w-100">ADD TO BAG</button>
        </div>
    </a>
</div>
</div>
</section>

<style>
.ads {
margin: 30px 0 30px 0;

}
.product-card .card{
height: 100%;
}

.ads .card-notify-badge {
  position: absolute;
  left: 10px;
  top: -12px;
  text-align: center;
  border-radius: 30px;
  padding: 3px 10px;
  font-size: 12px;
}

.ads .card-notify-year {
    position: absolute;
    right: -10px;
    top: -20px;
    background: #ff4444;
    border-radius: 50%;
    text-align: center;
    color: #fff;      
    font-size: 14px;      
    width: 50px;
    height: 50px;    
    padding: 15px 0 0 0;
}


.ads .card-detail-badge {      
    background: #f2d900;
    text-align: center;
    border-radius: 30px 30px 30px 30px;
    color: #000;
    padding: 5px 10px;
    font-size: 14px;        
}
.ads .card-image-overlay {
    font-size: 20px;
    
}


.ads .card-image-overlay span {
        display: inline-block;              
    }


.ads .ad-btn {
    text-transform: uppercase;
    width: 150px;
    height: 40px;
    border-radius: 80px;
    font-size: 16px;
    line-height: 35px;
    text-align: center;
    border: 3px solid #e6de08;
    display: block;
    text-decoration: none;
    margin: 20px auto 1px auto;
    color: #000;
    overflow: hidden;        
    position: relative;
    background-color: #e6de08;
}

.ads .ad-btn:hover {
        background-color: #e6de08;
        color: #1e1717;
        border: 2px solid #e6de08;
        background: transparent;
        transition: all 0.3s ease;
        box-shadow: 12px 15px 20px 0px rgba(46,61,73,0.15);
    }


</style>    
`,
});

WEO.Sections.add("bootstrap4/product-section", {
name: "Product section",
dragHtml: '<img src="' + WEO.baseUrl + 'icons/image.svg">',
image: "http://122.160.61.100/design/builder/v3/img/product-section.jpg",
html: `
<section data-name="product-section" class="product-section py-5 section_event" id="product-section">
<div class="container">
<div id="product_block">
<div class="row">
  <div class="col-md-6">
    <div class="product_image" id="product_image">
      <img src="https://images.unsplash.com/photo-1563298723-dcfebaa392e3" alt="" class="">
    </div>
    <div id="product-slider-thumb"></div>
  </div>
  <div class="col-md-6">
    <div class="product_description">
      <h4 id="product_title">Product title</h4>
      <p id="product_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur</p>
      <h4 id="product_price">$40.00</h4>
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
      <form action="/cart/add" method="post">
      <div class="" id="product_variations"></div>
      <div class="product_quantity">
          <button class="btn btn-outline-primary minus" onclick="Handler(this)"><i class="la la-minus"></i></button>
          <input type="number" class="quantity_input" name="quantity" id="quantity" value="1" onblur="onchangeHandler(this)">
          <button class="btn btn-outline-primary plus" onclick="Handler(this)"><i class="la la-plus"></i></button>
      </div>
      <button type="submit" class="btn btn-primary mt-3 btn-lg add-to-cart w-100">Add to cart</button>
      </form>
    </div>
  </div>
  </div>
  
</div>
<!-- /.row -->
</div>


</section>
<style>
.product_image img{width:100%}
.btn-block{width: 100%}
.product-section{
position: relative;
}
.product-section *{
  pointer-event: none;
}
</style>
`,
});



WEO.Sections.add("bootstrap4/pricing", {
name: "Subscription",
image: "http://122.160.61.100/design/builder/v3/img/product-section3.jpg",
html: `
<section data-name="subscription" class="subscription section_event" id="subscription">
<div class="container">
<div class="row products" id="add_products2">

<!-- item -->
<div class="col-md-4 mb-3 text-center">
  <div class="card rounded">
    <div class="card-image">
        <img class="img-fluid" src="https://imageonthefly.autodatadirect.com/images/?USER=eDealer&PW=edealer872&IMG=USC80HOC011A021001.jpg&width=440&height=262" alt="Alternate Text" />
    </div>
    <div class="card-body text-center">
        <div class="ad-title text-dark m-auto">
            <h5>Lorem ipsum dolor</h5>
            <h2 class="mt-2 mb-0"><strong>$20 / Month</strong></h2>
            <div class="product_quantity">
              <button class="btn btn-outline-primary minus"><i class="la la-minus"></i></button>
              <input type="number" class="quantity_input" value="1">
              <button class="btn btn-outline-primary plus"><i class="la la-plus"></i></button>
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
</div>  

<!-- item -->
<div class="col-md-4 mb-3 text-center">
  <div class="card rounded">
    <div class="card-image">
        <img class="img-fluid" src="https://imageonthefly.autodatadirect.com/images/?USER=eDealer&PW=edealer872&IMG=USC80HOC011A021001.jpg&width=440&height=262" alt="Alternate Text" />
    </div>
    <div class="card-body text-center">
        <div class="ad-title text-dark m-auto">
            <h5>Lorem ipsum dolor</h5>
            <h2 class="mt-2 mb-0"><strong>$25 / Month</strong></h2>
            <div class="product_quantity">
              <button class="btn btn-outline-primary minus"><i class="la la-minus"></i></button>
              <input type="number" class="quantity_input" value="1">
              <button class="btn btn-outline-primary plus"><i class="la la-plus"></i></button>
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
</div>  
<!-- item -->
<div class="col-md-4 mb-3 text-center">
  <div class="card rounded">
    <div class="card-image">
        <img class="img-fluid" src="https://imageonthefly.autodatadirect.com/images/?USER=eDealer&PW=edealer872&IMG=USC80HOC011A021001.jpg&width=440&height=262" alt="Alternate Text" />
    </div>
    <div class="card-body text-center">
        <div class="ad-title text-dark m-auto">
            <h5>Lorem ipsum dolor</h5>
            <h2 class="mt-2 mb-0"><strong>$30 / Month</strong></h2>
            <div class="product_quantity">
              <button class="btn btn-outline-primary minus"><i class="la la-minus"></i></button>
              <input type="number" class="quantity_input" value="1">
              <button class="btn btn-outline-primary plus"><i class="la la-plus"></i></button>
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
</div>  
</div>
</section>
<style>
.product_quantity {
display: flex;
justify-content: center;
align-content: center;
padding: 20px 0 10px;
}
.product_quantity > .btn {
width: 40px;
}
.product_quantity .quantity_input {
width: 70px;
margin: 0 5px;
border: #ccc 1px solid;
border-radius: 0.25rem;
text-align: center;
padding: 0 10px;
}
.subscription .list-group-item{
border-width: 0 0 1px;
}
</style>
</div>
`,
});