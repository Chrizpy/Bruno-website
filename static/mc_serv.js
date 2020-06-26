var clean;

var getServers = function() {
    var req = new XMLHttpRequest();
    var url = '/mcinfo';
    
    req.open('GET', url, true); 
    req.setRequestHeader("Content-type", "application/json");
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var resp = JSON.parse(this.responseText);
            if (resp != null) {
                document.getElementById('server_box').innerHTML = clean;
                var server_box = document.getElementById('server_box').innerHTML;
                var i;
                for (i = 0; i < resp.servers.length; i++) { 
                    
                    server_box += "<div class = 'server'>";
                    server_box += "<p class = 'dot'></p>";
                    server_box += "<p class = 'game'>Game: </p>";
                    server_box += "<p class = 'game_type'>Game mode: </p>";
                    server_box += "<p class = 'players'>Players online: </p>";
                    server_box += "<p class = 'motd'>Motd: </p>";
                    if (resp.servers[i]['online'].length > 0) {
                        server_box += "<div class = 'button-spacer'>";
                        server_box += "<button class = 'buttons invert' onclick = 'showPlayers(" + i + "); return false;'>Show players online</button>";
                        server_box += "</div>";
                    }

                    server_box += "</div> ";
    
                    document.getElementById('server_box').innerHTML = server_box;
                
                    var index_connect;
                    if (resp.servers[i]['online'].length > 0) {
                        server_box = document.getElementById('server_box').innerHTML;
                        server_box += "<div class = 'server playersonline' style='display: none'>";
                        server_box += "<p class='players'>Players online: </p>";
                        server_box += "<span class = 'connect'> </span>";
                        server_box += "</div> ";
                        document.getElementById('server_box').innerHTML = server_box;
                        index_connect = Array.from(document.getElementsByClassName('connect'));
                        if (resp.servers[i]['online'].length > 0) {
                            var z;
                            for (z = 0; z < resp.servers[i]['online'].length; ++z) {
                                index_connect[i].innerHTML += '<span class="identifier">' + resp.servers[i]['online'][z] + "</span>";
                            }
                        }
                    }
    
                    var index_game = Array.from(document.getElementsByClassName('game'));
    
                    index_game[i].innerHTML += '<span class="identifier">' + resp.servers[i].game + "</span>";
    
                    var index_dot = Array.from(document.getElementsByClassName('dot'));
                    index_dot[i].style.background = "#7FFF00" 
    
                    var index_game_type = Array.from(document.getElementsByClassName('game_type'));
                    index_game_type[i].innerHTML += '<span class="identifier">' + resp.servers[i].game_type + "</span>";
    
                    var index_players = Array.from(document.getElementsByClassName('players'));
                    index_players[i].innerHTML += '<span class="identifier">' + resp.servers[i].num_players +' / ' + resp.servers[i].max_players + "</span>";
    
                    var index_motd = Array.from(document.getElementsByClassName('motd'));
                    index_motd[i].innerHTML += '<span class="identifier">' + resp.servers[i].motd.slice(2, this.length) + "</span>";
                            
                }     
            }   
        }
    };
    
    req.send(null);    
}


var showPlayers = function(integer) {
    var index_showplayers = Array.from(document.getElementsByClassName('playersonline'));
    if (index_showplayers[integer].style.display == "none")
        index_showplayers[integer].style.display = "block";
    else 
        index_showplayers[integer].style.display = "none";
}



window.onload = function() {
    clean = document.getElementById('server_box').innerHTML;
    this.getServers();
}

