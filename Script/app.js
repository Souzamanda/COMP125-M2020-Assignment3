"use strict";

// IIFE - Immediately Ivoked Function Expression

(function()
{

    function highLightActiveLink()
    {
        let title = document.title
        title = title.toLowerCase();
        console.log(`The title is ${title}`);

        let navbarAnchors = document.querySelectorAll("li a");

        for (const anchor of navbarAnchors)
        {
            let anchorString = anchor.getAttribute("href");
            anchorString = anchorString.substr(0, anchorString.length - 5);

            if ((title === "about") && (anchorString === "index") || (title === anchorString))
            {
                anchor.className = "nav-link active";
            }
        }

        return title;
    }

    function Start ()
    {
        console.log('%cApp has started...', "color:purple; font-size: 24px;");

        let title = highLightActiveLink();
    }

window.addEventListener("load", Start);

})();