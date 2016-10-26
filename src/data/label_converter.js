/**
 *
 * Simple JS file that sets the label item on all books.
 */
var LabelConverter = function(label) {
    if(label === "1"){
        return "success";
    }
    else if(label === "2"){
        return "info";
    }
    else if(label === "4"){
        return "danger";
    }
    else{
        return "default";
    }


}

export default LabelConverter;