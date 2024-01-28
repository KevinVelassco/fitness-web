import { API_URL } from '../config/app.config.js';

class CalorieService {
  async calculateCalorieRequirement(payload) {
    const response = await fetch(
      `${API_URL}/calorie/calculate-calorie-requirement`,
      {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const data = await response.json();

    return {
      status: response.status,
      data
    };
  }
}

export default new CalorieService();
