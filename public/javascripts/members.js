/* global _ $ */
_.templateSettings = {
    evaluate: /\{\{([\s\S]+?)\}\}/g,
    interpolate: /\{\{=([\s\S]+?)\}\}/g,
    escape: /\{\{-([\s\S]+?)\}\}/g
};
/** オンロード処理 **/
$(() => {
    $.ajax({
        url : '/api/members',
        method : 'GET',
        dataType : 'json'
    })
    .done((data) => {
        let template = _.template($('#row_template').text());
        let values = data.rows.map((c, i,a ) => {
            c = c.value;
            return c;
        });
        let rows = values.map((c, i, a) => {
            return template(c);
        });
        $('#tbody_list').append(rows);
    })
    .fail((err) => {
        console.log(err);
    });
});