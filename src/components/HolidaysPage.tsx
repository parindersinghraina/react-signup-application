// HolidaysPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './HolidaysPage.css';
import config from '../config.json';

interface Holiday {
  country: string;
  iso: string;
  year: number;
  date: string;
  day: string;
  name: string;
  type: string;
}

const HolidaysPage: React.FC = () => {
  const [country, setCountry] = useState<string>('');
  const [year, setYear] = useState<number | ''>('');
  const [type, setType] = useState<string>('');
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const handleFetchHolidays = async () => {
    try {
      const apiKey = config.NINJAS_API_KEY;
      setLoading(true);
      const response = await axios.get<Holiday[]>(
        `https://api.api-ninjas.com/v1/holidays?country=${country}&year=${year}&type=${type}`,
        { headers: { 'X-Api-Key': config.NINJAS_API_KEY } }
      );
      setHolidays(response.data);
      setModalIsOpen(true); // Open the modal after fetching holidays
    } catch (error) {
      console.error('Error fetching holidays:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // You can add additional logic when the component mounts or dependencies change
  }, [country, year, type]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="holidays-page">
      <h2>Holidays for {country} - {year}</h2>
      <div className="input-container">
        <label>Select Country:</label>
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Select Country</option>
          {/* Add more options based on your requirements */}
          <option value="CA">Canada</option>
          <option value="US">United States</option>
          <option value="MX">Mexico</option>
          <option value="BR">Brazil</option>
          <option value="DE">Germany</option>
          <option value="FR">France</option>
          <option value="ES">Spain</option>
          <option value="IT">Italy</option>
          <option value="GB">United Kingdom</option>
          <option value="IN">India</option>
          <option value="JP">Japan</option>
          <option value="KR">South Korea</option>
          <option value="CN">China</option>
          <option value="RU">Russia</option>
          {/* Add more countries as needed */}
        </select>
      </div>
      <div className="input-container">
        <label>Select Year:</label>
        <select value={year} onChange={(e) => setYear(e.target.value !== '' ? parseInt(e.target.value) : '')}>
          <option value="">Select Year</option>
          {/* Add more options based on your requirements */}
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
          <option value="2029">2029</option>
          <option value="2030">2030</option>
          {/* Add more years as needed */}
        </select>
      </div>
      <div className="input-container">
        <label>Select Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          {/* Add more options based on your requirements */}
          <option value="public_holiday">Public Holiday</option>
          <option value="national_holiday">National Holiday</option>
          <option value="local_holiday">Local Holiday</option>
          <option value="federal_holiday">Federal Holiday</option>
          <option value="observance">Observance</option>
          <option value="state_holiday">State Holiday</option>
          <option value="united_nations_observance">United Nations Observance</option>
          <option value="optional_holiday">Optional Holiday</option>
          <option value="clock_change_daylight_saving_time">Clock Change Daylight Saving Time</option>
          <option value="bank_holiday">Bank Holiday</option>
          <option value="common_local_holiday">Common Local Holiday</option>
          <option value="christian">Christian</option>
          <option value="observance_christian">Observance Christian</option>
          <option value="observance_hebrew">Observance Hebrew</option>
          <option value="jewish_holiday">Jewish Holiday</option>
          <option value="muslim">Muslim</option>
          <option value="hindu_holiday">Hindu Holiday</option>
          <option value="restricted_holiday">Restricted Holiday</option>
          <option value="official_holiday">Official Holiday</option>
          <option value="national_holiday_orthodox">National Holiday Orthodox</option>
          <option value="local_observance">Local Observance</option>
          {/* Add more holiday types as needed */}
        </select>
      </div>
      <button onClick={handleFetchHolidays} disabled={loading}>
        {loading ? 'Loading...' : 'Results'}
      </button>

      {/* Modal for displaying holidays */}
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Holiday Results">
        <div className="modal-header">
          <h2>Holiday Results</h2>
          <button onClick={handlePrint} className="print-button">
            Print
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Day</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday.date}>
                <td>{holiday.name}</td>
                <td>{holiday.date}</td>
                <td>{holiday.day}</td>
                <td>{holiday.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={closeModal} className="close-button">
          Close
        </button>
      </Modal>
    </div>
  );
};
export default HolidaysPage;
