var data = [];
$(document).ready(function(){
  loadJson();
});

function loadJson() {
  $.get("bookmarks.json", function(response){
      data = response;
      makelist(data);
    });
}

function inputChange(){
  // Search Word
  var str = $('#textField').val()
  resetList(str);
};

function resetList(str) {
   $("#list").empty();
   var listdata = [];
   for (var i = 0; i < data.length; i++) {
     if (data[i].title.toLowerCase().indexOf(str.toLowerCase()) != -1) {
       listdata.push(data[i]);
     }
   }
   makelist(listdata);
   searchWords(str);
}


function searchWords(str) {
  $("div#listItem").each(function(){
    var title = $(this).find("#listItemTitle");
    title.html(title.html().replace(eval("/" + " " + "/ig"),"&nbsp;"));
    str = str.replace(eval("/" + " " + "/ig"),"&nbsp;");
    var indexs = title.html().match(eval("/" + str + "/ig"));
    indexs = uniqueArray(indexs);
    for (var i = 0; i < indexs.length; i++) {
      indexs.indexOf(indexs[i])
      title.html(title.html().replace(eval("/" + indexs[i] + "/g"),"<span id='purpleFont'>" + indexs[i] + "</span>"));
    }
  });
}

function uniqueArray(array){
  var n = [];
  for(var i = 0; i < array.length; i++){
    if (n.indexOf(array[i]) == -1) n.push(array[i]);
  }
  return n;
}

function makelist(listData) {
  $("#searchBar").find("b").html(listData.length);
  for(var i = 0 ; i < listData.length ; i++){
    var listItem1 = $("<p></p>").text(listData[i].title);
    listItem1.attr('id','listItemTitle');
    var date = new Date(parseInt(listData[i].created + "000"));
    var listItem2 = $("<p></p>").text(
      "Created@" + date.getFullYear()
      + "-" + (parseInt(date.getMonth())+1)
      + "-" + date.getDate()
    );
    listItem2.attr('id','listItemCreated');
    var line = $("<div></div>").attr('id','line');
    var item = $("<div></div>").attr('id','listItem');
    item.append(listItem1,listItem2);
    if (i != listData.length-1) {
      item.append(line);
    }
    $("#list").append(item);
  }
}
