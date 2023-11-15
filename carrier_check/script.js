document.getElementById('phoneForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // 結果表示エリアを取得し、前回の結果をクリア
    var resultDiv = document.getElementById('result');
    resultDiv.innerText = '調査中.........';

    // 電話番号を取得
    var phone = document.getElementById('phone').value;
    var url = 'https://us-central1-private-287112.cloudfunctions.net/promotion_check_carrier_name?phone_number=' + encodeURIComponent(phone);

    // APIリクエストを送信
    fetch(url)
        .then(response => response.text())
        .then(text => {
            // テキストデータを使用して結果を表示
            resultDiv.innerText = 'キャリア: ' + text;
        })
        .catch(error => {
            // エラーをキャッチし、結果表示エリアにエラーメッセージを表示
            console.error('エラー:', error);
            resultDiv.innerText = 'その番号は存在しません';
        });
});
