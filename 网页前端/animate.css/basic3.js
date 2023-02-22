function inter(){
    let count= 0
    let h1fa = $('#h1-father')
    let __interval = setInterval(()=>{
        console.log( "count",++count )
        if( h1fa.hasClass('active'))
            h1fa.removeClass('active')
        else
            h1fa.addClass('active')
    },2000)
}

$(document).ready( function(){
    console.log( "document ready" )
    inter()
})
