"use strict";addEventListener("DOMContentLoaded",function(t){var e=document.querySelectorAll(".list-group");e&&Array.from(e).forEach(function(r){r.addEventListener("click",function(t){var e=r.querySelectorAll(".list-group-item");Array.from(e).forEach(function(t){null!=(t=t.classList)&&t.remove("active")}),t.target&&(t=null==(e=t.target)?void 0:e.closest(".list-group-item"))&&null!=(e=t.classList)&&e.add("active")})})});