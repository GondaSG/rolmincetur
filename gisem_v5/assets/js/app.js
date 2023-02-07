"use strict";

addEventListener('DOMContentLoaded', function(event) {
    var listGroup = document.querySelectorAll('.list-group');
    if (listGroup) {
        var listArray = Array.from(listGroup);
        listArray.forEach(function(item) {
            item.addEventListener('click', function(evt) {
                console.log('evt', evt);
                var listItemsLi = item.querySelectorAll('.list-group-item');
                var arrayItemsLi = Array.from(listItemsLi);
                arrayItemsLi.forEach(function(itemLi) {
                    var _itemLi$classList;
                    (_itemLi$classList = itemLi.classList) === null || _itemLi$classList === void 0 ? void 0 : _itemLi$classList.remove('active');
                });
                if (evt.target) {
                    var _evt$target;
                    var itemLi = (_evt$target = evt.target) === null || _evt$target === void 0 ? void 0 : _evt$target.closest('.list-group-item');
                    if (itemLi) {
                        var _itemLi$classList2;
                        (_itemLi$classList2 = itemLi.classList) === null || _itemLi$classList2 === void 0 ? void 0 : _itemLi$classList2.add('active');
                        console.log('item li', itemLi);
                    }
                }
            });
        });
    }
});