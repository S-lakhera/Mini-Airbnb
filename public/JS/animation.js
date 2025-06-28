let tl = gsap.timeline();
tl.from(".navbar",{
    y:-50,
    duration:0.5,
    delay:0.15,
    opacity:0
})
 
tl.from(".fa-compass-drafting",{
    y:-110,
    duration:0.15,
    opacity:0
})
tl.from(".navbar-nav a",{
    y:-80,
    duration:0.35,
    stagger:0.1,
    opacity:0
})

tl.from("#card",{
    duration:0.5,
    opacity:0
})