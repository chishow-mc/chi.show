+++
title = "Members"
type = "page"
+++


<section class="section" id="online-users">
    <div class="container">
        <h1 class="title">オンラインユーザー</h1>
        <h2 class="subtitle">現在池沼鯖でプレイ中のユーザー</h2>
        <div class="columns is-multiline is-mobile" id="online-users-list">
        </div>
    </div>
</section>

<section class="section" id="whitelist-users">
    <div class="container">
        <h1 class="title">ホワイトリストユーザー</h1>
        <h2 class="subtitle">池沼鯖に参加しているユーザー</h2>
        <div class="columns is-multiline is-mobile" id="whitelist-users-list">
        </div>
    </div>
</section>

<script>
(window.onload = function() {
    function paddingZero(n) {
        return n > 9 ? n : '0' + n;
    }
    function minecraft_uuid2twitter_sn(uuid){
        var array = [
          { "0fba512a-44dd-4ec4-9ef6-ecb2aa28c38e" :"s0baco" },
          { "f7a3fc3d-f13b-46b6-8d48-d06de506cdb5" :"s0baco" },
          { "df96c622-655d-41d2-ac73-39a8ee195104" :"CUP_dadapo" },
          { "58f12a1c-1989-4f3b-9182-1ff23bd5d251" :"nagisberry" },
          { "e8e2ea61-af44-468d-9bd6-6f6903c110dd" :"eai04191" },
          { "efcd84f7-65c7-4803-ad2e-6f7b6fa7a66c" :"nagisberry" },
          { "d6692e9d-4ea1-4074-ba74-14f013b8db37" :"benntann_RX" },
          { "2cc26e6b-4fc0-4086-8527-0753fb48d5d3" :"Angelfall1229" },
          { "8a030347-3955-4899-98ea-f9fc0bfa079f" :"automatic_penis" },
          { "593fd0a2-482d-46ee-b9a8-980414a5e9d7" :"IV_C_LI" },
          { "4993972d-3d99-4f77-b490-c13aac5575dc" :"nanase_coder" },
          { "d723b514-850a-44ad-a5bc-474d633275c2" :"fumieval" },
          { "bd117a60-8b8f-4704-bf46-0fbdd5c84a56" :"su2ca" },
          { "d9b34348-01f2-449a-8e03-5dbc3fce21e9" :"CUP_dadapo" },
          { "4f112cce-e958-4ffc-b672-72e2804853cb" :"eai04191" }
        ];
        for(var i = 0; i < array.length; i++) {
            if(array[i][uuid] !== undefined){
                return(array[i][uuid]);
            }
        }
    }

    function subaccount_check(uuid) {
        var array = [
          { "0fba512a-44dd-4ec4-9ef6-ecb2aa28c38e" :true },
          { "efcd84f7-65c7-4803-ad2e-6f7b6fa7a66c" :true },
          { "d9b34348-01f2-449a-8e03-5dbc3fce21e9" :true },
          { "4f112cce-e958-4ffc-b672-72e2804853cb" :true }
        ];
        for(var i = 0; i < array.length; i++) {
            if(array[i][uuid] !== undefined){
                return(array[i][uuid]);
            }
        }
    }

    $.ajax({
        type: 'GET',
        url: 'http://api.chi.show/v1/',
        dataType: 'json',
        success: function(json) {
            var len = json["stats_players"].length;
            $("#whitelist-users h2").append(' (' + len + '人)');
            json["stats_players"].sort(
                function(a, b) {
                    var aName = a["login_time"];
                    var bName = b["login_time"];
                    if (aName < bName) return 1;
                    if (aName > bName) return -1;
                    return 0;
                }
            );

            for (var i = 0; i < len; i++) {
                var name = json["stats_players"][i].name;
                if(name == "Eai"){
                    name = name + '<span class="tag is-success">OP</span>';
                }
                var uuid = json["stats_players"][i].uuid;
                var twitter_sn = minecraft_uuid2twitter_sn(uuid);
                if(twitter_sn == undefined){
                    var twitter_tag = "";
                }else {
                    var twitter_tag = '<p class="subtitle is-6"><a href="https://twitter.com/' + twitter_sn + '">@' + twitter_sn + '</a></p>';
                }
                var subaccount = subaccount_check(uuid);
                if(subaccount == undefined){
                    var subaccount_tag = "";
                }else {
                    var subaccount_tag = '<span class="subaccount">Sub</span>';
                }
                var bust_url = "https://visage.surgeplay.com/bust/512/" + uuid;
                var icon = "https://visage.surgeplay.com/head/512/" + uuid + "";
                var exp_level = json["stats_players"][i].exp_level;
                var exp_perc = new Big(json["stats_players"][i].exp_perc).times(100);
                var food_level = paddingZero(json["stats_players"][i].food_level);
                var health = paddingZero(Math.floor(json["stats_players"][i].health));
                var armor = paddingZero(Math.floor(json["stats_players"][i].armor_rating));
                var playtime = moment(moment() + moment(json["stats_players"][i].playtime, "X")).diff(moment(), 'hours');
                var login_time = moment.unix(json["stats_players"][i].login_time).fromNow();

                var playerdata =
                    '<div class="card column is-12-mobile is-one-third-tablet is-one-quarter-desktop" data-uuid="' + uuid + '">' +
                        '<div class="card-image">' +
                            '<figure class="image is-square">' +
                              '<img class="bust" src="' + bust_url + '">' +
                            '</figure>' +
                        '</div>' +
                        '<div class="card-content">' +
                        subaccount_tag + 
                            '<div class="media">' + 
                                '<div class="media-left">' + 
                                    '<figure class="image is-48x48">' + 
                                        '<img src="' + icon + '">' + 
                                    '</figure>' + 
                                '</div>' + 
                                '<div class="media-content">' + 
                                    '<p class="title is-4">'+ name +'</p>' + 
                                    twitter_tag + 
                                '</div>' + 
                            '</div>' + 
                            '<div class="content">' + 
                                '<progress class="progress is-primary" value="' + exp_perc + '" max="100" ">' + 
                                '</progress><span class="progress-info">Lv' + exp_level + ' - ' + exp_perc + '%</span>' + 
                            '</div>' + 
                        '</div>' +
                        '<footer class="card-footer">' +
                            '<a class="card-footer-item playtime"><i class="fa fa-clock-o" aria-hidden="true"></i>' + playtime + '時間</a>' +
                            '<a class="card-footer-item login_time"><i class="fa fa-calendar" aria-hidden="true"></i>' + login_time + '</a>' +
                        '</footer>' +
                        '<footer class="card-footer">' +
                            '<a class="card-footer-item health" data-value="' + health + '"><img src="https://hydra-media.cursecdn.com/minecraft.gamepedia.com/a/a7/Heart.svg">' + health + '</a>' +
                            '<a class="card-footer-item armor" data-value="' + armor + '"><img src="https://hydra-media.cursecdn.com/minecraft.gamepedia.com/b/b1/Armor.svg">' + armor + '</a>' +
                            '<a class="card-footer-item food_level"data-value="' + food_level + '"><img src="https://hydra-media.cursecdn.com/minecraft.gamepedia.com/6/65/Hunger.svg" >' + food_level + '</a>' +
                        '</footer>' +
                    '</div>';
                
                $("#whitelist-users-list").append(playerdata);
                
                if (json["stats_players"][i].online == 1) {
                    $("#online-users").css("display", "block");
                    $("#online-users-list").prepend(playerdata);
                    $("#online-users-list .card").addClass("is-online");
                }
            }
        }
    });
})();
</script>
