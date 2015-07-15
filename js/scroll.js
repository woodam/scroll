var scroll = {
    initialize : function(  ){
        var wraper = $("#scroll-warper"),
            content = wraper.find(".contents"),
            warperHeight = wraper.outerHeight(true),
            contentHeight = content.outerHeight(true);

        this.content = content;
        this.srcoll = $('<div class="scroll-bar">');
        this.srcollHeight = Math.ceil((100/(contentHeight/warperHeight))/100*warperHeight);//스크롤바 크기
        this.remainderY = warperHeight- this.srcollHeight;//남아있는 스크롤거리
        this.distanceY = 40;//스크롤 한번당 이동거리
        this.srcollRatio =  1/this.remainderY*100;//스크롤바 1픽셀당 비율
        this.contentcutHeight = contentHeight - warperHeight//컨덴츠 이동해야할 높이
        this.contentRatio = 1/this.contentcutHeight*100;//컨덴츠 1픽셀당 비율
        this.srcollY = 0;
        this.contentY = 0;

        this.srcoll.appendTo(wraper).css({"height" : this.srcollHeight });
        wraper.on( "mousewheel", $.proxy( this.watchScroll, this) );
    },
    watchScroll : function( e ){
        e.preventDefault();
        e.deltaY < 0 ? this.descend() : this.climb()
    },
    descend : function( e ){
        if( this.srcollY >= this.remainderY ) return false;
        var movingDistance =  this.srcollRatio * this.distanceY / 100 * this.contentcutHeight;
        this.srcollY += 40;
        this.contentY += movingDistance;
        if( this.srcollY >= this.remainderY ){
            this.srcollY = this.remainderY;
            this.contentY = this.contentcutHeight;
        }
       this.scrollMove();
    },
    climb : function( e ){
        if( this.srcollY <= 0 ) return false;
        var movingDistance =  this.srcollRatio * this.distanceY / 100 * this.contentcutHeight;
        this.srcollY -= 40;
        this.contentY -= movingDistance;
        if( this.srcollY <= 0 ){
            this.srcollY = 0;
            this.contentY = 0;
        }
        this.scrollMove();
    },
    scrollMove : function(){
        this.srcoll.stop().animate(
            { top : this.srcollY },
            100,
            "linear"
        );
        this.content.stop().animate(
            { top : this.contentY*-1 },
            100,
            "linear"
        );
    }
}
