const imageParser = (event, setState) => {
    if (event.target.files[0]) {
        var file = event.target.files[0];
        if (parseInt(file.size) < 100000) {
            var reader = new FileReader();
            reader.onloadend = function () {                
                setState(reader.result)
            }
            reader.readAsDataURL(file);

        }
        else {
            event.target.value = null;
        }
    }
};

export default imageParser