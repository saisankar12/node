// Webclicker for orange mailer (since import does not work)

const puppeteer = require('puppeteer');
const fs = require('fs');

let browser;
let page;


let init = async () => {
	browser = await puppeteer.launch({
		headless: false
	});
	page = await browser.newPage();
	await page.setViewport({
		width: 1900,
		height: 1900
	});

	page.on('console', msg => {
		//console.log(msg.text);
	});

	await page.goto('https://messageriepro3.orange.fr/OFX#');
};

let cleanup = async () => {
	await browser.close();
};

let initialLogin = async () => {
	console.log('initialLogin');

	await page.waitForSelector('#uLogin');
	await page.waitForSelector('#uPwd');


	page.type('#uLogin', 'adress@mail.com', {
		delay: 1
	});
	await page.waitFor(1000);
	page.type('#uPwd', 'mypassword', {
		delay: 1
	});
	await page.waitFor(1000);

	const submitLogin = await page.$('#authForm > div.actions > div:nth-child(2) > input[type="submit"]');
	await submitLogin.click();


	console.log('initialLogin end');
};


let selectNewContact = async () => {
	console.log('selectContact new contact');

	await page.waitForSelector('#oo_widgets_Button_32');
	await page.waitFor(3000);
	await page.click('#oo_widgets_Button_32');

	await page.waitFor(2000);


	console.log('selectContact new contact click');
	console.log('selectContact new contact ready');

	await page.waitFor(2000);
}

let selectContact = async () => {
	console.log('selectContact');
	await page.waitFor(5000);

	page.goto('mywebmail.com');

	console.log('selectContact end');
};

let feedField = async (id, text) => {
	if (text) {
		await page.type(id, text, {
			delay: 1
		});
	}
	await page.waitFor(300);
}


let feedContact = async (data) => {


	await page.waitFor(2000);

	var fields = [{
		id: '.c-contact__field[data-id^="lastname"] input',
		text: (data.name || data.email)
	}, {
		id: '.c-contact__field[data-id^="firstname"] input',
		text: data.surname
	}, {
		id: '.c-contact__field[data-id^="function"] input',
		text: data.profession
	}, {
		id: '.c-contact__field[data-id^="email-perso"] input',
		text: data.email
	}, {
		id: '.c-contact__field[data-id^="phone-perso"] input',
		text: data.homePhone
	}, {
		id: '.c-contact__field[data-id^="mobile-perso"] input',
		text: data.mobilePhone
	}, {
		id: '.c-contact__field[data-id^="street-home"] input',
		text: data.address1
	}, {
		id: '.c-contact__field[data-id^="zip-home-"] input',
		text: data.postalCode
	}, {
		id: '.c-contact__field[data-id^="city-home-"] input',
		text: data.Town
	}, {
		id: '.c-contact__field[data-id^="comments"] textarea',
		text: data.comments
	}, ];

	for (var ii = 0; ii < fields.length; ++ii) {
		await feedField(fields[ii].id, fields[ii].text);
	}


	await page.waitForSelector('.c-contact__groupName');
	await page.click('.c-contact__groupName');
	await page.waitFor(400);

	await page.waitForSelector('.c-moveContactMenu__item[data-qa-group-name="Avant-2016"')
	await page.click('.c-moveContactMenu__item[data-qa-group-name="Avant-2016"');
	await page.waitFor(400);

	await page.waitForSelector('a[title="enregistrer"]');
	await page.click('a[title="enregistrer"]');
	await page.waitFor(6000);

	console.log('validating fields done');
}



var extractInfo = function(clientLine) {

	var parsed = clientLine.split(',');

	var data = {
		name: (parsed[0] || '').trim(),
		surname: (parsed[1] || '').trim(),
		birthday: (parsed[2] || '').trim(),
		genre: (parsed[3] || '').trim(),
		address1: (parsed[4] || '').trim(),
		address2: (parsed[5] || '').trim(),
		postalCode: (parsed[6] || '').trim(),
		Town: (parsed[7] || '').trim(),
		homePhone: (parsed[8] || '').trim(),
		workPhone: (parsed[9] || '').trim(),
		mobilePhone: (parsed[10] || '').trim(),
		email: (parsed[11] || '').trim(),
		registerDate: (parsed[12] || '').trim(),
		profession: (parsed[13] || '').trim(),
		familly: (parsed[14] || '').trim(),
		comments: (parsed[16] || '').trim() + (parsed[15] || '').trim(),
	}
	return data;
}

var fileContent = fs.readFileSync('input.csv').toString();
var output = fileContent.split('\n')



let scrape = async () => {
	await init();
	await initialLogin();
	await selectContact();



	for (var ii = 0; ii < output.length; ii++) {
		await selectNewContact();
		var data = extractInfo(output[ii]);

		console.log(ii, 'integrating email:', data.email);
		console.log(data);
		await feedContact(data);
	}


	await page.waitFor(10000);

};



let main = async () => {


	var scenar1 = scrape().then(value => {
		console.log('everything went fine');
	}).catch(error => {
		console.log('something went wrong:', error);
	}).then(() => {
		cleanup();
	});



}

main();