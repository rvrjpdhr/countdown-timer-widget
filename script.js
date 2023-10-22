$(document).ready(function () {
    let clock;
    let currentDate = new Date();
    console.log(currentDate);

    let url = window.location.search;

    var queries = {};
    $.each(document.location.search.substring(1).split('&'), function (c, q) {
        var i = q.split('=');
        queries[i[0].toString()] = i[1].toString();
    });
    console.log(queries);

    let endDateStr = queries["endDate"];
    console.log(endDateStr);

    // by default end date set last day of current year
    let endDate = new Date();
    if (isNaN(Date.parse(endDateStr))) {
        endDate = new Date(new Date().getFullYear(), 11, 31)
    }
    else {
        endDate = new Date(endDateStr + " 00:00:00 GMT+0530");
        console.log(endDate);
    }
    let diff = endDate / 1000 - currentDate.getTime() / 1000;



    const submitBtn = $('#submit-btn').on("click", function () {
        let date = new Date($("#end-date").val());
        endDate = date;
        diff = endDate / 1000 - currentDate.getTime() / 1000;

        setClock(clock, diff);
    }
    )

    setClock(clock, diff);


});


function setClock(clock, diff) {
    if (diff <= 0) {
        clock = $(".clock").FlipClock(0, {
            clockFace: "DailyCounter",
            countdown: true,
            autostart: false
        });
        console.log("Date has already passed!")

    } else {
        clock = $(".clock").FlipClock(diff, {
            clockFace: "DailyCounter",
            countdown: true,
            callbacks: {
                stop: function () {
                    console.log("Timer has ended!")
                }
            }
        });

        setTimeout(function () {
            checktime();
        }, 1000);

        function checktime() {
            t = clock.getTime();
            if (t <= 0) {
                clock.setTime(0);
            }
            setTimeout(function () {
                checktime();
            }, 1000);
        }
    }
}