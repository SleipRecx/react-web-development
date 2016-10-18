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