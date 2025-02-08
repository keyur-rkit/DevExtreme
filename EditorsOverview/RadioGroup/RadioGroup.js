$(document).ready(function () {
    const reviewOptions = [
        { id: 1, text: "Excellent", color: "#00C853" },
        { id: 2, text: "Good", color: "#4CAF50" },
        { id: 3, text: "Neutral", color: "#FFC107" },
        { id: 4, text: "Bad", color: "#FF5722" },
        { id: 5, text: "Terrible", color: "#D32F2F" },
    ];


    $("#radioGroup").dxRadioGroup({
        dataSource: reviewOptions,
        itemTemplate: (itemData, _, itemElement) => {
            itemElement
                .parent().attr("style", "color:" + itemData.color)
                .text(itemData.text);
        },
        layout: 'horizontal',
        onValueChanged: (e) => {
            console.log(e);

            var notifyType = 'info';

            if (e.value.id === 1 || e.value.id === 2) {
                notifyType = 'success';
            }
            else if (e.value.id === 4 || e.value.id === 5) {
                notifyType = 'error';
            } else {
                notifyType = 'info';
            }

            DevExpress.ui.notify({
                message: `Your day is ${e.value.text}!!`,
                position: 'top center',
                width: 200,
            }, notifyType, 1000);
        }
    });

});