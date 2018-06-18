var db;

$(document).ready(function(){
  //urlから言い回しidを読み込み
  var id = parseInt(get_args()["id"], 10);
  
  if(!id) {show_notfound(); return;}
  
  //jsonを読み込み
  $.getJSON("db.json" , function(loaded) {
    db = loaded;

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
  
  if(!data.period)
    $("#period_block").hide();
  else {
    new Chart($("#chart"), {
      type: 'line',
      data: {
        labels: data.period.labels,
        datasets: [{
          label: '',
          backgroundColor: "rgba(14, 100, 200, 0.2)",
          borderColor: "rgba(14, 100, 200, 1)",
          data: data.period.dataset,
          fill: true,
          lineTension: 0,
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {min: 0}
          }]
        }
      }
    });
  }
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