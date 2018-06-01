$ = jQuery;
var f;

(function($, IBMCore) {

    $(function() {

        var app = {

            init: function() {
                app.retriveData();
                setTimeout(function () {
                  $('#teconsent').hide();
                }, 2000);
            },
            retriveData: function() {
                $.getJSON('https://api.github.com/repos/cderick/newrepo/contents/newfolder/final.json').done(function(json) {
                    if(json != null){
                        f = atob(json.content);
                        if (f.slice(0,1) == '"') {
                            f = JSON.parse(f.slice(1,-1));
                        } else {
                            f = JSON.parse(f);
                        }
                        var d  = f[0].html;
                        if (d != undefined){
                          app.loadHydrogen(d);
                        } else {
                          console.log('something goes wrong');
                        }
                    } else {
                        console.log('Content Empty');
                    }
                });
            },
            loadHydrogen: function(allData) {
                $('#Sections').html(allData);
                app.fixClass();
            },
            fixClass: function(){
              setTimeout(function () {
                  var d = $('.result-checkpoints');
                  $(d).removeClass();
                  var k = $(d).find('colgroup');
                  $(k).remove();
                  $(d).addClass('ibm-data-table ibm-grid ibm-altrows');
                  $(d).attr('data', 'datatable');
                  $(d).attr('data', 'scrollaxis="x"');
                  IBMCore.common.widget.datatable.init(d);
              }, 10);
            }
        };
        app.init();
    });

})(jQuery, IBMCore);