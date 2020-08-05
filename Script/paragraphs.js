// IIFE module
"use strict";
let objects;
(function(objects)
{
    class Paragraphs 
    {
        setParagraphs(JSON_Data)
        {
            this.paragraph = JSON_Data.paragraph;
        }
    }
    objects.Paragraphs = Paragraphs;

}(objects || (objects = {})));