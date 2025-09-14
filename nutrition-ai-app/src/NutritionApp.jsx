import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Home, 
  BookOpen, 
  TrendingUp, 
  Settings, 
  Sun, 
  Moon,
  Send,
  User,
  Bot,
  ChefHat,
  Clock,
  Users,
  Zap,
  Heart,
  Target,
  Calendar,
  Award,
  Camera,
  Filter,
  Search,
  Bookmark,
  Share2,
  Download,
  Play,
  Star,
  Timer,
  Utensils
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

// --- HELPER DATA & COMPONENTS ARE NOW OUTSIDE THE MAIN APP COMPONENT ---

// Mock data for charts and recipes
const weightData = [
    { week: 1, weight: 75, target: 70 },
    { week: 2, weight: 74.5, target: 70 },
    { week: 3, weight: 73.8, target: 70 },
    { week: 4, weight: 73.2, target: 70 },
    { week: 5, weight: 72.5, target: 70 },
    { week: 6, weight: 71.8, target: 70 },
];
  
const calorieData = [
    { day: 'Mon', consumed: 1800, target: 2000, burned: 400 },
    { day: 'Tue', consumed: 1950, target: 2000, burned: 350 },
    { day: 'Wed', consumed: 2100, target: 2000, burned: 500 },
    { day: 'Thu', consumed: 1850, target: 2000, burned: 300 },
    { day: 'Fri', consumed: 2200, target: 2000, burned: 450 },
    { day: 'Sat', consumed: 1900, target: 2000, burned: 600 },
    { day: 'Sun', consumed: 2000, target: 2000, burned: 250 },
];
  
const mockRecipes = [
    {
      id: 1,
      name: "Quinoa Power Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      calories: 420,
      protein: "18g",
      carbs: "45g",
      fat: "16g",
      prepTime: "25 min",
      difficulty: "Easy",
      type: "weight-loss",
      rating: 4.8,
      ingredients: ["quinoa", "chickpeas", "avocado", "spinach", "lemon"],
      description: "Nutrient-dense bowl perfect for sustainable weight loss with complete proteins and healthy fats."
    },
    {
      id: 2,
      name: "Protein-Packed Pancakes",
      image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
      calories: 580,
      protein: "35g",
      carbs: "42g",
      fat: "22g",
      prepTime: "15 min",
      difficulty: "Easy",
      type: "weight-gain",
      rating: 4.6,
      ingredients: ["protein powder", "oats", "banana", "eggs", "greek yogurt"],
      description: "High-calorie breakfast perfect for muscle building and healthy weight gain."
    },
    {
      id: 3,
      name: "Mediterranean Salmon",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
      calories: 485,
      protein: "38g",
      carbs: "12g",
      fat: "32g",
      prepTime: "30 min",
      difficulty: "Medium",
      type: "muscle-building",
      rating: 4.9,
      ingredients: ["salmon", "olive oil", "herbs", "vegetables", "quinoa"],
      description: "Omega-3 rich meal ideal for muscle recovery and heart health."
    },
    {
      id: 4,
      name: "Green Detox Smoothie",
      image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400&h=300&fit=crop",
      calories: 285,
      protein: "12g",
      carbs: "35g",
      fat: "8g",
      prepTime: "10 min",
      difficulty: "Easy",
      type: "detox",
      rating: 4.4,
      ingredients: ["spinach", "apple", "ginger", "protein powder", "almond milk"],
      description: "Nutrient-dense smoothie for cleansing and sustained energy."
    },
    {
      id: 5,
      name: "Muscle Builder Bowl",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop",
      calories: 720,
      protein: "45g",
      carbs: "55g",
      fat: "28g",
      prepTime: "35 min",
      difficulty: "Medium",
      type: "muscle-building",
      rating: 4.7,
      ingredients: ["chicken breast", "sweet potato", "broccoli", "quinoa", "almonds"],
      description: "Complete post-workout meal for maximum muscle protein synthesis."
    },
    {
      id: 6,
      name: "Keto Avocado Toast",
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
      calories: 380,
      protein: "15g",
      carbs: "8g",
      fat: "32g",
      prepTime: "12 min",
      difficulty: "Easy",
      type: "keto",
      rating: 4.5,
      ingredients: ["avocado", "almond bread", "eggs", "feta cheese", "herbs"],
      description: "Low-carb, high-fat meal perfect for ketogenic lifestyle."
    }
];

// --- PAGE COMPONENTS (NOW OUTSIDE) ---

const HomePage = ({ darkMode, setCurrentPage }) => (
    <div className="space-y-8">
        <HeroSection />
        <StatsCards />
        
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl p-6`}
        >
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Featured Recipes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRecipes.slice(0, 3).map((recipe, index) => (
                <RecipeCard key={recipe.id} recipe={recipe} index={index} darkMode={darkMode} />
            ))}
            </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl p-6`}
        >
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { icon: Target, label: 'Weight Loss Plan', action: () => setCurrentPage('chat') },
                { icon: Zap, label: 'Muscle Building', action: () => setCurrentPage('chat') },
                { icon: Heart, label: 'Healthy Recipes', action: () => setCurrentPage('recipes') },
                { icon: Calendar, label: 'Meal Planning', action: () => setCurrentPage('chat') }
            ].map((action, idx) => (
                <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={action.action}
                className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} transition-colors text-center`}
                >
                <action.icon className={`w-8 h-8 mx-auto mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{action.label}</p>
                </motion.button>
            ))}
            </div>
        </motion.div>
    </div>
);

const ChatPage = ({ darkMode, messages, inputMessage, setInputMessage, handleKeyPress, sendMessage, isTyping, messagesEndRef }) => (
    <div className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl overflow-hidden`}>
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>AI Nutrition Coach</h2>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Online • Ready to help with your nutrition goals
                    </p>
                </div>
            </div>
        </div>
        <div className="h-[32rem] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
                <ChatMessage key={message.id} message={message} index={index} darkMode={darkMode} />
            ))}
            {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start mb-6">
                    <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                        </div>
                        <div className={`p-4 rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                            <div className="flex space-x-1">
                                {[1, 2, 3].map((dot) => (
                                    <motion.div
                                        key={dot}
                                        animate={{ opacity: [0.4, 1, 0.4] }}
                                        transition={{ duration: 1.5, repeat: Infinity, delay: dot * 0.2 }}
                                        className={`w-2 h-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
            <div ref={messagesEndRef} />
        </div>
        <div className={`p-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex space-x-3">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about diet plans, recipes, or nutrition advice..."
                    className={`flex-1 p-3 rounded-xl border ${darkMode
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isTyping}
                    className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                    <Send className="w-5 h-5" />
                </motion.button>
            </div>
        </div>
    </div>
);

const RecipesPage = ({ darkMode }) => {
    const [recipeFilter, setRecipeFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredRecipes = mockRecipes.filter(recipe => {
      const matchesFilter = recipeFilter === 'all' || recipe.type === recipeFilter;
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl p-6`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Recipe Collection
          </h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="text"
                placeholder="Search recipes or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {[
                { value: 'all', label: 'All' },
                { value: 'weight-loss', label: 'Weight Loss' },
                { value: 'weight-gain', label: 'Weight Gain' },
                { value: 'muscle-building', label: 'Muscle' },
                { value: 'keto', label: 'Keto' },
                { value: 'detox', label: 'Detox' }
              ].map((filter) => (
                <motion.button
                  key={filter.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setRecipeFilter(filter.value)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    recipeFilter === filter.value
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard key={recipe.id} recipe={recipe} index={index} darkMode={darkMode}/>
          ))}
        </div>
  
        {filteredRecipes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-12 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}
          >
            <ChefHat className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No recipes found matching your criteria
            </p>
          </motion.div>
        )}
      </div>
    );
};
  
const ProgressPage = ({ darkMode }) => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl p-6`}
      >
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Progress Overview
        </h2>
        <StatsCards />
      </motion.div>
  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl p-6`}
        >
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Weight Progress
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="week" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 0, r: 6 }}
                activeDot={{ r: 8, fill: '#3b82f6' }}
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#10b981" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
  
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl p-6`}
        >
          <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Daily Calories
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={calorieData}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: darkMode ? '#1f2937' : 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="consumed" 
                stroke="#8b5cf6" 
                fill="url(#colorConsumed)" 
                strokeWidth={2}
              />
              <Area 
                type="monotone" 
                dataKey="burned" 
                stroke="#f59e0b" 
                fill="url(#colorBurned)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorConsumed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorBurned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
  
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl p-6`}
      >
        <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Weekly Nutrition Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={calorieData}>
            <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: darkMode ? '#9ca3af' : '#6b7280' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: darkMode ? '#1f2937' : 'white',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
              }}
            />
            <Bar dataKey="consumed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="target" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
);
  
const SettingsPage = ({ darkMode, setDarkMode, userPreferences, setUserPreferences }) => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl p-6`}
      >
        <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Settings & Preferences
        </h2>
  
        <div className="space-y-6">
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Dietary Preferences
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: 'balanced', label: 'Balanced' },
                { id: 'vegetarian', label: 'Vegetarian' },
                { id: 'vegan', label: 'Vegan' },
                { id: 'keto', label: 'Keto' },
                { id: 'paleo', label: 'Paleo' },
                { id: 'mediterranean', label: 'Mediterranean' },
                { id: 'low-carb', label: 'Low Carb' },
                { id: 'high-protein', label: 'High Protein' }
              ].map((diet) => (
                <motion.button
                  key={diet.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserPreferences(prev => ({ ...prev, dietType: diet.id }))}
                  className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    userPreferences.dietType === diet.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {diet.label}
                </motion.button>
              ))}
            </div>
          </div>
  
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Fitness Goals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { id: 'lose', label: 'Lose Weight', icon: Target },
                { id: 'maintain', label: 'Maintain Weight', icon: Heart },
                { id: 'gain', label: 'Gain Weight', icon: TrendingUp }
              ].map((goal) => (
                <motion.button
                  key={goal.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserPreferences(prev => ({ ...prev, goal: goal.id }))}
                  className={`p-4 rounded-xl text-center transition-all duration-200 ${
                    userPreferences.goal === goal.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <goal.icon className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">{goal.label}</p>
                </motion.button>
              ))}
            </div>
          </div>
  
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Allergies & Restrictions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                'Nuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Shellfish', 'Fish', 'Sesame'
              ].map((allergy) => (
                <motion.button
                  key={allergy}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setUserPreferences(prev => ({
                      ...prev,
                      allergies: prev.allergies.includes(allergy)
                        ? prev.allergies.filter(a => a !== allergy)
                        : [...prev.allergies, allergy]
                    }));
                  }}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    userPreferences.allergies.includes(allergy)
                      ? 'bg-red-500 text-white'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {allergy}
                </motion.button>
              ))}
            </div>
          </div>
  
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Theme
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Choose your preferred appearance
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-xl ${darkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-700'} transition-colors`}
              >
                {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
);

// --- HELPER COMPONENTS (NOW OUTSIDE) ---

const Navigation = ({ darkMode, setDarkMode, currentPage, setCurrentPage }) => (
    <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <ChefHat className="w-4 h-4 text-white" />
                    </div>
                    <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>NutriAI</span>
                </motion.div>
                <div className="flex items-center space-x-1">
                    {[
                        { id: 'home', icon: Home, label: 'Home' },
                        { id: 'chat', icon: MessageCircle, label: 'Chat' },
                        { id: 'recipes', icon: BookOpen, label: 'Recipes' },
                        { id: 'progress', icon: TrendingUp, label: 'Progress' },
                        { id: 'settings', icon: Settings, label: 'Settings' }
                    ].map((item) => (
                        <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(item.id)}
                            className={`p-2 rounded-lg transition-all duration-200 ${currentPage === item.id
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                : `${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                        </motion.button>
                    ))}
                </div>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 rounded-lg ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-700'}`}
                >
                    {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </motion.button>
            </div>
        </div>
    </motion.nav>
);

const HeroSection = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white mb-8"
    >
        <div className="relative z-10">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl font-bold mb-4">
                Your AI Nutrition Coach
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl mb-6 opacity-90">
                Get personalized diet plans, recipe suggestions, and nutrition advice powered by AI
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-4">
                {['Weight Loss', 'Muscle Building', 'Healthy Recipes', 'Meal Planning'].map((feature, idx) => (
                    <span key={idx} className="px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                        {feature}
                    </span>
                ))}
            </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full"></motion.div>
    </motion.div>
);

const StatsCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
            { icon: Target, label: 'Goal Progress', value: '73%', color: 'from-green-500 to-emerald-600' },
            { icon: Zap, label: 'Calories Today', value: '1,847', color: 'from-orange-500 to-red-600' },
            { icon: Heart, label: 'Health Score', value: '89', color: 'from-pink-500 to-rose-600' },
            { icon: Award, label: 'Streak Days', value: '12', color: 'from-purple-500 to-indigo-600' }
        ].map((stat, idx) => (
            <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.color} p-6 text-white`}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm opacity-80">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <stat.icon className="w-8 h-8 opacity-80" />
                </div>
            </motion.div>
        ))}
    </div>
);

const RecipeCard = ({ recipe, index = 0, darkMode }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative overflow-hidden rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl hover:shadow-2xl transition-all duration-300`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={recipe.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop" }
          alt={recipe.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
            {recipe.type}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">{recipe.rating || '4.5'}</span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-bold text-lg">{recipe.name}</h3>
          <div className="flex items-center space-x-4 text-sm opacity-90">
            <div className="flex items-center space-x-1">
              <Timer className="w-4 h-4" />
              <span>{recipe.prepTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4" />
              <span>{recipe.calories} cal</span>
            </div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <Bookmark className="w-4 h-4" />
        </motion.button>
      </div>
      
      <div className="p-6">
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
          {recipe.description}
        </p>
        
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Protein</p>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{recipe.protein}</p>
          </div>
          <div className="text-center">
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Carbs</p>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{recipe.carbs}</p>
          </div>
          <div className="text-center">
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Fat</p>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{recipe.fat}</p>
          </div>
          <div className="text-center">
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Difficulty</p>
            <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{recipe.difficulty}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 mr-2 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200"
          >
            View Recipe
          </motion.button>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white transition-all duration-200`}
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
);

const DietPlanCard = ({ plan, darkMode }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-2xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} p-6 mb-6`}
    >
        <div className="flex items-center justify-between mb-6">
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Your Personalized Diet Plan
            </h3>
            <div className="flex items-center space-x-4">
                <div className="text-center">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Daily Calories</p>
                    <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plan.dailyCalories}</p>
                </div>
                <div className="text-center">
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Meals</p>
                    <p className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{plan.meals}</p>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(plan.macros).map(([macro, value]) => (
                <div key={macro} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} capitalize`}>{macro}</p>
                    <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
                </div>
            ))}
        </div>
        <div className="space-y-4">
            {plan.plan.map((meal, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} flex items-center justify-between`}
                >
                    <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                            <Utensils className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                            <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{meal.meal}</h4>
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{meal.time}</span>
                        </div>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {meal.items.join(', ')}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{meal.calories}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>calories</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

const ChatMessage = ({ message, index, darkMode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
    >
        <div className={`flex items-start space-x-3 max-w-4xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'user'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                : 'bg-gradient-to-r from-green-500 to-emerald-600'
                }`}>
                {message.type === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
            </div>
            <div className={`flex-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`inline-block p-4 rounded-2xl ${message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : darkMode
                            ? 'bg-gray-800 text-white border border-gray-700'
                            : 'bg-white text-gray-900 border border-gray-200'
                        } shadow-lg`}
                >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.data?.dietPlan && (
                        <div className="mt-4">
                            <DietPlanCard plan={message.data.dietPlan} darkMode={darkMode} />
                        </div>
                    )}
                    {message.recipes && (
                        <div className="mt-4">
                            <h4 className="font-semibold mb-3 text-left">Recommended Recipes:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {message.recipes.map((recipe, idx) => (
                                    <RecipeCard key={recipe.id || idx} recipe={recipe} index={idx} darkMode={darkMode} />
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
                <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {message.timestamp.toLocaleTimeString()}
                </p>
            </div>
        </div>
    </motion.div>
);

// --- MAIN APP COMPONENT ---

const NutritionApp = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [darkMode, setDarkMode] = useState(true);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            content: "Hello! I'm your AI nutrition coach. I can help you with personalized diet plans, recipe suggestions, and nutrition advice. What are your goals today?",
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [userPreferences, setUserPreferences] = useState({
        dietType: 'balanced',
        goal: 'maintain',
        restrictions: [],
        allergies: []
    });
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const callGeminiAPI = async (message) => {
        const GEMINI_API_KEY = import.meta.env.VITE_CHEFGPT_API_KEY;
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
        
        const prompt = `You are an expert AI nutrition coach. A user is asking for help. 
        User's message: "${message}".
        User's preferences: Diet Type=${userPreferences.dietType}, Goal=${userPreferences.goal}, Allergies=${userPreferences.allergies.join(', ')}.

        Analyze the user's message and preferences. Provide a helpful, conversational response. 
        If the user is asking for a meal plan or recipes, you MUST generate a response in the following JSON format. Do not add any extra text or markdown formatting like \`\`\`json outside of the JSON object.

        {
          "message": "A friendly, conversational text response to the user.",
          "dietPlan": {
            "dailyCalories": 1800,
            "meals": 4,
            "macros": { "protein": "30%", "carbs": "40%", "fat": "30%" },
            "plan": [
              { "meal": "Breakfast", "time": "8:00 AM", "calories": 400, "items": ["Oatmeal with berries", "nuts"] },
              { "meal": "Lunch", "time": "12:30 PM", "calories": 500, "items": ["Grilled Chicken Salad", "Vinaigrette"] }
            ]
          },
          "recipes": [
            {
              "id": 101,
              "name": "AI Generated Grilled Chicken Salad",
              "calories": 500,
              "protein": "40g",
              "carbs": "15g",
              "fat": "25g",
              "prepTime": "20 min",
              "difficulty": "Easy",
              "type": "weight-loss",
              "description": "A delicious and healthy grilled chicken salad, perfect for a light lunch."
            }
          ]
        }
        
        If the user's request is simple (e.g., "hello"), you can omit the dietPlan and recipes fields from the JSON.
        Generate 2-3 relevant recipes if a plan is requested. Make the data realistic.`;

        try {
            const response = await fetch(GEMINI_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
            });

            if (!response.ok) {
                const errorBody = await response.json();
                console.error("API Error Response:", errorBody);
                throw new Error(`API Error: ${response.status}`);
            }

            const data = await response.json();
            let aiResponseText = data.candidates[0].content.parts[0].text;
            
            if (aiResponseText.includes("```json")) {
                aiResponseText = aiResponseText.substring(aiResponseText.indexOf('{'), aiResponseText.lastIndexOf('}') + 1);
            }
            
            return JSON.parse(aiResponseText);
        } catch (error) {
            console.error('Gemini API Error:', error);
            return null;
        }
    };

    const getAIResponse = async (message) => {
        try {
            const apiResponse = await callGeminiAPI(message);
            if (apiResponse) {
                return {
                    type: 'diet_plan_with_recipes',
                    content: apiResponse.message || "Here's what I found for you:",
                    dietPlan: apiResponse.dietPlan,
                    recipes: apiResponse.recipes
                };
            }
            throw new Error("API call failed, using fallback.");
        } catch (error) {
            console.error(error.message);
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('weight loss') || lowerMessage.includes('lose weight')) {
                return {
                    type: 'diet_plan_with_recipes',
                    content: "Here's a personalized weight loss plan for you:",
                    dietPlan: {
                        dailyCalories: 1600, meals: 4, macros: { protein: "30%", carbs: "35%", fat: "35%" },
                        plan: [
                            { meal: "Breakfast", time: "7:00 AM", calories: 350, items: ["Green Detox Smoothie", "1 slice whole grain toast"] },
                            { meal: "Lunch", time: "12:30 PM", calories: 450, items: ["Quinoa Power Bowl", "Herbal tea"] },
                            { meal: "Snack", time: "3:30 PM", calories: 200, items: ["Apple with almond butter"] },
                            { meal: "Dinner", time: "7:00 PM", calories: 400, items: ["Grilled chicken salad", "Steamed vegetables"] }
                        ]
                    },
                    recipes: mockRecipes.filter(r => r.type === 'weight-loss' || r.type === 'detox')
                };
            }
            
            if (lowerMessage.includes('weight gain') || lowerMessage.includes('gain weight') || lowerMessage.includes('bulk')) {
                return {
                    type: 'diet_plan_with_recipes',
                    content: "Here's a healthy weight gain plan designed for you:",
                    dietPlan: {
                        dailyCalories: 2800, meals: 6, macros: { protein: "25%", carbs: "50%", fat: "25%" },
                        plan: [
                            { meal: "Breakfast", time: "7:00 AM", calories: 580, items: ["Protein-Packed Pancakes", "Fresh fruit bowl"] },
                            { meal: "Mid-Morning", time: "10:00 AM", calories: 300, items: ["Protein shake", "Banana"] },
                            { meal: "Lunch", time: "1:00 PM", calories: 650, items: ["Muscle Builder Bowl", "Whole grain roll"] },
                            { meal: "Pre-Workout", time: "4:00 PM", calories: 250, items: ["Greek yogurt with berries"] },
                            { meal: "Post-Workout", time: "6:00 PM", calories: 400, items: ["Protein shake", "2 dates"] },
                            { meal: "Dinner", time: "8:00 PM", calories: 620, items: ["Mediterranean Salmon", "Quinoa", "Roasted vegetables"] }
                        ]
                    },
                    recipes: mockRecipes.filter(r => r.type === 'weight-gain' || r.type === 'muscle-building')
                };
            }
        
            if (lowerMessage.includes('muscle') || lowerMessage.includes('protein') || lowerMessage.includes('workout')) {
                return {
                    type: 'diet_plan_with_recipes',
                    content: "Perfect! Here's a muscle-building nutrition plan:",
                    dietPlan: {
                        dailyCalories: 2400, meals: 5, macros: { protein: "35%", carbs: "40%", fat: "25%" },
                        plan: [
                            { meal: "Breakfast", time: "7:00 AM", calories: 500, items: ["Protein-Packed Pancakes", "Greek yogurt"] },
                            { meal: "Pre-Workout", time: "11:00 AM", calories: 200, items: ["Banana", "Coffee"] },
                            { meal: "Post-Workout", time: "1:30 PM", calories: 600, items: ["Muscle Builder Bowl", "Protein shake"] },
                            { meal: "Snack", time: "4:30 PM", calories: 350, items: ["Mixed nuts", "Greek yogurt"] },
                            { meal: "Dinner", time: "7:30 PM", calories: 550, items: ["Mediterranean Salmon", "Sweet potato"] }
                        ]
                    },
                    recipes: mockRecipes.filter(r => r.type === 'muscle-building' || r.type === 'weight-gain')
                };
            }
        
            if (lowerMessage.includes('recipe') || lowerMessage.includes('food')) {
                return {
                    type: 'recipes',
                    content: "Here are some fantastic recipes I'd recommend based on your goals:",
                    recipes: mockRecipes.slice(0, 3)
                };
            }
        
            // Default fallback response
            return {
                type: 'text',
                content: "I can help you with personalized diet plans, recipe suggestions, and nutrition advice. Try asking about weight loss, muscle building, or specific dietary needs!"
            };
        }
    };

    const sendMessage = async () => {
        if (!inputMessage.trim() || isTyping) return;
        const userMessage = { id: Date.now(), type: 'user', content: inputMessage.trim(), timestamp: new Date() };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = inputMessage;
        setInputMessage('');
        setIsTyping(true);
        try {
            const response = await getAIResponse(currentInput);
            const botMessage = {
                id: Date.now() + 1, type: 'bot', content: response.content,
                data: response.dietPlan ? { dietPlan: response.dietPlan } : null,
                recipes: response.recipes || null, timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error in sendMessage:', error);
            const errorMessage = { id: Date.now() + 1, type: 'bot', content: "Sorry, I'm having trouble connecting right now. Please try again.", timestamp: new Date() };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const renderPage = () => {
        const pageProps = { darkMode, setDarkMode, currentPage, setCurrentPage, userPreferences, setUserPreferences, messages, inputMessage, setInputMessage, handleKeyPress, sendMessage, isTyping, messagesEndRef };
        switch (currentPage) {
            case 'home': return <HomePage {...pageProps} />;
            case 'chat': return <ChatPage {...pageProps} />;
            case 'recipes': return <RecipesPage {...pageProps} />;
            case 'progress': return <ProgressPage {...pageProps} />;
            case 'settings': return <SettingsPage {...pageProps} />;
            default: return <HomePage {...pageProps} />;
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <Navigation darkMode={darkMode} setDarkMode={setDarkMode} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderPage()}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
};

export default NutritionApp;
