const progress=document.getElementById('progress')
const prev=document.getElementById('prev')
const next=document.getElementById('next')
const circles=document.querySelectorAll('.circle')
let currentActive=1
next.addEventListener('click',()=>{
    currentActive++
    // 如果 currentActive大于步骤条的数字 他直接等于当前步骤条的数字，也就是4
    if(currentActive>circles.length){
        currentActive=circles.length
    }
    update()
})
prev.addEventListener('click',()=>{
    currentActive--
    // 如果上一个一直点击小于1的话，值也只能是1
    if(currentActive<1){
        currentActive=1
    }
    update()
})
function update(){
    circles.forEach((circle,idx) => {
        if(idx<currentActive){
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    })
    const active=document.querySelectorAll('.active')
    progress.style.width=(active.length-1)/(circles.length-1)*100+'%'
    if(currentActive==1){
        prev.disabled=true
    }else if(currentActive===circles.length){
        next.disabled=true
    }else{
        prev.disabled=false
        next.disabled=false
    }
}