var db = 
[
  {
    "id":1,
    "phrase_title":"わたしはキキ",
    "phrase":"わたしはキキ、こっちは･･･",
    "description":"<b>魔女の宅急便</b>が元ネタ。",
    "appearance":"",
    "period":"",
    "links":[2]
  },
  {
    "id":2,
    "phrase_title":"ハリーポッター",
    "phrase":"ハリーポッターと･･･の･･･",
    "description":"ハリーポッターの日本語版副題が元ネタ",
    "appearance":"",
    "period":"",
    "links":[]
  }
];

$(document).ready(function(){
  //urlから言い回しidを読み込み
  var id = parseInt(get_args()["id"], 10);
  
  if(!id) {show_notfound(); return;}
  
  //jsonを読み込み
  //$.getJSON("db.json" , function(data) {
    //目的のオブジェクトを検索
    //オブジェクトを表示
    var data = search_db(id);
    if(!data) {show_notfound(); return;}
    show_content(data);
  //});
});

function search_db(id) {
  for(var i=0; i<db.length; i++)
    if(db[i].id == id) {return target=db[i];}
  return undefined;
}

function show_content(data) {
  $("#phrase_title").text(data.phrase_title);
  
  $("#phrase").html(data.phrase);
  
  if(data.description == "")
    $("#description_block").hide();
  else
    $("#description").html(data.description);
  
  if(data.appearance == "")
    $("#appearance_block").hide();
  else
    $("#appearance").html(data.description);
  
  if(data.links.length == 0)
    $("#links_block").hide();
  else
    for(var i=0; i<data.links.length; i++)
      $("#links").append($("<li>").html($("<a>").attr({"href":"index.html?id="+data.links[i]}).text(search_db(data.links[i]).phrase_title)));
}

function show_notfound() {
  $("#content").html("<p>該当する言い回しが見つかりません。</p>");
}

function get_args() {
  var args = new Object;
  var pairs = location.search.substring(1).split('&');
  for(var i=0; i<pairs.length; i++) {
      var eq = pairs[i].split('=');
      args[eq[0]] = eq[1];
  }
  return args;
}