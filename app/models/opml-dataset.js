/**
 * Created by azu on 2014/01/18.
 * LICENSE : MIT
 */
var opml = require("opml-generator");
var opmlExport = function (list) {
    var header = {
        "title": "Tech View RSS",
        "dateCreated": new Date(),
        "ownerName": "azu"
    };
    var outline = list.reduce(function (prev, current) {
        return prev.concat([
            {
                title: "Vimeo tag:" + current,
                text: "Vimeo tag:" + current,
                type: "rss",
                "xmlUrl": "http://vimeo.com/tag:" + encodeURIComponent(current) + "/rss",
                "htmlUrl": "http://vimeo.com/tag:" + encodeURIComponent(current)
            },
            {
                title: "Youtube :" + current,
                text: "Youtube : " + current,
                type: "rss",
                "xmlUrl": "http://gdata.youtube.com/feeds/base/videos?v=2&alt=rss&orderby=published&q=" + encodeURIComponent(current),
                "htmlUrl": "http://www.youtube.com/results?search_sort=video_date_uploaded&search_query=" + encodeURIComponent(current)
            }
        ]);
    }, []);

    return opml(header, outline);
};
module.exports = opmlExport;
module.exports.toBase64 = function (list) {
    var xml = opmlExport(list);
    var buffer = new Buffer(xml);
    return "data: text/xml;base64," + buffer.toString("base64");
};