/**
 * A simple JS file that sets the appropriate Bootstrap label for a book based on its state.
 */
var LabelConverter = function(label) {
    if(label === "New"){
        return "success";
    }
    else if(label === "As New"){
        return "info";
    }
    else if(label === "Readable"){
        return "danger";
    }
    else{
        return "default";
    }
}

export default LabelConverter;