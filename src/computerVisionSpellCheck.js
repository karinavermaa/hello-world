export const vision = require('@google-cloud/vision');
export const Typo = require('typo-js');


// const CREDENTIALS = 'serviceAccountToken.json';

export const CREDENTIALS = JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "mystic-pier-413202",
    "private_key_id": "8c15fdf61be2937986092561ac1eb58ec5cd0d18",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDoZ01Hg8XLv77D\nm6/FFjUrAuuQr2ifNvhyd0TMHhmg9oxrCdUnMN9aqKPpxD8CRkZQHrI0hjEdjtMs\nQUqHAHWfUKxLXWr0MjyxFBhFnFn6K2iSXjzakT1xjAAe1tfxhTEX7bmNgpEeKqKL\na9TFFCqlMsknZeEVYRARK1Ua7Rz7Gi8GxYuZRjlYbxbHtcvT/YFc8X9ujR57wxti\nGgpa++zC1sqt8IlvdFA+KXk0urI9ykMO0oHqeL7Xb2xFirW+vMU+p2dnHJA7105k\noo8bX4ylVMnANZQIGxM9MQBWvuVFkxhGlxWx91Y2scL/LeKmODGmx9FRa/dBDvCL\nhW2B+F4VAgMBAAECggEAGL7xI1mEXOjWlOj1qxBtil4l+5K12uglRbjt5icZVwKR\nmo8iN2lUiwh0ZZ6MD/+wGnVeR8n3HlzYHvj3yM6zd4qFQgQZMJXN0RQg7n6StRjc\nqmMm6yX2ayn7VE1Pkou6WcAqFweNUK88/gf2EKMQVGVHNm76a8aZSZ650eNoB9OC\nqfXyF0H5jW3TPh3FmfDwEle3D6siTSwA82A3KkEfbqHaNElovkqo8kUE+Bed3i2N\nLPBY/iEMGAdBFAqJMYyL+m0xjIHM/yMaCrmeOBtzLSVTFRJQcJrxRQ2pd5bWIThG\nb7TE+9x9S+G1z4Q+UtWvZdqs86dS4Ca+us21mSSUSQKBgQD/BGbxqwyO47f50uTL\nC4Uo4qwPg2TC3+6GYAABpJDAPiMaGXGAWEpnX1uXokNhVFPkPRI7/lHzFUEUA0gP\n3lU28b/t4j946EkDqjbZt6OsFDRAsAjnmPXTMhduVwXTYKZwHuQCJESg8GTRnhuk\nKeywe2cgCSdI7jlXlpwp30Yn+QKBgQDpTJbbQoRKezHbMNCcIPs9G/Oh2gln11wQ\n493ntxPdbKdCaJ3G21VWIZm3A1ECP2RKM9Z9GSK03TI9Gc0izj7e6I3aZders+zA\nEqcH6hHWzhkk42dcU0mJYK4nl8N/tcAfy8uFLol+1DodwESXbSvKaRIZ40puKWTN\nqaTlNnMF/QKBgQD624W4rR5JYVCU/BP8eHSg53mCOSphWI72uHDJLO0HbxhwkB7K\ntg9a6L7cxs2pbJ6pojnRsjdC++Fsol283mTNC7pVc34knbtVU5dpS/BBUg6ko4Xe\n7OTEwD20WP5uFGElYf3A7ZRlDJTgbruaHXOrl3i2VsrCPzVBJ/KubehBYQKBgEY9\n/R2/BT23oecw515av8pCZDRTBYnyWZHsSZ++i4ibcjCYdwiseSEZtMJZiUZ396Yv\nvWCk9MIn5zxmTFEyb9OFiVA8YZcc8SdTdl73pq9aFk/49+HgYb+vEEBzfTUyb8oi\n/f/3ZwZ8t5LFlOFSyWCECiMpP/uzEtqpPTCWGEOxAoGBAMRD4p3JDHrePCj+Z5w8\nA01Ng2k+BDvRnS+Y0yZyaCZiUV/R0LwCs5moSQ47kWtrFe9cmgRCI3RkmOuKoNnP\n0YiEcbiYxbZg8IaoUgH1UVWeSVV2/MBQOyEc9MYqJ3qOWw/gEHhoH4b6LbXBdch4\n5/Ko9i+3Xtth1G94+8pOQlIr\n-----END PRIVATE KEY-----\n",
    "client_email": "visionapi-qhacks@mystic-pier-413202.iam.gserviceaccount.com",
    "client_id": "102478115915980741460",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/visionapi-qhacks%40mystic-pier-413202.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"

}));



export const CONFIG = {
    credentials: {
        private_key: CREDENTIALS.private_key,
        client_email: CREDENTIALS.client_email
    }
};

export const client = new vision.ImageAnnotatorClient(CONFIG);

export async function detectText(file_path) {
    try {
        let [result] = await client.textDetection(file_path);
        return result.fullTextAnnotation ? result.fullTextAnnotation.text : '';
    } catch (error) {
        console.error('Error detecting text:', error.message);
        return '';
    }
}

export const dictionary = new Typo('en_US');
let word_cor;
let w;

export function checkSpelling(text) {

    const words = text.toLowerCase().split(/\s+/);
    const misspelledWords = words.filter(word => !dictionary.check(word));
    displayResults(misspelledWords);

    
}

export function displayResults(misspelledWords) {
    var word_correct = [];      
    var k = []


    if (misspelledWords.length === 0) {
        console.log("No misspelled words found.");
    } else {
        console.log("Misspelled words and corrections:");

        misspelledWords.forEach(word => {
            const suggestions = dictionary.suggest(word);
            const correction = suggestions.length > 0 ? suggestions[0] : word;
            console.log(`Word: ${word} Correction: ${correction}`);
            k = [word, correction];

            word_correct.push(k);
            word_cor = word_correct
            // return word_correct;

        });
    }
}

export async function processText() {
    let g;
    const text = await detectText('jj.png');
    const text_lower = text.toLowerCase();
    const wordList = text.split(/(\b\w+\b|\W+)/).filter(Boolean);
    const wordList_lower = text_lower.split(/(\b\w+\b|\W+)/).filter(Boolean);

    // console.log(text);
    tr = text.replace(/[^\w\s\']|_/g, "")
         .replace(/\s+/g, " ");

    


    // text = 'helo myy namme orange'
    checkSpelling(tr);
    
    for (let i = 0; i < word_cor.length; i++) {
        console.log(word_cor[i][0])
        console.log(wordList)


        let l = wordList_lower.indexOf(word_cor[i][0]);
        word_cor[i].push(l);


    }
    let j = "hello world"
    return j;





    console.log(word_cor);


}

// Run the processText function
processText();



// detectText('kk.png');