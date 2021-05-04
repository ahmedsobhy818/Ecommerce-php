angular.module("myApp").controller("ctrl_ProductDetails", function ($scope, ProductsFactory,$location,DataTransferFactory,$timeout,settings,$routeParams) {

    $scope.ID=$routeParams.productId
    $scope.product=null;
    $scope.ShowError=false;

    var Logged=DataTransferFactory.getItem("mainScope").Logged;

    var CartItems=DataTransferFactory.getItem("mainScope").CartItems;
    var list=CartItems.filter(function(obj){return obj.product.ID==$scope.ID})
    $scope.nItems=0
    if(list.length==1){
        $scope.nItems=list[0].nItems
    }

    //$scope.showCart=false;

    ProductsFactory.getAProduct({ID:$scope.ID}).then(function (data) {
        $scope.product=data.data;
     }).catch(function (e) {
         $scope.ShowError=true;
        
        }) 

    $scope.ShowComments= $location.path().toLowerCase().indexOf("/" + $scope.ID + "/comments")>=0;
    $scope.comments=[];
    $scope.commentsDownloaded=false;
    $scope.getComments=function(){
        if($scope.commentsDownloaded)
         return;

         ProductsFactory.getProductComments({productID:$scope.ID}).then(function(data){
             $scope.comments=data.data;
             $scope.commentsDownloaded=true;
         }).catch()
    }

    $scope.$watchCollection('comments',function(){
       
            $scope.AllowAddComment= (Logged!=null) && (!$scope.ShowError) &&($scope.ShowComments) &&  ($scope.comments.filter(function(cmt){ return cmt.UserID==Logged.ID}).length==0)
       
    },true)
    $scope.$watch('[ShowError,Logged]',function(){
        console.log($scope.comments)
        $scope.AllowAddComment= (Logged!=null) && (!$scope.ShowError) &&($scope.ShowComments) &&  ($scope.comments.filter(function(cmt){ return cmt.UserID==Logged.ID}).length==0)
        $scope.ShowSignIn= (Logged==null && $scope.ShowComments )
    },true)

    if($scope.ShowComments){
        $scope.getComments();        
    }

    
    
   //$scope.ShowSignIn= (Logged==null)

    $scope.Go2Data=function(){
        
        $location.path(settings.AppName + '/ProductDetails/' + $scope.ID);
        
    }
    $scope.Go2Ratings=function(){
        
        $location.path(settings.AppName + '/ProductDetails/' + $scope.ID + "/Comments");
       
    }
    $scope.GetCmtImg=function(cmt){
        return settings.ServiceUrl + "/images/users/"+ cmt.Gender + ".png";
    }
    $scope.doLogin=function(){
        
            DataTransferFactory.getItem("mainScope").doLogIn();
    }
    $scope.getImagePath=function(productID){
    return settings.ServiceUrl + "/images/" + productID + ".jpg"
    }
    $scope.addComment=function(){
        var comment=$scope.comment

        if(comment=="" || comment==undefined || comment==null)
          return;
        var value=$('#stars-add').attr('value')
        var userID=Logged.ID
        var productID=$scope.ID

        var obj={
            "userID":userID,
            "productID":productID,
            "value":value,
            "comment":comment,
            "userName":Logged.UserName,
            "jwt":Logged.jwt
        }

     
        ProductsFactory.addComment(obj).then(function(data){
            obj.Name=Logged.Name;
            obj.Gender=Logged.Gender;
            obj.ID=0;
            obj.Value=obj.value;
            obj.Comment=obj.comment,
            obj.UserName=obj.userName,
            obj.UserID=obj.userID

           // $timeout(function(){
                $scope.comments.unshift(obj);
           // })
            //$scope.comments.unshift(obj);

            $scope.comment='';
            $('#stars-add').attr('value',0)
         
        }).catch(function(e){
            
            alert(e.data.Message)
            DataTransferFactory.getItem("mainScope").doLogOut();//818 
            Logged=null;
        })

    }
})



mod.directive("productDetails", function ($location, ProductsFactory, DataTransferFactory, $timeout,settings) {
    return {
        replace: true,
        restrict: 'AEC',
        template: `<div id="productDetailsModal" class="modal" tabindex="-1" role="dialog" ><form id="myForm">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Product's Data</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                <div class="tab tab-data" ng-hide="ShowError" ng-class="ShowComments == false?'active':''" ng-click="Go2Data()">Data</div>
                <div class="tab tab-rating" ng-hide="ShowError" ng-class="ShowComments == true?'active':''" ng-click="Go2Ratings()">Ratings</div>
                <div style="clear:both"></div>
                <div class=" alert alert-danger" ng-show="ShowError">Product Not Found.            
                </div>
                <div class="list-item"  ng-hide="ShowError||ShowComments">
                    <!--<div><img ng-src="/Ecommerce-php/images/{{product.ID}}.jpg"></div>-->
                    <div><img ng-src="{{getImagePath(product.ID)}}"></div>
                <div>
                    <div class="arabic">{{product.ArabicName}}</div>
                    <div class="name">{{product.Name}}</div>
                    <stars-reviews AutoRedraw readonly value={{product.AvgRate}} max=5 id="stars{{product.ID}}" ></stars-reviews>
                    <div>(<span>{{product.NComments}} Comments - </span> <span>{{product.AvgRate}} Average Rate  </span>)</div>
                    <div class="prices">
                        <div></div>
                    <div class="price">{{product.Price}} LE</div>
                    <div class="old-price">{{product.OldPrice}} LE</div>
                    <div></div>
                    </div>
                    <div class="NSold">{{product.NSold}} Units Sold</div>
                </div>
                       
                </div>
                <div class="AddComment" ng-show="AllowAddComment" style="border:1px solid #ccc; padding:10px;margin:20px;border-radius:5px">
                  <form >
                       <textarea ng-model="comment" placeholder="Enter Comment" class="form-control" style="display:block;width:50%;outline:none" rows=6 required></textarea>
                       <stars-reviews  value=0 max=5 id="stars-add" style="text-align:left;margin:20px 0"></stars-reviews>     
                       <Button class="btn btn-primary" ng-click="addComment()">Add Comment</Button>
                  </form>
                </div>
                <div class="sign-in" ng-show="ShowSignIn">
                 <div class="alert alert-danger">
                    You have to <span style="text-decoration:underline;cursor:pointer" ng-click="doLogin()">Log In</span> to place a comment  
                 </div>
                </div>
                <div class="CommentsContainer" ng-show="ShowComments&&!ShowError&&comments.length>0">
                
                
                <div  ng-repeat="cmt in comments" >
                  
                  <div style="border-bottom:1px solid #ccc;overflow:hidden;min-height:250px;padding:20px 10px">
                  <div class="img" style="float:left;height:50px;width:50px"><img style="height:100%;width:100%" ng-src="{{GetCmtImg(cmt)}}"></div>
                  <div style="float:left;margin-left:20px;line-height:50px"><span style="font-size:30px"> {{cmt.Name}}</span> <span style="font-size:20px"> ({{cmt.UserName}})</span> </div>
                  <div style="clear:both;margin:72px auto auto 72px;font-style: italic;font-size:30px;color:#33f"><q>{{cmt.Comment}}</q></div>
                  <stars-reviews AutoRedraw readonly value={{cmt.Value}} max=5 id="stars-comment{{cmt.ID}}" ></stars-reviews>
                  

                  </div>


                </div>
                </div>
                </div>

                <div class="CommentsContainer" ng-show="ShowComments&&!ShowError&&comments.length==0">
                <div class=" alert alert-danger">No Comments</div>
                </div>
                <div class="modal-footer">
                <div id="CartDiv" style="display:none;min-width:40%" class=" alert alert-primary" >
                 <span style="float:left;margin-right:10px;line-height:33px">   Units Added :</span> <input type=number min=0 ng-Model="nItems" class="form-control" style="width:100px;float:left;margin-right:10px">
                    <button id="btnUpdateCart" class="btn btn-primary" style="float:left;margin-right:10px">Update</button>
                    <button id="btnClearCart" class="btn btn-danger" style="float:left;margin-right:10px">Clear</button>
                  </div>    
                <button type="button" class="btn btn-primary btn-crt" ng-hide="ShowError">Add To Cart</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    
                </div>
                
                
                
                
            </div>
        </div></form>
    </div>`,
        link: function (scope, elem, attrs) {
            $(elem).modal();
            /*888
            $(elem).find('.tab').on('click',function(){
                $(this).addClass('active').siblings().removeClass('active')
                if($(this).hasClass('tab-data'))
                scope.$apply(function(){scope.ShowComments=false;});
                 // scope.$apply(function(){$location.path(settings.AppName + "/ProductDetails/" + scope.ID);})   
                else
             {
                scope.$apply(function(){scope.ShowComments=true;});
                scope.getComments()
            }
                //scope.$apply(function(){$location.path(settings.AppName + "/ProductDetails/" + scope.ID + "/Comments");})   
            })
*/
  
            $(elem).on('hidden.bs.modal', function (e) {//jquery event handler for the bootstrap modal shown in the directive

                var dataScope=DataTransferFactory.getItem('dataScope');
                var mainUrl=dataScope.currentURL
                 if (mainUrl==null)
                  mainUrl=settings.AppName 

                  var tmp=mainUrl;
                  dataScope.currentURL=null;
                  $('.modal-backdrop').fadeOut();//remove the modal overlay layout
                  $('body.modal-open').css('overflow-y','scroll')//show the body's vertical scrollbar

                scope.$apply(function () { 
                    $location.path(tmp);
                    //dataScope.currentURL=null; 
                })//closing modal causes angular path to reset
                //this statment means the following : 1- call doRoute() 2- check all variables in the scope , if any changed then refresh the ui

            })

            $(elem).find('.btn.btn-primary.btn-crt').on('click', function () {
                //scope.$apply(function () { scope.showCart=true;})
                $(elem).find('#CartDiv').fadeIn(500);
            })
            $(elem).find('#btnUpdateCart').on('click',function(){
                var mainScope=DataTransferFactory.getItem('mainScope');
                if(mainScope.CartItems.filter(function(obj){return obj.product.ID==scope.ID}).length>0)
                 mainScope.CartItems.filter(function(obj){return obj.product.ID==scope.ID})[0].nItems=scope.nItems;
                 else{
                    mainScope.CartItems.push({product:scope.product , nItems:scope.nItems})
                 }
                 //mainScope.cartChange++;
                $(elem).find('#CartDiv').fadeOut(500);
            })
            $(elem).find('#btnClearCart').on('click',function(){
                var mainScope=DataTransferFactory.getItem('mainScope');
                if(mainScope.CartItems.filter(function(obj){return obj.product.ID==scope.ID}).length>0)
                 mainScope.CartItems.filter(function(obj){return obj.product.ID==scope.ID})[0].nItems=0;
                
                 scope.nItems=0;
                 //mainScope.cartChange++;
                 $(elem).find('#CartDiv').fadeOut(500);
            })
            
        }
    }
});

