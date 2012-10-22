// On-view-load initialization
function init() {
   
    $("#search").click(search);
    gadgets.window.adjustHeight();
   
}
$("li.image-button").live('click', function () {
      var curRowId = $(this).attr("id");
      if(curRowId.indexOf("DOC") != -1){
      var docID = (curRowId.substring(curRowId.lastIndexOf("-"))).substr(1);
      expandDocument(curRowId);
     }
   else
     {
     expandDiscussion(curRowId);
     }

 });
 function monthConvert(d){

  var outMonth="";
    switch (d) {
        case '01':
    outMonth= "Jan";
    break;
  case '02':
   outMonth= "Feb";
    break;
  case '03':
    outMonth= "Mar";
    break;
  case '04':
    outMonth= "Apr";
break;
case '05':
    outMonth= "May";
    break;
  case '06':
    outMonth= "Jun";
    break;
  case '07':
    outMonth= "Jul";
    break;
  case '08':
    outMonth= "Aug";
break;
case '09':
    outMonth= "Sep";
    break;
  case '10':
    outMonth= "Oct";
    break;
  case '11':
    outMonth= "Nov";
    break;
  case '12':
    outMonth= "Dec";
break;
}
return outMonth;
}
function expandDiscussion(id){

	$(".content").html("");
	$('.firstdiv').css('background-color', '#FFFFFF');
	$('#div_'+id).css('background-color', '#F2F2F2');
	console.log("Expand Row Id::: "+ id);
	var discussionMessage="";
	var correctanswer="";
	var helpfulanswer="";
	var rootmessage="";
	var myDate="";
      
	var request = osapi.jive.core.discussions.get({id: id});
	request.execute(function(response) { 
		console.log("Expanding discussion response is " + JSON.stringify(response.data));
		var discussionresult=response.data;
		
		if (response.error) {
			console.log("Error in get: "+response.error.message);
		}
		else{
			console.log("I'm inside Root Message Div");
                        rootmessage +='<div class="rootborder">';
			rootmessage +='<ul>';
			rootmessage +='<div class="link"><a href="'+discussionresult.messages.root.resources.html.ref+'" target="_apps">'+discussionresult.messages.root.subject+'</a></div>';
			rootmessage +='<div class="root">';
             	   	rootmessage +='<ul>';
                	rootmessage +='<div class="align">'+discussionresult.messages.root.content.text+'</div>';
                	rootmessage +='</ul>';
                	rootmessage +='</div>';
			rootmessage +='</ul>';
			rootmessage +='</div>';

			var request = response.data.messages.get( ) ;
			request.execute(function(response) {
			var result = response.data;
				if(!response.error) {
					
					 $.each(result, function(index, row) {
							console.log("Expanding discussion container response is " + JSON.stringify(response.data));
							var count=0;
							if(row.answer){
								myDate=row.creationDate.substr(0,10);
      								myDate=myDate.split("-");
      								dateM=myDate[1];
								var finalMonth=monthConvert(dateM);
								var newDate=finalMonth+" "+myDate[2]+","+myDate[0];							
								console.log("I'm inside expand if");
								correctanswer +='<div class="answerborder">';
								correctanswer +='<ul>';
								correctanswer +='<div class="correct">Correct Answer</div> ';
								correctanswer +='<div><img src="'+ row.author.avatarURL + '" width=\'25px\' height=\'25px\' border=\'0\'/> by ';
							        //correctanswer +='<div style="color:Green;font-weight:bold">Correct Answer </div> by ';
								correctanswer +='<a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+row.author.username+'>'+row.author.name+'</a> on '+row.creationDate+'</div>';
							//	correctanswer +='on  ' + row.creationDate+ '</li>';
								correctanswer +='<li>'+row.content.text+'</li>';
								correctanswer +='</ul>';
								correctanswer +='</div>';
								
								}
								if(row.helpful){
								myDate=row.creationDate.substr(0,10);
								myDate=myDate.split("-");
								dateM=myDate[1];
								var finalMonth=monthConvert(dateM);
								var newDate=finalMonth+" "+myDate[2]+","+myDate[0];
								console.log("I'm inside expand if");
								helpfulanswer +='<div class="answerborder">';
								helpfulanswer +='<ul>';
								helpfulanswer +='<div class="helpful">Helpful Answer </div> ';
								helpfulanswer +='<div><img src="'+ row.author.avatarURL + '" width=\'25px\' height=\'25px\' border=\'0\'/> by ';
								helpfulanswer +='<a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+row.author.username+'>'+row.author.name+'</a> on '+row.creationDate+' </div>';
								//helfulanswer +='on &nbsp;'+ row.creationDate+ '</li>';
								helpfulanswer +='<li>'+row.content.text+ '</li>';
								helpfulanswer +='</ul>';
								helpfulanswer +='</div>';
								
								}
								
							
					});
					discussionMessage +=rootmessage;
					discussionMessage +=correctanswer;
					discussionMessage +=helpfulanswer;
					console.log("Html Content:: "+discussionMessage);
					$(".content").show();
					$(".content").html(discussionMessage);

				
				}
			
			
			});
		
		}
	
	
	});
	
	

}

function expandDocument(id){
$(".content").html("");
$('.firstdiv').css('background-color', '#FFFFFF');
$('#div_'+id).css('background-color', '#F2F2F2');
console.log("You are in document section");
var request = osapi.jive.core.documents.get({id: id});
request.execute(function(response) {
console.log("Expanding document response is " + JSON.stringify(response.data));
var discussionresult=response.data;

if (response.error) {
console.log("Error in get: "+response.error.message);
}
else{
helpfulanswer +='<div>';
helpfulanswer +='<ul>';
helpfulanswer +='<li>This is document</li>';
helpfulanswer +='</ul>';
helpfulanswer +='</div>';
}
});
}
// Perform a search and display the results
function search() {
    
    $("search-results").html("");
    $(".content").html("");
   // $(".content").hide();
    gadgets.window.adjustHeight();
   /* var types = [];
    $("input:checked").each(function() {
        types.push(this.id);
    });*/
    var params = {
        //limit : $("#limit").val(),
        query : $("#query").val(),
        //sort : $("#sort-type").val(),
       // sortOrder : $("#sort-order").val()
        
        
    };

   
   /* if (types.length > 0) {
        params.type = types;
    }*/
    console.log("searching for " + JSON.stringify(params));
    osapi.jive.core.searches.searchContent(params).execute(function(response) {
       console.log("searching response is " + JSON.stringify(response));
       
        if (response.error) {
            alert(response.error.message);
        }
        else {
            var html = "";
			var blog="";
			var discussion="";
			var update="";
			var document="";
			var post="";
			
            var rows = response.data;
            var url="";
            var subject="";
            var contentSummary="";
            var author="";
            var avatar="";
            var createdDate="";           
            var replyCount="";
            var likeCount="";
            var type="";
            var username="";
            var myDate="";
            var isAnswered = 0;
            var isQuestion = 0;
           

           // var str="";

            
            
            $.each(rows, function(index, row) {
            	url=row.resources.html.ref;
		subject=row.subject;
               	contentSummary=row.contentSummary;
                author=row.author.name;
                createdDate=row.creationDate;                   
                likeCount=row.likeCount;
                replyCount=row.replyCount;
                type=row.type;
                avatar=row.author.avatarURL;
                username=row.author.username;
                  try {
                           if (row.question) {
                            isQuestion = 1;
                             }
                            else {
                              isQuestion = 0;
                                 }              
                            }
                catch (err) {
                                 isQuestion = 0;
                      }
                                     
                 try {
                    if (row.resources.answer.ref) {
                       	isAnswered = 1;
                            }
                    else {
                          isAnswered = 0;
                          }              
                       }
                  catch (err) {
                              isAnswered = 0;
                    }

                myDate=row.modificationDate.substr(0,10);                  
                myDate=myDate.split("-"); 
                dateM=myDate[1];
				var finalMonth=monthConvert(dateM);
				var newDate=finalMonth+" "+myDate[2]+","+myDate[0]; 


               if(row.type=="discussion")
               	{
               	  
		    var discussionID = (url.substring(url.lastIndexOf("/"))).substr(1);
		    var discussionImage="";
               	    if(isQuestion)
   			{
		   		if(isAnswered != 0){
					discussionImage +='<span class="jive-icon-med jive-icon-discussion-correct"></span>';
			   		}
			    	else
				{
				    discussionImage +='<span class="jive-icon-med jive-icon-discussion-question"></span>';
				}
			}
			else
			{
			   discussionImage +='<span class="jive-icon-med jive-icon-discussion"></span>';
			}
		    
                    discussion +='<div id="div_'+discussionID+'" class="firstdiv">';
                    
                    //discussion +='<p line-height:70%>';
                   // discussion +='<div>';
		    discussion +='<ul>';
                    discussion +=discussionImage+'<a href="'+url+'" target="_apps">'+subject+'</a>';                                                
                    discussion +='<li><li class="image-button" id="'+discussionID+'" ></li></li>';
                    //discussion +=<button type="button" style="float: right;" <a href="'+url+'"target="_apps">Expand</a></button></li>';
                    discussion +='</ul>';  
                   // discussion +='</div>';
                    
                    discussion +='<div class="root1">';               
                    discussion +='<ul>';                   
                    //discussion +='<li>&nbsp;</li>';
                    //  discussion +='<li>Created by<img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/>
                    discussion +='<li>Created by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                    discussion +='Date:'+newDate+'';                    
                    discussion +='<li>Replies:'+replyCount+'<li>';     
                    //console.log("Author: "+author);                   
                    discussion +='</ul>';
                    discussion +='</div>';
                    
                    discussion +='<div class="root">';                                    
                    discussion +='<ul>';                   
                    discussion +='<div class="align">'+contentSummary+'</div>';                    
                    discussion +='</ul>';
                    discussion +='</div>';
                    
                   // discussion +='<div class="root1">';                                 
                  //  discussion +='<ul>';                    
                   // discussion +='<li>Created:'+createdDate+'</li>';
                   // discussion +='Date:'+newDate+'';                    
                   // discussion +='Replies:'+replyCount+'';                  
                   // discussion +='<li>Likes:'+likeCount+'</li>';                        
                   // discussion +='</ul>';
                   // discussion +='</div>';
                     // discussion +='</ol>';
                    //discussion +='</p>';
                   //discussion +='<hr size="1" color="lightgrey">';
	            discussion +='<br>';
                   discussion +='</div>';
                    
                 //  discussion +='</div>';
                         
                 //  discussion +='<hr size="1" color="lightgrey">';
	      // discussion +='<br>';
                  
                                     
               }
               
			  if(row.type=="document")
               {
                    //var docID = (url.substring(url.lastIndexOf("-"))).substr(1);
                    // document +='<div id="div_'+docID+'" class="firstdiv"> ';
                    document +='<div>';
                    document +='<ul>';
                    document +='<li class="document" ><a href="'+url+'" target="_apps">'+subject+'</a></li>';
                    document +='</ul>';
                    
                    document +='<div class="root1">';
                    document +='<ul>';
                    //discussion +='<li>&nbsp;</li>';
                    //document +='<li>Created by<img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/>';
                    document +='<li>Created by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                    document +='Date:'+newDate+'';                  
                    document +='<li>Replies:'+replyCount+'</li>';         
                    document +='</ul>';
                    document +='</div>';
                    
                    document +='<div class="root">';     
                    document +='<ul>';                    
                    document +='<div class="align">'+contentSummary+'</div>';                   
                    document +='</ul>';
                    document +='</div>';     
                     
                   // document +='<div class="root1">';
                  //  document +='<ul>';                                       
                   // document +='<li>Created:'+createdDate+'</li>';
                  //  document +='<li>Date:'+newDate+'</li>';                  
                  //  document +='Replies:'+replyCount+'';                  
                 //   document +='<li>Likes:'+likeCount+'</li>';              
                  //  document +='</ul>';                    
                 //   document +='</div>';
                  //  document +='</div>';
                  //  document +='<hr size="1" color="lightgrey">';   
                    document +='<br>';
                     document +='</div>';
                    
                  
                  
               }
		//	   if(row.type=="update")
              // {
                   //  update +='<div>';
                  //   update +='<ul>';
                   //  update +='<li class="update" ><a href="'+url+'" target="_apps">'+contentSummary+'</a></li>';
                   //  update +='</ul>';
                    
                   //  update +='<div class="root1">';
                    // update +='<ul>';
                    ///discussion +='<li>&nbsp;</li>';
                     //update +='<li>Created by<img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/><a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                     //update +='<li>Created by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                    // update +='</ul>';
                    // update +='</div>';
                     
                     //update +='<div class="root">';     
                    // update +='<ul>';                   
                    // update +='<div class="align">'+contentSummary+'</div>';  
                    // update +='</ul>';
                    // update +='</div>';     
                   
                    // update +='<div class="root1">';
                    // update +='<ul>';                                       
                     ///update +='<li>Created:'+createdDate+'</li>';
                   //  update +='<li>Date:'+newDate+'</li>';                 
                   //  update +='Replies:'+replyCount+'';                  
                    // update +='<li>Likes:'+likeCount+'</li>';              
                    // update +='</ul>';
                   //  update +='</div>';
                    // update +='</div>';   
                   //  update +='<hr size="1" color="lightgrey">'; 
                     ///update +='<br>';
                                    
               // }
                
	            if(row.type=="post")
               {
                     post +='<div>';
	             post +='<ul>';
                     post +='<li class="post" ><a href="'+url+'" target="_apps">'+subject+'</a></li>';
                     post +='</ul>';
                    
                     post +='<div class="root1">';
                     post +='<ul>';
                    //discussion +='<li>&nbsp;</li>';
                    // post +='<li>Created by<img src="'+ avatar + '" width=\'25px\' height=\'25px\' border=\'0\'/><a href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                     post +='<li>Created by <a class="nopad" href=https://apps-onprem.jivesoftware.com/people/'+username+'>'+author+'</a></li>';
                     post +='Date:'+newDate+'';                  
                     post +='<li>Replies:'+replyCount+'</li>';        
                     post +='</ul>';
                     post +='</div>';
                     
                     post +='<div align=left>';
                     post +='<div class="root">';  
                     post +='<ul>';  
                     post +='<div class="align">'+contentSummary+'</div>';  
                     post +='</ul>';
                     post +='</div>';  
                     post +='</div>';
                   
                    // post +='<div class="root1">';
                     //post +='<ul>';                                       
                     //post +='<li>Created:'+createdDate+'</li>';
                    // post +='<li>Date:'+newDate+'</li>';                  
                    // post +='Replies:'+replyCount+'';                  
                    // post +='<li>Likes:'+likeCount+'</li>';              
                    // post +='</ul>';
                   //  post +='</div>';
                   //  post +='</div>';                
                    // post +='<hr size="1" color="lightgrey">'; 
                    post +='<br>';
               }
                                  
            });
                       
                        html +=discussion;
			html +=document;
			html +=update;
			html +=post;
				
            console.log(html);
            $("#search-results").html(html);
            $("#search-info").show();
            gadgets.window.adjustHeight();
        }
    });
}
    


// Register our on-view-load handler
gadgets.util.registerOnLoadHandler(init);
