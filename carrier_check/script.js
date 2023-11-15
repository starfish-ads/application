document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var phone = document.getElementById('phone').value;
    var url = 'https://us-central1-private-287112.cloudfunctions.net/promotion_check_carrier_name?phone_number=' + encodeURIComponent(phone);

    fetch(url)
        .then(response => response.text()) // JSONではなくテキストとしてレスポンスを解析
        .then(text => {
            document.getElementById('result').innerText = 'キャリア: ' + text; // テキストデータを使用
        })
        .catch(error => {
            console.error('エラー:', error);
        });
});
