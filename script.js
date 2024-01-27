const form = document.getElementById('form');
const formTitle = document.getElementById('title');
const formChannel = document.getElementById('channel');
const formHours = document.getElementById('formHours');
const formMinutes = document.getElementById('formMinutes');
const formSeconds = document.getElementById('formSeconds');
const finishedButton = document.getElementById('finishedButton');
const wantWatchButton = document.getElementById('wantWatchButton')
const formRatingContainer = document.querySelector('.ratingContainer');
const formRating = document.getElementById('rating');
const submitButton = document.getElementById('submitButton');
const containerAllDocumentary = document.querySelector('.containerAllDocumentary');

// PENGATURAN RADIO BUTTON PADA FORM
finishedButton.addEventListener('change', function() {
	if (finishedButton.checked) {
		formRatingContainer.style.display = 'block';

		// VALIDASI INPUT RATING
		formRating.addEventListener('input', function() {
			formRating.value = formRating.value.replace(/[^0-9]/g, '');
			parsedRating = parseInt(formRating.value, 10);
			if (isNaN(parsedRating)) {
				formRating.value = '';
			} else {
				formRating.value = Math.min(Math.max(parsedRating, 1), 10);
			}
		})
	} 
}) 

wantWatchButton.addEventListener('change', function() {
	if (wantWatchButton.checked) {
		formRatingContainer.style.display = 'none';
	}
})

// VALIDASI INPUT DURATION AGAR ANGKA SAJA
const formTime = [formHours, formMinutes, formSeconds];

for (i = 0; i < formTime.length; i++) {
	let item = formTime[i];

	item.addEventListener('input', function() {
		item.value = item.value.replace(/[^0-9]/g, '');
	});
}

// ADD DATA
form.addEventListener('submit', function(e) {
	e.preventDefault();

	if (finishedButton.checked) {
		const newDataFinished = document.createElement('div');
		newDataFinished.classList.add('perDocumentary');
		const documentaryOrder = containerAllDocumentary.childElementCount;

		const perDocumentary = `
			<p class="per-number">${documentaryOrder + 1}</p>
			<div class="documentaryInfo">
				<p class="per-title">${formTitle.value}</p>
				<p class="per-channel">${formChannel.value}</p>
				<p class="per-duration">${formHours.value}:${formMinutes.value}:${formSeconds.value}</p>
			</div>
			<div class="documentaryRating">
				<img src="images/star.png" alt="">
				<p class="per-rating">${formRating.value}</p>
			</div>`;

		newDataFinished.innerHTML = perDocumentary;
		containerAllDocumentary.insertBefore(newDataFinished, containerAllDocumentary.firstChild);
	}

	form.reset();
	formRatingContainer.style.display = 'none';
})









