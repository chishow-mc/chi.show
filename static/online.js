// $.ajax({
//     type: "GET",
//     url: "https://api.chi.show/v1/status/",
//     dataType: "json",
//     success: function (json) {
//         if (json["servr_online"] == false) {
//             $("section.hero").animate({
//                 opacity: 0
//             }, function () {
//                 $(this)
//                     .css("background", "linear-gradient(141deg,#9E0032 0,#D1001F 71%,#EB0400 100%)")
//                     .animate({
//                         opacity: 1
//                     });
//                 $(".hero.is-primary .tabs.is-boxed li.is-active a")
//                     .css("color", "#D1001F");
//             });
//         }
//     }
// });