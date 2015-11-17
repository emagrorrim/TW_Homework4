var data = [];
$(document).ready(function(){
  loadJson();
});
function inputChange(){
  // Search Word
  resetSearch($('#textField').val());
  searchWords($('#textField').val());
};

function resetSearch(str) {
   $("#list").empty();
   var listdata = [];
  //  for (var i = 0; i < data.length; i++) {
  //    listdata.push(data[i]);
  //  }
   for (var i = 0; i < data.length; i++) {
     if (data[i].title.toLowerCase().indexOf(str.toLowerCase()) != -1) {
       listdata.push(data[i]);
     }
   }
   makelist(listdata);
}


function searchWords(str) {
  var titles = document.getElementsByTagName("div");
  for (var i = 0; i < titles.length; i++) {
    if (titles[i].id == "listItem") {
      var title = titles[i].firstChild;
      var reg = "/" + str + "/ig";
      title.innerHTML = title.innerHTML.replace(eval("/" + str + "/ig"),"<span id='purpleFont'>" + str + "</span>");
    }
  }
}

function makelist(listData) {
  for(var i = 0 ; i < listData.length ; i++){
    var listItem1 = document.createElement("p");
    listItem1.id = "listItemTitle";
    listItem1.innerHTML = listData[i].title;
    var listItem2 = document.createElement("p");
    listItem2.id = "listItemCreated";
    var date = new Date(parseInt(listData[i].created + "000"));
    listItem2.innerHTML = "Created@"+date.getFullYear() + "-"+(parseInt(date.getMonth())+1) + "-" + date.getDate();
    var line = document.createElement("div");
    line.id = "line";
    var list = document.getElementById("list");
    var item = document.createElement("div");
    item.id = "listItem";
    item.appendChild(listItem1);
    item.appendChild(listItem2);
    if (i != listData.length-1) {
      item.appendChild(line);
    }
    list.appendChild(item);
  }
}

function loadJson() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      var objects = eval ("(" + xhttp.responseText + ")");
      for (var i = 0;i < objects.length;i++) {
        data.push(objects[i]);
      }
      makelist(data);
    }
  };
  xhttp.open("GET", "bookmarks.json", true);
  xhttp.send();
}
