"use strict";

// IIFE - Immediately Ivoked Function Expression

(function()
{
    function Start ()
    {
        console.log('%cApp has started...', "color:purple; font-size: 24px;");
    }

window.addEventListener("load", Start);

})();