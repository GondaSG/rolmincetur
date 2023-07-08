// https://obedalvarado.pw/blog/exportar-contenido-html-a-documento-de-word-doc-utilizando-el-plugin-jquery-word-export/
// https://github.com/markswindoll/jQuery-Word-Export
if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
    (function($) {
        $.fn.wordExport = function(fileName, iscomprimido) {
            fileName = typeof fileName !== 'undefined' ? fileName : "jQuery-Word-Export";
            var static = {
                mhtml: {
                    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
                    head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n<style>\n_styles2_\n</style>\n</head>\n",
                    body: "<body>_body_</body>"
                }
            };
            var options = {
                maxWidth: 635
            };
            // Clone selected element before manipulating it
            var markup = $(this).clone();

            // Remove hidden elements from the output
            // markup.each(function() {
            //     var self = $(this);
            //     if (self.is(':hidden'))
            //         self.remove();
            // });

            // Embed all images using Data URLs
            var images = Array(); 
            var img = markup.find('img');
            for (var i = 0; i < img.length; i++) {
                //original size
                var ow = img[i].width;
                var oh = img[i].height;
                // Calculate dimensions of output image
                var w = Math.min(img[i].width, options.maxWidth);
                var h = img[i].height * (w / img[i].width);
                // Verify if need images with original size or compressed
                if(iscomprimido === true){
                    ow = w;
                    oh = h;
                }
                // Create canvas for converting image to data URL
                var canvas = document.createElement("CANVAS");
                canvas.width = ow;
                canvas.height = oh;
                // Draw image to canvas
                var context = canvas.getContext('2d');               
                context.drawImage(img[i], 0, 0, ow, oh);
                // Get data URL encoding of image
                var uri = canvas.toDataURL("image/png");
                $(img[i]).attr("src", img[i].src);
                img[i].width = w;
                img[i].height = h;
                // Save encoded image to array
                images[i] = {
                    type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                    encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                    location: $(img[i]).attr("src"),
                    data: uri.substring(uri.indexOf(",") + 1)
                };
            }

            // Prepare bottom of mhtml file with image data
            var mhtmlBottom = "\n";
            for (var i = 0; i < images.length; i++) {
                mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
                mhtmlBottom += "Content-Location: " + images[i].location + "\n";
                mhtmlBottom += "Content-Type: " + images[i].type + "\n";
                mhtmlBottom += "Content-Transfer-Encoding: " + images[i].encoding + "\n\n";
                mhtmlBottom += images[i].data + "\n\n";
            }
            mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

            //TODO: load css from included stylesheet
            var styles = '';


            //style encabezado doc word
            var headerstyleword=`
                @page Section {
                    margin:0.75in 0.75in 0.75in 0.75in;
                    size:595.45pt 841.7pt ;
                    mso-page-orientation:portrait;
                    mso-header-margin:0.5in;
                    mso-header: header_doc;
                    mso-footer-margin:0.5in;
                }
                div.Section {page:Section;}
            `;

            // Aggregate parts of the file together
            var fileContent = static.mhtml.top.replace("_html_", static.mhtml.head.replace("_styles_", styles) +static.mhtml.head.replace("_styles2_", headerstyleword) + static.mhtml.body.replace("_body_", markup.html())) + mhtmlBottom;

            // Create a Blob with the file contents
            var blob = new Blob([fileContent], {
                type: "application/msword;charset=utf-8"
            });
            saveAs(blob, fileName + ".doc");
        };
    })(jQuery);
} else {
    if (typeof jQuery === "undefined") {
        console.error("jQuery Word Export: missing dependency (jQuery)");
    }
    if (typeof saveAs === "undefined") {
        console.error("jQuery Word Export: missing dependency (FileSaver.js)");
    }
}
