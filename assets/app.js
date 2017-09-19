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
        status =  'UP';
    } else {
        status =  'DOWN';
    }

    html = "<div class='square'>";
    html += "<h3>" + obj.friendlyname + "</h3>";
    html += "<p>Status: " + status + "</p>";


    $("#monitores").append(html);
}

// Register SW.js
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('./service-worker.js')
    .then(function(reg) {
        console.log('Service worker Registered');
    })
    .catch(function (err) {
        console.log('erro', err);
    });
}


// m779432842-bf9ce956174beb7419fc2794
