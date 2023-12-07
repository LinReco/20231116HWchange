// select 下拉式選單
const city = document.getElementById("city")
// 縣市名稱
const cityName = document.getElementById("cityName")
// 天氣狀態
const condition = document.getElementById("condition")
// 最低溫
const minT = document.getElementById("minT")
// 最高溫
const maxT = document.getElementById("maxT")
// 降雨機率
const rain = document.getElementById("rain")
//時段
const time = document.getElementById("time")

let cityArr = []
let timeArr = []
fetch("https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-DCCC3299-0DA4-4054-BA67-B0B6B0942484")
    .then(res => res.json())
    .then(data => {
        cityArr = data.records.location
        console.log(cityArr)
        cityArr.forEach(item => {
            city.innerHTML += `<option value=${item.locationName}>${item.locationName}</option>\n`
        });

        timeArr = data.records.location[0].weatherElement[0].time;
        timeArr.forEach((box,index) => {
            time.innerHTML += `<option value=${index}>${box.startTime}</option>\n`
        });

    })

console.dir(city)
let weatherInfo=[]

city.addEventListener("change", () => {
    let cityInfo = "";
    console.log(city.value)
    cityArr.forEach(item => {
        if (city.value == item.locationName) {
            cityInfo = item;
            weatherInfo = item.weatherElement;
            console.log(weatherInfo);
        }
    })
    console.log(cityInfo);

    cityName.innerText = cityInfo.locationName
    condition.innerText = ""
    minT.innerText = ""
    maxT.innerText = ""
    rain.innerText = ""
})
        time.addEventListener("change", () => {
            let wx = []
            let pop = []
            let minTem = []
            let maxTem = []

            weatherInfo.forEach((item, index) => {
                switch (index) {
                    case 0:
                        wx = item;
                        break;
                    case 1:
                        pop = item;
                        break;
                    case 2:
                        minTem = item;
                        break;
                    case 4:
                        maxTem = item;
                        break;
        
                }
            })

        condition.innerText = wx.time[time.value].parameter.parameterName
        minT.innerText = minTem.time[time.value].parameter.parameterName
        maxT.innerText = maxTem.time[time.value].parameter.parameterName+" 度"
        rain.innerText = "降雨機率 "+ pop.time[time.value].parameter.parameterName+ "%"
})