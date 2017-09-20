var logs = [];

$(document).ready(function() {
    // $("#specific").hide();
    $.ajax({
        url: 'https://api.uptimerobot.com/v2/getMonitors',
        type: 'POST',
        data: {
            "api_key": "u493118-d7ecc98c63887ebde4febd04",
            "format" : "json",
            "noJsonCallback" : "1",
            "logs" : "1",
        },
        success: function (result) {
            if (result.stat == 'fail') {
                $("#monitores").html("<h2>O Uptime Robot está fora do ar no momento.</h2>");
            } else {
                $("#monitores").html("");
                $.each(result.monitors, function(k, monitor) {
                    logs['monitor_' + monitor.id] = monitor.logs;
                    createSquare(monitor);
                });
            }

        }
    });
});

$(document).on('click', '.square', function() {
    let e = $(this);
    let id = e.data('id');

    createLogs(logs['monitor_' + id]);
});

function createSquare(obj) {
    let html;
    let status;

    if (obj.status == 2) {
        status =  '<span class="glyphicon glyphicon-ok pull-right text-success large-icon"></span>';
    }
    else if (obj.status == 0 || obj.status == 1) {
        status =  '<span class="glyphicon glyphicon-refresh pull-right text-warning large-icon"></span>';
    }
    else {
        status =  '<span class="glyphicon glyphicon-remove pull-right text-danger large-icon"></span>';
    }

    html = "<div class='square' data-id='"+obj.id+"'>";
    html += "<span class='title'>" + obj.friendly_name + "</span>";
    html += status;
    html += "<p>" + obj.url + "<br><small>Atualiza a cada <b>"+(obj.interval / 60)+"</b> min.</small></p>";
    html += "</div>";

    $("#monitores").append(html);
}

function createLogs(logs) {
    let html = "";
    $.each(logs, function(k, log) {
        if (log.reason.code == 333333) log.reason.code = 500;

        if (log.reason.code != 98 && log.reason.code != 99) {
            var date = new Date(log.datetime*1000);

            let measuredTime = new Date(null);
            measuredTime.setSeconds(log.duration);
            let time = measuredTime.toISOString().substr(11, 8);
            let status;

            if (log.type == 2) {
                status =  '<span class="glyphicon glyphicon-ok text-success"></span>';
            }
            else {
                status =  '<span class="glyphicon glyphicon-remove text-danger"></span>';
            }

            html += "<div class='log'>";
            html += ""+status+" <b>"+ log.reason.code +" "+ log.reason.detail +"</b><br>";
            html += "em "+ date.toLocaleString() +"<br>";
            html += "Permaneceu por ± " + time+ "<br>";
            html += "</div>";
        }

    });

    $("#mdlBody").html(html);
    $("#mdl").modal('show');
}


// Register SW.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('service-worker.js')
    .then(function(reg) {
        console.log('Service worker Registered');
    })
    .catch(function (err) {
        console.log('erro', err);
    });
}

