document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var phone = document.getElementById('phone').value;
    var url = 'https://us-central1-private-287112.cloudfunctions.net/promotion_check_carrier_name?phone_number=' + encodeURIComponent(phone);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').innerText = 'キャリア: ' + data;
        })
        .catch(error => {
            console.error('エラー:', error);
        });
});
