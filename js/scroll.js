var scroll = {
    initialize : function(  ){
        var wraper = $("#scroll-warper"),
            content = wraper.find(".contents"),
            warperHeight = wraper.outerHeight(true),
            contentHeight = content.outerHeight(true);

        this.content = content;
        this.srcoll = $('<div class="scroll-bar">');
        this.srcollHeight = Math.ceil((100/(contentHeight/warperHeight))/100*warperHeight);//��ũ�ѹ� ũ��
        this.remainderY = warperHeight- this.srcollHeight;//�����ִ� ��ũ�ѰŸ�
        this.distanceY = 40;//��ũ�� �ѹ��� �̵��Ÿ�
        this.srcollRatio =  1/this.remainderY*100;//��ũ�ѹ� 1�ȼ��� ����
        this.contentcutHeight = contentHeight - warperHeight//������ �̵��ؾ��� ����
        this.contentRatio = 1/this.contentcutHeight*100;//������ 1�ȼ��� ����
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
