import React, { useState, useMemo } from 'react';

// --- MOCK DATABASE ---
const MOCK_FOOD_DATABASE = {
  // --- Indian Dishes (from text & image) ---
  'cooked white rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3, fiber: 0.4, vitaminC: 0, potassium: 35, calcium: 10, magnesium: 12 },
  'brown rice': { calories: 215, protein: 5, carbs: 45, fat: 1.8, fiber: 3.5, vitaminC: 0, potassium: 177, calcium: 20, magnesium: 86 },
  'idli': { calories: 39, protein: 2, carbs: 8, fat: 0.2, fiber: 1.1, vitaminC: 0, potassium: 61, calcium: 11, magnesium: 10 },
  'dosa': { calories: 168, protein: 3, carbs: 28, fat: 5, fiber: 1.1, vitaminC: 0, potassium: 96, calcium: 18, magnesium: 20 },
  'upma': { calories: 150, protein: 4, carbs: 30, fat: 2, fiber: 2, vitaminC: 1, potassium: 80, calcium: 15, magnesium: 25 },
  'poha': { calories: 250, protein: 6.7, carbs: 77, fat: 0, fiber: 2.5, vitaminC: 1.5, potassium: 180, calcium: 20, magnesium: 30 },
  'vada': { calories: 144, protein: 4, carbs: 18, fat: 6, fiber: 2, vitaminC: 0, potassium: 100, calcium: 15, magnesium: 18 },
  'paratha': { calories: 320, protein: 6, carbs: 35, fat: 15, fiber: 4, vitaminC: 0, potassium: 150, calcium: 25, magnesium: 30 },
  'sambar': { calories: 90, protein: 5, carbs: 10, fat: 3, fiber: 3, vitaminC: 5, potassium: 200, calcium: 30, magnesium: 35 },
  'coconut chutney': { calories: 105, protein: 1, carbs: 3, fat: 10, fiber: 2, vitaminC: 1, potassium: 110, calcium: 10, magnesium: 15 },
  'bhindi (okra)': { calories: 30, protein: 2, carbs: 7, fat: 0.2, fiber: 3.2, vitaminC: 23, potassium: 299, calcium: 82, magnesium: 57 },
  'turai (ridge gourd)': { calories: 14, protein: 0.6, carbs: 3.4, fat: 0.1, fiber: 1.2, vitaminC: 5, potassium: 150, calcium: 20, magnesium: 14 },
  'aloo gobi': { calories: 110, protein: 3, carbs: 20, fat: 5, fiber: 4, vitaminC: 40, potassium: 350, calcium: 40, magnesium: 25 },
  'dal (lentils)': { calories: 200, protein: 15, carbs: 40, fat: 1.3, fiber: 15, vitaminC: 2, potassium: 600, calcium: 50, magnesium: 80 },
  'chole masala': { calories: 150, protein: 20, carbs: 30, fat: 6, fiber: 8, vitaminC: 10, potassium: 400, calcium: 60, magnesium: 50 },
  'palak paneer': { calories: 180, protein: 10, carbs: 8, fat: 12, fiber: 3, vitaminC: 15, potassium: 300, calcium: 200, magnesium: 60 },
  'roti (whole wheat)': { calories: 220, protein: 8, carbs: 40, fat: 2, fiber: 6, vitaminC: 0, potassium: 250, calcium: 30, magnesium: 80 },
  'naan': { calories: 260, protein: 7, carbs: 45, fat: 6, fiber: 2, vitaminC: 0, potassium: 100, calcium: 80, magnesium: 20 },
  
  // --- Fruits (from detailed table) ---
  'apple': { calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, fiber: 2.4, vitaminC: 4.6, potassium: 107, calcium: 6, magnesium: 5 },
  'banana': { calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, fiber: 2.6, vitaminC: 8.7, potassium: 358, calcium: 5, magnesium: 27 },
  'orange': { calories: 47, protein: 0.9, carbs: 11.8, fat: 0.1, fiber: 2.4, vitaminC: 53.2, potassium: 181, calcium: 40, magnesium: 10 },
  'strawberry': { calories: 32, protein: 0.7, carbs: 7.7, fat: 0.3, fiber: 2.0, vitaminC: 58.8, potassium: 153, calcium: 16, magnesium: 13 },
  'grapes': { calories: 69, protein: 0.7, carbs: 18.1, fat: 0.2, fiber: 0.9, vitaminC: 3.2, potassium: 191, calcium: 10, magnesium: 7 },
  'mango': { calories: 60, protein: 0.8, carbs: 15.0, fat: 0.3, fiber: 1.6, vitaminC: 36.4, potassium: 168, calcium: 11, magnesium: 10 },
  'pineapple': { calories: 50, protein: 0.5, carbs: 13.1, fat: 0.1, fiber: 1.4, vitaminC: 47.8, potassium: 109, calcium: 13, magnesium: 12 },
  'watermelon': { calories: 30, protein: 0.6, carbs: 7.6, fat: 0.2, fiber: 0.4, vitaminC: 8.1, potassium: 112, calcium: 7, magnesium: 10 },
  'papaya': { calories: 43, protein: 0.5, carbs: 10.8, fat: 0.3, fiber: 1.7, vitaminC: 60.9, potassium: 182, calcium: 20, magnesium: 21 },
  'dried fruit': { calories: 241, protein: 3.4, carbs: 63.0, fat: 0.4, fiber: 7.3, vitaminC: 1.0, potassium: 1162, calcium: 55, magnesium: 32 },
  'guava': { calories: 68, protein: 2.6, carbs: 14, fat: 1, fiber: 5.4, vitaminC: 228.3, potassium: 417, calcium: 18, magnesium: 22 },
  
  // --- More Fruits (Added) ---
  'kiwi': { calories: 61, protein: 1.1, carbs: 15, fat: 0.5, fiber: 3, vitaminC: 92.7, potassium: 312, calcium: 34, magnesium: 17 },
  'pear': { calories: 57, protein: 0.4, carbs: 15, fat: 0.1, fiber: 3.1, vitaminC: 4.3, potassium: 116, calcium: 9, magnesium: 7 },
  'peach': { calories: 39, protein: 0.9, carbs: 10, fat: 0.3, fiber: 1.5, vitaminC: 6.6, potassium: 190, calcium: 6, magnesium: 9 },
  'plum': { calories: 46, protein: 0.7, carbs: 11, fat: 0.3, fiber: 1.4, vitaminC: 9.5, potassium: 157, calcium: 6, magnesium: 7 },
  'cherries': { calories: 50, protein: 1, carbs: 12, fat: 0.3, fiber: 1.6, vitaminC: 7, potassium: 173, calcium: 16, magnesium: 9 },
  'blueberries': { calories: 57, protein: 0.7, carbs: 14, fat: 0.3, fiber: 2.4, vitaminC: 9.7, potassium: 77, calcium: 6, magnesium: 6 },
  'raspberries': { calories: 53, protein: 1.2, carbs: 12, fat: 0.7, fiber: 6.5, vitaminC: 26.2, potassium: 151, calcium: 25, magnesium: 22 },

  // --- Original Data (for more variety) ---
  'chicken breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6, fiber: 0, vitaminC: 0, iron: 1, potassium: 256, calcium: 15, magnesium: 29 },
  'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, fiber: 2.2, vitaminC: 28, iron: 2.7, potassium: 558, calcium: 99, magnesium: 79 },
  'milk': { calories: 103, protein: 8, carbs: 12, fat: 2.4, fiber: 0, vitaminC: 0, iron: 0.1, potassium: 382, calcium: 276, magnesium: 24 },
};

const MOCK_RECOMMENDATIONS = {
  general: "Aim for at least 5 servings of fruits and vegetables per day. Stay hydrated by drinking plenty of water.",
  lowIron: "You seem to be low on Iron. Try incorporating more spinach, red meat, and lentils into your diet.",
  lowVitaminC: "Your Vitamin C intake is a bit low. Oranges, strawberries, and bell peppers are excellent sources!",
  lowPotassium: "To increase potassium, consider eating bananas, potatoes, and beans.",
  lowCalcium: "To increase calcium, try milk, cheese, yogurt, and leafy greens like spinach.",
  lowMagnesium: "You seem low on Magnesium. Nuts, seeds, and whole grains are great sources.",
};

const MOCK_USER_DATA = [
  { id: 'user123', name: 'Alex (14)', logs: [{ date: '2025-11-04', food: 'apple', servings: 2 }, { date: '2025-11-04', food: 'white bread', servings: 2 }], deficits: ['iron'] },
  { id: 'user456', name: 'Sam (10)', logs: [{ date: '2025-11-04', food: 'banana', servings: 1 }, { date: '2025-11-04', food: 'milk', servings: 1 }], deficits: ['vitaminC'] },
];

// --- RECOMMENDED DAILY ALLOWANCES (Simplified) ---
// Added Fiber, Calcium, Magnesium
const RDA = {
  vitaminC: 75, // mg
  iron: 11, // mg
  potassium: 3000, // mg
  calcium: 1000, // mg
  magnesium: 350, // mg
  calories: 2200, // kcal
  protein: 50, // g
  carbs: 300, // g
  fat: 70, // g
  fiber: 30, // g
};

// --- HELPER COMPONENTS ---

function Header({ user, onLogout }) {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block w-8 h-8 -mt-1 mr-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
          NutriBalance
        </div>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 hidden sm:block">Welcome, <span className="font-semibold">{user.name}</span>!</span>
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-100 mt-12 py-6">
      <div className="container mx-auto px-6 text-center text-gray-600">
        &copy; {new Date().getFullYear()} NutriBalance. All rights reserved.
      </div>
    </footer>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

// --- LOGIN PAGE ---

function LoginPage({ onLogin }) {
  return (
    <div className="flex-grow flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome</h2>
        <p className="text-center text-gray-600 mb-8">Please select your role to continue.</p>
        <div className="space-y-4">
          <button
            onClick={() => onLogin('user')}
            className="w-full py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-75 transition-all"
          >
            I am a User
          </button>
          <button
            onClick={() => onLogin('admin')}
            className="w-full py-3 px-4 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition-all"
          >
            I am an Admin
          </button>
        </div>
      </Card>
    </div>
  );
}

// --- USER DASHBOARD ---

function UserDashboard() {
  const [dietLog, setDietLog] =useState([]); // [{ food: 'apple', servings: 1 }]
  const [foodInput, setFoodInput] = useState("");
  const [servingsInput, setServingsInput] = useState(1);
  
  // New state for user-defined limits
  const [calorieLimit, setCalorieLimit] = useState(RDA.calories);
  const [fatLimit, setFatLimit] = useState(RDA.fat);


  // Calculate nutrient intake
  const nutrientTotals = useMemo(() => {
    const totals = {
      calories: 0, protein: 0, carbs: 0, fat: 0, vitaminC: 0, iron: 0, potassium: 0,
      fiber: 0, calcium: 0, magnesium: 0 // Added new nutrients
    };
    dietLog.forEach(entry => {
      const foodData = MOCK_FOOD_DATABASE[entry.food.toLowerCase()];
      if (foodData) {
        Object.keys(totals).forEach(nutrient => {
          totals[nutrient] += (foodData[nutrient] || 0) * entry.servings;
        });
      }
    });
    return totals;
  }, [dietLog]);

  // Detect nutrient deficiencies
  const deficiencies = useMemo(() => {
    const detected = [];
    if (nutrientTotals.iron < (RDA.iron / 2)) detected.push('lowIron');
    if (nutrientTotals.vitaminC < (RDA.vitaminC / 2)) detected.push('lowVitaminC');
    if (nutrientTotals.potassium < (RDA.potassium / 2)) detected.push('lowPotassium');
    if (nutrientTotals.calcium < (RDA.calcium / 2)) detected.push('lowCalcium');
    if (nutrientTotals.magnesium < (RDA.magnesium / 2)) detected.push('lowMagnesium');
    return detected;
  }, [nutrientTotals]);

  // Generate personalized diet plan
  const dietPlan = useMemo(() => {
    let plan = [MOCK_RECOMMENDATIONS.general];
    deficiencies.forEach(deficiency => {
      plan.push(MOCK_RECOMMENDATIONS[deficiency]);
    });
    return plan;
  }, [deficiencies]);

  const handleAddFood = (e) => {
    e.preventDefault();
    const food = foodInput.trim().toLowerCase();
    if (food && MOCK_FOOD_DATABASE[food] && servingsInput > 0) {
      setDietLog([...dietLog, { food, servings: Number(servingsInput) }]);
      setFoodInput("");
      setServingsInput(1);
    } else if (food && !MOCK_FOOD_DATABASE[food]) {
      // Use a modal or inline error instead of alert
      console.error("Sorry, that food is not in our database. Please try another.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- 1. Input Dietary Habits --- */}
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Log Your Meal</h2>
          <form onSubmit={handleAddFood} className="space-y-4">
            <div>
              <label htmlFor="food" className="block text-sm font-medium text-gray-600">Food Item</label>
              <input
                type="text"
                id="food"
                value={foodInput}
                onChange={(e) => setFoodInput(e.target.value)}
                placeholder="e.g., 'Apple' or 'Chicken Breast'"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label htmlFor="servings" className="block text-sm font-medium text-gray-600">Servings</label>
              <input
                type="number"
                id="servings"
                min="0.1"
                step="0.1"
                value={servingsInput}
                onChange={(e) => setServingsInput(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
            >
              Add Food
            </button>
          </form>
          
          <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-2">Today's Log</h3>
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {dietLog.length === 0 && <li className="text-gray-500">No food logged yet.</li>}
            {dietLog.map((item, index) => (
              <li key={index} className="flex justify-between items-center text-gray-700">
                <span className="capitalize">{item.food}</span>
                <span className="font-medium">{item.servings} serving(s)</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* --- 2. Monitor Nutrient Intake & Custom Limits --- */}
        <div className="lg:col-span-1 space-y-6">
          {/* --- Custom Limits Card (New) --- */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Set Custom Limits</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="calorieLimit" className="block text-sm font-medium text-gray-600">Calorie Limit (kcal)</label>
                <input
                  type="number"
                  id="calorieLimit"
                  min="0"
                  step="100"
                  value={calorieLimit}
                  onChange={(e) => setCalorieLimit(Number(e.target.value) || RDA.calories)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="fatLimit" className="block text-sm font-medium text-gray-600">Fat Limit (g)</label>
                <input
                  type="number"
                  id="fatLimit"
                  min="0"
                  step="1"
                  value={fatLimit}
                  onChange={(e) => setFatLimit(Number(e.target.value) || RDA.fat)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </Card>

          {/* --- Nutrient Intake Card (Modified) --- */}
          <Card>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Nutrient Intake</h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {Object.keys(RDA).map(nutrient => {
                const total = nutrientTotals[nutrient].toFixed(1);
                
                // Use custom limits for calories and fat
                let limit = RDA[nutrient];
                if (nutrient === 'calories') {
                  limit = calorieLimit;
                } else if (nutrient === 'fat') {
                  limit = fatLimit;
                }
                
                const percentage = ((total / limit) * 100).toFixed(0);
                
                let unit = 'mg'; // default
                if (nutrient === 'calories') unit = 'kcal';
                else if (['protein', 'carbs', 'fat', 'fiber'].includes(nutrient)) unit = 'g';

                return (
                  <div key={nutrient}>
                    <div className="flex justify-between text-sm font-medium text-gray-600 mb-1">
                      <span className="capitalize">{nutrient}</span>
                      <span>{total} / {limit} {unit}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${percentage > 100 ? 'bg-red-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      ></div>
                    </div>
                    {percentage > 100 && (
                       <div className="text-xs text-right text-red-600 font-medium">
                         {percentage}% of RDA
                       </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* --- 3. Receive Personalized Diet Plans --- */}
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Diet Plan & Recommendations</h2>
          {deficiencies.length > 0 && (
            <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
              <h3 className="font-bold">Deficiencies Detected!</h3>
              <p>Your intake seems low in: {deficiencies.map(d => d.replace('low', '')).join(', ')}.</p>
            </div>
          )}
          <ul className="space-y-3">
            {dietPlan.map((rec, index) => (
              <li key={index} className="flex items-start">
                <svg className="w-5 h-5 text-emerald-500 mr-2 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </Card>
        
      </div>
    </div>
  );
}

// --- ADMIN DASHBOARD ---

function AdminDashboard() {
  // In a real app, these would have functions to edit/update the database
  const [nutritionData, setNutritionData] = useState(MOCK_FOOD_DATABASE);
  const [recommendations, setRecommendations] = useState(MOCK_RECOMMENDATIONS);
  const [userData, setUserData] = useState(MOCK_USER_DATA);
  
  // State for the new food form
  const [newFood, setNewFood] = useState({
    name: '', calories: 0, protein: 0, carbs: 0, fat: 0,
    fiber: 0, vitaminC: 0, iron: 0, potassium: 0, calcium: 0, magnesium: 0
  });
  
  // State for editing recommendations
  const [tempRecommendations, setTempRecommendations] = useState(MOCK_RECOMMENDATIONS);

  const handleNewFoodChange = (e) => {
    const { name, value } = e.target;
    setNewFood(prev => ({ ...prev, [name]: name === 'name' ? value : Number(value) }));
  };

  const handleAddFood = (e) => {
    e.preventDefault();
    const foodName = newFood.name.trim().toLowerCase();
    if (foodName && !nutritionData[foodName]) {
      const { name, ...nutrients } = newFood;
      setNutritionData(prev => ({
        ...prev,
        [foodName]: nutrients
      }));
      // Reset form
      setNewFood({
        name: '', calories: 0, protein: 0, carbs: 0, fat: 0,
        fiber: 0, vitaminC: 0, iron: 0, potassium: 0, calcium: 0, magnesium: 0
      });
    } else {
      console.error("Food name is empty or already exists.");
    }
  };

  const handleRemoveFood = (foodName) => {
    setNutritionData(prev => {
      const { [foodName]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleRecChange = (e, key) => {
    const { value } = e.target;
    setTempRecommendations(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveRecommendations = () => {
    setRecommendations(tempRecommendations);
    // Here you would also POST to an API
    console.log("Recommendations saved!");
  };

return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* --- 1. Manage Nutritional Data (Interactive) --- */}
        <Card className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Nutritional Data</h2>
          
          {/* List of existing foods */}
          <div className="space-y-2 max-h-64 overflow-y-auto border p-2 rounded-lg">
            {Object.keys(nutritionData).sort().map(food => (
              <div key={food} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                <div>
                  <span className="font-semibold capitalize">{food}</span>
                  <span className="text-gray-600"> ({nutritionData[food].calories} kcal)</span>
                </div>
                <button 
                  onClick={() => handleRemoveFood(food)}
                  className="text-red-500 hover:text-red-700 font-medium"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          {/* Add new food form */}
          <form onSubmit={handleAddFood} className="space-y-2 border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-700">Add New Food</h3>
            <input
              type="text"
              name="name"
              placeholder="Food Name"
              value={newFood.name}
              onChange={handleNewFoodChange}
              className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
              required
            />
            {/* Simplified nutrient inputs */}
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(newFood).filter(k => k !== 'name').map(key => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-500 capitalize">{key}</label>
                  <input
                    type="number"
                    name={key}
                    min="0"
                    step="0.1"
                    value={newFood[key]}
                    onChange={handleNewFoodChange}
                    className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
            >
              Add Food
            </button>
          </form>
        </Card>

        {/* --- 2. Update Dietary Recommendations (Interactive) --- */}
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Manage Recommendations</h2>
          <div className="space-y-4 max-h-[30rem] overflow-y-auto">
            {Object.keys(tempRecommendations).map(key => (
              <div key={key}>
                <label className="block text-sm font-semibold capitalize text-gray-600">{key.replace('low', 'Low ')}:</label>
                <textarea
                  value={tempRecommendations[key]}
                  onChange={(e) => handleRecChange(e, key)}
                  className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                  rows="3"
                />
              </div>
            ))}
          </div>
          <button 
            onClick={handleSaveRecommendations}
            className="mt-4 w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 transition-colors"
          >
            Save Recommendations
          </button>
        </Card>

        {/* --- 3. Track User Health Data --- */}
        <Card className="lg:col-span-1">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Track User Health Data</h2>
           <div className="space-y-3 max-h-64 overflow-y-auto">
            {userData.map(user => (
              <div key={user.id} className="p-3 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-600">
                  Latest Logs: {user.logs.length} item(s)
                </p>
                <p className="text-sm">
                  <span className="font-medium">Deficits: </span>
                  <span className="text-red-600 font-semibold">
                    {user.deficits.length > 0 ? user.deficits.join(', ') : 'None'}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}


// --- MAIN APP COMPONENT ---

function App() {
  const [currentUser, setCurrentUser] = useState(null); // null, 'user', 'admin'

  const handleLogin = (role) => {
    setCurrentUser({
      role: role,
      name: role === 'admin' ? 'Admin' : 'Teen User' 
    });
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const renderDashboard = () => {
    if (!currentUser) {
      return <LoginPage onLogin={handleLogin} />;
    }
    if (currentUser.role === 'user') {
      return <UserDashboard />;
    }
    if (currentUser.role === 'admin') {
      return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header user={currentUser} onLogout={handleLogout} />
      <main className="flex-grow">
        {renderDashboard()}
      </main>
      <Footer />
    </div>
  );
}

export default App;

