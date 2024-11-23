import React, { useState, useEffect } from "react";
import axios from "axios";
import Prayer from "./component/Prayer";

function App() {
  const cities = [
    { name: "الدارالبيضاء", value: "casablanca" },
    { name: "الرباط", value: "rabat" },
    { name: "طنجة", value: "tanger" },
    { name: "فاس", value: "fes" },
    { name: "الناظور", value: "nador" },
    { name: "وجدة", value: "oujda" },
    { name: "مكناس", value: "meknes" },
    { name: "الداخلة", value: "dakhla" },
    { name: "جرسيف", value: "guercif" },
    { name: "الجديدة", value: "el-jadida" },
    { name: "مراكش", value: "marrakech" },
    { name: "أكادير", value: "agadir" },
    { name: "تطوان", value: "tetouan" },
    { name: "القنيطرة", value: "kenitra" },
    { name: "أسفي", value: "safi" },
    { name: "تارودانت", value: "taroudant" },
    { name: "الحسيمة", value: "al-hoceima" },
    { name: "العيون", value: "laayoune" },
    { name: "بني ملال", value: "beni-mellal" },
    { name: "ورزازات", value: "ouarzazate" },
    { name: "تازة", value: "taza" },
    { name: "الصويرة", value: "essaouira" },
    { name: "زاكورة", value: "zagora" },
    { name: "تاونات", value: "taounate" },
    { name: "شفشاون", value: "chefchaouen" },
  ];

  const [selectedCity, setSelectedCity] = useState("casablanca");
  const [prayerTimes, setPrayerTimes] = useState({});

  // Fetch Prayer Times
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await axios.get(
          `http://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=Morocco&method=2`
        );
        setPrayerTimes(response.data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, [selectedCity]);

  return (
    <section>
      <div className="container">
        <div className="top_section">
          <div className="city">
            <h3>المدينة</h3>
            <select
              name="city"
              id="city-select"
              onChange={(e) => setSelectedCity(e.target.value)}
              value={selectedCity}
            >
              {cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          <div className="date">
            <h3>التاريخ</h3>
            <h4>{new Date().toLocaleDateString("ar-MA")}</h4>
          </div>
        </div>
        {prayerTimes ? (
          <>
            <Prayer name="الفجر" time={prayerTimes.Fajr} />
            <Prayer name="الظهر" time={prayerTimes.Dhuhr} />
            <Prayer name="العصر" time={prayerTimes.Asr} />
            <Prayer name="المغرب" time={prayerTimes.Maghrib} />
            <Prayer name="العشاء" time={prayerTimes.Isha} />
          </>
        ) : (
          <p>جاري تحميل أوقات الصلاة...</p>
        )}
      </div>
    </section>
  );
}

export default App;
