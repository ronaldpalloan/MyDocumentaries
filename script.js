const form = document.getElementById('form');
const formTitle = document.getElementById('title');
const formChannel = document.getElementById('channel');
const formHours = document.getElementById('formHours');
const formMinutes = document.getElementById('formMinutes');
const formSeconds = document.getElementById('formSeconds');
const finishedButton = document.getElementById('finishedButton');
const wantWatchButton = document.getElementById('wantWatchButton')
const formRatingContainer = document.querySelector('.ratingContainer');
const formDate = document.getElementById('date');
const formRating = document.getElementById('rating');
const submitButton = document.getElementById('submitButton');
const containerAllDocumentary = document.querySelector('.containerAllDocumentary');
const wantWatchContainer = document.querySelector('.want-watch-container');
// Stats
let finishedStats = document.querySelector('.finished-stats');
let watchlistStats = document.querySelector('.watchlist-stats');
let totalHoursStats = document.querySelector('.total-hours-stats');
let highestRatingStats = document.querySelector('.highest-rating-stats');
let totalHighestRating = document.querySelector('.total-highest-rating');
let lowestRatingStats = document.querySelector('.lowest-rating-stats');
let totalLowestRating = document.querySelector('.total-lowest-rating');
let averageRatingStats = document.querySelector('.average-rating-stats');

// MENAMPILKAN DATA DARI STORAGE
window.addEventListener('DOMContentLoaded', function() {
	showData();
});

// DEFAULT FORMDATE KE TANGGAL HARI INI
formDate.value = new Date().toISOString().slice(0, 10);
;

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
			<div class="rating-container-finished">
				<div class="documentaryRating">
					<img src="images/star.png" alt="">
					<p class="per-rating">${formRating.value}</p>
				</div>
				<p class="per-date">(${formDate.value})</p>
			</div>
			<div class="edit-finished">
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle edit-finished-button" viewBox="0 0 16 16">
				  <title id="edit-title">Edit</title>
				  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768z"/>
				</svg>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle remove-finished-button" viewBox="0 0 16 16">
				  <title id="delete-title">Remove</title>
				  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
				  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
				</svg>
			</div>`;

		newDataFinished.innerHTML = perDocumentary;
		containerAllDocumentary.insertBefore(newDataFinished, containerAllDocumentary.firstChild);

		updateStats();
		saveData();
	} else if (wantWatchButton.checked) {
		const newWantWatch = document.createElement('div');
		newWantWatch.classList.add('per-wantwatch');

		const perWantWatch = `
		<p class="per-title">${formTitle.value}</p>
		<p class="per-channel">${formChannel.value}</p>
		<p class="per-duration">${formHours.value}:${formMinutes.value}:${formSeconds.value}</p>
		<span class="watch-to-finished">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle finished-wantwatch-button" viewBox="0 0 16 16">
				<title id="finished-title">Finished</title>
			  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
			  <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/>
			</svg>

			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle remove-wantwatch-button" viewBox="0 0 16 16">
				<title id="delete-title">Remove</title>
			  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
			  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
			</svg>
		</span>`;

		newWantWatch.innerHTML = perWantWatch;
		wantWatchContainer.insertBefore(newWantWatch, wantWatchContainer.firstChild);

		updateStats();
		saveData();
	}

	form.reset();
	formRatingContainer.style.display = 'none';
	formDate.value = new Date().toISOString().slice(0, 10);
});

// EDIT FINISHED DATA
// Tombol Edit
const formEditContainer = document.querySelector('.form-edit-container');

window.addEventListener('click', function(e) {
	if (e.target.classList.contains('edit-finished-button')) {
		formEditContainer.classList.toggle('display-flex');
		
		// Form Edit Otomatis terisi data yang sesuai diklik
		const editFinishedTitle = document.getElementById('editFinishedTitle');
		const editFinishedChannel = document.getElementById('editFinishedChannel');
		const editFinishedHours = document.getElementById('editFinishedHours');
		const editFinishedMinutes = document.getElementById('editFinishedMinutes');
		const editFinishedSeconds = document.getElementById('editFinishedSeconds');
		const editFinishedDate = document.getElementById('editFinishedDate');
		const editFinishedRating = document.getElementById('editFinishedRating');


		const parentFormEdit = e.target.parentElement.parentElement;
		const formPerTitle = parentFormEdit.querySelector('.per-title').innerText;
		const formPerChannel = parentFormEdit.querySelector('.per-channel').innerText;
		const [fHours, fMinutes, fSeconds] = parentFormEdit.querySelector('.per-duration').innerText.split(':');
		const formPerDate = parentFormEdit.querySelector('.per-date').innerText;
		const formPerDatePure = formPerDate.replace(/[()]/g, '');
		const formPerRating = parentFormEdit.querySelector('.per-rating').innerText;

		editFinishedTitle.value = formPerTitle;
		editFinishedChannel.value = formPerChannel;
		editFinishedHours.value = fHours;
		editFinishedMinutes.value = fMinutes;
		editFinishedSeconds.value = fSeconds;
		editFinishedDate.value = formPerDatePure;
		editFinishedRating.value = formPerRating;

		// Validasi Input Duration Edit Finished
		const editFormTime = [editFinishedHours, editFinishedMinutes, editFinishedSeconds];

		for (i = 0; i < editFormTime.length; i++) {
			let item = editFormTime[i];

			item.addEventListener('input', function() {
				item.value = item.value.replace(/[^0-9]/g, '');
			});
		};

		// Validasi Input Rating Edit Finished
		editFinishedRating.addEventListener('input', function() {
			editFinishedRating.value = editFinishedRating.value.replace(/[^0-9]/g, '');
			parsedRating = parseInt(editFinishedRating.value, 10);
			if (isNaN(parsedRating)) {
				editFinishedRating.value = '';
			} else {
				editFinishedRating.value = Math.min(Math.max(parsedRating, 1), 10);
			}
		})

		// Tombil Submit Edit
		const submitEditButton = document.getElementById('submitEditButton');

		submitEditButton.addEventListener('click', function(e) {
			parentFormEdit.querySelector('.per-title').innerText = editFinishedTitle.value;
			parentFormEdit.querySelector('.per-channel').innerText = editFinishedChannel.value;
			parentFormEdit.querySelector('.per-duration').innerText = `${editFinishedHours.value}:${editFinishedMinutes.value}:${editFinishedSeconds.value}`;
			parentFormEdit.querySelector('.per-date').innerText = `(${editFinishedDate.value})`;
			parentFormEdit.querySelector('.per-rating').innerText = editFinishedRating.value;

			formEditContainer.classList.remove('display-flex');
			e.preventDefault();

			updateStats();
			saveData();
		})
	}
})

// Tombol Close Edit
const closeEditButton = document.getElementById('closeEditFinished');

closeEditButton.addEventListener('click', function() {
	formEditContainer.classList.remove('display-flex');
});

// Tombol Cancel Edit
const cancelEditButton = document.getElementById('cancelEditButton');

cancelEditButton.addEventListener('click', function(e) {
	formEditContainer.classList.remove('display-flex');
	e.preventDefault();
})

// Tombol Remove Doc
const removeFinishedButton = document.querySelector('.remove-finished-button');

window.addEventListener('click', function(e) {
	if (e.target.classList.contains('remove-finished-button')) {
		e.target.parentElement.parentElement.remove();

		// Agar Nomor Tetap Urut
		const perNumber = Array.from(document.querySelectorAll('.per-number'));
		
		for (let i = 0; i < perNumber.length; i++) {
			perNumber[i].innerText = perNumber.length - i;
		}

		updateStats();
		saveData();
	}
})

// EDIT WANT WATCH DATA
// Tombol Finished WWD
const finishWantwatchContainer = document.querySelector('.form-finish-wantwatch-container');

window.addEventListener('click', function(e) {
	// Tampilkan
	if (e.target.classList.contains('finished-wantwatch-button')) {
		finishWantwatchContainer.style.display = 'flex';
		// Isi Data sesuai
		const titleFinishWantwatch = document.getElementById('titleFinishWantwatch');
		const channelFinishWantwatch = document.getElementById('channelFinishWantwatch');
		const durationFinishWantwatch = document.getElementById('durationFinishWantwatch');
		const dateFinishWantwatch = document.getElementById('dateFinishWantwatch');
		const ratingFinishWantwatch = document.getElementById('ratingFinishWantwatch');
		const parentWantwatch = e.target.parentElement.parentElement;

		valueTitleWantwatch = parentWantwatch.querySelector('.per-title').innerText;
		valueChannelWantwatch = parentWantwatch.querySelector('.per-channel').innerText;
		valueDurationWantwatch = parentWantwatch.querySelector('.per-duration').innerText;

		titleFinishWantwatch.value = valueTitleWantwatch;
		channelFinishWantwatch.value = valueChannelWantwatch;
		durationFinishWantwatch.value = valueDurationWantwatch;
		dateFinishWantwatch.value = new Date().toISOString().slice(0, 10);

		// Validasi Input Rating
		ratingFinishWantwatch.addEventListener('input', function() {
			ratingFinishWantwatch.value = ratingFinishWantwatch.value.replace(/[^0-9]/g, '');
			parsedRating = parseInt(ratingFinishWantwatch.value, 10);
			if (isNaN(parsedRating)) {
				ratingFinishWantwatch.value = '';
			} else {
				ratingFinishWantwatch.value = Math.min(Math.max(parsedRating, 1), 10);
			}
		});
	} else if (e.target.classList.contains('remove-wantwatch-button')) {
		e.target.parentElement.parentElement.remove();

		updateStats();
		saveData();
	}
});

// Tombol Finish di form Wantwatch
const finishWantwatchButton = document.getElementById('finishWantwatchButton');

finishWantwatchButton.addEventListener('click', function(e) {
	const newDataFinished = document.createElement('div');
	newDataFinished.classList.add('perDocumentary');
	const documentaryOrder = containerAllDocumentary.childElementCount;

	const perDocumentary = `
		<p class="per-number">${documentaryOrder + 1}</p>
		<div class="documentaryInfo">
			<p class="per-title">${titleFinishWantwatch.value}</p>
			<p class="per-channel">${channelFinishWantwatch.value}</p>
			<p class="per-duration">${durationFinishWantwatch.value}</p>
		</div>
		<div class="rating-container-finished">
			<div class="documentaryRating">
				<img src="images/star.png" alt="">
				<p class="per-rating">${ratingFinishWantwatch.value}</p>
			</div>
			<p class="per-date">(${dateFinishWantwatch.value})</p>
		</div>
		<div class="edit-finished">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-left-circle edit-finished-button" viewBox="0 0 16 16">
			  <title id="edit-title">Edit</title>
			  <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-5.904-2.854a.5.5 0 1 1 .707.708L6.707 9.95h2.768a.5.5 0 1 1 0 1H5.5a.5.5 0 0 1-.5-.5V6.475a.5.5 0 1 1 1 0v2.768z"/>
			</svg>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle remove-finished-button" viewBox="0 0 16 16">
			  <title id="delete-title">Remove</title>
			  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
			  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
			</svg>
		</div>`;

	newDataFinished.innerHTML = perDocumentary;
	containerAllDocumentary.insertBefore(newDataFinished, containerAllDocumentary.firstChild);

	finishWantwatchContainer.style.display = 'none';

	// Remove after Finish
	const allWantwatchTitle = Array.from(document.querySelectorAll('.per-wantwatch .per-title'));
	for (item of allWantwatchTitle) {
		if (item.innerText === titleFinishWantwatch.value) {
			item.parentElement.remove();
		}
	}

	// Agar Rating Reset setelah finish
	ratingFinishWantwatch.value = '';

	updateStats();
	e.preventDefault();
	saveData();
});


// Tombol Close pada Finish Wantwatch
window.addEventListener('click', function(e) {
	if (e.target.id === 'closeFinishWantwatch') {
		finishWantwatchContainer.style.display = 'none';
	}
})

// Tombol Cancel pada Finish Wantwatch
const cancelFinishWantwatchButton = document.getElementById('cancelFinishWantwatchButton');

cancelFinishWantwatchButton.addEventListener('click', function(e) {
	finishWantwatchContainer.style.display = 'none';
	e.preventDefault();
})

// Statistics
window.addEventListener('DOMContentLoaded', function() {
	updateStats();
})




// Funnctions
function updateStats() {
	// Total Finished dan Watchlist
	finishedStats.innerText = containerAllDocumentary.childElementCount;
	watchlistStats.innerText = wantWatchContainer.childElementCount;

	// Total Hours
	const durationFinished = Array.from(containerAllDocumentary.querySelectorAll('.per-duration'));
	let totalSecondStats = 0;

	// Jumlahkan total detik setiap documentary finish
	for (everyDuration of durationFinished) {
		let [hStats, mStats, sStats] = everyDuration.innerText.split(':');
		hStats = parseInt(hStats, 10);
		mStats = parseInt(mStats, 10);
		sStats = parseInt(sStats, 10);

		const totalhmsStats = (hStats * 3600) + (mStats * 60) + sStats;
		totalSecondStats += totalhmsStats;
	}

	// Convert total detik ke jam menit detik
	let hoursStats = Math.floor(totalSecondStats/3600);
	totalSecondStats -= 3600 * hoursStats;
	let minutesStats = Math.floor(totalSecondStats/60);
	totalSecondStats -= 60 * minutesStats;
	let secondsStats = totalSecondStats;

	if (secondsStats < 10) {
		secondsStats = `0${secondsStats}`;
	} else if (minutesStats < 10) {
		minutesStats = `0${minutesStats}`;
	} else if (hoursStats < 10) {
		hoursStats = `0${hoursStats}`;
	}

	totalHoursStats.innerText = `${hoursStats}h ${minutesStats}m ${secondsStats}s`;

	// Rating Stats
	let allRating = Array.from(containerAllDocumentary.querySelectorAll('.per-rating'));
	let allRatingValue = allRating.map(a => a.innerText)
		.map(a => parseInt(a, 10));

	// Highest Rating
	let maxValue = Math.max(...allRatingValue);
	let maxRatingValueArray = allRatingValue.filter(a => a === maxValue);

	// Lowest Rating
	let minValue = Math.min(...allRatingValue);
	let minRatingValueArray = allRatingValue.filter(a => a === minValue);

	// Average Rating
	let totalRating = allRatingValue.reduce((acc, curr) => acc + curr);
	let averageRating = (totalRating / allRatingValue.length).toFixed(2);
	
	// Tampilkan
	highestRatingStats.innerText = maxValue;
	totalHighestRating.innerText = `(${maxRatingValueArray.length})`
	lowestRatingStats.innerText = minValue;
	totalLowestRating.innerText = `(${minRatingValueArray.length})`;
	averageRatingStats.innerText = averageRating;
}

function saveData() {
	localStorage.setItem('documentary-finish-data', containerAllDocumentary.innerHTML);
	localStorage.setItem('documentary-wantwatch-data', wantWatchContainer.innerHTML);
}

function showData() {
	containerAllDocumentary.innerHTML = localStorage.getItem('documentary-finish-data');
	wantWatchContainer.innerHTML = localStorage.getItem('documentary-wantwatch-data');
}












