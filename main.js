const options = document.querySelectorAll('.option');

// fetchData
const fetchData = async () => {
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        return data;
    } catch(error){
        throw new Error('Error while fetching data:', error);
    }
}

const displayData = (data, timeframe) => {
    // for last ${timeframe} display
    const timeframeText = {
        daily: "Day",
        weekly: "Week",
        monthly: "Month"
    };
    // iterate through every array object and find the title, currentHours and previousHours
    data.forEach(activity => {
        const titleActivity = activity.title.replace(/\s+/g, '-').toLowerCase();  
        const currentHours = activity.timeframes[timeframe].current;
        const previousHours = activity.timeframes[timeframe].previous;

        // select the correct card
        const card = document.querySelector(`.container__${titleActivity.toLowerCase()}`);

        // change the textContent for the timeframe
        if(card){
            card.querySelector('.current').textContent = currentHours + 'hrs';
            card.querySelector('.previous').textContent = 'Last ' + timeframeText[timeframe] + ' - ' + previousHours + 'hrs';
        }
    });
}

const handleOption = (options) => {
    // iterate through every option
    options.forEach(option => {

        // create a click event for every one
        option.addEventListener('click', async() => {

            // style for active class
            options.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');

            // select option text
            const timeframe = option.textContent.toLowerCase();

            // fetch data
            try {
                const data = await fetchData();
                if(data){
                    // connect data and option text
                    displayData(data, timeframe);
                }
            } catch(error){
                console.log('Error while handling options:', error);
            }
        });
    });
}

// by default show daily times
(async () => {
    const data = await fetchData();
    if (data) {
        displayData(data, 'daily');
        document.querySelector('.daily').classList.add('active');
    }
    handleOption(options);
})();