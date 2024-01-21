document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://us-central1-private-287112.cloudfunctions.net/promotion_suggestion';

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'init' })
    };

    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            populateForm(data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
});

function populateForm(data) {
    const dateSection = document.getElementById('date-section');
    if (data['date']) {
        data['date'].forEach(option => {
            const input = createRadioButton('date', option);
            const label = createLabel('date', option);
            dateSection.appendChild(input);
            dateSection.appendChild(label);
        });
    }

    const areaSection = document.getElementById('area-section');
    if (data['area']) {
        data['area'].forEach(option => {
            const input = createRadioButton('area', option);
            const label = createLabel('area', option);
            areaSection.appendChild(input);
            areaSection.appendChild(label);
        });
    }

    const housingSection = document.getElementById('housing-section');
    if (data['housing']) {
        data['housing'].forEach(option => {
            const input = createRadioButton('housing', option);
            const label = createLabel('housing', option);
            housingSection.appendChild(input);
            housingSection.appendChild(label);
        });
    }

    const familySection = document.getElementById('family-section');
    if (data['family']) {
        data['family'].forEach(option => {
            const input = createRadioButton('family', option);
            const label = createLabel('family', option);
            familySection.appendChild(input);
            familySection.appendChild(label);
        });
    }

    const paymentSection = document.getElementById('payment-section');
    if (data['payment']) {
        data['payment'].forEach(option => {
            const input = createRadioButton('payment', option);
            const label = createLabel('payment', option);
            paymentSection.appendChild(input);
            paymentSection.appendChild(label);
        });
    }
}

// ラジオボタンとラベルを生成するヘルパー関数
function createRadioButton(name, value) {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.id = `${name}_${value}`;
    input.value = value;
    return input;
}

function createLabel(name, value) {
    const label = document.createElement('label');
    label.htmlFor = `${name}_${value}`;
    label.textContent = value;
    return label;
}


function submitForm() {
    const form = document.getElementById('myForm');
    const formData = new FormData(form);

    // フォームデータをJSONオブジェクトに変換
    const data = {
        status: 'check',
    };
    formData.forEach((value, key) => { data[key] = value; });

    fetch('https://us-central1-private-287112.cloudfunctions.net/promotion_suggestion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (Object.keys(data).length === 0) {
            resultDiv.innerText = 'そのパターンはありません';
        } else {
            var resultDiv = document.getElementById('result');
            resultDiv.innerText = data[0]['result'];

            var scriptDiv = document.getElementById('script');
            scriptDiv.innerText = data[0]['script'];
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
