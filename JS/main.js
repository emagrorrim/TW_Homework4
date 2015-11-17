var data = [];
$(document).ready(function(){
  loadJson();
});
function inputChange(){
  // Search Word
  resetSearch();
  searchWords($('#textField').val());
};

function resetSearch() {
  var titles = document.getElementsByTagName("p");
  var j = 0;
  for (var i = 0; i < titles.length; i++) {
    if (titles[i].id == "listItemTitle") {
      // str = "<span id=\"purpleFont\">";
      // titles[i].innerHTML = titles[i].innerHTML.replace(str,"");
      // titles[i].innerHTML = titles[i].innerHTML.replace("</span>","");
      titles[i].innerHTML = data[j].title;
      j++;
    }
  }
}


function searchWords(str) {
  var titles = document.getElementsByTagName("p");
  for (var i = 0; i < titles.length; i++) {
    if (titles[i].id == "listItemTitle") {
      var reg = "/" + str + "/ig"
      titles[i].innerHTML = titles[i].innerHTML.replace(eval("/" + str + "/ig"),"<span id='purpleFont'>" + str + "</span>");

    }
  }
}

function makelist() {
  var listData = data;
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
    list.appendChild(listItem1);
    list.appendChild(listItem2);
    if (i != listData.length-1) {
      list.appendChild(line);
    }
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
      makelist();
    }
  };
  xhttp.open("GET", "bookmarks.json", true);
  xhttp.send();
}
