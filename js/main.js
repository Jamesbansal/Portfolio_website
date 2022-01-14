
/*-----------------------------navigation menu--------------------------------*/

(()=>{

    const hamburgerBtn=document.querySelector(".hamburger-btn"),
    navMenu=document.querySelector(".nav-menu"),
    closeNavBtn=navMenu.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click",showNavMenu);
    closeNavBtn.addEventListener("click",hideNavMenu);

    function showNavMenu(){
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }
    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(()=>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }
    //attacch an event handler to document
    document.addEventListener("click",(event)=>{
        if(event.target.classList.contains('link-item')){
            // make sure hash has a value before overriding default behaviour
            if(event.target.hash !==""){
                //prevent default anchor click behaviour
                event.preventDefault();
                const hash=event.target.hash;
                //deactivate existing active section
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                //activate new section
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
               // deactivate existing active nav menu link-item
               navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
               navMenu.querySelector(".active").classList.remove("inner-shadow","active");
               if(navMenu.classList.contains("open")){
                      //activate new nav menu link-item
                    event.target.classList.add("active","inner-shadow");
                    event.target.classList.remove("hover-in-shadow","outer-shadow");
                    hideNavMenu();
                   
               }else{
                    let navItems= navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item)=>{
                        if(hash===item.hash){
                            //activate the nav menu link-item
                           item.classList.add("active","inner-shadow");
                            item.classList.remove("hover-in-shadow","outer-shadow");
                        }
                    })
                    fadeOutEffect();
               }
               //add hash (#) to url
               window.location.hash=hash;
            
            }
        }
    })

})();
/*--------------------------- about section tabs ----------------------------*/

(()=>{
    const aboutSection=document.querySelector(".about-section");
    tabsContainer=document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click",(event)=>{
        /*--
        --*/
        if(event.target.classList.contains("tab-item") && 
        !event.target.classList.contains("active")){
            const target=event.target.getAttribute("data-target");
            //deactivate
            tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");
            //activare
            event.target.classList.add("active","outer-shadow");
            //deactivate
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            //activate
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

 function bodyScrollingToggle(){
    document.body.classList.toggle("hidden-scrolling");
} 

/*---------------------------------------- portfolio filter and popup ----------------------*/

(()=>{
    
    const filterContainer=document.querySelector(".portfolio-filter"),
    portfolioItemsContainer=document.querySelector(".portfolio-items"),
    portfolioItems=document.querySelectorAll(".portfolio-item"),
    popup=document.querySelector(".portfolio-popup"),
    prevBtn=popup.querySelector(".pp-prev"),
    nextBtn=popup.querySelector(".pp-next"),
    closeBtn=popup.querySelector(".pp-close"),
    projectDetailsContainer=popup.querySelector(".pp-details"),
    projectDetailsBtn=popup.querySelector(".pp-project-details-btn");
    let itemIndex,slideIndex, screenshots;


    filterContainer.addEventListener("click",(event)=>{
        if(event.target.classList.contains("filter-item")&&
        !event.target.classList.contains("active")){
            
            filterContainer.querySelector(".active").classList.remove("outer-shadow","active");

            event.target.classList.add("active","outer-shadow");
            const target=event.target.getAttribute("data-target");

            portfolioItems.forEach((item)=>{
                if(target===item.getAttribute("data-category") || target==='all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    portfolioItemsContainer.addEventListener("click",(event)=>{
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem=event.target.closest(".portfolio-item-inner").parentElement;
            //get the portfolioItem index
            itemIndex=Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);

            screenshots=portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            //convert screenshots into array
    
            screenshots=screenshots.split(",");
            if(screenshots.length===1){
                prevBtn.style.display="none";
                nextBtn.style.display="none";
            }
            else{
                prevBtn.style.display="block";
                nextBtn.style.display="block";
            }
            slideIndex=0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })


   


    closeBtn.addEventListener("click",()=>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow(){
        const imgSrc=screenshots[slideIndex];
        const popupImg=popup.querySelector(".pp-img");
        //activate leader until the popupimg is loaded
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src=imgSrc;
        popupImg.onload=()=>{
            // ..DEACTIVATE LOADER
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML=(slideIndex+1) + " of " + screenshots.length;
    }

    //nextslide
    nextBtn.addEventListener("click",()=>{
        if(slideIndex === screenshots.length-1){
            slideIndex=0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
    })

    //prev slide
    prevBtn.addEventListener("click",()=>{
        if(slideIndex===0){
            slideIndex=screenshots.length-1
        }
        else{
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails(){//line 140
        //if details does not exist
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")){
            projectDetailsBtn.style.display="none";
            return;
        }
        projectDetailsBtn.style.display="block";
        //get details
        const details=portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;

        popup.querySelector(".pp-project-details").innerHTML=details;

        const title=portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;

        popup.querySelector(".pp-title h2").innerHTML=title;

        const category=portfolioItems[itemIndex].getAttribute("data-category");

        popup.querySelector(".pp-project-category").innerHTML=category.split("-").join(" ");
    }

    projectDetailsBtn.addEventListener("click",()=>{
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight=0 + "px";
        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight=projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }
    })();
    /*-------------------------------testimonial slider-------------------------------------*/
(()=>{

    const sliderContainer=document.querySelector(".testi-slider-container"),
    slides=sliderContainer.querySelectorAll(".testi-item"),
    slideWidth=sliderContainer.offsetWidth,
    prevBtn=document.querySelector(".testi-slider-nav .prev"),
    nextBtn=document.querySelector(".testi-slider-nav .next"),
    activeSlide=sliderContainer.querySelector(".testi-item.active");
    let slideIndex=Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    //set width of all slides
    slides.forEach((slide)=>{
        slide.style.width=slideWidth + "px";
    })
    //set width of slideContainer
    sliderContainer.style.width=slideWidth * slides.length + "px";

    nextBtn.addEventListener("click",()=>{
        if(slideIndex===slides.length-1){
            slideIndex=0;
        }
        else{
            slideIndex++;
        }
        slider();
    })

    prevBtn.addEventListener("click",()=>{
        if(slideIndex===0){
            slideIndex=slides.length-1;
        }
        else{
            slideIndex--;
        }
      slider();
    })
    
    function slider(){
        // deactivate existing active slides
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");
        //activate new slide
        slides[slideIndex].classList.add("active")
        sliderContainer.style.marginLeft = -(slideWidth * slideIndex ) + "px";
    }
    slider();

})();



/*------------------hide all sections except active------------------------*/

(()=>{

    const section =document.querySelectorAll(".section");
    section.forEach((section)=>{
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    })

})();


window.addEventListener("load",()=>{
    //preloader
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(()=>{
        document.querySelector(".preloader").style.display="none";
    },600)
})