document.addEventListener("DOMContentLoaded", (e) => {
    gsap.registerPlugin(SplitText, CustomEase, ScrollTrigger, ScrollSmoother);
    CustomEase.create("hop", ".87, 0, .13, 1");  
    const smooth = ScrollSmoother.create({
        smooth:1.5,
        effects:true
    })
   

    const menu_btn = document.querySelector(".menu-btn")
    const Menu = document.getElementById("fullscreen-menu")
    const Menu_Img = document.querySelector(".menu-img")
    const NavLinks = document.querySelectorAll(".links-holder a")
    const Close_btn = document.querySelector(".close-btn")
    const LinkSplit = SplitText.create(NavLinks, { type:"words", mask:"words" })
    gsap.set(LinkSplit.words, { y:"100%" })
    menu_btn.addEventListener("click", () => {
        const tl = gsap.timeline()

        tl.to(Menu, { 
            y: '0%',
            // scale:1,
            duration:1,
            ease:"hop"
         })
         .to(Menu_Img, {
            clipPath:  "inset(0% 0 0 0)" ,
            duration:1.7,
            scale:1,
            ease:"hop"
         }, "-.2")
         .to(LinkSplit.words, { y:"0%", stagger:.05 }, "+.8")

         smooth.paused(true)
    })

    Close_btn.addEventListener("click", () => {
            const tl = gsap.timeline()
            tl.to(LinkSplit.words, { 
                y:"-100%",
                stagger:.05,
                })
            .to(Menu_Img, {
                clipPath: "inset(100% 0 0 0)" ,
                duration:1,
                scale:1.5,
                ease:"hop"
            }, 
            "<")
            .to(Menu, { 
                y: '-100%',
                // scale:.9,
                duration:.7,
                ease:"hop",
                onComplete:() => {
                    gsap.to(LinkSplit.words, { y:"100%" })
                    gsap.set(Menu, { y:"100%" })
                }
            },'+.4')

            smooth.paused(false)

    })


    const About = document.querySelector("#about")
    const AboutHolder = document.querySelector("#about-holder")
    const AboutText = document.querySelector(".about-text")
    const AboutOverlay = document.querySelectorAll(".about-overlay")
    gsap.set(AboutOverlay, { clipPath:"inset(0 100% 0 0)" })
    const AboutSplit = SplitText.create(AboutText, { type:'chars', mask:'chars', smartWrap:true })
    gsap.set(AboutHolder, { scale:.7, borderRadius:'50px' })
    gsap.set(AboutSplit.chars, { x:'100%' })
    const aboutTl = gsap.timeline({
        scrollTrigger:{
            trigger:About,
            start:"top top",
            scrub:true,
            pin:true
        },
        ease:'hop'
    })

     aboutTl.to(AboutHolder, { scale:1, borderRadius:'0px' })
     .to(AboutOverlay, { clipPath:"inset(0 0% 0 0)" })
     .to(AboutSplit.chars, { 
        x:'0%',
        ease:'none',
      })   


      const ProtectionCards = document.querySelectorAll('.protection-card')
      ProtectionCards.forEach((card) => {
        const h2 = card.querySelector('.title')
        const p = card.querySelector('.desc')
        const titleSplit = SplitText.create(h2, { 
            type:'lines',
            mask:'lines',
            autoSplit:true,
            onSplit:(self) => {
                gsap.from(self.lines, { 
                    y:'100%',
                    stagger:.1,
                    scrollTrigger:{
                        trigger:card,
                        start:'top 40%'
                    }
                })
            }
        })
        const descSplit = SplitText.create(p, { 
                type:'lines',
                mask:'lines',
                autoSplit:true,
                onSplit:(self) => {
                    gsap.from(self.lines, { 
                        y:'100%',
                        stagger:.08,
                        scrollTrigger:{
                            trigger:card,
                            start:'top 30%'
                        }
                    })
                }
        })
        
      })

      

     

})