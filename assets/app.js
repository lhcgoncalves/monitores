let serversToMonitore = [
'socorretores.com.br',
'yahoo.com'
];

$(document).ready(function() {
    $.ajax({
        url: 'https://api.uptimerobot.com/getMonitors?apiKey=u493118-d7ecc98c63887ebde4febd04&format=json&noJsonCallback=1',
        type: 'POST',
        success: function (result) {
            $.each(result.monitors, function(k, monitor) {
                $.each(monitor, function(k, site) {
                    createSquare(site);
                });
            });
        }
    });
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

    html = "<div class='square'>";
    html += "<span class='title'>" + obj.friendlyname + "</span>";
    html += status;
    html += "<p>" + obj.url + "</p></div>";

    $("#monitores").append(html);
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

