var fs = require("fs");
fs.readFile("bSellStatistics.txt", function (err, data) {
    if (err) throw err;
    const input = data.toString();
    const record = input.split('\n');
    var collection = {};
    
    for (var i = 1; i <= parseInt(record[0]); i++) {
        const row = record[i].split(' ');

        const pid = row[2].split('.');
        const p_id = pid[0];
        const c_id = typeof pid[1] != 'undefined' ? pid[1] : '_';
        const sid = row[3].split('.');
        const s_id = sid[0];
        const r_id = typeof sid[1] != 'undefined' ? sid[1] : '_';

        if (row[0] == 'S') {
            const d = row[1];
            
            if (typeof collection[d] == 'undefined') {
                collection[d] = {};
            }

            if(typeof collection[d][p_id] == 'undefined'){
                collection[d][p_id] = {};
            }

            if(typeof collection[d][p_id][c_id] == 'undefined'){
                collection[d][p_id][c_id] = {};
            }

            if(typeof collection[d][p_id][c_id][s_id] == 'undefined'){
                collection[d][p_id][c_id][s_id] = {};
            }

            if(typeof collection[d][p_id][c_id][s_id][r_id] == 'undefined'){
                collection[d][p_id][c_id][s_id][r_id] = [];
            }

            collection[d][p_id][c_id][s_id][r_id].push(row[0]);
        } else if (row[0] == 'Q') {
            const q_period = row[1].split('.');
            const d_start = q_period[0];
            const d_end = typeof q_period[1] != 'undefined' ? q_period[1] : d_start;

            let result = 0;
            for (var c = d_start; c <= d_end; c++) {
                // collection[d][p_id][c_id][s_id][r_id]
                if(typeof collection[c] != 'undefined'){
                    if(typeof collection[c][p_id] != 'undefined'){
                        if (c_id == '_') {
                            for(var idx_cid in collection[c][p_id]){
                                if(typeof collection[c][p_id][idx_cid] != 'undefined'){
                                    if (s_id == -1) {
                                        for(var idx_sid in collection[c][p_id][idx_cid]){
                                            result += Object.keys(collection[c][p_id][idx_cid][idx_sid]).length;
                                        }
                                    } else {
                                        if(typeof collection[c][p_id][idx_cid][s_id] != 'undefined'){
                                            if (r_id == '_') {
                                                result += Object.keys(collection[c][p_id][idx_cid][s_id]).length;
                                            } else {
                                                if(typeof collection[c][p_id][idx_cid][s_id][r_id] != 'undefined'){
                                                    result += 1;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if(typeof collection[c][p_id][c_id] != 'undefined'){
                                if (s_id == -1) {
                                    for(var idx_sid in collection[c][p_id][c_id]){
                                        result += Object.keys(collection[c][p_id][c_id][idx_sid]).length;
                                    }
                                } else {
                                    if(typeof collection[c][p_id][c_id][s_id] != 'undefined'){
                                        if (r_id == '_') {
                                            result += Object.keys(collection[c][p_id][c_id][s_id]).length;
                                        } else {
                                            if(typeof collection[c][p_id][c_id][s_id][r_id] != 'undefined'){
                                                result += 1;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            console.log(result);
        }
    }        
})