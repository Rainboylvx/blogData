function inter(){
    let count= 0
    let __interval = setInterval(()=>{
        console.log( "count",++count )
        let h1 = $('#h1')
        if( h1.hasClass('animate__fadeInDown'))
            h1.removeClass('animate__fadeInDown')
        else
            h1.addClass('animate__fadeInDown')
    },2000)
}

$(document).ready( function(){
    console.log( "document ready" )
    inter()
})
