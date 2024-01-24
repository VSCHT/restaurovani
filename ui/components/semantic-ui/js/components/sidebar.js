import $ from "jquery";



// $('.ui.button.toggle-burger').click(()=>{
//     console.log('click')
// })
var myEl = document.querySelectorAll('.toggle-burger');

myEl.addEventListener('click', function() {
    console.log('click');
},false);


$('.ui.sidebar').sidebar('attach events', '.toggle-burger', 'show');
$('.ui.sidebar').sidebar('attach events', '.sidebar__btn-close', 'close');
