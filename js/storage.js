$(document).ready(
    function () {
     
        $(".portfolio-item").click(
            function (event) {               
                sessionStorage.setItem("cel", this.id);
                sessionStorage.setItem("koszt", $(this).find(".kwota").text());
            })
    });